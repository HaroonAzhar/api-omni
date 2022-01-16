import request from "supertest";

import app from "../../../../src/app";
import Case, { CaseTypeCode } from "../../../../src/models/Case";
import Application from "../../../../src/models/Application";

describe("Title Number Flow", () => {
  let formId: any;
  beforeAll(async () => {
    formId = await (await import("../../flow/application/base_flow")).default;
  });
  it("should save data", async (done) => {
    (await import("../../flow/application/property")).default(formId, done);
    const payload = await import("../../json/application_title_number");

    const caseModel = (await new Case().getCase(
      CaseTypeCode.APPLICATION,
      formId
    )) as Application;
    const form = await caseModel.getForm();
    payload.default.data.id = formId;

    for (const property of form[0].properties) {
      request(app)
        .patch(`/cases/${formId}/property/${property.id}/title_number`)
        .set("Accept", "application/vnd.api+json")
        .set("Content-Type", "application/vnd.api+json")
        .send(payload.default)
        .end(async (err, res) => {
          if (err) throw new Error(err);
          expect(res.status).toBe(200);
          const caseModel = new Case();
          const model = await caseModel.getCase(
            CaseTypeCode.APPLICATION,
            formId
          );
          const application = await model.getForm();
          expect(application.length).toEqual(1);
          expect(application[0].status).toBe("in_progress");
          const propertyIndex = application[0].properties.findIndex(
            (p: { id: number }) => p.id === property.id
          );
          expect(
            application[0].properties[propertyIndex].title_numbers
          ).toMatchObject(payload.default.data.attributes.title_numbers);
          done();
        });
    }
  });
});
