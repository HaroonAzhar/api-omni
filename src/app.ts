import "reflect-metadata";
import express from "express";
import { Response, Request, NextFunction } from "express";
import { container } from "tsyringe";

import { addRollbarErrorHandler, rollbar } from "./util/rollbar";
// Controllers (route handlers)
import { BaseModel } from "./models/BaseModel";
import db from "./db";
import AppInstance from "./instance";
import addMiddlewares from "./middlewares";
import BaseController from "./controllers/case/base.controller";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

addMiddlewares(app);

addRollbarErrorHandler(app);
BaseModel.registerKnex(db);

export const addErrorHandler = (applicationInstance: express.Application) => {
  applicationInstance.use(
    (err: any, req: Request, res: Response, next: NextFunction) => {
      rollbar.error(err);
      BaseController.ApiJsonError(res, err);
    }
  );
};

const instance = container.resolve(AppInstance);
instance.initializeRoute(app);

export default app;
