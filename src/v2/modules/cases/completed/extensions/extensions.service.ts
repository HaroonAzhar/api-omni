import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import moment from 'moment';
import { CommandContext } from '@v2/utils/commands';
import { EventsRepository } from '@v2/utils/events';
import { Result } from '@v2/utils/result';

import { CompletedIdentificationService } from '../completed-identification.service';
import { moduleName, Extension, ExtensionsRepositoryInterface } from './extension.interface';
import { CreateExtensionCommand } from './extensions.commands';
import { CreatedExtensionEvent } from './extensions.events';

class ExtensionExistsError extends Error {
  message = 'The extension date can not be the same or before the maturity date';
}
@Injectable()
export class ExtensionsService {
  constructor(
    private readonly extensionRepository: ExtensionsRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly commandBus: CommandBus,
    private readonly eventsStorage: EventsRepository
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createExtension(
    caseUuid: string,
    extension: Extension,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<Result<Extension, ExtensionExistsError>> {
    const FkCompletedId = await this.completedService.getIdByCaseUuid(caseUuid);

    const lastExtensionDate = await this.getCurrentMaturityDate(FkCompletedId);
    const newEventDate = extension.Date;
    if (moment(newEventDate).isSameOrBefore(moment(lastExtensionDate), 'day')) {
      return new ExtensionExistsError();
    }

    const createdExtension = { FkCompletedId, ...extension };
    const createdId = await this.extensionRepository.create(createdExtension);
    createdExtension.ExtensionId = createdId;
    await this.commandBus.execute(new CreateExtensionCommand(createdExtension, context));
    return createdExtension;
  }

  async getForCompletedId(completedId: number): Promise<Extension[]> {
    const extensions = await this.extensionRepository.findAll(completedId);
    const completed = await this.completedService.getById(completedId);
    const { pairs } = extensions.reduce(
      ({ pairs, prev }, current) => {
        pairs.push([prev, current]);
        prev = current;
        return { pairs, prev };
      },
      { pairs: [], prev: { Date: completed.DateOfMaturity } }
    );
    const extensionsWithStart = pairs.map(
      ([prev, current]): Extension => ({
        ...current,
        FromDate: prev.Date,
      })
    );
    return extensionsWithStart;
  }

  async getExtensions(caseUuid: string) {
    const completedId = await this.getCompletedId(caseUuid);
    return this.getForCompletedId(completedId);
  }

  async getExtensionsHistorical(caseUuid: string, date: string) {
    const CompletedId = await this.getCompletedId(caseUuid);

    const createEvents = await this.eventsStorage.getEvents(CreatedExtensionEvent.name, moduleName, date);

    return createEvents
      .map((createdEvent: CreatedExtensionEvent) => createdEvent.content)
      .filter((extension: Extension) => extension.FkCompletedId === CompletedId);
  }

  async getCurrentMaturityDate(completedId: number) {
    const completed = await this.completedService.getById(completedId);
    const existingExtensions = await this.getForCompletedId(completed.CompletedId);

    return ExtensionsService.getEffectiveMaturityDate(existingExtensions, completed.DateOfMaturity);
  }

  static getEffectiveMaturityDate(existingExtensions: Extension[] = [], dateOfMaturity: string): string {
    const lastExtensionDate = (existingExtensions[existingExtensions.length - 1] || { Date: dateOfMaturity }).Date;
    return lastExtensionDate;
  }
  static getInterestRateForDate(existingExtensions: Extension[], date: string) {
    for (const extension of existingExtensions) {
      if (moment(date).isBetween(extension.FromDate, extension.Date, 'day', '(]')) {
        return extension.InterestRate;
      }
    }
  }
}
