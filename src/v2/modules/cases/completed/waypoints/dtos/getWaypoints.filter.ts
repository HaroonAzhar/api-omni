import { Transform } from 'class-transformer';
import { IsBoolean, IsISO8601, IsOptional, IsString } from 'class-validator';

import { WaypointsFilterQuery } from '../waypoint.interface';

export class GetWaypointsFilter implements WaypointsFilterQuery {
  @IsString()
  @IsOptional()
  Category?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  DueDateMax?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  DueDateMin?: string;

  @IsBoolean()
  @IsOptional()
  @Transform((it) => {
    switch (it) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return it;
    }
  })
  IsCompleted?: boolean;
}
