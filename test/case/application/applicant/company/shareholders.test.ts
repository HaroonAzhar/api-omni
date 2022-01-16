import request from "supertest";

import app from "../../../../../src/app";
import db from "../../../../../src/db";
import { BaseModel } from "../../../../../src/models/BaseModel";
import Case, { CaseTypeCode } from "../../../../../src/models/Case";
import Application from "../../../../../src/models/Application";

BaseModel.registerKnex(db);

describe("Application company shareholder Test Case", () => {
  let formId: any;
  beforeAll(async () => {
    formId = await (await import("../../../flow/application/base_flow"))
      .default;
  });
  describe("Company create/updated", () => {
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
                    {
                      name: "child child company 4",
                      isCompany: true,
                      company: [{ name: "individual 6", isCompany: false }],
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
          expect(result.company.length).toBe(5);
          expect(result.company[0].name).toBe("parent company");

          const expectedNames = [
            "parent company",
            "child company",
            "child child company 1",
            "child child company 2",
            "child child company 4",
          ];

          const actualNames = result.company.map(({ name }) => name);

          expect(actualNames.sort()).toEqual(expectedNames.sort());

          const { company } = data.data.attributes;
          company.shared_holders[1].company = [
            {
              name: "child child company 3",
              isCompany: true,
              company: [{ name: "individual 5", isCompany: false }],
            },
            {
              name: "child child company 4",
              isCompany: true,
              company: [{ name: "individual 6", isCompany: false }],
            },
          ];
          const modifiedData = {
            data: {
              attributes: company,
              type: "applicant_form",
              id: formId,
            },
          };

          modifiedData.data.attributes = company;
          request(app)
            .patch(
              `/cases/${formId}/applicant/company/${result.company[0].applicant_company_id}`
            )
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .send(modifiedData)
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
                "child child company 3",
                "child child company 4",
              ];
              const actualNames = result.company.map(({ name }) => name);

              expect(actualNames.sort()).toEqual(expectedNames.sort());

              const [childCompany] = result.company.filter(
                ({ name }) => name === "child child company 3"
              );

              expect(childCompany.shared_holders).toBe(
                JSON.stringify(company.shared_holders[1].company[0].company)
              );
              done();
            });
        });
    });
  });
});
