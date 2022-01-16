import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.string("ContactForAccessValuationPhone");
    table.string("ContactForAccessValuationEmail");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.dropColumns(
      "ContactForAccessValuationPhone",
      "ContactForAccessValuationEmail"
    );
  });
};
