import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type ApplicationStepNameType = {
  application_step_name_id: "number|pk";
  application_step_name: "string";
};

export default class ApplicationStepName extends BaseModel {
  tableName(): string {
    return "Origination.ApplicationStepName";
  }

  jsonSchema(): JsonSchemaInterface<ApplicationStepNameType> {
    return {
      type: "object",
      required: [],
      properties: {
        application_step_name_id: "number|pk",
        application_step_name: "string",
      },
    };
  }

  getJsonMapping(): PropertiesInterface<ApplicationStepNameType> {
    return undefined;
  }
}
