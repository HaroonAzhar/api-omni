import faker from "faker";
import * as _ from "lodash";

export default {
  data: {
    type: "application_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      title_numbers: _.times(5, () => faker.lorem.word()),
    },
  },
};
