import { Request } from "express";
import * as Joi from "joi";

import validateEndpoint from "../../../util/validateEndpoint";
import { individualRules, companyRules } from "./create_applicant.validator";

let validationRule = individualRules;

export default async (req: Request) => {
  validateEndpoint(req.params, {
    id: Joi.string().min(36).required(),
    applicant_id: Joi.number(),
    type: Joi.string().allow(["individual", "company"]),
  });

  if (req.params.type === "company") {
    validationRule = companyRules;
  }

  const validation = {
    data: Joi.object({
      id: Joi.string().min(36).required(),
      type: Joi.string().allow("applicant_form").required(),
      attributes: validationRule,
    }),
  };

  validateEndpoint(req.body, validation);
};
