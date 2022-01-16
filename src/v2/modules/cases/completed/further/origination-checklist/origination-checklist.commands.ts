import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { Signature, SignatureWithComment } from '../signature/signature.interface';
import { OriginationChecklistEvent, moduleName } from './origination-checklist.interface';

export class AddPrimarySignatureOriginationChecklist extends BaseCommand {
  content: OriginationChecklistEvent<Signature>;
  constructor(content: OriginationChecklistEvent<Signature>, context: CommandContext, readonly moduleName: string) {
    super(content, { ...context, Module: moduleName, Name: AddPrimarySignatureOriginationChecklist.name });
  }
}

export class AddSecondarySignatureOriginationChecklist extends BaseCommand {
  content: OriginationChecklistEvent<Signature>;
  constructor(content: OriginationChecklistEvent<Signature>, context: CommandContext, readonly moduleName: string) {
    super(content, { ...context, Module: moduleName, Name: AddSecondarySignatureOriginationChecklist.name });
  }
}

export class InitialCheckOriginationChecklist extends BaseCommand {
  content: OriginationChecklistEvent<Signature>;
  constructor(content: OriginationChecklistEvent<Signature>, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: InitialCheckOriginationChecklist.name });
  }
}

export class FinalSignOfOriginationChecklist extends BaseCommand {
  content: OriginationChecklistEvent<Signature>;
  constructor(content: OriginationChecklistEvent<Signature>, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: FinalSignOfOriginationChecklist.name });
  }
}

export class CloseOriginationChecklist extends BaseCommand {
  content: OriginationChecklistEvent<SignatureWithComment>;
  constructor(content: OriginationChecklistEvent<SignatureWithComment>, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: CloseOriginationChecklist.name });
  }
}

export class SubmitToUnderwriterOriginationChecklist extends BaseCommand {
  content: OriginationChecklistEvent<Signature>;
  constructor(content: OriginationChecklistEvent<Signature>, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: SubmitToUnderwriterOriginationChecklist.name });
  }
}
