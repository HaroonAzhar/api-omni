import { container } from "tsyringe";

import { addRollbarErrorHandler } from "../util/rollbar";
import addMiddlewares from "../middlewares";
import AppInstance from "../instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectWithCurrentApp = (app: any) => {
  addMiddlewares(app);

  addRollbarErrorHandler(app);

  const instance = container.resolve(AppInstance);
  instance.initializeRoute(app);
};

export default connectWithCurrentApp;
