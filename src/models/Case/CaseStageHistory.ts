import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export default class CaseStageHistory extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      command: "command",
      stage: "stage",
      fk_case_id: "fk_case_id",
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        case_stage_history_id: "id|pk",
        fk_case_id: "number",
        stage: "string",
        change_date: "string",
        command: "string",
      },
    };
  }

  tableName(): string {
    return "Origination.CaseStageHistory";
  }
}
