import Knex from "knex";

import { BaseModel } from "./BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../interfaces/models/JsonSchemaInterface";
import ApplicationStepStatusType from "./Application/ApplicationStepStatusType";

export default class PropertyValuationReport extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      valuation_basis: "valuation_basis",
      valuation_method: "valuation_method",
      report_date: "report_date",
      inspection_date: "inspection_date",
      market_value: "market_value",
      day_value: "day_value",
      gdv: "gdv",
      day_gdv: "day_gdv",
      reinstatement_value: "reinstatement_value",
      title_no: "title_no",
      security_description: "security_description",
      security_subtype: "security_subtype",
      first_charge_outstanding: "first_charge_outstanding",
      number_of_units: "number_of_units",
      planning_details: "planning_details",
      country: "country",
      nitrate_neutrality: "nitrate_neutrality",
      build_duration: "build_duration",
      build_costs: "build_costs",
      commencement_date_of_works: "commencement_date_of_works",
      contractor: "contractor",
      price_per_square_foot: "price_per_square_foot",
      price_per_square_meters: "price_per_square_meters",
      total_square_feet: "total_square_feet",
      total_square_meters: "total_square_meters",
      total_value: "total_value",
      surveyor: "surveyor",
      report_status: "report_status",
      market_rent: "market_rent",
      name_of_the_individual_surveyor: "name_of_the_individual_surveyor",
      planning_required: "planning_required",
      planning_reference_numbers: async (
        db: Knex,
        value: PropertiesInterface<string>
      ) => {
        return {
          key: "planning_reference_numbers",
          value: JSON.stringify(value),
        };
      },
      link_to_planning_permission: "link_to_planning_permission",
      build_costs_per_square_foot: "build_costs_per_square_foot",
      build_costs_per_square_meter: "build_costs_per_square_meter",
      project_manager: "project_manager",
      architect: "architect",
      structural_engineer: "structural_engineer",
      other_relevant_subcontractors: "other_relevant_subcontractors",
      omni_experience_with_the_professional_team:
        "omni_experience_with_the_professional_team",
      listed_grade: "listed_grade",
      sang: "sang",
      sssi: "sssi",
      anob: "anob",
      flood_zone: "flood_zone",
      green_belt: "green_belt",
      esw1: "esw1",
      fk_property_id: "fk_property_id",
      date_edited: "date_edited",
      status: async (db: Knex, value: string) => {
        const status = new ApplicationStepStatusType();
        const data = await status
          .select()
          .where({ ApplicationStepStatusType: value });
        if (!data.length) throw new Error("Cannot find status:" + value);
        return {
          key: "fk_status_id",
          value: data[0].application_step_status_id,
        };
      },
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        property_valuation_report_id: "number|pk",
        valuation_basis: "string",
        valuation_method: "string",
        report_date: "string",
        inspection_date: "string",
        market_value: "float",
        day_value: "float",
        gdv: "float",
        day_gdv: "string",
        reinstatement_value: "float",
        title_no: "string",
        security_description: "string",
        security_subtype: "string",
        first_charge_outstanding: "string",
        number_of_units: "string",
        planning_details: "string",
        country: "string",
        nitrate_neutrality: "string",
        build_duration: "integer",
        build_costs: "float",
        commencement_date_of_works: "string",
        contractor: "string",
        price_per_square_foot: "float",
        price_per_square_meters: "float",
        total_square_feet: "float",
        total_square_meters: "float",
        total_value: "float",
        fk_property_id: "number",
        surveyor: "string",
        report_status: "string",
        market_rent: "float",
        name_of_the_individual_surveyor: "string",
        planning_required: "boolean",
        link_to_planning_permission: "string",
        build_costs_per_square_foot: "number",
        build_costs_per_square_meter: "number",
        project_manager: "string",
        architect: "string",
        structural_engineer: "string",
        other_relevant_subcontractors: "string",
        omni_experience_with_the_professional_team: "string",
        listed_grade: "string",
        sang: "string",
        sssi: "string",
        anob: "string",
        flood_zone: "string",
        green_belt: "string",
        esw1: "string",
        planning_reference_numbers: "string",
        fk_status_id: "number",
        date_edited: "string",
      },
    };
  }

  tableName(): string {
    return "Origination.PropertyValuationReport";
  }
}
