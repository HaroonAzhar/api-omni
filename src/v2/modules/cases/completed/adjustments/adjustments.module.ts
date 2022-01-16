import { forwardRef, Module } from '@nestjs/common';

import { CompletedModule } from '../completed.module';
import { AdjustmentCorrectionsModule } from './adjustment-corrections/adjustment-corrections.module';
import { AdjustmentsController } from './adjustments.controller';
import { AdjustmentsRepository } from './adjustments.repository';
import { AdjustmentsService, AdjustmentsRepositoryInterface } from './adjustments.service';

@Module({
  controllers: [AdjustmentsController],
  providers: [AdjustmentsService, { provide: AdjustmentsRepositoryInterface, useClass: AdjustmentsRepository }],
  exports: [AdjustmentsService],
  imports: [forwardRef(() => CompletedModule), AdjustmentCorrectionsModule],
})
export class AdjustmentsModule {}
