import { BaseEvent, EventContext } from '@v2/utils/events';

import { Signature, SignatureWithComment } from '../signature/signature.interface';
import { UnderwriterFlowEvent, moduleName, UpdateUnderwriterFlowEntity } from './underwriter-flow.interface';

export class ReturnedUnderwriterFlow extends BaseEvent {
  content: UnderwriterFlowEvent<SignatureWithComment>;
  constructor(content: UnderwriterFlowEvent<SignatureWithComment>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ReturnedUnderwriterFlow.name });
  }
}

export class ApprovedUnderwriterFlow extends BaseEvent {
  content: UnderwriterFlowEvent<Signature>;
  constructor(content: UnderwriterFlowEvent<Signature>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ApprovedUnderwriterFlow.name });
  }
}

export class UpdatedUnderwriterFlow extends BaseEvent {
  content: UnderwriterFlowEvent<UpdateUnderwriterFlowEntity>;
  constructor(content: UnderwriterFlowEvent<UpdateUnderwriterFlowEntity>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: UpdatedUnderwriterFlow.name });
  }
}
