import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';
import moment from 'moment';
import { ContactsService } from '@v2/modules/admin/contacts/contacts.service';

import { ContactType } from '../types/contact-type/contact-type.interface';
import { AdvanceType } from '../types/advance-type/advance-type.interface';
import { CasesIdentificationService } from '../cases-identification.service';
import { CreateEnquiry } from '../enquiry/enquiry.interface';
import { IntroducerType } from '../types/introducer-type/introducer-type.interface';
import {
  ChangeAdvanceTypeCommand,
  ChangeIntroducerDetailsCommand,
  ChangeIntroducerTypeCommand,
  ChangeContactCommand,
  ChangeBuildingTypeCommand,
  ChangeSecuritiesCommand,
  ChangeLoanDetailsCommand,
  ChangeFinancialDetailsCommand,
  ChangeFinancialCalculatorDetailsCommand,
} from './dip.commands';
import {
  ChangeAdvanceTypeCommandContent,
  ChangeBuildingTypeCommandContent,
  ChangeFinancialCalculatorDetailsCommandContent,
  ChangeFinancialDetailsCommandContent,
  ChangeIntroducerDetailsCommandContent,
  ChangeIntroducerTypeCommandContent,
  ChangeLoanDetailsCommandContent,
  ChangeSecuritiesCommandContent,
  Dip,
  DipDrawdown,
  DipSecurity,
  ChangeDipStepStatus,
  ChangeIntroducerCommandContent,
} from './dip.interface';
import underscoreObject from './utils/underscoreObject';
import { BuildingType } from '../types/building-type/building-type.interface';
import {
  ChangeIndividual,
  ChangeContactCompanyContent,
  ChangeContactIndividualContent,
  ChangeContactCommandContent,
  Applicant,
} from './dip.contact.interface';

export abstract class DipRepositoryInterface {
  abstract getByCaseId(FkCaseId: number): Promise<Dip>;
  abstract create(dip: Dip): Promise<number>;
  abstract updateIntroducerType(FkCaseId: number, introducerType: IntroducerType): Promise<void>;
  abstract update(FkCaseId: number, dip: Partial<Dip>): Promise<void>;
  abstract updateBrokerDetails(FkCaseId: number, details: ChangeIntroducerDetailsCommandContent): Promise<void>;
  abstract updateAdvanceType(FkCaseId: number, advanceType: AdvanceType): Promise<void>;
  abstract updateContactType(FkCaseId: number, contactType: ContactType): Promise<void>;
  abstract updateCompanyContact(FkCaseId: number, details: ChangeContactCompanyContent): Promise<void>;
  abstract updateIndividualContact(FkCaseId: number, details: ChangeContactIndividualContent): Promise<void>;
  abstract updateBuildingType(FkCaseId: number, buildingType: BuildingType): Promise<void>;
  abstract updateSecurities(FkCaseId: number, details: ChangeSecuritiesCommandContent): Promise<void>;
  abstract updateLoanDetails(FkCaseId: number, details: ChangeLoanDetailsCommandContent): Promise<void>;
  abstract updateFinancialDetails(FkCaseId: number, details: ChangeFinancialDetailsCommandContent): Promise<void>;
  abstract updateFinancialCalculatorDetails(
    FkCaseId: number,
    details: ChangeFinancialCalculatorDetailsCommandContent
  ): Promise<void>;

  abstract updateDipStep(FkCaseId: number, details: ChangeDipStepStatus): Promise<void>;
}

const didChange = (newRecord: Record<string, unknown>, existingRecord: Record<string, unknown>) => {
  return Object.entries(newRecord).some(([key, newValue]) => existingRecord[key] != newValue);
};

const didCollectionChange = <RecordType>(didEntryChange: (first: RecordType, second: RecordType) => boolean) => (
  newRecords: Array<RecordType> = [],
  existingRecords: Array<RecordType> = []
) => {
  if (existingRecords.length !== newRecords.length) {
    return true;
  }
  return existingRecords.some((existingRecord, index) => {
    const newRecord = newRecords[index];
    return didEntryChange(newRecord, existingRecord);
  });
};

const didObjectCollectionChange = didCollectionChange(didChange);
const didPrimitiveCollectionChange = didCollectionChange((newEntry, existingEntry) => newEntry != existingEntry);

@Injectable()
export class DipService {
  constructor(
    private readonly dipRepository: DipRepositoryInterface,
    private readonly caseIdentificationService: CasesIdentificationService,
    private readonly contactsService: ContactsService,
    private readonly commandBus: CommandBus
  ) {}

  async getByCaseId(FkCaseId: number): Promise<Dip> {
    const dip = await this.dipRepository.getByCaseId(FkCaseId);
    if (!dip) {
      return dip;
    }
    if (dip.ContactType === 'individual') {
      dip.applicants = await this.getIndividualApplicants(dip.contacts);
    }

    return this.translateToMatchPreviousRequirements(dip);
  }
  private getIndividualApplicants(contacts: ChangeIndividual[]): Promise<Applicant[]> {
    return Promise.all(
      contacts.map(async (dipContact) => {
        const contact = await this.contactsService.getOne(dipContact.FkSharedContactId);

        if (!contact) {
          return (dipContact as unknown) as Applicant;
        }
        return {
          ...contact,
          Email: dipContact.Email,
        };
      })
    );
  }
  private translateToMatchPreviousRequirements(dip: Dip): Dip {
    dip.type_of_loan = dip.LoanType;
    dip.loan_advance_type = dip.AdvanceType;
    dip.build_period = dip.BuildPeriodMonths;
    dip.arrangement_fee_repayment_date = dip.ArrangementFeeRepayment;
    dip.type_of_applicant = dip.ContactType;

    dip.calculator_response = {
      advanced_interest: dip.EstimatedInterest,
      arrangement_fee_in_value: dip.ArrangementFee,
      exit_fee_value: dip.ArrangementFeeRepayment,
      gross_amount_of_first_advance: dip.GrossAmountOfFirstAdvance,
      gross_amount_at_maturity: dip.GrossAmountAtMaturity,
      total_interest: dip.TotalInterest,
      serviced_interest_total: dip.ServicedInterestTotal,
      total_loan_facility_excluding_interest: dip.TotalLoanFacilityExcludingInterest,
      gross_amount_for_ltv: dip.GrossAmountForLtv,
      arrangement_fee_retained_value: dip.ArrangementFeeRetainedValue,
      exit_fee_retained_value: dip.ExitFeeRetainedValue,
      gross_day_one_ltv: dip.GrossDayOneLtv,
      gross_loan: dip.GrossTotalLoanAmount,
      gross_loan_first_advance: dip.GrossLoanFirstAdvance,
      max_total_net_loan_available: dip.MaxTotalNetLoanAvailable,
      net_amount_of_first_advance: dip.InitialNetLoanAmount,
      total_fees: dip.TotalFees,
      total_loan_amount: dip.TotalLoanAmount,
      total_loan_facility: dip.TotalLoanFacility,
      intermediary_commission_fee_value: dip.IntermediaryCommissionFeeValue,
      drawdowns: dip.drawdowns,

      xirr: dip.Xirr,
      repayment_date: dip.RepaymentDate,
      maturity_date: dip.MaturityDate,
      gdltv: dip.Gdltv,
    };
    return underscoreObject(dip) as Dip;
  }

  async createFromEnquiry(caseUuid: string, enquiry: CreateEnquiry): Promise<void> {
    const { CaseId: FkCaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    if (enquiry) {
      await this.create({
        FkCaseId,
        FkOriginatorId: enquiry.FkOriginatorId,
        IntroducerType: 'via_broker',
      });
      await this.changeBrokerDetails(caseUuid, {
        FkBrokerCompanyId: enquiry.FkBrokerCompanyId,
        FkBrokerIndividualId: enquiry.FkBrokerIndividualId,
      });
      await this.changeAdvanceType(caseUuid, {
        AdvanceType: enquiry.BuildPeriod && enquiry.BuildPeriod > 0 ? 'multiple' : 'single',
      });
      await this.changeLoanDetails(caseUuid, {
        LoanType: enquiry.InterestType,
        LoanTerm: enquiry.LoanPeriod,
      });
      await this.changeSecurities(caseUuid, {
        securities: [
          {
            OpflType: 'first_charge',
            SecurityAddressLine1: enquiry.PropertyLocation,
            SecurityType: enquiry.PropertyType,
            SecurityCountry: '',
            SecurityPostcode: '',
            SecurityTownCity: '',
            SecurityInitialEstimation: enquiry.EstimatedSecurityValue,
            Gdv: enquiry.Gdv,
          },
        ],
      });
      await this.changeFinancialDetails(caseUuid, {
        BuildPeriodMonths: enquiry.BuildPeriod,
        FurtherDrawDowns: enquiry.FurtherDrawdownsAmount,
        LtvToGdv: enquiry.MaximumGdltv,
        MaxLtvDayOne: enquiry.MaximumLtv,
      });
      await this.changeFinancialCalculatorDetails(caseUuid, {
        ArrangementFeePercent: enquiry.ArrangementFeeTotal,
        IntermediaryCommissionFeePercent: enquiry.ArrangementFeeBroker,
        InterestRate: enquiry.InterestRate,
        ValueTypeOfArrangementFee: 'percent',
        ValueTypeOfIntermediaryFee: 'percent',
        StartingPoint: enquiry.CalculateMaxFromSecurity ? 'market_value' : 'initial_net_loan_amount',
        NetAmountOfFirstAdvance: enquiry.NetLoanAmount,
      });
    } else {
      await this.create({ FkCaseId });
    }
  }

  async changeIntroducer(
    caseUuid: string,
    content: ChangeIntroducerCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    await this.changeIntroducerType(caseUuid, content, context);
    if (content.IntroducerType === 'via_broker') {
      await this.changeBrokerDetails(
        caseUuid,
        {
          FkBrokerCompanyId: content.FkBrokerCompanyId,
          FkBrokerIndividualId: content.FkBrokerIndividualId,
        },
        context
      );
    }
  }
  async changeIntroducerType(
    caseUuid: string,
    content: ChangeIntroducerTypeCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const { IntroducerType: introducerType, FkOriginatorId: originatorId } = content;
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    const { IntroducerType, FkOriginatorId } = await this.dipRepository.getByCaseId(CaseId);

    if (introducerType !== IntroducerType) {
      if (introducerType !== 'via_broker') {
        await this.changeBrokerDetails(caseUuid, { FkBrokerCompanyId: null, FkBrokerIndividualId: null }, context);
        await this.dipRepository.updateDipStep(CaseId, { Name: 'Introducer details' });

        await this.changeFinancialCalculatorDetails(
          caseUuid,
          {
            IntermediaryCommissionFeeValue: null,
            IntermediaryCommissionFeePercent: null,
          },
          context
        );
      }
      await this.saveNewIntroducer(CaseId, introducerType);
      await this.commandBus.execute(new ChangeIntroducerTypeCommand({ ...content, FkCaseId: CaseId }, context));
    }
    if (originatorId !== FkOriginatorId) {
      await this.saveNewOriginatorId(CaseId, originatorId);
      await this.commandBus.execute(new ChangeIntroducerTypeCommand({ ...content, FkCaseId: CaseId }, context));
    }
  }

  private async saveNewIntroducer(FkCaseId: number, introducerType: IntroducerType) {
    await this.dipRepository.updateIntroducerType(FkCaseId, introducerType);
  }

  private async saveNewOriginatorId(FkCaseId: number, FkOriginatorId: number) {
    if (FkOriginatorId === undefined) {
      FkOriginatorId = null;
    }
    await this.dipRepository.update(FkCaseId, { FkOriginatorId });
  }

  private async create(dip: Dip): Promise<number> {
    const { FkCaseId } = dip;
    const id = await this.dipRepository.create(dip);
    await this.dipRepository.updateDipStep(FkCaseId, { Name: 'DIP Summary' });
    return id;
  }

  async createDip(caseUuid: string): Promise<void> {
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);
    await this.create({ FkCaseId: CaseId });
  }

  async changeBrokerDetails(
    caseUuid: string,
    content: ChangeIntroducerDetailsCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void | Error> {
    const { FkBrokerCompanyId: newBrokerId, FkBrokerIndividualId: newBrokerIndividualId } = content;
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    const { FkBrokerCompanyId, FkBrokerIndividualId } = await this.dipRepository.getByCaseId(CaseId);

    if (FkBrokerCompanyId !== newBrokerId || FkBrokerIndividualId !== newBrokerIndividualId) {
      await this.saveNewBrokerDetails(CaseId, content);
      await this.commandBus.execute(new ChangeIntroducerDetailsCommand({ ...content, FkCaseId: CaseId }, context));
      await this.dipRepository.updateDipStep(CaseId, { Name: 'Introducer details' });
    }
  }

  private async saveNewBrokerDetails(FkCaseId: number, content: ChangeIntroducerDetailsCommandContent) {
    await this.dipRepository.updateBrokerDetails(FkCaseId, content);
  }

  async changeAdvanceType(
    caseUuid: string,
    content: ChangeAdvanceTypeCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const { AdvanceType: advanceType } = content;
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    const { AdvanceType } = await this.dipRepository.getByCaseId(CaseId);

    if (advanceType !== AdvanceType) {
      await this.saveNewAdvanceType(CaseId, advanceType);
      await this.commandBus.execute(new ChangeAdvanceTypeCommand({ ...content, FkCaseId: CaseId }, context));

      await this.dipRepository.updateDipStep(CaseId, { Name: 'Type of Loan' });

      if (advanceType !== 'multiple') {
        await this.dipRepository.updateFinancialCalculatorDetails(CaseId, {
          FurtherAdvances: null,
        });

        await this.dipRepository.updateFinancialDetails(CaseId, {
          FurtherDrawDowns: null,
          LtvToGdv: null,
          BuildPeriodMonths: null,
        });
      }
    }
  }
  private async saveNewAdvanceType(FkCaseId: number, advanceType: AdvanceType) {
    await this.dipRepository.updateAdvanceType(FkCaseId, advanceType);
  }

  async changeContact(
    caseUuid: string,
    content: ChangeContactCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const { ContactType: contactType } = content;
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    const { ContactType: existingContactType } = await this.dipRepository.getByCaseId(CaseId);

    if (contactType !== existingContactType) {
      await this.saveNewContactType(CaseId, contactType);
      await this.commandBus.execute(new ChangeContactCommand({ ...content, FkCaseId: CaseId }, context));
      await this.dipRepository.updateDipStep(CaseId, { Name: 'Type of Applicant' });
    }
    switch (contactType) {
      case 'company': {
        await this.changeCompanyContact(CaseId, content as ChangeContactCompanyContent, context);
        break;
      }
      case 'individual': {
        await this.changeIndividualContact(CaseId, content as ChangeContactIndividualContent, context);
        break;
      }
    }
  }
  private async saveNewContactType(FkCaseId: number, contactType: ContactType) {
    await this.dipRepository.updateContactType(FkCaseId, contactType);
  }
  private async changeCompanyContact(FkCaseId: number, content: ChangeContactCompanyContent, context: CommandContext) {
    const dip = await this.dipRepository.getByCaseId(FkCaseId);
    if (dip.ContactType !== 'company') {
      return;
    }
    const {
      CompanyEmail: existingCompanyEmail,
      CompanyName: existingCompanyName,
      CompanyNumber: existingCompanyNumber,
    } = dip;

    const { CompanyEmail: companyEmail, CompanyName: companyName, CompanyNumber: companyNumber } = content;

    if (
      companyEmail != existingCompanyEmail ||
      companyName != existingCompanyName ||
      companyNumber != existingCompanyNumber
    ) {
      await this.saveNewCompanyContact(FkCaseId, content);
      await this.commandBus.execute(new ChangeContactCommand({ ...content, FkCaseId }, context));
      await this.dipRepository.updateDipStep(FkCaseId, { Name: 'Applicant details' });
    }
  }
  private async saveNewCompanyContact(FkCaseId: number, content: ChangeContactCompanyContent) {
    await this.dipRepository.updateCompanyContact(FkCaseId, content);
  }

  private async changeIndividualContact(
    FkCaseId: number,
    content: ChangeContactIndividualContent,
    context: CommandContext
  ) {
    const { contacts: existingApplicants } = await this.dipRepository.getByCaseId(FkCaseId);
    const { contacts: newApplicants } = content;

    if (this.didApplicantsChange(existingApplicants, newApplicants)) {
      await this.saveNewIndividualContact(FkCaseId, content);
      await this.commandBus.execute(new ChangeContactCommand({ ...content, FkCaseId }, context));
      await this.dipRepository.updateDipStep(FkCaseId, { Name: 'Applicant details' });
    }
  }

  private didApplicantsChange(existingApplicants: ChangeIndividual[] = [], newApplicants: ChangeIndividual[] = []) {
    return didObjectCollectionChange(newApplicants, existingApplicants);
  }
  private async saveNewIndividualContact(FkCaseId: number, content: ChangeContactIndividualContent) {
    await this.dipRepository.updateIndividualContact(FkCaseId, content);
  }

  async changeBuildingType(
    caseUuid: string,
    content: ChangeBuildingTypeCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const { BuildingType: buildingType } = content;
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    const { BuildingType } = await this.dipRepository.getByCaseId(CaseId);

    if (buildingType !== BuildingType) {
      await this.saveNewBuildingType(CaseId, buildingType);
      await this.commandBus.execute(new ChangeBuildingTypeCommand({ ...content, FkCaseId: CaseId }, context));
    }
  }
  private async saveNewBuildingType(FkCaseId: number, buildingType: BuildingType) {
    await this.dipRepository.updateBuildingType(FkCaseId, buildingType);
  }

  async changeSecurities(
    caseUuid: string,
    content: ChangeSecuritiesCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    const { securities: existingSecurities } = await this.dipRepository.getByCaseId(CaseId);
    const { securities } = content;

    const newSecurities = securities.map((security) => ({
      ...security,
      ValueExistingMortgage: security.OpflType === 'first_charge' ? null : security.ValueExistingMortgage,
    }));
    if (this.didSecuritiesChange(existingSecurities, newSecurities)) {
      const newContent = { ...content, securities: newSecurities };
      await this.saveNewSecurities(CaseId, newContent);
      await this.commandBus.execute(new ChangeSecuritiesCommand({ ...newContent, FkCaseId: CaseId }, context));
      await this.dipRepository.updateDipStep(CaseId, { Name: 'Security details' });
    }
  }

  private didSecuritiesChange(existingSecurities: DipSecurity[] = [], newSecurities: DipSecurity[] = []) {
    return didObjectCollectionChange(newSecurities, existingSecurities);
  }

  private async saveNewSecurities(FkCaseId: number, content: ChangeSecuritiesCommandContent) {
    await this.dipRepository.updateSecurities(FkCaseId, content);
  }

  async changeLoanDetails(
    caseUuid: string,
    content: ChangeLoanDetailsCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    const dip = await this.dipRepository.getByCaseId(CaseId);

    if (didChange(content, dip)) {
      await this.saveNewLoanDetails(CaseId, content);
      await this.commandBus.execute(new ChangeLoanDetailsCommand({ ...content, FkCaseId: CaseId }, context));
      await this.dipRepository.updateDipStep(CaseId, { Name: 'Loan details' });
    }
  }
  private async saveNewLoanDetails(FkCaseId: number, content: ChangeLoanDetailsCommandContent) {
    await this.dipRepository.updateLoanDetails(FkCaseId, content);
  }

  async changeFinancialDetails(
    caseUuid: string,
    content: ChangeFinancialDetailsCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    const dip = await this.dipRepository.getByCaseId(CaseId);

    if (content.BuildPeriodMonths === undefined) {
      content.BuildPeriodMonths = null;
    }
    if (content.FurtherDrawDowns === undefined) {
      content.FurtherDrawDowns = null;
    }
    if (content.LtvToGdv === undefined) {
      content.LtvToGdv = null;
    }
    if (content.PurchasePrice === undefined) {
      content.PurchasePrice = null;
    }

    if (didChange(content, dip)) {
      await this.saveNewFinancialDetails(CaseId, content);
      await this.commandBus.execute(new ChangeFinancialDetailsCommand({ ...content, FkCaseId: CaseId }, context));
      await this.dipRepository.updateDipStep(CaseId, { Name: 'Financial details' });
    }
  }
  private async saveNewFinancialDetails(FkCaseId: number, content: ChangeFinancialDetailsCommandContent) {
    await this.dipRepository.updateFinancialDetails(FkCaseId, content);
  }

  async changeFinancialCalculatorDetails(
    caseUuid: string,
    content: ChangeFinancialCalculatorDetailsCommandContent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    const dip = await this.dipRepository.getByCaseId(CaseId);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { drawdowns, ...rest } = content;

    if (content.drawdowns === undefined) {
      content.drawdowns = [];
    }
    if (this.didFinancialCalculatorDetailsChanged(content.drawdowns, rest, dip)) {
      await this.saveNewFinancialCalculatorDetails(CaseId, content);
      await this.commandBus.execute(
        new ChangeFinancialCalculatorDetailsCommand({ ...content, FkCaseId: CaseId }, context)
      );
      await this.dipRepository.updateDipStep(CaseId, { Name: 'Financial details - Summary' });
    }
  }
  private didFinancialCalculatorDetailsChanged(
    drawdowns: DipDrawdown[],
    rest: Omit<ChangeFinancialCalculatorDetailsCommandContent, 'drawdowns'>,
    dip: Dip
  ) {
    const didDrawdownsChanged = didObjectCollectionChange(
      ((drawdowns as unknown) as Record<string, unknown>[]) ?? [],
      ((dip.drawdowns as unknown) as Record<string, unknown>[]) ?? []
    );
    dip.StartDate = dip.StartDate ? moment(dip.StartDate).format('YYYY-MM-DD') : dip.StartDate;

    const { furtherAdvances, ...withoutFurtherAdvances } = rest;
    const didFurtherAdvancesChanged = didPrimitiveCollectionChange(
      ((furtherAdvances as unknown) as number[]) ?? [],
      ((dip.furtherAdvances as unknown) as number[]) ?? []
    );
    const didDetailsChanged = didChange((withoutFurtherAdvances as unknown) as Record<string, unknown>, dip);

    return didDetailsChanged || didDrawdownsChanged || didFurtherAdvancesChanged;
  }
  private async saveNewFinancialCalculatorDetails(
    FkCaseId: number,
    content: ChangeFinancialCalculatorDetailsCommandContent
  ) {
    await this.dipRepository.updateFinancialCalculatorDetails(FkCaseId, content);
  }
}
