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
        loan_details: Joi.object({
          further_draw_downs_borrowing: [
            Joi.string().regex(/^[0-9]+$/),
            Joi.number(),
          ],
          initial_net_loan: [Joi.string().regex(/^[0-9]+$/), Joi.number()],
          term: [Joi.string().regex(/^[0-9]+$/), Joi.number()],
          purpose_of_borrowings: Joi.string().allow(""),
          source_of_deposit: Joi.string().allow(""),
          repayment_method: Joi.string().allow(""),
          repayment_method_details: Joi.string().allow(""),
          proposed_completion_date: Joi.string().allow(""),
        }),
      }).required(),
    }),
  };

  validateEndpoint(req.body, validation);
};
