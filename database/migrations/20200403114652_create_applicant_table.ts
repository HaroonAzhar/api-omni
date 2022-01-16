import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.Applicant", (table) => {
    table.increments("ApplicantId").primary();
    table.string("Title");
    table.string("Forename");
    table.string("MiddleName");
    table.string("Surname");
    table.string("OtherName");
    table.string("DateOfBirth");
    table.string("PlaceOfBirth");
    table.string("InsuranceNumber");
    table.string("Nationality");
    table.string("PermanentResident");
    table.string("MartialStatus");
    table.string("MartialOtherValue");
    table.integer("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
    table.integer("FkContactId");
    table
      .foreign("FkContactId")
      .references("ContactId")
      .inTable("Origination.DipContact");
  });

  await knex.schema.createTable(
    "Origination.ApplicantIndividualAccountant",
    (table) => {
      table.increments("ApplicantIndividualAccountantId").primary();
      table.string("Name");
      table.string("Surname");
      table.string("Qualification");
      table.integer("FkApplicantId");
      table
        .foreign("FkApplicantId")
        .references("ApplicantId")
        .inTable("Origination.Applicant");
    }
  );

  await knex.schema.createTable(
    "Origination.ApplicantAddressMapping",
    (table) => {
      table.increments("ApplicantAddressMappingId").primary();
      table.string("AddressType");
      table.integer("FkApplicantId");
      table
        .foreign("FkApplicantId")
        .references("ApplicantId")
        .inTable("Origination.Applicant");
      table.integer("FkAddressId");
      table
        .foreign("FkAddressId")
        .references("SecurityId")
        .inTable("Origination.DipSecurity");
    }
  );

  await knex.schema.alterTable("Origination.DipSecurity", (table) => {
    table.string("HowLongHere");
  });

  await knex.schema.alterTable("Origination.DipContactValue", (table) => {
    table.string("Phone");
    table.string("ContactMethod");
    table.string("NumberOfDependants");
  });

  await knex.schema.createTable("Origination.ApplicantCompany", (table) => {
    table.increments("ApplicantCompanyId").primary();
    table.string("ApplicantName");
    table.string("CompanyNumber");
    table.string("NumberOfPartners");
    table.string("CompanyType");
    table.string("CompanyOtherTypeValue");
    table.string("CompanyRegistrationNumber");
    table.string("NatureOfBusiness");
    table.string("TradingSince");
    table.text("Directors");
    table.text("SharedHolders");
    table.integer("FkAddressId");
    table
      .foreign("FkAddressId")
      .references("SecurityId")
      .inTable("Origination.DipSecurity");
    table.integer("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
    table.integer("FkContactId");
    table
      .foreign("FkContactId")
      .references("ContactId")
      .inTable("Origination.DipContact");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.ApplicantIndividualAccountant");
  await knex.schema.dropTable("Origination.Applicant");
  await knex.schema.dropTable("Origination.ApplicantCompany");

  await knex.schema.alterTable("Origination.DipSecurity", (table) => {
    table.dropColumn("HowLongHere");
  });

  await knex.schema.alterTable("Origination.DipContactValue", (table) => {
    table.dropColumn("Phone");
    table.dropColumn("ContactMethod");
    table.dropColumn("NumberOfDependants");
  });
};
