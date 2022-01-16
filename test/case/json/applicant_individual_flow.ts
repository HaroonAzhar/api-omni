import faker from "faker";
import * as _ from "lodash";

import creditHistoryContent from "./credit_history_content";
import declarationsSignaturesContent from "./declarations_signatures_content";

export const data = {
  data: {
    type: "applicant_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      individuals: _.times(10, () => {
        return {
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
          links: faker.random.words(),
          personal_data: {
            title: faker.name.title(),
            forename: faker.name.firstName(),
            middle_name: faker.name.firstName(),
            surname: faker.name.lastName(),
            other_name: faker.name.firstName(),
            date_of_birth: faker.random.arrayElement([
              "1990-02-20",
              "1984-03-02",
              "1992-12-24",
            ]),
            city_of_birth: faker.address.city(),
            country_of_birth: faker.address.country(),
            insurance_number: faker.random.number().toString(),
            nationality: faker.address.country(),
            second_nationality: faker.address.country(),
            has_dual_nationality: faker.random.arrayElement([true, false]),
            permanent_resident: faker.random.arrayElement([true, false]),
            marital_status: faker.random.arrayElement([
              "fake1",
              "fake2",
              "fake3",
            ]),
            marital_other_value: faker.random.arrayElement(["fake1", "fake9"]),
            mothers_maiden_name: faker.lorem.word(),
            uk_residential_status: faker.lorem.word(),
            information_regarding_property_residence: faker.lorem.word(),
          },
          addresses: [
            {
              address_line_1: faker.address.streetName(),
              address_line_2: faker.address.secondaryAddress(),
              postcode: faker.address.zipCode(),
              city: faker.address.city(),
              country: faker.address.country(),
              how_long_here_months: faker.random.number(12),
              how_long_here_years: faker.random.number(12),
            },
          ],
          contact: {
            home_phone: faker.phone.phoneNumberFormat().replace("-", ""),
            mobile_phone: faker.phone.phoneNumberFormat().replace("-", ""),
            work_phone: faker.phone.phoneNumberFormat().replace("-", ""),
            email: faker.internet.email(),
            contact_method: faker.random.arrayElement(["phone", "email"]),
            number_of_dependants: faker.random
              .number({ min: 1, max: 20 })
              .toString(),
          },
          declarations_signatures: declarationsSignaturesContent,
          credit_history: creditHistoryContent,
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
        };
      }),
    },
  },
};
