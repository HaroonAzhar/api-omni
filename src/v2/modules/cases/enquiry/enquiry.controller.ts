import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ExcludeNullInterceptor } from '@v2/modules/app/interceptors/response-exlude-null.interceptor';

import { CreateEnquiryDto } from './dtos/createEnquiry.dto';
import { Enquiry } from './enquiry.interface';
import { EnquiryService } from './enquiry.service';

@Controller('cases/:caseUuid/enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @UseInterceptors(ExcludeNullInterceptor)
  @Get()
  async getByCaseUuid(@Param('caseUuid') caseUuid: string): Promise<Enquiry> {
    return this.enquiryService.getEnquiry(caseUuid);
  }

  @Post()
  async createForCaseUuid(@Param('caseUuid') caseUuid: string, @Body() enquiry: CreateEnquiryDto): Promise<number> {
    return this.enquiryService.createEnquiry(caseUuid, enquiry);
  }
}
