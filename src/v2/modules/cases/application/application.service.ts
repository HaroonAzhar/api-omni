import { Injectable } from '@nestjs/common';

import { DipService } from '../dip/dip.service';
import { Application, ApplicationRepositoryInterface, CreatePropertyEntity, Property } from './application.interface';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepositoryInterface,
    private readonly dipService: DipService
  ) {}

  async getByCaseId(FkCaseId: number): Promise<Application> {
    const application = await this.applicationRepository.getByCaseId(FkCaseId);
    if (application === undefined) {
      return application;
    }
    application.loanDetails = await this.dipService.getByCaseId(FkCaseId);
    return application;
  }

  async addProperty(property: CreatePropertyEntity): Promise<number> {
    return this.applicationRepository.addProperty(property);
  }

  async getProperty(CasePropertyId: number): Promise<Property> {
    return this.applicationRepository.getProperty(CasePropertyId);
  }
}
