import { BaseEvent, EventContext } from '@v2/utils/events';

import {
  moduleName,
  CreateCrossCollateralisedLoanEntity,
  DeleteCrossCollateralisedLoan,
} from './cross-collateralised-loan.interface';

export class CreatedCrossCollateralisedLoanEvent extends BaseEvent {
  content: CreateCrossCollateralisedLoanEntity;
  constructor(CrossCollateralisedLoan: CreateCrossCollateralisedLoanEntity, context: EventContext) {
    super(CrossCollateralisedLoan, { ...context, Module: moduleName, Name: CreatedCrossCollateralisedLoanEvent.name });
  }
}

export class DeletedCrossCollateralisedLoanEvent extends BaseEvent {
  content: DeleteCrossCollateralisedLoan;
  constructor(CrossCollateralisedLoan: DeleteCrossCollateralisedLoan, context: EventContext) {
    super(CrossCollateralisedLoan, { ...context, Module: moduleName, Name: DeletedCrossCollateralisedLoanEvent.name });
  }
}
