import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.boolean("HasDualNationality");
    table.string("SecondNationality");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.dropColumn("HasDualNationality");
    table.dropColumn("SecondNationality");
  });
};
