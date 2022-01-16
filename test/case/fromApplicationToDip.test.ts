import request from "supertest";

import app from "../../src/app";
import db from "../../src/db";
import { BaseModel } from "../../src/models/BaseModel";
import Case, { CaseTypeCode } from "../../src/models/Case";
import ApplicationStep from "../../src/models/Application/ApplicationStep";
import Applicant from "../../src/models/Applicant";
import ApplicationStepStatusType from "../../src/models/Application/ApplicationStepStatusType";
import ApplicantCreditHistory from "../../src/models/Applicant/ApplicantCreditHistory";
import ApplicantAssetsLiabilitiesAdditional from "../../src/models/Applicant/ApplicantAssetsLiabilitiesAdditional";

BaseModel.registerKnex(db);
let formId: string;

describe("Conversion from Application to Dip Test", () => {
  const specificStepName = "loan_details";
  it("should create base flow", async () => {
    formId = (await (await import("./flow/application/base_flow"))
      .default) as string;

    // We set only one step to Edited
    const caseModel = new Case();
    const model = await caseModel.getCase(CaseTypeCode.ALL, formId);
    const caseData = await model.getForm();
    const stepModel = new ApplicationStep();
    await stepModel.changeStatus(
      specificStepName,
      caseData[0].fk_case_id,
      "Edited"
    );

    const [{ steps }] = caseData;
    expect(steps.length).toBe(11);
  });

  it("should save property", async (done) => {
    (await import("./flow/application/property")).default(formId, done);
  });

  it("should convert application to dip", async (done) => {
    const data = {
      data: {
        type: "application_form",
        id: formId,
        attributes: {
          step_id: "back_to_dip",
        },
      },
    };

    request(app)
      .patch(`/cases/${formId}`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(data)
      .end(async (err, res) => {
        if (err) {
          done(err);
        }

        const caseModel = new Case();
        const model = await caseModel.getCase(CaseTypeCode.ALL, formId);
        const caseData = await model.getForm();

        expect(caseData.length).toEqual(1);
        expect(res.status).toEqual(200);

        expect(caseData[0].stage).toEqual("dip");
        expect(caseData[0].status).toEqual("issued");
        expect(caseData[0].editing_as_dip).toEqual(true);

        done();
      });
  });

  it("should select introducer form", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: formId,
        attributes: {
          dip: {
            type_of_introducer: "via_broker",
          },
          step_id: "introducer_details_form",
        },
      },
    };

    request(app)
      .patch(`/cases/${formId}/dip`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(data)
      .end(async (err, res) => {
        if (err) done(err);
        expect(res.body.data.attributes.dip["type_of_introducer"]).toBe(
          "via_broker"
        );
        done();
      });
  });

  it("should convert dip to application", async (done) => {
    const data = {
      data: {
        type: "application_form",
        id: formId,
        attributes: {
          step_id: "back_to_application",
        },
      },
    };

    request(app)
      .patch(`/cases/${formId}`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(data)
      .end(async (err, res) => {
        if (err) {
          done(err);
        }

        const caseModel = new Case();
        const model = await caseModel.getCase(CaseTypeCode.ALL, formId);
        const caseData = await model.getForm();

        expect(caseData.length).toEqual(1);
        expect(res.status).toEqual(200);

        expect(caseData[0].stage).toEqual("application");
        expect(caseData[0].editing_as_dip).toEqual(false);

        const introducerDetails = "introducer_details";

        const { steps } = caseData[0];

        interface Step {
          name: string;
          status: string;
        }

        const otherSteps = steps.filter(
          (step: Step) =>
            ![specificStepName, "security_details"].includes(step.name)
        );
        otherSteps.forEach((step: Step) => expect(step.status).toBe("New"));

        expect(
          steps.map((step: Step) => step.name).includes(introducerDetails)
        ).toBe(true);

        done();
      });
  });
});
