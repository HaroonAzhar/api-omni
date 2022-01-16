import { Address } from '@v2/modules/address/address.interface';
import { IsString, IsOptional } from 'class-validator';

export class AddressDto implements Address {
  @IsString()
  readonly Line1: string;

  @IsOptional()
  @IsString()
  readonly Line2?: string;

  @IsString()
  readonly Postcode: string;

  @IsString()
  readonly TownCity: string;

  @IsString()
  readonly Country: string;
}
