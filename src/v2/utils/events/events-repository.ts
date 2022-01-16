import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';

import { KnexInstance, KNEX_CONNECTION } from '../knex';
import { BaseEvent } from './base-event.interface';

@Injectable()
export class EventsRepository {
  private readonly eventsTable = 'Servicing.Events';
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {}
  async insert(event: BaseEvent) {
    const commandId = event.context.CommandId;
    delete event.context.CommandId;
    await this.knex(this.eventsTable).insert({
      ...event.context,
      FkCommandId: commandId,
      Name: event.constructor.name,
      Content: JSON.stringify(event.content),
    });
  }

  async getEvents(eventName: string, Module: string, upToDate: string): Promise<BaseEvent[]> {
    const query = this.knex(this.eventsTable)
      .select()
      .where({
        Name: eventName,
        Module,
      })
      .where('CreatedDate', '<', moment(upToDate).utc().format());
    const events = await query;
    return events.map((event) => ({
      ...event,
      content: JSON.parse(event.Content),
    }));
  }
}
