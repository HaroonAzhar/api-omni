import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.PropertyValuationReport",
    (table) => {
      table.text("PlanningReferenceNumbers");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.PropertyValuationReport", (table) =>
    table.dropColumn("PlanningReferenceNumbers")
  );
};
