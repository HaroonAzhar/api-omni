export type CreateContact = {
  readonly Forename: string;
  readonly Surname: string;
  readonly MiddleName?: string;
  readonly DateOfBirth?: string;
  readonly NationalInsuranceNumber?: string;
};

export type Contact = CreateContact & {
  readonly Id: number;
};

export type UpdateContact = Partial<CreateContact>;

export type CreateContactEntity = CreateContact;

export type ContactEntity = CreateContactEntity & {
  readonly Id: number;

  readonly CreatedAt: Date;
  readonly IsDeleted: boolean;

  readonly ProofOfId: string;
  readonly ProofOfIdExpiryDate: string;
};

export type UpdateContactEntity = Partial<Omit<ContactEntity, 'Id'>>;
