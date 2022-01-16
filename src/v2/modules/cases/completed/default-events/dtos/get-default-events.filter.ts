import { IsISO8601, IsOptional, IsString } from 'class-validator';

import { DefaultEventsFilterQuery } from '../default-event.interface';

export class GetDefaultEventsFilter implements DefaultEventsFilterQuery {
  @IsString()
  @IsOptional()
  Type?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  DateMin?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  DateMax?: string;
}
