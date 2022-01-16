import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import BaseController from "../base.controller";
import Case, { CaseTypeCode } from "../../../models/Case";
import Application from "../../../models/Application";

@injectable()
export default class SummaryController extends BaseController {
  constructor(@inject(Case) private caseService?: Case) {
    super();
  }

  /**
     * @api {patch} /cases/:id/case_summary/overview Update Case Summary Overview
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName Update Case Summary
     * @apiGroup CaseSummary
     * @apiDescription Update Case Summary
     * @apiExample Example
     {
      "data": {
            "type": "application_form",
            "id": "cdbfff6c-5684-41fa-948c-a106b749afca",
            "attributes": {
              "overview": {
                "executive_summary": "Practical encoding",
                "underwriter_rationale": "zero defect IB"
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

  /**
     * @api {patch} /cases/:id/case_summary/security Update Case Summary Security
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName Update Case Summary Security
     * @apiGroup CaseSummary
     * @apiDescription Endpoint for update Case Summary Security
     * @apiExample Example
     {
          "data": {
            "type": "application_form",
            "id": "cdbfff6c-5684-41fa-948c-a106b749afca",
            "attributes": {
              "security": {
                "description_of_property": "Future model",
                "description_of_works": "killer synthesize Paradigm",
                "valuer_name": "compelling",
                "analysis_of_property": "killer synthesize Paradigm"
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

  /**
     * @api {patch} /cases/:id/case_summary/loan Update Case Summary Loan
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName Update Case Summary Loan
     * @apiGroup CaseSummary
     * @apiDescription Endpoint for update Case Summary Loan
     * @apiExample Example
     * {
      "data": {
        "type": "application_form",
        "id": "cdbfff6c-5684-41fa-948c-a106b749afca",
        "attributes": {
          "loan": {
            "servicing_method_rationale": "digital Generic"
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

  /**
     * @api {patch} /cases/:id/case_summary/risk_mitigations Update Case Summary Loan
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName Update Case Summary Loan
     * @apiGroup CaseSummary
     * @apiDescription Endpoint for update Case Summary Loan
     * @apiExample Example
     * {
          "data": {
            "type": "application_form",
            "id": "cdbfff6c-5684-41fa-948c-a106b749afca",
            "attributes": {
              "risk_mitigations": {
                "risk": [
                  {
                    "description": "orchestrate 1080p"
                  },
                  {
                    "description": "Cross-platform Shoes"
                  },
                  {
                    "description": "Administrator"
                  }
                ],
                "mitigation": [
                  {
                    "description": "Texas Integration Shoes"
                  },
                  {
                    "description": "Wisconsin Accounts Clothing"
                  },
                  {
                    "description": "Maryland"
                  }
                ]
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

  /**
     * @api {patch} /cases/:id/case_summary/further_comments Update Case Further Comments
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName Update Case Summary Further Comments
     * @apiGroup CaseSummary
     * @apiDescription Endpoint for update Case Further Comments
     * @apiExample Example
     {
          "data": {
            "type": "application_form",
            "id": "cdbfff6c-5684-41fa-948c-a106b749afca",
            "attributes": {
              "further_comments": {
                "exit_strategy": "1080p",
                "ongoing_monitoring": "Trinidad and Tobago Dollar hybrid Automated",
                "special_conditions": "Timor-Leste withdrawal"
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

  /**
     * @api {patch} /cases/:id/case_summary/borrower Update Case Borrower
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Accept-Encoding": "Accept-Encoding: gzip, deflate",
     *       "Accept": "application/vnd.api+json"
     *       "Content-Type": "application/vnd.api+json"
     *     }
     * @apiName Update Case Summary Borrower
     * @apiGroup CaseSummary
     * @apiDescription Endpoint for update Case Borrower
     * @apiExample Example
     {
  "data": {
    "type": "application_form",
    "id": "d61c52c9-daf6-4ffe-a403-669f39ce8940",
    "attributes": {
      "borrower": {
        "comments": "explicit navigating",
        "borrower_profile": "Awesome Technician Branding",
        "client_meeting_notes": "Central applications",
        "client_meeting_attendees": "Chilean Peso Unidades de fomento payment",
        "client_meeting_date": 2019-03-02T00:00:00.000Z,
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
  public async update(req: Request, res: Response) {
    (await this.caseService.getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;

    await this.caseService.updateSummary(
      req.body.data.attributes[req.params.stepId]
    );
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
