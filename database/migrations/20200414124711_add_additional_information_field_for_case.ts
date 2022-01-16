import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", (table) => {
    table.text("AdditionalInformation");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", (table) => {
    table.dropColumn("AdditionalInformation");
  });
};
