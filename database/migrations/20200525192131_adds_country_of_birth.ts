import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.renameColumn("PlaceOfBirth", "CityOfBirth");
  });
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.string("CountryOfBirth");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.renameColumn("CityOfBirth", "PlaceOfBirth");
  });
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.dropColumn("CountryOfBirth");
  });
};
