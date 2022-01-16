import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipSecurity", (table) => {
    table.dropColumn("HowLongHere");
    table.integer("HowLongHereMonths");
    table.integer("HowLongHereYears");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipSecurity", (table) => {
    table.string("HowLongHere");
    table.dropColumn("HowLongHereMonths");
    table.dropColumn("HowLongHereYears");
  });
};
