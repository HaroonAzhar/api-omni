import * as Knex from "knex";

const tableName = "Origination.CaseProperty";

exports.up = async (knex: Knex) =>
  knex.schema.alterTable(tableName, (table) => {
    table.renameColumn(
      "ContactForAccessValuation",
      "ContactForAccessValuationName"
    );
    table.renameColumn(
      "ContactForPaymentValuation",
      "ContactForPaymentValuationName"
    );
  });
exports.down = async (knex: Knex) =>
  knex.schema.alterTable(tableName, (table) => {
    table.renameColumn(
      "ContactForAccessValuationName",
      "ContactForAccessValuation"
    );
    table.renameColumn(
      "ContactForPaymentValuationName",
      "ContactForPaymentValuation"
    );
  });
