import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.ApplicationStep", (table) =>
    table.unique(["FkCaseId", "FkNameId"])
  );

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.ApplicationStep", (table) =>
    table.dropUnique(["FkCaseId", "FkNameId"])
  );
