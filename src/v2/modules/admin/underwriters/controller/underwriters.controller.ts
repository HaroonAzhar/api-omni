import { Controller } from '@nestjs/common';

import { BaseAdminController } from '../../baseGeneric/baseAdmin.controller';
import { Underwriter } from '../underwriter.interface';
import { UnderwritersService } from '../underwriters.service';
import { CreateUnderwriterDto } from './dto/createUnderwriter.dto';
import { UpdateUnderwriterDto } from './dto/updateUnderwriter.dto';

@Controller('underwriters')
export class UnderwritersController extends BaseAdminController<
  Underwriter,
  CreateUnderwriterDto,
  UpdateUnderwriterDto
> {
  constructor(private readonly solicitorsService: UnderwritersService) {
    super(solicitorsService);
  }
}
