import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.ApplicationStepName", (table) => {
    table.increments("ApplicationStepNameId").primary();
    table.string("ApplicationStepName", 255);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.ApplicationStepName");
};
