import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type IntroducerTypeType = {
  introducer_id: "number|pk";
  introducer_type: "string";
};

export default class IntroducerType extends BaseModel {
  tableName(): string {
    return "Origination.DipIntroducerType";
  }

  jsonSchema(): JsonSchemaInterface<IntroducerTypeType> {
    return {
      type: "object",
      required: [],
      properties: {
        introducer_id: "number|pk",
        introducer_type: "string",
      },
    };
  }

  getJsonMapping(): PropertiesInterface<IntroducerType> {
    return undefined;
  }
}
