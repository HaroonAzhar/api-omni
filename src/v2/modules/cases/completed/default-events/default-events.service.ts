import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import moment from 'moment';
import { CommandContext } from '@v2/utils/commands';
import { EventsRepository } from '@v2/utils/events';
import { Result } from '@v2/utils/result';

import { CompletedIdentificationService } from '../completed-identification.service';
import {
  moduleName,
  DefaultEvent,
  DefaultEventsFilterQuery,
  DefaultEventsRepositoryInterface,
  DefaultEventPeriod,
} from './default-event.interface';
import { CreateDefaultEventCommand, DeleteDefaultEventCommand } from './default-events.commands';
import { CreatedDefaultEventEvent, DeletedDefaultEventEvent } from './default-events.events';

class DefaultEventExistsError extends Error {
  message = 'Only one event can exist for a given date';
}
@Injectable()
export class DefaultEventsService {
  constructor(
    private readonly defaultEventRepository: DefaultEventsRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly commandBus: CommandBus,
    private readonly eventsStorage: EventsRepository
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createDefaultEvent(
    caseUuid: string,
    defaultEvent: DefaultEvent,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<Result<DefaultEvent, DefaultEventExistsError>> {
    const FkCompletedId = await this.getCompletedId(caseUuid);

    const existingDefaultEvents = await this.getForCompletedId(FkCompletedId);

    const asDateString = (dateTime: string) => moment(dateTime).format('DD-MM-YYYY');

    const existingDates = existingDefaultEvents.map((existingDefaultEvent) => asDateString(existingDefaultEvent.Date));

    const newEventDate = asDateString(defaultEvent.Date);
    if (existingDates.includes(newEventDate)) {
      return new DefaultEventExistsError();
    }

    const createdDefaultEvent = { FkCompletedId, ...defaultEvent };
    const createdId = await this.defaultEventRepository.create(createdDefaultEvent);
    createdDefaultEvent.DefaultEventId = createdId;
    await this.commandBus.execute(new CreateDefaultEventCommand(createdDefaultEvent, context));
    return createdDefaultEvent;
  }

  async getForCompletedId(completedId: number, query?: DefaultEventsFilterQuery) {
    const defaultEvents = await this.defaultEventRepository.findAll(completedId, query);

    return defaultEvents.filter((defaultEvent) => !defaultEvent.IsDeleted);
  }

  async getDefaultEvents(caseUuid: string, query?: DefaultEventsFilterQuery) {
    const completedId = await this.getCompletedId(caseUuid);
    return this.getForCompletedId(completedId, query);
  }

  async deleteDefaultEvent(
    caseUuid: string,
    defaultEventId: number,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ) {
    const CompletedId = await this.getCompletedId(caseUuid);
    await this.commandBus.execute(new DeleteDefaultEventCommand({ DefaultEventId: defaultEventId }, context));
    return this.defaultEventRepository.update(CompletedId, defaultEventId, { IsDeleted: true });
  }

  async getDefaultEventsHistorical(caseUuid: string, date: string) {
    const CompletedId = await this.getCompletedId(caseUuid);

    const createEvents = await this.eventsStorage.getEvents(CreatedDefaultEventEvent.name, moduleName, date);
    const deleteEvents = await this.eventsStorage.getEvents(DeletedDefaultEventEvent.name, moduleName, date);

    const deletedIds = deleteEvents.map((deleteEvent: DeletedDefaultEventEvent) => deleteEvent.content.DefaultEventId);
    return createEvents
      .map((createdEvent: CreatedDefaultEventEvent) => createdEvent.content)
      .filter((defaultEvent: DefaultEvent) => defaultEvent.FkCompletedId === CompletedId)
      .filter((defaultEvent: DefaultEvent) => !deletedIds.includes(defaultEvent.DefaultEventId));
  }

  static asPeriods(events: DefaultEvent[] = []): DefaultEventPeriod[] {
    const sortedEvents = events.sort((a, b) => moment(a.Date).diff(moment(b.Date)));
    const nonDuplicatedTypes = sortedEvents.reduce((previousEvents, current) => {
      if (
        previousEvents[previousEvents.length - 1] === undefined ||
        previousEvents[previousEvents.length - 1].Type !== current.Type
      ) {
        previousEvents.push(current);
      }
      return previousEvents;
    }, []);
    const { periods, running } = nonDuplicatedTypes.reduce(
      ({ periods, running }, current) => {
        if (current.Type === 'End' && running !== null) {
          periods.push({
            start_from: running.Date,
            to: current.Date,
          });
          running = null;
        }
        if (running === null && current.Type === 'Start') {
          running = current;
        }
        return { periods, running };
      },
      { periods: [], running: null }
    );
    if (running !== null) {
      periods.push({ start_from: running.Date });
    }
    return periods;
  }
  async getDefaultEventsPeriods(caseUuid: string, date: string): Promise<DefaultEventPeriod[]> {
    const events = await this.getDefaultEventsHistorical(caseUuid, date);
    return DefaultEventsService.asPeriods(events);
  }
}
