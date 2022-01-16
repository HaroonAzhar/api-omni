export const buildingTypes = ['development', 'non_development'] as const;
export type BuildingType = typeof buildingTypes[number];
