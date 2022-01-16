export const contactTypes = ['individual', 'company'] as const;
export type ContactType = typeof contactTypes[number];
