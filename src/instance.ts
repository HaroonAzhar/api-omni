import "reflect-metadata";
import path from "path";

import express from "express";
import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "tsyringe";

import { rollbar } from "./util/rollbar";
import DipController from "./controllers/case/dip.controller";
import CaseController from "./controllers/case/case.controller";
import ApplicationController from "./controllers/case/application.controller";
import BaseController from "./controllers/case/base.controller";
import SummaryController from "./controllers/case/application/summary.controller";
import AmlKycController from "./controllers/case/aml_kyc/aml_kyc.controller";

require("express-async-errors");

export const addErrorHandler = (applicationInstance: any) => {
  applicationInstance.use(
    (err: any, req: Request, res: Response, next: NextFunction) => {
      rollbar.error(err);
      BaseController.ApiJsonError(res, err);
    }
  );
};

const router = express.Router();

@injectable()
class AppInstance {
  constructor(
    @inject(DipController) private dipController?: DipController,
    @inject(CaseController) private caseController?: CaseController,
    @inject(ApplicationController)
    private applicationController?: ApplicationController,
    @inject(SummaryController) private summaryController?: SummaryController,
    @inject(AmlKycController) private amlKycController?: AmlKycController
  ) {
    // empty constructor
  }

  public initializeRoute(app: any) {
    const DipControllerInstance = this.dipController;
    const CaseControllerInstance = this.caseController;
    const ApplicationControllerInstance = this.applicationController;

    router.post("/cases", CaseControllerInstance.createCaseAction);
    router.patch("/cases/:id", (req, res) => {
      CaseControllerInstance.editCaseAction(req, res);
    });

    router.patch(
      "/cases/:id/case_summary/:stepId(overview|security|loan|risk_mitigations|further_comments|borrower)",
      (req, res) => {
        this.summaryController.update(req, res);
      }
    );
    router.get("/cases/:id/case_summary", DipControllerInstance.getDipAction);

    router.get("/cases/:id/dip", DipControllerInstance.getDipAction);
    router.get("/cases/dip", DipControllerInstance.getDipAction);

    router.post("/cases/:id/dip", DipControllerInstance.createDipAction);
    router.patch("/cases/:id/dip", DipControllerInstance.editDipAction);
    router.delete("/cases/:id/dip", DipControllerInstance.deleteDipAction);

    router.get("/cases/:id/application", DipControllerInstance.getDipAction);
    router.get("/cases/application", DipControllerInstance.getDipAction);
    router.post(
      "/cases/:id/application",
      DipControllerInstance.createDipAction
    );
    router.patch("/cases/:id/application", DipControllerInstance.editDipAction);
    router.delete(
      "/cases/:id/application",
      DipControllerInstance.deleteDipAction
    );
    router.patch(
      "/cases/:id/loan_details",
      DipControllerInstance.updateLoanDetailsAction
    );
    router.patch(
      "/cases/:id/introducer_details",
      CaseControllerInstance.updateCaseIntroducer
    );
    router.patch(
      "/cases/:id/solicitors_details",
      CaseControllerInstance.updateCaseSolicitor
    );
    router.patch(
      "/cases/:id/additional_information",
      CaseControllerInstance.updateAdditionalInformation
    );

    router.patch(
      "/cases/:id/aml_kyc_validation",
      this.amlKycController.updateAmlKycValidation
    );

    router.post("/cases/:id/property", CaseControllerInstance.updateProperty);
    router.patch(
      "/cases/:id/property/:property_id/valuation_report",
      CaseControllerInstance.updatePropertyValuationReport
    );
    router.patch(
      "/cases/:id/property/:property_id/title_number",
      CaseControllerInstance.updatePropertyTitleNumber
    );

    router.post(
      "/cases/:id/applicant",
      ApplicationControllerInstance.createApplicantAction
    );
    router.get(
      "/cases/:id/applicant",
      ApplicationControllerInstance.getApplicantsByCase
    );

    router.get("/user", (req, res) =>
      res.send(req.connection && (req.connection as any).user)
    );
    router.patch(
      "/cases/:id/applicant/:type/:applicant_id",
      ApplicationControllerInstance.updateApplicantAction
    );
    router.delete(
      "/cases/:id/applicant/:type/:applicant_id",
      ApplicationControllerInstance.deleteApplicantAction
    );
    app.post(
      "/cases/:id/applicant/individuals/:applicant_id/aml_kyc",
      ApplicationControllerInstance.createAmlKyc
    );
    app.post(
      "/cases/:id/applicant/company/:applicant_id/aml_kyc",
      ApplicationControllerInstance.createAmlKycCompany
    );

    app.use("/", router);

    app.use(
      "/docs",
      express.static(path.resolve(process.cwd(), "dist/apidoc"), {
        fallthrough: false,
      })
    );

    addErrorHandler(app);
  }
}

export default AppInstance;
