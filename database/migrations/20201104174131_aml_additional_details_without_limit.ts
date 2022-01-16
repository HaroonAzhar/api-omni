import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.text("AdditionalNotes").alter();
  });
};

exports.down = async (knex: Knex) =>
  await knex.schema.alterTable("Origination.AmlKyc", async (table) => {
    table.string("AdditionalNotes").alter();
  });
