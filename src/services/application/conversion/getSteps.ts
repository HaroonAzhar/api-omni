export interface CaseConfigurationData {
  typeOfApplicant: string;
  typeOfIntroducer: string;
}

const companyOnlySteps = ["company_details", "company_structure"];
const getStepsForConfiguration = (
  caseConfigurationData: CaseConfigurationData,
  availableSteps: string[]
): string[] => {
  let filteredSteps = availableSteps;
  if (caseConfigurationData.typeOfApplicant === "individual") {
    filteredSteps = filteredSteps.filter(
      (stepName: string) => !companyOnlySteps.includes(stepName)
    );
  }

  if (caseConfigurationData.typeOfIntroducer !== "via_broker") {
    filteredSteps = filteredSteps.filter(
      (stepName: string) => stepName !== "introducer_details"
    );
  }
  return filteredSteps;
};

export default getStepsForConfiguration;
