import { Contact } from '@v2/modules/admin/contacts/contact.interface';

export type Applicant = Contact & {
  Email: string;
};

type ContactIndividual = {
  applicants: Applicant[];
};

type DipIndividualContacts = ContactIndividual & {
  ContactType: 'individual';
};

type ContactCompany = {
  CompanyName: string;
  CompanyNumber: string;
  CompanyEmail: string;
};

type DipCompanyContact = ContactCompany & {
  ContactType: 'company';
};

export type DipContact = DipCompanyContact | DipIndividualContacts;

export type ChangeIndividual = {
  FkSharedContactId: number;
  Email: string;
};
export type ChangeContactIndividual = {
  contacts: ChangeIndividual[];
};

export type ChangeContactIndividualContent = {
  ContactType: 'individual';
} & ChangeContactIndividual;

export type ChangeContactCompanyContent = {
  ContactType: 'company';
} & ContactCompany;

export type ChangeContactCommandContent = (ChangeContactCompanyContent | ChangeContactIndividualContent) & {
  FkCaseId?: number;
};
