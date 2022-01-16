import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type contactTypeType = {
  contact_type_id: "number|pk";
  contact_type: "string";
};

export default class ContactType extends BaseModel {
  tableName(): string {
    return "Origination.DipContactType";
  }

  getJsonMapping(): PropertiesInterface<contactTypeType> {
    return undefined;
  }

  jsonSchema(): JsonSchemaInterface<contactTypeType> {
    return {
      type: "object",
      required: [],
      properties: {
        contact_type_id: "number|pk",
        contact_type: "string",
      },
    };
  }
}
