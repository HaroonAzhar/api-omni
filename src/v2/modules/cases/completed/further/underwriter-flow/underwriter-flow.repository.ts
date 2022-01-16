import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateUnderwriterFlowEntity,
  UnderwriterFlowEntity,
  UnderwriterFlowRepositoryInterface,
  UpdateUnderwriterFlowEntity,
} from './underwriter-flow.interface';

@Injectable()
export class UnderwriterFlowRepository extends UnderwriterFlowRepositoryInterface {
  private UnderwriterFlowSolicitorsTable = 'Servicing.UnderwriterFlows';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(underwriterFlow: CreateUnderwriterFlowEntity): Promise<number> {
    const [Id] = await this.knex(this.UnderwriterFlowSolicitorsTable).insert(underwriterFlow, ['UnderwriterFlowId']);
    return Id;
  }

  async get(FkFurtherId: number, FurtherType: string): Promise<UnderwriterFlowEntity> {
    const [underwriterFlow] = await this.knex(this.UnderwriterFlowSolicitorsTable)
      .select<UnderwriterFlowEntity[]>()
      .where({ FkFurtherId, FurtherType });

    return underwriterFlow;
  }

  async update(FkFurtherId: number, FurtherType: string, underwriterFlow: UpdateUnderwriterFlowEntity): Promise<void> {
    await this.knex(this.UnderwriterFlowSolicitorsTable).update(underwriterFlow).where({ FkFurtherId, FurtherType });
  }
}
