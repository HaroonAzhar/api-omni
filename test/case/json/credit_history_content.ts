import faker from "faker";

export default {
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
  status: faker.random.arrayElement(["Edited", "New", "Completed", "Recheck"]),
  date_edited: faker.random.arrayElement([
    "1990-02-20",
    "1984-03-02",
    "1992-12-24",
  ]),
};
