import { BaseEvent, EventContext } from '@v2/utils/events';

import { Signature, SignatureWithComment } from '../signature/signature.interface';
import { OriginationChecklistEvent, moduleName } from './origination-checklist.interface';

export class AddedPrimarySignatureOriginationChecklist extends BaseEvent {
  content: OriginationChecklistEvent<Signature>;
  constructor(content: OriginationChecklistEvent<Signature>, context: EventContext, moduleName: string) {
    super(content, { ...context, Module: moduleName, Name: AddedPrimarySignatureOriginationChecklist.name });
  }
}

export class AddedSecondarySignatureOriginationChecklist extends BaseEvent {
  signature: Signature;
  constructor(content: OriginationChecklistEvent<Signature>, context: EventContext, moduleName: string) {
    super(content, { ...context, Module: moduleName, Name: AddedSecondarySignatureOriginationChecklist.name });
  }
}

export class InitialCheckedOriginationChecklist extends BaseEvent {
  content: OriginationChecklistEvent<Signature>;
  constructor(content: OriginationChecklistEvent<Signature>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: InitialCheckedOriginationChecklist.name });
  }
}

export class FinalSignedOfOriginationChecklist extends BaseEvent {
  signature: Signature;
  constructor(content: OriginationChecklistEvent<Signature>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: FinalSignedOfOriginationChecklist.name });
  }
}

export class ClosedOriginationChecklist extends BaseEvent {
  content: OriginationChecklistEvent<SignatureWithComment>;
  constructor(content: OriginationChecklistEvent<SignatureWithComment>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ClosedOriginationChecklist.name });
  }
}

export class SubmitedToUnderwriterOriginationChecklist extends BaseEvent {
  signature: Signature;
  constructor(content: OriginationChecklistEvent<Signature>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: SubmitedToUnderwriterOriginationChecklist.name });
  }
}
