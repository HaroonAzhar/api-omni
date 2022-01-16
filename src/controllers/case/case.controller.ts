import uuidv4 from "uuid/v4";
import { Error as ApiError } from "jsonapi-serializer";
import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import { inject, injectable } from "tsyringe";

import Case, { CaseTypeCode } from "../../models/Case";
import ApplicationStep from "../../models/Application/ApplicationStep";
import { rollbar } from "../../util/rollbar";
import validateEndpoint from "../../util/validateEndpoint";
import BaseController from "./base.controller";
import Application from "../../models/Application";
import updateIntroducerValidation from "./validator/update_introducer_details.validator";
import updateSolicitorValidation from "./validator/update_solicitor_details.validator";
import updateAdditionalInformationValidation from "./validator/update_additional_information.validator";
import updatePropertyCaseValidator from "./validator/update_case_property.validator";
import patchValuationFlow from "./validator/patch_valuation_flow";
import patchTitleNumber from "./validator/patch_title_number";
import validate from "../../decorator/validate";
import ApplicationStepStatusType from "../../models/Application/ApplicationStepStatusType";

const validation = {};

@injectable()
export default class CaseController extends BaseController {
  constructor(@inject(Case) private caseService?: Case) {
    super();
  }
  /**
   * @api {post} /cases Create New Case
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
   *       "Accept": "application/vnd.api+json"
   *       "Content-Type": "application/vnd.api+json"
   *     }
   * @apiName CreateCase
   * @apiGroup Case
   * @apiDescription Use to obtain case reference for given clientName
   *
   * @apiSuccess (201) {UUIDv4} id Case unique ID.
   */
  public createCaseAction(req: Request, res: Response) {
    validateEndpoint(req.body, validation);
    const id = uuidv4();

    Case.getKnex().transaction(async (trx) => {
      const model = new Case();
      await model.setStatus("pending");
      await model.setData("created_at", new Date());
      model.setData("id", id);
      await model.insert();
      await trx
        .commit()
        .then(() => {
          super.ApiJsonResponse({
            collectionName: "id",
            res: res,
            id: "id",
            attributes: ["id"],
            data: {
              id: id,
            },
          });
        })
        .catch((e) => {
          rollbar.error(e);
          trx.rollback();
          CaseController.ApiJsonError(res, {
            code: "500",
            title: "Cannot add dip form",
            detail: "Internal error",
          });
        });
    });
  }
  /**
     * @api {patch} /case/:id Update Case
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName UpdateCase
     * @apiGroup Case
     * @apiDescription Update Case Data
     * @apiExample Convert To Redeemed
         "data": {
                    "type": "case",
                    "id": "50aeb401-1c67-4bf1-a20a-44ab778c015b",
                    "attributes": {
                        "step_id": "convert_to_redeemed"
                    }
                }
     * @apiExample Convert To Completed
         "data": {
                    "type": "case",
                    "id": "50aeb401-1c67-4bf1-a20a-44ab778c015b",
                    "attributes": {
                        "step_id": "convert_to_completed"
                    }
                }
     * @apiExample Convert to Dip Request
         "data": {
                "type": "case",
                "id": "50aeb401-1c67-4bf1-a20a-44ab778c015b",
                "attributes": {
                    "step_id": "convert_to_dip"
                }
            }
     * @apiExample Change Status Request
         "data": {
                "type": "case",
                "id": "50aeb401-1c67-4bf1-a20a-44ab778c015b",
                "attributes": {
                    "status": "expired",
                    "step_id": "update_status"
                }
            }
     
     Available statuses:
     "pending",
     "received",
     "withdrawn",
     "issued",
     "expired",
     "received",
     "in_progress",
     "ready_to_check",
     "checked",
     "awaiting_application",
     "not_proceeding",
     "live",
     "with_shortfall",
     "in_full",
     * @apiSuccessExample {json} Success-Response:
        {
          "data": {
            "type": "cases",
            "attributes": {
              "status": "ok"
            }
          }
        }
     *  
     */
  async editCaseAction(req: Request, res: Response) {
    try {
      const validation: any = {
        id: Joi.string().min(36).required(),
        type: Joi.string().required(),
        attributes: Joi.object({
          step_id: Joi.string(),
          steps: Joi.array(),
          status: Joi.string().valid(
            "pending",
            "received",
            "withdrawn",
            "issued",
            "expired",
            "received",
            "in_progress",
            "ready_to_check",
            "checked",
            "awaiting_application",
            "not_proceeding",
            "live",
            "with_shortfall",
            "in_full",
            "on_hold"
          ),
        }).required(),
      };
      validateEndpoint(req.body.data, validation);

      const caseType = CaseTypeCode.ALL;
      const caseModel = this.caseService;
      if (req.body.data.attributes.hasOwnProperty("status"))
        req.body.data.attributes.step_id = "update_status";
      const model = await (
        await caseModel.getCase(caseType, req.params.id)
      ).getForm();

      if (!model.length) {
        throw new ApiError({
          code: "404",
          source: { pointer: "/case" },
          title: "Cannot find by id" + req.params.id,
          detail: "ID is wrong",
        });
      }
      const [
        {
          fk_case_id: FkCaseID,
          type_of_introducer: typeOfIntroducer,
          type_of_applicant: typeOfApplicant,
        },
      ] = model;

      const command = req.body.data.attributes.step_id;

      Case.getKnex()
        .transaction(async (trx) => {
          switch (command) {
            case "convert_to_dip":
            case "convert_to_completed":
            case "convert_to_redeemed":
            case "convert_to_case_summary":
            case "convert_to_application":
            case "back_to_dip":
            case "back_to_application":
            case "back_case_summary_to_application":
              await caseModel.changeStage(
                command,
                FkCaseID,
                typeOfApplicant,
                typeOfIntroducer
              );
              break;

            case "update_status":
              await caseModel.setStatus(req.body.data.attributes.status);
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
        })
        .then(() => {
          super.ApiJsonResponse({
            res: res,
            collectionName: "cases",
            attributes: ["status"],
            data: {
              status: "ok",
            },
          });
        })
        .catch((e) => {
          rollbar.error(e, req);
          CaseController.ApiJsonError(res, e);
        });
    } catch (e) {
      rollbar.error(e, req);
      CaseController.ApiJsonError(res, e);
    }
  }

  /**
     * @api {patch} /cases/:id/introducer_details Update Case Introducer
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName UpdateCaseIntroducer
     * @apiGroup Case
     * @apiDescription Endpoint for update Introducer Case
     * @apiExample Example 
        {
          "data": {
            "type": "application_form",
            "id": "c33689cd-ecd7-4e4f-b4c3-9dbfda740e90",
            "attributes": {
              "introducer_details": {
                "firm": "Swaniawski - Green",
                "introducer": "Madison Morar",
                "address_line_1": "132 Emilio Prairie",
                "address_line_2": "Suite 534",
                "city": "Kiehnshire",
                "postcode": "27234",
                "country": "Kuwait",
                "phone_number": "433-226-8095 x543",
                "email": "Helen_Homenick@gmail.com",
                "interim_permission_number": "sed",
                "have_met_client": true
              }
            }
          }
        }
     * @apiSuccessExample {json} Success-Response:
     {
          "data": {
            "type": "cases",
            "attributes": {
              "result": true
            }
          }
        }
     *
     */
  @validate(updateIntroducerValidation)
  public async updateCaseIntroducer(req: Request, res: Response) {
    const model = new Case();
    (await model.getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    await model.updateIntroducer(req.body.data.attributes.introducer_details);

    super.ApiJsonResponse({
      res: res,
      collectionName: "applicant_form",
      attributes: ["result"],
      data: {
        result: true,
      },
    });
  }

  /**
     * @api {patch} /cases/:id/solicitors_details Update Case Solicitor
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName UpdateCaseSolicitor
     * @apiGroup Case
     * @apiDescription Endpoint for update Case Solicitor
     * @apiExample Example
     {
      "data": {
        "type": "application_form",
        "id": "fe6e5d05-0b67-4459-aa69-a81eeceec90b",
        "attributes": {
          "solicitors_details": {
            "are_least_two_partners": false,
            "company_name": "Pollich - Maggio",
            "address_line_1": "6560 Willow Bridge",
            "address_line_2": "Suite 215",
            "city": "Lake Jaylon",
            "postcode": "72741",
            "country": "Belgium",
            "contact_name": "Eugene Kuhn",
            "phone_number": "1-115-610-8499 x41452",
            "email": "Cheyenne64@hotmail.com"
          }
        }
      }
    }
     * @apiSuccessExample {json} Success-Response:
     {
          "data": {
            "type": "cases",
            "attributes": {
              "result": true
            }
          }
        }
     *
     */
  @validate(updateSolicitorValidation)
  public async updateCaseSolicitor(req: Request, res: Response) {
    const model = new Case();
    (await model.getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    await model.updateSolicitor(req.body.data.attributes.solicitors_details);

    super.ApiJsonResponse({
      res: res,
      collectionName: "applicant_form",
      attributes: ["result"],
      data: {
        result: true,
      },
    });
  }

  /**
     * @api {patch} /cases/:id/additional_information Update Case Additional Information
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName UpdateCaseAdditionalInformation
     * @apiGroup Case
     * @apiDescription Endpoint for update Case Additional Information
     * @apiExample Example
     {
      "data": {
        "type": "application_form",
        "id": "cce9b8a0-2355-41c3-9c21-8c1e9b0041d7",
        "attributes": {
          "additional_information": {
            "additional_information": "repellat necessitatibus voluptatem"
          }
        }
      }
    }
     * @apiSuccessExample {json} Success-Response:
     {
          "data": {
            "type": "cases",
            "attributes": {
              "result": true
            }
          }
        }
     *
     */
  @validate(updateAdditionalInformationValidation)
  public async updateAdditionalInformation(req: Request, res: Response) {
    const model = new Case();
    (await model.getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    const {
      additional_information: additionalInformation,
    } = req.body.data.attributes.additional_information;
    await model.updateAdditionalInformation(
      additionalInformation ? additionalInformation : null
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

  /**
     * @api {patch} /cases/:id/property Create Property
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName Create Property
     * @apiGroup Case
     * @apiDescription Endpoint for create Case Property
     * @apiExample Example
     * {
          "type": "applicant_form",
          "id": "999cbd86-2432-4a02-8fff-f7b97444d8cd",
          "attributes": {
            "properties": [
                  {
                    "details": {
                      "already_owned": false,
                      "being_purchased": false,
                      "current_value": 968.36,
                      "value_after_works": 203.76,
                      "purchase_price": 551.67,
                      "purpose_of_borrowings": "unde vero dolor",
                      "property_type": "voluptatem",
                      "security_type": "adsad",
                      "security_type_other": "cvzcadsad",
                      "years_remaining_on_lease": 18818,
                      "is_new_build": true,
                      "is_standard_construction": false,
                      "is_planning_required": true,
                      "is_occupied": false,
                      "is_occupied_by_borrower": false,
                      "basis_for_occupation": "ut",
                      "intentions": "accusamus",
                      "selected_contact_for_payment_valuation": "manual|individual|introducer",
                      "selected_contact_for_access_valuation": "manual|individual|introducer",
                      "contact_for_access_valuation_name": "et",
                      "contact_for_access_valuation_phone": "1234312",
                      "contact_for_access_valuation_email": "et@mail.osw",
                      "contact_for_payment_valuation_name": "voluptas",
                      "contact_for_payment_valuation_phone": "1234312",
                      "contact_for_payment_valuation_email": "et@mail.osw",
                    },
                    "address": {
                      "line_1": "Trantow Plain",
                      "line_2": "Suite 821",
                      "postcode": "42327",
                      "city": "Port Abdul",
                      "country": "Western Sahara"
                    },
                    "charge": {
                      "opfl_charge_type": "et",
                      "lenders": [
                        {
                          "name": "Ernestina Lind",
                          "current_mortgage_outstanding": 511.07
                        },
                        {
                          "name": "Freddie Christiansen",
                          "current_mortgage_outstanding": 100
                        },
                        {
                          "name": "Zetta Bergstrom"
                        },
                        {
                          "name": "Kelley Barton"
                        },
                        {
                          "name": "Earl Fadel"
                        }
                      ],
                      "current_mortgage_outstanding": 611.07
                    }
                  },
                  {
                    "details": {
                      "already_owned": true,
                      "being_purchased": true,
                      "current_value": 556.79,
                      "value_after_works": 625.51,
                      "purchase_price": 884.23,
                      "purpose_of_borrowings": "aliquid optio laboriosam",
                      "property_type": "quia",
                      "security_type": "adsad",
                      "security_type_other": "cvzcadsad",
                      "years_remaining_on_lease": 12584,
                      "is_new_build": true,
                      "is_standard_construction": false,
                      "is_planning_required": true,
                      "is_occupied": true,
                      "is_occupied_by_borrower": false,
                      "basis_for_occupation": "qui",
                      "intentions": "unde",
                      "contact_for_access_valuation": "officiis",
                      "contact_for_payment_valuation": "fuga"
                    },
                    "address": {
                      "line_1": "Connelly Shoals",
                      "line_2": "Suite 581",
                      "postcode": "94855-6770",
                      "city": "Chynafort",
                      "country": "Haiti"
                    },
                    "charge": {
                      "opfl_charge_type": "non",
                      "lenders": [
                        {
                          "name": "Hortense Johnson"
                        },
                        {
                          "name": "Emiliano Schamberger"
                        },
                        {
                          "name": "Verona Boehm"
                        },
                        {
                          "name": "Estell Hickle"
                        },
                        {
                          "name": "Marcellus Lubowitz"
                        }
                      ],
                      "current_mortgage_outstanding": 480.73
                    }
                  }
                  }
                ]
              }
     }
     * @apiSuccessExample {json} Success-Response:
     {
          "data": {
            "type": "cases",
            "attributes": {
              "result": true
            }
          }
        }
     *
     */

  @validate(updatePropertyCaseValidator)
  public async updateProperty(req: Request, res: Response) {
    const model = new Case();
    (await model.getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    await model.updateProperty(req.body.data.attributes.properties);

    super.ApiJsonResponse({
      res: res,
      collectionName: "applicant_form",
      attributes: ["result"],
      data: {
        result: true,
      },
    });
  }

  /**
     * @api {patch} /cases/:id/property/:property_id/valuation_report Update Case Valuation
     * @apiName UpdateCaseValuation
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiGroup Case
     * @apiDescription Endpoint for update Case Valuation
     * @apiExample Example
     {
          "data": {
            "type": "application_form",
            "id": "2d59a244-e10d-4777-8bc6-69057be4e457",
            "attributes": {
              "valuation_basis": "sit",
              "valuation_method": "aspernatur",
              "report_date": "2005-12-24",
              "inspection_date": "2020-01-02",
              "surveyor": "totam",
              "status": "received",
              "market_value": 674.23,
              "day_value": 285.08,
              "gdv": 979.58,
              "day_gdv": "eius",
              "reinstatement_value": 803.19,
              "title_no": "43675",
              "security_description": "quasi ipsa enim",
              "security_subtype": "vel",
              "first_charge_outstanding": "labore",
              "number_of_units": "59397",
              "planning_details": "quae nam aut",
              "country": "Maldives",
              "nitrate_neutrality": false,
              "build_duration": 5,
              "build_costs": 871.29,
              "commencement_date_of_works": "2019-03-02",
              "contractor": "USB",
              "price_per_square_foot": 430.55,
              "price_per_square_meters": 577.48,
              "total_square_feet": 565.3,
              "total_square_meters": 859.04,
              "total_value": 905.51
              "name_of_the_individual_surveyor": "fuga",
              "planning_required": true,
              "link_to_planning_permission": "https://bud.biz",
              "build_costs_per_square_foot": 37073,
              "build_costs_per_square_meter": 97051,
              "project_manager": "et",
              "architect": "ut",
              "structural_engineer": "quia",
              "other_relevant_subcontractors": "porro",
              "omni_experience_with_the_professional_team": "quae non itaque",
              "listed_grade": true,
              "sang": true,
              "sssi": false,
              "anob": true,
              "esw1": true,
              "flood_zone": true,
              "green_belt": true,
            }
          }
     }
     * @apiSuccessExample {json} Success-Response:
     {
          "data": {
            "type": "cases",
            "attributes": {
              "result": true
            }
          }
        }
     *
     */
  @validate(patchValuationFlow)
  public async updatePropertyValuationReport(req: Request, res: Response) {
    const model = new Case();
    (await model.getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    await model.updatePropertyValuationReport({
      ...{ id: req.params.property_id },
      ...req.body.data.attributes,
    });

    super.ApiJsonResponse({
      res: res,
      collectionName: "application_form",
      attributes: ["result"],
      data: {
        result: true,
      },
    });
  }
  /**
     * @api {patch} /cases/:id/property/:property_id/title_number Update Property Title Number
     * @apiName UpdatePropertyTitleNumber
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiGroup CaseSummary
     * @apiDescription Endpoint for Update Property Title Number
     * @apiExample Example
     {
          "data": {
            "type": "application_form",
            "id": "2d59a244-e10d-4777-8bc6-69057be4e457",
            "attributes": {
              "title_numbers": [
                "foo",
                "bar"
              ],
            }
          }
     }
     * @apiSuccessExample {json} Success-Response:
     {
          "data": {
            "type": "application_form",
            "attributes": {
              "result": true
            }
          }
        }
     *
     */
  @validate(patchTitleNumber)
  public async updatePropertyTitleNumber(req: Request, res: Response) {
    const model = new Case();
    (await model.getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    await model.updatePropertyTitleNumber({
      ...{ id: req.params.property_id },
      ...req.body.data.attributes,
    });

    super.ApiJsonResponse({
      res: res,
      collectionName: "application_form",
      attributes: ["result"],
      data: {
        result: true,
      },
    });
  }
}
