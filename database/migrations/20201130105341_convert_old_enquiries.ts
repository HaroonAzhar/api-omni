import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const caseTable = "Origination.Case";

  const dipTable = "Origination.Dip";
  const dipFinancialDetailsTable = `Origination.DipLoanFinancialDetails`;

  const dipSecurityMappingTable = `Origination.DipSecurityDipMapping`;
  const dipSecurityTable = `Origination.DipSecurity`;
  const dipContactValueTable = "Origination.DipContactValue";

  const dipBuildingTypeTable = `Origination.DipBuildingType`;

  const dipBrokerTable = `Origination.DipBroker`;
  const dipIntroducerTypeTable = `${dipTable}IntroducerType`;

  const existingEnquiries = await knex(caseTable)
    .leftJoin(dipTable, `${dipTable}.FkCaseId`, `${caseTable}.CaseId`)
    .leftJoin(
      dipFinancialDetailsTable,
      `${dipTable}.FkLoanFinancialDetailsId`,
      `${dipFinancialDetailsTable}.LoanFinancialDetailsId`
    )
    .leftJoin(
      dipBuildingTypeTable,
      `${dipTable}.FkBuildingTypeId`,
      `${dipBuildingTypeTable}.BuildingTypeId`
    )
    .leftJoin(
      dipIntroducerTypeTable,
      `${dipTable}.FkIntroducerId`,
      `${dipIntroducerTypeTable}.IntroducerId`
    )
    .leftJoin(
      dipBrokerTable,
      `${dipTable}.FkBrokerId`,
      `${dipBrokerTable}.BrokerId`
    )
    .where({ Stage: "enquiry" });

  const getSecurities = async (DipId: number) => {
    const securities = await knex(dipSecurityMappingTable)
      .leftJoin(
        dipSecurityTable,
        `${dipSecurityMappingTable}.FkSecurityId`,
        `${dipSecurityTable}.SecurityId`
      )
      .where({ FkDipId: DipId });
    return securities;
  };

  const getContacts = async (FkContactId: number) => {
    if (FkContactId) {
      return await knex(dipContactValueTable).where({ FkContactId });
    }
    return [];
  };

  interface Security {
    SecurityAddressLine1?: string;
    SecurityAddressLine2?: string;
    SecurityAddressTownCity?: string;
    SecurityAddressPostcode?: string;
    SecurityAddressCountry?: string;
  }
  const formatAddress = (security: Security) =>
    [
      security.SecurityAddressLine1,
      security.SecurityAddressLine2,
      security.SecurityAddressTownCity,
      security.SecurityAddressPostcode,
      security.SecurityAddressCountry,
    ]
      .filter(Boolean)
      .join(", ");
  for (const enquiry of existingEnquiries) {
    const contacts = await getContacts(enquiry.FkContactId);
    const securities = await getSecurities(enquiry.DipId);

    const newEnquiry = {
      FkCaseId: enquiry.CaseId,
      Broker: enquiry.BrokerName,
      FkOriginatorId: enquiry.FkOriginatorId,
      FkBuildingTypeId: enquiry.FkBuildingTypeId,
      LoanFacilityType: "net",
      LoanFacility: enquiry.InitialNetLoanAmount,
      LoanTerm: enquiry.LoanTerm,
      ApproximateLtvDay1: enquiry.GrossDayOneLtv,
      ApproximateLtgdv: enquiry.Gdltv,
      EnquirerName: contacts.map((contact) => contact.Name).join(", "),
      PropertyLocation: securities.map(formatAddress).join("; "),
      PropertyType: (securities[0] || {}).SecurityType,
    };
    await knex("Origination.Enquiry").insert(newEnquiry);
  }
};

exports.down = async (knex: Knex) => knex;
