import { Request } from "express";
import * as Joi from "joi";

import validateEndpoint from "../../../util/validateEndpoint";

export default (req: Request) => {
  validateEndpoint(req.params, {
    id: Joi.string().min(36).required(),
    applicant_id: Joi.number(),
  });

  const validation = {
    data: Joi.object({
      id: Joi.string().min(36).required(),
      type: Joi.string().allow("applicant_form").required(),
      attributes: Joi.object({
        solicitors_details: Joi.object({
          address_line_1: Joi.string().allow(""),
          address_line_2: Joi.string().allow(""),
          city: Joi.string().allow(""),
          postcode: Joi.string().allow(""),
          country: Joi.string().allow(""),
          phone_number: Joi.string().allow(""),
          contact_name: Joi.string().allow(""),
          email: Joi.string().email().allow(""),
          company_name: Joi.string().allow(""),
          are_least_two_partners: Joi.boolean(),
          omni_solicitor_phone_number: Joi.string().allow(""),
          omni_solicitor_email: Joi.string().email().allow(""),
          transaction_type: Joi.string().allow(""),
          omni_solicitor_id: Joi.number(),
        }),
      }).required(),
    }),
  };

  validateEndpoint(req.body, validation);
};
