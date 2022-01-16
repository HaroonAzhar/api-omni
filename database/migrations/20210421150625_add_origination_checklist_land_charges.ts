import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Servicing.OriginationChecklistLandCharges",
    (table) => {
      table.increments("OriginationChecklistLandChargesId").primary();

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

      table.boolean("CheckFacilityLetter");
    }
  );

  await knex.schema.createTable(
    "Servicing.OriginationChecklistLandChargesResults",
    (table) => {
      table.increments("OriginationChecklistLandChargesResultsId").primary();

      table.integer("FkOriginationChecklistLandChargesId");
      table.index("FkOriginationChecklistLandChargesId");
      table
        .foreign("FkOriginationChecklistLandChargesId")
        .references("OriginationChecklistLandChargesId")
        .inTable("Servicing.OriginationChecklistLandCharges");

      table.string("Forename").notNullable();
      table.string("MiddleName");
      table.string("Surname").notNullable();
      table.string("Result").notNullable();
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable(
    "Servicing.OriginationChecklistLandChargesResults"
  );

  await knex.schema.dropTable("Servicing.OriginationChecklistLandCharges");
};
