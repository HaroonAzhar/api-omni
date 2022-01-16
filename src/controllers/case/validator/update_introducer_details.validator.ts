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
        introducer_details: Joi.object({
          firm: Joi.string().allow(""),
          introducer: Joi.string().allow(""),
          address_line_1: Joi.string().allow(""),
          address_line_2: Joi.string().allow(""),
          city: Joi.string().allow(""),
          postcode: Joi.string().allow(""),
          country: Joi.string().allow(""),
          phone_number: Joi.string().allow(""),
          email: Joi.string().email().allow(""),
          interim_permission_number: Joi.string().allow(""),
          have_met_client: Joi.boolean(),
        }),
      }).required(),
    }),
  };

  validateEndpoint(req.body, validation);
};
