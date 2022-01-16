import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLtvDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly GrResFCRB: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly GrComFCRB: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly GrD1ResDevFCRB: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly GDResDevFCRB: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly GrComFCNS: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly GrResFCNS: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly GrComSCRB: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly GrComSCNS: number;
}

export interface Ltv {
  GrResFCRB: number;
  GrComFCRB: number;
  GrD1ResDevFCRB: number;
  GDResDevFCRB: number;
  GrComFCNS: number;
  GrResFCNS: number;
  GrComSCRB: number;
  GrComSCNS: number;
  CreatedAt: Date;
}

export interface HistoricalLtv extends Ltv {
  ExpiredAt: Date | null;
}

export abstract class LtvRepositoryInterface {
  abstract create(record: CreateLtvDto): Promise<void>;

  abstract getNewest(): Promise<Ltv | null>;

  abstract getHistorical(offset: number, limit: number): Promise<Ltv[] | null>;

  abstract getHistoricalCount(): Promise<number>;
}
