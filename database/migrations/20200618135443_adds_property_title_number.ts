import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.text("TitleNumbers");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.dropColumn("TitleNumbers");
  });
};
