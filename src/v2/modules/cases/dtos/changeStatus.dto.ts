import { IsIn, IsString } from 'class-validator';

import { Status, statuses } from '../case.interface';
export class ChangeStatusDto {
  @IsString()
  @IsIn((statuses as unknown) as string[])
  readonly Status: Status;
}
