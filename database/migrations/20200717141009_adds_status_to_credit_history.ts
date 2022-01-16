import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.ApplicantCreditHistory",
    (table) => {
      table.integer("FkStatusId");
      table
        .foreign("FkStatusId")
        .references("ApplicationStepStatusId")
        .inTable("Origination.ApplicationStepStatusType");
      table.string("DateEdited");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.ApplicantCreditHistory",
    (table) => {
      table.dropForeign(["FkStatusId"]);
      table.dropColumn("FkStatusId");
      table.dropColumn("DateEdited");
    }
  );
};
