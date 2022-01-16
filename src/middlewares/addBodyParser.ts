import express from "express";
import bodyParser from "body-parser";

export default (app: express.Application) => {
  app.use(
    bodyParser.json({
      type: "application/vnd.api+json",
    })
  );

  app.use(bodyParser.urlencoded({ extended: true }));
};
