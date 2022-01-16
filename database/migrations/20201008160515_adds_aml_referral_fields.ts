import { camelize } from "inflected";
import * as Knex from "knex";

const columnsWithReferral = [
  "creditsafe",
  "icaew_membership_confirmed",
  "law_society_membership_confirmed",
  "certificate_of_incorporation",
  "list_of_shareholders",
  "shareholders_verified_as_individual",
  "person_with_control_verified_as_individual",
  "person_with_interest_verified_as_individual",
  "partner_verified_as_individual",
  "partnership_agreement_on_file",
  "company_shareholders",
  "individuals_shareholders",
  "adverse_media_check_satisfactory",
  "copies_on_file",
  "electronic_document_check_satisfactory",
  "is_on_sanctions_list",
  "is_pep",
  "creditsafe_clear",
  "links_to_high_risk_jurisdiction",
  "any_suspicion_of_money_laundering",
];

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    for (const columnName of columnsWithReferral) {
      const columnNameInTableFormat = camelize(columnName);
      table.string(`${columnNameInTableFormat}UserComments`, 1000);
      table.string(`${columnNameInTableFormat}MlroComments`, 1000);
      table.string(`${columnNameInTableFormat}MlroUsername`);
      table.timestamp(`${columnNameInTableFormat}MlroDate`);
    }
  });
};

exports.down = async (knex: Knex) =>
  await knex.schema.alterTable("Origination.AmlKyc", async (table) => {
    for (const columnName of columnsWithReferral) {
      const columnNameInTableFormat = camelize(columnName);
      table.dropColumns(
        `${columnNameInTableFormat}UserComments`,
        `${columnNameInTableFormat}MlroComments`,
        `${columnNameInTableFormat}MlroUsername`,
        `${columnNameInTableFormat}MlroDate`
      );
    }
  });
