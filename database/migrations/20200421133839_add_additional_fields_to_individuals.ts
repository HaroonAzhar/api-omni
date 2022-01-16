import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.string("MothersMaidenName");
    table.string("CurrentResidentialStatus");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.dropColumn("MothersMaidenName");
    table.dropColumn("CurrentResidentialStatus");
  });
};
