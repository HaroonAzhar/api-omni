export interface Note {
  NoteId?: number;
  FkCompletedId?: number;
  CreatedDate?: string;
  CreatedBy?: string;
  Text: string;
}

export interface NotesFilterQuery {
  CreatedBy?: string;
  CreatedDateMin?: string;
  CreatedDateMax?: string;
}
