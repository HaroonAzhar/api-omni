import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.string("ProofOfRightToRemainUserComments", 1000);
    table.string("ProofOfRightToRemainMlroComments", 1000);
    table.timestamp("ProofOfRightToRemainMlroDate");
    table.string("ProofOfRightToRemainMlroState");
    table.string("ProofOfRightToRemainMlroUsername");
  });
};

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.dropColumns(
      "ProofOfRightToRemainUserComments",
      "ProofOfRightToRemainMlroComments",
      "ProofOfRightToRemainMlroDate",
      "ProofOfRightToRemainMlroState",
      "ProofOfRightToRemainMlroUsername"
    );
  });
