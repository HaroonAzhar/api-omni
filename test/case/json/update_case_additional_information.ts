import faker from "faker";

export const data = {
  data: {
    type: "application_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      additional_information: {
        additional_information: faker.lorem.words(),
      },
    },
  },
};
