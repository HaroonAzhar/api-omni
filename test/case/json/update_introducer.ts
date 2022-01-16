import faker from "faker";

export const data = {
  data: {
    type: "application_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      introducer_details: {
        firm: faker.company.companyName(),
        introducer: `${faker.name.firstName()} ${faker.name.lastName()}`,
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        postcode: faker.address.zipCode(),
        country: faker.address.country(),
        phone_number: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        interim_permission_number: faker.lorem.word(),
        have_met_client: faker.random.arrayElement([false, true]),
      },
    },
  },
};
