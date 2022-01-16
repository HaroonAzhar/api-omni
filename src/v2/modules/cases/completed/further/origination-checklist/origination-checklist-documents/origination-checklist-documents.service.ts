import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import {
  CreateOriginationChecklistDocumentsEntity,
  OriginationChecklistDocumentsEntity,
  OriginationChecklistDocuments,
  UpdateOriginationChecklistDocumentsEntity,
  moduleName,
} from './origination-checklist-documents.interface';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistDocumentsRepositoryInterface {
  abstract create(documents: CreateOriginationChecklistDocumentsEntity): Promise<number>;
  abstract update(
    FkOriginationChecklistId: number,
    documents: UpdateOriginationChecklistDocumentsEntity
  ): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistDocumentsEntity>;
}

@Injectable()
export class OriginationChecklistDocumentsService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;

  constructor(
    protected readonly repository: OriginationChecklistDocumentsRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus
  ) {
    super();
  }

  async createDocuments(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getDocuments(FkOriginationChecklistId: number): Promise<OriginationChecklistDocuments> {
    const documentsEntity = await this.repository.get(FkOriginationChecklistId);

    return OriginationChecklistDocumentsService.fillDocuments(documentsEntity);
  }
  static fillDocuments(documentsEntity: OriginationChecklistDocumentsEntity): OriginationChecklistDocuments {
    const sharedComputed = OriginationChecklistSectionService.fillShared(documentsEntity);

    const documents: OriginationChecklistDocuments = { ...documentsEntity, ...sharedComputed };

    return documents;
  }
}
