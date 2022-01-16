import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';
import Knex from 'knex';
import moment from 'moment';

import { AdvanceType } from '../types/advance-type/advance-type.interface';
import { BuildingType } from '../types/building-type/building-type.interface';
import { ContactType } from '../types/contact-type/contact-type.interface';
import { IntroducerType } from '../types/introducer-type/introducer-type.interface';
import { LoanType } from '../types/loan-type/loan-type.interface';
import {
  ChangeDipStepStatus,
  ChangeFinancialCalculatorDetailsCommandContent,
  ChangeFinancialDetailsCommandContent,
  ChangeIntroducerDetailsCommandContent,
  ChangeLoanDetailsCommandContent,
  ChangeSecuritiesCommandContent,
  Dip,
  DipDrawdown,
  DipStep,
  OpflChargeType,
} from './dip.interface';
import { ChangeContactCompanyContent, ChangeContactIndividualContent } from './dip.contact.interface';
import { DipRepositoryInterface } from './dip.service';

type FinancialDetailsMulti = Pick<Dip, 'FurtherDrawDowns'>;

type FinancialDetailsDev = Pick<Dip, 'LtvToGdv'>;

type LoanPropertyDevelopment = Pick<Dip, 'BuildPeriodMonths'>;

type FinancialDetails = Partial<
  Omit<ChangeLoanDetailsCommandContent, 'LoanType' | 'FkCaseId'> &
    Omit<
      ChangeFinancialDetailsCommandContent,
      keyof (FinancialDetailsDev | FinancialDetailsMulti | LoanPropertyDevelopment)
    > &
    Omit<ChangeFinancialCalculatorDetailsCommandContent, 'drawdowns'> &
    Pick<Dip, 'FkLoanFinancialDetailsMultiId' | 'FkLoanFinancialDetailsDevId' | 'FkLoanPropertyDevelopmentId'>
>;

@Injectable()
export class DipRepository extends DipRepositoryInterface {
  private dipTable = 'Origination.Dip';
  private dipFinancialDetailsTable = `${this.dipTable}LoanFinancialDetails`;
  private dipFinancialDetailsDrawdownsTable = `${this.dipTable}LoanFinancialDrawDowns`;
  private dipSecurityMappingTable = `${this.dipTable}SecurityDipMapping`;
  private dipSecurityTable = `${this.dipTable}Security`;
  private dipLoanTypeTable = `${this.dipTable}LoanType`;
  private dipLoanAdvanceTypeTable = `${this.dipTable}LoanAdvanceType`;
  private dipBuildingTypeTable = `${this.dipTable}BuildingType`;
  private dipFinancialDetailsDevTable = `${this.dipTable}LoanFinancialDetailsDev`;
  private dipFinancialDetailsMultiTable = `${this.dipTable}LoanFinancialDetailsMulti`;
  private dipFinancialDetailsHybridTable = `${this.dipTable}LoanFinancialHybridTerms`;
  private dipPropertyDevTable = `${this.dipTable}LoanPropertyDevelopment`;
  private dipBrokerTable = `${this.dipTable}Broker`;
  private dipIntroducerTypeTable = `${this.dipTable}IntroducerType`;
  private dipOpflTypeTable = `${this.dipTable}OpflType`;

  private dipContactTable = `${this.dipTable}Contact`;
  private dipContactValueTable = `${this.dipTable}ContactValue`;
  private dipContactTypeTable = `${this.dipTable}ContactType`;
  private dipCompanyTable = `${this.dipTable}Company`;
  private dipStepTable = `${this.dipTable}Steps`;

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async getByCaseId(FkCaseId: number): Promise<Dip> {
    const [matchingDip] = await this.knex(this.dipTable)
      .select<Dip[]>()
      .where({ FkCaseId })
      .leftJoin(
        this.dipFinancialDetailsTable,
        `${this.dipTable}.FkLoanFinancialDetailsId`,
        `${this.dipFinancialDetailsTable}.LoanFinancialDetailsId`
      )
      .leftJoin(
        this.dipFinancialDetailsMultiTable,
        `${this.dipFinancialDetailsTable}.FkLoanFinancialDetailsMultiId`,
        `${this.dipFinancialDetailsMultiTable}.LoanFinancialDetailsMultiId`
      )
      .leftJoin(
        this.dipFinancialDetailsDevTable,
        `${this.dipFinancialDetailsTable}.FkLoanFinancialDetailsDevId`,
        `${this.dipFinancialDetailsDevTable}.LoanFinancialDetailsDevId`
      )
      .leftJoin(
        this.dipPropertyDevTable,
        `${this.dipTable}.FkLoanPropertyDevelopmentId`,
        `${this.dipPropertyDevTable}.LoanPropertyDevelopmentId`
      )
      .leftJoin(this.dipLoanTypeTable, `${this.dipTable}.FkTypeOfLoanId`, `${this.dipLoanTypeTable}.LoanTypeId`)
      .leftJoin(
        this.dipLoanAdvanceTypeTable,
        `${this.dipTable}.FkLoanAdvanceTypeId`,
        `${this.dipLoanAdvanceTypeTable}.LoanAdvanceTypeId`
      )
      .leftJoin(
        this.dipBuildingTypeTable,
        `${this.dipTable}.FkBuildingTypeId`,
        `${this.dipBuildingTypeTable}.BuildingTypeId`
      )
      .leftJoin(this.dipContactTable, `${this.dipTable}.FkContactId`, `${this.dipContactTable}.ContactId`)
      .leftJoin(
        this.dipIntroducerTypeTable,
        `${this.dipTable}.FkIntroducerId`,
        `${this.dipIntroducerTypeTable}.IntroducerId`
      )

      .leftJoin(this.dipBrokerTable, `${this.dipTable}.FkBrokerId`, `${this.dipBrokerTable}.BrokerId`)
      .leftJoin(
        this.dipContactTypeTable,
        `${this.dipContactTable}.FkContactTypeId`,
        `${this.dipContactTypeTable}.ContactTypeId`
      );

    if (!matchingDip) {
      return matchingDip;
    }
    const { DipId, FkLoanFinancialDetailsId, FkContactId } = matchingDip;
    matchingDip.securities = await this.getSecurities(DipId);
    matchingDip.steps = await this.getSteps(DipId);

    matchingDip.drawdowns = await this.getDrawdowns(FkLoanFinancialDetailsId);
    matchingDip.contacts = await this.getContacts(FkContactId);
    matchingDip.StartDate = matchingDip.StartDate ? moment(matchingDip.StartDate).toISOString() : null;
    matchingDip.furtherAdvances = matchingDip.FurtherAdvances ? JSON.parse(matchingDip.FurtherAdvances) : null;

    if (matchingDip.ContactType === 'company') {
      const companyContact = matchingDip.contacts[0] || { Email: '' };

      const company = await this.getCompany(FkContactId);
      matchingDip.CompanyEmail = companyContact.Email || null;
      matchingDip.CompanyName = company?.Name;
      matchingDip.CompanyNumber = company?.CompanyNumber;
    }
    return matchingDip;
  }

  private async getSecurities(FkDipId: number) {
    return this.knex(this.dipSecurityMappingTable)
      .leftJoin(
        this.dipSecurityTable,
        `${this.dipSecurityMappingTable}.FkSecurityId`,
        `${this.dipSecurityTable}.SecurityId`
      )
      .leftJoin(this.dipOpflTypeTable, `${this.dipSecurityTable}.FkOpflTypeId`, `${this.dipOpflTypeTable}.OpflTypeId`)
      .where({ FkDipId });
  }

  private async getSteps(FkDipId: number) {
    return this.knex(this.dipStepTable).select<DipStep[]>().where({ FkDipId });
  }

  private async getContacts(FkContactId: number) {
    return this.knex(this.dipContactTable)
      .leftJoin(
        this.dipContactValueTable,
        `${this.dipContactValueTable}.FkContactId`,
        `${this.dipContactTable}.ContactId`
      )
      .leftJoin(
        this.dipContactTypeTable,
        `${this.dipContactTable}.FkContactTypeId`,
        `${this.dipContactTypeTable}.ContactTypeId`
      )
      .where({ FkContactId });
  }

  private async getCompany(FkContactId: number) {
    return (
      await this.knex(this.dipContactValueTable)
        .select(`${this.dipCompanyTable}.*`)
        .leftJoin(this.dipCompanyTable, `${this.dipContactValueTable}.FkCompanyId`, `${this.dipCompanyTable}.CompanyId`)
        .where({ FkContactId })
    )[0];
  }

  private async getDrawdowns(FkLoanFinancialDetailsId: number) {
    return this.knex(this.dipFinancialDetailsDrawdownsTable).where({ FkLoanFinancialDetailsId });
  }

  private async getIntroducerTypeId(IntroducerType: IntroducerType) {
    return this.knex(this.dipIntroducerTypeTable).select('IntroducerId').where({ IntroducerType });
  }

  private async getAdvanceTypeId(AdvanceType: AdvanceType) {
    return this.knex(this.dipLoanAdvanceTypeTable).select('LoanAdvanceTypeId').where({ AdvanceType });
  }

  private async getBuildingTypeId(BuildingType: BuildingType) {
    return this.knex(this.dipBuildingTypeTable).select('BuildingTypeId').where({ BuildingType });
  }

  private async getContactTypeId(ContactType: ContactType) {
    return this.knex(this.dipContactTypeTable).select('ContactTypeId').where({ ContactType });
  }

  private async getOpflTypeId(OpflType: OpflChargeType) {
    return this.knex(this.dipOpflTypeTable).select('OpflTypeId').where({ OpflType });
  }

  private async getLoanTypeId(LoanType: LoanType) {
    return this.knex(this.dipLoanTypeTable).select('LoanTypeId').where({ LoanType });
  }
  async create(dip: Dip): Promise<number> {
    const { BrokerName, IntroducerType, ...restDip } = dip;

    const Id = await this.knex.transaction(async (trx) => {
      let FkBrokerId = undefined;
      if (IntroducerType === 'via_broker') {
        [FkBrokerId] = await trx(this.dipBrokerTable).insert({ BrokerName }, ['BrokerId']);
      }

      let FkIntroducerId = undefined;
      if (IntroducerType) {
        [{ IntroducerId: FkIntroducerId = undefined } = {}] = await this.getIntroducerTypeId(IntroducerType);
      }

      const [FkContactId] = await trx(this.dipContactTable).insert({}, ['ContactId']);

      const [FkLoanPropertyDevelopmentId] = await trx(this.dipPropertyDevTable).insert({}, [
        'LoanPropertyDevelopmentId',
      ]);

      const [FkLoanFinancialDetailsId] = await this.createFinancialDetails(trx);

      const [Id] = await trx(this.dipTable).insert(
        { ...restDip, FkIntroducerId, FkBrokerId, FkContactId, FkLoanFinancialDetailsId, FkLoanPropertyDevelopmentId },
        'DipId'
      );
      return Id;
    });
    return Id;
  }

  async update(FkCaseId: number, dip: Partial<Dip>): Promise<void> {
    await this.knex(this.dipTable).update(dip).where({ FkCaseId });
  }
  async updateIntroducerType(FkCaseId: number, introducerType: IntroducerType): Promise<void> {
    const [{ IntroducerId: FkIntroducerId = undefined } = {}] = await this.getIntroducerTypeId(introducerType);

    await this.update(FkCaseId, { FkIntroducerId });
  }

  async updateCompanyContact(FkCaseId: number, details: ChangeContactCompanyContent): Promise<void> {
    const { FkContactId } = await this.getByCaseId(FkCaseId);

    const { CompanyEmail, CompanyName, CompanyNumber } = details;
    const company = await this.getCompany(FkContactId);
    let CompanyId;
    if (company) {
      CompanyId = company.CompanyId;
      await this.knex(this.dipCompanyTable).update({ CompanyNumber, Name: CompanyName }).where({ CompanyId });
    } else {
      CompanyId = (await this.knex(this.dipCompanyTable).insert({ CompanyNumber, Name: CompanyName }, 'CompanyId'))[0];
    }
    await this.knex(this.dipContactValueTable).delete().where({ FkContactId });
    await this.knex(this.dipContactValueTable).insert({ Email: CompanyEmail, FkCompanyId: CompanyId, FkContactId });
  }

  async updateContactType(FkCaseId: number, contactType: ContactType): Promise<void> {
    const [{ ContactTypeId: FkContactTypeId = undefined } = {}] = await this.getContactTypeId(contactType);

    await this.updateContact(FkCaseId, { FkContactTypeId });
  }

  private async updateContact(
    FkCaseId: number,
    details: { FkContactTypeId?: number; FkCompanyContactId?: number }
  ): Promise<void> {
    const { FkContactId } = await this.getByCaseId(FkCaseId);
    await this.knex(this.dipContactTable).update(details).where({ ContactId: FkContactId });
  }

  async updateIndividualContact(FkCaseId: number, details: ChangeContactIndividualContent): Promise<void> {
    const { FkContactId } = await this.getByCaseId(FkCaseId);

    const { contacts } = details;
    const toSave = contacts.map((contact) => ({ ...contact, FkContactId }));
    await this.knex(this.dipContactValueTable).delete().where({ FkContactId });
    await this.knex(this.dipContactValueTable).insert(toSave);
  }
  async updateAdvanceType(FkCaseId: number, advanceType: AdvanceType): Promise<void> {
    const [{ LoanAdvanceTypeId: FkLoanAdvanceTypeId = undefined } = {}] = await this.getAdvanceTypeId(advanceType);

    await this.update(FkCaseId, { FkLoanAdvanceTypeId });
  }

  async updateBuildingType(FkCaseId: number, buildingType: BuildingType): Promise<void> {
    const [{ BuildingTypeId: FkBuildingTypeId = undefined } = {}] = await this.getBuildingTypeId(buildingType);

    await this.update(FkCaseId, { FkBuildingTypeId });
  }

  async updateBrokerDetails(FkCaseId: number, details: ChangeIntroducerDetailsCommandContent): Promise<void> {
    const { FkBrokerId: BrokerId } = await this.getByCaseId(FkCaseId);

    delete details.FkCaseId;
    if (BrokerId) {
      await this.knex(this.dipBrokerTable).update(details).where({ BrokerId });
    } else {
      const [newBrokerId] = await this.knex(this.dipBrokerTable).insert(details, 'BrokerId');

      await this.update(FkCaseId, { FkBrokerId: newBrokerId });
    }
  }

  async updateSecurities(FkCaseId: number, details: ChangeSecuritiesCommandContent): Promise<void> {
    const { DipId: FkDipId } = await this.getByCaseId(FkCaseId);

    await this.knex(this.dipSecurityMappingTable).delete().where({ FkDipId });

    const { securities } = details;
    for (const security of securities) {
      const [{ OpflTypeId: FkOpflTypeId = undefined } = {}] = await this.getOpflTypeId(security.OpflType);

      delete security.OpflType;
      const toSave = { ...security, FkOpflTypeId };
      const [FkSecurityId] = await this.knex(this.dipSecurityTable).insert(toSave, 'SecurityId');
      await this.knex(this.dipSecurityMappingTable).insert({ FkDipId, FkSecurityId });
    }
  }

  async updateLoanDetails(FkCaseId: number, details: ChangeLoanDetailsCommandContent): Promise<void> {
    const { FkLoanFinancialDetailsId } = await this.getByCaseId(FkCaseId);

    delete details.FkCaseId;

    await this.updateLoanType(FkCaseId, details.LoanType);
    delete details.LoanType;

    await this.updateFinancialDetailsTable(FkCaseId, FkLoanFinancialDetailsId, details);
  }

  private async updateFinancialDetailsTable(
    FkCaseId: number,
    LoanFinancialDetailsId: number,
    financialDetails: FinancialDetails
  ) {
    if (LoanFinancialDetailsId) {
      await this.knex(this.dipFinancialDetailsTable).update(financialDetails).where({ LoanFinancialDetailsId });
    } else {
      const [newLoanFinancialDetailsId] = await this.knex(this.dipFinancialDetailsTable).insert(
        financialDetails,
        'LoanFinancialDetailsId'
      );

      await this.update(FkCaseId, { FkLoanFinancialDetailsId: newLoanFinancialDetailsId });
    }
  }

  private async updateLoanType(FkCaseId: number, loanType: LoanType) {
    const [{ LoanTypeId: FkTypeOfLoanId = undefined } = {}] = await this.getLoanTypeId(loanType);

    await this.update(FkCaseId, { FkTypeOfLoanId });
  }

  async updateFinancialDetails(FkCaseId: number, details: ChangeFinancialDetailsCommandContent): Promise<void> {
    const { FkLoanFinancialDetailsId } = await this.getByCaseId(FkCaseId);

    const devPropertyDetails = {
      BuildPeriodMonths: details.BuildPeriodMonths,
    };

    const financialDetails = {
      PurchasePrice: details.PurchasePrice,
      MaxLtvDayOne: details.MaxLtvDayOne,
    };

    const multiDetails = {
      FurtherDrawDowns: details.FurtherDrawDowns,
    };

    const devDetails = {
      LtvToGdv: details.LtvToGdv,
    };

    if (details.MaxLtvDayOne !== undefined || FkLoanFinancialDetailsId === undefined) {
      await this.updateFinancialDetailsTable(FkCaseId, FkLoanFinancialDetailsId, financialDetails);
    }

    const {
      FkLoanFinancialDetailsId: LoanFinancialDetailsId,
      FkLoanFinancialDetailsMultiId,
      FkLoanFinancialDetailsDevId,
      FkLoanPropertyDevelopmentId,
    } = await this.getByCaseId(FkCaseId);
    await this.updateFinancialMultiDetails(
      FkCaseId,
      LoanFinancialDetailsId,
      FkLoanFinancialDetailsMultiId,
      multiDetails
    );
    await this.updateFinancialDevDetails(FkCaseId, LoanFinancialDetailsId, FkLoanFinancialDetailsDevId, devDetails);

    await this.updatePropertyDev(FkCaseId, FkLoanPropertyDevelopmentId, devPropertyDetails);
  }

  private async updateFinancialMultiDetails(
    FkCaseId: number,
    LoanFinancialDetailsId: number,
    LoanFinancialDetailsMultiId: number,
    details: FinancialDetailsMulti
  ) {
    if (LoanFinancialDetailsMultiId) {
      await this.knex(this.dipFinancialDetailsMultiTable).update(details).where({ LoanFinancialDetailsMultiId });
    } else {
      const [newId] = await this.knex(this.dipFinancialDetailsTable).insert(details, 'LoanFinancialDetailsMultiId');

      await this.updateFinancialDetailsTable(FkCaseId, LoanFinancialDetailsId, {
        FkLoanFinancialDetailsMultiId: newId,
      });
    }
  }

  private async updateFinancialDevDetails(
    FkCaseId: number,
    LoanFinancialDetailsId: number,
    LoanFinancialDetailsDevId: number,
    details: FinancialDetailsDev
  ) {
    const table = this.dipFinancialDetailsDevTable;
    if (LoanFinancialDetailsDevId) {
      await this.knex(table).update(details).where({ LoanFinancialDetailsDevId });
    } else {
      const [newId] = await this.knex(table).insert(details, 'LoanFinancialDetailsMultiId');

      await this.updateFinancialDetailsTable(FkCaseId, LoanFinancialDetailsId, {
        FkLoanFinancialDetailsMultiId: newId,
      });
    }
  }

  private async updatePropertyDev(
    FkCaseId: number,
    LoanPropertyDevelopmentId: number,
    details: LoanPropertyDevelopment
  ) {
    const table = this.dipPropertyDevTable;

    if (LoanPropertyDevelopmentId) {
      await this.knex(table).update(details).where({ LoanPropertyDevelopmentId });
    } else {
      const [newId] = await this.knex(table).insert(details, 'LoanPropertyDevelopmentId');

      await this.update(FkCaseId, { FkLoanPropertyDevelopmentId: newId });
    }
  }

  async updateFinancialCalculatorDetails(
    FkCaseId: number,
    details: ChangeFinancialCalculatorDetailsCommandContent
  ): Promise<void> {
    const { FkLoanFinancialDetailsId } = await this.getByCaseId(FkCaseId);

    const { drawdowns, furtherAdvances, AdvancedInterest, NetAmountOfFirstAdvance, ...rest } = details;

    if (furtherAdvances) {
      rest.FurtherAdvances = JSON.stringify(furtherAdvances);
    }
    rest.EstimatedInterest = AdvancedInterest;
    rest.InitialNetLoanAmount = NetAmountOfFirstAdvance;
    await this.updateFinancialDetailsTable(FkCaseId, FkLoanFinancialDetailsId, rest);

    const { FkLoanFinancialDetailsId: LoanFinancialDetailsId } = await this.getByCaseId(FkCaseId);

    if (drawdowns) {
      await this.updateDrawdowns(LoanFinancialDetailsId, drawdowns);
    }
  }

  private async updateDrawdowns(FkLoanFinancialDetailsId: number, drawdowns: DipDrawdown[]) {
    const toSave = drawdowns.map((drawdown) => ({ FkLoanFinancialDetailsId, ...drawdown }));
    await this.knex(this.dipFinancialDetailsDrawdownsTable).delete().where({ FkLoanFinancialDetailsId });
    await this.knex(this.dipFinancialDetailsDrawdownsTable).insert(toSave);
  }

  async clearBrokerDetails(FkCaseId: number): Promise<void> {
    await this.update(FkCaseId, { FkBrokerId: null });
  }

  private async createFinancialDetails(trx: Knex.Transaction) {
    const [FkLoanFinancialDetailsMultiId] = await trx(this.dipFinancialDetailsMultiTable).insert({}, [
      'LoanFinancialDetailsMultiId',
    ]);
    const [FkLoanFinancialDetailsDevId] = await trx(this.dipFinancialDetailsDevTable).insert({}, [
      'LoanFinancialDetailsDevId',
    ]);

    const [FkHybridTerms] = await trx(this.dipFinancialDetailsHybridTable).insert({}, ['LoanFinancialHybridTermsId']);

    return await trx(this.dipFinancialDetailsTable).insert(
      {
        FkLoanFinancialDetailsDevId,
        FkHybridTerms,
        FkLoanFinancialDetailsMultiId,
      },
      ['LoanFinancialDetailsId']
    );
  }

  async updateDipStep(FkCaseId: number, { Name, EditedDate = new Date() }: ChangeDipStepStatus): Promise<void> {
    const [{ DipId }] = await this.knex(this.dipTable).select<Dip[]>().where({ FkCaseId });

    const [existing] = await this.knex(this.dipStepTable).select().where({ Name, FkDipId: DipId });

    if (existing) {
      await this.knex(this.dipStepTable).update({ EditedDate }).where({ DipStepId: existing.DipStepId });
    } else {
      await this.knex(this.dipStepTable).insert({ Name, EditedDate, FkDipId: DipId });
    }
  }
}
