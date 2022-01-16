export interface Address {
  readonly Line1: string;
  readonly Line2?: string;
  readonly TownCity: string;
  readonly Postcode: string;
  readonly Country: string;
  Id?: number;
}
