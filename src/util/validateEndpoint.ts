import * as Joi from "joi";

import HttpException from "./exceptions/http.exception";

export default (
  data: Record<string, unknown>,
  schema: Record<string, unknown>
) => {
  const { error, value } = Joi.validate(data, schema);
  if (error)
    throw new HttpException(
      {
        code: "422",
        source: { pointer: "/dip" },
        title: "Validation Error",
        detail: error.message,
      },
      400
    );
  return value;
};
