import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.OriginationChecklists", (table) => {
    table.string("FurtherType");
  });
  await knex.schema.alterTable("Servicing.UnderwriterFlows", (table) => {
    table.string("FurtherType");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.OriginationChecklists", (table) => {
    table.dropColumn("FurtherType");
  });

  await knex.schema.alterTable("Servicing.UnderwriterFlows", (table) => {
    table.dropColumn("FurtherType");
  });
};
