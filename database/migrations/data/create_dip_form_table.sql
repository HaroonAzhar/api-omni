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


CREATE TABLE [Origination.DIP.LoanAdvanceType] (
  [loan_advance_type_id] int PRIMARY KEY IDENTITY(1, 1),
  [advance_type] nvarchar(255)
)


CREATE TABLE [Origination.DIP.LoanType] (
  [loan_type_id] int PRIMARY KEY IDENTITY(1, 1),
  [loan_type] nvarchar(255)
)


CREATE TABLE [Origination.DIP.BuildingType] (
  [building_type_id] int PRIMARY KEY IDENTITY(1, 1),
  [building_type] nvarchar(255)
)


CREATE TABLE [Origination.DIP.Contact] (
  [contact_id] int PRIMARY KEY IDENTITY(1, 1),
  [fk_contact_type_id] int,
  [fk_company_contact_id] int,
  [name] nvarchar(255),
  [email] nvarchar(255)
)


CREATE TABLE [Origination.DIP.Company] (
  [company_id] int PRIMARY KEY IDENTITY(1, 1),
  [company_number] int
)


CREATE TABLE [Origination.DIP.ContactTypes] (
  [contact_type_id] int PRIMARY KEY IDENTITY(1, 1),
  [contact_type] nvarchar(255)
)


CREATE TABLE [Origination.DIP.Security] (
  [security_id] int PRIMARY KEY IDENTITY(1, 1),
  [address] nvarchar(255),
  [estimated_open_market_value] numeric
)


CREATE TABLE [Origination.DIP.SecurityDipMapping] (
  [security_dip_mapping_id] int PRIMARY KEY IDENTITY(1, 1),
  [fk_security_id] int,
  [fk_dip_id] int
)


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


CREATE TABLE [Origination.DIP.LoanPropertyDevelopment] (
  [loan_property_development_id] int PRIMARY KEY IDENTITY(1, 1),
  [build_period_months] int,
  [appraisal_report] numeric,
  [monthly_drawdown_report] numeric
)


CREATE TABLE [Origination.DIP.LoanFinancialDetailsDev] (
  [loan_financial_details_dev_id] int PRIMARY KEY IDENTITY(1, 1),
  [ltv_to_gdv] numeric
)


CREATE TABLE [Origination.DIP.LoanFinancialDetailsMulti] (
  [loan_financial_details_multi_id] int PRIMARY KEY IDENTITY(1, 1),
  [further_draw_downs] numeric
)


CREATE TABLE [Origination.DIP.LoanFinancialHybridTerms] (
  [loan_financial_hybrid_terms_id] int PRIMARY KEY IDENTITY(1, 1),
  [retained] int,
  [serviced] int,
  [rolled_up] int
)


ALTER TABLE [Origination.DIP.DIP]  ADD FOREIGN KEY ([fk_loan_advance_type_id])  REFERENCES [Origination.DIP.LoanAdvanceType] ([loan_advance_type_id])


ALTER TABLE [Origination.DIP.DIP]  ADD FOREIGN KEY ([fk_building_type_id])  REFERENCES [Origination.DIP.BuildingType] ([building_type_id])


ALTER TABLE [Origination.DIP.DIP]  ADD FOREIGN KEY ([fk_type_of_loan_id])  REFERENCES [Origination.DIP.LoanType] ([loan_type_id])


ALTER TABLE [Origination.DIP.DIP]  ADD FOREIGN KEY ([fk_contact_id])  REFERENCES [Origination.DIP.Contact] ([contact_id])


ALTER TABLE [Origination.DIP.DIP]  ADD FOREIGN KEY ([fk_loan_financial_details_id])  REFERENCES [Origination.DIP.LoanFinancialDetails] ([loan_finacial_details_id])


ALTER TABLE [Origination.DIP.DIP]  ADD FOREIGN KEY ([fk_loan_property_development_id])  REFERENCES [Origination.DIP.LoanPropertyDevelopment] ([loan_property_development_id])


ALTER TABLE [Origination.DIP.SecurityDipMapping]  ADD FOREIGN KEY ([fk_security_id])  REFERENCES [Origination.DIP.Security] ([security_id])


ALTER TABLE [Origination.DIP.SecurityDipMapping]  ADD FOREIGN KEY ([fk_dip_id])  REFERENCES [Origination.DIP.DIP] ([dip_id])


ALTER TABLE [Origination.DIP.LoanFinancialDetails]  ADD FOREIGN KEY ([fk_loan_financial_details_dev_id])  REFERENCES [Origination.DIP.LoanFinancialDetailsDev] ([loan_financial_details_dev_id])


ALTER TABLE [Origination.DIP.LoanFinancialDetails]  ADD FOREIGN KEY ([fk_loan_financial_details_multi_id])  REFERENCES [Origination.DIP.LoanFinancialDetailsMulti] ([loan_financial_details_multi_id])


ALTER TABLE [Origination.DIP.LoanFinancialDetails]  ADD FOREIGN KEY ([fk_hybrid_terms])  REFERENCES [Origination.DIP.LoanFinancialHybridTerms] ([loan_financial_hybrid_terms_id])


ALTER TABLE [Origination.DIP.Contact]  ADD FOREIGN KEY ([fk_contact_type_id])  REFERENCES [Origination.DIP.ContactTypes] ([contact_type_id])


ALTER TABLE [Origination.DIP.Contact]  ADD FOREIGN KEY ([fk_company_contact_id])  REFERENCES [Origination.DIP.Company] ([company_id])

