import { Controller, Get, Query } from '@nestjs/common';

import { AvailableFundingService } from './available-funding.service';
import { AvailableFunding, AvailableFundingFilterQuery } from './available-funding.interface';

@Controller('availableFunding')
export class AvailableFundingController {
  constructor(private readonly availableFundingService: AvailableFundingService) {}
  @Get()
  async findAll(@Query() filterParams: AvailableFundingFilterQuery): Promise<AvailableFunding> {
    return this.availableFundingService.get(filterParams);
  }
}
