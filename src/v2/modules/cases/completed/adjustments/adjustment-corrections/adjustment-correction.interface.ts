export interface AdjustmentCorrection {
  AdjustmentCorrectionId?: number;
  FkAdjustmentId?: number;
  CorrectedAmount: number;
  Description: string;
  CreatedDate?: string;
  CreatedBy?: string;
}

export type CreateAdjustmentCorrection = {
  CorrectedAmount: number;
  Description: string;
  CreatedBy: string;
};

export type SaveAdjustmentCorrection = CreateAdjustmentCorrection & {
  FkAdjustmentId: number;
};

export const moduleName = 'adjustment-corrections';
