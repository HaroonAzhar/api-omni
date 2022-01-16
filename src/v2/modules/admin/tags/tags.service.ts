import { Injectable } from '@nestjs/common';

import { BaseAdminEntity } from '../baseGeneric/baseAdmin.entity';
import { BaseAdminRepositoryInterface } from '../baseGeneric/baseAdmin.repository.interface';
import { Tag } from './tag.interface';

export abstract class TagsRepositoryInterface extends BaseAdminRepositoryInterface<TagEntity> {
  abstract getTagsByIds(ids: number[]): Tag[] | Promise<Tag[]>;
}

export class TagEntity extends BaseAdminEntity<Tag> implements Tag {
  constructor(tag: Tag) {
    super(tag);
    this.ColorCode = tag.ColorCode;
  }
  ColorCode: string;
}

@Injectable()
export class TagsService {
  constructor(private repository: TagsRepositoryInterface) {}
  async get(currentRecordId?: number | string): Promise<Tag[]> {
    const allTags = await this.repository.getAll();
    return allTags.filter((entity: TagEntity) => entity.IsDeleted === false || entity.Id == currentRecordId);
  }
  async getTagsByIds(ids: number[]): Promise<Tag[]> {
    return await this.repository.getTagsByIds(ids);
  }

  async add(entry: Tag) {
    return await this.repository.create(new TagEntity(entry));
  }
  async update(id: number, entry: Tag) {
    entry.Id = id;
    await this.repository.update(new TagEntity(entry));
  }
  async remove(id: number) {
    const tag = await this.repository.getOne(id);
    if (!tag) {
      throw Error('Not found');
    }
    tag.IsDeleted = true;
    await this.repository.update(tag);
  }

  async getOne(id: number) {
    return await this.repository.getOne(id);
  }
}
