import request from "supertest";

import app from "../../../../src/app";
import Case, { CaseTypeCode } from "../../../../src/models/Case";
import Application from "../../../../src/models/Application";

describe("Property", () => {
  let formId: any;
  beforeAll(async () => {
    formId = await (await import("../../flow/application/base_flow")).default;
  });
  it("update property", async (done) => {
    (await import("../../flow/application/property")).default(formId, done);
  });

  it("update property allows null contacts if not manual", async (done) => {
    const data: any = (await import("../../json/update_case_property")).data;
    data.data.id = formId;

    data.data.attributes.properties[0].details.selected_contact_for_access_valuation =
      "introducer";
    data.data.attributes.properties[0].details.contact_for_access_valuation_name = null;

    data.data.attributes.properties[1].details.selected_contact_for_payment_valuation =
      "applicant";
    data.data.attributes.properties[1].details.contact_for_payment_valuation_email = null;

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
          if (
            "manual" !== value.details.selected_contact_for_access_valuation
          ) {
            value.details.contact_for_access_valuation_name = "";
            value.details.contact_for_access_valuation_phone = "";
            value.details.contact_for_access_valuation_email = "";
          }

          if (
            "manual" !== value.details.selected_contact_for_payment_valuation
          ) {
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
        expect(form[0].properties).toMatchObject(
          data.data.attributes.properties
        );

        done();
      });
  });
  it("update property blocks null contacts if manual", async (done) => {
    const data: any = (await import("../../json/update_case_property")).data;
    data.data.id = formId;

    data.data.attributes.properties[0].details.selected_contact_for_access_valuation =
      "manual";
    data.data.attributes.properties[0].details.contact_for_access_valuation_name = null;

    request(app)
      .post(`/cases/${formId}/property`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(data)
      .end(async (err, res) => {
        if (err) done(err);
        expect(res.status).toBe(400);
        done();
      });
  });
});
