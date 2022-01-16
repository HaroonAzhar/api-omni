export const introducerTypes = ['direct_application', 'via_broker'] as const;
export type IntroducerType = typeof introducerTypes[number];
