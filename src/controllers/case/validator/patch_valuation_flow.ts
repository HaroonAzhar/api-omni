import { Request } from "express";
import * as Joi from "joi";

import validateEndpoint from "../../../util/validateEndpoint";

export const valuationObject = Joi.object({
  valuation_basis: Joi.string(),
  valuation_method: Joi.string(),
  report_date: Joi.string(),
  inspection_date: Joi.string(),
  market_value: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  day_value: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  gdv: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  day_gdv: Joi.string(),
  reinstatement_value: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  title_no: Joi.string(),
  security_description: Joi.string(),
  security_subtype: Joi.string(),
  first_charge_outstanding: Joi.string(),
  number_of_units: Joi.string(),
  planning_details: Joi.string(),
  country: Joi.string(),
  nitrate_neutrality: Joi.boolean(),
  build_duration: Joi.number(),
  build_costs: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  commencement_date_of_works: Joi.string(),
  contractor: Joi.string(),
  price_per_square_foot: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  price_per_square_meters: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  total_square_feet: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  total_square_meters: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  total_value: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  market_rent: [Joi.string().regex(/^[0-9\\.]+$/), Joi.number()],
  surveyor: Joi.string(),
  report_status: Joi.string(),
  date_edited: Joi.string(),
  status: Joi.string(),
  name_of_the_individual_surveyor: Joi.string(),
  planning_required: Joi.boolean(),
  planning_reference_numbers: Joi.array(),
  link_to_planning_permission: Joi.string(),
  build_costs_per_square_foot: [
    Joi.string().regex(/^[0-9\\.]+$/),
    Joi.number(),
  ],
  build_costs_per_square_meter: [
    Joi.string().regex(/^[0-9\\.]+$/),
    Joi.number(),
  ],
  project_manager: Joi.string(),
  architect: Joi.string(),
  structural_engineer: Joi.string(),
  other_relevant_subcontractors: Joi.string(),
  omni_experience_with_the_professional_team: Joi.string(),
  listed_grade: Joi.boolean(),
  sang: Joi.boolean(),
  sssi: Joi.boolean(),
  anob: Joi.boolean(),
  flood_zone: Joi.boolean(),
  green_belt: Joi.boolean(),
  esw1: Joi.boolean(),
});

export default (req: Request) => {
  validateEndpoint(req.params, {
    id: Joi.string().min(36).required(),
    property_id: Joi.number(),
  });

  const validation = {
    data: Joi.object({
      id: Joi.string().min(36).required(),
      type: Joi.string().allow("applicant_form").required(),
      attributes: valuationObject.required(),
    }),
  };

  validateEndpoint(req.body, validation);
};
