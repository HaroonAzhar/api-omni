export const advanceTypes = ['single', 'multiple'] as const;
export type AdvanceType = typeof advanceTypes[number];
