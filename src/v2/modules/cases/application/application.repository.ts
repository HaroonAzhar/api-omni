import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';
import Knex from 'knex';

import {
  ApplicationRepositoryInterface,
  Status,
  StepName,
  EditedStatus,
  CreatePropertyEntity,
  Property,
  PropertyEntity,
  Application,
} from './application.interface';

class CompanyAccountantRepository {
  constructor(private readonly knex: KnexInstance) {}

  private tableName = 'Origination.ApplicantAccountant';

  public async get(FkApplicantId: number) {
    const [accountant] = await this.knex(this.tableName).where({ FkApplicantId });
    return accountant;
  }
}

class AmlKycRepository {
  constructor(private readonly knex: KnexInstance) {}

  private tableName = 'Origination.AmlKyc';

  public async getForCompany(FkApplicantCompanyId: number) {
    const [amlKyc] = await this.knex(this.tableName).where({ FkApplicantCompanyId });
    return amlKyc;
  }

  public async getForIndividual(FkApplicantId: number) {
    const [amlKyc] = await this.knex(this.tableName).where({ FkApplicantId });
    return amlKyc;
  }
}

class StatusTypeRepository {
  constructor(private readonly knex: KnexInstance) {}

  private tableName = 'Origination.ApplicationStepStatusType';

  public async getType(ApplicationStepStatusId: number): Promise<string> {
    if (ApplicationStepStatusId) {
      const [{ ApplicationStepStatusType = '' }] = await this.knex(this.tableName).where({ ApplicationStepStatusId });

      return ApplicationStepStatusType;
    }
    return 'New';
  }

  public withStatus(query: Knex.QueryBuilder, joinColumn: string) {
    return query.leftJoin(this.tableName, joinColumn, 'ApplicationStepStatusType.ApplicationStepStatusId');
  }

  public async getId(ApplicationStepStatusType: string): Promise<number> {
    const [{ ApplicationStepStatusId = '' }] = await this.knex(this.tableName).where({ ApplicationStepStatusType });
    return ApplicationStepStatusId;
  }
}

class CreditHistoryRepository {
  private statusTypeRepository: StatusTypeRepository;
  constructor(private readonly knex: KnexInstance) {
    this.statusTypeRepository = new StatusTypeRepository(knex);
  }

  private tableName = 'Origination.ApplicantCreditHistory';

  public async get(FkApplicantId: number) {
    const [creditHistory] = await this.knex(this.tableName).where({ FkApplicantId });
    if (creditHistory) {
      creditHistory.status = await this.statusTypeRepository.getType(creditHistory.FkStatusId);
    }
    return creditHistory;
  }

  public async updateStatus(FkApplicantId: number, FkStatusId: number, prevFkStatusId: number) {
    await this.knex(this.tableName).update({ FkStatusId }).where({ FkApplicantId, FkStatusId: prevFkStatusId });
  }
}

class PropertyPortfolioRepository {
  constructor(private readonly knex: KnexInstance) {}

  private tableName = 'Origination.ApplicantPropertyPortfolio';

  public async get(FkApplicantId: number) {
    const propertyPortfolio = await this.knex(this.tableName).where({ FkApplicantId });
    return propertyPortfolio;
  }
}

class LiabilityRepository {
  constructor(private readonly knex: KnexInstance) {}

  private tableName = 'Origination.ApplicantLiability';

  public async get(FkApplicantId: number) {
    const liabilities = await this.knex(this.tableName).where({ FkApplicantId });
    return liabilities;
  }
}

class AssetRepository {
  constructor(private readonly knex: KnexInstance) {}

  private tableName = 'Origination.ApplicantAsset';

  public async get(FkApplicantId: number) {
    const assets = await this.knex(this.tableName).where({ FkApplicantId });
    return assets;
  }
}

class ContactRepository {
  private dipContactValueTable = `Origination.DipContactValue`;

  constructor(private readonly knex: KnexInstance) {}
  async withContact(applicantTable: string, FkCaseId: number) {
    return this.knex(applicantTable)
      .select(
        `${applicantTable}.*`,
        `${this.dipContactValueTable}.Email`,
        `${this.dipContactValueTable}.Name as ContactName`,
        `${this.dipContactValueTable}.Phone`,
        `${this.dipContactValueTable}.MobilePhone`,
        `${this.dipContactValueTable}.HomePhone`,
        `${this.dipContactValueTable}.WorkPhone`,
        `${this.dipContactValueTable}.NumberOfDependants`
      )
      .where({ FkCaseId, IsDeleted: false })
      .leftJoin(
        this.dipContactValueTable,
        `${this.dipContactValueTable}.ContactValueId`,
        `${applicantTable}.FkContactId`
      );
  }
}
class AddressRepository {
  private applicantAddressMappingTable = 'Origination.ApplicantAddressMapping';
  private dipSecurityTable = `Origination.DipSecurity`;

  constructor(private readonly knex: KnexInstance) {}

  async get(ApplicantId: number, addressType: string) {
    return this.knex(this.dipSecurityTable)
      .leftJoin(
        this.applicantAddressMappingTable,
        `${this.applicantAddressMappingTable}.FkAddressId`,
        `${this.dipSecurityTable}.SecurityId`
      )
      .where({
        [`${this.applicantAddressMappingTable}.FkApplicantId`]: ApplicantId,
        [`${this.applicantAddressMappingTable}.AddressType`]: addressType,
      });
  }
}
class IndividualsRepository {
  private applicantTable = 'Origination.Applicant';

  private statusTypeRepository: StatusTypeRepository;
  private creditHistoryRepository: CreditHistoryRepository;
  private propertyPortfolioRepository: PropertyPortfolioRepository;

  private assetRepository: AssetRepository;
  private liabilityRepository: LiabilityRepository;

  private addressRepository: AddressRepository;
  private amlKycRepository: AmlKycRepository;
  private contactRepository: ContactRepository;

  constructor(private readonly knex: KnexInstance) {
    this.statusTypeRepository = new StatusTypeRepository(this.knex);
    this.creditHistoryRepository = new CreditHistoryRepository(this.knex);
    this.propertyPortfolioRepository = new PropertyPortfolioRepository(this.knex);
    this.assetRepository = new AssetRepository(this.knex);
    this.liabilityRepository = new LiabilityRepository(this.knex);
    this.addressRepository = new AddressRepository(this.knex);
    this.amlKycRepository = new AmlKycRepository(this.knex);
    this.contactRepository = new ContactRepository(this.knex);
  }

  async get(FkCaseId: number) {
    const individuals = await this.contactRepository.withContact(this.applicantTable, FkCaseId);
    const individualsWithAddress = Promise.all(
      individuals.map(async (individual) => {
        individual.addresses = await this.addressRepository.get(individual.ApplicantId, 'individual');
        individual.amlKyc = await this.amlKycRepository.getForIndividual(individual.ApplicantId);
        individual.status = await this.statusTypeRepository.getType(individual.FkStatusId);
        individual.creditHistory = await this.creditHistoryRepository.get(individual.ApplicantId);
        individual.propertyPortfolio = await this.propertyPortfolioRepository.get(individual.ApplicantId);
        individual.assets = await this.assetRepository.get(individual.ApplicantId);
        individual.liabilities = await this.liabilityRepository.get(individual.ApplicantId);
        return individual;
      })
    );
    return individualsWithAddress;
  }

  async changeIndividualsStatus(FkCaseId: number, status: Status, prevStatus: Status) {
    const FkStatusId = await this.statusTypeRepository.getId(status);

    const prevFkStatusId = await this.statusTypeRepository.getId(prevStatus);

    await this.knex(this.applicantTable).update({ FkStatusId }).where({ FkCaseId, FkStatusId: prevFkStatusId });

    const individuals = await this.get(FkCaseId);
    individuals.forEach(async ({ ApplicantId }) => {
      await this.creditHistoryRepository.updateStatus(ApplicantId, FkStatusId, prevFkStatusId);
    });
  }
}

class CompaniesRepository {
  private applicantCompanyTable = 'Origination.ApplicantCompany';

  private companyAccountantRepository: CompanyAccountantRepository;

  private addressRepository: AddressRepository;
  private amlKycRepository: AmlKycRepository;
  private contactRepository: ContactRepository;

  constructor(private readonly knex: KnexInstance) {
    this.companyAccountantRepository = new CompanyAccountantRepository(this.knex);

    this.addressRepository = new AddressRepository(this.knex);
    this.amlKycRepository = new AmlKycRepository(this.knex);
    this.contactRepository = new ContactRepository(this.knex);
  }

  async get(FkCaseId: number) {
    const companies = await this.contactRepository.withContact(this.applicantCompanyTable, FkCaseId);
    const companiesWithAddresses = Promise.all(
      companies.map(async (company) => {
        company.registeredAddress = (await this.addressRepository.get(company.ApplicantCompanyId, 'registered'))[0];
        company.correspondenceAddress = (
          await this.addressRepository.get(company.ApplicantCompanyId, 'correspondence')
        )[0];
        company.accountant = await this.companyAccountantRepository.get(company.ApplicantCompanyId);
        if (company.accountant) {
          company.accountant.address = (await this.addressRepository.get(company.ApplicantCompanyId, 'accountant'))[0];
        }
        company.amlKyc = await this.amlKycRepository.getForCompany(company.ApplicantCompanyId);
        company.directors = JSON.parse(company.Directors);
        company.sharedHolders = JSON.parse(company.SharedHolders);

        return company;
      })
    );
    return companiesWithAddresses;
  }
}

class ValuationsRepository {
  private propertyValuationReportTable = 'Origination.PropertyValuationReport';

  private statusTypeRepository: StatusTypeRepository;
  constructor(private readonly knex: KnexInstance) {
    this.statusTypeRepository = new StatusTypeRepository(this.knex);
  }
  async get(FkPropertyId: number) {
    const [valuationReport] = await this.knex(this.propertyValuationReportTable).where({
      FkPropertyId,
    });
    if (valuationReport === undefined) {
      return valuationReport;
    }
    valuationReport.status = await this.statusTypeRepository.getType(valuationReport.FkStatusId);
    valuationReport.planningReferenceNumbers = JSON.parse(valuationReport.PlanningReferenceNumbers);
    return valuationReport;
  }

  async changeStatus(FkPropertyId: number, FkStatusId: number, prevFkStatusId: number) {
    await this.knex(this.propertyValuationReportTable)
      .update({ FkStatusId })
      .where({ FkPropertyId, FkStatusId: prevFkStatusId });
  }
}
class PropertiesRepository {
  private propertyTable = 'Origination.CaseProperty';

  private statusTypeRepository: StatusTypeRepository;
  private valuationRepository: ValuationsRepository;
  constructor(private readonly knex: KnexInstance) {
    this.statusTypeRepository = new StatusTypeRepository(this.knex);
    this.valuationRepository = new ValuationsRepository(this.knex);
  }

  async get(FkCaseId: number) {
    const properties = await this.knex(this.propertyTable).where({ FkCaseId });

    return Promise.all(properties.map((property) => this.fillProperty(property)));
  }

  async fillProperty(propertyEntity: PropertyEntity): Promise<Property> {
    return {
      ...propertyEntity,
      titleNumbers: JSON.parse(propertyEntity.TitleNumbers),
      lenders: JSON.parse(propertyEntity.Lenders),
      status: await this.statusTypeRepository.getType(propertyEntity.FkStatusId),
      valuationReport: await this.valuationRepository.get(propertyEntity.CasePropertyId),
    };
  }

  async getProperty(CasePropertyId: number): Promise<Property | undefined> {
    const [property] = await this.knex(this.propertyTable).select<PropertyEntity[]>().where({ CasePropertyId });
    if (!property) {
      return undefined;
    }
    return this.fillProperty(property);
  }

  async changePropertiesStatus(FkCaseId: number, stepName: StepName, status: Status, prevStatus: Status) {
    const FkStatusId = await this.statusTypeRepository.getId(status);
    const prevFkStatusId = await this.statusTypeRepository.getId(prevStatus);

    switch (stepName) {
      case 'security_details': {
        await this.knex(this.propertyTable).update({ FkStatusId }).where({ FkCaseId, FkStatusId: prevFkStatusId });
        break;
      }
      case 'valuation_report': {
        const properties = await this.get(FkCaseId);
        properties.forEach(async ({ CasePropertyId }) => {
          await this.valuationRepository.changeStatus(CasePropertyId, FkStatusId, prevFkStatusId);
        });
        break;
      }
    }
  }

  async addProperty(property: CreatePropertyEntity): Promise<number> {
    const [id] = await this.knex(this.propertyTable).insert(property, 'CasePropertyId');
    return id;
  }
}

class AmlKycValidationRepository {
  private tableName = 'Origination.AmlKycValidation';

  constructor(private readonly knex: KnexInstance) {}

  async get(FkCaseId: number) {
    const amlKycValidations = await this.knex(this.tableName).select().where({ FkCaseId });
    const [amlKycValidation] = amlKycValidations;
    return amlKycValidation;
  }

  async invalidate(FkCaseId: number) {
    await this.knex(this.tableName).delete().where({ FkCaseId });
  }
}

class StepRepository {
  private table = 'ApplicationStep';
  private tableName = `Origination.${this.table}`;
  private stepName = `ApplicationStepName`;
  private stepNameTable = `Origination.${this.stepName}`;

  private statusTypeRepository: StatusTypeRepository;
  constructor(private readonly knex: KnexInstance) {
    this.statusTypeRepository = new StatusTypeRepository(this.knex);
  }

  async get(FkCaseId: number) {
    const steps = await this.statusTypeRepository.withStatus(
      this.knex(this.tableName)
        .select()
        .where({ FkCaseId })
        .leftJoin(`Origination.${this.stepName}`, `${this.table}.FkNameId`, `${this.stepName}.ApplicationStepNameId`),
      `${this.table}.FkStatusId`
    );
    return steps;
  }

  private async getNameId(ApplicationStepName: StepName) {
    const [{ ApplicationStepNameId }] = await this.knex(this.stepNameTable).where({ ApplicationStepName });
    return ApplicationStepNameId;
  }
  public async changeStatus(FkCaseId: number, stepName: StepName, status: Status, prevStatus: Status) {
    const FkNameId = await this.getNameId(stepName);
    const FkStatusId = await this.statusTypeRepository.getId(status);
    const prevFkStatusId = await this.statusTypeRepository.getId(prevStatus);

    await this.knex(this.tableName).update({ FkStatusId }).where({ FkNameId, FkCaseId, FkStatusId: prevFkStatusId });
  }
}

class IntroducerRepository {
  private table = 'CaseIntroducer';
  private tableName = `Origination.${this.table}`;

  constructor(private readonly knex: KnexInstance) {}

  async get(FkCaseId: number) {
    const [introducer] = await this.knex(this.tableName).select().where({ FkCaseId });
    return introducer;
  }
}

class SolicitorRepository {
  private table = 'CaseSolicitor';
  private tableName = `Origination.${this.table}`;

  constructor(private readonly knex: KnexInstance) {}

  async get(FkCaseId: number) {
    const [introducer] = await this.knex(this.tableName).select().where({ FkCaseId });
    return introducer;
  }
}

@Injectable()
export class ApplicationRepository extends ApplicationRepositoryInterface {
  private individualsRepository: IndividualsRepository;
  private companiesRepository: CompaniesRepository;
  private propertiesRepository: PropertiesRepository;
  private amlKycValidationRepository: AmlKycValidationRepository;
  private stepsRepository: StepRepository;
  private introducerRepository: IntroducerRepository;
  private solicitorRepository: SolicitorRepository;

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
    this.individualsRepository = new IndividualsRepository(this.knex);
    this.companiesRepository = new CompaniesRepository(this.knex);
    this.propertiesRepository = new PropertiesRepository(this.knex);
    this.amlKycValidationRepository = new AmlKycValidationRepository(this.knex);
    this.stepsRepository = new StepRepository(this.knex);
    this.introducerRepository = new IntroducerRepository(this.knex);
    this.solicitorRepository = new SolicitorRepository(this.knex);
  }

  async getByCaseId(FkCaseId: number): Promise<Application> {
    const properties = await this.propertiesRepository.get(FkCaseId);
    const individuals = await this.individualsRepository.get(FkCaseId);
    const companies = await this.companiesRepository.get(FkCaseId);

    const amlKycValidation = await this.amlKycValidationRepository.get(FkCaseId);
    const steps = await this.stepsRepository.get(FkCaseId);
    const introducerDetails = await this.introducerRepository.get(FkCaseId);
    const solicitorDetails = await this.solicitorRepository.get(FkCaseId);
    return { properties, companies, individuals, amlKycValidation, steps, introducerDetails, solicitorDetails };
  }

  async changeStepStatus(
    FkCaseId: number,
    stepName: StepName,
    status: Status,
    prevStatus: Status = EditedStatus
  ): Promise<void> {
    await this.stepsRepository.changeStatus(FkCaseId, stepName, status, prevStatus);
  }

  async changePropertiesStatus(
    FkCaseId: number,
    stepName: StepName,
    status: Status,
    prevStatus: Status = EditedStatus
  ): Promise<void> {
    await this.propertiesRepository.changePropertiesStatus(FkCaseId, stepName, status, prevStatus);
  }

  async changeIndividualsStatus(FkCaseId: number, status: Status, prevStatus: Status = EditedStatus): Promise<void> {
    await this.individualsRepository.changeIndividualsStatus(FkCaseId, status, prevStatus);
  }

  async invalidateAmlKycValidation(FkCaseId: number): Promise<void> {
    await this.amlKycValidationRepository.invalidate(FkCaseId);
  }

  async addProperty(property: CreatePropertyEntity): Promise<number> {
    return this.propertiesRepository.addProperty(property);
  }

  async getProperty(CasePropertyId: number): Promise<Property | undefined> {
    return this.propertiesRepository.getProperty(CasePropertyId);
  }
}
