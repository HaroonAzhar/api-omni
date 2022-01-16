import request from "supertest";

import app from "../../../../../src/app";
import db from "../../../../../src/db";
import { BaseModel } from "../../../../../src/models/BaseModel";
import Case, { CaseTypeCode } from "../../../../../src/models/Case";
import Application from "../../../../../src/models/Application";
import toStepBeEditedInForm from "../../../utils/to_step_be_edited_in_form";

BaseModel.registerKnex(db);

const TIMEOUT = 60000;

describe("Individual", () => {
  let formId: any;
  beforeAll(async () => {
    formId = await (await import("../../../flow/application/base_flow"))
      .default;
  });
  describe("Base Flow", () => {
    const labels = ["insert", "update"];
    for (let i = 0; i < 2; i++) {
      it(
        `${labels[i]}`,
        async (done) => {
          // POST /cases/:id/applicant
          const data: any = (
            await import("../../../json/applicant_individual_flow")
          ).data;
          data.data.id = formId;
          request(app)
            .post(`/cases/${formId}/applicant`)
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .send(data)
            .end(async (err, res) => {
              if (err) done(err);
              expect(res.status).toBe(200);
              expect(res.body.data.attributes.result).toBe(true);
              const caseModel = (await new Case().getCase(
                CaseTypeCode.APPLICATION,
                formId
              )) as Application;
              const form = await caseModel.getForm();
              const result = await caseModel.getApplicantsByCaseId(
                form[0].fk_case_id
              );
              expect(result.individuals.length).toBe(
                data.data.attributes.individuals.length
              );

              for (const pKey of Object(
                data.data.attributes.individuals
              ).keys()) {
                expect(result.individuals[pKey].result).toMatchObject(
                  data.data.attributes.individuals[pKey]
                );
              }
              toStepBeEditedInForm(form, "applicant_details");
              toStepBeEditedInForm(form, "declarations");
              done();
            });
        },
        TIMEOUT
      );
    }
  });

  describe("Should update credit history for individuals", () => {
    const labels = ["insert", "update"];
    for (let i = 0; i < 2; i++) {
      it(`${labels[i]}`, async (done) => {
        request(app)
          .get(`/cases/${formId}/applicant`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.status).toBe(200);
            const endpoint = await import(
              "../../../json/applicant_credit_history_flow"
            );
            const applicantsLength =
              res.body.data.attributes.individuals.length;
            let processed = 0;
            const insertedData: any = {};
            for (const value of res.body.data.attributes.individuals) {
              const data = endpoint.generateEndpoint();
              data.data.id = formId;
              insertedData[value.applicant_id] =
                data.data.attributes.credit_history;
              request(app)
                .patch(
                  `/cases/${formId}/applicant/individual/${value.applicant_id}`
                )
                .send(data)
                .set("Accept", "application/vnd.api+json")
                .set("Content-Type", "application/vnd.api+json")
                .end(async (err, res) => {
                  if (err) done(err);
                  expect(res.status).toBe(200);

                  processed++;

                  if (applicantsLength === processed) {
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
                          expect(
                            result.individuals[pKey].result.credit_history
                          ).toMatchObject(
                            insertedData[
                              result.individuals[pKey].result.applicant_id
                            ]
                          );
                        }

                        toStepBeEditedInForm(form, "credit_history");

                        done();
                      });
                  }
                });
            }
          });
      });
    }
  });

  describe("Should update declarations for individuals", () => {
    const labels = ["insert", "update"];
    for (let i = 0; i < 2; i++) {
      it(`${labels[i]}`, async (done) => {
        request(app)
          .get(`/cases/${formId}/applicant`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.status).toBe(200);
            const endpoint = await import(
              "../../../json/applicant_declarations_flow"
            );
            const applicantsLength =
              res.body.data.attributes.individuals.length;
            let processed = 0;
            const insertedData: any = {};
            for (const value of res.body.data.attributes.individuals) {
              const data = endpoint.generateEndpoint();
              data.data.id = formId;
              insertedData[value.applicant_id] =
                data.data.attributes.declarations_signatures;
              request(app)
                .patch(
                  `/cases/${formId}/applicant/individual/${value.applicant_id}`
                )
                .send(data)
                .set("Accept", "application/vnd.api+json")
                .set("Content-Type", "application/vnd.api+json")
                .end(async (err, res) => {
                  if (err) done(err);
                  expect(res.status).toBe(200);

                  processed++;

                  if (applicantsLength === processed) {
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
                          expect(
                            result.individuals[pKey].result
                              .declarations_signatures
                          ).toMatchObject(
                            insertedData[
                              result.individuals[pKey].result.applicant_id
                            ]
                          );
                        }

                        toStepBeEditedInForm(form, "declarations");

                        done();
                      });
                  }
                });
            }
          });
      });
    }
  });

  describe("Should update attributes for individuals", () => {
    it("update", async (done) => {
      request(app)
        .get(`/cases/${formId}/applicant`)
        .set("Accept", "application/vnd.api+json")
        .set("Content-Type", "application/vnd.api+json")
        .end(async (err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          const endpoint = await import("../../../json/applicant_update_flow");
          const applicantsLength = res.body.data.attributes.individuals.length;
          let processed = 0;
          const insertedData: any = {};
          for (const value of res.body.data.attributes.individuals) {
            const data = endpoint.generateEndpoint();
            data.data.id = formId;
            data.data.attributes.applicant_id = value.applicant_id;
            insertedData[value.applicant_id] = data.data.attributes;
            request(app)
              .patch(
                `/cases/${formId}/applicant/individual/${value.applicant_id}`
              )
              .send(data)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .end(async (err, res) => {
                if (err) done(err);
                expect(res.status).toBe(200);

                processed++;

                if (applicantsLength === processed) {
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
                        console.log(pKey);
                        const record =
                          res.body.data.attributes.individuals[pKey];
                        expect(record).toMatchObject(
                          insertedData[record.applicant_id]
                        );
                      }

                      toStepBeEditedInForm(form, "assets_and_liabilities");

                      done();
                    });
                }
              });
          }
        });
    });
  });
});
