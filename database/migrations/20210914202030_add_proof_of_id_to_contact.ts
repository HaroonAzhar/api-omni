import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("OriginationAdmin.Contacts", (table) => {
    table.string("ProofOfIdExpiryDate");
    table.string("ProofOfId");
  });
};

exports.down = (knex: Knex) =>
  knex.schema.alterTable("OriginationAdmin.Contacts", (table) => {
    table.dropColumn("ProofOfIdExpiryDate");
    table.dropColumn("ProofOfId");
  });
