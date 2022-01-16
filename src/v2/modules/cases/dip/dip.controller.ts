import { Body, Controller, Param, Post, Req, SerializeOptions } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { DipService } from './dip.service';
import { ChangeIntroducerDto } from './dtos/change-introducer.dto';
import { ChangeAdvanceTypeDto } from './dtos/change-advance-type.dto';
import { ChangeBuildingTypeDto } from './dtos/change-building-type.dto';
import { ChangeContactCompanyDto } from './dtos/change-contact-company.dto';
import { ChangeContactIndividualDto } from './dtos/change-contact-individual.dto';
import { ChangeSecuritiesDto } from './dtos/change-securities.dto';
import { ChangeLoanDetailsDto } from './dtos/change-loan-details.dto';
import { ChangeFinancialDetailsDto } from './dtos/change-financial-details.dto';
import { ChangeFinancialCalculatorDetailsDto } from './dtos/change-financial-calculator-details.dto';

@Controller('cases/:caseUuid/dip')
export class DipController {
  constructor(private readonly dipService: DipService) {}

  @Post('/introducer')
  async changeIntroducerType(
    @Param('caseUuid') caseUuid: string,
    @Body() commandContent: ChangeIntroducerDto,
    @Req() req: Request
  ): Promise<void> {
    return this.dipService.changeIntroducer(caseUuid, commandContent, contextFromRequest(req));
  }

  @Post('/advance_type')
  async changeAdvanceType(
    @Param('caseUuid') caseUuid: string,
    @Body() commandContent: ChangeAdvanceTypeDto,
    @Req() req: Request
  ): Promise<void> {
    return this.dipService.changeAdvanceType(caseUuid, commandContent, contextFromRequest(req));
  }

  @Post('/contact_individual')
  async changeIndividualContact(
    @Param('caseUuid') caseUuid: string,
    @Body() commandContent: ChangeContactIndividualDto,
    @Req() req: Request
  ): Promise<void> {
    return this.dipService.changeContact(caseUuid, commandContent, contextFromRequest(req));
  }

  @Post('/contact_company')
  async changeCompanyContact(
    @Param('caseUuid') caseUuid: string,
    @Body() commandContent: ChangeContactCompanyDto,
    @Req() req: Request
  ): Promise<void> {
    return this.dipService.changeContact(caseUuid, commandContent, contextFromRequest(req));
  }

  @Post('/building_type')
  async changeBuildingType(
    @Param('caseUuid') caseUuid: string,
    @Body() commandContent: ChangeBuildingTypeDto,
    @Req() req: Request
  ): Promise<void> {
    return this.dipService.changeBuildingType(caseUuid, commandContent, contextFromRequest(req));
  }

  @Post('/securities')
  async changeSecurities(
    @Param('caseUuid') caseUuid: string,
    @Body() commandContent: ChangeSecuritiesDto,
    @Req() req: Request
  ): Promise<void> {
    return this.dipService.changeSecurities(caseUuid, commandContent, contextFromRequest(req));
  }

  @Post('/loan_details')
  async changeLoanDetails(
    @Param('caseUuid') caseUuid: string,
    @Body() commandContent: ChangeLoanDetailsDto,
    @Req() req: Request
  ): Promise<void> {
    return this.dipService.changeLoanDetails(caseUuid, commandContent, contextFromRequest(req));
  }

  @Post('/financial_details')
  async changeFinancialDetails(
    @Param('caseUuid') caseUuid: string,
    @Body() commandContent: ChangeFinancialDetailsDto,
    @Req() req: Request
  ): Promise<void> {
    return this.dipService.changeFinancialDetails(caseUuid, commandContent, contextFromRequest(req));
  }

  @Post('/financial_calculator_details')
  async changeFinancialCalculatorDetails(
    @Param('caseUuid') caseUuid: string,
    @Body() commandContent: ChangeFinancialCalculatorDetailsDto,
    @Req() req: Request
  ): Promise<void> {
    return this.dipService.changeFinancialCalculatorDetails(caseUuid, commandContent, contextFromRequest(req));
  }
}
