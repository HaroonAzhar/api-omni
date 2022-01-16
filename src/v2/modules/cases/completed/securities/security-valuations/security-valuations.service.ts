import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { CreateSecurityValuationCommand } from './security-valuations.commands';
import {
  SecurityValuation,
  SecurityValuationEntity,
  CreateSecurityValuationEntity,
  CreateSecurityValuation,
} from './security-valuations.interface';

export abstract class SecurityValuationsRepositoryInterface {
  abstract create(securityValuation: CreateSecurityValuationEntity): Promise<number>;
  abstract findAll(FkCompletedId: number): Promise<SecurityValuationEntity[]>;
}

@Injectable()
export class SecurityValuationsService {
  constructor(
    private readonly securityValuationRepository: SecurityValuationsRepositoryInterface,
    private readonly commandBus: CommandBus
  ) {}

  async createSecurityValuation(
    FkSecurityId: number,
    securityValuation: CreateSecurityValuation,
    context: CommandContext
  ): Promise<number> {
    const valuation: CreateSecurityValuationEntity = { FkSecurityId, ...securityValuation };
    const createdId = await this.securityValuationRepository.create(valuation);

    const savedValuation: SecurityValuation = (await this.getSecurityValuations(FkSecurityId)).find(
      (existingSecurityValuation) => existingSecurityValuation.SecurityValuationId == createdId
    );

    await this.commandBus.execute(new CreateSecurityValuationCommand(savedValuation, context));
    return createdId;
  }

  async getSecurityValuations(FkSecurityId: number): Promise<SecurityValuation[]> {
    return this.securityValuationRepository.findAll(FkSecurityId);
  }
}
