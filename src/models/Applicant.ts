import Knex from "knex";

import { BaseModel } from "./BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../interfaces/models/JsonSchemaInterface";
import Security from "./Dip/Security";
import ContactValue from "./Dip/ContactValue";
import ApplicationStepStatusType from "./Application/ApplicationStepStatusType";

export enum ApplicantType {
  INDIVIDUAL = "individual",
  COMPANY = "company",
}

export default class Applicant extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      title: "title",
      forename: "forename",
      middle_name: "middle_name",
      surname: "surname",
      other_name: "other_name",
      date_of_birth: "date_of_birth",
      city_of_birth: "city_of_birth",
      country_of_birth: "country_of_birth",
      insurance_number: "insurance_number",
      nationality: "nationality",
      second_nationality: "second_nationality",
      has_dual_nationality: "has_dual_nationality",
      permanent_resident: "permanent_resident",
      marital_status: "marital_status",
      marital_other_value: "marital_other_value",
      declaration: "declaration",
      signature: "signature",
      date_of_declaration: "date_of_declaration",
      date_of_signature: "date_of_signature",
      mothers_maiden_name: "mothers_maiden_name",
      uk_residential_status: "uk_residential_status",
      information_regarding_property_residence:
        "information_regarding_property_residence",
      personal_data: async (db: Knex, value: PropertiesInterface<string>) => {
        for (const propKey in value) {
          if (value.hasOwnProperty(propKey))
            this.setData(propKey, value[propKey]);
        }
        return "skip";
      },
      contact: async (db: Knex, value: any) => {
        const model = new ContactValue();

        for (const propKey in value) {
          if (value.hasOwnProperty(propKey) && propKey !== "contact_id")
            model.setData(propKey, value[propKey]);
        }

        if (value.hasOwnProperty("contact_id")) {
          model.id = value.contact_id;
          await model.update();
          return true;
        }

        const lastInsertId = await model.insert();
        return {
          key: "fk_contact_id",
          value: lastInsertId[0],
        };
      },

      addresses: async (db: Knex, value: []) => {
        const securityModel = new Security();
        const deleteCondition = {
          FkApplicantId: this._id,
          AddressType: "individual",
        };
        const data = await db
          .select()
          .from("Origination.ApplicantAddressMapping")
          .where(deleteCondition);
        if (data.length) {
          await db
            .delete()
            .from("Origination.ApplicantAddressMapping")
            .where(deleteCondition);
          for (const dataValue of data) {
            await securityModel.delete().where({
              SecurityId: dataValue.FkAddressId,
            });
          }
        }

        for (const address of value) {
          securityModel.setData(
            "security_address_line_1",
            address["address_line_1"]
          );
          securityModel.setData(
            "security_address_line_2",
            address["address_line_2"]
          );
          securityModel.setData("security_town_city", address["city"]);
          securityModel.setData("security_postcode", address["postcode"]);
          securityModel.setData("security_country", address["country"]);
          securityModel.setData(
            "how_long_here_months",
            address["how_long_here_months"]
          );
          securityModel.setData(
            "how_long_here_years",
            address["how_long_here_years"]
          );

          const insertedId = await securityModel.insert();

          await db.into("Origination.ApplicantAddressMapping").insert({
            AddressType: "individual",
            FkApplicantId: this._id,
            FkAddressId: insertedId,
          });
        }

        return {};
      },
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
      date_edited: "date_edited",
      links: "links",
      is_deleted: "is_deleted",
      fk_shared_contact_id: "fk_shared_contact_id",
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        applicant_id: "number|pk",
        title: "string",
        forename: "string",
        middle_name: "string",
        surname: "string",
        other_name: "string",
        date_of_birth: "string",
        city_of_birth: "string",
        country_of_birth: "string",
        insurance_number: "string",
        nationality: "string",
        second_nationality: "string",
        has_dual_nationality: "string",
        permanent_resident: "string",
        marital_status: "string",
        marital_other_value: "string",
        declaration: "string",
        signature: "string",
        date_of_declaration: "string",
        date_of_signature: "string",
        mothers_maiden_name: "string",
        uk_residential_status: "string",
        information_regarding_property_residence: "string",
        fk_case_id: "number",
        fk_contact_id: "number",
        fk_applicant_credit_history_id: "number",
        fk_status_id: "number",
        date_edited: "string",
        links: "string",
        is_deleted: "boolean",
        fk_shared_contact_id: "number",
      },
    };
  }

  tableName(): string {
    return "Origination.Applicant";
  }
}
