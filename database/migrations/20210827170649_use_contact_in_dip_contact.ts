import * as Knex from "knex";

const tableName = "Origination.DipContactValue";
const companyTableName = "Origination.DipCompany";
const contactTableName = "Origination.DipContact";
const contactTypeTableName = "Origination.DipContactType";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.integer("FkSharedContactId");
    table
      .foreign("FkSharedContactId")
      .references("Id")
      .inTable("OriginationAdmin.Contacts");
    table.integer("FkCompanyId");
    table
      .foreign("FkCompanyId")
      .references("CompanyId")
      .inTable("Origination.DipCompany");
  });

  const companyNames = await knex(tableName)
    .leftJoin(
      contactTableName,
      `${contactTableName}.ContactId`,
      `${tableName}.FkContactId`
    )
    .leftJoin(
      contactTypeTableName,
      `${contactTypeTableName}.ContactTypeId`,
      `${contactTableName}.FkContactTypeId`
    )
    .leftJoin(
      companyTableName,
      `${companyTableName}.CompanyId`,
      `${contactTableName}.FkCompanyContactId`
    )
    .where({ ContactType: "company" });

  await knex.schema.alterTable(companyTableName, async (table) => {
    table.string("Name");
  });

  for (const company of companyNames) {
    await knex(companyTableName)
      .update({ Name: company.Name })
      .where({ CompanyId: company.CompanyId });

    await knex(tableName)
      .update({ FkCompanyId: company.CompanyId })
      .where({ ContactValueId: company.ContactValueId });
  }
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.dropForeign(["FkSharedContactId"]);
    table.dropForeign(["FkCompanyId"]);

    table.dropColumn("FkSharedContactId");
    table.dropColumn("FkCompanyId");
  });

  await knex.schema.alterTable(companyTableName, async (table) => {
    table.dropColumn("Name");
  });
};
