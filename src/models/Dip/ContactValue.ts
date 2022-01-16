import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type ContactValueType = {
  contact_value_id: "number|pk";
  fk_contact_id: "number";
  name: "string";
  email: "string";
  phone: "string";
  mobile_phone: "string";
  work_phone: "string";
  home_phone: "string";
  contact_method: "string";
  number_of_dependants: "number";
  forename: "string";
  surname: "string";
  middle_name: "string";
};

export default class ContactValue extends BaseModel {
  private contactId: number;

  tableName(): string {
    return "Origination.DipContactValue";
  }

  jsonSchema(): JsonSchemaInterface<ContactValueType> {
    return {
      type: "object",
      required: [],
      properties: {
        contact_value_id: "number|pk",
        fk_contact_id: "number",
        name: "string",
        email: "string",
        phone: "string",
        contact_method: "string",
        home_phone: "string",
        mobile_phone: "string",
        work_phone: "string",
        number_of_dependants: "number",
        forename: "string",
        middle_name: "string",
        surname: "string",
      },
    };
  }

  public async getCompanyApplicantContact(applicantId: number) {
    return this.select(["DipContactValue.*"])
      .innerJoin(
        "Origination.ApplicantCompany",
        `${this.tableName()}.ContactValueId`,
        "ApplicantCompany.FkContactId"
      )
      .where({ ApplicantCompanyId: applicantId });
  }

  public async getApplicantContact(applicantId: number) {
    return this.select(["DipContactValue.*"])
      .innerJoin(
        "Origination.Applicant",
        `${this.tableName()}.ContactValueId`,
        "Applicant.FkContactId"
      )
      .where({ ApplicantId: applicantId });
  }

  setContactId(id: number) {
    this.contactId = id;
    return this;
  }

  getJsonMapping(): PropertiesInterface<ContactValueType> {
    return {
      company_name: "name",
      email: "email",
      applicants: async (db: Knex, value: any) => {
        const contact = new ContactValue();
        await contact.delete().where({ FkContactId: this.contactId });

        for (const contactValue of value) {
          contact.setData("name", contactValue.name);
          contact.setData("email", contactValue.email);
          contact.setData("fk_contact_id", this.contactId);
          await contact.insert();
        }

        return {};
      },
    };
  }
}
