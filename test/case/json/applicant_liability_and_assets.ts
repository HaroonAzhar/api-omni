import faker from "faker";
import * as _ from "lodash";

export const data = {
  data: {
    type: "applicant_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      assets: _.times(10, () => {
        return {
          type: faker.lorem.word(),
          description: faker.lorem.words(),
          gross_value: parseFloat(faker.finance.amount()),
          outstanding_debt: parseFloat(faker.finance.amount()),
          net_value: parseFloat(faker.finance.amount()),
        };
      }),
      liabilities: _.times(10, () => {
        return {
          type: faker.lorem.word(),
          description: faker.lorem.words(),
          net_value: parseFloat(faker.finance.amount()),
        };
      }),
      assets_liabilities_additional: {
        total_assets: parseFloat(faker.finance.amount()),
        total_liabilities: parseFloat(faker.finance.amount()),
        statement_of_financial_position: faker.random.arrayElement([
          "1990-02-20",
          "1984-03-02",
          "1992-12-24",
        ]),
        status: faker.random.arrayElement([
          "Edited",
          "New",
          "Completed",
          "Recheck",
        ]),
        date_edited: faker.random.arrayElement([
          "1990-02-20",
          "1984-03-02",
          "1992-12-24",
        ]),
      },
    },
  },
};
