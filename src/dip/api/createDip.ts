import { Response, Request } from "express";
import uuidv4 from "uuid/v4";

import validateEndpoint from "../../util/validateEndpoint";

const validation = {};

export default function createDIP(req: Request, res: Response) {
  try {
    validateEndpoint(req.body, validation);
    const status = 201;
    const resultRepr = {
      data: {
        id: uuidv4(),
      },
    };
    res.status(status).json(resultRepr);
  } catch (error) {
    res.status(422).json(error);
  }
}
