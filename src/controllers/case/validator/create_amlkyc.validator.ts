import { Request } from "express";
import * as Joi from "joi";

import validateEndpoint from "../../../util/validateEndpoint";
import amlKycBody from "./aml_kyc_body";

const validationBodySchema = {
  data: Joi.object({
    id: Joi.string().min(36).required(),
    type: Joi.string().allow("aml_kyc_form").required(),
    attributes: amlKycBody,
  }),
};

const validationParamsSchema = {
  id: Joi.string().min(36).required(),
  applicant_id: Joi.number().required(),
};

export default (req: Request) => {
  validateEndpoint(req.params, validationParamsSchema);
  validateEndpoint(req.body, validationBodySchema);
};
