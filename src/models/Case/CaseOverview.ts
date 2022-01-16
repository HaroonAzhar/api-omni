import { injectable } from "tsyringe";
import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

@injectable()
export default class CaseOverview extends BaseModel {
  tableName(): string {
    return "Origination.CaseOverview";
  }

  getJsonMapping(): PropertiesInterface<any> {
    return {
      underwriter: "underwriter",
      executive_summary: "overview_executive_summary",
      underwriter_rationale: "overview_underwriter_rationale",
      description_of_property: "security_description_of_property",
      description_of_works: "security_description_of_works",
      valuer_name: "valuer_name",
      analysis_of_property: "analysis_of_property",
      risk_inputs: async (db: Knex, value: PropertiesInterface<string>) => {
        return {
          key: "risk",
          value: JSON.stringify(value),
        };
      },
      exit_strategy: "further_exit_strategy",
      ongoing_monitoring: "further_ongoing_monitoring",
      special_conditions: "special_conditions",
      comments: "borrower_comments",
      servicing_method_rationale: "servicing_method_rationale",
      fk_case_id: "fk_case_id",
      start_case_summary_date: "start_case_summary_date",
      borrower_profile: "borrower_profile",
      client_meeting_notes: "client_meeting_notes",
      client_meeting_attendees: "client_meeting_attendees",
      client_meeting_date: "client_meeting_date",
      expected_completion_date: "expected_completion_date",
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        case_overview_id: "id|pk",
        start_case_summary_date: "string",
        overview_executive_summary: "string",
        overview_underwriter_rationale: "string",
        security_description_of_property: "string",
        security_description_of_works: "string",
        valuer_name: "string",
        analysis_of_property: "string",
        risk: "string",
        mitigation: "string",
        further_exit_strategy: "string",
        further_ongoing_monitoring: "string",
        special_conditions: "string",
        borrower_comments: "string",
        servicing_method_rationale: "string",
        fk_case_id: "number",
        underwriter: "string",
        borrower_profile: "string",
        client_meeting_notes: "string",
        client_meeting_attendees: "string",
        client_meeting_date: "string",
        expected_completion_date: "string",
      },
    };
  }

  async getDataByCaseId(caseId: number) {
    const query = await this.select().where({ FkCaseId: caseId }).first();
    if (!query) return {};
    return {
      overview: {
        executive_summary: query.overview_executive_summary,
        start_case_summary_date: query.start_case_summary_date,
        underwriter: query.underwriter,
        expected_completion_date: query.expected_completion_date,
      },
      security: {
        description_of_property: query.security_description_of_property,
        description_of_works: query.security_description_of_works,
        valuer_name: query.valuer_name,
        analysis_of_property: query.analysis_of_property,
      },
      loan: {
        servicing_method_rationale: query.servicing_method_rationale,
      },
      risk_mitigations: {
        risk_inputs: JSON.parse(query.risk),
        underwriter_rationale: query.overview_underwriter_rationale,
      },
      further_comments: {
        exit_strategy: query.further_exit_strategy,
        ongoing_monitoring: query.further_ongoing_monitoring,
        special_conditions: query.special_conditions,
      },
      borrower: {
        comments: query.borrower_comments,
        borrower_profile: query.borrower_profile,
        client_meeting_notes: query.client_meeting_notes,
        client_meeting_attendees: query.client_meeting_attendees,
        client_meeting_date: query.client_meeting_date,
      },
    };
  }
}
