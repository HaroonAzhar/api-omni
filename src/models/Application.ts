import HttpException from "../util/exceptions/http.exception";
import * as AmlKycService from "../services/application/aml_kyc/aml_kyc_service";
import { underscoreKeys } from "../util/func";
import Dip from "./Dip";
import ApplicationStep from "./Application/ApplicationStep";
import Applicant, { ApplicantType } from "./Applicant";
import ApplicantCompany from "./Applicant/ApplicantCompany";
import ApplicantAddressMapping from "./Applicant/ApplicantAddressMapping";
import ContactValue from "./Dip/ContactValue";
import ApplicantAccountant from "./Applicant/ApplicantAccountant";
import Security from "./Dip/Security";
import { BaseModel } from "./BaseModel";
import ApplicantCreditHistory from "./Applicant/ApplicantCreditHistory";
import ApplicantPropertyPortfolio from "./Applicant/ApplicantPropertyPortfolio";
import ApplicantLiability from "./Applicant/ApplicantLiability";
import ApplicantAsset from "./Applicant/ApplicantAsset";
import ApplicantAssetsLiabilitiesAdditional from "./Applicant/ApplicantAssetsLiabilitiesAdditional";
import AmlKyc from "./AmlKyc";
import ApplicationStepStatusType from "./Application/ApplicationStepStatusType";
import {
  Shareholder,
  ShareholderCompany,
} from "./Application/application.interfaces";
export default class Application extends Dip {
  protected _isApplication = true;

  async getForm() {
    const form: { [key: string]: any }[] = await super.getForm();
    const applicationStep = new ApplicationStep();
    for (let i = 0; i < form.length; i++) {
      const applicationStepData = await applicationStep
        .select()
        .where({ FkCaseId: form[i].fk_case_id });
      form[i].steps = applicationStepData;

      const originalApplicants = form[i].applicants;
      const individuals = await this.getApplicantsByCaseId(form[i].dip_id);
      form[i].applicants = [...originalApplicants, ...individuals.individuals];

      const amlKycValidation = await AmlKycService.getAmlKycValidation({
        caseId: form[i].fk_case_id,
      });
      form[i].aml_kyc_validation = underscoreKeys(amlKycValidation || {});
    }
    return form;
  }

  public formatJsonResponse(model: Array<{ result: Record<string, unknown> }>) {
    const data = [];
    for (const value of model) {
      if (value.hasOwnProperty("result")) {
        data.push(value.result);
      }
    }

    return data;
  }

  public async getApplicantsByCaseId(id: number) {
    const addressMappingModel = new ApplicantAddressMapping();
    const contactModel = new ContactValue();
    const creditModel = new ApplicantCreditHistory();
    const propertyPortfolioModel = new ApplicantPropertyPortfolio();
    const liabilityModel = new ApplicantLiability();
    const assetModel = new ApplicantAsset();
    const assetsLiabilitiesAdditionalModel = new ApplicantAssetsLiabilitiesAdditional();
    const applicationStepStatusTypeModel = new ApplicationStepStatusType();

    return {
      individuals: await this.getApplicantIndividualList(
        id,
        addressMappingModel,
        contactModel,
        creditModel,
        propertyPortfolioModel,
        liabilityModel,
        assetModel,
        assetsLiabilitiesAdditionalModel,
        new AmlKyc(),
        applicationStepStatusTypeModel
      ),
      company: await this.getApplicantCompanyList(
        id,
        addressMappingModel,
        contactModel,
        new AmlKyc()
      ),
    };
  }

  private async getApplicantCompanyList(
    id: number,
    addressMappingModel: ApplicantAddressMapping,
    contactModel: ContactValue,
    amlKyCModel: AmlKyc
  ) {
    const applicantModel = new ApplicantCompany();
    const data = (await applicantModel
      .select()
      .where({ FkCaseId: id, IsDeleted: false })) as Array<any>;
    if (!data.length) return [];

    const accountantModel = new ApplicantAccountant();

    for (const value of data) {
      const address = (await addressMappingModel.getApplicantAddress(
        value.applicant_company_id
      )) as Array<Record<string, unknown>>;
      const contact = (await contactModel.getCompanyApplicantContact(
        value.applicant_company_id
      )) as Array<{ email: string }>;
      const accountant = (await accountantModel.getByApplicant(
        value.applicant_company_id
      )) as Array<Record<string, unknown>>;
      const amlKyc = (await amlKyCModel
        .select()
        .where({ FkApplicantCompanyId: value.applicant_company_id })) as Array<
        Record<string, unknown>
      >;

      address.underscore();
      contact.underscore();
      accountant.underscore();

      const addressOutput = address.map((value: { [key: string]: string }) => {
        return {
          address_type: value.address_type,
          address_line_1: value.security_address_line1,
          address_line_2: value.security_address_line2,
          postcode: value.security_postcode,
          city: value.security_town_city,
          country: value.security_country,
        };
      });

      const accountantOutput = accountant.map(
        (value: { [key: string]: string }) => {
          return {
            name: value.name,
            surname: value.surname,
            firm: value.firm,
            qualification: value.qualification,
            address: addressOutput.filter(
              (obj: any) => obj.address_type === "accountant"
            )[0],
          };
        }
      );

      value.result = {
        applicant_id: value.applicant_company_id,
        base_data: {
          name: value.name,
          email: contact.length ? contact[0].email : "",
          applicant_name: value.applicant_name,
          company_number: value.company_number,
          number_of_partners: value.number_of_partners,
          company_type: value.company_type,
          date_of_creation: value.date_of_creation,
          date_of_incorporation: value.date_of_incorporation,
          company_other_type_value: value.company_other_type_value,
          company_registration_number: value.company_registration_number,
          nature_of_business: value.nature_of_business,
          trading_since: value.trading_since,
        },
      };

      value.result.address = {
        is_correspondence_same: Boolean(value.is_correspondence_same),
        registered: addressOutput
          .filter((obj: any) => obj.address_type === "registered")
          .map((value) => {
            delete value["address_type"];
            return value;
          })[0],
        correspondence: addressOutput
          .filter((obj: any) => obj.address_type === "correspondence")
          .map((value) => {
            delete value["address_type"];
            return value;
          })[0],
      };

      value.result.directors = JSON.parse(value.directors);
      value.result.shared_holders = JSON.parse(value.shared_holders);
      value.result.accountant = accountantOutput[0];
      value.result.aml_kyc = amlKyc.map(
        (amlKycEntry: { [key: string]: string }) => {
          if (amlKycEntry.hasOwnProperty("aml_kyc_id"))
            delete amlKycEntry["aml_kyc_id"];
          if (amlKycEntry.hasOwnProperty("fk_applicant_company_id"))
            delete amlKycEntry["fk_applicant_company_id"];
          return amlKycEntry;
        }
      )[0];
    }

    return data;
  }

  private async getApplicantIndividualList(
    id: number,
    addressMappingModel: ApplicantAddressMapping,
    contactModel: ContactValue,
    creditModel: ApplicantCreditHistory,
    propertyPortfolioModel: ApplicantPropertyPortfolio,
    liabilityModel: ApplicantLiability,
    assetModel: ApplicantAsset,
    assetsLiabilitiesAdditionalModel: ApplicantAssetsLiabilitiesAdditional,
    amlKyCModel: AmlKyc,
    applicationStepStatusTypeModel: ApplicationStepStatusType
  ) {
    const individualModel = new Applicant();
    const data = (await individualModel
      .select()
      .where({ FkCaseId: id, IsDeleted: false })) as Array<any>;
    if (!data.length) return [];

    for (const value of data) {
      const address = (await addressMappingModel.getApplicantAddress(
        value.applicant_id
      )) as Array<Record<string, unknown>>;
      const contact = (await contactModel.getApplicantContact(
        value.applicant_id
      )) as Array<Record<string, unknown>>;
      const creditHistory = (await creditModel.getByApplicant(
        value.applicant_id
      )) as Array<Record<string, unknown>>;
      const propertyPortfolio = (await propertyPortfolioModel.getByApplicant(
        value.applicant_id
      )) as Array<Record<string, unknown>>;
      const liabilities = (await liabilityModel.getByApplicant(
        value.applicant_id
      )) as Array<Record<string, unknown>>;
      const assets = (await assetModel.getByApplicant(
        value.applicant_id
      )) as Array<Record<string, unknown>>;
      const assetsLiabilitiesAdditional = (await assetsLiabilitiesAdditionalModel.getByApplicant(
        value.applicant_id
      )) as Array<Record<string, unknown>>;
      const amlKyc = (await amlKyCModel
        .select()
        .where({ FkApplicantId: value.applicant_id })) as Array<
        Record<string, unknown>
      >;
      const [
        status = { application_step_status_type: undefined },
      ] = (await applicationStepStatusTypeModel
        .select()
        .where({ ApplicationStepStatusId: value.fk_status_id })) as Array<{
        application_step_status_type: string;
      }>;
      contact.underscore();
      address.underscore();
      assetsLiabilitiesAdditional.underscore();

      value.result = {
        applicant_id: value.applicant_id,
        status: status.application_step_status_type,
        date_edited: value.date_edited,
        links: value.links,
        fk_shared_contact_id: value.fk_shared_contact_id,
        personal_data: {
          title: value.title,
          forename: value.forename,
          middle_name: value.middle_name,
          surname: value.surname,
          other_name: value.other_name,
          date_of_birth: value.date_of_birth,
          city_of_birth: value.city_of_birth,
          country_of_birth: value.country_of_birth,
          insurance_number: value.insurance_number,
          nationality: value.nationality,
          second_nationality: value.second_nationality,
          has_dual_nationality: value.has_dual_nationality,
          permanent_resident: value.permanent_resident,
          marital_status: value.marital_status,
          marital_other_value: value.marital_other_value,
          uk_residential_status: value.uk_residential_status,
          information_regarding_property_residence:
            value.information_regarding_property_residence,
          mothers_maiden_name: value.mothers_maiden_name,
        },
        contact: {},
        declarations_signatures: {
          declaration: value.declaration,
          signature: value.signature,
          date_of_signature: value.date_of_signature,
          date_of_declaration: value.date_of_declaration,
        },
      };

      value.result.contact = contact.map((value: { [key: string]: string }) => {
        return {
          email: value.email,
          home_phone: value.home_phone,
          mobile_phone: value.mobile_phone,
          work_phone: value.work_phone,
          contact_method: value.contact_method,
          number_of_dependants: value.number_of_dependants,
        };
      })[0];
      value.result.addresses = address
        .filter(
          (singleAddress: { address_type: string }) =>
            singleAddress.address_type === "individual"
        )
        .map((value: { [key: string]: string }) => {
          return {
            address_line_1: value.security_address_line1,
            address_line_2: value.security_address_line2,
            postcode: value.security_postcode,
            city: value.security_town_city,
            country: value.security_country,
            how_long_here_months: value.how_long_here_months,
            how_long_here_years: value.how_long_here_years,
          };
        });

      value.result.credit_history = creditHistory.underscore()[0];
      value.result.liabilities = liabilities.map(
        (value: { [key: string]: string }) => {
          return {
            type: value.type,
            description: value.description,
            net_value: value.net_value,
          };
        }
      );

      value.result.assets = assets.map((value: { [key: string]: string }) => {
        return {
          type: value.type,
          description: value.description,
          gross_value: value.gross_value,
          outstanding_debt: value.outstanding_debt,
          net_value: value.net_value,
        };
      });

      value.result.property_portfolio = propertyPortfolio.map(
        (propertyPortfolio: Record<string, unknown>) => {
          if (
            propertyPortfolio.hasOwnProperty("applicant_property_portfolio_id")
          )
            delete propertyPortfolio["applicant_property_portfolio_id"];
          if (propertyPortfolio.hasOwnProperty("fk_applicant_id"))
            delete propertyPortfolio["fk_applicant_id"];
          return propertyPortfolio;
        }
      );

      value.result.assets_liabilities_additional = assetsLiabilitiesAdditional.map(
        (assetsAdditional: { [key: string]: string }) => {
          if (
            assetsAdditional.hasOwnProperty(
              "applicant_assets_liabilities_additional_id"
            )
          )
            delete assetsAdditional[
              "applicant_assets_liabilities_additional_id"
            ];
          if (assetsAdditional.hasOwnProperty("fk_applicant_id"))
            delete assetsAdditional["fk_applicant_id"];
          if (assetsAdditional.hasOwnProperty("fk_status_id"))
            delete assetsAdditional["fk_status_id"];
          return assetsAdditional;
        }
      )[0];

      value.result.aml_kyc = amlKyc.map(
        (amlKycEntry: { [key: string]: string }) => {
          if (amlKycEntry.hasOwnProperty("aml_kyc_id"))
            delete amlKycEntry["aml_kyc_id"];
          if (amlKycEntry.hasOwnProperty("fk_applicant_id"))
            delete amlKycEntry["fk_applicant_id"];
          return amlKycEntry;
        }
      )[0];
    }

    return data;
  }

  public async removeAllApplicantsChanged(
    data: { company: any[]; individuals: any[] },
    changed: { company: any; individuals: any[] }
  ) {
    if (data.company.length && changed.company) {
      for (const company of data.company) {
        await this.removeCompanyApplicant(company.applicant_company_id);
      }
    }

    if (data.individuals.length && changed.individuals) {
      for (const value of data.individuals) {
        await this.removeIndividualApplicant(value.applicant_id);
      }
    }
  }

  public async removeCompanyApplicant(
    applicantId: number
  ): Promise<Application> {
    const applicantModel = new ApplicantCompany();
    applicantModel.id = applicantId;

    applicantModel.setData("is_deleted", true);

    await applicantModel.update();

    return this;
  }

  public async removeIndividualApplicant(
    applicantId: number
  ): Promise<Application> {
    const applicantModel = new Applicant();
    applicantModel.id = applicantId;

    applicantModel.setData("is_deleted", true);
    await applicantModel.update();

    return this;
  }

  public async appendApplicant(requestData: any) {
    const data = await this.getSelect();
    if (!data.length)
      throw new Error("Cannot find related data with application");
    let model;
    let insertedId;
    const appendIndividuals = async () => {
      model = new Applicant();
      const stepModel = new ApplicationStep();
      for (const row of requestData["individuals"]) {
        await model.setJsonObject(row.personal_data);
        await model.setJsonObject(row.declarations_signatures);
        const areDeclarationsValid =
          row.declarations_signatures &&
          Object.values(row.declarations_signatures).reduce(
            (acc, current) => acc || current !== null,
            false
          );
        if (areDeclarationsValid) {
          await stepModel.changeStatus(
            "declarations",
            data[0].fk_case_id,
            "Edited"
          );
        }
        model.setData("fk_case_id", data[0].fk_case_id);
        model.setData("is_deleted", false);
        insertedId = await model.insert();
        model.id = insertedId[0];
        await model.setJsonObject(row);
        await model.update();
        if (row.hasOwnProperty("credit_history"))
          await this.updateApplicant(ApplicantType.INDIVIDUAL, insertedId[0], {
            credit_history: { ...row.credit_history },
          });
        if (row.hasOwnProperty("liabilities"))
          await this.updateApplicant(ApplicantType.INDIVIDUAL, insertedId[0], {
            liabilities: row.liabilities,
          });
        if (row.hasOwnProperty("assets"))
          await this.updateApplicant(ApplicantType.INDIVIDUAL, insertedId[0], {
            assets: row.assets,
          });
        if (row.hasOwnProperty("property_portfolio"))
          await this.updateApplicant(ApplicantType.INDIVIDUAL, insertedId[0], {
            property_portfolio: row.property_portfolio,
          });
        if (row.hasOwnProperty("assets_liabilities_additional"))
          await this.updateApplicant(ApplicantType.INDIVIDUAL, insertedId[0], {
            assets_liabilities_additional: row.assets_liabilities_additional,
          });
        if (row.hasOwnProperty("aml_kyc"))
          await this.updateApplicant(ApplicantType.INDIVIDUAL, insertedId[0], {
            aml_kyc: row.aml_kyc,
          });
      }
      await stepModel.changeStatus(
        "applicant_details",
        data[0].fk_case_id,
        "Edited"
      );
    };

    const appendCompany = async () => {
      model = new ApplicantCompany();
      await model.setJsonObject(requestData["company"].base_data);
      const caseId = data[0].fk_case_id;
      model.setData("fk_case_id", caseId);
      model.setData("is_deleted", false);
      insertedId = await model.insert();
      model.id = insertedId[0];
      await model.setJsonObject(requestData["company"]);
      await model.update();
      if (requestData["company"].hasOwnProperty("shared_holders"))
        await this.appendShareholdersCompaniesAsCompanies(
          caseId,
          requestData["company"].shared_holders
        );
      const stepModel = new ApplicationStep();
      await stepModel.changeStatus(
        "company_details",
        data[0].fk_case_id,
        "Edited"
      );
    };
    const appendAppropriateApplicant = async (key: string) => {
      switch (key) {
        case "individuals": {
          await appendIndividuals();
          break;
        }

        case "company": {
          await appendCompany();
          break;
        }
        default:
          throw new Error("Wrong applicant type");
      }
    };
    await AmlKycService.clearAmlKycValidation({ caseId: data[0].fk_case_id });
    await appendAppropriateApplicant(Object.keys(requestData)[0]);
    return (
      (await Object.keys(requestData)[1]) &&
      appendAppropriateApplicant(Object.keys(requestData)[1])
    );
  }

  public async updateApplicant(
    type: ApplicantType,
    applicantId: number,
    requestData: any
  ) {
    switch (type) {
      case "individual":
        await this.updateApplicantIndividual(applicantId, requestData);
        break;

      case "company":
        await this.updateApplicantCompany(applicantId, requestData);
        break;

      default:
        throw new HttpException(`Cannot find applicant type ${type}`, 404);
    }
  }

  public async deleteApplicant(type: ApplicantType, applicantId: number) {
    switch (type) {
      case "individual":
        await this.removeIndividualApplicant(applicantId);
        break;

      case "company":
        await this.removeCompanyApplicant(applicantId);
        break;

      default:
        throw new HttpException(`Cannot find applicant type ${type}`, 404);
    }
  }

  private async updateAmlKyc(
    model: Applicant | ApplicantCompany,
    applicantId: number,
    requestData: Record<string, any>
  ) {
    const where =
      model instanceof Applicant
        ? { FkApplicantId: applicantId }
        : { FkApplicantCompanyId: applicantId };

    const amlKycModel = new AmlKyc();
    const amlKycModelData = await amlKycModel.select().where(where);

    if (amlKycModelData.length) {
      await amlKycModel.delete().where(where);
    }

    requestData.aml_kyc[
      model instanceof Applicant ? "fk_applicant_id" : "fk_applicant_company_id"
    ] = applicantId;

    await amlKycModel.setJsonObject(requestData.aml_kyc);
    await amlKycModel.insert();
    const data = await this.getSelect();
    await AmlKycService.clearAmlKycValidation({ caseId: data[0].fk_case_id });
  }

  private async updateApplicantCompany(
    applicantId: number,
    requestData: Record<any, any>
  ) {
    const model = new ApplicantCompany();
    model.id = applicantId;
    const modelData = await model.select();
    const caseData = await this.getSelect();
    const caseId = caseData[0].fk_case_id;

    if (!model && !modelData.length)
      throw new HttpException("Cannot find applicant company", 404);

    if (requestData.hasOwnProperty("aml_kyc")) {
      await this.updateAmlKyc(model, applicantId, requestData);
    }

    if (requestData.hasOwnProperty("base_data")) {
      await model.setJsonObject(requestData.base_data);
      await model.update();
    }

    if (requestData.hasOwnProperty("shared_holders")) {
      await this.updateShareholderCompanies(
        caseId,
        requestData.shared_holders,
        applicantId
      );
    }

    await model.setJsonObject(requestData);
    await model.update();

    const stepModel = new ApplicationStep();

    await stepModel.changeStatus("company_details", caseId, "Edited");
  }

  private async updateApplicantIndividual(
    applicantId: number,
    requestData: Record<any, any>
  ) {
    const model = new Applicant();
    model.id = applicantId;
    const modelData = await model.select().first();
    const stepModel = new ApplicationStep();

    if (!model && !modelData)
      throw new HttpException("Cannot find applicant individual", 404);

    for (const requestKey of Object.keys(requestData)) {
      switch (requestKey) {
        case "personal_data":
          await model.setJsonObject(requestData.personal_data);
          await model.update();
          break;
        case "addresses":
          await model.setJsonObject({
            addresses: requestData.addresses,
          });
          await model.update();
          break;
        case "contact":
          await model.setJsonObject({
            contact: {
              ...requestData.contact,
              ...{ contact_id: modelData.fk_contact_id },
            },
          });
          await model.update();
          break;
        case "declarations_signatures":
          await model.setJsonObject(requestData.declarations_signatures);
          await model.update();
          await stepModel.changeStatus(
            "declarations",
            modelData.fk_case_id,
            "Edited"
          );
          break;
        case "credit_history":
          const creditModel = new ApplicantCreditHistory();
          const creditModelData = await creditModel
            .select()
            .where({ FkApplicantId: applicantId });
          if (creditModelData.length) {
            model.setData("fk_applicant_credit_history_id", null);
            await model.update();
            await creditModel.delete().where({ FkApplicantId: applicantId });
          }

          await creditModel.setJsonObject({
            fk_applicant_id: applicantId,
            ...requestData.credit_history,
          });
          const insertedId = await creditModel.insert();
          model.setData("fk_applicant_credit_history_id", insertedId[0]);
          await model.update();

          await stepModel.changeStatus(
            "credit_history",
            modelData.fk_case_id,
            "Edited"
          );

          break;

        case "property_portfolio":
          const propertyPortfolioModel = new ApplicantPropertyPortfolio();
          const propertyPortfolioModelData = await propertyPortfolioModel
            .select()
            .where({ FkApplicantId: applicantId });
          if (propertyPortfolioModelData.length) {
            await propertyPortfolioModel
              .delete()
              .where({ FkApplicantId: applicantId });
          }
          for (const propertyPortfolio of requestData.property_portfolio) {
            await propertyPortfolioModel.setJsonObject({
              fk_applicant_id: applicantId,
              ...propertyPortfolio,
            });
            await propertyPortfolioModel.insert();
            await stepModel.changeStatus(
              "assets_and_liabilities",
              modelData.fk_case_id,
              "Edited"
            );
          }
          break;

        case "liabilities":
          const liabilityModel = new ApplicantLiability();
          const liabilityModelData = await liabilityModel
            .select()
            .where({ FkApplicantId: applicantId });
          if (liabilityModelData.length) {
            await liabilityModel.delete().where({ FkApplicantId: applicantId });
          }

          for (const value of requestData.liabilities) {
            await liabilityModel.setJsonObject({
              fk_applicant_id: applicantId,
              ...value,
            });
            await liabilityModel.insert();
            await stepModel.changeStatus(
              "assets_and_liabilities",
              modelData.fk_case_id,
              "Edited"
            );
          }
          break;

        case "assets":
          const assetsModel = new ApplicantAsset();
          const assetsModelData = await assetsModel
            .select()
            .where({ FkApplicantId: applicantId });
          if (assetsModelData.length) {
            await assetsModel.delete().where({ FkApplicantId: applicantId });
          }

          for (const value of requestData.assets) {
            await assetsModel.setJsonObject({
              fk_applicant_id: applicantId,
              ...value,
            });
            await assetsModel.insert();
            await stepModel.changeStatus(
              "assets_and_liabilities",
              modelData.fk_case_id,
              "Edited"
            );
          }
          break;

        case "assets_liabilities_additional":
          const assetsLiabilitiesAdditionalModel = new ApplicantAssetsLiabilitiesAdditional();
          const assetsLiabilitiesAdditionalModelData = await assetsLiabilitiesAdditionalModel
            .select()
            .where({ FkApplicantId: applicantId });
          if (assetsLiabilitiesAdditionalModelData.length) {
            await assetsLiabilitiesAdditionalModel
              .delete()
              .where({ FkApplicantId: applicantId });
          }

          const value = requestData.assets_liabilities_additional;
          await assetsLiabilitiesAdditionalModel.setJsonObject({
            fk_applicant_id: applicantId,
            ...value,
          });
          await assetsLiabilitiesAdditionalModel.insert();

          await stepModel.changeStatus(
            "assets_and_liabilities",
            modelData.fk_case_id,
            "Edited"
          );

          break;

        case "aml_kyc":
          await this.updateAmlKyc(model, applicantId, requestData);
          break;
        case "date_edited":
        case "status":
        case "links":
          await model.setJsonObject(requestData);
          await model.update();
          break;
        default:
          throw new HttpException(
            "Cannot find any action to update applicant individual",
            404
          );
      }
    }
  }

  appendShareholderCompanyAsCompany = async (
    caseId: number,
    shareholderCompanyName: string,
    sharedHolders: Array<Shareholder>,
    companyNumber: string
  ) => {
    const shareholderApplicantModel = new ApplicantCompany();

    await shareholderApplicantModel.setJsonObject({
      fk_case_id: caseId,
      name: shareholderCompanyName,
      shared_holders: sharedHolders,
      company_number: companyNumber,
    });
    shareholderApplicantModel.setData("fk_case_id", caseId);
    shareholderApplicantModel.setData("is_deleted", false);

    await shareholderApplicantModel.insert();
  };
  async appendShareholdersCompaniesAsCompanies(
    caseId: number,
    shareholders: Array<Shareholder>
  ) {
    await shareholders.forEach(async (shareholder: Shareholder) => {
      if (shareholder.isCompany) {
        await this.appendShareholdersCompaniesAsCompanies(
          caseId,
          shareholder.company
        );
        await this.appendShareholderCompanyAsCompany(
          caseId,
          shareholder.name,
          shareholder.company,
          shareholder.company_number
        );
      }
    });
  }

  async updateShareholderCompanies(
    caseId: number,
    shareholders: Array<Shareholder>,
    parentApplicantId: number
  ) {
    const shareholderApplicantModel = new ApplicantCompany();

    const existingShareholderCompanies = await shareholderApplicantModel
      .select()
      .where({
        FkCaseId: caseId,
        IsDeleted: false,
      });

    const updatedCompaniesIds = [Number(parentApplicantId)];
    const updateShareholderCompaniesWithRegardsToExisitng = async (
      shareholdersForUpdate: Array<Shareholder>
    ) => {
      for (const shareholder of shareholdersForUpdate) {
        if (!shareholder.isCompany) {
          continue;
        }
        await updateShareholderCompaniesWithRegardsToExisitng(
          shareholder.company
        );

        const [
          existingShareholderCompany,
        ] = existingShareholderCompanies.filter(
          (currentExistingShareholderCompany: ShareholderCompany) =>
            currentExistingShareholderCompany.company_number ===
            shareholder.company_number
        );
        if (existingShareholderCompany) {
          await this.updateShareholderCompany(
            caseId,
            shareholder,
            existingShareholderCompany.applicant_company_id
          );
          updatedCompaniesIds.push(
            existingShareholderCompany.applicant_company_id
          );
        } else {
          await this.appendShareholderCompanyAsCompany(
            caseId,
            shareholder.name,
            shareholder.company,
            shareholder.company_number
          );
          await AmlKycService.clearAmlKycValidation({ caseId });
        }
      }
    };

    await updateShareholderCompaniesWithRegardsToExisitng(shareholders);

    existingShareholderCompanies.forEach(
      async (existingShareholderCompany: { applicant_company_id: number }) => {
        if (
          updatedCompaniesIds.includes(
            existingShareholderCompany.applicant_company_id
          )
        ) {
          return;
        }
        shareholderApplicantModel.setData("is_deleted", true);
        await shareholderApplicantModel.update().where({
          ApplicantCompanyId: existingShareholderCompany.applicant_company_id,
        });
        await AmlKycService.clearAmlKycValidation({ caseId });
      }
    );
  }

  async updateShareholderCompany(
    caseId: number,
    newShareholder: ShareholderCompany,
    ApplicantCompanyId: number
  ) {
    const shareholderApplicantModel = new ApplicantCompany();

    await shareholderApplicantModel.setJsonObject({
      shared_holders: newShareholder.company,
    });
    await shareholderApplicantModel
      .update()
      .where({ FKCaseId: caseId, ApplicantCompanyId });
  }
}
