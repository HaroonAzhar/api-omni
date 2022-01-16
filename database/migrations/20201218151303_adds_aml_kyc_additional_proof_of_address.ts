import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.string("AdditionalProofOfAddress");
  });
};

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.dropColumn("AdditionalProofOfAddress");
  });
