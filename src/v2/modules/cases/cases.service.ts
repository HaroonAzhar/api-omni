import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandContext } from '@v2/utils/commands';

import { UsersService } from '../admin/users/users.service';
import { ApplicationService } from './application/application.service';
import { Individual } from './application/application.interface';
import { CaseSummaryService } from './case-summary/case-summary.service';
import { Case, Stage, Status } from './case.interface';
import { CasesIdentificationService } from './cases-identification.service';
import { CreateCompletedParams } from './completed/completed.interface';
import { CompletedService } from './completed/completed.service';
import { DipService } from './dip/dip.service';
import { EnquiryService } from './enquiry/enquiry.service';
import { CrossCollateralisedLoansService } from './cross-collateralised-loans/cross-collateralised-loans.service';
import generateCaseReference from './case-reference/generate-case-reference';
import { ContactsService } from '../admin/contacts/contacts.service';

export abstract class CaseRepositoryInterface {
  abstract getAll(CaseNr?: string): Promise<Case[]>;
  abstract getByCaseUuid(caseUuid: string): Promise<Case>;
  abstract updateByCaseUuid(caseUuid: string, caseData: Case): Promise<void>;
  abstract getCasesByBrokerId(brokerId: number): Promise<Case[]>;
}

type ChangeStageParams = { Stage: Stage } & (Record<string, unknown> | CreateCompletedParams);

@Injectable()
export class CasesService {
  constructor(
    private repository: CaseRepositoryInterface,
    private readonly completedService: CompletedService,
    private readonly dipService: DipService,
    private readonly enquiryService: EnquiryService,
    private readonly casesIdentificationService: CasesIdentificationService,
    private readonly applicationService: ApplicationService,
    private readonly userService: UsersService,
    private readonly caseSummaryService: CaseSummaryService,
    private readonly crossCollateralisedLoansService: CrossCollateralisedLoansService,
    private readonly contactService: ContactsService
  ) {}

  async getAll(CaseNr?: string): Promise<Case[]> {
    const allCases = await this.repository.getAll(CaseNr);
    return allCases;
  }

  async getCaseData(caseUuid: string): Promise<Case> {
    const coreData = await this.casesIdentificationService.getByCaseUuid(caseUuid);
    if (!coreData) {
      throw new NotFoundException();
    }
    const completed = await this.completedService.getByCaseUuid(caseUuid);
    const dip = await this.dipService.getByCaseId(coreData.CaseId);
    const application = await this.applicationService.getByCaseId(coreData.CaseId);
    const assignedUser = await this.userService.getOne(coreData.FkAssignedUserId);
    const caseSummary = await this.caseSummaryService.getByCaseId(coreData.CaseId);
    const crossCollateralisedLoans = await this.crossCollateralisedLoansService.getForCaseId(coreData.CaseId);
    return { ...coreData, completed, dip, application, assignedUser, caseSummary, crossCollateralisedLoans };
  }

  async changeStage(
    caseUuid: string,
    { Stage, ...rest }: ChangeStageParams,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    switch (Stage) {
      case 'completed': {
        if ('DateOfCompletion' in rest) {
          return this.convertCaseToCompleted(caseUuid, rest as CreateCompletedParams, context);
        }
      }
      case 'enquiry': {
        return this.repository.updateByCaseUuid(caseUuid, { Stage: 'enquiry' });
      }
      case 'dip': {
        return this.convertCaseToDip(caseUuid);
      }
      case 'case_summary': {
        return this.convertCaseToCaseSummary(caseUuid);
      }
      default: {
        throw new Error('Unknown stage');
      }
    }
  }

  async changeStatus(caseUuid: string, Status: Status): Promise<void> {
    return this.repository.updateByCaseUuid(caseUuid, { Status });
  }

  async changeCaseReference(caseUuid: string, CaseNr: string): Promise<void> {
    return this.repository.updateByCaseUuid(caseUuid, { CaseNr });
  }

  async changeApplicants(caseUuid: string, Applicants: string): Promise<void> {
    return this.repository.updateByCaseUuid(caseUuid, { Applicants });
  }

  private async convertCaseToCompleted(
    caseUuid: string,
    params: CreateCompletedParams,
    context: CommandContext
  ): Promise<void> {
    const currentCase = await this.casesIdentificationService.getByCaseUuid(caseUuid);
    if (currentCase.Stage !== 'redeemed') {
      await this.completedService.createCompleted({ FkCaseId: currentCase.CaseId, ...params }, context);
      const application = await this.applicationService.getByCaseId(currentCase.CaseId);
      await this.saveProofOfIdForIndividuals(application?.individuals);
    }
    await this.repository.updateByCaseUuid(caseUuid, { Stage: 'completed', Status: 'in_progress' });
  }

  private saveProofOfIdForIndividuals(individuals: Individual[]) {
    return Promise.all(
      individuals?.map(async (individual) => {
        if (individual.amlKyc?.ProofOfIdExpiryDate) {
          return this.contactService.saveProofOfId(
            individual.FkSharedContactId,
            individual.amlKyc.ProofOfId,
            individual.amlKyc.ProofOfIdExpiryDate
          );
        }
      }) ?? []
    );
  }

  private async convertCaseToDip(caseUuid: string): Promise<void> {
    await this.repository.updateByCaseUuid(caseUuid, { Stage: 'dip', Status: 'pending' });
    await this.changeCaseReference(caseUuid, null);
    const enquiry = await this.enquiryService.getEnquiry(caseUuid);
    await this.dipService.createFromEnquiry(caseUuid, enquiry);
  }

  private async convertCaseToCaseSummary(caseUuid: string): Promise<void> {
    await this.repository.updateByCaseUuid(caseUuid, { Stage: 'case_summary' });
    const { CaseId } = await this.casesIdentificationService.getByCaseUuid(caseUuid);
    await this.caseSummaryService.createCaseSummary(CaseId);
  }

  async assignCaseToUser(caseUuid: string, { UserId: FkAssignedUserId }: { UserId: number }): Promise<void> {
    await this.repository.updateByCaseUuid(caseUuid, { FkAssignedUserId });
  }

  async removeAssignedUser(caseUuid: string): Promise<void> {
    await this.repository.updateByCaseUuid(caseUuid, { FkAssignedUserId: null });
  }

  async createCaseReference(caseUuid: string, clientName: string): Promise<{ CaseNr: string }> {
    const allCases = await this.getAll();

    const coreData = await this.casesIdentificationService.getByCaseUuid(caseUuid);

    const dip = await this.dipService.getByCaseId(coreData.CaseId);

    const CaseNr = generateCaseReference(clientName, allCases, dip);
    const updatedData = { CaseNr };
    await this.repository.updateByCaseUuid(caseUuid, { CaseNr, Status: 'issued' });

    return updatedData;
  }
  async getCasesByBrokerId(brokerId: number): Promise<Case[]> {
    return await this.repository.getCasesByBrokerId(brokerId);
  }
}
