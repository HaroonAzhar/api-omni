import { Injectable } from '@nestjs/common';
import { CommandContext } from '@v2/utils/commands';
import moment, { Moment } from 'moment';

import { ApplicationService } from '../application/application.service';
import { Dip } from '../dip/dip.interface';
import { DipService } from '../dip/dip.service';
import { AdjustmentsService } from './adjustments/adjustments.service';
import { CompletedIdentificationService } from './completed-identification.service';
import { Completed, CompletedStatus, CreateCompleted } from './completed.interface';
import { DefaultEventsService } from './default-events/default-events.service';
import { ExtensionsService } from './extensions/extensions.service';
import { FurtherDrawdownsService } from './further-drawdowns/further-drawdowns.service';
import { ManualStatusesService } from './manual-statuses/manual-statuses.service';
import { CashflowsService } from './cashflows/cashflows.service';
import { SecuritiesService } from './securities/securities.service';
import { WaypointsService } from './waypoints/waypoints.service';
import { EstimatedRedemptionsService } from './estimated-redemptions/estimated-redemptions.service';
import { ExpectedDrawdownsService } from './expected-drawdowns/expected-drawdowns.service';

export abstract class CompletedRepositoryInterface {
  abstract getByCaseId(FkCaseId: number): Promise<Completed>;
  abstract create(completed: Completed): Promise<number>;
  abstract update(completed: Partial<Completed>): Promise<void>;
}
@Injectable()
export class CompletedService {
  constructor(
    private readonly completedRepository: CompletedRepositoryInterface,
    private readonly dipService: DipService,
    private readonly waypointsService: WaypointsService,
    private readonly completedIdentificationService: CompletedIdentificationService,
    private readonly extensionsService: ExtensionsService,
    private readonly defaultEventsService: DefaultEventsService,
    private readonly manualStatusesService: ManualStatusesService,
    private readonly applicationService: ApplicationService,
    private readonly securitiesService: SecuritiesService,
    private readonly furtherDrawdownsService: FurtherDrawdownsService,
    private readonly cashflowsService: CashflowsService,
    private readonly adjustmentsService: AdjustmentsService,
    private readonly estimatedRedemptionService: EstimatedRedemptionsService,
    private readonly expectedDrawdownsService: ExpectedDrawdownsService
  ) {}

  static maturityDateFromCompletionDate(dateOfCompletion: string, loanTerm: number): Moment {
    return moment(dateOfCompletion, moment.HTML5_FMT.DATE).add(loanTerm, 'M').subtract(1, 'day');
  }
  private async getRawMaturityDate(completed: Completed) {
    const dip = await this.dipService.getByCaseId(completed.FkCaseId);
    if (!dip) {
      return undefined;
    }
    const { LoanTerm = 0 } = dip;
    return CompletedService.maturityDateFromCompletionDate(completed.DateOfCompletion, LoanTerm);
  }
  async getMaturityDate(completed: Completed): Promise<string | undefined> {
    const maturityDate = await this.getRawMaturityDate(completed);
    return maturityDate ? maturityDate.format(moment.HTML5_FMT.DATE) : undefined;
  }

  private async addCompleted(completed: Completed) {
    const existingCompleted = await this.completedIdentificationService.getByCaseId(completed.FkCaseId);
    completed.DateOfMaturity = await this.getMaturityDate(completed);
    if (existingCompleted) {
      return await this.update(completed);
    }
    return this.createNewCompleted(completed);
  }

  async createCompleted(
    createCompleted: CreateCompleted,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<number | void> {
    const id = await this.addCompleted({
      DateOfCompletion: createCompleted.DateOfCompletion,
      FkCaseId: createCompleted.FkCaseId,
    });
    await this.addAutomaticWaypoints(createCompleted);
    await this.addCompletedSecurities(createCompleted, context);
    await this.addEstimatedRedemption(createCompleted, context);
    await this.addExpectedDrawdowns(createCompleted, context);

    return id;
  }

  async addCompletedSecurities(
    createCompleted: CreateCompleted,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<number[]> {
    const existingCompleted = await this.completedIdentificationService.getByCaseId(createCompleted.FkCaseId);

    const application = await this.applicationService.getByCaseId(createCompleted.FkCaseId);
    if (application === undefined) {
      return [];
    }
    return Promise.all(
      application.properties.map(async (property) =>
        this.securitiesService.createSecurity(
          {
            FkCompletedId: existingCompleted.CompletedId,
            FkCasePropertyId: property.CasePropertyId,
          },
          {
            GDV: property.valuationReport?.Gdv ?? 0,
            Valuation: property.valuationReport?.MarketValue ?? 0,
            ReportDate: property.valuationReport?.ReportDate ?? '',
            ValuationType: `Full Valuation`,
            ValuationDate: property.valuationReport?.InspectionDate ?? '',
            Valuer: `${property.valuationReport?.Surveyor ?? ''} ${
              property.valuationReport?.NameOfTheIndividualSurveyor ?? ''
            }`,
            RecipientName: '',
            CreatedBy: context.User,
            FkPropertyValuationReportId: property.valuationReport?.PropertyValuationReportId,
          },
          context
        )
      )
    );
  }

  async addEstimatedRedemption(
    createCompleted: CreateCompleted,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<number> {
    const existingCompleted = await this.completedIdentificationService.getByCaseId(createCompleted.FkCaseId);

    if (existingCompleted.DateOfMaturity) {
      return this.estimatedRedemptionService.create(
        existingCompleted.CompletedId,
        { Date: existingCompleted.DateOfMaturity, CreatedBy: context.User },
        context
      );
    }
  }

  async addExpectedDrawdowns(
    createCompleted: CreateCompleted,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<number[]> {
    const existingCompleted = await this.completedIdentificationService.getByCaseId(createCompleted.FkCaseId);

    const dip = await this.dipService.getByCaseId(createCompleted.FkCaseId);
    if (dip?.AdvanceType !== 'multiple') {
      return [];
    }
    const existingExpectedDrawdowns = await this.expectedDrawdownsService.getForCompletedId(
      existingCompleted.CompletedId
    );
    if (existingExpectedDrawdowns.length > 0) {
      return [];
    }
    const drawdownsToSave = dip.drawdowns.slice(1).filter((drawdown) => drawdown.Advance > 0);
    return Promise.all(
      drawdownsToSave.map(async (drawdown) => {
        return this.expectedDrawdownsService.create(
          existingCompleted.CompletedId,
          {
            Amount: drawdown.Advance,
            Date: moment(drawdown.Date, 'DD/MM/YYYY').format(moment.HTML5_FMT.DATE),
            CreatedBy: context.User,
          },
          context
        );
      })
    );
  }

  async addAutomaticWaypoints(createCompleted: CreateCompleted): Promise<void> {
    const existingCompleted = await this.completedIdentificationService.getByCaseId(createCompleted.FkCaseId);
    if (createCompleted.AddWaypointForRedemptionDueDate) {
      const defaultRedemptionDueDate = await this.getMaturityDate(createCompleted);
      this.waypointsService.createWaypoint(
        existingCompleted.CompletedId,
        {
          Name: 'Redemption Due Date',
          DueDate: createCompleted.AddWaypointForRedemptionDueDateDate || defaultRedemptionDueDate,
          Category: '',
          IsCompleted: false,
        },
        'not_recurring'
      );
    }
    if (createCompleted.AddWaypointForReviewExitStrategy) {
      const reviewExitStrategyDate = (await this.getRawMaturityDate(createCompleted))
        .add(-1, 'M')
        .format(moment.HTML5_FMT.DATE);
      this.waypointsService.createWaypoint(
        existingCompleted.CompletedId,
        {
          Name: 'Review Exit Strategy',
          DueDate: createCompleted.AddWaypointForReviewExitStrategyDate || reviewExitStrategyDate,
          Category: '',
          IsCompleted: false,
        },
        'not_recurring'
      );
    }
    if (createCompleted.AddWaypointForSendStandingOrderInstruction) {
      const sendStandingOrderInstructionDate = moment(existingCompleted.DateOfCompletion)
        .add(1, 'week')
        .format(moment.HTML5_FMT.DATE);
      this.waypointsService.createWaypoint(
        existingCompleted.CompletedId,
        {
          Name: 'Send Standing Order Instruction',
          DueDate: createCompleted.AddWaypointForSendStandingOrderInstructionDate || sendStandingOrderInstructionDate,
          Category: '',
          IsCompleted: false,
        },
        'not_recurring'
      );
    }
    if (createCompleted.AddWaypointForServicedInterestPaymentDue) {
      const sendStandingOrderInstructionDate = moment(existingCompleted.DateOfCompletion)
        .add(1, 'M')
        .format(moment.HTML5_FMT.DATE);
      const dip = await this.dipService.getByCaseId(existingCompleted.FkCaseId);
      const numberOfPayments = dip ? dip.LoanTerm : 0;
      this.waypointsService.createWaypoint(
        existingCompleted.CompletedId,
        {
          Name: 'Serviced Interest Payment Due',
          DueDate: createCompleted.AddWaypointForServicedInterestPaymentDueDate || sendStandingOrderInstructionDate,
          Category: '',
          IsCompleted: false,
        },
        'monthly',
        numberOfPayments
      );
    }
  }
  private async update(completed: Partial<Completed>) {
    return this.completedRepository.update(completed);
  }
  private async createNewCompleted(completed: Completed) {
    return await this.completedRepository.create(completed);
  }

  public async getByCaseUuid(caseUuid: string): Promise<Completed> {
    const completed = await this.completedIdentificationService.getByCaseUuid(caseUuid);
    if (!completed) {
      return completed;
    }
    completed.extensions = await this.extensionsService.getForCompletedId(completed.CompletedId);
    completed.cashflows = await this.cashflowsService.getForCompletedId(completed.CompletedId);
    completed.adjustments = await this.adjustmentsService.getForCompletedId(completed.CompletedId);
    completed.securities = await this.securitiesService.getForCompletedId(completed.CompletedId);

    completed.defaultEvents = await this.defaultEventsService.getForCompletedId(completed.CompletedId);
    completed.defaultEventsPeriods = DefaultEventsService.asPeriods(completed.defaultEvents);
    completed.manualStatuses = await this.manualStatusesService.getForCompletedId(completed.CompletedId);
    completed.lastStatus = await this.manualStatusesService.getLastStatus(completed.CompletedId);
    const dip = await this.dipService.getByCaseId(completed.FkCaseId);
    completed.furtherDrawdowns = await this.furtherDrawdownsService.getForCompletedId(completed.CompletedId, dip);

    return CompletedService.fillComputedFields(completed, dip);
  }

  static fillComputedFields(completed: Completed, dip: Dip, now: moment.Moment = moment()): Completed {
    completed.currentDateOfMaturity = ExtensionsService.getEffectiveMaturityDate(
      completed.extensions,
      completed.DateOfMaturity
    );
    completed.automaticStatus = CompletedService.getAutomaticStatus(completed, now);

    completed.status = CompletedService.getStatus(completed, now);
    completed.currentInterestRate = CompletedService.getCurrentInterestRate(completed, dip, now);
    completed.availableDrawdownFunds = FurtherDrawdownsService.getAvailableDrawdownFunds(
      completed.furtherDrawdowns,
      dip
    );
    return completed;
  }

  static getAutomaticStatus(completed: Completed, now: moment.Moment): CompletedStatus {
    if (now.isAfter(moment(completed.currentDateOfMaturity), 'day')) {
      return 'Non-Performing – Delinquent';
    }
    const defaultEventPeriods = DefaultEventsService.asPeriods(completed.defaultEvents);

    for (const defaultEventPeriod of defaultEventPeriods) {
      if (now.isBefore(moment(defaultEventPeriod.start_from), 'day')) {
        continue;
      }
      if (defaultEventPeriod.to && now.isSameOrAfter(moment(defaultEventPeriod.to), 'day')) {
        continue;
      }
      return 'Non-Performing – Default';
    }
    return 'Performing';
  }

  static getStatus(completed: Completed, now: moment.Moment): CompletedStatus {
    return (completed.manualStatuses || []).reduce((previousStatus, manualStatus) => {
      if (moment(manualStatus.EffectiveFrom).isAfter(now)) {
        return previousStatus;
      }

      if (manualStatus.Status !== 'Revert to Automatic Status') {
        return manualStatus.Status;
      }
      return completed.automaticStatus;
    }, completed.automaticStatus);
  }

  private static inExtension(completed: Completed, now: moment.Moment) {
    return now.isAfter(moment(completed.DateOfMaturity));
  }
  static getCurrentInterestRate(completed: Completed, dip: Dip, now: moment.Moment): number {
    if (completed.automaticStatus !== 'Performing') {
      return 3.0;
    }
    if (!CompletedService.inExtension(completed, now)) {
      return dip && dip.InterestRate;
    }
    return ExtensionsService.getInterestRateForDate(completed.extensions, now.format(moment.HTML5_FMT.DATE));
  }
}
