import faker from "faker";

export default {
  declaration: faker.random.arrayElement([true, false]),
  signature: faker.random.arrayElement([true, false]),
  date_of_declaration: faker.random.arrayElement(["2020-04-14", "2018-01-14"]),
  date_of_signature: faker.random.arrayElement(["2020-04-14", "2018-01-14"]),
};
