import { AdjustmentCorrection } from './adjustment-corrections/adjustment-correction.interface';

export const balanceEffects = ['Increase', 'Reduce'] as const;
export type BalanceEffect = typeof balanceEffects[number];

export interface Adjustment {
  AdjustmentId?: number;
  FkCompletedId?: number;
  TransactionType: string;
  BalanceEffect: BalanceEffect;
  ActualDate: string;
  amount: number;
  Description?: string;
  Date?: string;
}

export type CreateAdjustment = {
  TransactionType: string;
  BalanceEffect: BalanceEffect;
  ActualDate: string;
  Amount: number;
  Description?: string;
  Date?: string;
  InternalNote?: string;
};

export type SaveAdjustment = Omit<CreateAdjustment, 'Amount'> & {
  FkCompletedId: number;
};

export type AdjustmentWithCorrections = Adjustment & {
  corrections: AdjustmentCorrection[];
};

export interface AdjustmentsFilterQuery {
  TransactionType?: string;
  ActualDateMin?: string;
  ActualDateMax?: string;
}

export const adjustmentInitialCorrection = 'Adjustment Initial';
export const adjustmentCancellationCorrection = 'Adjustment Cancellation';
