import { BaseCommand, CommandContext } from '@v2/utils/commands';

import {
  CreateCrossCollateralisedLoanEntity,
  moduleName,
  DeleteCrossCollateralisedLoan,
} from './cross-collateralised-loan.interface';

export class CreateCrossCollateralisedLoanCommand extends BaseCommand {
  content: CreateCrossCollateralisedLoanEntity;
  constructor(CrossCollateralisedLoan: CreateCrossCollateralisedLoanEntity, context: CommandContext) {
    super(CrossCollateralisedLoan, { ...context, Module: moduleName, Name: CreateCrossCollateralisedLoanCommand.name });
  }
}

export class DeleteCrossCollateralisedLoanCommand extends BaseCommand {
  content: DeleteCrossCollateralisedLoan;
  constructor(CrossCollateralisedLoan: DeleteCrossCollateralisedLoan, context: CommandContext) {
    super(CrossCollateralisedLoan, { ...context, Module: moduleName, Name: DeleteCrossCollateralisedLoanCommand.name });
  }
}
