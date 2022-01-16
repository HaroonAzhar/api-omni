import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Servicing.OriginationChecklistLandRegistry",
    (table) => {
      table.increments("OriginationChecklistLandRegistryId").primary();

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
    }
  );

  await knex.schema.createTable(
    "Servicing.OriginationChecklistLandRegistryResults",
    (table) => {
      table.increments("OriginationChecklistLandRegistryResultsId").primary();

      table.integer("FkOriginationChecklistLandRegistryId");
      table.index("FkOriginationChecklistLandRegistryId");
      table
        .foreign("FkOriginationChecklistLandRegistryId")
        .references("OriginationChecklistLandRegistryId")
        .inTable("Servicing.OriginationChecklistLandRegistry");

      table.integer("FkSecurityId");
      table.boolean("LandRegistrySearchRun").notNullable();
      table.boolean("OmniNoted").notNullable();
      table.boolean("NoOtherCharges").notNullable();
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable(
    "Servicing.OriginationChecklistLandRegistryResults"
  );

  await knex.schema.dropTable("Servicing.OriginationChecklistLandRegistry");
};
