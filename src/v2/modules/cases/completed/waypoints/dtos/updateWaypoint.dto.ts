import { Type } from 'class-transformer';
import { IsISO8601, IsString, IsOptional, IsMilitaryTime, IsBoolean, ValidateIf } from 'class-validator';

import { Waypoint } from '../waypoint.interface';

export class UpdateWaypointDto implements Waypoint {
  @IsISO8601({ strict: false })
  @IsOptional()
  DueDate: string;

  @IsString()
  @IsOptional()
  Name: string;

  @IsMilitaryTime()
  @IsOptional()
  DueTime: string;

  @IsBoolean()
  @Type(() => Boolean)
  IsCompleted: boolean;

  @IsString()
  @IsOptional()
  Category: string;

  @IsString()
  @IsOptional()
  Notes?: string;

  @IsString()
  @ValidateIf((o) => o.Name === 'Other')
  OtherWaypointDescription?: string;
}
