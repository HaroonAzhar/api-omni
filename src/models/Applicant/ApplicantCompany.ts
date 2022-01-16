import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";
import Security from "../Dip/Security";
import ApplicantAccountant from "./ApplicantAccountant";
import ContactValue from "../Dip/ContactValue";

export default class ApplicantCompany extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      company_number: "company_number",
      name: "name",
      applicant_name: "applicant_name",
      base_data: async (db: Knex, value: any) => {
        if (value.hasOwnProperty("email")) {
          const modelData = await this.select(["FkContactId"]).where({
            ApplicantCompanyId: this._id,
          });
          const model = new ContactValue();

          if (modelData.length > 0 && modelData[0].FkContactId) {
            model.delete().where({ ContactValueId: modelData[0].FkContactId });
          }

          model.setData("email", value.email);
          const lastInsertId = await model.insert();
          this.setData("fk_contact_id", lastInsertId);
          await this.update();
        }

        return {};
      },
      date_of_creation: "date_of_creation",
      date_of_incorporation: "date_of_incorporation",
      is_correspondence_same: "is_correspondence_same",
      number_of_partners: "number_of_partners",
      company_type: "company_type",
      company_other_type_value: "company_other_type_value",
      company_registration_number: "company_registration_number",
      nature_of_business: "nature_of_business",
      trading_since: "trading_since",
      is_deleted: "is_deleted",
      directors: async (db: Knex, value: PropertiesInterface<string>) => {
        return {
          key: "directors",
          value: JSON.stringify(value),
        };
      },
      shared_holders: async (db: Knex, value: PropertiesInterface<string>) => {
        return {
          key: "shared_holders",
          value: JSON.stringify(value),
        };
      },
      accountant: async (db: Knex, value: any) => {
        const securityModel = new Security();
        const model = new ApplicantAccountant();
        await model.delete().where({ FkApplicantId: this._id });

        model.setData("name", value.name);
        model.setData("surname", value.surname);
        model.setData("firm", value.firm);
        model.setData("qualification", value.qualification);
        model.setData("fk_applicant_id", this._id);

        await model.insert();

        if (value.hasOwnProperty("address")) {
          const data = await db
            .select()
            .from("Origination.ApplicantAddressMapping")
            .where({ FkApplicantId: this._id, AddressType: "accountant" });
          if (data.length) {
            await db
              .delete()
              .from("Origination.ApplicantAddressMapping")
              .where({ FkApplicantId: this._id, AddressType: "accountant" });
            for (const dataValue of data) {
              await securityModel.delete().where({
                SecurityId: dataValue.FkAddressId,
              });
            }
          }

          securityModel.setData(
            "security_address_line_1",
            value.address["address_line_1"]
          );
          securityModel.setData(
            "security_address_line_2",
            value.address["address_line_2"]
          );
          securityModel.setData("security_town_city", value.address["city"]);
          securityModel.setData("security_postcode", value.address["postcode"]);
          securityModel.setData("security_country", value.address["country"]);
          securityModel.setData(
            "how_long_here_months",
            value.address["how_long_here_months"]
          );
          securityModel.setData(
            "how_long_here_years",
            value.address["how_long_here_years"]
          );

          const insertedId = await securityModel.insert();

          await db.into("Origination.ApplicantAddressMapping").insert({
            AddressType: "accountant",
            FkApplicantId: this._id,
            FkAddressId: insertedId,
          });
        }

        return {};
      },
      address: async (db: Knex, value: any) => {
        const securityModel = new Security();
        const data = await db
          .select()
          .from("Origination.ApplicantAddressMapping")
          .where({ FkApplicantId: this._id })
          .whereIn("AddressType", ["registered", "correspondence"]);
        if (data.length) {
          await db
            .delete()
            .from("Origination.ApplicantAddressMapping")
            .where({ FkApplicantId: this._id });
          for (const dataValue of data) {
            await securityModel.delete().where({
              SecurityId: dataValue.FkAddressId,
            });
          }
        }

        if (value.hasOwnProperty("registered")) {
          securityModel.setData(
            "security_address_line_1",
            value.registered["address_line_1"]
          );
          securityModel.setData(
            "security_address_line_2",
            value.registered["address_line_2"]
          );
          securityModel.setData("security_town_city", value.registered["city"]);
          securityModel.setData(
            "security_postcode",
            value.registered["postcode"]
          );
          securityModel.setData(
            "security_country",
            value.registered["country"]
          );
          securityModel.setData(
            "how_long_here_months",
            value.registered["how_long_here_months"]
          );
          securityModel.setData(
            "how_long_here_years",
            value.registered["how_long_here_years"]
          );

          const insertedId = await securityModel.insert();

          await db.into("Origination.ApplicantAddressMapping").insert({
            AddressType: "registered",
            FkApplicantId: this._id,
            FkAddressId: insertedId,
          });
        }

        if (value.hasOwnProperty("correspondence")) {
          securityModel.setData(
            "security_address_line_1",
            value.correspondence["address_line_1"]
          );
          securityModel.setData(
            "security_address_line_2",
            value.correspondence["address_line_2"]
          );
          securityModel.setData(
            "security_town_city",
            value.correspondence["city"]
          );
          securityModel.setData(
            "security_postcode",
            value.correspondence["postcode"]
          );
          securityModel.setData(
            "security_country",
            value.correspondence["country"]
          );
          securityModel.setData(
            "how_long_here_months",
            value.correspondence["how_long_here_months"]
          );
          securityModel.setData(
            "how_long_here_years",
            value.correspondence["how_long_here_years"]
          );

          const insertedId = await securityModel.insert();

          await db.into("Origination.ApplicantAddressMapping").insert({
            AddressType: "correspondence",
            FkApplicantId: this._id,
            FkAddressId: insertedId,
          });
        }

        this.setData("is_correspondence_same", value["is_correspondence_same"]);

        return {};
      },
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        applicant_company_id: "number|pk",
        applicant_name: "string",
        name: "string",
        is_correspondence_same: "string",
        company_number: "string",
        number_of_partners: "string",
        company_type: "string",
        date_of_creation: "string",
        date_of_incorporation: "string",
        company_other_type_value: "string",
        company_registration_number: "string",
        nature_of_business: "string",
        trading_since: "string",
        directors: "string",
        shared_holders: "string",
        fk_address_id: "number",
        fk_case_id: "number",
        fk_contact_id: "number",
        fk_applicant_credit_history_id: "number",
        is_deleted: "boolean",
      },
    };
  }

  tableName(): string {
    return "Origination.ApplicantCompany";
  }
}
