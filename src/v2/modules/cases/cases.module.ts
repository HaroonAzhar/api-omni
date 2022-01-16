import { Module } from '@nestjs/common';

import { CaseRepositoryInterface, CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { CaseRepository } from './cases.repository';
import { CompletedModule } from './completed/completed.module';
import { DipModule } from './dip/dip.module';
import { EnquiryModule } from './enquiry/enquiry.module';
import { CasesIdentificationRepositoryInterface, CasesIdentificationService } from './cases-identification.service';
import { ApplicationModule } from './application/application.module';
import { UsersModule } from '../admin/users/users.module';
import { CaseSummaryModule } from './case-summary/case-summary.module';
import { AssociatedTagsModule } from './associated-tags/associated-tags.module';
import { CrossCollateralisedLoansModule } from './cross-collateralised-loans/cross-collateralised-loans.module';
import { ContactsModule } from '../admin/contacts/contacts.module';

@Module({
  providers: [
    CasesService,
    {
      provide: CaseRepositoryInterface,
      useClass: CaseRepository,
    },
    {
      provide: CasesIdentificationRepositoryInterface,
      useClass: CaseRepository,
    },
    CasesIdentificationService,
  ],
  controllers: [CasesController],
  exports: [CasesService, CasesIdentificationService],
  imports: [
    CompletedModule,
    DipModule,
    EnquiryModule,
    ApplicationModule,
    UsersModule,
    CaseSummaryModule,
    AssociatedTagsModule,
    CrossCollateralisedLoansModule,
    ContactsModule,
  ],
})
export class CasesModule {}
