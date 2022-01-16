CREATE TABLE [Origination].[Applicant] ([ApplicantId] int identity(1,1) not null primary key, [Title] nvarchar(255), [Forename] nvarchar(255), [MiddleName] nvarchar(255), [Surname] nvarchar(255), [OtherName] nvarchar(255), [DateOfBirth] nvarchar(255), [PlaceOfBirth] nvarchar(255), [InsuranceNumber] nvarchar(255), [Nationality] nvarchar(255), [PermanentResident] nvarchar(255), [MartialStatus] nvarchar(255), [MartialOtherValue] nvarchar(255), [FkCaseId] int, [FkContactId] int, CONSTRAINT [origination_applicant_fkcaseid_foreign] FOREIGN KEY ([FkCaseId]) REFERENCES [Origination].[Case] ([CaseId]), CONSTRAINT [origination_applicant_fkcontactid_foreign] FOREIGN KEY ([FkContactId]) REFERENCES [Origination].[DipContact] ([ContactId]))
GO
CREATE TABLE [Origination].[ApplicantIndividualAccountant] ([ApplicantIndividualAccountantId] int identity(1,1) not null primary key, [Name] nvarchar(255), [Surname] nvarchar(255), [Qualification] nvarchar(255), [FkApplicantId] int, CONSTRAINT [origination_applicantindividualaccountant_fkapplicantid_foreign] FOREIGN KEY ([FkApplicantId]) REFERENCES [Origination].[Applicant] ([ApplicantId]))
GO
CREATE TABLE [Origination].[ApplicantAddressMapping] ([ApplicantAddressMappingId] int identity(1,1) not null primary key, [AddressType] nvarchar(255), [FkApplicantId] int, [FkAddressId] int, CONSTRAINT [origination_applicantaddressmapping_fkapplicantid_foreign] FOREIGN KEY ([FkApplicantId]) REFERENCES [Origination].[Applicant] ([ApplicantId]), CONSTRAINT [origination_applicantaddressmapping_fkaddressid_foreign] FOREIGN KEY ([FkAddressId]) REFERENCES [Origination].[DipSecurity] ([SecurityId]))
GO
ALTER TABLE [Origination].[DipSecurity] ADD [HowLongHere] nvarchar(255)
GO
ALTER TABLE [Origination].[DipContactValue] ADD [Phone] nvarchar(255), [ContactMethod] nvarchar(255), [NumberOfDependants] nvarchar(255)
GO
CREATE TABLE [Origination].[ApplicantCompany] ([ApplicantCompanyId] int identity(1,1) not null primary key, [ApplicantName] nvarchar(255), [CompanyNumber] nvarchar(255), [NumberOfPartners] nvarchar(255), [CompanyType] nvarchar(255), [CompanyOtherTypeValue] nvarchar(255), [CompanyRegistrationNumber] nvarchar(255), [NatureOfBusiness] nvarchar(255), [TradingSince] nvarchar(255), [Directors] nvarchar(max), [SharedHolders] nvarchar(max), [FkAddressId] int, [FkCaseId] int, [FkContactId] int, CONSTRAINT [origination_applicantcompany_fkaddressid_foreign] FOREIGN KEY ([FkAddressId]) REFERENCES [Origination].[DipSecurity] ([SecurityId]), CONSTRAINT [origination_applicantcompany_fkcaseid_foreign] FOREIGN KEY ([FkCaseId]) REFERENCES [Origination].[Case] ([CaseId]), CONSTRAINT [origination_applicantcompany_fkcontactid_foreign] FOREIGN KEY ([FkContactId]) REFERENCES [Origination].[DipContact] ([ContactId]))
GO
EXEC sp_rename 'Origination.ApplicantIndividualAccountant', 'ApplicantAccountant';
GO

select
       fk.name as Name
from sys.foreign_keys fk
         inner join sys.tables fk_tab
                    on fk_tab.object_id = fk.parent_object_id
         inner join sys.tables pk_tab
                    on pk_tab.object_id = fk.referenced_object_id
         cross apply (select col.[name] + ', '
                      from sys.foreign_key_columns fk_c
                               inner join sys.columns col
                                          on fk_c.parent_object_id = col.object_id
                                              and fk_c.parent_column_id = col.column_id
                      where fk_c.parent_object_id = fk_tab.object_id
                        and fk_c.constraint_object_id = fk.object_id
                      order by col.column_id
                      for xml path ('') ) D (column_names)
where fk_tab.name = 'Applicant' AND column_names = 'FkContactId,'
GO
exec sp_rename '[Origination].[ApplicantAccountant].ApplicantIndividualAccountantId', 'ApplicantAccountantId', 'COLUMN'
GO
ALTER TABLE [Origination].[Applicant] alter column [PermanentResident] bit;
ALTER TABLE [Origination].[Applicant] DROP CONSTRAINT [origination_applicant_fkcontactid_foreign];
ALTER TABLE [Origination].[Applicant] ADD CONSTRAINT [origination_applicant_fkcontactid_foreign] FOREIGN KEY ([FkContactId]) REFERENCES [Origination].[DipContactValue] ([ContactValueId])
GO
ALTER TABLE [Origination].[Applicant] alter column [PermanentResident] bit;
ALTER TABLE [Origination].[Applicant] DROP CONSTRAINT [origination_applicant_fkcontactid_foreign];
ALTER TABLE [Origination].[Applicant] ADD CONSTRAINT [origination_applicant_fkcontactid_foreign] FOREIGN KEY ([FkContactId]) REFERENCES [Origination].[DipContactValue] ([ContactValueId])
GO
ALTER TABLE [Origination].[Applicant] alter column [PermanentResident] bit;
ALTER TABLE [Origination].[Applicant] DROP CONSTRAINT [origination_applicant_fkcontactid_foreign];
ALTER TABLE [Origination].[Applicant] ADD CONSTRAINT [origination_applicant_fkcontactid_foreign] FOREIGN KEY ([FkContactId]) REFERENCES [Origination].[DipContactValue] ([ContactValueId])
GO
ALTER TABLE [Origination].[ApplicantCompany] ADD [Name] nvarchar(100), [IsCorrespondenceSame] bit
GO

select
       fk.name as Name
from sys.foreign_keys fk
         inner join sys.tables fk_tab
                    on fk_tab.object_id = fk.parent_object_id
         inner join sys.tables pk_tab
                    on pk_tab.object_id = fk.referenced_object_id
         cross apply (select col.[name] + ', '
                      from sys.foreign_key_columns fk_c
                               inner join sys.columns col
                                          on fk_c.parent_object_id = col.object_id
                                              and fk_c.parent_column_id = col.column_id
                      where fk_c.parent_object_id = fk_tab.object_id
                        and fk_c.constraint_object_id = fk.object_id
                      order by col.column_id
                      for xml path ('') ) D (column_names)
where fk_tab.name = 'ApplicantAddressMapping' AND column_names = 'FkApplicantId,'
GO
ALTER TABLE [Origination].[ApplicantAddressMapping] DROP CONSTRAINT [origination_applicantaddressmapping_fkapplicantid_foreign]
GO

select
       fk.name as Name
from sys.foreign_keys fk
         inner join sys.tables fk_tab
                    on fk_tab.object_id = fk.parent_object_id
         inner join sys.tables pk_tab
                    on pk_tab.object_id = fk.referenced_object_id
         cross apply (select col.[name] + ', '
                      from sys.foreign_key_columns fk_c
                               inner join sys.columns col
                                          on fk_c.parent_object_id = col.object_id
                                              and fk_c.parent_column_id = col.column_id
                      where fk_c.parent_object_id = fk_tab.object_id
                        and fk_c.constraint_object_id = fk.object_id
                      order by col.column_id
                      for xml path ('') ) D (column_names)
where fk_tab.name = 'ApplicantAccountant' AND column_names = 'FkApplicantId,'
GO
ALTER TABLE [Origination].[ApplicantAccountant] DROP CONSTRAINT [origination_applicantindividualaccountant_fkapplicantid_foreign]
GO

select
       fk.name as Name
from sys.foreign_keys fk
         inner join sys.tables fk_tab
                    on fk_tab.object_id = fk.parent_object_id
         inner join sys.tables pk_tab
                    on pk_tab.object_id = fk.referenced_object_id
         cross apply (select col.[name] + ', '
                      from sys.foreign_key_columns fk_c
                               inner join sys.columns col
                                          on fk_c.parent_object_id = col.object_id
                                              and fk_c.parent_column_id = col.column_id
                      where fk_c.parent_object_id = fk_tab.object_id
                        and fk_c.constraint_object_id = fk.object_id
                      order by col.column_id
                      for xml path ('') ) D (column_names)
where fk_tab.name = 'ApplicantCompany' AND column_names = 'FkContactId,'
GO
ALTER TABLE [Origination].[ApplicantCompany] DROP CONSTRAINT [origination_applicantcompany_fkcontactid_foreign]
GO
ALTER TABLE [Origination].[ApplicantCompany] ADD CONSTRAINT [origination_applicantcompany_fkcontactid_foreign] FOREIGN KEY ([FkContactId]) REFERENCES [Origination].[DipContactValue] ([ContactValueId])
GO
CREATE TABLE [Origination].[ApplicantCreditHistory] ([ApplicantCreditHistoryId] int identity(1,1) not null primary key, [DebtJudgement] bit, [DeclaredBankrupt] bit, [FailedToKeep] bit, [ClaimDss] bit, [ConvictedFraud] bit, [FailedToKeepDetails] nvarchar(255), [ClaimDssDetails] nvarchar(255), [ConvictedFraudDetails] nvarchar(255), [RefusedMortgage] bit, [FkApplicantId] int)
GO
ALTER TABLE [Origination].[Applicant] ADD [FkApplicantCreditHistoryId] int;
ALTER TABLE [Origination].[Applicant] ADD CONSTRAINT [origination_applicant_fkapplicantcredithistoryid_foreign] FOREIGN KEY ([FkApplicantCreditHistoryId]) REFERENCES [Origination].[ApplicantCreditHistory] ([ApplicantCreditHistoryId])
GO
ALTER TABLE [Origination].[ApplicantCompany] ADD [FkApplicantCreditHistoryId] int;
ALTER TABLE [Origination].[ApplicantCompany] ADD CONSTRAINT [origination_applicantcompany_fkapplicantcredithistoryid_foreign] FOREIGN KEY ([FkApplicantCreditHistoryId]) REFERENCES [Origination].[ApplicantCreditHistory] ([ApplicantCreditHistoryId])
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] ADD [FurtherDrawDownsBorrowing] int, [InitialNetLoan] int, [Term] int, [PurposeOfBorrowings] nvarchar(max), [SourceOfDeposit] nvarchar(max), [RepaymentMethod] nvarchar(100), [ProposedCompletionDate] nvarchar(100)
GO
CREATE TABLE [Origination].[CaseIntroducer] ([CaseIntroducerId] int identity(1,1) not null primary key, [Firm] nvarchar(255), [Introducer] nvarchar(255), [AddressLine1] nvarchar(255), [AddressLine2] nvarchar(255), [City] nvarchar(255), [Postcode] nvarchar(255), [Country] nvarchar(255), [PhoneNumber] nvarchar(255), [Email] nvarchar(255), [InterimPermissionNumber] nvarchar(255), [HaveMetClient] bit, [FkCaseId] int, CONSTRAINT [origination_caseintroducer_fkcaseid_foreign] FOREIGN KEY ([FkCaseId]) REFERENCES [Origination].[Case] ([CaseId]))
GO
CREATE TABLE [Origination].[CaseSolicitor] ([CaseSolicitorId] int identity(1,1) not null primary key, [AreLeastTwoPartners] bit, [CompanyName] nvarchar(255), [AddressLine1] nvarchar(255), [AddressLine2] nvarchar(255), [City] nvarchar(255), [Postcode] nvarchar(255), [Country] nvarchar(255), [PhoneNumber] nvarchar(255), [Email] nvarchar(255), [ContactName] nvarchar(255), [FkCaseId] int, CONSTRAINT [origination_casesolicitor_fkcaseid_foreign] FOREIGN KEY ([FkCaseId]) REFERENCES [Origination].[Case] ([CaseId]))
GO
ALTER TABLE [Origination].[Case] ADD [AdditionalInformation] nvarchar(max)
GO
CREATE TABLE [Origination].[CaseProperty] ([CasePropertyId] int identity(1,1) not null primary key, [AlreadyOwned] bit, [BeingPurchased] bit, [CurrentValue] decimal(38, 4), [ValueAfterWorks] decimal(38, 4), [PurchasePrice] decimal(38, 4), [PurposeOfBorrowings] nvarchar(255), [PropertyType] nvarchar(255), [IsNewBuild] bit, [IsStandardConstruction] bit, [IsPlanningRequired] bit, [IsOccupied] bit, [BasisForOccupation] nvarchar(255), [Intentions] nvarchar(255), [ContactForAccessValuation] nvarchar(255), [ContactForPaymentValuation] nvarchar(255), [OpflChargeType] nvarchar(255), [Lenders] nvarchar(max), [CurrentMortgageOutstanding] decimal(38, 4), [AddressLine1] nvarchar(255), [AddressLine2] nvarchar(255), [AddressPostcode] nvarchar(255), [AddressCity] nvarchar(255), [AddressCountry] nvarchar(255), [FkCaseId] int, CONSTRAINT [origination_caseproperty_fkcaseid_foreign] FOREIGN KEY ([FkCaseId]) REFERENCES [Origination].[Case] ([CaseId]))
GO
ALTER TABLE [Origination].[Applicant] ADD [Declaration] bit, [Signature] bit, [DateOfDeclaration] nvarchar(255), [DateOfSignature] nvarchar(255)
GO
CREATE TABLE [Origination].[ApplicantPropertyPortfolio] ([ApplicantPropertyPortfolioId] int identity(1,1) not null primary key, [IsWhereResides] bit, [AddressLine1] nvarchar(255), [AddressLine2] nvarchar(255), [Postcode] nvarchar(255), [City] nvarchar(255), [Country] nvarchar(255), [NameOfLender] nvarchar(255), [EstimatedValue] decimal(38, 4), [CurrentDebt] decimal(38, 4), [MonthlyMortgage] decimal(38, 4), [MonthlyRental] decimal(38, 4), [FkApplicantId] int, CONSTRAINT [origination_applicantpropertyportfolio_fkapplicantid_foreign] FOREIGN KEY ([FkApplicantId]) REFERENCES [Origination].[Applicant] ([ApplicantId]))
GO
ALTER TABLE [Origination].[ApplicantCreditHistory] ADD [Details] nvarchar(255);
ALTER TABLE [Origination].[ApplicantCreditHistory] DROP COLUMN [FailedToKeepDetails], [ClaimDssDetails], [ConvictedFraudDetails]
GO
CREATE TABLE [Origination].[ApplicantAsset] ([ApplicantAssetId] int identity(1,1) not null primary key, [Type] nvarchar(255), [Description] nvarchar(255), [GrossValue] decimal(38, 4), [OutstandingDebt] decimal(38, 4), [NetValue] decimal(38, 4), [FkApplicantId] int)
GO
CREATE TABLE [Origination].[ApplicantLiability] ([ApplicantLiabilityId] int identity(1,1) not null primary key, [Type] nvarchar(255), [Description] nvarchar(255), [NetValue] decimal(38, 4), [FkApplicantId] int)
GO
ALTER TABLE [Origination].[CaseProperty] ADD [YearsRemainingOnLease] decimal(38, 4)
GO
ALTER TABLE [Origination].[Applicant] ADD [MothersMaidenName] nvarchar(255), [CurrentResidentialStatus] nvarchar(255)
GO
CREATE TABLE [Origination].[ApplicantAssetsLiabilitiesAdditional] ([ApplicantAssetsLiabilitiesAdditionalId] int identity(1,1) not null primary key, [TotalLiabilities] decimal(38, 4), [TotalAssets] decimal(38, 4), [FkApplicantId] int, CONSTRAINT [origination_applicantassetsliabilitiesadditional_fkapplicantid_foreign] FOREIGN KEY ([FkApplicantId]) REFERENCES [Origination].[Applicant] ([ApplicantId]))
GO
ALTER TABLE [Origination].[DipContactValue] ADD [MobilePhone] nvarchar(255), [HomePhone] nvarchar(255)
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] ADD [RepaymentMethodDetails] nvarchar(400)
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] alter column [FurtherDrawDownsBorrowing] decimal(38, 4)
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] alter column [InitialNetLoan] decimal(38, 4)
GO
CREATE TABLE [Origination].[CaseStatus] ([CaseStatusId] int identity(1,1) not null primary key, [Name] nvarchar(100))
GO
ALTER TABLE [Origination].[Case] ADD [FkCaseStatusId] int;
ALTER TABLE [Origination].[Case] ADD CONSTRAINT [FK_CASE_CASE_STATUS_ID] FOREIGN KEY ([FkCaseStatusId]) REFERENCES [Origination].[CaseStatus] ([CaseStatusId])
GO
ALTER TABLE [Origination].[Case] ADD [CreatedAt] datetime2
GO

insert into [Origination].[CaseStatus] ([Name]) values ('pending'), ('received'), ('withdrawn'), ('issued'), ('expired'), ('received'), ('in_progress'), ('ready_to_check'), ('checked'), ('awaiting_application'), ('not_proceeding')
GO
insert into [Origination].[CaseStatus] ([Name]) values ('awaiting_application'), ('not_proceeding')
GO
insert into [Origination].[CaseStatus] ([Name]) values ('live'), ('in_full'), ('with_shortfall')
GO

update [Origination].[Case] set [FkCaseStatusId] = 4 where [FkCaseStatusId] is null;select @@rowcount
GO

update [Origination].[Case] set [CreatedAt] = getdate();
GO


ALTER TABLE [Origination].[Dip] DROP COLUMN [CreatedAt];
ALTER TABLE [Origination].[Dip] DROP CONSTRAINT [dip_fkstatusid_foreign];
ALTER TABLE [Origination].[Dip] DROP COLUMN [FkStatusId]
GO

DROP TABLE [Origination].[DipStatus]
GO
CREATE TABLE [Origination].[PropertyValuationReport] ([PropertyValuationReportId] int identity(1,1) not null primary key, [ValuationBasis] nvarchar(100), [ValuationMethod] nvarchar(100), [ReportDate] nvarchar(100), [InspectionDate] nvarchar(100), [MarketValue] decimal(38, 4), [DayValue] decimal(38, 4), [Gdv] decimal(38, 4), [DayGdv] nvarchar(100), [ReinstatementValue] decimal(38, 4), [TitleNo] nvarchar(100), [SecurityDescription] nvarchar(max), [SecuritySubtype] nvarchar(100), [FirstChargeOutstanding] nvarchar(100), [SingleMultiUnit] nvarchar(100), [PlanningDetails] nvarchar(100), [Country] nvarchar(100), [NitrateNeutrality] bit, [BuildTime] nvarchar(100), [BuildCosts] decimal(38, 4), [CommencementDateOfWorks] nvarchar(100), [ProfessionalTeam] nvarchar(100), [PricePerSquareFoot] decimal(38, 4), [PricePerSquareMeters] decimal(38, 4), [TotalSquareFeet] decimal(38, 4), [TotalSquareMeters] decimal(38, 4), [TotalValue] decimal(38, 4), [FkPropertyId] int, CONSTRAINT [origination_propertyvaluationreport_fkpropertyid_foreign] FOREIGN KEY ([FkPropertyId]) REFERENCES [Origination].[CaseProperty] ([CasePropertyId]))
GO