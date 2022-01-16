import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Dip", async (table) => {
    table.boolean("IsEnquiry").defaultTo(false);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Dip", (table) => {
    table.dropColumn("IsEnquiry");
  });
};
