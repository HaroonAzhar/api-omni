import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Origination.ApplicationStepStatusType",
    (table) => {
      table.increments("ApplicationStepStatusId").primary();
      table.string("ApplicationStepStatusType", 255);
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.ApplicationStepStatusType");
};
