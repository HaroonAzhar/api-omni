import * as Joi from "joi";

import status from "./status";

const assetsLiabilitiesAdditionalBody = Joi.object({
  total_assets: Joi.number(),
  total_liabilities: Joi.number(),
  statement_of_financial_position: Joi.string().allow(""),
  status,
  date_edited: Joi.string().allow(""),
});

export default assetsLiabilitiesAdditionalBody;
