import request from "supertest";

import app from "../../../../src/app";
import Case, { CaseTypeCode } from "../../../../src/models/Case";
import Application from "../../../../src/models/Application";
import toStepBeEditedInForm from "../../utils/to_step_be_edited_in_form";

export default async (
  formId: string,
  done: (err?: Error) => Record<string, unknown>
) => {
  const data: any = (await import("../../json/applicant_individual_flow")).data;

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
      const result = await caseModel.getApplicantsByCaseId(form[0].fk_case_id);
      expect(result.individuals.length).toBe(
        data.data.attributes.individuals.length
      );

      for (const pKey of Object(data.data.attributes.individuals).keys()) {
        expect(result.individuals[pKey].result).toMatchObject(
          data.data.attributes.individuals[pKey]
        );
      }
      toStepBeEditedInForm(form, "applicant_details");
      toStepBeEditedInForm(form, "declarations");
      done();
    });
};
