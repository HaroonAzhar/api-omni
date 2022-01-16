import { Signature } from '../../signature/signature.interface';

export type OriginationChecklistSectionFields = {
  FkOriginationChecklistId: number;

  PrimarySignatureUser?: string;
  PrimarySignatureDate?: Date;

  SecondarySignatureUser?: string;
  SecondarySignatureDate?: Date;
};

export type CreateOriginationChecklistSectionEntity = Pick<
  OriginationChecklistSectionFields,
  'FkOriginationChecklistId'
>;

export type OriginationChecklistSectionComputedFields = {
  primarySignature?: Signature;
  secondarySignature?: Signature;
};
