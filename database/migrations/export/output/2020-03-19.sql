ALTER TABLE [Origination].[DipLoanFinancialDetails] alter column [IntermediaryComissionFeePercent] decimal(38, 4)
GO
CREATE TABLE [Origination].[Case] ([CaseId] int identity(1,1) not null primary key, [Id] nvarchar(36))
GO
ALTER TABLE [Origination].[Dip] ADD [FkCaseId] int;
ALTER TABLE [Origination].[Dip] ADD CONSTRAINT [origination_dip_fkcaseid_foreign] FOREIGN KEY ([FkCaseId]) REFERENCES [Origination].[Case] ([CaseId])
GO
select [DipFormId] from [Origination].[Dip]
GO
ALTER TABLE [Origination].[Dip] DROP COLUMN [DipFormId]
GO
ALTER TABLE [Origination].[Case] ADD [CaseNr] nvarchar(255)
GO
ALTER TABLE [Origination].[Dip] DROP COLUMN [CaseNr]
GO
CREATE TABLE [Origination].[DipLoanFinancialDrawDowns] ([LoanFinancialDrawDownsId] int identity(1,1) not null primary key, [Advance] decimal(38, 4), [ArrFeeOut] decimal(38, 4), [Date] datetime2, [EndBal] decimal(38, 4), [GrossLtgdv] decimal(38, 4), [GrossLtv] decimal(38, 4), [Interest] decimal(38, 4), [InterestPaid] decimal(38, 4), [TotalFees] decimal(38, 4))
GO
ALTER TABLE [Origination].[DipLoanFinancialDrawDowns] ADD [FkLoanFinancialDetailsId] int
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] ADD [StartDate] datetime2, [FurtherAdvances] nvarchar(max)
GO
ALTER TABLE [Origination].[DipSecurity] ADD [Gdv] decimal(38, 4)
GO
ALTER TABLE [Origination].[DipSecurity] ADD [ValueExistingMortgage] decimal(38, 4)
GO
ALTER TABLE [Origination].[DipLoanFinancialDrawDowns] alter column [Date] nvarchar(255)