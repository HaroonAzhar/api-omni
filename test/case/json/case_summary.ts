import faker from "faker";
import * as _ from "lodash";

export const overview = {
  executive_summary: faker.random.words(),
  underwriter: faker.random.word(),
  expected_completion_date: faker.date.future(),
};

export const security = {
  description_of_property: faker.random.words(),
  description_of_works: faker.random.words(),
  valuer_name: faker.random.words(),
  analysis_of_property: faker.random.words(),
};

export const loan = {
  servicing_method_rationale: faker.random.words(),
};

export const riskMitigations = {
  underwriter_rationale: faker.random.words(),
  risk_inputs: _.times(3, () => {
    return {
      risk: faker.random.words(),
      mitigation: faker.random.words(),
      id: faker.random.number(),
    };
  }),
};

export const furtherComments = {
  exit_strategy: faker.random.words(),
  ongoing_monitoring: faker.random.words(),
  special_conditions: faker.random.words(),
};

export const borrower = {
  comments: faker.random.words(),
  borrower_profile: faker.random.words(),
  client_meeting_notes: faker.random.words(),
  client_meeting_attendees: faker.random.words(),
  client_meeting_date: faker.date.past(),
};

export const data = {
  data: {
    type: "applicant_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      summary: {
        overview: overview,
        security: security,
        loan: loan,
        risk_mitigations: riskMitigations,
        further_comments: furtherComments,
        borrower: borrower,
      },
    },
  },
};
