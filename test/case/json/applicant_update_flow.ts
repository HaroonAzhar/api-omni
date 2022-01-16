import faker from "faker";
import * as _ from "lodash";

export const generateEndpoint = () => {
  return {
    data: {
      type: "applicant_form",
      id: "TO_BE_GENERATED_FROM_TEST",
      attributes: {
        applicant_id: 0,
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
        declarations_signatures: {
          declaration: faker.random.arrayElement([true, false]),
          signature: faker.random.arrayElement([true, false]),
          date_of_declaration: faker.random.arrayElement([
            "2020-04-14",
            "2018-01-14",
          ]),
          date_of_signature: faker.random.arrayElement([
            "2020-04-14",
            "2018-01-14",
          ]),
        },
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
        credit_history: {
          debt_judgement: faker.random.arrayElement([false, true]),
          declared_bankrupt: faker.random.arrayElement([false, true]),
          failed_to_keep: faker.random.arrayElement([false, true]),
          claim_dss: faker.random.arrayElement([false, true]),
          convicted_fraud: faker.random.arrayElement([false, true]),
          details: faker.lorem.words(),
          refused_mortgage_details: faker.lorem.words(),
          debt_judgement_details: faker.lorem.words(),
          declared_bankrupt_details: faker.lorem.words(),
          failed_to_keep_details: faker.lorem.words(),
          claim_dss_details: faker.lorem.words(),
          convicted_fraud_details: faker.lorem.words(),
          refused_mortgage: faker.random.arrayElement([false, true]),
        },
      },
    },
  };
};
