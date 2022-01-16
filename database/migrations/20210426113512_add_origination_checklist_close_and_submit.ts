import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.OriginationChecklists", (table) => {
    table.string("CloseUser");
    table.timestamp("CloseDate");
    table.text("CloseComment");

    table.string("SubmitToUnderwriterUser");
    table.timestamp("SubmitToUnderwriterDate");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.OriginationChecklists", (table) => {
    table.dropColumns(
      "CloseUser",
      "CloseDate",
      "CloseComment",
      "SubmitToUnderwriterUser",
      "SubmitToUnderwriterDate"
    );
  });
};
