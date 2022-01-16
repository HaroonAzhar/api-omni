import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("OriginationAdmin.Contacts", (table) => {
    table.increments("Id").primary();
    table.timestamp("CreatedAt").defaultTo(knex.fn.now());

    table.string("Forename").notNullable();
    table.string("Surname").notNullable();
    table.string("MiddleName");
    table.date("DateOfBirth");
    table.string("NationalInsuranceNumber").unique();

    table.unique([
      "Forename",
      "Surname",
      "MiddleName",
      "DateOfBirth",
      "IsDeleted",
    ]);

    table.index("Forename", "Id", "Surname");
    table.boolean("IsDeleted");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("OriginationAdmin.Contacts");
};
