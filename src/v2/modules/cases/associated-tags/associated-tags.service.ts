import { TagsService } from '@v2/modules/admin/tags/tags.service';
import { Injectable } from '@nestjs/common';

import { CasesIdentificationService } from '../cases-identification.service';

export abstract class AssociatedTagsRepositoryInterface {
  abstract getAllTagsIdsForCase(CaseId: number): Promise<number[]>;
  abstract addTagToCase(CaseId: number, TagId: number): Promise<number>;
  abstract removeAssociatedTag(CaseId: number, TagId: number): Promise<number>;
}

@Injectable()
export class AssociatedTagsService {
  constructor(
    private readonly associatedTagsRepository: AssociatedTagsRepositoryInterface,
    private readonly casesIdentificationService: CasesIdentificationService,
    private readonly tagsService: TagsService
  ) {}

  async removeAssociatedTag(caseUuid: string, TagId: number) {
    const { CaseId } = await this.casesIdentificationService.getByCaseUuid(caseUuid);
    return this.associatedTagsRepository.removeAssociatedTag(CaseId, TagId);
  }
  async addTagToCase(caseUuid: string, TagId: number) {
    const { CaseId } = await this.casesIdentificationService.getByCaseUuid(caseUuid);
    return this.associatedTagsRepository.addTagToCase(CaseId, TagId);
  }
  async getAllTagsForCase(caseUuid: string) {
    const { CaseId } = await this.casesIdentificationService.getByCaseUuid(caseUuid);
    const tagIds = await this.associatedTagsRepository.getAllTagsIdsForCase(CaseId);
    return await this.tagsService.getTagsByIds(tagIds);
  }
}
