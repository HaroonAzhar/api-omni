import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistDrawDownRequestEntity,
  OriginationChecklistDrawDownRequestEntity,
  UpdateOriginationChecklistDrawDownRequestEntity,
} from './origination-checklist-draw-down-request.interface';
import { OriginationChecklistDrawDownRequestRepositoryInterface } from './origination-checklist-draw-down-request.service';

@Injectable()
export class OriginationChecklistDrawDownRequestRepository extends OriginationChecklistDrawDownRequestRepositoryInterface {
  private originationChecklistDrawDownRequestsTable = 'Servicing.OriginationChecklistDrawDownRequests';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(drawDownRequest: CreateOriginationChecklistDrawDownRequestEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistDrawDownRequestsTable).insert(drawDownRequest, [
      'OriginationChecklistDrawDownRequestId',
    ]);
    return Id;
  }

  async update(
    FkOriginationChecklistId: number,
    drawDownRequest: UpdateOriginationChecklistDrawDownRequestEntity
  ): Promise<void> {
    await this.knex(this.originationChecklistDrawDownRequestsTable)
      .update(drawDownRequest)
      .where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistDrawDownRequestEntity> {
    const [drawDownRequest] = await this.knex(this.originationChecklistDrawDownRequestsTable)
      .select<OriginationChecklistDrawDownRequestEntity[]>()
      .where({ FkOriginationChecklistId });

    return drawDownRequest;
  }
}
