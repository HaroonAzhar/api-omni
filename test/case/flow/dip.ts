import request from "supertest";

import { BaseModel } from "../../../src/models/BaseModel";
import db from "../../../src/db";
import app from "../../../src/app";
import Case, { CaseTypeCode } from "../../../src/models/Case";
import ApplicationStep from "../../../src/models/Application/ApplicationStep";

BaseModel.registerKnex(db);

let formId = "";

const dipCases = (expectedStatus: string = "pending") => {
  it("should return error if sent empty object", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {},
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
        expect(res.body).toEqual({
          errors: [
            {
              code: "400",
              title: "Validation Error",
              detail: "Cannot Find any valid action for update",
            },
          ],
        });
        done();
      });
  });

  it("should return 404 if dip form doesnt exist", (done) => {
    const expectedResponse = {
      errors: [
        {
          code: "404",
          title: "Cannot find by idd9bb143f-3545-43a6-b67e-7591887295bb",
          detail: "ID is wrong",
          source: {
            pointer: "/dip",
          },
        },
      ],
    };

    request(app)
      .patch("/cases/d9bb143f-3545-43a6-b67e-7591887295bb/dip")
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .end(async (err, res) => {
        if (err) done(err);
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expectedResponse);
        done();
      });
  });

  it("should select introducer form", async (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {
            type_of_introducer: "via_broker",
            originator: "1",
          },
          step_id: "introducer_details_form",
        },
      },
    };

    await db.table("OriginationAdmin.Originators").insert({ Name: "foo" });

    request(app)
      .post("/originators")
      .send({ Name: "foo" })
      .end(async (err, res) => {
        if (err) done(err);
        request(app)
          .patch(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(data)
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.status).toBe(200);
            expect(res.body.data.attributes.dip["type_of_introducer"]).toBe(
              "via_broker"
            );
            expect(res.body.data.attributes.dip["originator"]).toBe(1);

            done();
          });
      });
  });

  it.skip("should throw error if endpoint contains overflow data", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {
            type_of_introducer: "direct_application",
          },
          step_id: "introducer_details_form",
        },
      },
    };

    const expectedResponse = {
      errors: [
        {
          code: "400",
          title: "Unknow option fake",
          detail: "probably you selected wrong endpoint or send overflow data",
          source: {
            pointer: "/data/attributes/fake",
          },
        },
      ],
    };

    request(app)
      .patch(`/cases/${formId}/dip`)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send(data)
      .end(async (err, res) => {
        if (err) done(err);
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expectedResponse);
        done();
      });
  });

  it("should save broker information", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "ca0be236-0ecf-43b5-9443-036b413ae142",
        attributes: {
          dip: {
            broker_company_name: "Sample broker name",
            broker_name: "Piotr Zarycki",
            broker_email: "piotr.z@ucreate.it",
          },
          step_id: "broker_details_form",
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
        expect(res.body.data.attributes.dip["broker_company_name"]).toBe(
          "Sample broker name"
        );
        expect(res.body.data.attributes.dip["broker_name"]).toBe(
          "Piotr Zarycki"
        );
        expect(res.body.data.attributes.dip["broker_email"]).toBe(
          "piotr.z@ucreate.it"
        );
        expect(res.body.data.attributes.dip["status"]).toBe(expectedStatus);
        done();
      });
  });

  it("should select loan type", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {
            loan_advance_type: "single",
          },
          step_id: "type_of_loan_form",
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
        expect(res.body.data.attributes.dip["loan_advance_type"]).toBe(
          "single"
        );
        done();
      });
  });

  it("should fill security", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {
            securities: [
              {
                isManualEditVisible: true,
                security_address: "rdsa",
                security_address_line_1: "Ashton Lane",
                security_address_line_2: "Greater London, England",
                security_town_city: "Glasgow",
                security_postcode: "G12",
                security_country: "Wielka Brytania",
                security_initial_estimation: "321.2",
                security_type: "residential",
                opfl_charge_type: "first_charge",
                gdv: 321,
                current_estimated_90_day_market_value: 345,
                estimated_90_day_gdv: 456,
              },
              {
                isManualEditVisible: false,
                security_address: "fdf",
                security_address_line_1: "Dashwood Avenue",
                security_address_line_2: "Buckinghamshire, England",
                security_town_city: "High Wycombe",
                security_postcode: "HP12",
                security_country: "Wielka Brytania",
                security_initial_estimation: "312.1",
                security_type: "commercial",
                opfl_charge_type: "second_charge",
                gdv: 325,
                value_existing_mortgage: 1313,
                current_estimated_90_day_market_value: 123,
                estimated_90_day_gdv: 657,
              },
            ],
          },
          step_id: "security_details_form",
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
        expect(
          res.body.data.attributes.dip.securities[0].isManualEditVisible
        ).toBe(true);
        expect(
          res.body.data.attributes.dip.securities[0].security_address
        ).toBe("rdsa");
        expect(
          res.body.data.attributes.dip.securities[0].security_address_line_1
        ).toBe("Ashton Lane");
        expect(
          res.body.data.attributes.dip.securities[0].security_address_line_2
        ).toBe("Greater London, England");
        expect(
          res.body.data.attributes.dip.securities[0].security_town_city
        ).toBe("Glasgow");
        expect(
          res.body.data.attributes.dip.securities[0].security_postcode
        ).toBe("G12");
        expect(
          res.body.data.attributes.dip.securities[0].security_country
        ).toBe("Wielka Brytania");
        expect(
          res.body.data.attributes.dip.securities[0].security_initial_estimation
        ).toBe(321.2);
        expect(
          res.body.data.attributes.dip.securities[0].opfl_charge_type
        ).toBe("first_charge");
        expect(res.body.data.attributes.dip.securities[0].security_type).toBe(
          "residential"
        );
        expect(res.body.data.attributes.dip.securities[0].gdv).toBe(321);
        expect(
          res.body.data.attributes.dip.securities[0]
            .current_estimated_90_day_market_value
        ).toBe(345);
        expect(
          res.body.data.attributes.dip.securities[0].estimated_90_day_gdv
        ).toBe(456);

        expect(
          res.body.data.attributes.dip.securities[1].isManualEditVisible
        ).toBe(false);
        expect(
          res.body.data.attributes.dip.securities[1].security_address
        ).toBe("fdf");
        expect(
          res.body.data.attributes.dip.securities[1].security_address_line_1
        ).toBe("Dashwood Avenue");
        expect(
          res.body.data.attributes.dip.securities[1].security_address_line_2
        ).toBe("Buckinghamshire, England");
        expect(
          res.body.data.attributes.dip.securities[1].security_town_city
        ).toBe("High Wycombe");
        expect(
          res.body.data.attributes.dip.securities[1].security_postcode
        ).toBe("HP12");
        expect(
          res.body.data.attributes.dip.securities[1].security_country
        ).toBe("Wielka Brytania");
        expect(
          res.body.data.attributes.dip.securities[1].security_initial_estimation
        ).toBe(312.1);
        expect(
          res.body.data.attributes.dip.securities[1].opfl_charge_type
        ).toBe("second_charge");
        expect(res.body.data.attributes.dip.securities[1].security_type).toBe(
          "commercial"
        );
        expect(res.body.data.attributes.dip.securities[1].gdv).toBe(325);
        expect(
          res.body.data.attributes.dip.securities[1].value_existing_mortgage
        ).toBe(1313);
        expect(
          res.body.data.attributes.dip.securities[1]
            .current_estimated_90_day_market_value
        ).toBe(123);
        expect(
          res.body.data.attributes.dip.securities[1].estimated_90_day_gdv
        ).toBe(657);
        expect(res.body.data.attributes.dip.status).toBe(expectedStatus);

        done();
      });
  });

  it("should select type of building", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {
            building_type: "development",
          },
          step_id: "loan_property_type_form",
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
        expect(res.body.data.attributes.dip["building_type"]).toBe(
          "development"
        );
        expect(res.body.data.attributes.dip["status"]).toBe(expectedStatus);
        done();
      });
  });

  it("should fill loan details", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {
            loan_term: "12",
            type_of_loan: "retained",
            loan_purpose: "purchase",
          },
          step_id: "loan_details_form",
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
        expect(res.body.data.attributes.dip["loan_term"]).toBe(12);
        expect(res.body.data.attributes.dip["type_of_loan"]).toBe("retained");
        expect(res.body.data.attributes.dip["loan_purpose"]).toBe("purchase");
        expect(res.body.data.attributes.dip["status"]).toBe(expectedStatus);
        done();
      });
  });

  it("should save hybrid data", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "f4a88e78-5b81-4533-b5d4-cc78c2f8aad3",
        attributes: {
          dip: {
            loan_term: "30",
            type_of_loan: "hybrid",
            hybrid_option: {
              retained: "10",
              serviced: "20",
              rolled_up: "30",
            },
          },
          step_id: "loan_details_form",
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
        expect(res.body.data.attributes.dip["hybrid_option"].retained).toBe(10);
        expect(res.body.data.attributes.dip["hybrid_option"].serviced).toBe(20);
        expect(res.body.data.attributes.dip["hybrid_option"].rolled_up).toBe(
          30
        );
        done();
      });
  });

  //@TODO delete it after make validation for calculator step
  it.skip("should select financial details form", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {
            net_loan_amount: "12",
            gross_loan_amount: "12",
            estimated_interest: "12",
            purchase_price: "123",
            arrangement_fee_advance_date: "123",
            arrangement_fee_repayment_date: "12",
            interest_rate: "21",
            title_insurance_fee: "123",
            legal_fee: "123",
            intermediary_commission_fee: "123",
            completion_administration_fee: "300.20",
            premium_for_lenders_insurance: "250.30",
          },
          step_id: "financial_details_form",
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
        expect(res.body.data.attributes.dip["net_loan_amount"]).toBe(12);
        expect(res.body.data.attributes.dip["gross_loan_amount"]).toBe(12);
        expect(res.body.data.attributes.dip["estimated_interest"]).toBe(12);
        expect(res.body.data.attributes.dip["purchase_price"]).toBe(123);
        expect(
          res.body.data.attributes.dip["arrangement_fee_advance_date"]
        ).toBe(123);
        expect(
          res.body.data.attributes.dip["arrangement_fee_repayment_date"]
        ).toBe(12);
        expect(res.body.data.attributes.dip["interest_rate"]).toBe(21);
        expect(res.body.data.attributes.dip["title_insurance_fee"]).toBe(123);
        expect(res.body.data.attributes.dip["legal_fee"]).toBe(123);
        expect(
          res.body.data.attributes.dip["intermediary_commission_fee"]
        ).toBe(123);
        expect(
          res.body.data.attributes.dip["completion_administration_fee"]
        ).toBe(300.2);
        expect(
          res.body.data.attributes.dip["premium_for_lenders_insurance"]
        ).toBe(250.3);
        expect(res.body.data.attributes.dip["status"]).toBe(expectedStatus);
        done();
      });
  });

  it("should select further financial details", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {
            max_ltv: "12.44",
            ltv_to_gdv: "54.88",
            progress_report: "43",
            appraisal_report: "231",
            further_draw_downs: "321",
            build_period: "123",
            legal_fee: 999,
          },
          step_id: "further_financial_details_form",
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
        expect(res.body.data.attributes.dip["max_ltv"]).toBe(12.44);
        expect(res.body.data.attributes.dip["ltv_to_gdv"]).toBe(54.88);
        expect(res.body.data.attributes.dip["progress_report"]).toBe(43);
        expect(res.body.data.attributes.dip["appraisal_report"]).toBe(231);
        expect(res.body.data.attributes.dip["build_period"]).toBe(123);
        expect(res.body.data.attributes.dip["further_draw_downs"]).toBe(321);
        expect(res.body.data.attributes.dip["legal_fee"]).toBe(999);
        expect(res.body.data.attributes.dip["status"]).toBe(expectedStatus);
        done();
      });
  });

  it("should read status", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
        attributes: {
          dip: {
            type_of_introducer: "direct_application",
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
        expect(res.body.data.attributes.dip["status"]).toBe(expectedStatus);
        done();
      });
  });
  it("should save calculator step", (done) => {
    const data: any = {
      data: {
        type: "dip_form",
        id: formId,
        attributes: {
          dip: {
            interest_rate: 1,
            title_insurance_fee: 1,
            market_value: 123,
            premium_for_lenders_insurance: 250,
            completion_administration_fee: 400,
            starting_point: "market_value",
            start_date: "2010-10-09T22:00:00.000Z",
            further_advances: [1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1],
            arrangement_fee_advance_date_percent: 1,
            intermediary_commission_fee_percent: 1,
            is_manual_mode: true,
            exit_fee_intermediary: 122.31,
            calculator_response: {
              advanced_interest: 1966.89,
              arrangement_fee_in_value: 163.91,
              broker_fee_in_value: 247.28,
              broker_fee_out_value: 247.28,
              drawdowns: [
                {
                  advance: 1296.96,
                  arr_fee_out: 0,
                  date: "20/02/2021",
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 1966.89,
                  interest_paid: 0,
                  total_fees: 814.91,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 0,
                  date: null,
                  end_bal: 4078.76,
                  gross_ltgdv: 33.1607,
                  gross_ltv: 33.1607,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
                {
                  advance: 0,
                  arr_fee_out: 1.23,
                  date: null,
                  end_bal: 4079.99,
                  gross_ltgdv: 33.1707,
                  gross_ltv: 33.1707,
                  interest: 0,
                  interest_paid: 0,
                  total_fees: 0,
                },
              ],
              exit_fee_value: 1.23,
              gross_amount_of_first_advance: 4078.76,
              gross_amount_at_maturity: 324.34,
              total_interest: 234.32,
              gross_amount_for_ltv: 4328.23,
              arrangement_fee_retained_value: 90.23,
              exit_fee_retained_value: 45.54,
              total_loan_facility_excluding_interest: 436.09,
              gross_day_one_ltv: 33.161,
              gross_loan: 16390.76,
              gross_loan_first_advance: 4078.76,
              max_total_net_loan_available: 1296.96,
              net_amount_of_first_advance: 1296.96,
              total_fees: 651,
              total_loan_amount: 13608.96,
              total_loan_facility: 16390.76,
              xirr: 0.16,
              repayment_date: "2011-10-09T22:00:00.000Z",
              maturity_date: "2011-10-08T22:00:00.000Z",
              gdltv: 0.54,
              serviced_interest_total: 53.45,
            },
          },
          step_id: "financial_details_calculator",
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
        const expectationCallback = (response: any, overrideDipData?: any) => {
          let dipData: any = data.data.attributes.dip;
          if (overrideDipData) dipData = overrideDipData;
          for (const key in dipData) {
            const responseData = response.body.data.attributes.dip[key];
            switch (key) {
              case "further_advances":
                expect(responseData).toEqual(dipData[key]);
                break;

              case "calculator_response":
                for (const k in dipData.calculator_response) {
                  if (k === "drawdowns") {
                    expect(
                      response.body.data.attributes.dip.calculator_response[k]
                        .length
                    ).toBe(dipData.calculator_response.drawdowns.length);
                    expect(
                      response.body.data.attributes.dip.calculator_response[k]
                    ).toEqual(dipData.calculator_response[k]);
                  } else {
                    expect(
                      response.body.data.attributes.dip.calculator_response[k]
                    ).toBe(dipData.calculator_response[k]);
                  }
                }
                break;
              default:
                expect(responseData).toBe(dipData[key]);
            }
          }
        };

        expectationCallback(res);

        data.data.attributes.dip.intermediary_commission_fee_value = null;
        data.data.attributes.dip.intermediary_commission_fee_percent = 30;

        request(app)
          .patch(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(data)
          .end(async (err, res) => {
            if (err) done(err);
            expectationCallback(res);
            data.data.attributes.dip.arrangement_fee_advance_date_value = null;
            data.data.attributes.dip.arrangement_fee_advance_date_percent = 33.55;
            request(app)
              .patch(`/cases/${formId}/dip`)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .send(data)
              .end(async (err, res) => {
                if (err) done(err);
                expectationCallback(res);
                data.data.attributes.dip.arrangement_fee_repayment_date_value = null;
                request(app)
                  .patch(`/cases/${formId}/dip`)
                  .set("Accept", "application/vnd.api+json")
                  .set("Content-Type", "application/vnd.api+json")
                  .send(data)
                  .end(async (err, res) => {
                    if (err) done(err);
                    expectationCallback(res);
                    data.data.attributes.dip.calculator_response.drawdowns = [];
                    data.data.attributes.dip.further_advances = null;
                    data.data.attributes.dip.calculator_response.gross_amount_at_maturity = 1000;

                    request(app)
                      .patch(`/cases/${formId}/dip`)
                      .set("Accept", "application/vnd.api+json")
                      .set("Content-Type", "application/vnd.api+json")
                      .send(data)
                      .end(async (err, res) => {
                        if (err) done(err);
                        expectationCallback(res);
                        done();
                      });
                  });
              });
          });
      });
  });

  it("should throw error if commission fee duplicated", (done) => {
    const data = {
      data: {
        type: "dip_form",
        id: formId,
        attributes: {
          dip: {
            initial_net_loan_amount: 1233,
            arrangement_fee_advance_date: 12,
            arrangement_fee_repayment_date: 12,
            interest_rate: 12,
            title_insurance_fee: 12,
            intermediary_commission_fee_value: 12.55,
            intermediary_commission_fee_percent: 10,
            market_value: 123,
            premium_for_lenders_insurance: 300,
            completion_administration_fee: 250,
            starting_point: "loan_amount",
            further_draw_downs: 12,
            max_ltv: 1,
            value_type_of_loan_amount: "net",
            calculator_response: {
              advanced_interest: 18199.13,
              arrangement_fee_in_value: 147.96,
              broker_fee_in_value: 18.64,
              broker_fee_out_value: 18.64,
              exit_fee_value: 14.76,
              gross_amount_of_first_advance: 1221,
              gross_day_one_ltv: 9.927,
              gross_loan: 1233,
              gross_loan_first_advance: 1221,
              max_total_net_loan_available: 5,
              net_amount_of_first_advance: -17688.09,
              total_fees: 562,
              total_loan_amount: -17676.09,
              total_loan_facility: 1233,
            },
          },
          step_id: "financial_details_calculator",
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
        const errors = {
          errors: [
            {
              code: "402",
              detail: "Validation Error",
              source: {
                pointer: "/dip",
              },
              title: "commission fee should be percentage or value",
            },
          ],
        };
        expect(res.body).toMatchObject(errors);
        done();
      });
  });

  it("should throw error if advance date duplicated", (done) => {
    const data: any = {
      data: {
        type: "dip_form",
        id: formId,
        attributes: {
          dip: {
            initial_net_loan_amount: 1233,
            arrangement_fee_advance_date_value: 12,
            arrangement_fee_advance_date_percent: 12.32,
            arrangement_fee_repayment_date_percent: 12,
            interest_rate: 12,
            title_insurance_fee: 12,
            intermediary_commission_fee_value: 12.55,
            intermediary_commission_fee_percent: null,
            market_value: 123,
            premium_for_lenders_insurance: 300,
            completion_administration_fee: 250,
            starting_point: "loan_amount",
            further_draw_downs: 12,
            max_ltv: 1,
            value_type_of_loan_amount: "net",
            calculator_response: {
              advanced_interest: 18199.13,
              arrangement_fee_in_value: 147.96,
              broker_fee_in_value: 18.64,
              broker_fee_out_value: 18.64,
              exit_fee_value: 14.76,
              gross_amount_of_first_advance: 1221,
              gross_day_one_ltv: 9.927,
              gross_loan: 1233,
              gross_loan_first_advance: 1221,
              max_total_net_loan_available: 5,
              net_amount_of_first_advance: -17688.09,
              total_fees: 562,
              total_loan_amount: -17676.09,
              total_loan_facility: 1233,
            },
          },
          step_id: "financial_details_calculator",
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
        const errors = {
          errors: [
            {
              code: "402",
              detail: "Validation Error",
              source: {
                pointer: "/dip",
              },
              title:
                "Arrangement fee advance date should be percentage or value",
            },
          ],
        };
        expect(res.body).toMatchObject(errors);
        done();
      });
  });

  it("should throw error if repayment date duplicated", (done) => {
    const data: any = {
      data: {
        type: "dip_form",
        id: formId,
        attributes: {
          dip: {
            initial_net_loan_amount: 1233,
            arrangement_fee_advance_date_value: 12,
            arrangement_fee_repayment_date_value: 14,
            arrangement_fee_repayment_date_percent: 12,
            interest_rate: 12.44,
            title_insurance_fee: 12,
            intermediary_commission_fee_value: 12.55,
            intermediary_commission_fee_percent: null,
            market_value: 123,
            premium_for_lenders_insurance: 300,
            completion_administration_fee: 250,
            starting_point: "loan_amount",
            further_draw_downs: 12,
            max_ltv: 1,
            value_type_of_loan_amount: "net",
            calculator_response: {
              advanced_interest: 18199.13,
              arrangement_fee_in_value: 147.96,
              broker_fee_in_value: 18.64,
              broker_fee_out_value: 18.64,
              exit_fee_value: 14.76,
              gross_amount_of_first_advance: 1221,
              gross_day_one_ltv: 9.927,
              gross_loan: 1233,
              gross_loan_first_advance: 1221,
              max_total_net_loan_available: 5,
              net_amount_of_first_advance: -17688.09,
              total_fees: 562,
              total_loan_amount: -17676.09,
              total_loan_facility: 1233,
            },
          },
          step_id: "financial_details_calculator",
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
        const errors = {
          errors: [
            {
              code: "402",
              detail: "Validation Error",
              source: {
                pointer: "/dip",
              },
              title: "Arrangement fee repayment should be percentage or value",
            },
          ],
        };
        expect(res.body).toMatchObject(errors);
        done();
      });
  });
};

export const createDipFlow = (times: number) => {
  for (let i = 1; i <= times; i++) {
    describe(`Flow ${i}`, () => {
      if (!formId) {
        it("should return new form id", (done) => {
          request(app)
            .post("/cases")
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .send()
            .end(async (err, res) => {
              if (err) done(err);
              expect(res.body).toHaveProperty("data");
              expect(res.body.data).toHaveProperty("attributes");
              expect(res.body.data.attributes).toHaveProperty("id");
              expect(res.body.data).toHaveProperty("type");
              expect(res.body.data.id.length).toBe(36);
              formId = res.body.data.id;
              done();
            });
        });

        it("should create dip", (done) => {
          request(app)
            .post(`/cases/${formId}/dip`)
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .send()
            .end(async (err, res) => {
              if (err) done(err);
              expect(res.body).toHaveProperty("data");
              expect(res.body.data).toHaveProperty("attributes");
              expect(res.body.data.attributes).toHaveProperty("id");
              expect(res.body.data).toHaveProperty("type");
              expect(res.body.data.id.length).toBe(36);
              done();
            });
        });
      }

      dipCases();

      it("should fetch dip data", (done) => {
        request(app)
          .get(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.status).toBe(200);
            done();
          });
      });

      it("should remove broker details if changed to direct applicant", async (done) => {
        const applicationRequestData = (typeOfIntroducer: string) => ({
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                type_of_introducer: typeOfIntroducer,
              },
              step_id: "introducer_details_form",
            },
          },
        });
        const brokerApplicationRequestData = applicationRequestData(
          "via_broker"
        );
        const directApplicationRequestData = applicationRequestData(
          "direct_application"
        );

        const brokerDetailsRequestData = {
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                broker_company_name: "Sample broker name",
                broker_name: "Piotr Zarycki",
                broker_email: "piotr.z@ucreate.it",
              },
              step_id: "broker_details_form",
            },
          },
        };

        request(app)
          .patch(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(brokerApplicationRequestData)
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.body.data.attributes.dip["type_of_introducer"]).toBe(
              "via_broker"
            );
            expect(res.body.data.attributes.dip["status"]).toBe("pending");

            request(app)
              .patch(`/cases/${formId}/dip`)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .send(brokerDetailsRequestData)
              .end(async (err, res) => {
                if (err) done(err);
                expect(
                  res.body.data.attributes.dip["broker_company_name"]
                ).toBe("Sample broker name");
                expect(res.body.data.attributes.dip["broker_name"]).toBe(
                  "Piotr Zarycki"
                );
                expect(res.body.data.attributes.dip["broker_email"]).toBe(
                  "piotr.z@ucreate.it"
                );

                request(app)
                  .patch(`/cases/${formId}/dip`)
                  .set("Accept", "application/vnd.api+json")
                  .set("Content-Type", "application/vnd.api+json")
                  .send(directApplicationRequestData)
                  .end(async (err, res) => {
                    if (err) done(err);
                    expect(
                      res.body.data.attributes.dip["type_of_introducer"]
                    ).toBe("direct_application");
                    expect(
                      res.body.data.attributes.dip["broker_company_name"]
                    ).toBe(null);
                    expect(res.body.data.attributes.dip["broker_name"]).toBe(
                      null
                    );
                    expect(res.body.data.attributes.dip["broker_email"]).toBe(
                      null
                    );
                    done();
                  });
              });
          });
      });

      it("should remove development details if switched to non development", async (done) => {
        const propertyTypeRequestData = (buildingType: string) => ({
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                building_type: buildingType,
              },
              step_id: "loan_property_type_form",
            },
          },
        });

        const developmentTypeRequestData = propertyTypeRequestData(
          "development"
        );
        const nonDevelopmentTypeRequestData = propertyTypeRequestData(
          "non_development"
        );

        const furtherFinancialDetailsData = {
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                max_ltv: "12",
                ltv_to_gdv: "54",
                progress_report: "43",
                appraisal_report: "231",
                further_draw_downs: "321",
                build_period: "123",
                purchase_price: "123",
                legal_fee: 999,
              },
              step_id: "further_financial_details_form",
            },
          },
        };

        request(app)
          .patch(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(developmentTypeRequestData)
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.body.data.attributes.dip["building_type"]).toBe(
              "development"
            );
            expect(res.body.data.attributes.dip["status"]).toBe("pending");

            request(app)
              .patch(`/cases/${formId}/dip`)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .send(furtherFinancialDetailsData)
              .end(async (err, res) => {
                if (err) done(err);
                expect(res.body.data.attributes.dip["max_ltv"]).toBe(12);
                expect(res.body.data.attributes.dip["ltv_to_gdv"]).toBe(54);
                expect(res.body.data.attributes.dip["progress_report"]).toBe(
                  43
                );
                expect(res.body.data.attributes.dip["appraisal_report"]).toBe(
                  231
                );
                expect(res.body.data.attributes.dip["build_period"]).toBe(123);
                expect(res.body.data.attributes.dip["further_draw_downs"]).toBe(
                  321
                );
                expect(res.body.data.attributes.dip["legal_fee"]).toBe(999);
                expect(res.body.data.attributes.dip["purchase_price"]).toBe(
                  123
                );

                request(app)
                  .patch(`/cases/${formId}/dip`)
                  .set("Accept", "application/vnd.api+json")
                  .set("Content-Type", "application/vnd.api+json")
                  .send(nonDevelopmentTypeRequestData)
                  .end(async (err, res) => {
                    if (err) done(err);
                    expect(res.body.data.attributes.dip["building_type"]).toBe(
                      "non_development"
                    );
                    expect(
                      res.body.data.attributes.dip["progress_report"]
                    ).toBe(null);
                    expect(
                      res.body.data.attributes.dip["appraisal_report"]
                    ).toBe(null);
                    done();
                  });
              });
          });
      });

      it("should remove purchase price if purpose switched to not purchase", async (done) => {
        const loanDetailsWithPurposeRequestData = (loanPurpose: string) => ({
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                loan_term: "12",
                type_of_loan: "retained",
                loan_purpose: loanPurpose,
              },
              step_id: "loan_details_form",
            },
          },
        });
        const purchaseDetailsRequestData = loanDetailsWithPurposeRequestData(
          "purchase"
        );
        const nonPurchaseDetailsRequestData = loanDetailsWithPurposeRequestData(
          "refinance"
        );

        const furtherFinancialDetailsData = {
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                max_ltv: "12",
                ltv_to_gdv: "54",
                progress_report: "43",
                appraisal_report: "231",
                further_draw_downs: "321",
                build_period: "123",
                purchase_price: "123",
                legal_fee: 999,
              },
              step_id: "further_financial_details_form",
            },
          },
        };

        request(app)
          .patch(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(purchaseDetailsRequestData)
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.body.data.attributes.dip["loan_term"]).toBe(12);
            expect(res.body.data.attributes.dip["type_of_loan"]).toBe(
              "retained"
            );
            expect(res.body.data.attributes.dip["loan_purpose"]).toBe(
              "purchase"
            );

            request(app)
              .patch(`/cases/${formId}/dip`)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .send(furtherFinancialDetailsData)
              .end(async (err, res) => {
                if (err) done(err);
                expect(res.body.data.attributes.dip["max_ltv"]).toBe(12);
                expect(res.body.data.attributes.dip["ltv_to_gdv"]).toBe(54);
                expect(res.body.data.attributes.dip["progress_report"]).toBe(
                  43
                );
                expect(res.body.data.attributes.dip["appraisal_report"]).toBe(
                  231
                );
                expect(res.body.data.attributes.dip["build_period"]).toBe(123);
                expect(res.body.data.attributes.dip["further_draw_downs"]).toBe(
                  321
                );
                expect(res.body.data.attributes.dip["legal_fee"]).toBe(999);
                expect(res.body.data.attributes.dip["purchase_price"]).toBe(
                  123
                );

                request(app)
                  .patch(`/cases/${formId}/dip`)
                  .set("Accept", "application/vnd.api+json")
                  .set("Content-Type", "application/vnd.api+json")
                  .send(nonPurchaseDetailsRequestData)
                  .end(async (err, res) => {
                    if (err) done(err);
                    expect(res.body.data.attributes.dip["loan_term"]).toBe(12);
                    expect(res.body.data.attributes.dip["type_of_loan"]).toBe(
                      "retained"
                    );
                    expect(res.body.data.attributes.dip["loan_purpose"]).toBe(
                      "refinance"
                    );
                    expect(res.body.data.attributes.dip["purchase_price"]).toBe(
                      null
                    );
                    done();
                  });
              });
          });
      });

      it("should remove multiple advances specific fields if changed to single advance", async (done) => {
        const advanceTypeRequestData = (advanceType: string) => ({
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                loan_advance_type: advanceType,
              },
              step_id: "type_of_loan_form",
            },
          },
        });

        const singleAdvanceTypeRequestData = advanceTypeRequestData("single");
        const multipleAdvanceTypeRequestData = advanceTypeRequestData(
          "multiple"
        );

        const furtherFinancialDetailsData = {
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                max_ltv: "12",
                ltv_to_gdv: "54",
                progress_report: "43",
                appraisal_report: "231",
                further_draw_downs: "321",
                build_period: "123",
                legal_fee: 999,
              },
              step_id: "further_financial_details_form",
            },
          },
        };

        request(app)
          .patch(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(multipleAdvanceTypeRequestData)
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.body.data.attributes.dip["loan_advance_type"]).toBe(
              "multiple"
            );

            request(app)
              .patch(`/cases/${formId}/dip`)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .send(furtherFinancialDetailsData)
              .end(async (err, res) => {
                if (err) done(err);
                expect(res.body.data.attributes.dip["max_ltv"]).toBe(12);
                expect(res.body.data.attributes.dip["ltv_to_gdv"]).toBe(54);
                expect(res.body.data.attributes.dip["progress_report"]).toBe(
                  43
                );
                expect(res.body.data.attributes.dip["appraisal_report"]).toBe(
                  231
                );
                expect(res.body.data.attributes.dip["build_period"]).toBe(123);
                expect(res.body.data.attributes.dip["further_draw_downs"]).toBe(
                  321
                );
                expect(res.body.data.attributes.dip["legal_fee"]).toBe(999);
                expect(res.body.data.attributes.dip["status"]).toBe("pending");

                request(app)
                  .patch(`/cases/${formId}/dip`)
                  .set("Accept", "application/vnd.api+json")
                  .set("Content-Type", "application/vnd.api+json")
                  .send(singleAdvanceTypeRequestData)
                  .end(async (err, res) => {
                    if (err) done(err);
                    expect(
                      res.body.data.attributes.dip["loan_advance_type"]
                    ).toBe("single");
                    expect(
                      res.body.data.attributes.dip["further_draw_downs"]
                    ).toBe(null);
                    expect(res.body.data.attributes.dip["ltv_to_gdv"]).toBe(
                      null
                    );
                    expect(res.body.data.attributes.dip["build_period"]).toBe(
                      null
                    );
                    done();
                  });
              });
          });
      });

      it("should remove intermediary commission fee value if changed to direct applicant", async (done) => {
        const applicationRequestData = (typeOfIntroducer: string) => ({
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                type_of_introducer: typeOfIntroducer,
              },
              step_id: "introducer_details_form",
            },
          },
        });
        const brokerApplicationRequestData = applicationRequestData(
          "via_broker"
        );
        const directApplicationRequestData = applicationRequestData(
          "direct_application"
        );

        const calculatorDetailsData: any = {
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                initial_net_loan_amount: 1233,
                arrangement_fee_advance_date_value: 12,
                arrangement_fee_advance_date_percent: null,
                arrangement_fee_repayment_date_percent: 12,
                interest_rate: 12,
                title_insurance_fee: 12,
                intermediary_commission_fee_value: 12.55,
                intermediary_commission_fee_percent: null,
                market_value: 123,
                premium_for_lenders_insurance: 300,
                completion_administration_fee: 250,
                starting_point: "loan_amount",
                further_draw_downs: 12,
                max_ltv: 1,
                value_type_of_loan_amount: "net",
                calculator_response: {
                  advanced_interest: 18199.13,
                  arrangement_fee_in_value: 147.96,
                  broker_fee_in_value: 18.64,
                  broker_fee_out_value: 18.64,
                  exit_fee_value: 14.76,
                  gross_amount_of_first_advance: 1221,
                  gross_day_one_ltv: 9.927,
                  gross_loan: 1233,
                  gross_loan_first_advance: 1221,
                  max_total_net_loan_available: 5,
                  net_amount_of_first_advance: -17688.09,
                  total_fees: 562,
                  total_loan_amount: -17676.09,
                  total_loan_facility: 1233,
                  intermediary_commission_fee_value: 12.55,
                },
              },
              step_id: "financial_details_calculator",
            },
          },
        };
        request(app)
          .patch(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(brokerApplicationRequestData)
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.body.data.attributes.dip["type_of_introducer"]).toBe(
              "via_broker"
            );

            request(app)
              .patch(`/cases/${formId}/dip`)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .send(calculatorDetailsData)
              .end(async (err, res) => {
                if (err) done(err);
                expect(
                  res.body.data.attributes.dip[
                    "intermediary_commission_fee_value"
                  ]
                ).toBe(12.55);
                expect(
                  res.body.data.attributes.dip[
                    "intermediary_commission_fee_percent"
                  ]
                ).toBe(null);
                expect(
                  res.body.data.attributes.dip.calculator_response[
                    "intermediary_commission_fee_value"
                  ]
                ).toBe(12.55);

                request(app)
                  .patch(`/cases/${formId}/dip`)
                  .set("Accept", "application/vnd.api+json")
                  .set("Content-Type", "application/vnd.api+json")
                  .send(directApplicationRequestData)
                  .end(async (err, res) => {
                    if (err) done(err);
                    expect(
                      res.body.data.attributes.dip["type_of_introducer"]
                    ).toBe("direct_application");
                    expect(
                      res.body.data.attributes.dip[
                        "intermediary_commission_fee_value"
                      ]
                    ).toBe(null);
                    expect(
                      res.body.data.attributes.dip[
                        "intermediary_commission_fee_percent"
                      ]
                    ).toBe(null);
                    expect(
                      res.body.data.attributes.dip.calculator_response[
                        "intermediary_commission_fee_value"
                      ]
                    ).toBe(null);

                    done();
                  });
              });
          });
      });

      it("should remove intermediary commission fee percent if changed to direct applicant", async (done) => {
        const applicationRequestData = (typeOfIntroducer: string) => ({
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                type_of_introducer: typeOfIntroducer,
              },
              step_id: "introducer_details_form",
            },
          },
        });
        const brokerApplicationRequestData = applicationRequestData(
          "via_broker"
        );
        const directApplicationRequestData = applicationRequestData(
          "direct_application"
        );

        const calculatorDetailsData: any = {
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                initial_net_loan_amount: 1233,
                arrangement_fee_advance_date_value: 12,
                arrangement_fee_advance_date_percent: null,
                arrangement_fee_repayment_date_percent: 12,
                interest_rate: 12,
                title_insurance_fee: 12,
                intermediary_commission_fee_value: null,
                intermediary_commission_fee_percent: 1.33,
                market_value: 123,
                premium_for_lenders_insurance: 300,
                completion_administration_fee: 250,
                starting_point: "loan_amount",
                further_draw_downs: 12,
                max_ltv: 1,
                value_type_of_loan_amount: "net",
                calculator_response: {
                  advanced_interest: 18199.13,
                  arrangement_fee_in_value: 147.96,
                  broker_fee_in_value: 18.64,
                  broker_fee_out_value: 18.64,
                  exit_fee_value: 14.76,
                  gross_amount_of_first_advance: 1221,
                  gross_day_one_ltv: 9.927,
                  gross_loan: 1233,
                  gross_loan_first_advance: 1221,
                  max_total_net_loan_available: 5,
                  net_amount_of_first_advance: -17688.09,
                  total_fees: 562,
                  total_loan_amount: -17676.09,
                  total_loan_facility: 1233,
                  intermediary_commission_fee_value: 12345,
                },
              },
              step_id: "financial_details_calculator",
            },
          },
        };
        request(app)
          .patch(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(brokerApplicationRequestData)
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.body.data.attributes.dip["type_of_introducer"]).toBe(
              "via_broker"
            );

            request(app)
              .patch(`/cases/${formId}/dip`)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .send(calculatorDetailsData)
              .end(async (err, res) => {
                if (err) done(err);
                expect(
                  res.body.data.attributes.dip[
                    "intermediary_commission_fee_value"
                  ]
                ).toBe(null);
                expect(
                  res.body.data.attributes.dip[
                    "intermediary_commission_fee_percent"
                  ]
                ).toBe(1.33);
                expect(
                  res.body.data.attributes.dip.calculator_response[
                    "intermediary_commission_fee_value"
                  ]
                ).toBe(null);

                request(app)
                  .patch(`/cases/${formId}/dip`)
                  .set("Accept", "application/vnd.api+json")
                  .set("Content-Type", "application/vnd.api+json")
                  .send(directApplicationRequestData)
                  .end(async (err, res) => {
                    if (err) done(err);
                    expect(
                      res.body.data.attributes.dip["type_of_introducer"]
                    ).toBe("direct_application");
                    expect(
                      res.body.data.attributes.dip[
                        "intermediary_commission_fee_value"
                      ]
                    ).toBe(null);
                    expect(
                      res.body.data.attributes.dip[
                        "intermediary_commission_fee_percent"
                      ]
                    ).toBe(null);
                    expect(
                      res.body.data.attributes.dip.calculator_response[
                        "intermediary_commission_fee_value"
                      ]
                    ).toBe(null);

                    done();
                  });
              });
          });
      });

      it("should not remove intermediary commission fee percent if introducer is still broker", async (done) => {
        const applicationRequestData = (typeOfIntroducer: string) => ({
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                type_of_introducer: typeOfIntroducer,
              },
              step_id: "introducer_details_form",
            },
          },
        });
        const brokerApplicationRequestData = applicationRequestData(
          "via_broker"
        );

        const calculatorDetailsData: any = {
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              dip: {
                initial_net_loan_amount: 1233,
                arrangement_fee_advance_date_value: 12,
                arrangement_fee_advance_date_percent: null,
                arrangement_fee_repayment_date_percent: 12,
                interest_rate: 12,
                title_insurance_fee: 12,
                intermediary_commission_fee_value: null,
                intermediary_commission_fee_percent: 1.33,
                market_value: 123,
                premium_for_lenders_insurance: 300,
                completion_administration_fee: 250,
                starting_point: "loan_amount",
                further_draw_downs: 12,
                max_ltv: 1,
                value_type_of_loan_amount: "net",
                calculator_response: {
                  advanced_interest: 18199.13,
                  arrangement_fee_in_value: 147.96,
                  broker_fee_in_value: 18.64,
                  broker_fee_out_value: 18.64,
                  exit_fee_value: 14.76,
                  gross_amount_of_first_advance: 1221,
                  gross_day_one_ltv: 9.927,
                  gross_loan: 1233,
                  gross_loan_first_advance: 1221,
                  max_total_net_loan_available: 5,
                  net_amount_of_first_advance: -17688.09,
                  total_fees: 562,
                  total_loan_amount: -17676.09,
                  total_loan_facility: 1233,
                  intermediary_commission_fee_value: 12345,
                },
              },
              step_id: "financial_details_calculator",
            },
          },
        };
        request(app)
          .patch(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .send(brokerApplicationRequestData)
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.body.data.attributes.dip["type_of_introducer"]).toBe(
              "via_broker"
            );

            request(app)
              .patch(`/cases/${formId}/dip`)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .send(calculatorDetailsData)
              .end(async (err, res) => {
                if (err) done(err);
                expect(
                  res.body.data.attributes.dip[
                    "intermediary_commission_fee_value"
                  ]
                ).toBe(null);
                expect(
                  res.body.data.attributes.dip[
                    "intermediary_commission_fee_percent"
                  ]
                ).toBe(1.33);
                expect(
                  res.body.data.attributes.dip.calculator_response[
                    "intermediary_commission_fee_value"
                  ]
                ).toBe(null);

                request(app)
                  .patch(`/cases/${formId}/dip`)
                  .set("Accept", "application/vnd.api+json")
                  .set("Content-Type", "application/vnd.api+json")
                  .send(brokerApplicationRequestData)
                  .end(async (err, res) => {
                    if (err) done(err);
                    expect(
                      res.body.data.attributes.dip["type_of_introducer"]
                    ).toBe("via_broker");
                    expect(
                      res.body.data.attributes.dip[
                        "intermediary_commission_fee_value"
                      ]
                    ).toBe(null);
                    expect(
                      res.body.data.attributes.dip[
                        "intermediary_commission_fee_percent"
                      ]
                    ).toBe(1.33);
                    expect(
                      res.body.data.attributes.dip.calculator_response[
                        "intermediary_commission_fee_value"
                      ]
                    ).toBe(null);
                    done();
                  });
              });
          });
      });

      it("should change status on summary", (done) => {
        const data: any = {
          data: {
            type: "dip_form",
            id: formId,
            attributes: {
              step_id: "summary_form",
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
            expect(res.body.data.attributes.dip["status"]).toBe("issued");
            done();
          });
      });

      it("should convert dip into application", async (done) => {
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
            if (err) done(err);
            const caseModel = new Case();
            const model = await caseModel.getCase(
              CaseTypeCode.APPLICATION,
              formId
            );
            const dip = await model.getForm();
            expect(dip.length).toEqual(1);
            expect(res.status).toEqual(200);
            caseModel.setData("stage", "dip");
            await caseModel.update().where({ Id: formId });
            const applicationStep = new ApplicationStep();
            const whereClauseForCase = { FkCaseID: dip[0].fk_case_id };
            const applicationStepData = await applicationStep
              .select()
              .where(whereClauseForCase);
            expect(applicationStepData.length).toEqual(12);

            const expectedStepNames = [
              "introducer_details",
              "applicant_details",
              "credit_history",
              "loan_details",
              "security_details",
              "solicitor_details",
              "additional_information",
              "declarations",
              "assets_and_liabilities",
              "valuation_report",
              "aml_kyc",
              "company_details",
            ];

            applicationStepData.forEach(({ status }: { status: string }) => {
              expect(status).toBe("New");
            });

            const stepNames = applicationStepData.map(
              ({ name }: { name: string }) => name
            );

            expect(stepNames.sort()).toEqual(expectedStepNames.sort());

            await applicationStep.delete().where(whereClauseForCase);
            done();
          });
      });

      it("should change status", (done) => {
        const data = {
          data: {
            type: "case",
            id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
            attributes: {
              status: "expired",
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
            request(app)
              .get(`/cases/${formId}/dip`)
              .set("Accept", "application/vnd.api+json")
              .set("Content-Type", "application/vnd.api+json")
              .end(async (err, res) => {
                if (err) done(err);
                expect(res.status).toBe(200);
                expect(res.body.data.attributes.dip["status"]).toBe("expired");
                done();
              });
          });
      });
      it.skip("should delete dip", (done) => {
        request(app)
          .delete(`/cases/${formId}/dip`)
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .end(async (err, res) => {
            if (err) done(err);
            expect(res.status).toBe(200);
            done();
          });
      });

      it("should throw error if not found dip id during delete", (done) => {
        request(app)
          .delete("/cases/idd9bb143f-3545-43a6-b67e-7591887295bb/dip")
          .set("Accept", "application/vnd.api+json")
          .set("Content-Type", "application/vnd.api+json")
          .end(async (err, res) => {
            if (err) done(err);
            const errors = {
              errors: [
                {
                  code: "404",
                  detail: "ID is wrong",
                  source: { pointer: "/dip" },
                  title:
                    "Cannot find by ididd9bb143f-3545-43a6-b67e-7591887295bb",
                },
              ],
            };
            expect(res.body).toMatchObject(errors);
            expect(res.status).toBe(404);
            done();
          });
      });
    });
  }
};
