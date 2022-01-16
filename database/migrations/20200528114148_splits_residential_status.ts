import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.string("UkResidentialStatus");
    table.string("InformationRegardingPropertyResidence");
    table.dropColumn("CurrentResidentialStatus");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.dropColumn("UkResidentialStatus");
    table.dropColumn("InformationRegardingPropertyResidence");
    table.string("CurrentResidentialStatus");
  });
};
