import Knex from "knex";
import { injectable } from "tsyringe";

import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../interfaces/models/JsonSchemaInterface";
import HttpException from "../util/exceptions/http.exception";
import getStepsForConfiguration, {
  CaseConfigurationData,
} from "../services/application/conversion/getSteps";
import * as AmlKycService from "../services/application/aml_kyc/aml_kyc_service";
import { BaseModel } from "./BaseModel";
import Dip from "./Dip";
import Application from "./Application";
import CaseSummary from "./CaseSummary";
import "../util/func";
import CaseIntroducer from "./Dip/CaseIntroducer";
import CaseSolicitor from "./Case/CaseSolicitor";
import CaseProperty from "./Case/CaseProperty";
import CaseStatus from "./Case/CaseStatus";
import PropertyValuationReport from "./PropertyValuationReport";
import CaseOverview from "./Case/CaseOverview";
import ApplicationStep from "./Application/ApplicationStep";
import Applicant from "./Applicant";
import ApplicantCreditHistory from "./Applicant/ApplicantCreditHistory";
import ApplicantAssetsLiabilitiesAdditional from "./Applicant/ApplicantAssetsLiabilitiesAdditional";
import ApplicationStepName from "./Application/ApplicationStepName";
import ApplicationStepStatusType from "./Application/ApplicationStepStatusType";
import CaseStageHistory from "./Case/CaseStageHistory";

type CaseType = {
  case_id: "number|pk";
  id: "string";
  case_nr: "string";
  stage: "string";
  additional_information: "string";
  fk_case_status_id: "number";
  created_at: "datetime";
  editing_as_dip: "string";
};

export enum CaseTypeCode {
  DIP = "dip",
  APPLICATION = "application",
  ENQUIRY = "enquiry",
  CASE_SUMMARY = "case_summary",
  ALL = "all",
}
@injectable()
export default class Case extends BaseModel {
  tableName(): string {
    return "Origination.Case";
  }

  getJsonMapping(): PropertiesInterface<CaseType> {
    return undefined;
  }

  jsonSchema(): JsonSchemaInterface<CaseType> {
    return {
      type: "object",
      required: [],
      properties: {
        case_id: "number|pk",
        id: "string",
        case_nr: "string",
        stage: "string",
        additional_information: "string",
        fk_case_status_id: "number",
        created_at: "datetime",
        editing_as_dip: "string",
      },
    };
  }

  private async findCaseByKey(caseType: string, id?: string): Promise<Dip> {
    let model = null;

    switch (caseType) {
      case CaseTypeCode.CASE_SUMMARY.capitalize():
        model = new CaseSummary();
        break;
      case CaseTypeCode.APPLICATION.capitalize():
        model = new Application();
        break;
      case CaseTypeCode.DIP.capitalize():
        model = new Dip();
        break;
      case CaseTypeCode.ALL.toUpperCase():
        model = new Application();
        model.includeAll();
        break;
      default:
        throw new Error("Cannot determine case type");
    }

    const query = this.select(["Dip.DipId", "Dip.FkCaseId"]);
    query.innerJoin(
      "Origination.Dip",
      this.tableName() + ".CaseId",
      "Dip.FkCaseId"
    );
    if (id) {
      query.where({ Id: id });
    }
    const result = await query;
    if (!result.length && id)
      throw new HttpException(
        {
          code: "404",
          source: { pointer: `/${caseType.toLowerCase()}` },
          title: "Cannot find by id" + id,
          detail: "ID is wrong",
        },
        404
      );

    if (id) {
      model.setId(result[0].DipId);
      this._id = result[0].FkCaseId;
    }

    return model;
  }

  private async changeApplicationStepToEdited(stepName: string) {
    const stepModel = new ApplicationStep();
    await stepModel.changeStatus(stepName, this._id, "Edited");
  }

  async getCaseById(id: string) {
    const data = await this.select().into(this.tableName()).where({ Id: id });
    if (!data.length) throw new Error("Cannot find case by given id");
    this._id = data[0].case_id;
    return this;
  }

  public async updateIntroducer(
    data: PropertiesInterface<Record<string, unknown>>
  ) {
    const model = new CaseIntroducer();
    await model.delete().where({ FkCaseId: this._id });
    await model.setJsonObject({ fk_case_id: this._id, ...data });
    await model.insert();

    await this.changeApplicationStepToEdited("introducer_details");

    return this;
  }

  public async updateProperty(
    data: Array<PropertiesInterface<Record<string, unknown>>>
  ) {
    const model = new CaseProperty();
    const modelValuations = new PropertyValuationReport();
    const propertiesData = await model.select().where({ FkCaseId: this._id });

    if (propertiesData.length) {
      for (const propertyData of propertiesData) {
        await modelValuations
          .delete()
          .where({ FkPropertyId: propertyData.case_property_id });
      }
    }
    await model.delete().where({ FkCaseId: this._id });
    for (const value of data) {
      const { valuation_report: valuationReport } = value;
      if (value.hasOwnProperty("valuation_report")) {
        delete value.valuation_report;
      }
      await model.setJsonObject(value);
      model.setData("fk_case_id", this._id);
      const newPropertyId = await model.insert();
      if (valuationReport) {
        await modelValuations.setJsonObject({
          ...{ fk_property_id: newPropertyId },
          ...Object(valuationReport),
        });
        await modelValuations.insert();
      }
    }

    await this.changeApplicationStepToEdited("security_details");
  }

  public async updatePropertyValuationReport(
    data: PropertiesInterface<Record<string, unknown>>
  ) {
    const property = new CaseProperty();
    const getProperty = await property
      .select()
      .where({ CasePropertyId: data.id });
    if (!getProperty.length)
      throw new HttpException("Cannot Find Property", 404);
    const model = new PropertyValuationReport();
    await model.delete().where({ FkPropertyId: data.id });
    await model.setJsonObject({ ...{ fk_property_id: data.id }, ...data });
    await model.insert();

    return this;
  }

  public async updatePropertyTitleNumber(
    data: PropertiesInterface<Record<string, unknown>>
  ) {
    const propertyModel = new CaseProperty();
    const getProperty = await propertyModel
      .select()
      .where({ CasePropertyId: data.id });
    if (!getProperty.length)
      throw new HttpException("Cannot Find Property", 404);
    await propertyModel.setJsonObject(data);
    await propertyModel.update().where({ CasePropertyId: data.id });
    return this;
  }

  public async updateAdditionalInformation(text: string) {
    this.setData("additional_information", text);
    await this.update();

    await this.changeApplicationStepToEdited("additional_information");

    return this;
  }

  public async updateSolicitor(
    data: PropertiesInterface<Record<string, unknown>>
  ) {
    const model = new CaseSolicitor();
    await model.delete().where({ FkCaseId: this._id });
    await model.setJsonObject({ fk_case_id: this._id, ...data });
    await model.insert();

    await this.changeApplicationStepToEdited("solicitor_details");

    return this;
  }

  async getCase(
    typeOfCase: CaseTypeCode,
    id?: string
  ): Promise<Dip | Application> {
    this._id = null;
    this._data = {};

    switch (typeOfCase) {
      case CaseTypeCode.DIP:
        return await this.findCaseByKey(CaseTypeCode.DIP.capitalize(), id);
      case CaseTypeCode.APPLICATION:
        return await this.findCaseByKey(
          CaseTypeCode.APPLICATION.capitalize(),
          id
        );
      case CaseTypeCode.CASE_SUMMARY:
        return await this.findCaseByKey(
          CaseTypeCode.CASE_SUMMARY.capitalize(),
          id
        );
      case CaseTypeCode.ALL:
        return await this.findCaseByKey(CaseTypeCode.ALL.toUpperCase(), id);
      default:
        throw new Error("Cannot find case");
    }
  }

  async createDip(trx: Knex.Transaction<any, any>, id: string): Promise<Dip> {
    if (!id) throw new Error("If you want create dip should assign Case");
    const result = await this.select("CaseId").where({ Id: id });
    if (!result.length) throw new Error("Cannot find case");
    const dip = new Dip();
    const dipData = await dip.select().where({ FkCaseId: result[0].CaseId });
    if (dipData.length > 0) throw new Error("Dip by given id already exists!");
    dip.setData("fk_case_id", result[0].CaseId);
    this._id = result[0].CaseId;
    return dip;
  }

  async setStatus(status: string) {
    const statusModel = new CaseStatus();
    const data = await statusModel.select().where({ Name: status });
    if (!data.length) throw new Error("Cannot find status");
    this.setData("fk_case_status_id", data[0].case_status_id);
    return this;
  }

  private async setStageAndEditing() {
    this.setData("stage", "application");
    await this.setStatus("in_progress");
    this.setData("editing_as_dip", false);
    await this.update();
  }

  private async setStatusesToRecheck(FkCaseId: number) {
    const editStatus = new ApplicationStepStatusType();
    const [
      { application_step_status_id: editStatusId },
    ] = await editStatus
      .select()
      .where({ ApplicationStepStatusType: "Edited" });

    const whereFkCaseIdAndEditedStatus = { FkCaseId, FkStatusId: editStatusId };
    const recheckStatus = { status: "Recheck" };
    const stepModel = new ApplicationStep();
    await stepModel.setJsonObject(recheckStatus);
    await stepModel.update().where(whereFkCaseIdAndEditedStatus);

    const propertyModel = new CaseProperty();
    await propertyModel.setJsonObject(recheckStatus);
    await propertyModel.update().where(whereFkCaseIdAndEditedStatus);

    const applicantModel = new Applicant();
    await applicantModel.setJsonObject(recheckStatus);
    await applicantModel.update().where(whereFkCaseIdAndEditedStatus);

    const creditHistoryModel = new ApplicantCreditHistory();
    const assetsAdditionalModel = new ApplicantAssetsLiabilitiesAdditional();

    const applicantsData = await applicantModel.select().where({ FkCaseId });

    applicantsData.forEach(async (applicantData: { applicant_id: number }) => {
      const FkApplicantId = applicantData.applicant_id;
      const whereFkApplicantIdAndEditedStatus = {
        FkApplicantId,
        FkStatusId: editStatusId,
      };

      await creditHistoryModel.setJsonObject(recheckStatus);
      await creditHistoryModel
        .update()
        .where(whereFkApplicantIdAndEditedStatus);
      await assetsAdditionalModel.setJsonObject(recheckStatus);
      await assetsAdditionalModel
        .update()
        .where(whereFkApplicantIdAndEditedStatus);
    });
    await AmlKycService.clearAmlKycValidation({ caseId: FkCaseId });
  }

  private async getAvailableStepNames(): Promise<string[]> {
    const stepNamesModel = new ApplicationStepName();
    const stepNamesData = await stepNamesModel.select();
    return stepNamesData.map(
      ({
        application_step_name: applicationStepName,
      }: {
        application_step_name: string;
      }) => applicationStepName
    );
  }

  private async getExistingSteps(
    FkCaseId: number
  ): Promise<{ name: string; id: number }[]> {
    const stepModel = new ApplicationStep();
    const caseStepData = await stepModel.select().where({ FkCaseId });
    return caseStepData.map(({ name, id }: { name: string; id: number }) => ({
      name,
      id,
    }));
  }
  private async handleDifferenceInSteps(
    FkCaseId: number,
    typeOfApplicant: string,
    typeOfIntroducer: string
  ) {
    const newStepNames = await this.getStepNames(
      typeOfApplicant,
      typeOfIntroducer
    );
    const existingSteps = await this.getExistingSteps(FkCaseId);

    const existingStepNames = existingSteps.map(({ name }) => name);
    const missingNewSteps = newStepNames.filter(
      (stepName: string) => !existingStepNames.includes(stepName)
    );

    await missingNewSteps.forEach(async (stepName: string) => {
      const step = new ApplicationStep();
      await step.setJsonObject({
        name: stepName,
        status: "New",
        fk_case_id: FkCaseId,
        edited: new Date().toISOString(),
      });
      await step.insert();
    });

    const noLongerNeededSteps = existingSteps.filter(
      ({ name }) => !newStepNames.includes(name)
    );

    await noLongerNeededSteps.forEach(async ({ id }) => {
      const step = new ApplicationStep();
      await step.delete().where({ FkCaseId, ApplicationStepId: id });
    });
  }

  async convertDipBackToApplication(
    FkCaseId: number,
    typeOfApplicant: string,
    typeOfIntroducer: string
  ) {
    await this.setStageAndEditing();
    await this.handleDifferenceInSteps(
      FkCaseId,
      typeOfApplicant,
      typeOfIntroducer
    );
  }

  private getStepNames = async (
    typeOfApplicant: string,
    typeOfIntroducer: string
  ): Promise<string[]> => {
    const availableSteps = await this.getAvailableStepNames();
    const caseConfigurationData: CaseConfigurationData = {
      typeOfApplicant,
      typeOfIntroducer,
    };
    return getStepsForConfiguration(caseConfigurationData, availableSteps);
  };

  private async addApplicationSteps(
    FkCaseId: number,
    typeOfApplicant: string,
    typeOfIntroducer: string
  ) {
    const steps = await this.getStepNames(typeOfApplicant, typeOfIntroducer);
    await steps.forEach(async (stepName: string) => {
      const step = new ApplicationStep();
      await step.setJsonObject({
        name: stepName,
        status: "New",
        fk_case_id: FkCaseId,
        edited: new Date().toISOString(),
      });
      await step.insert();
    });
  }

  async convertDipToApplication(
    FkCaseId: number,
    typeOfApplicant: string,
    typeOfIntroducer: string
  ) {
    await this.setStageAndEditing();
    await this.addApplicationSteps(FkCaseId, typeOfApplicant, typeOfIntroducer);
  }

  async changeStage(
    command: string,
    FkCaseId: number,
    typeOfApplicant: string,
    typeOfIntroducer: string
  ) {
    switch (command) {
      case "convert_to_dip":
      case "convert_to_completed":
      case "convert_to_redeemed":
      case "convert_to_case_summary":
        await this.changeCaseStageWithDefaultStatus(command);
        break;
      case "convert_to_application":
        await this.convertDipToApplication(
          FkCaseId,
          typeOfApplicant,
          typeOfIntroducer
        );
        break;

      case "back_to_dip":
        this.setData("stage", "dip");
        this.setData("editing_as_dip", true);
        await this.setStatus("issued");
        await this.update();
        break;

      case "back_to_application":
        await this.convertDipBackToApplication(
          FkCaseId,
          typeOfApplicant,
          typeOfIntroducer
        );
        break;

      case "back_case_summary_to_application":
        await this.setNewStageWithDefaultStatus("application");
        break;
    }
    await this.storeStageChangeEvent(command);
  }

  async storeStageChangeEvent(command: string) {
    const [currentCaseStage = {}] = await this.select("Stage");
    const { Stage: stage } = currentCaseStage;
    const caseStageHistoryModel = new CaseStageHistory();
    await caseStageHistoryModel.setJsonObject({
      command,
      stage,
      fk_case_id: this._id,
    });
    await caseStageHistoryModel.insert();
  }

  async setNewStageWithDefaultStatus(newStage: string) {
    const defaultStatuses: { [key: string]: string } = {
      completed: "live",
      redeemed: "in_full",
      dip: "issued",
      case_summary: "in_progress",
      application: "in_progress",
    };

    this.setData("stage", newStage);
    await this.setStatus(defaultStatuses[newStage]);
    await this.update();
  }

  async changeCaseStageWithDefaultStatus(command: string) {
    const { groups } = command.match(/convert_to_(?<newStage>.*)/);
    const { newStage } = groups;

    await this.setNewStageWithDefaultStatus(newStage);
  }

  async updateSummary(data: Record<string, unknown>) {
    const model = new CaseOverview();
    const result = await model.select().where({ FkCaseId: this._id }).first();
    await model.setJsonObject({
      ...data,
      ...{ fk_case_id: this._id, start_case_summary_date: new Date() },
    });
    result
      ? await model.update().where({ FkCaseId: this._id })
      : await model.insert();
    return this;
  }
}
