import request from "supertest";

import app from "../../src/app";
import Case, { CaseTypeCode } from "../../src/models/Case";
import Application from "../../src/models/Application";
import AmlKyc from "../../src/models/AmlKyc";

let formId: any;
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe("AML Kyc Test Case", () => {
  beforeAll(async () => {
    formId = await (await import("./flow/application/base_flow")).default;
  });

  it("should pass individual flow", async (done) => {
    const data = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          voters_roll: true,
          aml: false,
          aml_details: "asd",
          ccj: false,
          cifas: false,
          cifas_details: "re",
          creditsafe: true,
          creditsafe_details: "asd",
          google_search: true,
          google_search_details: "ads",
          experian_risk_score: 19,
          proof_of_address: "BANK_STATEMENT",
          additional_proof_of_address: "BANK_STATEMENT",
          proof_of_right_to_remain: "Proof of Indefinite Leave to Remain",
          proof_of_address_details: "fsf",
          proof_of_id: "NORTHERN_IRELAND_CARD",
          proof_of_id_details: "fsgf",
          proof_of_id_expiry_date: "07/09/2028",
          client_arrival_in_uk: true,
          third_party_verification: false,
          is_pep: false,
          electronic_document_check_satisfactory: false,
          is_on_sanctions_list: false,
          copies_on_file: false,
          adverse_media_check_satisfactory: false,
          links_to_high_risk_jurisdiction: "iran",
          any_suspicion_of_money_laundering: true,
          additional_notes: "asd",
          creditsafe_clear: true,
          creditsafe_clear_details: "tesd",
        },
      },
    };

    const individualData: any = (
      await import("./json/applicant_individual_flow")
    ).data;
    individualData.data.id = formId;
    request(app)
      .post(`/cases/${formId}/applicant`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(individualData)
      .end(async (err, res) => {
        if (err) done(err);
        expect(res.status).toBe(200);
        expect(res.body.data.attributes.result).toBe(true);
        const caseModel = (await new Case().getCase(
          CaseTypeCode.APPLICATION,
          formId
        )) as Application;
        const result = await caseModel.getApplicantsByCaseId(caseModel.id);

        request(app)
          .post(
            `/cases/${formId}/applicant/individuals/${result.individuals[0].applicant_id}/aml_kyc`
          )
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(data)
          .end(async (err, res) => {
            if (err) done(err);
            const caseModel = (await new Case().getCase(
              CaseTypeCode.APPLICATION,
              formId
            )) as Application;
            const result = await caseModel.getApplicantsByCaseId(caseModel.id);

            expect(res.status).toBe(200);
            expect(result.individuals[0].result.aml_kyc).toMatchObject(
              data.data.attributes
            );
            done();
          });
      });
  }, 90000);

  it("should pass company flow", async (done) => {
    const data: any = [];
    data[0] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "club",
          is_pep: true,
          electronic_document_check_satisfactory: true,
          is_on_sanctions_list: true,
          copies_on_file: true,
          adverse_media_check_satisfactory: true,
          links_to_high_risk_jurisdiction: "n/a",
          any_suspicion_of_money_laundering: true,
          individuals_shareholders: false,
          company_shareholders: true,
        },
      },
    };

    data[1] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "public registered company",
          sedol_no_exchange: "fd12",
          evidence_of_authority_to_act_for_firm: true,
          is_pep: false,
          electronic_document_check_satisfactory: true,
          is_on_sanctions_list: false,
          copies_on_file: true,
          adverse_media_check_satisfactory: false,
          links_to_high_risk_jurisdiction: "bahamas",
          any_suspicion_of_money_laundering: true,
        },
      },
    };

    data[2] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "subsidiary of public registered company",
          sedol_no_exchange: "1231",
          evidence_of_authority_to_act_for_firm: true,
          is_pep: false,
          electronic_document_check_satisfactory: true,
          is_on_sanctions_list: false,
          copies_on_file: true,
          adverse_media_check_satisfactory: false,
          links_to_high_risk_jurisdiction: "iran",
          any_suspicion_of_money_laundering: false,
          verification_company_is_subsidiary: true,
        },
      },
    };

    data[3] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "partnership / unincorporated business",
          sedol_no_exchange: "1231",
          evidence_of_authority_to_act_for_firm: true,
          is_pep: true,
          electronic_document_check_satisfactory: false,
          is_on_sanctions_list: true,
          copies_on_file: false,
          adverse_media_check_satisfactory: true,
          links_to_high_risk_jurisdiction: "ghana",
          any_suspicion_of_money_laundering: false,
          verification_company_is_subsidiary: true,
          evidence_of_trading_address: "bank statement dated within 3 months",
          purpose_of_partnership: "fafdafdfasdaddasdfadsfasdfas",
          number_of_individuals: "3",
        },
      },
    };

    data[4] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "partnership / unincorporated business",
          sedol_no_exchange: "1231",
          evidence_of_authority_to_act_for_firm: true,
          is_pep: false,
          electronic_document_check_satisfactory: false,
          is_on_sanctions_list: true,
          copies_on_file: false,
          adverse_media_check_satisfactory: true,
          links_to_high_risk_jurisdiction: "n/a",
          any_suspicion_of_money_laundering: true,
          verification_company_is_subsidiary: true,
          evidence_of_trading_address: "bank statement dated within 3 months",
          purpose_of_partnership: "asdad",
          number_of_individuals: "3",
          partnership_agreement_on_file: "yes",
          partner_verified_as_individual: false,
          person_with_control_verified_as_individual: true,
        },
      },
    };

    data[5] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "partnership / unincorporated business",
          sedol_no_exchange: "1231",
          evidence_of_authority_to_act_for_firm: true,
          is_pep: false,
          electronic_document_check_satisfactory: false,
          is_on_sanctions_list: true,
          copies_on_file: false,
          adverse_media_check_satisfactory: true,
          links_to_high_risk_jurisdiction: "n/a",
          any_suspicion_of_money_laundering: true,
          verification_company_is_subsidiary: true,
          evidence_of_trading_address: "bank statement dated within 3 months",
          purpose_of_partnership: "asdad",
          number_of_individuals: "3",
          partnership_agreement_on_file: "yes",
          partner_verified_as_individual: false,
          person_with_control_verified_as_individual: true,
        },
      },
    };

    data[6] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "private company",
          sedol_no_exchange: "1231",
          evidence_of_authority_to_act_for_firm: true,
          is_pep: true,
          electronic_document_check_satisfactory: false,
          is_on_sanctions_list: true,
          copies_on_file: false,
          adverse_media_check_satisfactory: true,
          links_to_high_risk_jurisdiction: "ethiopia",
          any_suspicion_of_money_laundering: false,
          verification_company_is_subsidiary: true,
          evidence_of_trading_address: "bank statement dated within 3 months",
          purpose_of_partnership: "asdad",
          number_of_individuals: "43",
          partnership_agreement_on_file: "yes",
          partner_verified_as_individual: true,
          person_with_control_verified_as_individual: true,
          certificate_of_incorporation: true,
          list_of_shareholders: false,
          verification_documents_on_file:
            "bank or mortgage statement dated within 3 months",
          shareholders_verified_as_individual: false,
          person_with_interest_verified_as_individual: false,
        },
      },
    };

    data[7] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "lawyer",
          sedol_no_exchange: "1231",
          evidence_of_authority_to_act_for_firm: true,
          is_pep: false,
          electronic_document_check_satisfactory: true,
          is_on_sanctions_list: false,
          copies_on_file: false,
          adverse_media_check_satisfactory: false,
          links_to_high_risk_jurisdiction: "botswana",
          any_suspicion_of_money_laundering: true,
          verification_company_is_subsidiary: true,
          evidence_of_trading_address: "bank statement dated within 3 months",
          purpose_of_partnership: "asdad",
          number_of_individuals: "23",
          partnership_agreement_on_file: "yes",
          partner_verified_as_individual: true,
          person_with_control_verified_as_individual: true,
          certificate_of_incorporation: true,
          list_of_shareholders: false,
          verification_documents_on_file:
            "bank or mortgage statement dated within 3 months",
          shareholders_verified_as_individual: false,
          person_with_interest_verified_as_individual: false,
          law_society_membership_confirmed: true,
        },
      },
    };

    data[8] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "accountant",
          sedol_no_exchange: "1231",
          evidence_of_authority_to_act_for_firm: true,
          is_pep: true,
          electronic_document_check_satisfactory: false,
          is_on_sanctions_list: true,
          copies_on_file: false,
          adverse_media_check_satisfactory: true,
          links_to_high_risk_jurisdiction: "panama",
          any_suspicion_of_money_laundering: true,
          verification_company_is_subsidiary: true,
          evidence_of_trading_address: "bank statement dated within 3 months",
          purpose_of_partnership: "asdad",
          number_of_individuals: "43",
          partnership_agreement_on_file: "yes",
          partner_verified_as_individual: true,
          person_with_control_verified_as_individual: true,
          certificate_of_incorporation: true,
          list_of_shareholders: false,
          verification_documents_on_file:
            "bank or mortgage statement dated within 3 months",
          shareholders_verified_as_individual: false,
          person_with_interest_verified_as_individual: false,
          law_society_membership_confirmed: true,
          icaew_membership_confirmed: true,
        },
      },
    };

    data[9] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          corporate_structure: "trust",
          sedol_no_exchange: "1231",
          evidence_of_authority_to_act_for_firm: true,
          is_pep: true,
          electronic_document_check_satisfactory: false,
          is_on_sanctions_list: true,
          copies_on_file: true,
          adverse_media_check_satisfactory: true,
          links_to_high_risk_jurisdiction: "panama",
          any_suspicion_of_money_laundering: true,
          verification_company_is_subsidiary: true,
          evidence_of_trading_address: "bank statement dated within 3 months",
          purpose_of_partnership: "asdad",
          number_of_individuals: "43",
          partnership_agreement_on_file: "yes",
          partner_verified_as_individual: true,
          person_with_control_verified_as_individual: true,
          certificate_of_incorporation: true,
          list_of_shareholders: false,
          verification_documents_on_file:
            "bank or mortgage statement dated within 3 months",
          shareholders_verified_as_individual: false,
          person_with_interest_verified_as_individual: false,
          law_society_membership_confirmed: true,
          icaew_membership_confirmed: true,
          settlor_type: "individual",
          trustee_type: "individual",
          controller_type: "corporate",
          source_of_funds_confirmed: true,
        },
      },
    };

    data[10] = {
      data: {
        type: "aml_kyc_form",
        id: "3b9d1628-c868-4a6a-951d-cdc52e25c370",
        attributes: {
          creditsafe: false,
          creditsafe_details: "sdfd",
          ccj: true,
          ccj_details: "asd",
        },
      },
    };

    const requestStep = async (
      stepId: number,
      callback: () => void,
      doneCallback: () => void
    ) => {
      const companyData: any = (await import("./json/applicant_company_flow"))
        .data;
      companyData.data.id = formId;
      request(app)
        .post(`/cases/${formId}/applicant`)
        .set("Accept", "application/vnd.api+json")
        .set("Content-Type", "application/vnd.api+json")
        .send(companyData)
        .end(async (err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body.data.attributes.result).toBe(true);
          const caseModel = (await new Case().getCase(
            CaseTypeCode.APPLICATION,
            formId
          )) as Application;
          const result = await caseModel.getApplicantsByCaseId(caseModel.id);

          request(app)
            .post(
              `/cases/${formId}/applicant/company/${result.company[0].applicant_company_id}/aml_kyc`
            )
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .send(data[stepId])
            .end(async (err, res) => {
              if (err) done(err);
              console.log(stepId);

              const caseModel = (await new Case().getCase(
                CaseTypeCode.APPLICATION,
                formId
              )) as Application;
              const result = await caseModel.getApplicantsByCaseId(
                caseModel.id
              );

              expect(res.status).toBe(200);
              expect(result.company[0].result.aml_kyc).toMatchObject(
                data[stepId].data.attributes
              );
              callback();
              doneCallback();
            });
        });
    };

    await requestStep(
      0,
      async () => {
        await requestStep(
          1,
          async () => {
            await requestStep(
              2,
              async () => {
                await requestStep(
                  3,
                  async () => {
                    await requestStep(
                      4,
                      async () => {
                        await requestStep(
                          5,
                          async () => {
                            await requestStep(
                              6,
                              async () => {
                                await requestStep(
                                  7,
                                  async () => {
                                    await requestStep(
                                      8,
                                      async () => {
                                        await requestStep(
                                          9,
                                          async () => {
                                            await requestStep(10, noop, done);
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
  }, 900000);
});
