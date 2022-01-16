import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangedContactEvent } from '../../dip/dip.events';
import {
  ApplicationRepositoryInterface,
  RecheckStatus,
  CompanyDetailsStepName,
  ApplicantDetailsStepName,
  CreditHistoryStepName,
  AssetsAndLiabilitiesStepName,
  DeclarationsStepName,
  AmlKycStepName,
  AdditionalInformationStepName,
} from '../application.interface';

@EventsHandler(ChangedContactEvent)
export class ChangedDipContactEventHandler implements IEventHandler<ChangedContactEvent> {
  constructor(private readonly repository: ApplicationRepositoryInterface) {}

  async handle(event: ChangedContactEvent) {
    await this.repository.changeStepStatus(event.content.FkCaseId, CompanyDetailsStepName, RecheckStatus);
    await this.repository.changeStepStatus(event.content.FkCaseId, ApplicantDetailsStepName, RecheckStatus);
    await this.repository.changeStepStatus(event.content.FkCaseId, CreditHistoryStepName, RecheckStatus);
    await this.repository.changeStepStatus(event.content.FkCaseId, AssetsAndLiabilitiesStepName, RecheckStatus);
    await this.repository.changeStepStatus(event.content.FkCaseId, DeclarationsStepName, RecheckStatus);
    await this.repository.changeStepStatus(event.content.FkCaseId, AmlKycStepName, RecheckStatus);
    await this.repository.changeStepStatus(event.content.FkCaseId, AdditionalInformationStepName, RecheckStatus);

    await this.repository.changeIndividualsStatus(event.content.FkCaseId, RecheckStatus);
    await this.repository.invalidateAmlKycValidation(event.content.FkCaseId);
  }
}
