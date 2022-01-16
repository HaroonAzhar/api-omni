import { IEvent } from '@nestjs/cqrs';

export class EventContext {
  CommandId: number;
  CreatedDate?: string;
  Name?: string;
  Module?: string;
}
export class BaseEvent implements IEvent {
  constructor(public readonly content: Record<string, any>, public readonly context: EventContext) {}
}
