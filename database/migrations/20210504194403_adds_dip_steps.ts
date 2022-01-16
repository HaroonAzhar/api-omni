import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.DipSteps", (table) => {
    table.increments("DipStepId").primary();
    table.integer("FkDipId");
    table.foreign("FkDipId").references("DipID").inTable("Origination.DIP");
    table.timestamp("EditedDate");
    table.string("Name", 255);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.DipSteps");
};
