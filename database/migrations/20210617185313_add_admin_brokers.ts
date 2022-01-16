import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("OriginationAdmin.Brokers", (table) => {
    table.increments("Id").primary();
    table.timestamp("CreatedAt").defaultTo(knex.fn.now());
    table.string("CompanyName").notNullable();
    table.timestamp("DateApproved");

    table.boolean("IsDeleted");

    table.integer("FkAddressId");
    table
      .foreign("FkAddressId")
      .references("Id")
      .inTable("Origination.Address");
  });

  await knex.schema.createTable(
    "OriginationAdmin.BrokerIndividuals",
    (table) => {
      table.increments("Id").primary();
      table.timestamp("CreatedAt").defaultTo(knex.fn.now());
      table.string("ContactName").notNullable();
      table.string("ContactEmail").notNullable();

      table.boolean("IsDeleted");

      table.integer("FkBrokerId").notNullable();
      table
        .foreign("FkBrokerId")
        .references("Id")
        .inTable("OriginationAdmin.Brokers");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("OriginationAdmin.BrokerIndividuals");

  await knex.schema.dropTable("OriginationAdmin.Brokers");
};
