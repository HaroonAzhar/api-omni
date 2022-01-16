export type Signature = {
  Date: Date;
  User: string;
};

export type SignatureWithComment = {
  Comment: string;
} & Signature;
