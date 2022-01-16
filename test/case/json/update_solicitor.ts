import faker from "faker";

export const data = {
  data: {
    type: "application_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      solicitors_details: {
        are_least_two_partners: faker.random.arrayElement([false, true]),
        company_name: faker.company.companyName(),
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        postcode: faker.address.zipCode(),
        country: faker.address.country(),
        contact_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        phone_number: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        omni_solicitor_phone_number: faker.phone.phoneNumber(),
        omni_solicitor_email: faker.internet.email(),
        omni_solicitor_id: 1,
      },
    },
  },
};
