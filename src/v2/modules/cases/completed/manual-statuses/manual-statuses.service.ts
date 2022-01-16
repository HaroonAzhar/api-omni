import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';
import { EventsRepository } from '@v2/utils/events';
import { Result } from '@v2/utils/result';
import moment from 'moment';

import { CompletedIdentificationService } from '../completed-identification.service';
import { moduleName, ManualStatus, ManualStatusesRepositoryInterface } from './manual-status.interface';
import { CreateManualStatusCommand, DeleteManualStatusCommand } from './manual-statuses.commands';
import { CreatedManualStatusEvent, DeletedManualStatusEvent } from './manual-statuses.events';

class ManualStatusBeforeCompletion extends Error {
  message = 'Manual status can not be set before completion date';
}

class ManualStatusBeforeLastStatus extends Error {
  message = 'New status can not be set before existing manual status';
}
@Injectable()
export class ManualStatusesService {
  constructor(
    private readonly manualStatusRepository: ManualStatusesRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly commandBus: CommandBus,
    private readonly eventsStorage: EventsRepository
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createManualStatus(
    caseUuid: string,
    manualStatus: ManualStatus,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<Result<ManualStatus, Error>> {
    const completed = await this.completedService.getByCaseUuid(caseUuid);

    if (moment(manualStatus.EffectiveFrom).isBefore(moment(completed.DateOfCompletion), 'day')) {
      return new ManualStatusBeforeCompletion();
    }

    const lastStatusDate = await this.getLastStatusDate(completed.CompletedId);
    if (moment(manualStatus.EffectiveFrom).isBefore(moment(lastStatusDate), 'day')) {
      return new ManualStatusBeforeLastStatus();
    }
    const createdManualStatus = { FkCompletedId: completed.CompletedId, ...manualStatus };
    const createdId = await this.manualStatusRepository.create(createdManualStatus);
    createdManualStatus.ManualStatusId = createdId;
    await this.commandBus.execute(new CreateManualStatusCommand(createdManualStatus, context));
    return createdManualStatus;
  }

  async getForCompletedId(completedId: number): Promise<ManualStatus[]> {
    const manualStatuses = await this.manualStatusRepository.findAll(completedId);
    return manualStatuses.filter((manualStatus) => !manualStatus.IsDeleted);
  }

  async getManualStatuses(caseUuid: string) {
    const completedId = await this.getCompletedId(caseUuid);
    return this.getForCompletedId(completedId);
  }

  private async getLastStatusDate(completedId: number) {
    const lastStatus = await this.getLastStatus(completedId);
    return (lastStatus && lastStatus.EffectiveFrom) || new Date(0);
  }
  async getLastStatus(completedId: number) {
    const manualStatuses = await this.getForCompletedId(completedId);
    const sortedStatuses = ManualStatusesService.sortByEffectiveFrom(manualStatuses);
    return sortedStatuses[0];
  }

  static sortByEffectiveFrom(manualStatuses: ManualStatus[]): ManualStatus[] {
    return manualStatuses.sort((a, b) => (moment(a.EffectiveFrom).isBefore(moment(b.EffectiveFrom)) ? 1 : -1));
  }

  async getManualStatusesHistorical(caseUuid: string, date: string) {
    const CompletedId = await this.getCompletedId(caseUuid);

    const createEvents = await this.eventsStorage.getEvents(CreatedManualStatusEvent.name, moduleName, date);

    const deletedEvents = await this.eventsStorage.getEvents(DeletedManualStatusEvent.name, moduleName, date);

    const deletedIds = deletedEvents.map((deleteEvent: DeletedManualStatusEvent) => deleteEvent.content.ManualStatusId);

    return createEvents
      .map((createdEvent: CreatedManualStatusEvent) => createdEvent.content)
      .filter((manualStatus: ManualStatus) => manualStatus.FkCompletedId === CompletedId)
      .filter((manualStatus: ManualStatus) => !deletedIds.includes(manualStatus.ManualStatusId));
  }

  async deleteManualStatus(
    caseUuid: string,
    manualStatusId: number,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ) {
    const CompletedId = await this.getCompletedId(caseUuid);
    await this.commandBus.execute(new DeleteManualStatusCommand({ ManualStatusId: manualStatusId }, context));
    return this.manualStatusRepository.update(CompletedId, manualStatusId, { IsDeleted: true });
  }
}
