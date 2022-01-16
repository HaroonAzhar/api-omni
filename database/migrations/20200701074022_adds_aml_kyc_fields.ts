import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const fieldsBooleanToDrop = [
    "Aml",
    "Ccj",
    "Cifas",
    "CreditSafe",
    "GoogleSearch",
    "VotersRoll",
  ];
  const fieldsTextToDrop = [
    "AmlDetails",
    "CcjDetails",
    "ProofOfAddressDetails",
    "ProofOfIdDetails",
  ];
  const fieldsStringToDrop = ["ProofOfAddress", "ProofOfId"];
  for (const item of fieldsBooleanToDrop) {
    await knex.schema.alterTable("Origination.AmlKyc", async (table) => {
      table.boolean(item).nullable().alter();
    });
  }

  for (const item of fieldsTextToDrop) {
    await knex.schema.alterTable("Origination.AmlKyc", async (table) => {
      table.text(item).nullable().alter();
    });
  }

  for (const item of fieldsStringToDrop) {
    await knex.schema.alterTable("Origination.AmlKyc", async (table) => {
      table.string(item).nullable().alter();
    });
  }

  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.boolean("ClientArrivalInUk");
    table.boolean("ThirdPartyVerification");
    table.string("CorporateStructure");
    table.boolean("VerificationCompanyIsSubsidiary");
    table.string("SedolNoExchange");
    table.boolean("EvidenceOfAuthorityToActForFirm");
    table.string("NumberOfIndividuals");
    table.boolean("PartnerVerifiedAsIndividual");
    table.string("EvidenceOfTradingAddress");
    table.string("PurposeOfPartnership");
    table.boolean("PartnershipAgreementOnFile");
    table.boolean("PersonWithControlVerifiedAsIndividual");
    table.boolean("CertificateOfIncorporation");
    table.boolean("ListOfShareholders");
    table.string("VerificationDocumentsOnFile");
    table.boolean("PersonWithInterestVerifiedAsIndividual");
    table.boolean("ShareholdersVerifiedAsIndividual");
    table.boolean("LawSocietyMembershipConfirmed");
    table.boolean("IcaewMembershipConfirmed");
    table.string("SettlorType");
    table.string("TrusteeType");
    table.string("ControllerType");
    table.boolean("SourceOfFundsConfirmed");
    table.boolean("IsPep");
    table.boolean("ElectronicDocumentCheckSatisfactory");
    table.boolean("IsOnSanctionsList");
    table.boolean("CopiesOnFile");
    table.boolean("AdverseMediaCheckSatisfactory");
    table.boolean("AnySuspicionOfMoneyLaundering");
    table.string("LinksToHighRiskJurisdiction");
    table.string("AdditionalNotes");
  });
};

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.dropColumn("ClientArrivalInUk");
    table.dropColumn("ThirdPartyVerification");
    table.dropColumn("CorporateStructure");
    table.dropColumn("VerificationCompanyIsSubsidiary");
    table.dropColumn("SedolNoExchange");
    table.dropColumn("EvidenceOfAuthorityToActForFirm");
    table.dropColumn("NumberOfIndividuals");
    table.dropColumn("PartnerVerifiedAsIndividual");
    table.dropColumn("EvidenceOfTradingAddress");
    table.dropColumn("PurposeOfPartnership");
    table.dropColumn("PartnershipAgreementOnFile");
    table.dropColumn("PersonWithControlVerifiedAsIndividual");
    table.dropColumn("CertificateOfIncorporation");
    table.dropColumn("ListOfShareholders");
    table.dropColumn("VerificationDocumentsOnFile");
    table.dropColumn("PersonWithInterestVerifiedAsIndividual");
    table.dropColumn("ShareholdersVerifiedAsIndividual");
    table.dropColumn("LawSocietyMembershipConfirmed");
    table.dropColumn("IcaewMembershipConfirmed");
    table.dropColumn("SettlorType");
    table.dropColumn("TrusteeType");
    table.dropColumn("ControllerType");
    table.dropColumn("SourceOfFundsConfirmed");
    table.dropColumn("IsPep");
    table.dropColumn("ElectronicDocumentCheckSatisfactory");
    table.dropColumn("IsOnSanctionsList");
    table.dropColumn("CopiesOnFile");
    table.dropColumn("AdverseMediaCheckSatisfactory");
    table.dropColumn("AnySuspicionOfMoneyLaundering");
    table.dropColumn("LinksToHighRiskJurisdiction");
    table.dropColumn("AdditionalNotes");
  });
