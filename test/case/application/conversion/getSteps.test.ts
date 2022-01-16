import getStepsForConfiguration, {
  CaseConfigurationData,
} from "../../../../src/services/application/conversion/getSteps";

describe("getApplicationSteps", () => {
  const alwaysPresentSteps = [
    "applicant_details",
    "credit_history",
    "loan_details",
    "security_details",
    "solicitor_details",
    "additional_information",
    "declarations",
    "assets_and_liabilities",
    "aml_kyc",
    "valuation_report",
  ];

  const availableSteps = [
    "introducer_details",
    "company_structure",
    "company_details",
    ...alwaysPresentSteps,
  ];

  it("Filters out introducer and company", () => {
    const caseConfiguration: CaseConfigurationData = {
      typeOfApplicant: "individual",
      typeOfIntroducer: "direct_application",
    };

    const expectedSteps = alwaysPresentSteps;

    const returnedSteps = getStepsForConfiguration(
      caseConfiguration,
      availableSteps
    );

    expect(returnedSteps).toEqual(expectedSteps);
  });

  it("Filters out introducer", () => {
    const caseConfiguration: CaseConfigurationData = {
      typeOfApplicant: "company",
      typeOfIntroducer: "direct_application",
    };

    const expectedSteps = [
      "company_structure",
      "company_details",
      ...alwaysPresentSteps,
    ];

    const returnedSteps = getStepsForConfiguration(
      caseConfiguration,
      availableSteps
    );

    expect(returnedSteps).toEqual(expectedSteps);
  });

  it("Keeps all steps", () => {
    const caseConfiguration: CaseConfigurationData = {
      typeOfApplicant: "company",
      typeOfIntroducer: "via_broker",
    };

    const expectedSteps = availableSteps;

    const returnedSteps = getStepsForConfiguration(
      caseConfiguration,
      availableSteps
    );

    expect(returnedSteps).toEqual(expectedSteps);
  });
});
