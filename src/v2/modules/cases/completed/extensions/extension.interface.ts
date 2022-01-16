export interface Extension {
  ExtensionId?: number;
  FkCompletedId?: number;
  CreatedDate?: string;
  FromDate?: string;
  InterestRate: number;
  Date: string;
}

export abstract class ExtensionsRepositoryInterface {
  abstract create(defaultEvent: Extension): Promise<number>;
  abstract findAll(FkCompletedId: number): Promise<Extension[]>;
}

export const moduleName = 'extensions';
