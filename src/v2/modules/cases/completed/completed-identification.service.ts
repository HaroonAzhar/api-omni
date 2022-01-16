import { Injectable } from '@nestjs/common';

import { CasesIdentificationService } from '../cases-identification.service';
import { Completed } from './completed.interface';

export abstract class CompletedIdentificationRepositoryInterface {
  abstract getByCaseId(FkCaseId: number): Promise<Completed>;
  abstract getById(CompletedId: number): Promise<Completed>;
}
@Injectable()
export class CompletedIdentificationService {
  constructor(
    private readonly completedRepository: CompletedIdentificationRepositoryInterface,
    private readonly casesIdentificationService: CasesIdentificationService
  ) {}

  async getByCaseId(FkCaseId: number) {
    return this.completedRepository.getByCaseId(FkCaseId);
  }

  async getById(CompletedId: number) {
    return this.completedRepository.getById(CompletedId);
  }

  async getByCaseUuid(caseUuid: string) {
    const matchingCase = await this.casesIdentificationService.getByCaseUuid(caseUuid);
    const { CaseId } = matchingCase;

    const completed = await this.getByCaseId(CaseId);
    return completed;
  }
  async getIdByCaseUuid(caseUuid: string): Promise<number> {
    const completed = await this.getByCaseUuid(caseUuid);
    return completed && completed.CompletedId;
  }
}
