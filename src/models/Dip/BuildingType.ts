import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type BuildingTypeType = {
  building_type_id: "number|pk";
  building_type: "string";
};

export default class BuildingType extends BaseModel {
  getJsonMapping(): PropertiesInterface<BuildingType> {
    return undefined;
  }

  tableName(): string {
    return "Origination.DipBuildingType";
  }

  jsonSchema(): JsonSchemaInterface<BuildingTypeType> {
    return {
      type: "object",
      required: [],
      properties: {
        building_type_id: "number|pk",
        building_type: "string",
      },
    };
  }
}
