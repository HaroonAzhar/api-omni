import request from "supertest";

import app from "../../../../../src/app";
import db from "../../../../../src/db";
import { BaseModel } from "../../../../../src/models/BaseModel";
import Case, { CaseTypeCode } from "../../../../../src/models/Case";
import Application from "../../../../../src/models/Application";
import toStepBeEditedInForm from "../../../utils/to_step_be_edited_in_form";

BaseModel.registerKnex(db);

const TIMEOUT = 90000;

describe("Company", () => {
  let formId: any;
  beforeAll(async () => {
    formId = await (await import("../../../flow/application/base_flow"))
      .default;
  });
  let companyData: any = null;
  describe("Base Flow", () => {
    const labels = ["insert", "update"];
    for (let i = 0; i < 2; i++) {
      it(`${labels[i]}`, async (done) => {
        const data: any = (await import("../../../json/applicant_company_flow"))
          .data;
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
            const result: any = await caseModel.getApplicantsByCaseId(
              form[0].fk_case_id
            );
            for (const pKey in data.data.attributes.company) {
              expect(result.company[0].result[pKey]).toMatchObject(
                data.data.attributes.company[pKey]
              );
              companyData = result.company[0].result;
            }

            toStepBeEditedInForm(form, "company_details");

            done();
          });
      });
    }
  });

  it(
    "Should not reset company if sent applicants",
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
          expect(result.company.length).toBeGreaterThan(1);
          expect(result.individuals.length).toBe(
            data.data.attributes.individuals.length
          );

          for (const pKey of Object(data.data.attributes.individuals).keys()) {
            expect(result.individuals[pKey].result).toMatchObject(
              data.data.attributes.individuals[pKey]
            );
          }
          done();
        });
    },
    TIMEOUT
  );

  it(
    "Should save company applicants",
    async (done) => {
      // POST /cases/:id/applicant
      const data: any = (
        await import("../../../json/applicant_company_with_individuals")
      ).data;
      data.data.attributes.individuals = [];
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
          request(app)
            .get(`/cases/${formId}/applicant`)
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(200);
              const record = res.body.data.attributes.company;
              expect(record[0]).toMatchObject(data.data.attributes.company);
              done();
            });
        });
    },
    TIMEOUT
  );
  it("Should save shareholder companies as other applicant companies", async (done) => {
    // POST /cases/:id/applicant
    const data = {
      data: {
        type: "applicant_form",
        id: "TO_BE_GENERATED_FROM_TEST",
        attributes: {
          company: {
            base_data: {
              name: "parent company",
            },
            shared_holders: [
              {
                name: "individual",
                isCompany: false,
              },
              {
                name: "child company",
                isCompany: true,
                company: [
                  {
                    name: "individual2",
                    isCompany: false,
                  },
                  {
                    name: "child child company 1",
                    isCompany: true,
                    company: [
                      { name: "individual 3", isCompany: false },
                      { name: "individual 4", isCompany: false },
                    ],
                  },
                  {
                    name: "child child company 2",
                    isCompany: true,
                    company: [{ name: "individual 5", isCompany: false }],
                  },
                ],
              },
            ],
          },
        },
      },
    };
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
        expect(result.company.length).toBe(4);
        expect(result.company[0].name).toBe("parent company");

        const expectedNames = [
          "parent company",
          "child company",
          "child child company 1",
          "child child company 2",
        ];

        const actualNames = result.company.map(({ name }) => name);

        expect(actualNames.sort()).toEqual(expectedNames.sort());
        done();
      });
  });

  it(
    "should update applicant company",
    (done) => {
      request(app)
        .get(`/cases/${formId}/applicant`)
        .set("Accept", "application/vnd.api+json")
        .set("Content-Type", "application/vnd.api+json")
        .end(async (err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          const endpoint = await import(
            "../../../json/applicant_company_update_flow"
          );
          const applicantsLength = res.body.data.attributes.company.length;
          let processed = 0;
          const insertedData: any = {};
          for (const record of res.body.data.attributes.company) {
            const data = endpoint.generateEndpoint();
            data.data.id = formId;
            data.data.attributes.applicant_id = record.applicant_id;
            insertedData[record.applicant_id] = data.data.attributes;
            request(app)
              .patch(
                `/cases/${formId}/applicant/company/${record.applicant_id}`
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
                      const records = res.body.data.attributes.company;
                      for (const pKey of Object(records).keys()) {
                        if (
                          insertedData[records[pKey].applicant_id] !== undefined
                        ) {
                          expect(records[pKey]).toMatchObject(
                            insertedData[records[pKey].applicant_id]
                          );
                        }
                      }

                      done();
                    });
                }
              });
          }
        });
    },
    TIMEOUT
  );
});
