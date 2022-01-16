export type SecurityNoteEntity = {
  SecurityNoteId: number;
  FkSecurityId: number;
  Text: string;
  CreatedBy: string;
  CreatedDate: string;
};

export type CreateSecurityNoteEntity = Omit<SecurityNoteEntity, 'SecurityNoteId' | 'CreatedDate'>;

export type SecurityNote = SecurityNoteEntity;

export type CreateSecurityNote = Omit<CreateSecurityNoteEntity, 'FkSecurityId'>;
