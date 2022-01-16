import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", async (table) => {
    table.boolean("PaymentContactDetailsSameAsAccessValuation").alter();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.string("PaymentContactDetailsSameAsAccessValuation").alter();
  });
};
