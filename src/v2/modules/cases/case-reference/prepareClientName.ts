import { CLIENT_NAME_LENGTH } from './generate-case-reference';
import sanitizeClientName from './sanitizeClientName';

const prepareCompanyName = (clientName: string): string => clientName;
const prepareIndividualName = (clientName: string): string => {
  let [surname] = clientName.split(' ').slice(-1);
  if (surname.length < CLIENT_NAME_LENGTH) {
    clientName = clientName.replace(/\s+/g, '');
    surname = surname + clientName.substr(0, CLIENT_NAME_LENGTH - surname.length).toLowerCase();
  }
  return surname;
};

const prepareClientName = (clientName: string, isCompany: boolean): string => {
  const preparedName = isCompany ? prepareCompanyName(clientName) : prepareIndividualName(clientName);
  return sanitizeClientName(preparedName);
};

export default prepareClientName;
