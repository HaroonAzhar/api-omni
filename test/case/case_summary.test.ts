import request from "supertest";

import app from "../../src/app";
import db from "../../src/db";
import { BaseModel } from "../../src/models/BaseModel";
import Case, { CaseTypeCode } from "../../src/models/Case";
import CaseStageHistory from "../../src/models/Case/CaseStageHistory";
BaseModel.registerKnex(db);
let formId: any;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
const TIMEOUT = 60000;

describe("Case Summary Test Case", () => {
  it("should create base flow", async () => {
    formId = await (await import("./flow/application/base_flow")).default;
  });

  it(
    "should save case summary",
    async (done) => {
      const requestStep = (
        stepId: string,
        data: any,
        callback: () => void,
        doneCallback: () => void
      ) => {
        const payload = {
          data: {
            type: "application_form",
            id: formId,
            attributes: {
              [stepId]: {
                ...data,
              },
            },
          },
        };

        request(app)
          .patch(`/cases/${formId}/case_summary/${stepId}`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(payload)
          .end(async (err, res) => {
            if (err) done(err);
            const caseModel = new Case();
            const model = await caseModel.getCase(CaseTypeCode.ALL, formId);
            const caseData = await model.getForm();
            expect(caseData.length).toEqual(1);
            expect(res.status).toEqual(200);
            expect(caseData[0].summary[stepId]).toMatchObject(data);
            callback();
            doneCallback();
          });
      };
      const data: any = (await import("./json/case_summary")).data;

      requestStep(
        "overview",
        data.data.attributes.summary.overview,
        () => {
          requestStep(
            "security",
            data.data.attributes.summary.security,
            () => {
              requestStep(
                "loan",
                data.data.attributes.summary.loan,
                () => {
                  requestStep(
                    "risk_mitigations",
                    data.data.attributes.summary.risk_mitigations,
                    () => {
                      requestStep(
                        "further_comments",
                        data.data.attributes.summary.further_comments,
                        () => {
                          requestStep(
                            "borrower",
                            data.data.attributes.summary.borrower,
                            noop,
                            done
                          );
                        },
                        noop
                      );
                    },
                    noop
                  );
                },
                noop
              );
            },
            noop
          );
        },
        noop
      );
    },
    TIMEOUT
  );

  it("should convert case_summary into completed", async (done) => {
    const data = {
      data: {
        type: "application_form",
        id: formId,
        attributes: {
          step_id: "convert_to_completed",
        },
      },
    };

    const checkIfStageChangeWasStored = async (FkCaseId: number) => {
      const caseStageHistoryModel = new CaseStageHistory();
      const caseStageHistoryData = await caseStageHistoryModel
        .select()
        .where({ FkCaseId });

      expect(caseStageHistoryData.length).toBeGreaterThan(0);
      const lastEvent = caseStageHistoryData[caseStageHistoryData.length - 1];

      expect(lastEvent.command).toBe("convert_to_completed");
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
        expect(caseData[0].stage).toEqual("completed");
        expect(caseData[0].status).toEqual("live");

        await checkIfStageChangeWasStored(caseData[0].fk_case_id);
        done();
      });
  });
});
