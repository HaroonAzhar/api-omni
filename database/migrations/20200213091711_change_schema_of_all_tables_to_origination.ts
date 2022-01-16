import * as Knex from "knex";

const initialTables = `Origination_DIP_Broker
Origination_DIP_BuildingType
Origination_DIP_Company
Origination_DIP_Contact
Origination_DIP_ContactTypes
Origination_DIP_ContactValue
Origination_DIP_DIP
Origination_DIP_Introducer
Origination_DIP_LoanAdvanceType
Origination_DIP_LoanFinancialDetails
Origination_DIP_LoanFinancialDetailsDev
Origination_DIP_LoanFinancialDetailsMulti
Origination_DIP_LoanFinancialHybridTerms
Origination_DIP_LoanPropertyDevelopment
Origination_DIP_LoanType
Origination_DIP_OpflType
Origination_DIP_Security
Origination_DIP_SecurityDipMapping
Origination_DIP_Status`.split("\n");

const transferSql = (targetSchema: string, sourceSchema: string) => {
  const sqlStatements = initialTables.map(
    (tableName) =>
      `ALTER SCHEMA [${targetSchema}] TRANSFER [${sourceSchema}].[${tableName}]`
  );
  return sqlStatements.join("\n");
};

exports.up = async (knex: Knex) => {
  await knex.raw(transferSql("Origination", "dbo"));
};

exports.down = async (knex: Knex) => {
  await knex.raw(transferSql("dbo", "Origination"));
};
