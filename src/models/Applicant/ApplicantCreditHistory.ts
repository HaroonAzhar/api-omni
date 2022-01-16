import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";
import ApplicationStepStatusType from "../Application/ApplicationStepStatusType";

export default class ApplicantCreditHistory extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      debt_judgement: "debt_judgement",
      declared_bankrupt: "declared_bankrupt",
      failed_to_keep: "failed_to_keep",
      claim_dss: "claim_dss",
      convicted_fraud: "convicted_fraud",
      details: "details",
      refused_mortgage_details: "refused_mortgage_details",
      debt_judgement_details: "debt_judgement_details",
      declared_bankrupt_details: "declared_bankrupt_details",
      failed_to_keep_details: "failed_to_keep_details",
      claim_dss_details: "claim_dss_details",
      convicted_fraud_details: "convicted_fraud_details",
      refused_mortgage: "refused_mortgage",
      fk_applicant_id: "fk_applicant_id",
      status: async (db: Knex, value: string) => {
        const status = new ApplicationStepStatusType();
        const data = await status
          .select()
          .where({ ApplicationStepStatusType: value });
        if (!data.length) throw new Error("Cannot find status:" + value);
        return {
          key: "fk_status_id",
          value: data[0].application_step_status_id,
        };
      },
      date_edited: "date_edited",
    };
  }

  public getByApplicant(applicantId: number) {
    return this.select([
      "ApplicantCreditHistory.DebtJudgement",
      "ApplicantCreditHistory.DeclaredBankrupt",
      "ApplicantCreditHistory.FailedToKeep",
      "ApplicantCreditHistory.ClaimDss",
      "ApplicantCreditHistory.ConvictedFraud",
      "ApplicantCreditHistory.Details",
      "ApplicantCreditHistory.RefusedMortgage",
      "ApplicantCreditHistory.DebtJudgementDetails",
      "ApplicantCreditHistory.DeclaredBankruptDetails",
      "ApplicantCreditHistory.FailedToKeepDetails",
      "ApplicantCreditHistory.ClaimDssDetails",
      "ApplicantCreditHistory.ConvictedFraudDetails",
      "ApplicantCreditHistory.RefusedMortgageDetails",
      "ApplicantCreditHistory.DateEdited",
      "Origination.ApplicationStepStatusType.ApplicationStepStatusType as Status",
    ])
      .innerJoin(
        "Origination.Applicant",
        `${this.tableName()}.FkApplicantId`,
        "Applicant.ApplicantId"
      )
      .leftJoin(
        "Origination.ApplicationStepStatusType",
        `${this.tableName()}.FkStatusId`,
        "ApplicationStepStatusType.ApplicationStepStatusId"
      )
      .where({ ApplicantId: applicantId });
  }

  public getByApplicantCompany(applicantId: number) {
    return this.select([
      "ApplicantCreditHistory.DebtJudgement",
      "ApplicantCreditHistory.DeclaredBankrupt",
      "ApplicantCreditHistory.FailedToKeep",
      "ApplicantCreditHistory.ClaimDss",
      "ApplicantCreditHistory.ConvictedFraud",
      "ApplicantCreditHistory.Details",
      "ApplicantCreditHistory.RefusedMortgage",
      "ApplicantCreditHistory.DebtJudgementDetails",
      "ApplicantCreditHistory.DeclaredBankruptDetails",
      "ApplicantCreditHistory.FailedToKeepDetails",
      "ApplicantCreditHistory.ClaimDssDetails",
      "ApplicantCreditHistory.ConvictedFraudDetails",
      "ApplicantCreditHistory.RefusedMortgageDetails",
    ])
      .innerJoin(
        "Origination.ApplicantCompany",
        `${this.tableName()}.FkApplicantId`,
        "ApplicantCompany.ApplicantCompanyId"
      )
      .where({ ApplicantCompanyId: applicantId });
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        applicant_credit_history_id: "number|pk",
        debt_judgement: "boolean",
        declared_bankrupt: "boolean",
        failed_to_keep: "boolean",
        claim_dss: "boolean",
        convicted_fraud: "boolean",
        details: "string",
        refused_mortgage_details: "string",
        debt_judgement_details: "string",
        declared_bankrupt_details: "string",
        failed_to_keep_details: "string",
        claim_dss_details: "string",
        convicted_fraud_details: "string",
        refused_mortgage: "boolean",
        fk_applicant_id: "number",
        fk_status_id: "number",
        date_edited: "string",
      },
    };
  }

  tableName(): string {
    return "Origination.ApplicantCreditHistory";
  }
}
