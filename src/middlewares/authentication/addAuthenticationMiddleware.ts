import express from "express";

import HttpException from "../../util/exceptions/http.exception";
import { Firebase } from "./firebase/FirebaseVerifier";
import { Verifier } from "./Verifier";

const getToken = (req: express.Request) => {
  if (!req.headers.authorization) {
    throw new HttpException("Missing Auth Header", 401);
  }
  const authHeaderSplited = req.headers.authorization.split("Bearer ");

  if (authHeaderSplited.length < 2) {
    throw new HttpException("Missing Token", 401);
  }
  return authHeaderSplited[1];
};

const addAuthentication = (
  app: express.Application,
  verifier: Verifier = new Firebase()
) => {
  const jwtAuthentication = async (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.path === "/ping") {
      next();
      return;
    }
    const token = getToken(req);

    try {
      const user = await verifier.verify(token);
      req.user = user.email;
      next();
    } catch (error) {
      throw new HttpException("Invalid Token", 401);
    }
  };
  if (
    (process.env.REQUIRE_AUTHENTICATION as string) !== "true" ||
    process.env.NODE_ENV === "test"
  ) {
    return;
  }
  app.use(jwtAuthentication);
};

export default addAuthentication;
