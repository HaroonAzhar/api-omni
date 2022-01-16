import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Completed", (table) => {
    table.date("DateOfCompletion");
    table.unique(["FkCaseId"]);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Completed", (table) => {
    table.dropColumn("DateOfCompletion");
    table.dropUnique(["FkCaseId"]);
  });
};
