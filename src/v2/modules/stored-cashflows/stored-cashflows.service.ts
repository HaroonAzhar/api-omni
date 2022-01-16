import { Injectable } from '@nestjs/common';
import { CommandContext } from '@v2/utils/commands';

import {
  StoredCashflow,
  CreateStoredCashflow,
  CreateStoredCashflowEntity,
  StoredCashflowEntity,
} from './stored-cashflow.interface';

export abstract class StoredCashflowsRepositoryInterface {
  abstract create(storedCashflow: CreateStoredCashflowEntity): Promise<number>;
  abstract findForDates(dateMin: string, dateMax: string): Promise<StoredCashflowEntity[]>;
}

@Injectable()
export class StoredCashflowsService {
  constructor(private readonly storedCashflowRepository: StoredCashflowsRepositoryInterface) {}

  async createStoredCashflow(
    storedCashflow: CreateStoredCashflow,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    return this.storedCashflowRepository.create({ ...storedCashflow, CreatedBy: context.User });
  }

  async findInRange(dateMin: string, dateMax: string): Promise<StoredCashflow[]> {
    return this.storedCashflowRepository.findForDates(dateMin, dateMax);
  }
}
