import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type BrokerType = {
  broker_id: "number|pk";
  broker_company_name: "string";
  broker_name: "string";
  broker_email: "string";
};

export default class Broker extends BaseModel {
  tableName(): string {
    return "Origination.DipBroker";
  }

  getJsonMapping(): PropertiesInterface<BrokerType> {
    return {
      broker_company_name: "broker_company_name",
      broker_name: "broker_name",
      broker_email: "broker_email",
    };
  }

  jsonSchema(): JsonSchemaInterface<BrokerType> {
    return {
      type: "object",
      required: [],
      properties: {
        broker_id: "number|pk",
        broker_company_name: "string",
        broker_name: "string",
        broker_email: "string",
      },
    };
  }
}
