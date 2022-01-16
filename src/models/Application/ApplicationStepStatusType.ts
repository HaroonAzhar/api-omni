import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type ApplicationStepStatusTypeType = {
  application_step_status_id: "number|pk";
  application_step_status_type: "string";
};

export default class ApplicationStepStatusType extends BaseModel {
  tableName(): string {
    return "Origination.ApplicationStepStatusType";
  }

  jsonSchema(): JsonSchemaInterface<ApplicationStepStatusTypeType> {
    return {
      type: "object",
      required: [],
      properties: {
        application_step_status_id: "number|pk",
        application_step_status_type: "string",
      },
    };
  }

  getJsonMapping(): PropertiesInterface<ApplicationStepStatusTypeType> {
    return undefined;
  }
}
