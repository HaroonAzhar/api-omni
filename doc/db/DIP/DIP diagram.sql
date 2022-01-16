CREATE TABLE [Origination.DIP.DIP] (
  [dip_id] int PRIMARY KEY IDENTITY(1, 1),
  [created_at] datetime,
  [created_by] nvarchar(255),
  [fk_loan_advance_type_id] int,
  [fk_building_type_id] int,
  [fk_type_of_loan_id] int,
  [fk_contact_id] int,
  [fk_loan_property_development_id] int,
  [fk_loan_financial_details_id] int
)
GO

CREATE TABLE [Origination.DIP.LoanAdvanceType] (
  [loan_advance_type_id] int PRIMARY KEY IDENTITY(1, 1),
  [advance_type] nvarchar(255)
)
GO

CREATE TABLE [Origination.DIP.LoanType] (
  [loan_type_id] int PRIMARY KEY IDENTITY(1, 1),
  [loan_type] nvarchar(255)
)
GO

CREATE TABLE [Origination.DIP.BuildingType] (
  [building_type_id] int PRIMARY KEY IDENTITY(1, 1),
  [building_type] nvarchar(255)
)
GO

CREATE TABLE [Origination.DIP.Contact] (
  [contact_id] int PRIMARY KEY IDENTITY(1, 1),
  [fk_contact_type_id] int,
  [fk_company_contact_id] int,
  [name] nvarchar(255),
  [email] nvarchar(255)
)
GO

CREATE TABLE [Origination.DIP.Company] (
  [company_id] int PRIMARY KEY IDENTITY(1, 1),
  [company_number] int
)
GO

CREATE TABLE [Origination.DIP.ContactTypes] (
  [contact_type_id] int PRIMARY KEY IDENTITY(1, 1),
  [contact_type] nvarchar(255)
)
GO

CREATE TABLE [Origination.DIP.Security] (
  [security_id] int PRIMARY KEY IDENTITY(1, 1),
  [address] nvarchar(255),
  [estimated_open_market_value] numeric
)
GO

CREATE TABLE [Origination.DIP.SecurityDipMapping] (
  [security_dip_mapping_id] int PRIMARY KEY IDENTITY(1, 1),
  [fk_security_id] int,
  [fk_dip_id] int
)
GO

CREATE TABLE [Origination.DIP.LoanFinancialDetails] (
  [loan_finacial_details_id] int PRIMARY KEY IDENTITY(1, 1),
  [loan_term] int,
  [initial_net_loan_amount] numeric,
  [gross_total_loan_amount] numeric,
  [market_value] numeric,
  [purchase_price] numeric,
  [arrangement_fee] numeric,
  [interest_rate] numeric,
  [title_insurance_fee] numeric,
  [legal_fee] numeric,
  [commision_fee] numeric,
  [premium_for_lenders_insurance] numeric,
  [max_ltv_day_one] numeric,
  [fk_loan_financial_details_dev_id] int,
  [fk_loan_financial_details_multi_id] int,
  [fk_hybrid_terms] int
)
GO

CREATE TABLE [Origination.DIP.LoanPropertyDevelopment] (
  [loan_property_development_id] int PRIMARY KEY IDENTITY(1, 1),
  [build_period_months] int,
  [appraisal_report] numeric,
  [monthly_drawdown_report] numeric
)
GO

CREATE TABLE [Origination.DIP.LoanFinancialDetailsDev] (
  [loan_financial_details_dev_id] int PRIMARY KEY IDENTITY(1, 1),
  [ltv_to_gdv] numeric
)
GO

CREATE TABLE [Origination.DIP.LoanFinancialDetailsMulti] (
  [loan_financial_details_multi_id] int PRIMARY KEY IDENTITY(1, 1),
  [further_draw_downs] numeric
)
GO

CREATE TABLE [Origination.DIP.LoanFinancialHybridTerms] (
  [loan_financial_hybrid_terms_id] int PRIMARY KEY IDENTITY(1, 1),
  [retained] int,
  [serviced] int,
  [rolled_up] int
)
GO

ALTER TABLE [Origination.DIP.LoanAdvanceType] ADD FOREIGN KEY ([loan_advance_type_id]) REFERENCES [Origination.DIP.DIP] ([fk_loan_advance_type_id])
GO

ALTER TABLE [Origination.DIP.BuildingType] ADD FOREIGN KEY ([building_type_id]) REFERENCES [Origination.DIP.DIP] ([fk_building_type_id])
GO

ALTER TABLE [Origination.DIP.LoanType] ADD FOREIGN KEY ([loan_type_id]) REFERENCES [Origination.DIP.DIP] ([fk_type_of_loan_id])
GO

ALTER TABLE [Origination.DIP.Contact] ADD FOREIGN KEY ([contact_id]) REFERENCES [Origination.DIP.DIP] ([fk_contact_id])
GO

ALTER TABLE [Origination.DIP.LoanFinancialDetails] ADD FOREIGN KEY ([loan_finacial_details_id]) REFERENCES [Origination.DIP.DIP] ([fk_loan_financial_details_id])
GO

ALTER TABLE [Origination.DIP.LoanPropertyDevelopment] ADD FOREIGN KEY ([loan_property_development_id]) REFERENCES [Origination.DIP.DIP] ([fk_loan_property_development_id])
GO

ALTER TABLE [Origination.DIP.Security] ADD FOREIGN KEY ([security_id]) REFERENCES [Origination.DIP.SecurityDipMapping] ([fk_security_id])
GO

ALTER TABLE [Origination.DIP.DIP] ADD FOREIGN KEY ([dip_id]) REFERENCES [Origination.DIP.SecurityDipMapping] ([fk_dip_id])
GO

ALTER TABLE [Origination.DIP.LoanFinancialDetailsDev] ADD FOREIGN KEY ([loan_financial_details_dev_id]) REFERENCES [Origination.DIP.LoanFinancialDetails] ([fk_loan_financial_details_dev_id])
GO

ALTER TABLE [Origination.DIP.LoanFinancialDetailsMulti] ADD FOREIGN KEY ([loan_financial_details_multi_id]) REFERENCES [Origination.DIP.LoanFinancialDetails] ([fk_loan_financial_details_multi_id])
GO

ALTER TABLE [Origination.DIP.LoanFinancialHybridTerms] ADD FOREIGN KEY ([loan_financial_hybrid_terms_id]) REFERENCES [Origination.DIP.LoanFinancialDetails] ([fk_hybrid_terms])
GO

ALTER TABLE [Origination.DIP.ContactTypes] ADD FOREIGN KEY ([contact_type_id]) REFERENCES [Origination.DIP.Contact] ([fk_contact_type_id])
GO

ALTER TABLE [Origination.DIP.Company] ADD FOREIGN KEY ([company_id]) REFERENCES [Origination.DIP.Contact] ([fk_company_contact_id])
GO
