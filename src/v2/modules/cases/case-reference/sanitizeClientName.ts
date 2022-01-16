const sanitizeClientName = (clientName: string): string => clientName.replace(/\W/g, '').toUpperCase();

export default sanitizeClientName;
