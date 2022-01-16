import { BaseCommand, CommandContext } from '@v2/utils/commands';

import {
  moduleName,
  OriginationChecklistLandRegistryResultEntity,
} from './origination-checklist-land-registry.interface';

export class AddOriginationChecklistLandRegistryResultEntity extends BaseCommand {
  content: OriginationChecklistLandRegistryResultEntity;
  constructor(content: OriginationChecklistLandRegistryResultEntity, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: AddOriginationChecklistLandRegistryResultEntity.name });
  }
}
