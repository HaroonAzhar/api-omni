import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.boolean("Declaration");
    table.boolean("Signature");
    table.string("DateOfDeclaration");
    table.string("DateOfSignature");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.dropColumn("Declaration");
    table.dropColumn("Signature");
    table.dropColumn("DateOfDeclaration");
    table.dropColumn("DateOfSignature");
  });
};
