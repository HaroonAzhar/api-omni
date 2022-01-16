import { Injectable, NotFoundException } from '@nestjs/common';

import { Case } from './case.interface';

export abstract class CasesIdentificationRepositoryInterface {
  abstract getByCaseUuid(caseUuid: string): Promise<Case>;
  abstract getByCaseId(caseId: number): Promise<Case>;
}
@Injectable()
export class CasesIdentificationService {
  constructor(private repository: CasesIdentificationRepositoryInterface) {}

  async getByCaseUuid(caseUuid: string): Promise<Case> {
    const matchingCase = await this.repository.getByCaseUuid(caseUuid);
    if (!matchingCase) {
      throw new NotFoundException(`Cannot find case ${caseUuid}`);
    }
    return matchingCase;
  }

  async getByCaseId(caseId: number): Promise<Case> {
    const matchingCase = await this.repository.getByCaseId(caseId);
    if (!matchingCase) {
      throw new NotFoundException(`Cannot find case ${caseId}`);
    }
    return matchingCase;
  }
}
