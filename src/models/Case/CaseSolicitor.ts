import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export default class CaseSolicitor extends BaseModel {
  tableName(): string {
    return "Origination.CaseSolicitor";
  }

  getJsonMapping(): PropertiesInterface<any> {
    return {
      company_name: "company_name",
      contact_name: "contact_name",
      are_least_two_partners: "are_least_two_partners",
      address_line_1: "address_line_1",
      address_line_2: "address_line_2",
      city: "city",
      postcode: "postcode",
      country: "country",
      phone_number: "phone_number",
      email: "email",
      fk_case_id: "fk_case_id",
      omni_solicitor_id: "fk_solicitor_id",
      omni_solicitor_email: "omni_solicitor_email",
      omni_solicitor_phone_number: "omni_solicitor_phone_number",
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        case_solicitor_id: "id|pk",
        company_name: "string",
        contact_name: "string",
        are_least_two_partners: "are_least_two_partners",
        address_line_1: "address_line_1",
        address_line_2: "address_line_2",
        city: "city",
        postcode: "postcode",
        country: "country",
        phone_number: "phone_number",
        email: "email",
        fk_case_id: "fk_case_id",
        fk_solicitor_id: "number",
        omni_solicitor_phone_number: "string",
        omni_solicitor_email: "string",
      },
    };
  }
}
