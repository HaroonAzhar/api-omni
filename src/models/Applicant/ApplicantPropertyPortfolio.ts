import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export default class ApplicantPropertyPortfolio extends BaseModel {
  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        applicant_property_portfolio_id: "number|pk",
        is_where_resides: "boolean",
        address_line_1: "string",
        address_line_2: "string",
        postcode: "string",
        city: "string",
        country: "string",
        name_of_lender: "string",

        estimated_value: "number",
        current_debt: "number",
        monthly_mortgage: "number",
        monthly_rental: "number",

        fk_applicant_id: "number",
      },
    };
  }
  public getByApplicant(applicantId: number) {
    return this.select()
      .innerJoin(
        "Origination.Applicant",
        `${this.tableName()}.FkApplicantId`,
        "Applicant.ApplicantId"
      )
      .where({ ApplicantId: applicantId });
  }

  tableName(): string {
    return "Origination.ApplicantPropertyPortfolio";
  }

  getJsonMapping(): PropertiesInterface<any> {
    return {
      applicant_property_portfolio_id: "applicant_property_portfolio_id",
      is_where_resides: "is_where_resides",
      address_line_1: "address_line_1",
      address_line_2: "address_line_2",
      postcode: "postcode",
      city: "city",
      country: "country",
      name_of_lender: "name_of_lender",

      estimated_value: "estimated_value",
      current_debt: "current_debt",
      monthly_mortgage: "monthly_mortgage",
      monthly_rental: "monthly_rental",
      fk_applicant_id: "fk_applicant_id",
    };
  }
}
