import express from "express";
import lusca from "lusca";

export default (app: express.Application) => {
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));
};
