import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export type SecurityDipMappingType = {
  security_dip_mapping_id: "number";
  fk_security_id: "number";
  fk_dip_id: "number";
};

export default class SecurityDipMapping extends BaseModel {
  tableName(): string {
    return "Origination.DipSecurityDipMapping";
  }

  getJsonMapping(): PropertiesInterface<SecurityDipMapping> {
    return undefined;
  }

  jsonSchema(): JsonSchemaInterface<SecurityDipMappingType> {
    return {
      type: "object",
      required: [],
      properties: {
        security_dip_mapping_id: "number",
        fk_security_id: "number",
        fk_dip_id: "number",
      },
    };
  }
}
