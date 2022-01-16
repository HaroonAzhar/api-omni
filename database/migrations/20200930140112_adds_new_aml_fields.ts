import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.boolean("IndividualsShareholders");
    table.boolean("CompanyShareholders");
    table.string("PartnershipAgreementOnFile").alter();
  });
};

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.dropColumn("IndividualsShareholders");
    table.dropColumn("CompanyShareholders");
    table.boolean("PartnershipAgreementOnFile").alter();
  });
