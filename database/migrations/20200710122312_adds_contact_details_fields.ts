import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", async (table) => {
    table.string("SelectedContactForAccessValuation");
    table.string("SelectedContactForPaymentValuation");
    table.string("SelectedContactApplicantIdForAccessValuation");
    table.string("SelectedContactApplicantIdForPaymentValuation");
    table.string("PaymentContactDetailsSameAsAccessValuation");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.dropColumn("SelectedContactForAccessValuation");
    table.dropColumn("SelectedContactForPaymentValuation");
    table.dropColumn("SelectedContactApplicantIdForAccessValuation");
    table.dropColumn("SelectedContactApplicantIdForPaymentValuation");
    table.dropColumn("PaymentContactDetailsSameAsAccessValuation");
  });
};
