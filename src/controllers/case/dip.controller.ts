"use strict";
import { Error as ApiError, Serializer } from "jsonapi-serializer";
import { Request, Response } from "express";
import * as Inflector from "inflected";
import * as Joi from "joi";
import { inject, injectable } from "tsyringe";

import Dip from "../../models/Dip";
import { rollbar } from "../../util/rollbar";
import Contact from "../../models/Dip/Contact";
import LoanPropertyDevelopment from "../../models/Dip/LoanPropertyDevelopment";
import LoanFinancialDetails from "../../models/Dip/LoanFinancialDetails";
import LoanFinancialDetailsMulti from "../../models/Dip/LoanFinancialDetailsMulti";
import Security from "../../models/Dip/Security";
import LoanFinancialHybridTerms from "../../models/Dip/LoanFinancialHybridTerms";
import ContactValue from "../../models/Dip/ContactValue";
import Broker from "../../models/Dip/Broker";
import LoanFinancialDetailsDev from "../../models/Dip/LoanFinancialDetailsDev";
import ParamFilter from "../../util/paramFilter";
import Case, { CaseTypeCode } from "../../models/Case";
import validateEndpoint from "../../util/validateEndpoint";
import CaseController from "./case.controller";
import Application from "../../models/Application";
import updateLoanDetailsValidator from "./validator/update_loan_details.validator";
import validate from "../../decorator/validate";

@injectable()
export default class DipController extends CaseController {
  constructor(@inject(Case) protected caseModel?: Case) {
    super(caseModel);
  }

  public static async getBySingle(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const caseType = req.url.split("/")[3] as CaseTypeCode;
      const data = await DipController.getDataByType(caseType, id, req);

      const UuidSerializer = new Serializer("dip_form", {
        id: "id",
        attributes: [caseType],
        pluralizeType: false,
        keyForAttribute: function (attribute) {
          return Inflector.underscore(attribute);
        },
      });

      const formData = UuidSerializer.serialize({
        id: id,
        [caseType]: data[0],
      });
      res.send(formData);
    } catch (e) {
      rollbar.error(e, req);
      res.status(e.hasOwnProperty("status") ? e.status : 500);
      res.send(e);
    }
  }

  public async getDipAction(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (id) {
        return await DipController.getBySingle(req, res);
      }

      const cases = await DipController.getDataByType(
        CaseTypeCode.ALL,
        id,
        req
      );

      super.ApiJsonResponse({
        collectionName: "dip_form",
        res: res,
        id: "id",
        attributes: ["cases"],
        data: {
          id: id,
          cases: cases,
        },
      });
    } catch (e) {
      rollbar.error(e, req);
      DipController.ApiJsonError(res, e);
    }
  }

  private static async getDataByType(
    caseType: CaseTypeCode,
    dipId: string,
    req: Request
  ) {
    if (req.query.case_stage) {
      caseType = req.query.case_stage as CaseTypeCode;
    }

    const model = await new Case().getCase(caseType, dipId);
    let modelData = await model.getForm();
    const paramFilter = new ParamFilter();

    if (req.query.hasOwnProperty("fields")) {
      if (req.query.fields.hasOwnProperty("case")) {
        const queryFields = req.query.fields as {
          case: string;
        };

        const fields = queryFields.case;
        const data = [];
        for (const value of modelData) {
          paramFilter.loadData(`case_${value.dip_id}`, value);
          data.push(
            paramFilter.getData(`case_${value.dip_id}`, fields.split(","))
          );
        }

        modelData = data;
      }
    }

    if (!modelData.length && req.params.id) {
      throw new ApiError({
        code: "404",
        source: { pointer: `/${caseType.toLowerCase()}` },
        title: "Cannot find by id" + req.params.id,
        detail: "ID is wrong",
      });
    }

    return modelData;
  }

  public async deleteDipAction(req: Request, res: Response) {
    try {
      const caseType = CaseTypeCode.DIP;

      const validation = {
        id: Joi.string().min(36).required(),
      };
      validateEndpoint(req.params, validation);

      const id = req.params.id;
      const model = await new Case().getCase(caseType, id);

      const findById = await model.select("DipId");

      if (!findById.length) {
        throw new ApiError({
          code: "404",
          source: { pointer: `/${caseType.toLowerCase()}` },
          title: "Cannot find by id" + id,
          detail: "ID is wrong",
        });
      }

      await model.remove();

      super.ApiJsonResponse({
        collectionName: "dip_form",
        res: res,
        id: "id",
        attributes: ["dip"],
        data: {},
      });
    } catch (e) {
      rollbar.error(e, req);
      DipController.ApiJsonError(res, e);
    }
  }

  public async editDipAction(req: Request, res: Response) {
    try {
      const caseType = CaseTypeCode.DIP;

      let validation: any = {
        id: Joi.string().min(36).required(),
      };
      validateEndpoint(req.params, validation);

      const dipId = req.params.id;
      const caseModel = new Case();
      const dipModel = await await caseModel.getCase(caseType, dipId);
      const modelData = await (
        await caseModel.getCase(caseType, dipId)
      ).getForm();
      if (!modelData.length) {
        throw new ApiError({
          code: "404",
          source: { pointer: `/${caseType.toLowerCase()}` },
          title: "Cannot find by id" + req.params.id,
          detail: "ID is wrong",
        });
      }
      const data: any = req.body.data.attributes[caseType.toLowerCase()];

      const contact = new Contact();
      const contactValues = new ContactValue();
      contactValues.setContactId(modelData[0].fk_contact_id);
      const loanDetails = new LoanFinancialDetails();
      loanDetails.id = modelData[0].fk_loan_financial_details_id;
      loanDetails.loanFinancialDetailsDevId =
        modelData[0].FkLoanFinancialDetailsDevId;
      const loanPropertyDevelopment = new LoanPropertyDevelopment();
      loanPropertyDevelopment.id = modelData[0].FkLoanPropertyDevelopmentId;
      const loanFinancialDetailsMulti = new LoanFinancialDetailsMulti();
      loanFinancialDetailsMulti.id = modelData[0].FkLoanFinancialDetailsMultiId;
      const loanFinancialHybridTerms = new LoanFinancialHybridTerms();
      const broker = new Broker();

      await Dip.getKnex().transaction(async (trx) => {
        const listSteps = [
          "broker_details_form",
          "introducer_details_form",
          "type_of_loan_form",
          "company_details_form",
          "individual_details_form",
          "security_details_form",
          "loan_property_type_form",
          "loan_details_form",
          "charge_details_form",
          "financial_details_form",
          "further_financial_details_form",
        ];

        if (listSteps.includes(req.body.data.attributes.step_id)) {
          if (modelData[0].status === "issued") {
            await caseModel.setStatus("edited");
            await caseModel.update();
          }
        }

        switch (req.body.data.attributes.step_id) {
          case "broker_details_form":
            validation = {
              data: Joi.object({
                id: Joi.string().min(36).required(),
                type: Joi.string().required().allow("dip_form"),
                attributes: Joi.object({
                  [caseType.toLowerCase()]: Joi.object({
                    broker_company_name: Joi.string().required(),
                    broker_name: Joi.string().required(),
                    broker_email: Joi.string().email().required(),
                  }),
                  step_id: Joi.string().valid("broker_details_form"),
                }),
              }),
            };

            validateEndpoint(req.body, validation);

            await broker.setJsonObject(data);
            const brokerId = await broker.insert();
            dipModel.clearData();
            dipModel.setData("fk_broker_id", brokerId[0]);
            await dipModel.update();
            break;

          case "introducer_details_form":
            validation = Joi.object({
              data: Joi.object({
                id: Joi.string().min(36).required(),
                type: Joi.string().required().allow("dip_form"),
                attributes: Joi.object({
                  [caseType.toLowerCase()]: Joi.object({
                    type_of_introducer: Joi.string()
                      .valid(["via_broker", "direct_application"])
                      .required(),
                    originator: Joi.number(),
                  }).required(),
                  step_id: Joi.string()
                    .valid("introducer_details_form")
                    .required(),
                }),
              }).required(),
            });
            validateEndpoint(req.body, validation);

            if (
              data.type_of_introducer === "direct_application" &&
              modelData[0].fk_broker_id
            ) {
              dipModel.setData("fk_broker_id", null);
              await dipModel.update();
              broker.id = modelData[0].fk_broker_id;
              await broker.delete();
            }
            if (
              data.type_of_introducer === "direct_application" &&
              modelData[0].fk_loan_financial_details_id
            ) {
              await loanDetails.setJsonObject({
                intermediary_commission_fee_percent: null,
                intermediary_commission_fee_value: null,
              });
              await loanDetails.update().where({
                LoanFinancialDetailsId:
                  modelData[0].fk_loan_financial_details_id,
              });
            }
            await (await dipModel.setJsonObject(data))
              .enableTransaction(trx)
              .update();
            break;

          case "type_of_loan_form":
            validation = Joi.object({
              data: Joi.object({
                id: Joi.string().min(36).required(),
                type: Joi.string().required().allow("dip_form"),
                attributes: Joi.object({
                  [caseType.toLowerCase()]: Joi.object({
                    loan_advance_type: Joi.string()
                      .valid(["multiple", "single"])
                      .required(),
                  }).required(),
                  step_id: Joi.string().valid("type_of_loan_form").required(),
                }),
              }).required(),
            });

            validateEndpoint(req.body, validation);

            if (data.loan_advance_type === "single") {
              loanFinancialDetailsMulti.setData("further_draw_downs", null);
              await loanFinancialDetailsMulti.update();

              const loanFinancialDetailsDev = new LoanFinancialDetailsDev();
              loanFinancialDetailsDev.id =
                modelData[0].FkLoanFinancialDetailsDevId;
              loanFinancialDetailsDev.setData("ltv_to_gdv", null);
              await loanFinancialDetailsDev.update();

              loanPropertyDevelopment.setData("build_period_months", null);
              await loanPropertyDevelopment.update();
            }
            await (await dipModel.setJsonObject(data))
              .enableTransaction(trx)
              .update();
            break;

          case "company_details_form":
            validation = Joi.object({
              data: Joi.object({
                id: Joi.string().min(36).required(),
                type: Joi.string().required().allow("dip_form"),
                attributes: Joi.object({
                  [caseType.toLowerCase()]: Joi.object({
                    company_name: Joi.string().required(),
                    company_number: Joi.string().min(3).required(),
                    email: Joi.string().email(),
                    type_of_applicant: Joi.string().allow("company"),
                  }).required(),
                  step_id: Joi.string()
                    .valid("company_details_form")
                    .required(),
                }),
              }).required(),
            });

            validateEndpoint(req.body, validation);

            await contact.setJsonObject(data);
            await contactValues.setJsonObject(data);
            await contactValues
              .delete()
              .where({ FkContactId: modelData[0].fk_contact_id });
            contactValues.setData("fk_contact_id", modelData[0].fk_contact_id);
            await contactValues.insert();
            await contact
              .update()
              .where({ ContactId: modelData[0].fk_contact_id });
            break;

          case "individual_details_form":
            validation = Joi.object({
              data: Joi.object({
                id: Joi.string().min(36).required(),
                type: Joi.string().required().allow("dip_form"),
                attributes: Joi.object({
                  [caseType.toLowerCase()]: Joi.object({
                    applicants: Joi.array().items(
                      Joi.object({
                        name: Joi.string().min(3).required(),
                        email: Joi.string().email(),
                        fk_contact_id: Joi.number(),
                        contact_value_id: Joi.number(),
                      }).required()
                    ),
                    type_of_applicant: Joi.string()
                      .valid("individual")
                      .required(),
                  }).required(),
                  step_id: Joi.string()
                    .valid("individual_details_form")
                    .required(),
                }),
              }).required(),
            });

            validateEndpoint(req.body, validation);

            await contact.setJsonObject(data);
            await contactValues.setJsonObject(data);
            await contact
              .update()
              .where({ ContactId: modelData[0].fk_contact_id });
            break;

          case "security_details_form":
            validation = Joi.object({
              data: Joi.object({
                id: Joi.string().min(36).required(),
                type: Joi.string().required().allow("dip_form"),
                attributes: Joi.object({
                  [caseType.toLowerCase()]: Joi.object({
                    securities: Joi.array().items(
                      Joi.object({
                        isManualEditVisible: Joi.boolean(),
                        security_address: Joi.string().allow("").optional(),
                        security_address_line_1: Joi.string(),
                        security_address_line_2: Joi.string(),
                        security_town_city: Joi.string(),
                        security_postcode: Joi.string(),
                        security_country: Joi.string(),
                        security_initial_estimation: [
                          Joi.string(),
                          Joi.number(),
                        ],
                        security_type: Joi.string().valid([
                          "residential",
                          "commercial",
                          "land",
                          "semi_commercial",
                          "development",
                        ]),
                        opfl_charge_type: Joi.string().valid([
                          "first_charge",
                          "second_charge",
                        ]),
                        gdv: [Joi.string(), Joi.number()],
                        current_estimated_90_day_market_value: [
                          Joi.string(),
                          Joi.number(),
                        ],
                        estimated_90_day_gdv: [Joi.string(), Joi.number()],
                        value_existing_mortgage: Joi.any().when(
                          "opfl_charge_type",
                          {
                            is: "second_charge",
                            then: [
                              Joi.string()
                                .required()
                                .regex(/^[0-9]+$/),
                              Joi.number().required(),
                            ],
                          }
                        ),
                      })
                    ),
                  }).required(),
                  step_id: Joi.string()
                    .valid("security_details_form")
                    .required(),
                }),
              }).required(),
            });

            if (caseType === "dip") validateEndpoint(req.body, validation);

            const security = new Security();
            security.setDipId(modelData[0].dip_id);
            await security.setJsonObject(data);
            break;

          case "loan_property_type_form":
            validation = Joi.object({
              data: Joi.object({
                id: Joi.string().min(36).required(),
                type: Joi.string().required().allow("dip_form"),
                attributes: Joi.object({
                  [caseType.toLowerCase()]: Joi.object({
                    building_type: Joi.string()
                      .valid(["development", "non_development"])
                      .required(),
                  }).required(),
                  step_id: Joi.string()
                    .valid("loan_property_type_form")
                    .required(),
                }),
              }).required(),
            });

            validateEndpoint(req.body, validation);

            if (
              data.building_type === "non_development" &&
              modelData[0].FkLoanFinancialDetailsDevId
            ) {
              loanPropertyDevelopment.setData("progress_report", null);
              loanPropertyDevelopment.setData("appraisal_report", null);
              loanPropertyDevelopment.setData("progress_report", null);
              await loanPropertyDevelopment.update();
            }
            await (await dipModel.setJsonObject(data))
              .enableTransaction(trx)
              .update();
            break;

          case "loan_details_form":
            await (await dipModel.setJsonObject(data))
              .enableTransaction(trx)
              .update();
            await loanDetails.setJsonObject(data);
            await loanDetails.update().where({
              LoanFinancialDetailsId: modelData[0].fk_loan_financial_details_id,
            });
            if (data.loan_purpose === "refinance") {
              loanDetails.setData("purchase_price", null);
              await loanDetails.update();
            }
            if (
              data.type_of_loan === "hybrid" &&
              data.hasOwnProperty("hybrid_option")
            ) {
              await loanFinancialHybridTerms.setJsonObject(data.hybrid_option);
              await loanFinancialHybridTerms.update().where({
                LoanFinancialHybridTermsId: modelData[0].fk_hybrid_terms,
              });
            }
            break;

          case "charge_details_form":
            (await dipModel.setJsonObject(data))
              .enableTransaction(trx)
              .update();
            break;

          case "financial_details_form":
            (await loanDetails.setJsonObject(data)).update().where({
              LoanFinancialDetailsId: modelData[0].fk_loan_financial_details_id,
            });
            break;

          case "further_financial_details_form":
            await (await loanPropertyDevelopment.setJsonObject(data))
              .update()
              .where({
                LoanPropertyDevelopmentId:
                  modelData[0].loan_property_development_id,
              });
            await loanDetails.setJsonObject(data);
            await loanDetails.update().where({
              LoanFinancialDetailsId: modelData[0].fk_loan_financial_details_id,
            });
            if (data.hasOwnProperty("further_draw_downs")) {
              await (await loanFinancialDetailsMulti.setJsonObject(data))
                .update()
                .where({
                  LoanFinancialDetailsMultiId:
                    modelData[0].loan_financial_details_multi_id,
                });
            }
            break;

          case "financial_details_calculator":
            if (
              data.intermediary_commission_fee_percent > 0 &&
              data.intermediary_commission_fee_value > 0
            ) {
              throw new ApiError({
                code: "402",
                source: { pointer: `/${caseType.toLowerCase()}` },
                title: "commission fee should be percentage or value",
                detail: "Validation Error",
              });
            }
            if (
              data.arrangement_fee_advance_date_percent > 0 &&
              data.arrangement_fee_advance_date_value > 0
            ) {
              throw new ApiError({
                code: "402",
                source: { pointer: `/${caseType.toLowerCase()}` },
                title:
                  "Arrangement fee advance date should be percentage or value",
                detail: "Validation Error",
              });
            }
            if (
              data.arrangement_fee_repayment_date_value > 0 &&
              data.arrangement_fee_repayment_date_percent > 0
            ) {
              throw new ApiError({
                code: "402",
                source: { pointer: `/${caseType.toLowerCase()}` },
                title:
                  "Arrangement fee repayment should be percentage or value",
                detail: "Validation Error",
              });
            }

            await loanDetails.setJsonObject({
              intermediary_commission_fee_percent: null,
              intermediary_commission_fee_value: null,
              arrangement_fee_advance_date_percent: null,
              arrangement_fee_advance_date_value: null,
              arrangement_fee_repayment_date_value: null,
              arrangement_fee_repayment_date_percent: null,
            });

            await loanDetails.update().where({
              LoanFinancialDetailsId: modelData[0].fk_loan_financial_details_id,
            });

            loanDetails.id = modelData[0].fk_loan_financial_details_id;
            await loanDetails.setJsonObject(data);
            await loanDetails.update().where({
              LoanFinancialDetailsId: modelData[0].fk_loan_financial_details_id,
            });

            if (data.hasOwnProperty("further_draw_downs")) {
              await loanFinancialDetailsMulti.setJsonObject(data);
              await loanFinancialDetailsMulti.update().where({
                LoanFinancialDetailsMultiId:
                  modelData[0].loan_financial_details_multi_id,
              });
            }

            break;

          case "summary_form":
            await caseModel.setStatus("issued");

            await caseModel.update();

            break;
          default:
            throw new ApiError({
              code: "400",
              title: "Validation Error",
              detail: "Cannot Find any valid action for update",
            });
        }
        await trx.commit();
      });

      const dataUpdated = await (
        await caseModel.getCase(caseType, dipId)
      ).getForm();
      super.ApiJsonResponse({
        res: res,
        collectionName: "dip_form",
        id: "id",
        attributes: [caseType.toLowerCase()],
        data: {
          id: dipId,
          [caseType.toLowerCase()]: {
            ...dataUpdated[0],
          },
        },
      });
    } catch (e) {
      rollbar.error(e, req);
      DipController.ApiJsonError(res, e);
    }
  }

  /**
     * @api {post} /cases/:id/dip Create Dip
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName CreateDip
     * @apiGroup Dip
     * @apiDescription Endpoint for create Dip
     *
     * @apiSuccessExample Success-Response
     {
          "data": {
            "type": "id",
            "id": "6a5628b4-a3c6-4e59-b8d1-9bb4378bdae1",
            "attributes": {
              "id": "6a5628b4-a3c6-4e59-b8d1-9bb4378bdae1"
            }
          }
      }
     */
  public async createDipAction(req: Request, res: Response) {
    const id = req.params.id;
    const caseModel = new Case();

    return Dip.getKnex().transaction(async (trx) => {
      const model = await caseModel.createDip(trx, id);
      const contact = new Contact();
      const loanPropertyDevelopment = new LoanPropertyDevelopment();
      const loanFinancialDetails = new LoanFinancialDetails();
      const loanFinancialDetailsMulti = new LoanFinancialDetailsMulti();
      const loanFinancialHybridTerms = new LoanFinancialHybridTerms();
      const loanFinancialDetailsDev = new LoanFinancialDetailsDev();
      const loanPropertyDevelopmentId = await loanPropertyDevelopment
        .enableTransaction(trx)
        .insert();
      const loanFinancialDetailsDevId = await loanFinancialDetailsDev
        .enableTransaction(trx)
        .insert();
      const contactId = await contact.enableTransaction(trx).insert();
      const loanFinancialDetailsId = await loanFinancialDetails
        .enableTransaction(trx)
        .insert();
      const loanFinancialDetailsMultiId = await loanFinancialDetailsMulti
        .enableTransaction(trx)
        .insert();
      const loanFinancialHybridTermsId = await loanFinancialHybridTerms
        .enableTransaction(trx)
        .insert();

      let user = "admin";
      if (req["connection"]) {
        const requestConnection = req["connection"] as any;
        user = requestConnection["user"];
      }

      caseModel.setData("stage", "dip");

      caseModel.setData("created_at", Dip.getKnex().fn.now());
      model.setData("created_by", user);
      //model.setData('fk_loan_advance_type_id', promiseData[0][0]);
      model.setData("fk_contact_id", contactId[0]);
      model.setData(
        "fk_loan_property_development_id",
        loanPropertyDevelopmentId[0]
      );
      model.setData("fk_loan_financial_details_id", loanFinancialDetailsId[0]);

      loanFinancialDetails.setData(
        "fk_hybrid_terms",
        loanFinancialHybridTermsId
      );
      loanFinancialDetails.setData(
        "fk_loan_financial_details_multi_id",
        loanFinancialDetailsMultiId[0]
      );
      loanFinancialDetails.setData(
        "fk_loan_financial_details_dev_id",
        loanFinancialDetailsDevId[0]
      );
      await loanFinancialDetails
        .enableTransaction(trx)
        .update()
        .where({ LoanFinancialDetailsId: loanFinancialDetailsId[0] });

      await model.enableTransaction(trx).insert();
      await caseModel.update();
      await trx
        .commit()
        .then(() => {
          super.ApiJsonResponse({
            res: res,
            collectionName: "id",
            id: "id",
            attributes: ["id"],
            data: {
              id: id,
            },
          });
        })
        .catch((e) => {
          rollbar.error(e, req);
          trx.rollback();
          DipController.ApiJsonError(res, e);
        });
    });
  }

  @validate(updateLoanDetailsValidator)
  public async updateLoanDetailsAction(req: Request, res: Response) {
    const caseModel = (await new Case().getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    await caseModel.updateLoanFinancialDetails(
      req.body.data.attributes.loan_details
    );

    super.ApiJsonResponse({
      res: res,
      collectionName: "applicant_form",
      attributes: ["result"],
      data: {
        result: true,
      },
    });
  }
}
