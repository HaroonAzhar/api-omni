import { forwardRef, Module } from '@nestjs/common';

import { EnquiryRepositoryInterface, EnquiryService } from './enquiry.service';
import { EnquiryController } from './enquiry.controller';
import { EnquiryRepository } from './enquiry.repository';
import { CasesModule } from '../cases.module';

@Module({
  providers: [EnquiryService, { provide: EnquiryRepositoryInterface, useClass: EnquiryRepository }],
  controllers: [EnquiryController],
  exports: [EnquiryService],
  imports: [forwardRef(() => CasesModule)],
})
export class EnquiryModule {}
