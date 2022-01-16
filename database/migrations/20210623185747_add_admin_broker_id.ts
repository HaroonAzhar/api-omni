import * as Knex from "knex";

exports.up = async (knex: Knex) =>
  knex.schema.alterTable("Origination.DipBroker", async (table) => {
    table.integer("FkBrokerCompanyId");
    table.integer("FkBrokerIndividualId");
  });

exports.down = async (knex: Knex) =>
  knex.schema.alterTable("Origination.DipBroker", async (table) => {
    table.dropColumn("FkBrokerCompanyId");
    table.dropColumn("FkBrokerIndividualId");
  });
