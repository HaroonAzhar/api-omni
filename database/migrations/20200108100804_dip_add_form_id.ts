import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.raw(
    "ALTER TABLE [Origination.DIP.DIP] ADD [dip_form_id] nvarchar(36)"
  );

exports.down = (knex: Knex) =>
  knex.schema.raw(
    "ALTER TABLE [Origination.DIP.DIP] DROP [dip_form_id] nvarchar(36)"
  );
