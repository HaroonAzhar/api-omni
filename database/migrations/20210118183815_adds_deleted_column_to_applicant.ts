import * as Knex from "knex";

const applicantTable = "Origination.Applicant";
const companyTable = "Origination.ApplicantCompany";

exports.up = async (knex: Knex) => {
  for (const tableName of [applicantTable, companyTable]) {
    await knex.schema.alterTable(tableName, (table) => {
      table.boolean("IsDeleted");
    });
    await knex(tableName).update({ IsDeleted: false });
  }
};

exports.down = async (knex: Knex) => {
  for (const tableName of [applicantTable, companyTable]) {
    await knex.schema.alterTable(tableName, (table) => {
      table.dropColumn("IsDeleted");
    });
  }
};
