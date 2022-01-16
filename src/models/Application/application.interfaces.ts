export type ShareholderCompany = {
  company: Array<Shareholder>;
  isCompany: true;
  company_number: string;
};

export type ShareholderIndividual = {
  isCompany: false;
};

export type Shareholder = (ShareholderCompany | ShareholderIndividual) & {
  held?: number;
  name?: string;
  fk_shared_contact_id?: number;
  links: string;
};

export interface Director {
  name?: string;
  fk_shared_contact_id?: number;

  links: string;
}

export interface Individual {
  links: string;
  fk_shared_contact_id?: number;
  applicant_id?: number;
}
