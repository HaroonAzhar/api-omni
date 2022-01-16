SELECT TOP (1000) [DipId]
      ,[CreatedAt]
      ,[CreatedBy]
      ,[FkLoanAdvanceTypeId]
      ,[FkBuildingTypeId]
      ,[FkTypeOfLoanId]
      ,[FkContactId]
      ,[FkLoanPropertyDevelopmentId]
      ,[FkLoanFinancialDetailsId]
      ,[FkIntroducerId]
      ,[FkStatusId]
      ,[FkBrokerId]
      ,[FkCaseId]
  FROM [Dawn_Data].[Origination].[Dip]


/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [CaseId]
      ,[Id]
      ,[CaseNr]
  FROM [Dawn_Data].[Origination].[Case]


ALTER TABLE [Origination].[DipLoanFinancialDetails] ADD [IsManualMode] bit
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] alter column [ArrangementFeePercent] decimal(38, 4)
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] alter column [InterestRate] decimal(38, 4)
GO
ALTER TABLE [Origination].[DipLoanFinancialDetails] alter column [MaxLtvDayOne] decimal(38, 4)
GO
ALTER TABLE [Origination].[DipLoanFinancialDetailsDev] alter column [LtvToGdv] decimal(38, 4)
GO
CREATE TABLE [Origination].[FlowHistory] ([FlowHistoryId] int identity(1,1) not null primary key, [TypeId] int, [Type] nvarchar(255), [Content] nvarchar(max))
GO

CREATE TABLE [Origination].[ApplicationStepStatusType] ([ApplicationStepStatusId] int identity(1,1) not null primary key, [ApplicationStepStatusType] nvarchar(255))
GO
ALTER TABLE [Origination].[Case] ADD [Stage] nvarchar(100)
GO
update [Origination].[Case] set [Stage] = 'dip' ;select @@rowcount
GO

CREATE TABLE [Origination].[ApplicationStep] ([ApplicationStepId] int identity(1,1) not null primary key, [FkDipId] int, [FkStatusId] int, [Edited] datetime2, [Name] nvarchar(255), CONSTRAINT [origination_applicationstep_fkdipid_foreign] FOREIGN KEY ([FkDipId]) REFERENCES [Origination].[DIP] ([DipID]), CONSTRAINT [origination_applicationstep_fkstatusid_foreign] FOREIGN KEY ([FkStatusId]) REFERENCES [Origination].[ApplicationStepStatusType] ([ApplicationStepStatusId]))

GO

SET IDENTITY_INSERT [Origination].[ApplicationStepStatusType] ON 

INSERT [Origination].[ApplicationStepStatusType] ([ApplicationStepStatusId], [ApplicationStepStatusType]) VALUES (1, N'Imported')
INSERT [Origination].[ApplicationStepStatusType] ([ApplicationStepStatusId], [ApplicationStepStatusType]) VALUES (2, N'Completed')
SET IDENTITY_INSERT [Origination].[ApplicationStepStatusType] OFF