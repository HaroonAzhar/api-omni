import { IsNumber } from 'class-validator';

export class AssignUserToCaseDto {
  @IsNumber()
  UserId: number;
}
