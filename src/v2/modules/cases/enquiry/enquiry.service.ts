import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { CasesIdentificationService } from '../cases-identification.service';
import { CasesService } from '../cases.service';
import {
  Enquiry,
  CreateEnquiryEntity,
  EnquiryEntity,
  CreateEnquiry,
  UpdateEnquiry,
  UpdateEnquiryEntity,
} from './enquiry.interface';

export abstract class EnquiryRepositoryInterface {
  abstract getByCaseId(FkCaseId: number): Promise<EnquiryEntity | undefined>;
  abstract create(enquiry: CreateEnquiryEntity): Promise<number>;
  abstract update(enquiry: UpdateEnquiryEntity): Promise<number>;
}

@Injectable()
export class EnquiryService {
  constructor(
    private readonly enquiryRepository: EnquiryRepositoryInterface,
    @Inject(forwardRef(() => CasesService))
    private readonly casesService: CasesService,
    private readonly casesIdentificationService: CasesIdentificationService
  ) {}

  async getEnquiry(caseUuid: string): Promise<Enquiry | undefined> {
    const matchingCase = await this.casesIdentificationService.getByCaseUuid(caseUuid);
    const { CaseId, CaseNr, Status } = matchingCase;

    const enquiry = await this.getByCaseId(CaseId);

    if (enquiry === undefined) {
      return undefined;
    }
    return {
      ...enquiry,
      CaseNr,
      Status,
    };
  }

  async createEnquiry(caseUuid: string, enquiry: CreateEnquiry): Promise<number> {
    const matchingCase = await this.casesIdentificationService.getByCaseUuid(caseUuid);
    const { CaseId } = matchingCase;

    const existingEnquiry = await this.getByCaseId(CaseId);
    await this.casesService.changeStage(caseUuid, { Stage: 'enquiry' });
    await this.casesService.changeStatus(caseUuid, 'received');

    if (enquiry.EnquiryName) {
      await this.casesService.changeApplicants(caseUuid, enquiry.EnquiryName);
    }

    if (existingEnquiry) {
      return this.update(Object.assign(existingEnquiry, enquiry));
    }
    await this.create(caseUuid, { ...enquiry, FkCaseId: CaseId });
  }

  private async getByCaseId(FkCaseId: number) {
    return this.enquiryRepository.getByCaseId(FkCaseId);
  }

  private async update(enquiry: UpdateEnquiry) {
    return await this.enquiryRepository.update(enquiry);
  }

  private async create(caseUuid: string, enquiry: CreateEnquiryEntity) {
    const newEnquiryId = await this.enquiryRepository.create(enquiry);
    await this.casesService.changeCaseReference(caseUuid, this.formatCaseNumber(newEnquiryId));
  }
  private formatCaseNumber(enquiryId: number) {
    return `ENQ-${enquiryId.toString().padStart(6, '0')}`;
  }
}
