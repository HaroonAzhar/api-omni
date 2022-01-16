export type UnderwriterFlowEntity = {
  UnderwriterFlowId: number;
  FkFurtherId: number;
  FurtherType: string;

  FkUnderwriterId?: number;

  WriteUpDate?: Date;
  AssessmentOfExitViability?: string;
  DescriptionOfWorks?: string;
  AssessmentOfProgress?: string;
  RisksConcerns?: string;

  UnderwriterApprovalDate?: Date;

  ReturnDate?: Date;
  ReturnComment?: string;
};

export type CreateUnderwriterFlowEntity = Omit<UnderwriterFlowEntity, 'UnderwriterFlowId'>;

export type UpdateUnderwriterFlowEntity = Omit<CreateUnderwriterFlowEntity, 'FkFurtherId' | 'FurtherType'>;

export type UnderwriterFlow = UnderwriterFlowEntity;

export const moduleName = 'underwriter-flow';

export abstract class UnderwriterFlowRepositoryInterface {
  abstract create(UnderwriterFlow: CreateUnderwriterFlowEntity): Promise<number>;
  abstract get(FkFurtherId: number, FurtherType: string): Promise<UnderwriterFlowEntity>;
  abstract update(
    FkFurtherId: number,
    FurtherType: string,
    underwriterFlow: UpdateUnderwriterFlowEntity
  ): Promise<void>;
}

export type UnderwriterFlowEvent<Content> = {
  FkFurtherId: number;
  FurtherType: string;
  content: Content;
};
