import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.FurtherDrawdowns", (table) => {
    table.increments("FurtherDrawdownId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.decimal("RequestedAmount", 38, 4).notNullable();
    table.decimal("CumulativeBalance", 38, 4).notNullable();

    table.decimal("TotalValuations", 38, 4).notNullable();
    table.decimal("TotalGDV", 38, 4).notNullable();

    table.decimal("LTV", 38, 4).notNullable();
    table.decimal("LTGDV", 38, 4).notNullable();

    table.timestamp("RequestedDate").notNullable();

    table.text("Notes");

    table.string("CreatedBy");
    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.FurtherDrawdowns");
};
