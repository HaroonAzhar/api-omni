import { Request } from "express";
import * as Joi from "joi";

import validateEndpoint from "../../../../util/validateEndpoint";

export default (req: Request) => {
  validateEndpoint(req.params, {
    id: Joi.string().min(36).required(),
  });

  const validation = {
    data: Joi.object({
      id: Joi.string().min(36).required(),
      type: Joi.string().allow("applicant_form").required(),
      attributes: Joi.object({
        validation_user_name: Joi.string().allow(""),
        validation_user_date: Joi.string().allow(""),
        validation_mlro_name: Joi.string().allow(""),
        validation_mlro_date: Joi.string().allow(""),
      }).required(),
    }),
  };

  validateEndpoint(req.body, validation);
};
