import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, AdjustmentCorrection } from './adjustment-correction.interface';

export class CreatedAdjustmentCorrectionEvent extends BaseEvent {
  content: AdjustmentCorrection;
  constructor(adjustmentCorrection: AdjustmentCorrection, context: EventContext) {
    super(adjustmentCorrection, { ...context, Module: moduleName, Name: CreatedAdjustmentCorrectionEvent.name });
  }
}
