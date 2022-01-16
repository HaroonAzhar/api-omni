import * as Knex from "knex";

const solicitorColumnName = "FkSolicitorId";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseSolicitor", (table) => {
    table.integer(solicitorColumnName);
    table
      .foreign(solicitorColumnName)
      .references("Id")
      .inTable("OriginationAdmin.Solicitors");

    table.index(solicitorColumnName);

    table.string("OmniSolicitorPhoneNumber");
    table.string("OmniSolicitorEmail");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseSolicitor", (table) => {
    table.dropForeign([solicitorColumnName]);
    table.dropIndex(solicitorColumnName);
    table.dropColumns(
      solicitorColumnName,
      "OmniSolicitorPhoneNumber",
      "OmniSolicitorEmail"
    );
  });
};
