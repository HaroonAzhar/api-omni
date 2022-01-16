import request from "supertest";

import app from "../../src/app";
import db from "../../src/db";
import { BaseModel } from "../../src/models/BaseModel";
import Case, { CaseTypeCode } from "../../src/models/Case";
BaseModel.registerKnex(db);
let formId: any;

describe("Redeemed Test Case", () => {
  it("should create base flow", async () => {
    formId = await (await import("./flow/application/base_flow")).default;
  });

  it("should convert completed into redeemed", async (done) => {
    const data = {
      data: {
        type: "application_form",
        id: formId,
        attributes: {
          step_id: "convert_to_redeemed",
        },
      },
    };

    request(app)
      .patch(`/cases/${formId}`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(data)
      .end(async (err, res) => {
        if (err) done(err);
        const caseModel = new Case();
        const model = await caseModel.getCase(CaseTypeCode.ALL, formId);
        const caseData = await model.getForm();
        expect(caseData.length).toEqual(1);
        expect(res.status).toEqual(200);
        expect(caseData[0].stage).toEqual("redeemed");
        expect(caseData[0].status).toEqual("in_full");
        done();
      });
  });

  it("should change redeemed status", async (done) => {
    const data = {
      data: {
        type: "application_form",
        id: formId,
        attributes: {
          status: "with_shortfall",
        },
      },
    };

    request(app)
      .patch(`/cases/${formId}`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(data)
      .end(async (err, res) => {
        if (err) done(err);
        const caseModel = new Case();
        const model = await caseModel.getCase(CaseTypeCode.ALL, formId);
        const caseData = await model.getForm();
        expect(caseData.length).toEqual(1);
        expect(res.status).toEqual(200);
        expect(caseData[0].stage).toEqual("redeemed");
        expect(caseData[0].status).toEqual("with_shortfall");
        done();
      });
  });
});
