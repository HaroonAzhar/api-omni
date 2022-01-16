import request from "supertest";

import app from "../../../../src/app";
import db from "../../../../src/db";
import { BaseModel } from "../../../../src/models/BaseModel";
import Case, { CaseTypeCode } from "../../../../src/models/Case";
import Application from "../../../../src/models/Application";

BaseModel.registerKnex(db);

describe("Applications", () => {
  let formId: any;
  beforeAll(async () => {
    formId = await (await import("../../flow/application/base_flow")).default;
  });
  it("should get by applicant case", async (done) => {
    request(app)
      .get(`/cases/${formId}/applicant`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .end(async (err, res) => {
        if (err) done(err);
        expect(res.status).toBe(200);
        const caseModel = (await new Case().getCase(
          CaseTypeCode.APPLICATION,
          formId
        )) as Application;
        const form = await caseModel.getForm();
        const result: any = await caseModel.getApplicantsByCaseId(
          form[0].fk_case_id
        );

        for (const pKey of Object(result.individuals).keys()) {
          expect(result.individuals[pKey].result).toMatchObject(
            res.body.data.attributes.individuals[pKey]
          );
        }

        done();
      });
  });

  it("should get by applicant with fake case return not found", async (done) => {
    request(app)
      .get("/cases/000000000000000000000000000000000000/applicant")
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .end(async (err, res) => {
        if (err) done(err);
        expect(res.status).toBe(404);
        done();
      });
  });

  it("should get by company case", async (done) => {
    const data: any = (await import("../../json/applicant_company_flow")).data;
    data.data.id = formId;
    request(app)
      .post(`/cases/${formId}/applicant`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(data)
      .end(async (err, res) => {
        request(app)
          .get(`/cases/${formId}/applicant`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.status).toBe(200);
            const caseModel = (await new Case().getCase(
              CaseTypeCode.APPLICATION,
              formId
            )) as Application;
            const form = await caseModel.getForm();
            const result: any = await caseModel.getApplicantsByCaseId(
              form[0].fk_case_id
            );
            expect(result.individuals.length).toBe(0);
            expect(result.company[0].result).toMatchObject(
              res.body.data.attributes.company[0]
            );
            done();
          });
      });
  });
});
