import { Request, Response } from "express";

import BaseController from "./base.controller";
import { BaseModel } from "../../models/BaseModel";
import Case, { CaseTypeCode } from "../../models/Case";
import Application from "../../models/Application";
import validate from "../../decorator/validate";
import applicantValidator from "./validator/create_applicant.validator";
import getApplicantsValidator from "./validator/get_applicants.validator";
import updateApplicantValidator from "./validator/update_applicant.validator";
import createAmlKycValidator from "./validator/create_amlkyc.validator";
import Applicant, { ApplicantType } from "../../models/Applicant";

export default class ApplicationController extends BaseController {
  @validate(applicantValidator)
  public async createApplicantAction(req: Request, res: Response) {
    const caseModel = (await new Case().getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    await caseModel.removeAllApplicantsChanged(
      await caseModel.getApplicantsByCaseId(
        (await caseModel.getSelect())[0].fk_case_id
      ),
      req.body.data.attributes
    );
    await caseModel.appendApplicant(req.body.data.attributes);
    super.ApiJsonResponse({
      res: res,
      collectionName: "applicant_form",
      attributes: ["result"],
      data: {
        result: true,
      },
    });
  }

  @validate(getApplicantsValidator)
  public async getApplicantsByCase(req: Request, res: Response) {
    const caseModel = (await new Case().getCase(
      CaseTypeCode.ALL,
      req.params.id
    )) as Application;
    const data = await caseModel.getApplicantsByCaseId(
      (await caseModel.getSelect())[0].fk_case_id
    );

    super.ApiJsonResponse({
      res: res,
      collectionName: "applicant_form",
      attributes: ["company", "individuals"],
      data: {
        company: caseModel.formatJsonResponse(data.company),
        individuals: caseModel.formatJsonResponse(data.individuals),
      },
    });
  }

  @validate(updateApplicantValidator)
  public async updateApplicantAction(req: Request, res: Response) {
    const caseModel = (await new Case().getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    delete req.body.data.attributes.applicant_id;
    await caseModel.updateApplicant(
      req.params.type as ApplicantType,
      (req.params.applicant_id as unknown) as number,
      req.body.data.attributes
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

  public async deleteApplicantAction(req: Request, res: Response) {
    const caseModel = (await new Case().getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    await caseModel.deleteApplicant(
      req.params.type as ApplicantType,
      (req.params.applicant_id as unknown) as number
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

  @validate(createAmlKycValidator)
  public async createAmlKyc(req: Request, res: Response) {
    const applicantId = parseInt(req.params.applicant_id);

    const caseModel = (await new Case().getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;

    const applicantModel = new Applicant();
    applicantModel.id = applicantId;
    await applicantModel.select();

    await caseModel.updateApplicant(ApplicantType.INDIVIDUAL, applicantId, {
      aml_kyc: req.body.data.attributes,
    });

    super.ApiJsonResponse({
      res: res,
      collectionName: "applicant_form",
      attributes: ["result"],
      data: {
        result: true,
      },
    });
  }

  public async createAmlKycCompany(req: Request, res: Response) {
    const applicantId = parseInt(req.params.applicant_id);

    const caseModel = (await new Case().getCase(
      CaseTypeCode.APPLICATION,
      req.params.id
    )) as Application;
    const applicantModel = new Applicant();
    applicantModel.id = applicantId;
    await applicantModel.select();

    await caseModel.updateApplicant(ApplicantType.COMPANY, applicantId, {
      aml_kyc: req.body.data.attributes,
    });

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
