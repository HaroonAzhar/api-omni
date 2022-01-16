import request from "supertest";

import app from "../../../../src/app";
import Case, { CaseTypeCode } from "../../../../src/models/Case";
import Application from "../../../../src/models/Application";
import toStepBeEditedInForm from "../../utils/to_step_be_edited_in_form";

export default async (
  formId: string,
  done: (err?: Error) => Record<string, unknown>
) => {
  const data: any = (await import("../../json/update_case_property")).data;
  data.data.id = formId;
  request(app)
    .post(`/cases/${formId}/property`)
    .set("Accept", "application/vnd.api+json")
    .set("Content-Type", "application/vnd.api+json")
    .send(data)
    .end(async (err, res) => {
      if (err) done(err);
      expect(res.status).toBe(200);
      expect(res.body.data.attributes.result).toBe(true);

      data.data.attributes.properties.forEach((value: any) => {
        if ("manual" !== value.details.selected_contact_for_access_valuation) {
          value.details.contact_for_access_valuation_name = "";
          value.details.contact_for_access_valuation_phone = "";
          value.details.contact_for_access_valuation_email = "";
        }

        if ("manual" !== value.details.selected_contact_for_payment_valuation) {
          value.details.contact_for_payment_valuation_name = "";
          value.details.contact_for_payment_valuation_phone = "";
          value.details.contact_for_payment_valuation_email = "";
        }
      });

      const caseModel = (await new Case().getCase(
        CaseTypeCode.APPLICATION,
        formId
      )) as Application;
      const form = await caseModel.getForm();
      expect(form[0].properties).toMatchObject(data.data.attributes.properties);

      toStepBeEditedInForm(form, "security_details");

      done();
    });
};
