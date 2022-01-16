import request from "supertest";

import app from "../../../src/app";
import Case, { CaseTypeCode } from "../../../src/models/Case";

let formId: any;
describe("AML/KYC Validation Flow", () => {
  it("should create base flow", async () => {
    formId = await (await import("../flow/application/base_flow")).default;
  });

  it("should save data", async (done) => {
    const payload = await import("../json/application_aml_kyc_validation");

    payload.default.data.id = formId;

    request(app)
      .patch(`/cases/${formId}/aml_kyc_validation`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(payload.default)
      .end(async (err, res) => {
        if (err) throw new Error(err);
        expect(res.status).toBe(200);
        const caseModel = new Case();
        const model = await caseModel.getCase(CaseTypeCode.APPLICATION, formId);
        const application = await model.getForm();
        expect(application.length).toEqual(1);
        expect(application[0].aml_kyc_validation).toMatchObject(
          payload.default.data.attributes
        );
        done();
      });
  });
});
