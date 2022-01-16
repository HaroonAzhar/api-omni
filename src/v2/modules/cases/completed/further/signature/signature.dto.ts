import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

import { Signature, SignatureWithComment } from './signature.interface';

export class SignatureDto implements Signature {
  @IsString()
  User: string;

  @IsDate()
  @Type(() => Date)
  Date: Date;
}

export class SignatureWithCommentDto extends SignatureDto implements SignatureWithComment {
  @IsString()
  Comment: string;
}
