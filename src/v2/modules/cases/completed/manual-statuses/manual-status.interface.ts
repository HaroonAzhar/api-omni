import { completedStatuses } from '../completed.interface';

export const manualCompletedStatuses = [
  ...completedStatuses.filter((completedStatus) => completedStatus !== 'Performing'),
  'Revert to Automatic Status',
] as const;

export type ManualCompletedStatus = typeof manualCompletedStatuses[number];

export interface ManualStatus {
  ManualStatusId?: number;
  FkCompletedId?: number;
  CreatedDate?: string;
  EffectiveFrom: string;
  Status: ManualCompletedStatus;
  IsDeleted?: boolean;
}

export abstract class ManualStatusesRepositoryInterface {
  abstract create(manualStatus: ManualStatus): Promise<number>;
  abstract findAll(FkCompletedId: number): Promise<ManualStatus[]>;
  abstract update(FkCompletedId: number, ManualStatusId: number, manualStatus: Partial<ManualStatus>): Promise<void>;
}

export const moduleName = 'manual-statuses';

export type DeleteCommandContent = {
  ManualStatusId: number;
};
