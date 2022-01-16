import { Controller } from '@nestjs/common';

import { BaseAdminController } from '../../baseGeneric/baseAdmin.controller';
import { Originator } from '../originator.interface';
import { OriginatorsService } from '../originators.service';
import { CreateOriginatorDto } from './dto/createOriginator.dto';
import { UpdateOriginatorDto } from './dto/updateOriginator.dto';

@Controller('originators')
export class OriginatorsController extends BaseAdminController<Originator, CreateOriginatorDto, UpdateOriginatorDto> {
  constructor(private readonly solicitorsService: OriginatorsService) {
    super(solicitorsService);
  }
}
