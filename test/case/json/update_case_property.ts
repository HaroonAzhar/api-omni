import faker from "faker";
import * as _ from "lodash";
export const data = {
  data: {
    type: "applicant_form",
    id: "TO_BE_GENERATED_FROM_TEST",
    attributes: {
      properties: _.times(10, () => {
        return {
          status: faker.random.arrayElement(["Edited"]),
          date_edited: faker.random.arrayElement([
            "1990-02-20",
            "1984-03-02",
            "1992-12-24",
          ]),
          details: {
            already_owned: faker.random.arrayElement([true, false]),
            being_purchased: faker.random.arrayElement([true, false]),
            current_value: parseFloat(faker.finance.amount()),
            value_after_works: parseFloat(faker.finance.amount()),
            purchase_price: parseFloat(faker.finance.amount()),
            purpose_of_borrowings: faker.lorem.words(),
            property_type: faker.lorem.word(),
            security_type: faker.lorem.word(),
            security_type_other: faker.lorem.word(),
            years_remaining_on_lease: faker.random.number({ min: 0 }),
            is_new_build: faker.random.arrayElement([true, false]),
            is_standard_construction: faker.random.arrayElement([true, false]),
            is_planning_required: faker.random.arrayElement([true, false]),
            is_occupied: faker.random.arrayElement([true, false]),
            is_occupied_by_borrower: faker.random.arrayElement([true, false]),
            basis_for_occupation: faker.lorem.word(),
            intentions: faker.lorem.word(),
            contact_for_access_valuation_name: faker.lorem.word(),
            contact_for_access_valuation_phone: faker.phone.phoneNumber(),
            contact_for_access_valuation_email: faker.internet.email(),
            contact_for_payment_valuation_name: faker.lorem.word(),
            contact_for_payment_valuation_phone: faker.phone.phoneNumber(),
            contact_for_payment_valuation_email: faker.internet.email(),
            selected_contact_for_access_valuation: faker.random.arrayElement([
              "introducer",
              "individual",
              "manual",
            ]),
            selected_contact_for_payment_valuation: faker.random.arrayElement([
              "introducer",
              "individual",
              "manual",
            ]),
            selected_contact_applicant_id_for_access_valuation: faker.lorem.word(),
            selected_contact_applicant_id_for_payment_valuation: faker.lorem.word(),
            payment_contact_details_same_as_access_valuation: faker.random.arrayElement(
              [true, false]
            ),
          },
          address: {
            line_1: faker.address.streetName(),
            line_2: faker.address.secondaryAddress(),
            postcode: faker.address.zipCode(),
            city: faker.address.city(),
            country: faker.address.country(),
          },
          charge: {
            opfl_charge_type: faker.lorem.word(),
            lenders: _.times(5, () => {
              return {
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                current_mortgage_outstanding: parseFloat(
                  faker.finance.amount()
                ),
              };
            }),
            current_mortgage_outstanding: parseFloat(faker.finance.amount()),
            security_owner: faker.random.arrayElement([
              "third_party",
              "applicant",
            ]),
            security_owner_title: "Mr",
            security_owner_forename: faker.name.firstName(),
            security_owner_middle_name: faker.name.firstName(),
            security_owner_surname: faker.name.lastName(),
          },
          title_numbers: _.times(5, () => faker.lorem.word()),
        };
      }),
    },
  },
};
