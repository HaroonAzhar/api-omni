import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.ApplicationStep", (table) => {
    table.increments("ApplicationStepId").primary();
    table.integer("FkDipId");
    table.foreign("FkDipId").references("DipID").inTable("Origination.DIP");
    table.integer("FkStatusId");
    table
      .foreign("FkStatusId")
      .references("ApplicationStepStatusId")
      .inTable("Origination.ApplicationStepStatusType");
    table.dateTime("Edited");
    table.string("Name", 255);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.ApplicationStep");
};
