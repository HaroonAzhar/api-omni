import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export default class CaseIntroducer extends BaseModel {
  tableName(): string {
    return "Origination.CaseIntroducer";
  }

  getJsonMapping(): PropertiesInterface<any> {
    return {
      firm: "firm",
      introducer: "introducer",
      address_line_1: "address_line_1",
      address_line_2: "address_line_2",
      city: "city",
      postcode: "postcode",
      country: "country",
      phone_number: "phone_number",
      email: "email",
      interim_permission_number: "interim_permission_number",
      have_met_client: "have_met_client",
      fk_case_id: "fk_case_id",
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        case_introducer_id: "number|pk",
        firm: "string",
        introducer: "string",
        address_line_1: "string",
        address_line_2: "string",
        city: "string",
        postcode: "string",
        country: "string",
        phone_number: "string",
        email: "string",
        interim_permission_number: "string",
        have_met_client: "boolean",
        fk_case_id: "number",
      },
    };
  }
}
