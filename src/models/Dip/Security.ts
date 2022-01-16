import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";
import OpflType from "./OpflType";

type SecurityType = {
  security_id: "number|pk";
  is_manual_edit_visible: "boolean";
  security_address: "string";
  security_address_line_1: "string";
  security_address_line_2: "string";
  security_town_city: "string";
  security_postcode: "string";
  security_country: "string";
  security_initial_estimation: "float";
  fk_opfl_type_id: "number";
  estimated_open_market_value: "number";
  security_type: "string";
  gdv: "number";
  value_existing_mortgage: "number";
  how_long_here_months: "number";
  how_long_here_years: "number";
  current_estimated_90_day_market_value: "number";
  estimated_90_day_gdv: "number";
};

export default class Security extends BaseModel {
  private dip_id: number;

  tableName(): string {
    return "Origination.DipSecurity";
  }

  setDipId(dipId: number) {
    this.dip_id = dipId;
    return this;
  }

  select(): Knex.QueryBuilder<any, any> {
    const selectFields = [
      "DipSecurity.IsManualEditVisible as isManualEditVisible",
      "DipSecurity.SecurityAddress as security_address",
      "DipSecurity.SecurityAddressLine1 as security_address_line_1",
      "DipSecurity.SecurityAddressLine2 as security_address_line_2",
      "DipSecurity.SecurityTownCity as security_town_city",
      "DipSecurity.SecurityPostCode as security_postcode",
      "DipSecurity.SecurityCountry as security_country",
      "DipSecurity.SecurityInitialEstimation as security_initial_estimation",
      "DipSecurity.SecurityType as security_type",
      "DipOpflType.OpflType as opfl_charge_type",
      "DipSecurity.Gdv as gdv",
      "DipSecurity.ValueExistingMortgage as value_existing_mortgage",
      "DipSecurity.CurrentEstimated90DayMarketValue as current_estimated_90_day_market_value",
      "DipSecurity.Estimated90DayGdv as estimated_90_day_gdv",
    ];

    return BaseModel.getKnex()
      .select(selectFields)
      .from(this.tableName())
      .leftJoin(
        "Origination.DipOpflType",
        this.tableName() + ".fkOpflTypeId",
        "DipOpflType.OpflTypeId"
      )
      .innerJoin(
        "Origination.DipSecurityDipMapping",
        this.tableName() + ".SecurityId",
        "DipSecurityDipMapping.FkSecurityId"
      )
      .where({ FkDipId: this.dip_id });
  }

  async setOpflType(value: string) {
    const opflType = new OpflType();
    const data = await opflType
      .select()
      .where({ OpflType: value })
      .catch((e) => {
        throw new Error(e);
      });
    this.setData("fk_opfl_type_id", data[0].opfl_type_id);
  }

  getJsonMapping(): PropertiesInterface<SecurityType> {
    return {
      isManualEditVisible: "is_manual_edit_visible",
      security_address: "security_address",
      security_address_line_1: "security_address_line_1",
      security_address_line_2: "security_address_line_2",
      security_town_city: "security_town_city",
      security_postcode: "security_postcode",
      security_country: "security_country",
      security_initial_estimation: "security_initial_estimation",
      gdv: "gdv",
      current_estimated_90_day_market_value:
        "current_estimated_90_day_market_value",
      estimated_90_day_gdv: "estimated_90_day_gdv",
      value_existing_mortgage: "value_existing_mortgage",
      how_long_here_months: "how_long_here_months",
      how_long_here_years: "how_long_here_years",
      securities: async (db: Knex, value: []) => {
        const data = await db
          .select()
          .from("Origination.DipSecurityDipMapping")
          .where({ FkDipId: this.dip_id });
        if (data.length) {
          await db
            .delete()
            .from("Origination.DipSecurityDipMapping")
            .where({ FkDipId: this.dip_id });
          for (const dataValue of data) {
            await this.delete().where({
              SecurityId: dataValue.FkSecurityId,
            });
          }
        }

        for (const security of value) {
          this.setData(
            "is_manual_edit_visible",
            security["isManualEditVisible"]
          );
          this.setData("security_address", security["security_address"]);
          this.setData(
            "security_address_line_1",
            security["security_address_line_1"]
          );
          this.setData(
            "security_address_line_2",
            security["security_address_line_2"]
          );
          this.setData("security_town_city", security["security_town_city"]);
          this.setData("security_postcode", security["security_postcode"]);
          this.setData(
            "security_initial_estimation",
            security["security_initial_estimation"]
          );
          this.setData("security_country", security["security_country"]);
          this.setData("security_type", security["security_type"]);
          this.setData("gdv", security["gdv"]);
          this.setData(
            "current_estimated_90_day_market_value",
            security["current_estimated_90_day_market_value"]
          );
          this.setData(
            "estimated_90_day_gdv",
            security["estimated_90_day_gdv"]
          );
          if (security["opfl_charge_type"] === "second_charge")
            this.setData(
              "value_existing_mortgage",
              security["value_existing_mortgage"]
            );

          await this.setOpflType(security["opfl_charge_type"]);
          const insertedId = await this.insert();

          await db
            .into("Origination.DipSecurityDipMapping")
            .insert({ FkDipId: this.dip_id, FkSecurityId: insertedId });
        }

        return {};
      },
    };
  }

  jsonSchema(): JsonSchemaInterface<SecurityType> {
    return {
      type: "object",
      required: [],
      properties: {
        security_id: "number|pk",
        is_manual_edit_visible: "boolean",
        security_address: "string",
        security_address_line_1: "string",
        security_address_line_2: "string",
        security_town_city: "string",
        security_postcode: "string",
        security_country: "string",
        security_initial_estimation: "float",
        fk_opfl_type_id: "number",
        estimated_open_market_value: "number",
        security_type: "string",
        gdv: "number",
        estimated_90_day_gdv: "number",
        current_estimated_90_day_market_value: "number",
        value_existing_mortgage: "number",
        how_long_here_months: "number",
        how_long_here_years: "number",
      },
    };
  }
}
