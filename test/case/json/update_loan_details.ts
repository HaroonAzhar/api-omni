import faker from "faker";

export const data = {
  data: {
    type: "application_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      loan_details: {
        further_draw_downs_borrowing: faker.random.number(),
        initial_net_loan: faker.random.number(),
        term: faker.random.number(),
        purpose_of_borrowings: faker.lorem.words(),
        source_of_deposit: faker.lorem.words(),
        repayment_method: faker.lorem.word(),
        repayment_method_details: faker.lorem.word(),
        proposed_completion_date: faker.random.arrayElement([
          "12/01/12",
          "22/02/18",
        ]),
      },
    },
  },
};
