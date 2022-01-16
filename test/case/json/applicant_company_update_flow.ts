import faker from "faker";
import * as _ from "lodash";

export const generateEndpoint = () => {
  return {
    data: {
      type: "applicant_form",
      id: "TO_BE_GENERATED_FROM_TEST",
      attributes: {
        applicant_id: 0,
        base_data: {
          name: faker.company.companyName(),
          applicant_name: faker.name.firstName(),
          email: faker.internet.email(),
          company_number: faker.random.number().toString(),
          number_of_partners: faker.random
            .number({ min: 1, max: 20 })
            .toString(),
          company_type: faker.random.arrayElement([
            "other",
            "other2",
            "other3",
          ]),
          date_of_creation: faker.date.past().toISOString(),
          date_of_incorporation: faker.date.past().toISOString(),
          company_other_type_value: faker.random.arrayElement([
            "sample",
            "sampl9",
          ]),
          company_registration_number: faker.random.number().toString(),
          nature_of_business: faker.random.word(),
          trading_since: faker.random.arrayElement([
            "2020-01-02",
            "2019-03-02",
            "2005-12-24",
          ]),
        },
        address: {
          registered: {
            address_line_1: faker.address.streetName(),
            address_line_2: faker.address.secondaryAddress(),
            postcode: faker.address.zipCode(),
            city: faker.address.city(),
            country: faker.address.country(),
          },
          correspondence: {
            address_line_1: faker.address.streetName(),
            address_line_2: faker.address.secondaryAddress(),
            postcode: faker.address.zipCode(),
            city: faker.address.city(),
            country: faker.address.country(),
          },
          is_correspondence_same: faker.random.arrayElement([false, true]),
        },
        directors: _.times(10, () => {
          return {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            links: faker.random.words(),
          };
        }),

        shared_holders: _.times(10, () => {
          return {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            held: faker.random.number(),
            isCompany: faker.random.arrayElement([true, false]),
            company: _.times(2, () => ({
              name: `${faker.name.firstName()} ${faker.name.lastName()}`,
              held: faker.random.number(),
              isCompany: faker.random.arrayElement([true, false]),
              company: _.times(2, () => ({
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                held: faker.random.number(),
                isCompany: false,
              })),
            })),
          };
        }),

        accountant: {
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
          firm: faker.company.companyName(),
          address: {
            address_line_1: faker.address.streetName(),
            address_line_2: faker.address.secondaryAddress(),
            postcode: faker.address.zipCode(),
            city: faker.address.city(),
            country: faker.address.country(),
          },
          qualification: faker.random.arrayElement(["sample", "sampl9"]),
        },
      },
    },
  };
};
