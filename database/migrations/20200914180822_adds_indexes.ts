import * as Knex from "knex";

interface Index {
  table: string;
  column: string;
}

const indexes: Index[] = [
  { table: "Origination.AmlKyc", column: "FkApplicantId" },
  { table: "Origination.Applicant", column: "FkCaseId" },
  { table: "Origination.ApplicantAccountant", column: "FkApplicantId" },
  { table: "Origination.ApplicantAddressMapping", column: "FkApplicantId" },
  { table: "Origination.ApplicantAsset", column: "FkApplicantId" },
  {
    table: "Origination.ApplicantAssetsLiabilitiesAdditional",
    column: "FkApplicantId",
  },
  { table: "Origination.ApplicantCompany", column: "FkCaseId" },
  { table: "Origination.ApplicantCreditHistory", column: "FkApplicantId" },
  { table: "Origination.ApplicantLiability", column: "FkApplicantId" },
  { table: "Origination.ApplicantPropertyPortfolio", column: "FkApplicantId" },
  { table: "Origination.ApplicationStep", column: "FkCaseId" },
  { table: "Origination.CaseIntroducer", column: "FkCaseId" },
  { table: "Origination.CaseOverview", column: "FkCaseId" },
  { table: "Origination.CaseProperty", column: "FkCaseId" },
  { table: "Origination.CaseSolicitor", column: "FkCaseId" },
  { table: "Origination.Dip", column: "FkCaseId" },
  { table: "Origination.DipContactValue", column: "FkContactId" },
  {
    table: "Origination.DipLoanFinancialDrawdowns",
    column: "FkLoanFinancialDetailsId",
  },
  { table: "Origination.DipSecurityDipMapping", column: "FkDipId" },
  { table: "Origination.PropertyValuationReport", column: "FkPropertyId" },
];

exports.up = async (knex: Knex) => {
  for (const index of indexes) {
    await knex.schema.alterTable(index.table, (table) => {
      table.index(index.column);
    });
  }
};

exports.down = async (knex: Knex) => {
  for (const index of indexes) {
    await knex.schema.alterTable(index.table, (table) => {
      table.dropIndex(index.column);
    });
  }
};
