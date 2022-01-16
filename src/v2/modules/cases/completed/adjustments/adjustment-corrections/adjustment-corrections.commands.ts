import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { AdjustmentCorrection, moduleName } from './adjustment-correction.interface';

export class CreateAdjustmentCorrectionCommand extends BaseCommand {
  content: AdjustmentCorrection;
  constructor(adjustmentCorrection: AdjustmentCorrection, context: CommandContext) {
    super(adjustmentCorrection, { ...context, Module: moduleName, Name: CreateAdjustmentCorrectionCommand.name });
  }
}
