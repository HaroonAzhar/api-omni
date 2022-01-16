import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { ReleaseSecurityCommand } from './security-releases.commands';
import {
  SecurityRelease,
  SecurityReleaseEntity,
  CreateSecurityReleaseEntity,
  CreateSecurityRelease,
} from './security-releases.interface';

export abstract class SecurityReleasesRepositoryInterface {
  abstract create(securityRelease: CreateSecurityReleaseEntity): Promise<number>;
  abstract findAll(FkCompletedId: number): Promise<SecurityReleaseEntity[]>;
}

@Injectable()
export class SecurityReleasesService {
  constructor(
    private readonly securityReleaseRepository: SecurityReleasesRepositoryInterface,
    private readonly commandBus: CommandBus
  ) {}

  async createSecurityRelease(
    FkSecurityId: number,
    securityRelease: CreateSecurityRelease,
    context: CommandContext
  ): Promise<number> {
    const release: CreateSecurityReleaseEntity = { FkSecurityId, ...securityRelease };
    const createdId = await this.securityReleaseRepository.create(release);

    const released: SecurityRelease = (await this.getSecurityReleases(FkSecurityId)).find(
      (existingSecurityRelease) => existingSecurityRelease.SecurityReleaseId == createdId
    );

    await this.commandBus.execute(new ReleaseSecurityCommand(released, context));
    return createdId;
  }

  async getSecurityReleases(FkSecurityId: number): Promise<SecurityRelease[]> {
    return this.securityReleaseRepository.findAll(FkSecurityId);
  }
}
