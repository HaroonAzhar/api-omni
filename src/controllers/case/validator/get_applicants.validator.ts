import { Request } from "express";
import * as Joi from "joi";

import validateEndpoint from "../../../util/validateEndpoint";

export default (req: Request) => {
  validateEndpoint(req.params, {
    id: Joi.string().min(36).required(),
  });
};
