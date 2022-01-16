import { BaseCommand, CommandContext } from '@v2/utils/commands';

import {
  moduleName,
  OriginationChecklistLandChargesResultEntity,
  UpdateOriginationChecklistLandChargesResultEntity,
} from './origination-checklist-land-charges.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class MarkCheckFacilityLetter extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: MarkCheckFacilityLetter.name });
  }
}

export class AddResult extends BaseCommand {
  content: OriginationChecklistLandChargesResultEntity;
  constructor(content: OriginationChecklistLandChargesResultEntity, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: AddResult.name });
  }
}

export class UpdateResult extends BaseCommand {
  content: UpdateOriginationChecklistLandChargesResultEntity;
  constructor(content: UpdateOriginationChecklistLandChargesResultEntity, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: UpdateResult.name });
  }
}
