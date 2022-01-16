import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import { EditCommentOriginationChecklistSolicitor } from './origination-checklist-solicitor.commands';
import {
  CreateOriginationChecklistSolicitorEntity,
  OriginationChecklistSolicitorEntity,
  OriginationChecklistSolicitor,
  UpdateOriginationChecklistSolicitorEntity,
  moduleName,
} from './origination-checklist-solicitor.interface';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistSolicitorRepositoryInterface {
  abstract create(solicitor: CreateOriginationChecklistSolicitorEntity): Promise<number>;
  abstract update(
    FkOriginationChecklistId: number,
    solicitor: UpdateOriginationChecklistSolicitorEntity
  ): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistSolicitorEntity>;
}

@Injectable()
export class OriginationChecklistSolicitorService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;

  constructor(
    protected readonly repository: OriginationChecklistSolicitorRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus
  ) {
    super();
  }

  async createSolicitor(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getSolicitor(FkOriginationChecklistId: number): Promise<OriginationChecklistSolicitor> {
    const solicitorEntity = await this.repository.get(FkOriginationChecklistId);

    return OriginationChecklistSolicitorService.fillSolicitor(solicitorEntity);
  }
  static fillSolicitor(solicitorEntity: OriginationChecklistSolicitorEntity): OriginationChecklistSolicitor {
    const sharedComputed = OriginationChecklistSectionService.fillShared(solicitorEntity);

    const solicitor: OriginationChecklistSolicitor = { ...solicitorEntity, ...sharedComputed };

    return solicitor;
  }

  async editComments(
    furtherDrawdownId: number,
    furtherType: string,
    Comments: string,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      Comments,
    });
    await this.commandBus.execute(
      new EditCommentOriginationChecklistSolicitor({ FkOriginationChecklistId, content: Comments }, context)
    );
  }
}
