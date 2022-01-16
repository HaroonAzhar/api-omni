import * as Knex from "knex";
import { camelize, underscore } from "inflected";

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

const renameSpecificTables = (tableName: string): string => {
  type Dictionary = { [index: string]: string };
  const renamingMap: Dictionary = {
    Origination_DIP_Introducer: "Origination_DIP_IntroducerType",
    Origination_DIP_ContactTypes: "Origination_DIP_ContactType",
    Origination_DIP_DIP: "Origination_DIP",
  };
  return renamingMap[tableName]
    ? (renamingMap[tableName] as string)
    : tableName;
};

const getNewTableName = (tableName: string) => {
  const renamedTable = renameSpecificTables(tableName);
  return camelize(underscore(renamedTable.replace("Origination_", "")));
};

exports.up = async (knex: Knex) => {
  for (const tableName of initialTables) {
    await knex.schema.renameTable(
      `Origination.${tableName}`,
      getNewTableName(tableName)
    );
  }
};

exports.down = async (knex: Knex) => {
  for (const tableName of initialTables) {
    await knex.schema.renameTable(
      `Origination.${getNewTableName(tableName)}`,
      tableName
    );
  }
};
