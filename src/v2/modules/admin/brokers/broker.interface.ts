import { Case } from '@v2/modules/cases/case.interface';

export type BrokerIndividual = {
  readonly ContactName: string;
  readonly ContactEmail: string;
  readonly Id: number;
};

export type CreateBrokerIndividual = Omit<BrokerIndividual, 'Id'>;

export type CreateBrokerIndividualEntity = CreateBrokerIndividual & {
  readonly FkBrokerId: number;
};

export type UpdateBrokerIndividual = Partial<BrokerIndividual>;

export type UpdateBrokerIndividualEntity = Omit<UpdateBrokerIndividual, 'Id'> & {
  readonly IsDeleted?: boolean;
};

export type BrokerIndividualEntity = CreateBrokerIndividualEntity & {
  readonly CreatedAt: Date;
  readonly IsDeleted: boolean;
  readonly Id: number;
};

export type Broker = {
  readonly CompanyName: string;
  readonly isApproved: boolean;
  readonly Id?: number;
  readonly associatedCases?: Case[];

  readonly individualBrokers: BrokerIndividual[];
};

export type CreateBroker = Omit<Broker, 'individualBrokers'> & {
  readonly individualBrokers?: CreateBrokerIndividual[];
};

export type UpdateBroker = Omit<Partial<Broker>, 'individualBrokers'> & {
  individualBrokers?: UpdateBrokerIndividual[];
};

export type CreateBrokerEntity = Pick<CreateBroker, 'CompanyName'> & {
  readonly DateApproved?: Date;
};

export type BrokerEntity = CreateBrokerEntity & {
  readonly Id: number;

  readonly CreatedAt: Date;
  readonly IsDeleted: boolean;
};

export type UpdateBrokerEntity = Partial<Omit<BrokerEntity, 'Id'>>;
