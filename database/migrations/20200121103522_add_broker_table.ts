import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination_DIP_Broker", (table) => {
    table.increments("broker_id").primary();
    table.string("broker_company_name", 255);
    table.string("broker_name", 255);
    table.string("broker_email", 255);
  });

  await knex.schema.alterTable("Origination_DIP_DIP", (table) => {
    table.integer("fk_broker_id");
    table
      .foreign("fk_broker_id")
      .references("broker_id")
      .inTable("Origination_DIP_Broker");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination_DIP_DIP", (table) => {
    table.dropForeign(["fk_broker_id"]);
    table.dropColumn("fk_broker_id");
  });

  await knex.schema.dropTable("Origination_DIP_Broker");
};
