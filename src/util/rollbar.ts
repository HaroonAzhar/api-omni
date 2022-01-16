import express from "express";
import Rollbar from "rollbar";

import { rollbarConfig } from "./secrets";

export const rollbar = new Rollbar({
  accessToken: rollbarConfig.accessToken,
  environment: process.env.NODE_ENV,
  captureUnhandledRejections: true,
  enabled:
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "stage" ||
    process.env.NODE_ENV === "ci",
});

export function addRollbarErrorHandler(app: express.Application) {
  app.use(rollbar.errorHandler());
}
