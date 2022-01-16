import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { CreateEnquiryEntity, EnquiryEntity, UpdateEnquiryEntity } from './enquiry.interface';
import { EnquiryRepositoryInterface } from './enquiry.service';

@Injectable()
export class EnquiryRepository extends EnquiryRepositoryInterface {
  private enquiryTable = 'Origination.Enquiry';
  private dipBuildingTypeTable = `Origination.DipBuildingType`;

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async getByCaseId(FkCaseId: number): Promise<EnquiryEntity | undefined> {
    const [matchingEnquiry] = await this.knex(this.enquiryTable).select<EnquiryEntity[]>().where({ FkCaseId });

    return matchingEnquiry;
  }

  async create(enquiry: CreateEnquiryEntity): Promise<number> {
    const [Id] = await this.knex(this.enquiryTable).insert(enquiry, ['EnquiryId']);
    return Id;
  }

  async update(enquiry: UpdateEnquiryEntity): Promise<number> {
    const { EnquiryId, ...rest } = enquiry;
    await this.knex(this.enquiryTable).update(rest).where({ FkCaseId: enquiry.FkCaseId, EnquiryId });
    return enquiry.EnquiryId;
  }
}
