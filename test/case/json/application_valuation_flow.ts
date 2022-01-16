import faker from "faker";

const step1 = {
  valuation_basis: faker.lorem.word(),
  valuation_method: faker.lorem.word(),
  report_date: faker.random.arrayElement([
    "2020-01-02",
    "2019-03-02",
    "2005-12-24",
  ]),
  inspection_date: faker.random.arrayElement([
    "2020-01-02",
    "2019-03-02",
    "2005-12-24",
  ]),
  surveyor: faker.lorem.word(),
  report_status: faker.random.arrayElement([
    "instructed",
    "followed_up",
    "received",
  ]),
};

const step2 = {
  market_rent: parseFloat(faker.finance.amount()),
  market_value: parseFloat(faker.finance.amount(1)),
  day_value: parseFloat(faker.finance.amount()),
  gdv: parseFloat(faker.finance.amount(1)),
  day_gdv: faker.lorem.word(),
  reinstatement_value: parseFloat(faker.finance.amount()),
  title_no: faker.random.number().toString(),
  security_description: faker.lorem.words(),
};

const step3 = {
  security_subtype: faker.lorem.word(),
  first_charge_outstanding: faker.lorem.word(),
  number_of_units: faker.random.number().toString(),
};

const step4 = {
  planning_details: faker.lorem.words(),
  country: faker.address.country(),
  nitrate_neutrality: faker.random.arrayElement([true, false]),
  build_duration: faker.random.number({ min: 0 }),
};

const step5 = {
  build_costs: parseFloat(faker.finance.amount()),
  commencement_date_of_works: faker.random.arrayElement([
    "2020-01-02",
    "2019-03-02",
    "2005-12-24",
  ]),
  contractor: faker.random.word(),
  price_per_square_foot: parseFloat(faker.finance.amount()),
  price_per_square_meters: parseFloat(faker.finance.amount()),
  total_square_feet: parseFloat(faker.finance.amount()),
  total_square_meters: parseFloat(faker.finance.amount()),
  total_value: parseFloat(faker.finance.amount()),
};

const step6 = {
  name_of_the_individual_surveyor: faker.lorem.word(),
  planning_required: faker.random.arrayElement([true, false]),
  link_to_planning_permission: faker.internet.url(),
  build_costs_per_square_foot: faker.random.number(),
  build_costs_per_square_meter: faker.random.number(),
  project_manager: faker.lorem.word(),
  architect: faker.lorem.word(),
  structural_engineer: faker.lorem.word(),
  other_relevant_subcontractors: faker.lorem.word(),
  omni_experience_with_the_professional_team: faker.lorem.words(),
  listed_grade: faker.random.arrayElement([true, false]),
  sang: faker.random.arrayElement([true, false]),
  sssi: faker.random.arrayElement([true, false]),
  anob: faker.random.arrayElement([true, false]),
  esw1: faker.random.arrayElement([true, false]),
  flood_zone: faker.random.arrayElement([true, false]),
  green_belt: faker.random.arrayElement([true, false]),
  planning_reference_numbers: faker.random.arrayElement([
    ["sample1", "sample2"],
    ["sample3", "sample4"],
  ]),
};

const metadata = {
  status: faker.random.arrayElement(["Edited", "New", "Completed", "Recheck"]),
  date_edited: faker.random.arrayElement([
    "1990-02-20",
    "1984-03-02",
    "1992-12-24",
  ]),
};

export default {
  data: {
    type: "application_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      ...step1,
      ...step2,
      ...step3,
      ...step4,
      ...step5,
      ...step6,
      ...metadata,
    },
  },
};
