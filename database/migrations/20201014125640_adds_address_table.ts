import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.Address", (table) => {
    table.increments("Id").primary();
    table.string("Line1");
    table.string("Line2");
    table.string("TownCity");
    table.string("Postcode");
    table.string("Country");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.Address");
};
