import * as Knex from "knex";

const tableName = "Origination.AmlKyc";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, (table) => {
    table.boolean("VotersRoll").notNullable();
    table.integer("ExperianRiskScore").notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("VotersRoll");
    table.dropColumn("ExperianRiskScore");
  });
};
