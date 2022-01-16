import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsString,
  IsOptional,
  IsMilitaryTime,
  IsBoolean,
  IsIn,
  IsNumber,
  IsPositive,
  ValidateIf,
} from 'class-validator';

import { Waypoint, recurringEventOptions, RecurringEvent } from '../waypoint.interface';

export class CreateWaypointDto implements Waypoint {
  @IsISO8601({ strict: false })
  DueDate: string;

  @IsString()
  Name: string;

  @IsMilitaryTime()
  @IsOptional()
  DueTime: string;

  @IsBoolean()
  @Type(() => Boolean)
  IsCompleted: boolean;

  @IsString()
  Category: string;

  @IsString()
  @IsOptional()
  Notes?: string;

  @IsString()
  @IsIn((recurringEventOptions as unknown) as any[])
  RecurringEvent: RecurringEvent;

  @ValidateIf((o) => o.RecurringEvent !== recurringEventOptions[0])
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  NumberOfTimesToRepeat?: number;

  @ValidateIf((o) => o.Name === 'Other')
  @IsString()
  OtherWaypointDescription?: string;
}
