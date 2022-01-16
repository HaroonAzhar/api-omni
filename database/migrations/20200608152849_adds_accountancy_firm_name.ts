import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.ApplicantAccountant", (table) => {
    table.string("Firm");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.ApplicantAccountant", (table) => {
    table.dropColumn("Firm");
  });
};
