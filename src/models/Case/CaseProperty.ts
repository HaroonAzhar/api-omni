import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";
import ApplicationStepStatusType from "../Application/ApplicationStepStatusType";

export default class CaseProperty extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      address: async (db: Knex, value: any) => {
        this.setData("address_line_1", value.line_1);
        this.setData("address_line_2", value.line_2);
        this.setData("address_postcode", value.postcode);
        this.setData("address_city", value.city);
        this.setData("address_country", value.country);
        return {};
      },
      details: (db: Knex, value: any) => {
        for (const propKey in value) {
          if (value.hasOwnProperty(propKey))
            this.setData(propKey, value[propKey]);
        }

        this.removeValuationContactIfNotManual(value);

        return {};
      },
      charge: (db: Knex, value: any) => {
        this.setData("opfl_charge_type", value.opfl_charge_type);
        this.setData("lenders", JSON.stringify(value.lenders));
        this.setData(
          "current_mortgage_outstanding",
          value.current_mortgage_outstanding
        );
        this.setData("security_owner", value.security_owner);
        this.setData("security_owner_title", value.security_owner_title);
        this.setData("security_owner_forename", value.security_owner_forename);
        this.setData(
          "security_owner_middle_name",
          value.security_owner_middle_name
        );
        this.setData("security_owner_surname", value.security_owner_surname);
        return {};
      },
      title_numbers: (db: Knex, value: any) => {
        this.setData("title_numbers", JSON.stringify(value));
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
    };
  }

  private static isPropertyValuationPaymentOrAccess(key: string) {
    return (
      [
        "contact_for_access_valuation_name",
        "contact_for_access_valuation_phone",
        "contact_for_access_valuation_email",
        "contact_for_payment_valuation_name",
        "contact_for_payment_valuation_phone",
        "contact_for_payment_valuation_email",
      ].indexOf(key) !== -1
    );
  }

  private removeValuationContactIfNotManual(value: Record<string, string>) {
    for (const propKey in value) {
      if (
        CaseProperty.isPropertyValuationPaymentOrAccess(propKey) &&
        this._data[
          "selected_contact_for_" + propKey.split("_")[2] + "_valuation"
        ] !== "manual"
      ) {
        this.setData(propKey, "");
      }
    }
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        case_property_id: "number|pk",
        already_owned: "boolean",
        being_purchased: "boolean",
        current_value: "number",
        value_after_works: "number",
        purchase_price: "number",
        purpose_of_borrowings: "string",
        property_type: "string",
        security_type: "string",
        security_type_other: "string",
        is_new_build: "boolean",
        years_remaining_on_lease: "number",
        is_standard_construction: "boolean",
        is_planning_required: "boolean",
        is_occupied: "boolean",
        is_occupied_by_borrower: "boolean",
        basis_for_occupation: "string",
        intentions: "boolean",
        contact_for_access_valuation_name: "string",
        contact_for_access_valuation_phone: "string",
        contact_for_access_valuation_email: "string",
        contact_for_payment_valuation_name: "string",
        contact_for_payment_valuation_phone: "string",
        contact_for_payment_valuation_email: "string",
        opfl_charge_type: "string",
        lenders: "string",
        current_mortgage_outstanding: "string",
        security_owner: "string",
        security_owner_title: "string",
        security_owner_forename: "string",
        security_owner_middle_name: "string",
        security_owner_surname: "string",
        address_line_1: "string",
        address_line_2: "string",
        address_postcode: "string",
        address_city: "string",
        address_country: "string",
        title_numbers: "string",
        selected_contact_for_access_valuation: "string",
        selected_contact_for_payment_valuation: "string",
        selected_contact_applicant_id_for_access_valuation: "string",
        selected_contact_applicant_id_for_payment_valuation: "string",
        payment_contact_details_same_as_access_valuation: "booleans",
        fk_case_id: "number",
        fk_status_id: "number",
        date_edited: "string",
      },
    };
  }

  tableName(): string {
    return "Origination.CaseProperty";
  }
}
