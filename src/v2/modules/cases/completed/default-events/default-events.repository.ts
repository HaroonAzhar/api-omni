import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { DefaultEvent, DefaultEventsFilterQuery, DefaultEventsRepositoryInterface } from './default-event.interface';

@Injectable()
export class DefaultEventsRepository extends DefaultEventsRepositoryInterface {
  private defaultEventTable = 'Servicing.DefaultEvents';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(defaultEvents: DefaultEvent): Promise<number> {
    const [Id] = await this.knex(this.defaultEventTable).insert(defaultEvents, ['DefaultEventId']);
    return Id;
  }

  async findAll(FkCompletedId: number, filterQuery: DefaultEventsFilterQuery = {}): Promise<DefaultEvent[]> {
    let query = this.knex(this.defaultEventTable).select<DefaultEvent[]>().where({ FkCompletedId });
    const { DateMin, DateMax, Type } = filterQuery;

    if (Type) {
      query = query.where({ Type });
    }
    if (DateMin) {
      query = query.where('Date', '>', DateMin);
    }
    if (DateMax) {
      query = query.where('Date', '<', DateMax);
    }
    return query.orderBy('Date');
  }

  async update(FkCompletedId: number, DefaultEventId: number, defaultEvent: DefaultEvent): Promise<number> {
    delete defaultEvent.DefaultEventId;
    return this.knex(this.defaultEventTable).update(defaultEvent).where({ FkCompletedId, DefaultEventId });
  }
}
