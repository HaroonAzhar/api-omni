import { IsNumber } from 'class-validator';

import { AssociatedTag } from './../associated-tags.interface';

export class CreateAssociatedTagDto implements AssociatedTag {
  @IsNumber()
  FkTagId: number;
}
