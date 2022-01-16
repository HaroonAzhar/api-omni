import {
  ChangedFinancialDetailsEvent,
  ChangedFinancialCalculatorDetailsEvent,
  ChangedLoanDetailsEvent,
  ChangedAdvanceTypeEvent,
} from '../../dip/dip.events';
import {
  ApplicationRepositoryInterface,
  RecheckStatus,
  AssetsAndLiabilitiesStepName,
  AdditionalInformationStepName,
  LoanDetailsStepName,
} from '../application.interface';

export const handleDipFinancialChange = async (
  event:
    | ChangedFinancialDetailsEvent
    | ChangedFinancialCalculatorDetailsEvent
    | ChangedLoanDetailsEvent
    | ChangedAdvanceTypeEvent,
  repository: ApplicationRepositoryInterface
) => {
  await repository.changeStepStatus(event.content.FkCaseId, AdditionalInformationStepName, RecheckStatus);
  await repository.changeStepStatus(event.content.FkCaseId, LoanDetailsStepName, RecheckStatus);
  await repository.changeStepStatus(event.content.FkCaseId, AssetsAndLiabilitiesStepName, RecheckStatus);
};
