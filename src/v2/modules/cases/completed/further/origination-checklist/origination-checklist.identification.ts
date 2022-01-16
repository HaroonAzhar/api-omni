import { Injectable } from '@nestjs/common';

import { OriginationChecklistRepositoryInterface } from './origination-checklist.interface';

@Injectable()
export class OriginationChecklistIdentification {
  constructor(private readonly originationChecklistRepository: OriginationChecklistRepositoryInterface) {}

  async getId(FkFurtherId: number, FurtherType: string): Promise<number> {
    const { OriginationChecklistId } = await this.originationChecklistRepository.get(FkFurtherId, FurtherType);
    return OriginationChecklistId;
  }
}
