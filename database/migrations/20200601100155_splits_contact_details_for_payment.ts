import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.string("ContactForPaymentValuationPhone");
    table.string("ContactForPaymentValuationEmail");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.dropColumns(
      "ContactForPaymentValuationPhone",
      "ContactForPaymentValuationEmail"
    );
  });
};
