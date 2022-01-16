export const securityTypes = ['residential', 'commercial', 'land', 'semi_commercial', 'development'] as const;
export type SecurityType = typeof securityTypes[number];
