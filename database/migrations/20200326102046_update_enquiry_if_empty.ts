import * as Knex from "knex";

exports.up = async (knex: Knex) =>
  await knex("Origination.Dip")
    .update({ IsEnquiry: false })
    .whereNull("IsEnquiry");

exports.down = async (knex: Knex) => knex.schema;
