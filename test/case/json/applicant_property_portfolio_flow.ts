import faker from "faker";
import * as _ from "lodash";

export const generateEndpoint = () => {
  return {
    data: {
      type: "applicant_form",
      id: "TO_BE_GENERATED_FROM_TEST",
      attributes: {
        property_portfolio: _.times(10, () => {
          return {
            is_where_resides: faker.random.arrayElement([false, true]),
            address_line_1: faker.address.streetName(),
            address_line_2: faker.address.secondaryAddress(),
            postcode: faker.address.zipCode(),
            city: faker.address.city(),
            country: faker.address.country(),
            name_of_lender: faker.lorem.words(),

            estimated_value: parseFloat(faker.finance.amount()),
            current_debt: faker.random.number({ min: 0, max: 100 }),
            monthly_mortgage: parseFloat(faker.finance.amount()),
            monthly_rental: parseFloat(faker.finance.amount()),
          };
        }),
      },
    },
  };
};
