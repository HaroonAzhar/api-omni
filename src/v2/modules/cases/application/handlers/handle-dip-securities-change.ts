import { ChangedSecuritiesEvent, ChangedBuildingTypeEvent } from '../../dip/dip.events';
import {
  ApplicationRepositoryInterface,
  RecheckStatus,
  LoanDetailsStepName,
  SecurityDetailsStepName,
  ValuationReportStepName,
  AdditionalInformationStepName,
  AssetsAndLiabilitiesStepName,
} from '../application.interface';

export const handleDipSecuritiesChange = async (
  event: ChangedSecuritiesEvent | ChangedBuildingTypeEvent,
  repository: ApplicationRepositoryInterface
) => {
  await repository.changeStepStatus(event.content.FkCaseId, LoanDetailsStepName, RecheckStatus);
  await repository.changeStepStatus(event.content.FkCaseId, SecurityDetailsStepName, RecheckStatus);
  await repository.changeStepStatus(event.content.FkCaseId, ValuationReportStepName, RecheckStatus);
  await repository.changeStepStatus(event.content.FkCaseId, AdditionalInformationStepName, RecheckStatus);
  await repository.changeStepStatus(event.content.FkCaseId, AssetsAndLiabilitiesStepName, RecheckStatus);

  await repository.changePropertiesStatus(event.content.FkCaseId, SecurityDetailsStepName, RecheckStatus);
  await repository.changePropertiesStatus(event.content.FkCaseId, ValuationReportStepName, RecheckStatus);
};
