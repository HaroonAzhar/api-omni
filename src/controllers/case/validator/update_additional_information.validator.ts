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
        additional_information: Joi.object({
          additional_information: Joi.string().allow(""),
        }),
      }).required(),
    }),
  };

  validateEndpoint(req.body, validation);
};
