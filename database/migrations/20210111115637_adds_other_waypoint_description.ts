import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Waypoints", (table) =>
    table.text("OtherWaypointDescription")
  );
};

exports.down = async (knex: Knex) =>
  await knex.schema.alterTable("Servicing.Waypoints", (table) =>
    table.dropColumn("OtherWaypointDescription")
  );
