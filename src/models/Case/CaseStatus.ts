import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export default class CaseStatus extends BaseModel {
  tableName(): string {
    return "Origination.CaseStatus";
  }

  getJsonMapping(): PropertiesInterface<any> {
    return undefined;
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        case_status_id: "id|pk",
        name: "string",
      },
    };
  }
}
