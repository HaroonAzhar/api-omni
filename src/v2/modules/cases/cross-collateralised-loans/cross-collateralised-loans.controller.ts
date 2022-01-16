import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { CrossCollateralisedLoansService } from './cross-collateralised-loans.service';
import { CreateCrossCollateralisedLoanDto } from './dtos/create-cross-collateralised-loan.dto';
import { CrossCollateralisedLoan } from './cross-collateralised-loan.interface';

@Controller('cases/:caseUuid/crossCollateralisedLoans')
export class CrossCollateralisedLoansController {
  constructor(private readonly crossCollateralisedLoansService: CrossCollateralisedLoansService) {}

  @Post()
  addCrossCollateralisedLoan(
    @Param('caseUuid') caseUuid: string,
    @Body() params: CreateCrossCollateralisedLoanDto,
    @Req() req: Request
  ): Promise<number> {
    return this.crossCollateralisedLoansService.createCrossCollateralisedLoan(
      caseUuid,
      params,
      contextFromRequest(req)
    );
  }

  @Delete('/:crossCollateralisedLoanUuid')
  deleteCrossCollateralisedLoan(
    @Param('caseUuid') caseUuid: string,
    @Req() req: Request,
    @Param('crossCollateralisedLoanUuid') crossCollateralisedLoanUuid: string
  ): Promise<void> {
    return this.crossCollateralisedLoansService.deleteCrossCollateralisedLoan(
      caseUuid,
      crossCollateralisedLoanUuid,
      contextFromRequest(req)
    );
  }

  @Get()
  getCrossCollateralisedLoans(@Param('caseUuid') caseUuid: string): Promise<CrossCollateralisedLoan[]> {
    return this.crossCollateralisedLoansService.getCrossCollateralisedLoans(caseUuid);
  }
}
