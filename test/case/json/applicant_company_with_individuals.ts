import * as applicantIndividualFlow from "./applicant_individual_flow";
import * as applicantCompanyFlow from "./applicant_company_flow";

export const data = {
  data: {
    type: "applicant_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      individuals: applicantIndividualFlow.data.data.attributes.individuals,
      company: applicantCompanyFlow.data.data.attributes.company,
    },
  },
};
