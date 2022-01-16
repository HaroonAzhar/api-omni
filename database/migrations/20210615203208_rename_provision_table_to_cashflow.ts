import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.renameTable("Servicing.Provisions", "Cashflows");

  await knex.schema.alterTable("Servicing.Cashflows", (table) => {
    table.renameColumn("ProvisionId", "CashflowId");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Cashflows", (table) => {
    table.renameColumn("CashflowId", "ProvisionId");
  });
  await knex.schema.renameTable("Servicing.Cashflows", "Provisions");
};
