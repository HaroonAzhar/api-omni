USE [Dawn_Data]
GO
/****** Object:  Schema [Origination]    Script Date: 14/02/2020 12:07:41 ******/
CREATE SCHEMA [Origination]
GO
/****** Object:  Table [Origination].[DipBuildingType]    Script Date: 14/02/2020 12:07:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipBuildingType](
	[BuildingTypeId] [int] IDENTITY(1,1) NOT NULL,
	[BuildingType] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[BuildingTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipContactType]    Script Date: 14/02/2020 12:07:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipContactType](
	[ContactTypeId] [int] IDENTITY(1,1) NOT NULL,
	[ContactType] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ContactTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipIntroducerType]    Script Date: 14/02/2020 12:07:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipIntroducerType](
	[IntroducerId] [int] IDENTITY(1,1) NOT NULL,
	[IntroducerType] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipLoanAdvanceType]    Script Date: 14/02/2020 12:07:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipLoanAdvanceType](
	[LoanAdvanceTypeId] [int] IDENTITY(1,1) NOT NULL,
	[AdvanceType] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[LoanAdvanceTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipLoanType]    Script Date: 14/02/2020 12:07:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipLoanType](
	[LoanTypeId] [int] IDENTITY(1,1) NOT NULL,
	[LoanType] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[LoanTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipOpflType]    Script Date: 14/02/2020 12:07:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipOpflType](
	[OpflTypeId] [int] IDENTITY(1,1) NOT NULL,
	[OpflType] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[OpflTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipStatus]    Script Date: 14/02/2020 12:07:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipStatus](
	[StatusId] [int] IDENTITY(1,1) NOT NULL,
	[Status] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [Origination].[DipBuildingType] ON 

INSERT [Origination].[DipBuildingType] ([BuildingTypeId], [BuildingType]) VALUES (1, N'development')
INSERT [Origination].[DipBuildingType] ([BuildingTypeId], [BuildingType]) VALUES (2, N'non_development')
SET IDENTITY_INSERT [Origination].[DipBuildingType] OFF
SET IDENTITY_INSERT [Origination].[DipContactType] ON 

INSERT [Origination].[DipContactType] ([ContactTypeId], [ContactType]) VALUES (1, N'company')
INSERT [Origination].[DipContactType] ([ContactTypeId], [ContactType]) VALUES (2, N'individual')
SET IDENTITY_INSERT [Origination].[DipContactType] OFF
SET IDENTITY_INSERT [Origination].[DipIntroducerType] ON 

INSERT [Origination].[DipIntroducerType] ([IntroducerId], [IntroducerType]) VALUES (1, N'direct_application')
INSERT [Origination].[DipIntroducerType] ([IntroducerId], [IntroducerType]) VALUES (2, N'via_broker')
SET IDENTITY_INSERT [Origination].[DipIntroducerType] OFF
SET IDENTITY_INSERT [Origination].[DipLoanAdvanceType] ON 

INSERT [Origination].[DipLoanAdvanceType] ([LoanAdvanceTypeId], [AdvanceType]) VALUES (1, N'single')
INSERT [Origination].[DipLoanAdvanceType] ([LoanAdvanceTypeId], [AdvanceType]) VALUES (2, N'multiple')
SET IDENTITY_INSERT [Origination].[DipLoanAdvanceType] OFF
SET IDENTITY_INSERT [Origination].[DipLoanType] ON 

INSERT [Origination].[DipLoanType] ([LoanTypeId], [LoanType]) VALUES (1, N'retained')
INSERT [Origination].[DipLoanType] ([LoanTypeId], [LoanType]) VALUES (2, N'serviced')
INSERT [Origination].[DipLoanType] ([LoanTypeId], [LoanType]) VALUES (3, N'rolled_up')
INSERT [Origination].[DipLoanType] ([LoanTypeId], [LoanType]) VALUES (4, N'hybrid')
SET IDENTITY_INSERT [Origination].[DipLoanType] OFF
SET IDENTITY_INSERT [Origination].[DipOpflType] ON 

INSERT [Origination].[DipOpflType] ([OpflTypeId], [OpflType]) VALUES (1, N'first_charge')
INSERT [Origination].[DipOpflType] ([OpflTypeId], [OpflType]) VALUES (2, N'second_charge')
SET IDENTITY_INSERT [Origination].[DipOpflType] OFF
SET IDENTITY_INSERT [Origination].[DipStatus] ON 

INSERT [Origination].[DipStatus] ([StatusId], [Status]) VALUES (1, N'pending')
INSERT [Origination].[DipStatus] ([StatusId], [Status]) VALUES (2, N'requires_adjustment')
INSERT [Origination].[DipStatus] ([StatusId], [Status]) VALUES (3, N'approved')
SET IDENTITY_INSERT [Origination].[DipStatus] OFF
/****** Object:  Index [Origination_DIP_Introducer_pk]    Script Date: 14/02/2020 12:07:42 ******/
ALTER TABLE [Origination].[DipIntroducerType] ADD  CONSTRAINT [Origination_DIP_Introducer_pk] PRIMARY KEY NONCLUSTERED 
(
	[IntroducerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO


USE [Dawn_Data]
GO
/****** Object:  Table [Origination].[Dip]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[Dip](
	[DipId] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [nvarchar](255) NULL,
	[FkLoanAdvanceTypeId] [int] NULL,
	[FkBuildingTypeId] [int] NULL,
	[FkTypeOfLoanId] [int] NULL,
	[FkContactId] [int] NULL,
	[FkLoanPropertyDevelopmentId] [int] NULL,
	[FkLoanFinancialDetailsId] [int] NULL,
	[DipFormId] [nvarchar](36) NULL,
	[FkIntroducerId] [int] NULL,
	[CaseNr] [nvarchar](255) NULL,
	[FkStatusId] [int] NULL,
	[FkBrokerId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[DipId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipBroker]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipBroker](
	[BrokerId] [int] IDENTITY(1,1) NOT NULL,
	[BrokerCompanyName] [nvarchar](255) NULL,
	[BrokerName] [nvarchar](255) NULL,
	[BrokerEmail] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[BrokerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipCompany]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipCompany](
	[CompanyId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyNumber] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipContact]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipContact](
	[ContactId] [int] IDENTITY(1,1) NOT NULL,
	[FkContactTypeId] [int] NULL,
	[FkCompanyContactId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ContactId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipContactValue]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipContactValue](
	[ContactValueId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Email] [nvarchar](255) NULL,
	[FkContactId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ContactValueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipLoanFinancialDetails]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipLoanFinancialDetails](
	[LoanFinacialDetailsId] [int] IDENTITY(1,1) NOT NULL,
	[LoanTerm] [int] NULL,
	[InitialNetLoanAmount] [decimal](38, 4) NULL,
	[GrossTotalLoanAmount] [decimal](38, 4) NULL,
	[MarketValue] [decimal](38, 4) NULL,
	[PurchasePrice] [numeric](18, 0) NULL,
	[ArrangementFee] [decimal](38, 4) NULL,
	[InterestRate] [numeric](18, 0) NULL,
	[TitleInsuranceFee] [numeric](18, 0) NULL,
	[LegalFee] [numeric](18, 0) NULL,
	[CommisionFee] [decimal](38, 4) NULL,
	[PremiumForLendersInsurance] [decimal](38, 4) NULL,
	[MaxLtvDayOne] [numeric](18, 0) NULL,
	[FkLoanFinancialDetailsDevId] [int] NULL,
	[FkLoanFinancialDetailsMultiId] [int] NULL,
	[FkHybridTerms] [int] NULL,
	[ArrangementFeeRepayment] [decimal](38, 4) NULL,
	[EstimatedInterest] [decimal](38, 4) NULL,
	[CompletionAdministrationFee] [decimal](38, 4) NULL,
	[BrokerFeeInValue] [decimal](38, 4) NULL,
	[BrokerFeeOutValue] [decimal](38, 4) NULL,
	[GrossAmountOfFirstAdvance] [decimal](38, 4) NULL,
	[GrossDayOneLtv] [decimal](38, 4) NULL,
	[GrossLoanFirstAdvance] [decimal](38, 4) NULL,
	[MaxTotalNetLoanAvailable] [decimal](38, 4) NULL,
	[TotalFees] [decimal](38, 4) NULL,
	[TotalLoanAmount] [decimal](38, 4) NULL,
	[TotalLoanFacility] [decimal](38, 4) NULL,
	[StartingPoint] [nvarchar](100) NULL,
	[InitialNetLoanAmountInput] [decimal](38, 4) NULL,
	[ArrangementFeeInput] [decimal](38, 4) NULL,
	[ArrangementFeeRepaymentInput] [decimal](38, 4) NULL,
	[LoanPurpose] [nvarchar](255) NULL,
	[ValueTypeOfLoanAmount] [nvarchar](30) NULL,
	[IntermediaryComissionFeePercent] [int] NULL,
	[ArrangementFeePercent] [int] NULL,
	[ArrangementFeeRepaymentPercent] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[LoanFinacialDetailsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipLoanFinancialDetailsDev]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipLoanFinancialDetailsDev](
	[LoanFinancialDetailsDevId] [int] IDENTITY(1,1) NOT NULL,
	[LtvToGdv] [numeric](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[LoanFinancialDetailsDevId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipLoanFinancialDetailsMulti]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipLoanFinancialDetailsMulti](
	[LoanFinancialDetailsMultiId] [int] IDENTITY(1,1) NOT NULL,
	[FurtherDrawDowns] [numeric](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[LoanFinancialDetailsMultiId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipLoanFinancialHybridTerms]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipLoanFinancialHybridTerms](
	[LoanFinancialHybridTermsId] [int] IDENTITY(1,1) NOT NULL,
	[Retained] [int] NULL,
	[Serviced] [int] NULL,
	[RolledUp] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[LoanFinancialHybridTermsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipLoanPropertyDevelopment]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipLoanPropertyDevelopment](
	[LoanPropertyDevelopmentId] [int] IDENTITY(1,1) NOT NULL,
	[BuildPeriodMonths] [int] NULL,
	[AppraisalReport] [numeric](18, 0) NULL,
	[MonthlyDrawdownReport] [numeric](18, 0) NULL,
	[ProgressReport] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[LoanPropertyDevelopmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipSecurity]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipSecurity](
	[SecurityId] [int] IDENTITY(1,1) NOT NULL,
	[EstimatedOpenMarketValue] [numeric](18, 0) NULL,
	[IsManualEditVisible] [bit] NULL,
	[SecurityAddress] [nvarchar](255) NULL,
	[SecurityAddressLine1] [nvarchar](255) NULL,
	[SecurityAddressLine2] [nvarchar](255) NULL,
	[SecurityTownCity] [nvarchar](255) NULL,
	[SecurityPostcode] [nvarchar](255) NULL,
	[SecurityCountry] [nvarchar](255) NULL,
	[SecurityInitialEstimation] [decimal](38, 4) NULL,
	[FkOpflTypeId] [int] NULL,
	[SecurityType] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[SecurityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Origination].[DipSecurityDipMapping]    Script Date: 14/02/2020 12:08:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Origination].[DipSecurityDipMapping](
	[SecurityDipMappingId] [int] IDENTITY(1,1) NOT NULL,
	[FkSecurityId] [int] NULL,
	[FkDipId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[SecurityDipMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Origination].[Dip]  WITH CHECK ADD  CONSTRAINT [dip_fkbrokerid_foreign] FOREIGN KEY([FkBrokerId])
REFERENCES [Origination].[DipBroker] ([BrokerId])
GO
ALTER TABLE [Origination].[Dip] CHECK CONSTRAINT [dip_fkbrokerid_foreign]
GO
ALTER TABLE [Origination].[Dip]  WITH CHECK ADD  CONSTRAINT [dip_fkbuildingtypeid_foreign] FOREIGN KEY([FkBuildingTypeId])
REFERENCES [Origination].[DipBuildingType] ([BuildingTypeId])
GO
ALTER TABLE [Origination].[Dip] CHECK CONSTRAINT [dip_fkbuildingtypeid_foreign]
GO
ALTER TABLE [Origination].[Dip]  WITH CHECK ADD  CONSTRAINT [dip_fkcontactid_foreign] FOREIGN KEY([FkContactId])
REFERENCES [Origination].[DipContact] ([ContactId])
GO
ALTER TABLE [Origination].[Dip] CHECK CONSTRAINT [dip_fkcontactid_foreign]
GO
ALTER TABLE [Origination].[Dip]  WITH CHECK ADD  CONSTRAINT [dip_fkintroducerid_foreign] FOREIGN KEY([FkIntroducerId])
REFERENCES [Origination].[DipIntroducerType] ([IntroducerId])
GO
ALTER TABLE [Origination].[Dip] CHECK CONSTRAINT [dip_fkintroducerid_foreign]
GO
ALTER TABLE [Origination].[Dip]  WITH CHECK ADD  CONSTRAINT [dip_fkloanadvancetypeid_foreign] FOREIGN KEY([FkLoanAdvanceTypeId])
REFERENCES [Origination].[DipLoanAdvanceType] ([LoanAdvanceTypeId])
GO
ALTER TABLE [Origination].[Dip] CHECK CONSTRAINT [dip_fkloanadvancetypeid_foreign]
GO
ALTER TABLE [Origination].[Dip]  WITH CHECK ADD  CONSTRAINT [dip_fkloanfinancialdetailsid_foreign] FOREIGN KEY([FkLoanFinancialDetailsId])
REFERENCES [Origination].[DipLoanFinancialDetails] ([LoanFinacialDetailsId])
GO
ALTER TABLE [Origination].[Dip] CHECK CONSTRAINT [dip_fkloanfinancialdetailsid_foreign]
GO
ALTER TABLE [Origination].[Dip]  WITH CHECK ADD  CONSTRAINT [dip_fkloanpropertydevelopmentid_foreign] FOREIGN KEY([FkLoanPropertyDevelopmentId])
REFERENCES [Origination].[DipLoanPropertyDevelopment] ([LoanPropertyDevelopmentId])
GO
ALTER TABLE [Origination].[Dip] CHECK CONSTRAINT [dip_fkloanpropertydevelopmentid_foreign]
GO
ALTER TABLE [Origination].[Dip]  WITH CHECK ADD  CONSTRAINT [dip_fkstatusid_foreign] FOREIGN KEY([FkStatusId])
REFERENCES [Origination].[DipStatus] ([StatusId])
GO
ALTER TABLE [Origination].[Dip] CHECK CONSTRAINT [dip_fkstatusid_foreign]
GO
ALTER TABLE [Origination].[Dip]  WITH CHECK ADD  CONSTRAINT [dip_fktypeofloanid_foreign] FOREIGN KEY([FkTypeOfLoanId])
REFERENCES [Origination].[DipLoanType] ([LoanTypeId])
GO
ALTER TABLE [Origination].[Dip] CHECK CONSTRAINT [dip_fktypeofloanid_foreign]
GO
ALTER TABLE [Origination].[DipContact]  WITH CHECK ADD  CONSTRAINT [dipcontact_fkcompanycontactid_foreign] FOREIGN KEY([FkCompanyContactId])
REFERENCES [Origination].[DipCompany] ([CompanyId])
GO
ALTER TABLE [Origination].[DipContact] CHECK CONSTRAINT [dipcontact_fkcompanycontactid_foreign]
GO
ALTER TABLE [Origination].[DipContact]  WITH CHECK ADD  CONSTRAINT [dipcontact_fkcontacttypeid_foreign] FOREIGN KEY([FkContactTypeId])
REFERENCES [Origination].[DipContactType] ([ContactTypeId])
GO
ALTER TABLE [Origination].[DipContact] CHECK CONSTRAINT [dipcontact_fkcontacttypeid_foreign]
GO
ALTER TABLE [Origination].[DipContactValue]  WITH CHECK ADD  CONSTRAINT [dipcontactvalue_fkcontactid_foreign] FOREIGN KEY([FkContactId])
REFERENCES [Origination].[DipContact] ([ContactId])
GO
ALTER TABLE [Origination].[DipContactValue] CHECK CONSTRAINT [dipcontactvalue_fkcontactid_foreign]
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails]  WITH CHECK ADD  CONSTRAINT [diploanfinancialdetails_fkhybridterms_foreign] FOREIGN KEY([FkHybridTerms])
REFERENCES [Origination].[DipLoanFinancialHybridTerms] ([LoanFinancialHybridTermsId])
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] CHECK CONSTRAINT [diploanfinancialdetails_fkhybridterms_foreign]
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails]  WITH CHECK ADD  CONSTRAINT [diploanfinancialdetails_fkloanfinancialdetailsdevid_foreign] FOREIGN KEY([FkLoanFinancialDetailsDevId])
REFERENCES [Origination].[DipLoanFinancialDetailsDev] ([LoanFinancialDetailsDevId])
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] CHECK CONSTRAINT [diploanfinancialdetails_fkloanfinancialdetailsdevid_foreign]
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails]  WITH CHECK ADD  CONSTRAINT [diploanfinancialdetails_fkloanfinancialdetailsmultiid_foreign] FOREIGN KEY([FkLoanFinancialDetailsMultiId])
REFERENCES [Origination].[DipLoanFinancialDetailsMulti] ([LoanFinancialDetailsMultiId])
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] CHECK CONSTRAINT [diploanfinancialdetails_fkloanfinancialdetailsmultiid_foreign]
GO
ALTER TABLE [Origination].[DipSecurity]  WITH CHECK ADD  CONSTRAINT [dipsecurity_fkopfltypeid_foreign] FOREIGN KEY([FkOpflTypeId])
REFERENCES [Origination].[DipOpflType] ([OpflTypeId])
GO
ALTER TABLE [Origination].[DipSecurity] CHECK CONSTRAINT [dipsecurity_fkopfltypeid_foreign]
GO
ALTER TABLE [Origination].[DipSecurityDipMapping]  WITH CHECK ADD  CONSTRAINT [dipsecuritydipmapping_fkdipid_foreign] FOREIGN KEY([FkDipId])
REFERENCES [Origination].[Dip] ([DipId])
GO
ALTER TABLE [Origination].[DipSecurityDipMapping] CHECK CONSTRAINT [dipsecuritydipmapping_fkdipid_foreign]
GO
ALTER TABLE [Origination].[DipSecurityDipMapping]  WITH CHECK ADD  CONSTRAINT [dipsecuritydipmapping_fksecurityid_foreign] FOREIGN KEY([FkSecurityId])
REFERENCES [Origination].[DipSecurity] ([SecurityId])
GO
ALTER TABLE [Origination].[DipSecurityDipMapping] CHECK CONSTRAINT [dipsecuritydipmapping_fksecurityid_foreign]
GO
