import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";
import ContactValue from "../Dip/ContactValue";

export default class ApplicantAddressMapping extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      address_type: "address_type",
      fk_applicant_id: "fk_applicant_id",
      fk_address_id: "fk_address_id",
    };
  }

  public async getApplicantAddress(applicantId: number) {
    return this.select(["DipSecurity.*", "ApplicantAddressMapping.AddressType"])
      .innerJoin(
        "Origination.DipSecurity",
        `${this.tableName()}.FkAddressId`,
        "DipSecurity.SecurityId"
      )
      .where({
        FkApplicantId: applicantId,
      });
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        applicant_address_mapping_id: "number|pk",
        address_type: "address_type",
        fk_applicant_id: "fk_applicant_id",
        fk_address_id: "fk_address_id",
      },
    };
  }

  tableName(): string {
    return "Origination.ApplicantAddressMapping";
  }
}
