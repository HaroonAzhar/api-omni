import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { Signature, SignatureWithComment } from '../signature/signature.interface';
import { UpdateUnderwriterFlowEntity, moduleName, UnderwriterFlowEvent } from './underwriter-flow.interface';

export class UpdateUnderwriterFlow extends BaseCommand {
  content: UnderwriterFlowEvent<UpdateUnderwriterFlowEntity>;
  constructor(content: UnderwriterFlowEvent<UpdateUnderwriterFlowEntity>, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: UpdateUnderwriterFlow.name });
  }
}

export class ApproveUnderwriterFlow extends BaseCommand {
  content: UnderwriterFlowEvent<Signature>;
  constructor(content: UnderwriterFlowEvent<Signature>, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ApproveUnderwriterFlow.name });
  }
}

export class ReturnUnderwriterFlow extends BaseCommand {
  content: UnderwriterFlowEvent<SignatureWithComment>;
  constructor(content: UnderwriterFlowEvent<SignatureWithComment>, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ReturnUnderwriterFlow.name });
  }
}
