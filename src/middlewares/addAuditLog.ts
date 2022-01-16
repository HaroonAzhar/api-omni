import { Socket } from "net";

import express from "express";
import Knex from "knex";

import db from "../db";

interface SocketWithUser extends Socket {
  user: string;
}

const auditLog = (db: Knex) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { method, url, body, user } = req;

  res.on("finish", async () => {
    const { statusCode } = res;

    if (method !== "GET") {
      await db("Origination.AuditLog").insert({
        Method: method,
        Url: url,
        ResponseStatusCode: statusCode,
        RequestBody: JSON.stringify(body),
        User: user,
      });
    }
  });
  next();
};

export default (app: express.Application) => {
  app.use(auditLog(db));
};
