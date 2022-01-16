import { forwardRef, Module } from '@nestjs/common';
import { UnderwritersModule } from '@v2/modules/admin/underwriters/underwriters.module';

import { CasesModule } from '../cases.module';
import { DipModule } from '../dip/dip.module';
import { CaseSummaryController } from './case-summary.controller';
import { CaseSummaryRepository } from './case-summary.repository';
import { CaseSummaryService, CaseSummaryRepositoryInterface } from './case-summary.service';

@Module({
  controllers: [CaseSummaryController],
  providers: [CaseSummaryService, { provide: CaseSummaryRepositoryInterface, useClass: CaseSummaryRepository }],
  exports: [CaseSummaryService],
  imports: [UnderwritersModule, forwardRef(() => CasesModule), DipModule],
})
export class CaseSummaryModule {}
