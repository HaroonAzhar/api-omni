import { Address } from '@v2/modules/address/address.interface';

export interface Solicitor {
  readonly Name?: string;
  Id?: number;
  readonly Address?: Address;
}
