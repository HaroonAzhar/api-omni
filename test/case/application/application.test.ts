import request from "supertest";

import app from "../../../src/app";
import db from "../../../src/db";
import { BaseModel } from "../../../src/models/BaseModel";
import Case, { CaseTypeCode } from "../../../src/models/Case";
import Application from "../../../src/models/Application";
import toStepBeEditedInForm from "../utils/to_step_be_edited_in_form";

BaseModel.registerKnex(db);
let formId: any;
const isFormReady = new Promise((resolve) => {
  const checkInterval = setInterval(() => {
    if (formId) {
      resolve(null);
      clearInterval(checkInterval);
    }
  }, 500);
});

describe("Application Test Case", () => {
  describe("Core flow", () => {
    it("should create base flow", async () => {
      formId = await (await import("../flow/application/base_flow")).default;
      await db.table("OriginationAdmin.Solicitors").insert({ Name: "foo" });
    });
    it("update loan details", async (done) => {
      await isFormReady;
      const data: any = (await import("../json/update_loan_details")).data;
      data.data.id = formId;
      request(app)
        .patch(`/cases/${formId}/loan_details`)
        .set("Accept", "application/vnd.api+json")
        .set("Content-Type", "application/vnd.api+json")
        .send(data)
        .end(async (err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body.data.attributes.result).toBe(true);
          request(app)
            .get(`/cases/${formId}/application`)
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .send(data)
            .end(async (err, res) => {
              if (err) done(err);
              expect(res.status).toBe(200);
              expect(
                res.body.data.attributes.application.application_loan_details
              ).toMatchObject(data.data.attributes.loan_details);

              const toStepBeEdited = (
                res: request.Response,
                stepName: string
              ) => {
                const step = res.body.data.attributes.application.steps.find(
                  ({ name }: { name: string }) => name === stepName
                );
                expect(step.status).toBe("Edited");
              };
              toStepBeEdited(res, "loan_details");
              done();
            });
        });
    });

    it("update introduce details", async (done) => {
      await isFormReady;
      const data: any = (await import("../json/update_introducer")).data;
      data.data.id = formId;
      request(app)
        .patch(`/cases/${formId}/introducer_details`)
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
          expect(form[0].introducer_details).toMatchObject(
            data.data.attributes.introducer_details
          );

          done();
        });
    });

    it("update solicitor details", async (done) => {
      await isFormReady;
      const data: any = (await import("../json/update_solicitor")).data;
      data.data.id = formId;
      request(app)
        .patch(`/cases/${formId}/solicitors_details`)
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
          expect(form[0].solicitor_details).toMatchObject(
            data.data.attributes.solicitors_details
          );

          toStepBeEditedInForm(form, "solicitor_details");

          done();
        });
    });

    it("update additional information", async (done) => {
      await isFormReady;
      const data: any = (
        await import("../json/update_case_additional_information")
      ).data;
      data.data.id = formId;
      request(app)
        .patch(`/cases/${formId}/additional_information`)
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
          expect(form[0].additional_information).toBe(
            data.data.attributes.additional_information.additional_information
          );

          toStepBeEditedInForm(form, "additional_information");

          done();
        });
    });

    it("update additional information with empty values", async (done) => {
      await isFormReady;
      const data: any = (
        await import("../json/update_case_additional_information")
      ).data;
      data.data.id = formId;
      delete data.data.attributes.additional_information.additional_information;
      request(app)
        .patch(`/cases/${formId}/additional_information`)
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
          expect(form[0].additional_information).toBe(null);

          done();
        });
    });
  });

  it("should convert application into case_summary", async (done) => {
    const data = {
      data: {
        type: "application_form",
        id: formId,
        attributes: {
          step_id: "convert_to_case_summary",
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
        expect(caseData[0].stage).toEqual("case_summary");
        expect(caseData[0].status).toEqual("in_progress");

        caseModel.setData("stage", "application");
        await caseModel.update().where({ Id: formId });
        done();
      });
  });
});
