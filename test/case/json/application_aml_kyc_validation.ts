import faker from "faker";
import * as _ from "lodash";

export default {
  data: {
    type: "application_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      validation_user_name: faker.lorem.word(),
      validation_user_date: faker.random.arrayElement([
        "2020-04-14",
        "2018-01-14",
      ]),
      validation_mlro_name: faker.lorem.word(),
      validation_mlro_date: faker.random.arrayElement([
        "2020-04-14",
        "2018-01-14",
      ]),
    },
  },
};
