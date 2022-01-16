import { Module } from '@nestjs/common';

import { StoredCashflowsService, StoredCashflowsRepositoryInterface } from './stored-cashflows.service';
import { StoredCashflowsController } from './stored-cashflows.controller';
import { StoredCashflowsRepository } from './stored-cashflows.repository';

@Module({
  providers: [
    StoredCashflowsService,
    { provide: StoredCashflowsRepositoryInterface, useClass: StoredCashflowsRepository },
  ],
  exports: [StoredCashflowsService],
  controllers: [StoredCashflowsController],
})
export class StoredCashflowModule {}
