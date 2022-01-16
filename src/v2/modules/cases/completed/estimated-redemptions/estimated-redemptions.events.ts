import { BaseEvent, EventContext } from '@v2/utils/events';

import {
  moduleName,
  EstimatedRedemption,
  UpdateEstimatedRedemption,
  DeleteEstimatedRedemption,
} from './estimated-redemption.interface';

export class CreatedEstimatedRedemptionEvent extends BaseEvent {
  content: EstimatedRedemption;
  constructor(estimatedRedemption: EstimatedRedemption, context: EventContext) {
    super(estimatedRedemption, { ...context, Module: moduleName, Name: CreatedEstimatedRedemptionEvent.name });
  }
}

export class UpdatedEstimatedRedemptionEvent extends BaseEvent {
  content: UpdateEstimatedRedemption;
  constructor(estimatedRedemption: UpdateEstimatedRedemption, context: EventContext) {
    super(estimatedRedemption, { ...context, Module: moduleName, Name: UpdatedEstimatedRedemptionEvent.name });
  }
}

export class DeletedEstimatedRedemptionEvent extends BaseEvent {
  content: DeleteEstimatedRedemption;
  constructor(estimatedRedemption: DeleteEstimatedRedemption, context: EventContext) {
    super(estimatedRedemption, { ...context, Module: moduleName, Name: DeletedEstimatedRedemptionEvent.name });
  }
}
