import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Servicing.OriginationChecklistSolicitors",
    (table) => {
      table.increments("OriginationChecklistSolicitorId").primary();

      table.integer("FkOriginationChecklistId");
      table.index("FkOriginationChecklistId");
      table
        .foreign("FkOriginationChecklistId")
        .references("OriginationChecklistId")
        .inTable("Servicing.OriginationChecklists");

      table.string("PrimarySignatureUser");
      table.timestamp("PrimarySignatureDate");

      table.string("SecondarySignatureUser");
      table.timestamp("SecondarySignatureDate");

      table.text("Comments");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.OriginationChecklistSolicitors");
};
