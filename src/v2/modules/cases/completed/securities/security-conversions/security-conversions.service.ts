import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { ConvertSecurityCommand } from './security-conversions.commands';
import {
  SecurityConversion,
  SecurityConversionEntity,
  CreateSecurityConversionEntity,
  CreateSecurityConversion,
} from './security-conversions.interface';

export abstract class SecurityConversionsRepositoryInterface {
  abstract create(securityConversion: CreateSecurityConversionEntity): Promise<number>;
  abstract findAll(FkCompletedId: number): Promise<SecurityConversionEntity[]>;
}

@Injectable()
export class SecurityConversionsService {
  constructor(
    private readonly securityConversionRepository: SecurityConversionsRepositoryInterface,
    private readonly commandBus: CommandBus
  ) {}

  async createSecurityConversion(
    FkSecurityId: number,
    securityConversion: CreateSecurityConversion,
    context: CommandContext
  ): Promise<number> {
    const conversion: CreateSecurityConversionEntity = { FkSecurityId, ...securityConversion };
    const createdId = await this.securityConversionRepository.create(conversion);

    const converted: SecurityConversion = (await this.getSecurityConversions(FkSecurityId)).find(
      (existingSecurityConversion) => existingSecurityConversion.SecurityConversionId == createdId
    );

    await this.commandBus.execute(new ConvertSecurityCommand(converted, context));
    return createdId;
  }

  async getSecurityConversions(FkSecurityId: number): Promise<SecurityConversion[]> {
    return this.securityConversionRepository.findAll(FkSecurityId);
  }
}
