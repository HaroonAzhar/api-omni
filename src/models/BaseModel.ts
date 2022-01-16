import Knex, { QueryBuilder, Raw } from "knex";
import * as Joi from "joi";
import { camelize, underscore } from "inflected";

import { ModelError } from "../errors/ModelError";
import { BaseModelInterface } from "../interfaces/models/BaseModelInterface";
import {
  JsonMapperFunction,
  JsonSchemaInterface,
  PropertiesInterface,
} from "../interfaces/models/JsonSchemaInterface";
import { Dictionary } from "../util/utilityTypes";

export abstract class BaseModel implements BaseModelInterface {
  private static knex: Knex;
  protected _id: number;
  protected _data: PropertiesInterface<Record<string, unknown>> = {};
  protected _jsonObject: PropertiesInterface<Record<string, unknown>> = {};
  protected primaryKey: string | null = null;
  private processedData: [] = [];
  private transaction = false;
  private trx: Knex.Transaction;

  constructor() {
    this.initializeData();
  }

  private processFieldOption(field: string, fieldValue: string) {
    if (fieldValue.indexOf("|") !== -1) {
      const data = fieldValue.split("|");
      data.forEach((dataValue) => {
        if (dataValue === "pk") {
          this.primaryKey = field;
        }
      });
    }
  }

  private initializeData() {
    Object.keys(this.jsonSchema().properties).forEach((value) => {
      this.processFieldOption(
        value,
        this.jsonSchema().properties[value] as string
      );
    });
  }

  isValid() {
    if (!this.tableName() || 0 === this.tableName().length) {
      throw new ModelError("Table name is not set");
    }
  }

  private removeJSONFields() {
    Object.keys(this._jsonObject).forEach(async (value) => {
      if (!this.getJsonMapping().hasOwnProperty(value)) {
        delete this._jsonObject[value];
      }
    });
  }

  private processJSONMapping() {
    return new Promise(async (resolve) => {
      this.removeJSONFields();
      let processed = 0;
      const checkIsProcessed = () => {
        if (processed === Object.keys(this._jsonObject).length) {
          resolve(null);
        }
      };
      checkIsProcessed();
      for (const value of Object.keys(this._jsonObject)) {
        if (this.getJsonMapping().hasOwnProperty(value)) {
          if (typeof this.getJsonMapping()[value] === "function") {
            const data = await (this.getJsonMapping()[value] as (
              dbData: Knex,
              propetyValue: string
            ) => JsonMapperFunction)(
              BaseModel.getKnex(),
              this._jsonObject[value] as string
            );
            if (((data as unknown) as string) === "skip") {
              processed++;
              continue;
            }
            if (data.hasOwnProperty("key"))
              this.setData(data.key as string, data.value);
            processed++;
          } else {
            this.setData(
              this.getJsonMapping()[value] as string,
              this._jsonObject[value]
            );
            processed++;
          }
        }

        checkIsProcessed();
      }
    });
  }

  public async setJsonObject(object: Record<string, any>) {
    this._data = {};
    this._jsonObject = { ...object };
    await this.processJSONMapping();
    return this;
  }

  public data(): PropertiesInterface<Record<string, unknown>> {
    const output: PropertiesInterface<Record<string, unknown>> = {};
    Object.entries(this._data).map(
      ([key, value]) => (output[underscore(key)] = value)
    );
    return output;
  }

  public update(fields?: Record<string, unknown>) {
    const knex = this.transaction ? this.trx : BaseModel.getKnex();
    if (Object.entries(this._data).length === 0) {
      return this.select();
    }
    const updateData = this._data;
    Object.keys(updateData).forEach((val) => {
      //  if (!updateData[val]) delete updateData[val];
    });
    const output: PropertiesInterface<Record<string, unknown>> = {};
    Object.entries(this._data).map(
      ([key, value]) => (output[camelize(key)] = value)
    );
    const query = knex.update(output).into(this.tableName());
    if (this._id) query.where({ [camelize(this.primaryKey)]: this._id });
    return query;
  }

  public delete() {
    const knex = this.transaction ? this.trx : BaseModel.getKnex();
    const query = knex.delete().from(this.tableName());
    if (this._id) query.where({ [camelize(this.primaryKey)]: this._id });
    return query;
  }

  private static validateSchema() {
    Joi.object({
      type: Joi.string().alphanum(),
      required: Joi.array().required(),
      properties: Joi.array().min(1),
    });
  }

  static registerKnex(driver: Knex) {
    Object.defineProperty(this, "knex", {
      writable: true,
      value: driver,
    });
  }

  public makeObjectFromArray<
    T extends Record<string, unknown>,
    S extends string = string
  >(array: Array<keyof T>): Dictionary<T> {
    const obj: Dictionary<T> = {};

    array.forEach((item) => {
      obj[item] = (item as unknown) as S;
    });

    return obj;
  }

  public enableTransaction(trx: Knex.Transaction) {
    this.transaction = true;
    this.trx = trx;
    return this;
  }

  public select(
    fields?: string | Record<string, unknown> | (string | Raw<any>)[]
  ): QueryBuilder {
    const fieldNames = Object.keys(this.jsonSchema().properties).map(
      (propertyName) => `${camelize(propertyName)} as ${propertyName}`
    );
    const knex = BaseModel.getKnex();
    const query = knex
      .select(fields ? fields : fieldNames)
      .from(this.tableName());
    if (this._id) query.where({ [camelize(this.primaryKey)]: this._id });
    return query;
  }

  async insert(): Promise<number[]> {
    const knex = this.transaction ? this.trx : BaseModel.getKnex();
    const output: PropertiesInterface<Record<string, unknown>> = {};
    Object.entries(this._data).map(
      ([key, value]) => (output[camelize(key)] = value)
    );
    const command = knex.insert(output).into(this.tableName());
    return command.returning(camelize(this.primaryKey));
  }

  static getKnex() {
    return this.knex;
  }

  public setData(key: string, value: any) {
    if (!this.jsonSchema().properties.hasOwnProperty(key))
      throw new Error("Cannot find property: " + key);
    this._data[key] = value;
  }

  public clearData() {
    this._data = {};
    return this;
  }

  public get() {
    return true;
  }

  set id(id: number) {
    this._id = id;
  }

  abstract jsonSchema(): JsonSchemaInterface<any>;
  abstract tableName(): string;
  abstract getJsonMapping(): PropertiesInterface<Record<string, unknown>>;
}
