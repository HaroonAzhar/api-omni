import * as Knex from "knex";

const tableName = "Origination.Applicant";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.integer("FkSharedContactId").index();
    table
      .foreign("FkSharedContactId")
      .references("Id")
      .inTable("OriginationAdmin.Contacts");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.dropIndex("FkSharedContactId");
    table.dropForeign(["FkSharedContactId"]);

    table.dropColumn("FkSharedContactId");
  });
};
