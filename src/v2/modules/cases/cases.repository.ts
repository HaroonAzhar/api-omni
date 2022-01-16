import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';
import Knex from 'knex';

import { Case } from './case.interface';
import { CaseRepositoryInterface } from './cases.service';

interface CaseStatus {
  Status: string;
  CaseStatusId: number;
}
@Injectable()
export class CaseRepository extends CaseRepositoryInterface {
  private caseTable = 'Origination.Case';
  private caseStatusTable = 'Origination.CaseStatus';

  private dipTable = 'Origination.Dip';
  private dipContactValueTable = 'Origination.DipContactValue';
  private dipFinancialDetailsTable = `Origination.DipLoanFinancialDetails`;
  private dipSecurityMappingTable = `Origination.DipSecurityDipMapping`;
  private dipSecurityTable = `Origination.DipSecurity`;
  private associatedTagsTable = `Origination.AssociatedCasesAndTags`;
  private tagsTable = `OriginationAdmin.Tags`;
  private readonly dipBrokersTable = 'Origination.DipBroker';
  private usersTable = 'OriginationAdmin.Users';
  private contactsTable = 'OriginationAdmin.Contacts';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async getAll(CaseNr?: string): Promise<Case[]> {
    const selectColumns = [
      'CaseNr',
      `${this.caseTable}.Id`,
      `${this.caseTable}.CaseId`,
      `DipId`,
      `${this.caseTable}.CreatedAt`,
      'Stage',
      'LoanTerm',
      'GrossTotalLoanAmount',
      'EditingAsDip',
      `${this.caseStatusTable}.Name as Status`,
      `FkContactId`,
      `Applicants`,
      `${this.usersTable}.Name as AssignedUserName`,
    ];
    let query = this.knex(this.caseTable)
      .leftJoin(this.caseStatusTable, `${this.caseTable}.FkCaseStatusId`, `${this.caseStatusTable}.CaseStatusId`)
      .leftJoin(this.dipTable, `${this.dipTable}.FkCaseId`, `${this.caseTable}.CaseId`)
      .leftJoin(
        this.dipFinancialDetailsTable,
        `${this.dipTable}.FkLoanFinancialDetailsId`,
        `${this.dipFinancialDetailsTable}.LoanFinancialDetailsId`
      )
      .leftJoin(this.usersTable, `${this.usersTable}.Id`, `${this.caseTable}.FkAssignedUserId`)
      .orderBy(`${this.caseTable}.CreatedAt`);
    if (CaseNr !== undefined) {
      query = query.where({ CaseNr });
    }
    const casesData = await query.select<Case[]>(selectColumns);
    interface Response extends Case {
      DipId: number;
      FkContactId: number;
      CaseId: number;
    }

    const transformedCases = Promise.all(
      casesData.map(async ({ DipId, FkContactId, CaseId, ...rest }: Response) => {
        const associatedTags = await this.getAssociatedTags(CaseId);
        const securities = await this.getSecurities(DipId);
        const contacts = await this.getContacts(FkContactId);
        return {
          securities,
          ...rest,
          Applicants:
            contacts
              .map((contact) => contact.Name ?? [contact.Forename, contact.Surname].filter(Boolean).join(' '))
              .join(', ') || rest.Applicants,
          associatedTags,
        };
      })
    );
    return transformedCases;
  }
  private async getAssociatedTags(caseId: number) {
    const associatedTags = await this.knex(this.associatedTagsTable)
      .leftJoin(this.tagsTable, `${this.associatedTagsTable}.FkTagId`, `${this.tagsTable}.Id`)
      .where({ FkCaseId: caseId });
    return associatedTags;
  }

  private async getSecurities(DipId: number) {
    const securities = await this.knex(this.dipSecurityMappingTable)
      .leftJoin(
        this.dipSecurityTable,
        `${this.dipSecurityMappingTable}.FkSecurityId`,
        `${this.dipSecurityTable}.SecurityId`
      )
      .where({ FkDipId: DipId });
    return securities;
  }

  private async getContacts(FkContactId: number) {
    if (FkContactId) {
      return await this.knex(this.dipContactValueTable)
        .where({ FkContactId })
        .leftJoin(this.contactsTable, `${this.dipContactValueTable}.FkSharedContactId`, `${this.contactsTable}.Id`);
    }
    return [];
  }

  private async get(query: Knex.QueryBuilder): Promise<Case> {
    const [matchingCase] = await query.leftJoin(
      this.caseStatusTable,
      `${this.caseTable}.FkCaseStatusId`,
      `${this.caseStatusTable}.CaseStatusId`
    );
    if (matchingCase) {
      matchingCase.Status = matchingCase.Name;
    }
    return matchingCase;
  }

  async getByCaseUuid(caseUuid: string): Promise<Case> {
    const query = this.knex(this.caseTable).select<Case[]>().where({ Id: caseUuid });
    return this.get(query);
  }

  async getByCaseId(CaseId: number): Promise<Case> {
    const query = this.knex(this.caseTable).select<Case[]>().where({ CaseId });
    return this.get(query);
  }

  async updateByCaseUuid(caseUuid: string, caseData: Case) {
    const { Status, ...restCaseData } = caseData;

    if (Status) {
      const [{ CaseStatusId }] = await this.knex(this.caseStatusTable).select<CaseStatus[]>().where({ Name: Status });
      restCaseData.FkCaseStatusId = CaseStatusId;
    }
    await this.knex(this.caseTable).update(restCaseData).where({ Id: caseUuid });
  }
  async getCasesByBrokerId(brokerId: number): Promise<Case[]> {
    const associatedCases = await this.knex(this.dipTable)
      .select(`${this.caseTable}.*`)
      .leftJoin(this.dipBrokersTable, `${this.dipBrokersTable}.BrokerId`, `${this.dipTable}.FkBrokerId`)
      .leftJoin(this.caseTable, `${this.caseTable}.CaseId`, `${this.dipTable}.FkCaseId`)
      .where({ FkBrokerCompanyId: brokerId });
    return associatedCases;
  }
}
