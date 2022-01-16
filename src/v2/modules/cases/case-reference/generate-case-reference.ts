import { Case } from '../case.interface';
import { ContactType } from '../types/contact-type/contact-type.interface';
import prepareClientName from './prepareClientName';

export const CLIENT_NAME_LENGTH = 4;
const START_CASE_REFERENCE = '10000';

function generateCaseReference(clientName: string, allCases: Case[], dip: { ContactType?: ContactType }): string {
  const isCompany = dip?.ContactType === 'company';

  const namePart = prepareClientName(clientName, isCompany).slice(0, CLIENT_NAME_LENGTH);

  const existingCaseReferences = allCases.map((caseData) => caseData.CaseNr).filter(Boolean);

  const dipCaseReferences = existingCaseReferences.filter((caseReference) => !caseReference.startsWith('ENQ'));

  dipCaseReferences.sort();

  const biggestReference = dipCaseReferences[dipCaseReferences.length - 1];

  const biggestReferenceNumber = biggestReference?.split('-')?.[0] ?? START_CASE_REFERENCE;

  const nextCaseReference = parseInt(biggestReferenceNumber) + 1;

  return `${nextCaseReference}-${namePart}`;
}

export default generateCaseReference;
