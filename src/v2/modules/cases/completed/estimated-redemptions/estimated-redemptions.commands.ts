import { BaseCommand, CommandContext } from '@v2/utils/commands';

import {
  EstimatedRedemption,
  UpdateEstimatedRedemption,
  moduleName,
  DeleteEstimatedRedemption,
} from './estimated-redemption.interface';

export class CreateEstimatedRedemptionCommand extends BaseCommand {
  content: EstimatedRedemption;
  constructor(estimatedRedemption: EstimatedRedemption, context: CommandContext) {
    super(estimatedRedemption, { ...context, Module: moduleName, Name: CreateEstimatedRedemptionCommand.name });
  }
}

export class UpdateEstimatedRedemptionCommand extends BaseCommand {
  content: UpdateEstimatedRedemption;
  constructor(estimatedRedemption: UpdateEstimatedRedemption, context: CommandContext) {
    super(estimatedRedemption, { ...context, Module: moduleName, Name: UpdateEstimatedRedemptionCommand.name });
  }
}

export class DeleteEstimatedRedemptionCommand extends BaseCommand {
  content: DeleteEstimatedRedemption;
  constructor(estimatedRedemption: DeleteEstimatedRedemption, context: CommandContext) {
    super(estimatedRedemption, { ...context, Module: moduleName, Name: DeleteEstimatedRedemptionCommand.name });
  }
}
