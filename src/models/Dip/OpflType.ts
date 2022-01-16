import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type OpflTypeType = {
  opfl_type_id: "number|pk";
  opfl_type: "string";
};

export default class OpflType extends BaseModel {
  tableName(): string {
    return "Origination.DipOpflType";
  }

  getJsonMapping(): PropertiesInterface<OpflTypeType> {
    return undefined;
  }

  jsonSchema(): JsonSchemaInterface<OpflTypeType> {
    return {
      type: "object",
      required: [],
      properties: {
        opfl_type_id: "number|pk",
        opfl_type: "string",
      },
    };
  }
}
