import request from "supertest";
import express from "express";

import app, { addErrorHandler } from "../src/app";

describe("GET /random-url", () => {
  it("should return 404", (done) => {
    request(app).get("/reset").expect(404, done);
  });
});

describe("handle error", () => {
  const addTestEndpoints = (appInstance: express.Application) => {
    appInstance.use("/error_async", async () => {
      throw new Error("error thrown");
    });

    appInstance.use("/error", () => {
      throw new Error("error thrown");
    });

    appInstance.get("/unhandledRejection", () => {
      return Promise.reject("Unhandled Rejection");
    });
  };

  addTestEndpoints(app);
  addErrorHandler(app);
  it("sync should return 500", (done) => {
    request(app)
      .get("/error")
      .expect(500)
      .end(async (err, res) => {
        expect(res.error.text).toBe(
          '{"errors":[{"detail":"Error: error thrown"}]}'
        );
        done();
      });
  });
  it("async should return 500", (done) => {
    request(app)
      .get("/error_async")
      .expect(500)
      .end(async (err, res) => {
        expect(res.error.text).toBe(
          '{"errors":[{"detail":"Error: error thrown"}]}'
        );
        done();
      });
  });
  it("unhandledRejection should return 500", (done) => {
    request(app)
      .get("/unhandledRejection")
      .expect(500)
      .end(async (err, res) => {
        expect(res.error.text).toBe(
          '{"errors":[{"detail":"Unhandled Rejection"}]}'
        );
        done();
      });
  });
});
