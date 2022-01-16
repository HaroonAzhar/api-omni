import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Funds", (table) => {
    table.increments("FundId").primary();

    table.string("Name");
    table.string("CreatedBy");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("Servicing.StoredCashflows", (table) => {
    table.increments("StoredCashflowId").primary();

    table.decimal("Amount", 38, 4).notNullable();

    table.timestamp("TransactionDate").notNullable();

    table.integer("FkFundId");
    table.index("FkFundId");
    table.foreign("FkFundId").references("FundId").inTable("Servicing.Funds");

    table.string("CreatedBy");
    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.StoredCashflows");
  await knex.schema.dropTable("Servicing.Funds");
};
