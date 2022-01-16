import { IsIn, IsISO8601, IsString } from 'class-validator';

import { DefaultEvent, DefaultEventType, defaultEventTypes } from '../default-event.interface';

export class CreateDefaultEventDto implements DefaultEvent {
  @IsString()
  @IsIn((defaultEventTypes as unknown) as string[])
  Type: DefaultEventType;

  @IsISO8601({ strict: false })
  Date: string;
}
