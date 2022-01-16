import { ICommand } from '@nestjs/cqrs';

export class CommandContext {
  Trigger: string;
  User: string;
  Module?: string;
  CreatedDate?: string;
  Name?: string;
}
export class BaseCommand implements ICommand {
  constructor(public readonly content: Record<string, any>, public readonly context: CommandContext) {}
}
