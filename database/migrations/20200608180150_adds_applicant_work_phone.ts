import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipContactValue", (table) => {
    table.string("WorkPhone");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipContactValue", (table) => {
    table.dropColumn("WorkPhone");
  });
};
