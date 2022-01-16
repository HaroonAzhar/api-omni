import * as Knex from "knex";

const tableName = "Origination.ApplicantCompany";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, (table) => {
    table.string("DateOfIncorporation");
  });
  await knex(tableName).update({ IsDeleted: false });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("DateOfIncorporation");
  });
};
