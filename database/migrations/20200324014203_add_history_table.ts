import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.FlowHistory", (table) => {
    table.increments("FlowHistoryId").primary();
    table.integer("TypeId");
    table.string("Type");
    table.text("Content");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.FlowHistory");
};
