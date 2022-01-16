import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.string("SecurityOwner");
    table.string("SecurityOwnerForename");
    table.string("SecurityOwnerTitle");
    table.string("SecurityOwnerMiddleName");
    table.string("SecurityOwnerSurname");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.dropColumns("SecurityOwnerSurname");
    table.dropColumns("SecurityOwnerMiddleName");
    table.dropColumns("SecurityOwnerTitle");
    table.dropColumns("SecurityOwnerForename");
    table.dropColumns("SecurityOwner");
  });
};
