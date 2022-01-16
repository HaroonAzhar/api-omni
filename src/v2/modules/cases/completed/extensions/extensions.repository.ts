import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { Extension, ExtensionsRepositoryInterface } from './extension.interface';

@Injectable()
export class ExtensionsRepository extends ExtensionsRepositoryInterface {
  private extensionTable = 'Servicing.Extensions';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(extensions: Extension): Promise<number> {
    const [Id] = await this.knex(this.extensionTable).insert(extensions, ['ExtensionId']);
    return Id;
  }

  async findAll(FkCompletedId: number): Promise<Extension[]> {
    const query = this.knex(this.extensionTable).select<Extension[]>().where({ FkCompletedId });

    return query.orderBy('Date');
  }
}
