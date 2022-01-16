import compression from "compression";
import express from "express";

export default (app: express.Application) => {
  app.use(compression());
};
