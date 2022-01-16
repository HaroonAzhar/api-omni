import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipSecurity", (table) => {
    table.decimal("Estimated90DayGdv", 38, 4);
    table.decimal("CurrentEstimated90DayMarketValue", 38, 4);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipSecurity", (table) => {
    table.dropColumns("Estimated90DayGdv", "CurrentEstimated90DayMarketValue");
  });
};
