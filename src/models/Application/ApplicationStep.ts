import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";
import ApplicationStepStatusType from "./ApplicationStepStatusType";
import ApplicationStepName from "./ApplicationStepName";

type ApplicationStepType = {
  application_step_id: "number|pk";
  edited: "date";
  fk_status_id: "number";
  fk_case_id: "number";
  fk_name_id: "number";
};

export default class ApplicationStep extends BaseModel {
  tableName(): string {
    return "Origination.ApplicationStep";
  }

  select(): Knex.QueryBuilder<any, any> {
    return BaseModel.getKnex()
      .select([
        "Origination.ApplicationStep.ApplicationStepId as id",
        "Origination.ApplicationStepName.ApplicationStepName as name",
        "Origination.ApplicationStep.Edited as edited",
        "Origination.ApplicationStepStatusType.ApplicationStepStatusType as status",
      ])
      .from(this.tableName())
      .leftJoin(
        "Origination.ApplicationStepStatusType",
        "ApplicationStep.FkStatusId",
        "ApplicationStepStatusType.ApplicationStepStatusId"
      )
      .leftJoin(
        "Origination.ApplicationStepName",
        "ApplicationStep.FkNameId",
        "ApplicationStepName.ApplicationStepNameId"
      );
  }

  private async getNameId(name: string): Promise<number> {
    const nameModel = new ApplicationStepName();
    const data = await nameModel.select().where({ ApplicationStepName: name });
    if (!data.length) throw new Error("Cannot find name:" + name);
    const [{ application_step_name_id: nameId }] = data;
    return nameId;
  }

  getJsonMapping(): PropertiesInterface<ApplicationStepType> {
    return {
      edited: "edited",
      fk_case_id: "fk_case_id",
      status: async (db: Knex, value: string) => {
        const status = new ApplicationStepStatusType();
        const data = await status
          .select()
          .where({ ApplicationStepStatusType: value });
        if (!data.length) throw new Error("Cannot find status:" + value);
        return {
          key: "fk_status_id",
          value: data[0].application_step_status_id,
        };
      },
      name: async (db: Knex, value: string) => {
        return {
          key: "fk_name_id",
          value: await this.getNameId(value),
        };
      },
    };
  }

  async changeStatus(Name: string, FkCaseId: number, status: string) {
    await this.setJsonObject({ status, edited: new Date().toISOString() });
    const FkNameId = await this.getNameId(Name);
    await this.update().where({ FkCaseId, FkNameId });
  }

  jsonSchema(): JsonSchemaInterface<ApplicationStepType> {
    return {
      type: "object",
      required: [],
      properties: {
        application_step_id: "number|pk",
        edited: "date",
        fk_status_id: "number",
        fk_case_id: "number",
        fk_name_id: "number",
      },
    };
  }
}
