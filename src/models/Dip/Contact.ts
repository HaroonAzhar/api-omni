import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";
import ContactType from "./ContactType";
import Company from "./Company";

type ContactTypeType = {
  contact_id: "number|pk";
  fk_contact_type_id: "number";
  fk_company_contact_id: "number";
};

export default class Contact extends BaseModel {
  tableName(): string {
    return "Origination.DipContact";
  }

  jsonSchema(): JsonSchemaInterface<ContactTypeType> {
    return {
      type: "object",
      required: [],
      properties: {
        contact_id: "number|pk",
        fk_contact_type_id: "number",
        fk_company_contact_id: "number",
      },
    };
  }

  getJsonMapping(): PropertiesInterface<ContactType> {
    return {
      company_number: async (db: Knex, value: string) => {
        const company = new Company();
        const companyNumberId = await company
          .select()
          .where({ CompanyNumber: value });
        let id = 0;

        if (!companyNumberId.length) {
          company.setData("company_number", value);
          const insertId = await company.insert();
          id = insertId[0];
        } else {
          id = companyNumberId[0].company_id;
        }

        return {
          key: "fk_company_contact_id",
          value: id,
        };
      },
      type_of_applicant: async (db: Knex, value: string) => {
        const contactType = new ContactType();
        const data = await contactType
          .select()
          .from(contactType.tableName())
          .where({ ContactType: value });
        return {
          key: "fk_contact_type_id",
          value: data[0].contact_type_id,
        };
      },
    };
  }
}
