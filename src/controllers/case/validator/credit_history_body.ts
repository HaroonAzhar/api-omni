import * as Joi from "joi";

import status from "./status";

const creditHistoryBody = Joi.object({
  debt_judgement: Joi.boolean(),
  declared_bankrupt: Joi.boolean(),
  failed_to_keep: Joi.boolean(),
  claim_dss: Joi.boolean(),
  convicted_fraud: Joi.boolean(),
  details: Joi.string().allow(""),
  refused_mortgage_details: Joi.string().allow(""),
  debt_judgement_details: Joi.string().allow(""),
  declared_bankrupt_details: Joi.string().allow(""),
  failed_to_keep_details: Joi.string().allow(""),
  claim_dss_details: Joi.string().allow(""),
  convicted_fraud_details: Joi.string().allow(""),
  refused_mortgage: Joi.boolean(),
  status,
  date_edited: Joi.string().allow(""),
});

export default creditHistoryBody;
