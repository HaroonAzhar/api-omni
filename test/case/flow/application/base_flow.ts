import request from "supertest";

import app from "../../../../src/app";
import Case, { CaseTypeCode } from "../../../../src/models/Case";

const runFlow = (resolve: (formId: string) => void) => {
  let formId: string;
  request(app)
    .post("/cases")
    .set("Accept", "application/vnd.api+json")
    .set("Content-Type", "application/vnd.api+json")
    .send()
    .end(async (err, res) => {
      if (err) throw new Error(err);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("attributes");
      expect(res.body.data.attributes).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("type");
      expect(res.body.data.id.length).toBe(36);
      formId = res.body.data.id;

      request(app)
        .post(`/cases/${formId}/dip`)
        .set("Accept", "application/vnd.api+json")
        .set("Content-Type", "application/vnd.api+json")
        .send()
        .end(async (err, res) => {
          if (err) throw new Error(err);
          expect(res.body).toHaveProperty("data");
          expect(res.body.data).toHaveProperty("attributes");
          expect(res.body.data.attributes).toHaveProperty("id");
          expect(res.body.data).toHaveProperty("type");
          expect(res.body.data.id.length).toBe(36);

          const data = {
            data: {
              type: "dip_form",
              id: formId,
              attributes: {
                step_id: "convert_to_application",
              },
            },
          };

          request(app)
            .patch(`/cases/${formId}`)
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .send(data)
            .end(async (err, res) => {
              if (err) throw new Error(err);
              expect(res.status).toBe(200);
              const caseModel = new Case();
              const model = await caseModel.getCase(
                CaseTypeCode.APPLICATION,
                formId
              );
              const dip = await model.getForm();
              expect(dip.length).toEqual(1);
              expect(dip[0].status).toBe("in_progress");
              expect(res.status).toEqual(200);
              resolve(formId);
            });
        });
    });
};

export default new Promise((resolve) => {
  runFlow(resolve);
});
