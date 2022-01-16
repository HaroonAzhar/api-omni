import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { Property } from '../../application/application.interface';
import { ApplicationService } from '../../application/application.service';
import { CompletedIdentificationService } from '../completed-identification.service';
import { CreateSecurityCommand } from './securities.commands';
import { SecurityConversion } from './security-conversions/security-conversions.interface';
import { SecurityConversionsService } from './security-conversions/security-conversions.service';
import { SecurityNotesService } from './security-notes/security-notes.service';
import { SecurityRelease } from './security-releases/security-releases.interface';
import { SecurityReleasesService } from './security-releases/security-releases.service';
import { CreateSecurityValuation, SecurityValuation } from './security-valuations/security-valuations.interface';
import { SecurityValuationsService } from './security-valuations/security-valuations.service';
import { Security, SecurityEntity, CreateSecurityEntity, CreateNewSecurity } from './security.interface';

export abstract class SecuritiesRepositoryInterface {
  abstract create(security: CreateSecurityEntity): Promise<number>;
  abstract findAll(FkCompletedId: number): Promise<SecurityEntity[]>;
  abstract get(SecurityEntityId: number): Promise<SecurityEntity>;
}

@Injectable()
export class SecuritiesService {
  constructor(
    private readonly securityRepository: SecuritiesRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly applicationService: ApplicationService,
    private readonly securityNotesService: SecurityNotesService,
    private readonly securityReleaseService: SecurityReleasesService,
    private readonly securityValuationsService: SecurityValuationsService,
    private readonly securityConversionsService: SecurityConversionsService,
    private readonly commandBus: CommandBus
  ) {}

  async createSecurity(
    security: CreateSecurityEntity,
    valuation: CreateSecurityValuation,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<number> {
    const SecurityId = await this.securityRepository.create(security);

    await this.commandBus.execute(new CreateSecurityCommand({ ...security, SecurityId }, context));
    await this.securityValuationsService.createSecurityValuation(SecurityId, valuation, context);
    return SecurityId;
  }

  async createNewSecurity(
    caseUuid: string,
    security: CreateNewSecurity,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<number> {
    const FkCompletedId = await this.completedService.getIdByCaseUuid(caseUuid);

    const FkCasePropertyId = await this.applicationService.addProperty(security.property);

    const securityId = await this.createSecurity({ FkCasePropertyId, FkCompletedId }, security.valuation, context);
    await this.securityNotesService.createSecurityNote(securityId, security.note);

    return securityId;
  }

  async getSecurities(caseUuid: string): Promise<Security[]> {
    const CompletedId = await this.completedService.getIdByCaseUuid(caseUuid);

    return this.getForCompletedId(CompletedId);
  }

  async getForCompletedId(CompletedId: number): Promise<Security[]> {
    const securities = await this.securityRepository.findAll(CompletedId);

    return Promise.all(
      securities.map(async (security) => {
        return this.fillSecurity(security, await this.applicationService.getProperty(security.FkCasePropertyId));
      })
    );
  }

  async getSecurity(SecurityId: number): Promise<Security> {
    const security = await this.securityRepository.get(SecurityId);

    if (security === undefined) {
      return security as Security;
    }
    return this.fillSecurity(security, await this.applicationService.getProperty(security.FkCasePropertyId));
  }

  static getCurrentValuation(
    valuations: SecurityValuation[],
    releases: SecurityRelease[],
    conversions: SecurityConversion[]
  ): SecurityValuation {
    if (valuations.length < 1) {
      return {} as SecurityValuation;
    }

    if (releases.length > 0) {
      return {} as SecurityValuation;
    }

    if (conversions.length > 0) {
      return {} as SecurityValuation;
    }

    return valuations[valuations.length - 1];
  }
  private async fillSecurity(securityEntity: SecurityEntity, property: Property): Promise<Security> {
    const notes = await this.securityNotesService.getSecurityNotes(securityEntity.SecurityId);
    const releases = await this.securityReleaseService.getSecurityReleases(securityEntity.SecurityId);
    const valuations = await this.securityValuationsService.getSecurityValuations(securityEntity.SecurityId);
    const conversions = await this.securityConversionsService.getSecurityConversions(securityEntity.SecurityId);
    const currentValuation = SecuritiesService.getCurrentValuation(valuations, releases, conversions);
    return {
      ...securityEntity,
      property,
      notes,
      releases,
      isReleased: releases.length > 0,
      conversions,
      isConverted: conversions.length > 0,
      valuations,
      currentGDV: currentValuation.GDV,
      currentValuation: currentValuation.Valuation,
    };
  }
}
