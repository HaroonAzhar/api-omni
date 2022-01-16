USE [master]
GO
/****** Object:  Database [Dawn_v100]    Script Date: 15/11/2019 13:34:18 ******/
CREATE DATABASE [Dawn_v100]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Dawn_v100', FILENAME = N'/tmp/Dawn_v100.mdf' , SIZE = 102400KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Dawn_v100_log', FILENAME = N'/tmp/Dawn_v100_log.ldf' , SIZE = 427656KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Dawn_v100] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Dawn_v100].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Dawn_v100] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Dawn_v100] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Dawn_v100] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Dawn_v100] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Dawn_v100] SET ARITHABORT OFF 
GO
ALTER DATABASE [Dawn_v100] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Dawn_v100] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Dawn_v100] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Dawn_v100] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Dawn_v100] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Dawn_v100] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Dawn_v100] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Dawn_v100] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Dawn_v100] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Dawn_v100] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Dawn_v100] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Dawn_v100] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Dawn_v100] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Dawn_v100] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Dawn_v100] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Dawn_v100] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Dawn_v100] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Dawn_v100] SET RECOVERY FULL 
GO
ALTER DATABASE [Dawn_v100] SET  MULTI_USER 
GO
ALTER DATABASE [Dawn_v100] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Dawn_v100] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Dawn_v100] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Dawn_v100] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [Dawn_v100] SET DELAYED_DURABILITY = DISABLED 
GO
USE [Dawn_v100]
GO
/****** Object:  User [OMN\s.usher]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\s.usher] FOR LOGIN [OMN\s.usher] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [OMN\OPF-Dawn-User]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\OPF-Dawn-User] FOR LOGIN [OMN\OPF-Dawn-User]
GO
/****** Object:  User [OMN\OPF-Dawn-Underwriter-User]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\OPF-Dawn-Underwriter-User] FOR LOGIN [OMN\OPF-Dawn-Underwriter-User] WITH DEFAULT_SCHEMA=[OMN\OPF-Dawn-Underwriter-User]
GO
/****** Object:  User [OMN\OPF-Dawn-Research]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\OPF-Dawn-Research] FOR LOGIN [OMN\OPF-Dawn-Research]
GO
/****** Object:  User [OMN\OPF-Dawn-Reporting]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\OPF-Dawn-Reporting] FOR LOGIN [OMN\OPF-Dawn-Reporting]
GO
/****** Object:  User [OMN\OPF-Dawn-Finance-User]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\OPF-Dawn-Finance-User] FOR LOGIN [OMN\OPF-Dawn-Finance-User] WITH DEFAULT_SCHEMA=[OMN\OPF-Dawn-Finance-User]
GO
/****** Object:  User [OMN\OPF-Dawn-ExceptionsLog]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\OPF-Dawn-ExceptionsLog] FOR LOGIN [OMN\OPF-Dawn-ExceptionsLog]
GO
/****** Object:  User [OMN\OPF-Dawn-DevelopmentMonitoring]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\OPF-Dawn-DevelopmentMonitoring] FOR LOGIN [OMN\OPF-Dawn-DevelopmentMonitoring] WITH DEFAULT_SCHEMA=[OMN\OPF-Dawn-DevelopmentMonitoring]
GO
/****** Object:  User [OMN\OPF-Dawn-Collections-User]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\OPF-Dawn-Collections-User] FOR LOGIN [OMN\OPF-Dawn-collections-user]
GO
/****** Object:  User [OMN\j.porter]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\j.porter] FOR LOGIN [OMN\j.porter] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [OMN\e.kluever]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\e.kluever] FOR LOGIN [OMN\e.kluever] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [OMN\b.olma]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [OMN\b.olma] FOR LOGIN [OMN\b.olma] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [dawnwebuser]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [dawnwebuser] FOR LOGIN [dawnwebuser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Dawn_DataImport]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [Dawn_DataImport] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Dawn_DataExport]    Script Date: 15/11/2019 13:34:18 ******/
CREATE USER [Dawn_DataExport] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  DatabaseRole [ExceptionsUser]    Script Date: 15/11/2019 13:34:18 ******/
CREATE ROLE [ExceptionsUser]
GO
/****** Object:  DatabaseRole [Dawn_DataUser]    Script Date: 15/11/2019 13:34:18 ******/
CREATE ROLE [Dawn_DataUser]
GO
ALTER ROLE [db_datareader] ADD MEMBER [OMN\s.usher]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [OMN\s.usher]
GO
ALTER ROLE [db_datareader] ADD MEMBER [OMN\OPF-Dawn-User]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [OMN\OPF-Dawn-User]
GO
ALTER ROLE [db_datareader] ADD MEMBER [OMN\OPF-Dawn-Underwriter-User]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [OMN\OPF-Dawn-Research]
GO
ALTER ROLE [db_datareader] ADD MEMBER [OMN\OPF-Dawn-Research]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [OMN\OPF-Dawn-Research]
GO
ALTER ROLE [db_datareader] ADD MEMBER [OMN\OPF-Dawn-DevelopmentMonitoring]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [OMN\OPF-Dawn-DevelopmentMonitoring]
GO
ALTER ROLE [db_datareader] ADD MEMBER [OMN\OPF-Dawn-Collections-User]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [OMN\OPF-Dawn-Collections-User]
GO
ALTER ROLE [db_datareader] ADD MEMBER [OMN\j.porter]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [OMN\j.porter]
GO
ALTER ROLE [db_datareader] ADD MEMBER [OMN\e.kluever]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [OMN\e.kluever]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [OMN\b.olma]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [OMN\b.olma]
GO
ALTER ROLE [db_owner] ADD MEMBER [dawnwebuser]
GO
/****** Object:  Schema [Admin]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Admin]
GO
/****** Object:  Schema [Audit]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Audit]
GO
/****** Object:  Schema [Cashflow]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Cashflow]
GO
/****** Object:  Schema [Comms]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Comms]
GO
/****** Object:  Schema [Dawn_DataUser]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Dawn_DataUser]
GO
/****** Object:  Schema [Finance]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Finance]
GO
/****** Object:  Schema [LetterTemplate]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [LetterTemplate]
GO
/****** Object:  Schema [Loan]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Loan]
GO
/****** Object:  Schema [LoanCalc]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [LoanCalc]
GO
/****** Object:  Schema [M1]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [M1]
GO
/****** Object:  Schema [OMN\Ami Loan DB - RW]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [OMN\Ami Loan DB - RW]
GO
/****** Object:  Schema [omn\amicus-aura-user]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [omn\amicus-aura-user]
GO
/****** Object:  Schema [OMN\OPF-Dawn-DevelopmentMonitoring]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [OMN\OPF-Dawn-DevelopmentMonitoring]
GO
/****** Object:  Schema [OMN\OPF-Dawn-Finance-User]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [OMN\OPF-Dawn-Finance-User]
GO
/****** Object:  Schema [OMN\OPF-Dawn-Underwriter-User]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [OMN\OPF-Dawn-Underwriter-User]
GO
/****** Object:  Schema [Planner]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Planner]
GO
/****** Object:  Schema [Product]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Product]
GO
/****** Object:  Schema [Question]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Question]
GO
/****** Object:  Schema [Reconciliation]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Reconciliation]
GO
/****** Object:  Schema [Reference]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Reference]
GO
/****** Object:  Schema [Report]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [Report]
GO
/****** Object:  Schema [risk]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [risk]
GO
/****** Object:  Schema [UserSecurity]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [UserSecurity]
GO
/****** Object:  Schema [workflow]    Script Date: 15/11/2019 13:34:18 ******/
CREATE SCHEMA [workflow]
GO
/****** Object:  UserDefinedTableType [dbo].[ListOfIds]    Script Date: 15/11/2019 13:34:18 ******/
CREATE TYPE [dbo].[ListOfIds] AS TABLE(
	[Id] [int] NULL
)
GO
/****** Object:  UserDefinedFunction [dbo].[disused_getLegalEntityAbbreviation]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[disused_getLegalEntityAbbreviation](@Entity varchar(512),@Delim char(1))
RETURNS  varchar(64)
as	begin
	declare @Abbrev varchar(64);set @Abbrev=''
		select @Entity = replace(replace(replace(replace(@Entity,@Delim +'Limited',''),@Delim +'Ltd',''),@Delim +'llp',''),@Delim +'llc','')
		select @Abbrev=coalesce(SUBSTRING(upper(Value),1,1),'.')+@Abbrev from  dbo.fn_split(@Entity,@Delim) order by idx desc
		if datalength(@Abbrev)=1
			set @Abbrev=SUBSTRING(upper(@Entity),1,2)
	return @Abbrev
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_Split]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[fn_Split](@sText varchar(8000), @sDelim varchar(20) = ' ')
RETURNS @retArray TABLE (idx smallint Primary Key, value varchar(8000))
AS
BEGIN
DECLARE @idx smallint,
	@value varchar(8000),
	@bcontinue bit,
	@iStrike smallint,
	@iDelimlength tinyint

IF @sDelim = 'Space'
	BEGIN
	SET @sDelim = ' '
	END

SET @idx = 0
SET @sText = LTrim(RTrim(@sText))
SET @iDelimlength = DATALENGTH(@sDelim)
SET @bcontinue = 1

IF NOT ((@iDelimlength = 0) or (@sDelim = 'Empty'))
	BEGIN
	WHILE @bcontinue = 1
		BEGIN

--If you can find the delimiter in the text, retrieve the first element and
--insert it with its index into the return table.
 
		IF CHARINDEX(@sDelim, @sText)>0
			BEGIN
			SET @value = SUBSTRING(@sText,1, CHARINDEX(@sDelim,@sText)-1)
				BEGIN
				INSERT @retArray (idx, value)
				VALUES (@idx, @value)
				END
			
--Trim the element and its delimiter from the front of the string.
			--Increment the index and loop.
SET @iStrike = DATALENGTH(@value) + @iDelimlength
			SET @idx = @idx + 1
			SET @sText = LTrim(Right(@sText,DATALENGTH(@sText) - @iStrike))
		
			END
		ELSE
			BEGIN
--If you can’t find the delimiter in the text, @sText is the last value in
--@retArray.
 SET @value = @sText
				BEGIN
				INSERT @retArray (idx, value)
				VALUES (@idx, @value)
				END
			--Exit the WHILE loop.
SET @bcontinue = 0
			END
		END
	END
ELSE
	BEGIN
	WHILE @bcontinue=1
		BEGIN
		--If the delimiter is an empty string, check for remaining text
		--instead of a delimiter. Insert the first character into the
		--retArray table. Trim the character from the front of the string.
--Increment the index and loop.
		IF DATALENGTH(@sText)>1
			BEGIN
			SET @value = SUBSTRING(@sText,1,1)
				BEGIN
				INSERT @retArray (idx, value)
				VALUES (@idx, @value)
				END
			SET @idx = @idx+1
			SET @sText = SUBSTRING(@sText,2,DATALENGTH(@sText)-1)
			
			END
		ELSE
			BEGIN
			--One character remains.
			--Insert the character, and exit the WHILE loop.
			INSERT @retArray (idx, value)
			VALUES (@idx, @sText)
			SET @bcontinue = 0	
			END
	END

END

RETURN
END

GO
/****** Object:  UserDefinedFunction [Reference].[fn_CalculateMaturityDate]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [Reference].[fn_CalculateMaturityDate](@LoanId int) 	returns DateTime
as begin
/*
	V		When		Who		What
	1.00	2015		PJR		compute mat date
	1.01	20180117	PJR		compute mat date, new method
*/
	--RETURN DATEADD(month, Reference.fn_CalculateTotalTerm(@Term), @CompletionDate - 1)
	--select dateadd(d,-1,dateadd(mm,9,'1 march 2017'))
	--RETURN dateadd(d,-1,dateadd(mm, Reference.fn_CalculateTotalTerm(@Term),@CompletionDate))

	return (select top 1 max(i.InterestEndDate)	MaturityDate
										from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i	
										where loan_id=@LoanId and cashflowInterest_type not in (1,3))
End
GO
/****** Object:  UserDefinedFunction [Reference].[fn_CalculateMaturityDate3]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create FUNCTION [Reference].[fn_CalculateMaturityDate3](@LoanId int)
	RETURNS DateTime
AS
BEGIN
return (select top 1 max(i.InterestEndDate)	MaturityDate
										from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i	
										where loan_id=@LoanId and cashflowInterest_type not in (1,3))
end
GO
/****** Object:  UserDefinedFunction [Reference].[fn_CalculateTotalTerm]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [Reference].[fn_CalculateTotalTerm](@Term VarChar(100))
	RETURNS Int

AS
	BEGIN
		IF (CHARINDEX('+', @Term)) > 0
			BEGIN
				DECLARE @TotalTerm Int
				SET @TotalTerm = CONVERT(Int, SUBSTRING(@Term, 0, CHARINDEX('+', @Term)))

				SET @TotalTerm = @TotalTerm + CONVERT(Int, SUBSTRING(@Term, CHARINDEX('+', @Term), LEN(@Term)))
				
				RETURN @TotalTerm
			END

		RETURN CONVERT(Int, @Term)
	END

GO
/****** Object:  UserDefinedFunction [Report].[fn_CalculateMaturityDate2]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create FUNCTION [Report].[fn_CalculateMaturityDate2](@LoanId int)
	returns @MaturityDate TABLE (MaturityDate DateTime)
as	begin

	declare @LookupMaturityDate table(MaturityDate DateTime)

	insert @MaturityDate(MaturityDate) select top 1 max(i.InterestEndDate)	MaturityDate
										from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i	
										where loan_id=@LoanId and cashflowInterest_type not in (1,3)

	return 
end
GO
/****** Object:  UserDefinedFunction [Report].[fn_getBorrowerList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [Report].[fn_getBorrowerList] (@LoanId int)
returns nvarchar(max)
begin

	declare @borrowerlist nvarchar(max)
	select @borrowerlist = coalesce(@borrowerlist+', ','') + 
		CASE WHEN c.ContactId != 0 and c.ContactId IS NOT NULL THEN
			isnull(c.FirstName,'') +
			CASE WHEN ltrim(rtrim(isnull(c.MiddleName,''))) != '' THEN ' '+isnull(c.MiddleName,'') else '' END +
			CASE WHEN ltrim(rtrim(isnull(c.Surname,''))) != '' THEN ' '+isnull(c.Surname,'') else '' END
		ELSE
			(
				SELECT TOP 1 le.LegalEntityName
				FROM Dawn_Data.Loan.LegalEntity le
				WHERE poc.FkLegalEntityId=le.LegalEntityId
			)
		END
	from	Dawn_Data.Loan.ParticipantOfCase		poc
	left outer	join	Dawn_Data.Loan.Contact	c	on	poc.FkContactId=c.ContactId
	where fkLoanId=@LoanId 
	and poc.FKParticipantTypeId=1
	AND (
		(
			EXISTS (
				SELECT 1 
				FROM Dawn_Data.Loan.ParticipantOfCase poc2
				WHERE poc2.FkLoanId=@LoanId
				AND poc2.FkContactId !=0
			) AND poc.FkContactId !=0
		)
		OR
		(
			NOT EXISTS (
				SELECT 1 
				FROM Dawn_Data.Loan.ParticipantOfCase poc3
				WHERE poc3.FkLoanId=@LoanId
				AND poc3.FkContactId !=0
			) AND poc.FkLegalEntityId !=0
		)
	)

	return LTRIM(RTRIM(@borrowerlist))

end
GO
/****** Object:  UserDefinedFunction [Report].[fn_getCollectionReportNotes]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Report].[fn_getCollectionReportNotes](@LoanId int)
RETURNS  varchar(max)
as	begin
	declare @notes varchar(max);set @notes=''
	select @notes = coalesce(@notes,'') + n.value('(./Updated)[1]','varchar(100)') + ' ' + isnull(n.value('(./Note)[1]','varchar(max)'),'') + char(10)
		from Dawn_Data.report.CollectionNote cross apply LoanNotes.nodes('/Loan/CollectionNote') t(n) where LoanId=@LoanId
	return @notes
end

GO
/****** Object:  UserDefinedFunction [Report].[fn_getFunderList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create function [Report].[fn_getFunderList] (@LoanId int)
returns nvarchar(max)
begin

	declare @funderlist nvarchar(max)
	select @funderlist = coalesce(@funderlist+',','') + f.funder_name
	from			Dawn_Data.Loan.FunderOfLoan	fd
	inner	join	Dawn_Data.Loan.Funder		f	on	f.funder_id	=	fd.fkFunderId
	where fkLoanId=@LoanId and f.funder_name is not null

	return @funderlist

end

GO
/****** Object:  UserDefinedFunction [Report].[fn_getHeadRoom]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Report].[fn_getHeadRoom](@CaseRef varchar(255))
RETURNS  decimal(18,6)
as	begin
	declare @HeadRoomValue decimal(18,6) , @MarketValue decimal(18,6)

	select  @MarketValue = sum(convert(decimal(18,6),isnull(Valuation,0.00)))
	from (
			select distinct v.date_of_valuation, v.valuation
			from		Dawn_Data.Loan.ValuationVW		v
			inner join 	(
						select max(date_of_valuation) date_of_valuation , SecurityAddress from Dawn_Data.Loan.ValuationVW 
							where CaseReference=@CaseRef and ValuationStatus='Received' group by SecurityAddress

						) v2	on v2.SecurityAddress=v.SecurityAddress and v2.date_of_valuation=v.date_of_valuation
			where 
				v.CaseReference		=	@CaseRef 
			and v.ValuationStatus	=	'Received' 
			and v.date_of_valuation	=	v2.date_of_valuation
		) v

	select @HeadRoomValue = @MarketValue - loan_balance
		from		Dawn_Data.Loan.History 
	where CBFL_id = @CaseRef
	return convert(decimal(18,6),isnull(@HeadRoomValue,0.00))
end
GO
/****** Object:  UserDefinedFunction [Report].[fn_getLegalEntityAbbreviation]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [Report].[fn_getLegalEntityAbbreviation](@Entity varchar(512),@Delim char(1))
RETURNS  varchar(64)
as	begin
	declare @Abbrev varchar(64);set @Abbrev=''
		select @Entity = replace(replace(replace(replace(@Entity,@Delim +'Limited',''),@Delim +'Ltd',''),@Delim +'llp',''),@Delim +'llc','')
		select @Abbrev=coalesce(SUBSTRING(upper(Value),1,1),'.')+@Abbrev from  dbo.fn_split(@Entity,@Delim) order by idx desc
		if datalength(@Abbrev)=1
			set @Abbrev=SUBSTRING(upper(@Entity),1,2)
	return @Abbrev
end


GO
/****** Object:  UserDefinedFunction [Report].[fn_getLoanCurrentBalanceAsOfDate]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [Report].[fn_getLoanCurrentBalanceAsOfDate](@LoanId int)
returns  varchar(11)
as	begin
	declare	@LoanCurrentBalanceAsOfDate	varchar(11)

	select	@LoanCurrentBalanceAsOfDate	=	replace(convert(varchar(11),getDate(),106),' ','-')

	return @LoanCurrentBalanceAsOfDate
end

GO
/****** Object:  UserDefinedFunction [Report].[fn_getLoanCurrentBalanceValue]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [Report].[fn_getLoanCurrentBalanceValue](@LoanId int)
RETURNS  decimal(18,6)
as	begin
	declare	@LoanCurrentBalanceValue	decimal(18,6)

	select	@LoanCurrentBalanceValue	=	99999999.99

	return @LoanCurrentBalanceValue
end

GO
/****** Object:  UserDefinedFunction [Report].[fn_getMarketValue]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Report].[fn_getMarketValue](@CaseRef varchar(255))
returns  decimal(18,6)
as	begin
	declare @MarketValue decimal(18,6)

	select  @MarketValue = sum(convert(decimal(18,6),isnull(Valuation,0.00)))
	from (
			--select distinct v.date_of_valuation, v.valuation --PJR 14.12.15
			select v.date_of_valuation, v.valuation
			from		Dawn_Data.Loan.ValuationVW		v
			inner join 	(
						select max(date_of_valuation) date_of_valuation , SecurityAddress from Dawn_Data.Loan.ValuationVW
							where CaseReference=@CaseRef and ValuationStatus='Received' group by SecurityAddress

						) v2	on v2.SecurityAddress=v.SecurityAddress and v2.date_of_valuation=v.date_of_valuation
			where 
				v.CaseReference		=	@CaseRef 
			and v.ValuationStatus	=	'Received' 
			and v.date_of_valuation	=	v2.date_of_valuation
		) v
	return @MarketValue
end
GO
/****** Object:  UserDefinedFunction [Report].[fn_getMarketValueAsOf]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create FUNCTION [Report].[fn_getMarketValueAsOf](@CaseRef varchar(255),@AsOfDate datetime)
returns  decimal(18,6)
as	begin
	declare @MarketValue decimal(18,6)

	select  @MarketValue = sum(convert(decimal(18,6),isnull(Valuation,0.00)))
	from (
			select v.date_of_valuation, v.valuation
			from		Dawn_Data.Loan.ValuationVW		v
			inner join 	(
						select max(date_of_valuation) date_of_valuation , SecurityAddress from Dawn_Data.Loan.ValuationVW
							where CaseReference=@CaseRef and ValuationStatus='Received'
							and Date_of_Valuation<=@AsOfDate
							 group by SecurityAddress

						) v2	on v2.SecurityAddress=v.SecurityAddress and v2.date_of_valuation=v.date_of_valuation
			where 
				v.CaseReference		=	@CaseRef 
			and v.ValuationStatus	=	'Received' 
			and v.date_of_valuation	=	v2.date_of_valuation
		) v
	return @MarketValue
end
GO
/****** Object:  UserDefinedFunction [Report].[fn_getPoolTapeMarketValue]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [Report].[fn_getPoolTapeMarketValue](@CaseRef varchar(255))
returns  decimal(18,6)
/*	this function gets the mkt val from the import tables, why, because they contain all vals (valid or not) 
	for both uncompleted and complee cases
*/
as	begin
	declare @MarketValue decimal(18,6)

	select  @MarketValue = sum(convert(decimal(18,6),isnull(Valuation,0.00)))
	from (
			select v.date_of_valuation, v.valuation
			from		Dawn_Data_Staging.Finance.CombinedValuation		v
			inner join 	(
						select max(date_of_valuation) date_of_valuation, SecurityAddress from Dawn_Data_Staging.Finance.CombinedValuation
							where CaseReference=@CaseRef and ValuationStatus in ('Received','CustomerProvided','RICS Valuation') group by SecurityAddress

						) v2	on v2.SecurityAddress=v.SecurityAddress and v.date_of_valuation	=	v2.date_of_valuation
			where 
				v.CaseReference		=	@CaseRef 
			and v.ValuationStatus in ('Received','CustomerProvided','RICS Valuation')
			and v.date_of_valuation	=	v2.date_of_valuation
		) v
	return @MarketValue
end
GO
/****** Object:  UserDefinedFunction [Report].[fn_getPoolTapeMarketValue_v9]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Report].[fn_getPoolTapeMarketValue_v9](@CaseRef varchar(255))
returns  decimal(18,6)
/*	this function gets the mkt val from the import tables, why, because they contain all vals (valid or not) 
	for both uncompleted and complee cases
*/
as	begin
	declare @MarketValue decimal(18,6)

	select  @MarketValue = sum(convert(decimal(18,6),isnull(Valuation,0.00)))
	---select sum(convert(decimal(18,6),isnull(Valuation,0.00)))
	from (
			select v.date_of_inspection, v.valuation
			from		Dawn_Data_Staging.Finance.CombinedValuation		v
			inner join 	(
						select max(date_of_inspection) date_of_inspection, SecurityAddress from Dawn_Data_Staging.Finance.CombinedValuation
							where CaseReference=@CaseRef 
							and date_of_inspection <> '9999-12-31'
							and ValuationStatus in ('Received','CustomerProvided','RICS Valuation') group by SecurityAddress

						) v2	on v2.SecurityAddress=v.SecurityAddress and v.date_of_inspection	=	v2.date_of_inspection
			where 
				v.CaseReference		=	@CaseRef 
			and v.ValuationStatus in ('Received','CustomerProvided','RICS Valuation')
			and v.date_of_inspection	=	v2.date_of_inspection
		) v
	return @MarketValue
end



GO
/****** Object:  UserDefinedFunction [Report].[fn_getPoolTapeReinstatementValue]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Report].[fn_getPoolTapeReinstatementValue](@CaseRef varchar(255))
returns  decimal(18,6)
/*	PJR 25.1.17
	this function gets the reinstatement val from the import tables, why, because they contain all vals (valid or not) 
	for both uncompleted and complete cases
*/
as	begin
	declare @ReinstatementValue decimal(18,6)

	select  @ReinstatementValue = sum(convert(decimal(18,6),isnull(ReinstatementValue,0.00)))
	from (
			select v.date_of_valuation, v.ReinstatementValue
			from		Dawn_Data_Staging.Finance.CombinedValuation		v
			inner join 	(
						select max(date_of_valuation) date_of_valuation, SecurityAddress from Dawn_Data_Staging.Finance.CombinedValuation
							where CaseReference=@CaseRef and ValuationStatus in ('Received','CustomerProvided','RICS Valuation') group by SecurityAddress

						) v2	on v2.SecurityAddress=v.SecurityAddress and v.date_of_valuation	=	v2.date_of_valuation
			where 
				v.CaseReference		=	@CaseRef 
			and v.ValuationStatus in ('Received','CustomerProvided','RICS Valuation')
			and v.date_of_valuation	=	v2.date_of_valuation
		) v
	return @ReinstatementValue
end

GO
/****** Object:  UserDefinedFunction [Report].[fn_getPoolTapeReinstatementValue_v9]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [Report].[fn_getPoolTapeReinstatementValue_v9](@CaseRef varchar(255))
returns  decimal(18,6)
/*	PJR 25.1.17
	this function gets the reinstatement val from the import tables, why, because they contain all vals (valid or not) 
	for both uncompleted and complete cases
*/
as	begin
	declare @ReinstatementValue decimal(18,6)

	select  @ReinstatementValue = sum(convert(decimal(18,6),isnull(ReinstatementValue,0.00)))
	from (
			select v.date_of_valuation, v.ReinstatementValue
			from		Dawn_Data_Staging.Finance.CombinedValuation		v
			inner join 	(
						select max(date_of_inspection) date_of_inspection, SecurityAddress from Dawn_Data_Staging.Finance.CombinedValuation
							where CaseReference=@CaseRef 
							and date_of_inspection <> '9999-12-31'
							and ValuationStatus in ('Received','CustomerProvided','RICS Valuation') group by SecurityAddress

						) v2	on v2.SecurityAddress=v.SecurityAddress and v.date_of_inspection	=	v2.date_of_inspection
			where 
				v.CaseReference		=	@CaseRef 
			and v.ValuationStatus in ('Received','CustomerProvided','RICS Valuation')
			and v.date_of_inspection	=	v2.date_of_inspection
		) v
	return @ReinstatementValue
end


GO
/****** Object:  UserDefinedFunction [Report].[fn_getPoolTapeValationDate]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Report].[fn_getPoolTapeValationDate](@CaseRef varchar(255))
	returns @ValuationDate TABLE (ValuationDate datetime)
as	begin
	insert @ValuationDate
		select  max(date_of_valuation)
		from (
				select v.date_of_valuation, v.valuation
				from		Dawn_Data_Staging.Finance.CombinedValuation		v
				inner join 	(
							select max(date_of_valuation) date_of_valuation, SecurityAddress from Dawn_Data_Staging.Finance.CombinedValuation
								where CaseReference=@CaseRef and ValuationStatus in ('Received','CustomerProvided','RICS Valuation') group by SecurityAddress

							) v2	on v2.SecurityAddress=v.SecurityAddress and v.date_of_valuation	=	v2.date_of_valuation
				where 
					v.CaseReference		=	@CaseRef 
				and v.ValuationStatus in ('Received','CustomerProvided','RICS Valuation')
				and v.date_of_valuation	=	v2.date_of_valuation
			) v
	return 
end
GO
/****** Object:  UserDefinedFunction [Report].[fn_getPoolTapeValuationDate_v9]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [Report].[fn_getPoolTapeValuationDate_v9](@CaseRef varchar(255))
	returns @ValuationDate TABLE (ValuationDate datetime)
as	begin
	insert @ValuationDate
		select  max(date_of_inspection)
		from (
				select v.date_of_inspection, v.valuation
				from		Dawn_Data_Staging.Finance.CombinedValuation		v
				inner join 	(
							select max(date_of_inspection) date_of_inspection, SecurityAddress 
							from Dawn_Data_Staging.Finance.CombinedValuation
								where CaseReference=@CaseRef 
								and date_of_inspection <> '9999-12-31'
								and ValuationStatus in ('Received','CustomerProvided','RICS Valuation', 'Re-Inspection Valuation', 'Retype') group by SecurityAddress

							) v2	on v2.SecurityAddress=v.SecurityAddress and v.date_of_inspection	=	v2.date_of_inspection
				where 
					v.CaseReference		=	@CaseRef 
				and v.ValuationStatus in ('Received','CustomerProvided','RICS Valuation', 'Re-Inspection Valuation', 'Retype')
				and v.date_of_inspection	=	v2.date_of_inspection
			) v
	return 
end



GO
/****** Object:  UserDefinedFunction [Report].[fn_getPoolTapeValuer]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Report].[fn_getPoolTapeValuer](@CaseRef varchar(255))
	returns @Surveyor TABLE (Surveyor varchar(50))
as	begin

	declare @Surveyors table(Surveyor varchar(1024))
	declare @SurveyorList varchar(1024)

	insert @Surveyors
		select  distinct Surveyor
			from (
					select v.Surveyor
					from		Dawn_Data_Staging.Finance.CombinedValuation		v
					inner join 	(
								select max(date_of_valuation) date_of_valuation, SecurityAddress from Dawn_Data_Staging.Finance.CombinedValuation
									where CaseReference=@CaseRef and ValuationStatus in ('Received','CustomerProvided','RICS Valuation') group by SecurityAddress

								) v2	on v2.SecurityAddress=v.SecurityAddress and v.date_of_valuation	=	v2.date_of_valuation
					where 
						v.CaseReference		=	@CaseRef 
					and v.ValuationStatus in ('Received','CustomerProvided','RICS Valuation')
					and v.date_of_valuation	=	v2.date_of_valuation
				) v
	select @SurveyorList=COALESCE(@SurveyorList+ '/','')+Surveyor from @Surveyors
	insert @Surveyor select @SurveyorList

	return 
end
GO
/****** Object:  UserDefinedFunction [Report].[fn_getPoolTapeValuer_v9]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [Report].[fn_getPoolTapeValuer_v9] (@CaseRef varchar(255))
	returns @Surveyor TABLE (Surveyor varchar(50))
as	begin

	declare @Surveyors table(Surveyor varchar(1024))
	declare @SurveyorList varchar(1024)

	insert @Surveyors
		select  distinct Surveyor
			from (
					select v.Surveyor
					from		Dawn_Data_Staging.Finance.CombinedValuation		v
					inner join 	(
								select max(date_of_inspection) date_of_inspection, SecurityAddress from Dawn_Data_Staging.Finance.CombinedValuation
									where CaseReference=@CaseRef 
									and date_of_inspection <> '9999-12-31'
									and ValuationStatus in ('Received','CustomerProvided','RICS Valuation') group by SecurityAddress

								) v2	on v2.SecurityAddress=v.SecurityAddress and v.date_of_inspection	=	v2.date_of_inspection
					where 
						v.CaseReference		=	@CaseRef 
					and v.ValuationStatus in ('Received','CustomerProvided','RICS Valuation')
					and v.date_of_inspection	=	v2.date_of_inspection
				) v
	select @SurveyorList=COALESCE(@SurveyorList+ '/','')+Surveyor from @Surveyors
	insert @Surveyor select @SurveyorList

	return 
end




GO
/****** Object:  UserDefinedFunction [Report].[fn_getPrimaryAddress]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [Report].[fn_getPrimaryAddress](@LoanId int)
RETURNS  nvarchar(255)
as	begin
	declare	@PrimarySecAddr	nvarchar(255)

	select	@PrimarySecAddr	=	isnull(
										(	select 	 top 1 
														 s.security_name
														+case when isnull(s.address_1,'')!='' and isnull(s.address_1,'')!=isnull(s.security_name,'')
																									then ',' + s.address_1	else '' end
														+case when isnull(s.address_2,'')	!=''	then ',' + s.address_2	else '' end
														+case when isnull(s.address_3,'')	!=''	then ',' + s.address_3	else '' end
														+case when isnull(s.address_4,'')	!=''	then ',' + s.address_4	else '' end			 
														+case when isnull(s.county,'')		!=''	then ',' + s.county		else ''	end		
														+case when isnull(s.post_code,'')	!=''	then ',' + s.post_code	else '' end
												from		Dawn_Data.loan.loan			l2
												left join	Dawn_Data.Loan.SecurityMap	sm	on	sm.loan_id		=	l2.loan_id
												left join	Dawn_Data.Loan.[Security]	s	on	s.security_id	=	sm.security_id
												where	l2.loan_id	=	@LoanId
												order by s.security_name
														+case when isnull(s.address_1,'')!='' and isnull(s.address_1,'')!=isnull(s.security_name,'')
																									then ',' + s.address_1	else '' end
														+case when isnull(s.address_2,'')	!=''	then ',' + s.address_2	else '' end
														+case when isnull(s.address_3,'')	!=''	then ',' + s.address_3	else '' end
														+case when isnull(s.address_4,'')	!=''	then ',' + s.address_4	else '' end			 
														+case when isnull(s.county,'')		!=''	then ',' + s.county		else ''	end		
														+case when isnull(s.post_code,'')	!=''	then ',' + s.post_code	else '' end
										)
										,'')
	return @PrimarySecAddr
end

GO
/****** Object:  UserDefinedFunction [Report].[fn_getValuation90DayValue]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [Report].[fn_getValuation90DayValue](@CaseRef varchar(255))
returns  decimal(18,6)
as	begin
	--------------------------------------------------------------------------------
	/*	Author	Date		Desc			Ver
		PJR		15.12.15	get 90d val 	1.00
		PJR		15.12.15	get 90d val 	1.01	make it work with latest vals
	*/
	--------------------------------------------------------------------------------
	declare @ninetyDayValue decimal(18,6)

	select  @ninetyDayValue = sum(convert(decimal(18,6),isnull([90 day_value_of_security],0.00)))
	from (
			select v.date_of_valuation, v.[90 day_value_of_security]
			from		Dawn_Data.Loan.ValuationVW		v
			inner join 	(
						select max(date_of_valuation) date_of_valuation , SecurityAddress from Dawn_Data.Loan.ValuationVW
							where CaseReference=@CaseRef and ValuationStatus='Received' group by SecurityAddress

						) v2	on v2.SecurityAddress=v.SecurityAddress and v2.date_of_valuation=v.date_of_valuation
			where 
				v.CaseReference		=	@CaseRef 
			and v.ValuationStatus	=	'Received' 
			and v.date_of_valuation	=	v2.date_of_valuation
		) v
	--select @ninetyDayValue =  convert(decimal(18,6),isnull([90 day_value_of_security],0.00))
	--	from		Dawn_Data.Loan.Valuation		v
	--	inner join 
	--		(select CaseReference , max(convert(datetime,date_of_valuation)) date_of_valuation 
	--			from Dawn_Data.Loan.Valuation where CaseReference=@CaseRef and ValuationStatus='Received' group by CaseReference)	v2
	--	on v2.CaseReference = v.CaseReference
	--	where v.CaseReference	=	@CaseRef
	--		and ValuationStatus='Received'
	return @ninetyDayValue
end
GO
/****** Object:  UserDefinedFunction [Report].[udf_EndOfDay]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Report].[udf_EndOfDay]
	(@Date DATETIME)
RETURNS DATETIME
BEGIN
	DECLARE @SmallDate DATE
	
	SELECT @SmallDate = @Date
	IF DATEDIFF(d,@Date, '9999/12/31') > 0
	BEGIN
		SELECT @Date = DATEADD(ms, -3, DATEADD(dd, 1, CAST(@SmallDate AS DATETIME)))
	END
		
	RETURN @Date 
END

GO
/****** Object:  StoredProcedure [Cashflow].[CashFlowGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Cashflow].[CashFlowGet]
	@LoanId Int,
	@ViewType Int
-- 20150801  AK v1.00
-- 20170915. PW Added Arrangement fee on redemption
-- 20171213		PJR Lastupdate/By added

	AS 	Begin
	
		set nocount on

	SELECT
		i.cashflowInterest_date as FlowDate, 
		i.loan_id				as LoanId, 
		i.cashflowInterest_amount as Amount, 
		i.IDHistory				as HistoryId, 
		t.CashflowTypeDescription As CashFlowType, 
		''						as CashFlowNotes, 
		i.transaction_id		as	TransactionId, 
		DIM_loan_id_DWSK		as	LoanHistoryId, 
		CashFlowType_id			as	CashflowTypeId,
		transactionGroupID		as	TransactionGroupId,
		i.Staff_Id				as	LastUpdateBy,
		i.dteDateupdated		as	LastUpdated
	INTO #Temp
	FROM Dawn_Data.LoanCalc.CashflowInterest i LEFT JOIN Dawn_Data.LoanCalc.CashflowType t ON i.cashflowInterest_type = t.CashFlowType_id
	WHERE CashFlowType_id NOT IN (5, 4)
	  AND i.loan_id = @LoanId
	  AND (@ViewType = 0
			OR @ViewType = 2 AND CashFlowType_Id Not IN (7))
		UNION ALL
	SELECT 
		completion_date, 
		DIM_loan_id_SSK AS loan_id, 
		loan_amount, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		'Opening Balance',
		'' AS transaction_Description, 
		NULL AS transaction_id, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		NULL AS CashFlowType_id, 
		NULL AS transactionGroupID,
		Staff_Id				as	LastUpdateBy,
		dteDateupdated			as	LastUpdated
	FROM Dawn_Data.Loan.History
	WHERE DIM_loan_id_SSK = @LoanId
	  AND @ViewType = 0
		UNION ALL
	SELECT
		completion_date, 
		DIM_loan_id_SSK AS loan_id, 
		TitleInsurance, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		'Title Insurance', '' AS transaction_Description, 
		NULL AS transaction_id, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		NULL AS CashFlowType_id, 
		NULL AS transactionGroupID,
		Staff_Id				as	LastUpdateBy,
		dteDateupdated			as	LastUpdated
	FROM Dawn_Data.Loan.History
	WHERE ISNULL(TitleInsurance, 0) <> 0
	  AND DIM_loan_id_SSK = @LoanId
	  AND @ViewType = 0
		UNION ALL
	SELECT
		completion_date, 
		DIM_loan_id_SSK AS loan_id, 
		AdministrationFee, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		'Admin Fee', 
		'' AS transaction_Description, 
		NULL AS transaction_id, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		NULL AS CashFlowType_id, 
		NULL AS transactionGroupID,
		Staff_Id				as	LastUpdateBy,
		dteDateupdated			as	LastUpdated
	FROM Dawn_Data.Loan.History
	WHERE ISNULL(AdministrationFee,0) <> 0
	  AND DIM_loan_id_SSK = @LoanId
	  AND @ViewType = 0
		UNION ALL
	SELECT
		completion_date, 
		DIM_loan_id_SSK AS loan_id, 
		insurance_COST, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		'Insurance', 
		'' AS transaction_Description, 
		NULL AS transaction_id, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		NULL AS CashFlowType_id, 
		NULL AS transactionGroupID,
		Staff_Id				as	LastUpdateBy,
		dteDateupdated			as	LastUpdated
	FROM Dawn_Data.Loan.History
	WHERE ExcludeInsuranceFee = 0 
	  AND ISNULL(insurance_COST,0) <> 0
	  AND DIM_loan_id_SSK = @LoanId
	  AND @ViewType = 0
		UNION ALL
	SELECT
		completion_date, 
		DIM_loan_id_SSK AS loan_id, 
		legal_cost, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		'Legal Fee', 
		'' AS transaction_Description, 
		NULL AS transaction_id, 
		DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		NULL AS CashFlowType_id, 
		NULL AS transactionGroupID,
		Staff_Id				as	LastUpdateBy,
		dteDateupdated			as	LastUpdated
	FROM Dawn_Data.Loan.History
	WHERE ExcludeLegalFees = 0 
	  AND ISNULL(legal_cost,0) <> 0
	  AND DIM_loan_id_SSK = @LoanId
	  AND @ViewType = 0
		UNION ALL
	SELECT
		t.transaction_date, 
		t.loan_id, 
		t.Amount, 
		DIM_loan_id_DWSK, 
		tt.transaction_type, 
		t.transaction_Description, 
		t.transaction_id, 
		DIM_loan_id_DWSK, 
		NULL			as	CashFlowType_id, 
		NULL			as	transactionGroupID,
		Staff_Id			as	LastUpdateBy,
		dteDateUpdated	as	LastUpdated
	FROM Dawn_Data.LoanCalc.[Transaction] t
	LEFT JOIN Dawn_Data.LoanCalc.TransactionType tt ON t.transaction_type = tt.transaction_ID
	WHERE t.loan_id = @LoanId
	  AND @ViewType IN (0, 1)
	-- 20170915. PW Added arrangement fee on redemption
		UNION ALL
	SELECT
		Loan.redeemed_date, 
		DIM_loan_id_SSK AS loan_id, 
		Hist.arrangement_fee_out_Value, 
		Hist.DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		'Arrangement Fee on Redemption', 
		'' AS transaction_Description, 
		NULL AS transaction_id, 
		Hist.DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
		NULL AS CashFlowType_id, 
		NULL AS transactionGroupID,
		Hist.Staff_Id				as	LastUpdateBy,
		Hist.dteDateupdated			as	LastUpdated
	FROM Dawn_Data.Loan.Loan Loan
	LEFT JOIN Dawn_Data.Loan.History Hist ON Loan.loan_id = Hist.[DIM_loan_id_SSK]
	WHERE Loan.loan_id = @LoanId
	  AND Loan.redeemed_date IS NOT NULL	 	
	  AND Hist.arrangement_fee_out_Value<>0
	  AND @ViewType IN (0, 1)

	-- 20170915. PW Added arrangement fee on redemption
	SELECT 
		FlowDate, 
		Amount, 
		(SELECT SUM(Amount) FROM #Temp x WHERE x.FlowDate <= t.FlowDate) As Balance,
		CashflowType,
		CashflowNotes,
		CashflowTypeId,
		TransactionId,
		LastUpdateBy,
		LastUpdated
	FROM #Temp t
	ORDER BY t.FlowDate

End
GO
/****** Object:  StoredProcedure [Cashflow].[CashFlowGet_20171218]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Cashflow].[CashFlowGet_20171218]
	@LoanId Int,
	@ViewType Int

AS

SET NOCOUNT ON

SELECT
	i.cashflowInterest_date As FlowDate, 
	i.loan_id As LoanId, 
	i.cashflowInterest_amount As Amount, 
	i.IDHistory As HistoryId, 
	t.CashflowTypeDescription As CashFlowType, 
	'' AS CashFlowNotes, 
	i.transaction_id As TransactionId, 
	DIM_loan_id_DWSK As LoanHistoryId, 
	CashFlowType_id As CashflowTypeId,
	transactionGroupID As TransactionGroupId
INTO #Temp
FROM Dawn_Data.LoanCalc.CashflowInterest i LEFT JOIN Dawn_Data.LoanCalc.CashflowType t ON i.cashflowInterest_type = t.CashFlowType_id
WHERE CashFlowType_id NOT IN (5, 4)
  AND i.loan_id = @LoanId
  AND (@ViewType = 0
		OR @ViewType = 2 AND CashFlowType_Id Not IN (7))
	UNION ALL
SELECT 
	completion_date, 
	DIM_loan_id_SSK AS loan_id, 
	loan_amount, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	'Opening Balance', '' AS transaction_Description, 
	NULL AS transaction_id, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	NULL AS CashFlowType_id, 
	NULL AS transactionGroupID
FROM Dawn_Data.Loan.History
WHERE DIM_loan_id_SSK = @LoanId
  AND @ViewType = 0
	UNION ALL
SELECT
	completion_date, 
	DIM_loan_id_SSK AS loan_id, 
	TitleInsurance, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	'Title Insurance', '' AS transaction_Description, 
	NULL AS transaction_id, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	NULL AS CashFlowType_id, 
	NULL AS transactionGroupID
FROM Dawn_Data.Loan.History
WHERE ISNULL(TitleInsurance, 0) <> 0
  AND DIM_loan_id_SSK = @LoanId
  AND @ViewType = 0
	UNION ALL
SELECT
	completion_date, 
	DIM_loan_id_SSK AS loan_id, 
	AdministrationFee, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	'Admin Fee', 
	'' AS transaction_Description, 
	NULL AS transaction_id, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	NULL AS CashFlowType_id, 
	NULL AS transactionGroupID
FROM Dawn_Data.Loan.History
WHERE ISNULL(AdministrationFee,0) <> 0
  AND DIM_loan_id_SSK = @LoanId
  AND @ViewType = 0
	UNION ALL
SELECT
	completion_date, 
	DIM_loan_id_SSK AS loan_id, 
	insurance_COST, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	'Insurance', 
	'' AS transaction_Description, 
	NULL AS transaction_id, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	NULL AS CashFlowType_id, 
	NULL AS transactionGroupID
FROM Dawn_Data.Loan.History
WHERE ExcludeInsuranceFee = 0 
  AND ISNULL(insurance_COST,0) <> 0
  AND DIM_loan_id_SSK = @LoanId
  AND @ViewType = 0
	UNION ALL
SELECT
	completion_date, 
	DIM_loan_id_SSK AS loan_id, 
	legal_cost, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	'Legal Fee', 
	'' AS transaction_Description, 
	NULL AS transaction_id, 
	DIM_loan_id_DWSK AS DIM_loan_id_DWSK, 
	NULL AS CashFlowType_id, 
	NULL AS transactionGroupID
FROM Dawn_Data.Loan.History
WHERE ExcludeLegalFees = 0 
  AND ISNULL(legal_cost,0) <> 0
  AND DIM_loan_id_SSK = @LoanId
  AND @ViewType = 0
	UNION ALL
SELECT
	t.transaction_date, 
	t.loan_id, 
	t.Amount, 
	DIM_loan_id_DWSK, 
	tt.transaction_type, 
	t.transaction_Description, 
	t.transaction_id, 
	DIM_loan_id_DWSK, 
	NULL AS CashFlowType_id, 
	NULL AS transactionGroupID
FROM Dawn_Data.LoanCalc.[Transaction] t
LEFT JOIN Dawn_Data.LoanCalc.TransactionType tt ON t.transaction_type = tt.transaction_ID
WHERE t.loan_id = @LoanId
  AND @ViewType IN (0, 1)

SELECT 
	FlowDate, 
	Amount, 
	(SELECT SUM(Amount) FROM #Temp x WHERE x.FlowDate <= t.FlowDate) As Balance,
	CashflowType,
	CashflowNotes,
	CashflowTypeId,
	TransactionId
FROM #Temp t
ORDER BY t.FlowDate

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Comms].[EmailIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Comms].[EmailIdGet] @User varchar(255)
as begin
	
	begin try
		set nocount on

		select distinct RecipientId from Dawn_Data_Comms.[Comms].[Recipient] where RecipientName = replace(@User,'OMN\','')

	end try

	begin catch
	end catch
end
GO
/****** Object:  StoredProcedure [Comms].[QueueMessage]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Comms].[QueueMessage] @MessageType varchar(255) , @RecipientGroupId int , @RecipientId int, @SenderId int, @Subject varchar(max) , @Message varchar(max)
as begin
	
	begin try
		set nocount on
		declare @rc int , @debug int ;set @rc=-1
		set @debug=0
		if @MessageType='Email' begin
			--queue the message
			begin tran

				declare @MsgId  int, @QueuedTime datetime ; set @MsgId=0

				if @debug=0 begin
					insert	Dawn_Data_Comms.Comms.Message(Subject,MessageText,IsPending,fkSenderId)
						select @Subject, @Message , 1,@SenderId
					set @MsgId = Scope_identity()
				end
				else
					select 'Pending Message',  @Subject Subject, @Message Message

				if isnull(@RecipientGroupId,0)<>0 begin
						if @debug=1
							select @MsgId MsgId , @RecipientGroupId RecipientGroupId
						else
							insert Dawn_Data_Comms.Comms.RecipientOfMessage(fkMessageId,fkRecipientGroupId,fkRecipientId)
								select @MsgId,@RecipientGroupId,0
					set @RecipientId=0
				end

				/*single recipient*/
				if isnull(@RecipientId,0)<>0 begin
					if @debug=1
						select @MsgId MsgId , @RecipientId RecipientId
					else
						insert Dawn_Data_Comms.Comms.RecipientOfMessage(fkMessageId,fkRecipientGroupId,fkRecipientId)
							select @MsgId,0,@RecipientId
				end

				select @QueuedTime = getdate(), @RecipientGroupId = isnull(@RecipientGroupId,0), @RecipientId = isnull(@RecipientId,0) 

				if @debug=1
					select 'Log Message',@QueuedTime QueuedTime, @RecipientGroupId RecipientGroupId, @RecipientId RecipientId
				else
					exec Dawn_Data_Comms.Comms.logMessage	 @MsgId , @RecipientGroupId , @RecipientId , @QueuedTime , null , @MessageType , @Message
				set @rc=0

			commit			
		end
	end try

	begin catch
		set @rc=-2
	end catch

	select @rc
end

GO
/****** Object:  StoredProcedure [dbo].[ELMAH_GetErrorsXml]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ELMAH_GetErrorsXml]
(
    @Application NVARCHAR(60),
    @PageIndex INT = 0,
    @PageSize INT = 15,
    @TotalCount INT OUTPUT
)
AS 

    SET NOCOUNT ON

    DECLARE @FirstTimeUTC DATETIME
    DECLARE @FirstSequence INT
    DECLARE @StartRow INT
    DECLARE @StartRowIndex INT

    SELECT 
        @TotalCount = COUNT(1) 
    FROM 
        [Dawn_Data].[Admin].[ELMAH_Error]
    WHERE 
        [Application] = @Application

    -- Get the ID of the first error for the requested page

    SET @StartRowIndex = @PageIndex * @PageSize + 1

    IF @StartRowIndex <= @TotalCount
    BEGIN

        SET ROWCOUNT @StartRowIndex

        SELECT  
            @FirstTimeUTC = [TimeUtc],
            @FirstSequence = [Sequence]
        FROM 
            [Dawn_Data].[Admin].[ELMAH_Error]
        WHERE   
            [Application] = @Application
        ORDER BY 
            [TimeUtc] DESC, 
            [Sequence] DESC

    END
    ELSE
    BEGIN

        SET @PageSize = 0

    END

    -- Now set the row count to the requested page size and get
    -- all records below it for the pertaining application.

    SET ROWCOUNT @PageSize

    SELECT 
        errorId     = [ErrorId], 
        application = [Application],
        host        = [Host], 
        type        = [Type],
        source      = [Source],
        message     = [Message],
        [user]      = [User],
        statusCode  = [StatusCode], 
        time        = CONVERT(VARCHAR(50), [TimeUtc], 126) + 'Z'
    FROM 
        [Dawn_Data].[Admin].[ELMAH_Error] error
    WHERE
        [Application] = @Application
    AND
        [TimeUtc] <= @FirstTimeUTC
    AND 
        [Sequence] <= @FirstSequence
    ORDER BY
        [TimeUtc] DESC, 
        [Sequence] DESC
    FOR
        XML AUTO


GO
/****** Object:  StoredProcedure [dbo].[ELMAH_GetErrorXml]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[ELMAH_GetErrorXml]
(
    @Application NVARCHAR(60),
    @ErrorId UNIQUEIDENTIFIER
)
AS

    SET NOCOUNT ON

    SELECT 
        [AllXml]
    FROM 
        [Dawn_Data].[Admin].[ELMAH_Error]
    WHERE
        [ErrorId] = @ErrorId
    AND
        [Application] = @Application


GO
/****** Object:  StoredProcedure [dbo].[ELMAH_LogError]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ELMAH_LogError]
(
    @ErrorId UNIQUEIDENTIFIER,
    @Application NVARCHAR(60),
    @Host NVARCHAR(30),
    @Type NVARCHAR(100),
    @Source NVARCHAR(60),
    @Message NVARCHAR(500),
    @User NVARCHAR(50),
    @AllXml NTEXT,
    @StatusCode INT,
    @TimeUtc DATETIME
)
AS

    SET NOCOUNT ON

    INSERT
    INTO
        [Dawn_Data].[Admin].[ELMAH_Error]
        (
            [ErrorId],
            [Application],
            [Host],
            [Type],
            [Source],
            [Message],
            [User],
            [AllXml],
            [StatusCode],
            [TimeUtc]
        )
    VALUES
        (
            @ErrorId,
            @Application,
            @Host,
            @Type,
            @Source,
            @Message,
            @User,
            @AllXml,
            @StatusCode,
            @TimeUtc
        )


GO
/****** Object:  StoredProcedure [Finance].[BackupFunder]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  proc  [Finance].[BackupFunder]
as begin

/*

-----------------------------------------------------------------------------------
Date		Version		Name			Description
------------------------------------------------------------------------------------
21.3.18		1.00		pjrb			backup current table
2018-07-04	2.00		Gurdeep			added amount field

*/

	set nocount on
	declare		@rc				int
	set @rc=-1

	insert Dawn_Data.Loan.[FunderOfLoan_Archive] (	[FunderOfLoanId],[fkLoanId],[CaseReference],[fkFunderId],[FunderLoanSplitPct],[FunderLoanSplitAmt],
											[Created] , [CreatedBy] , [Lastupdate] ,[LastUpdateBy])

	select	[FunderOfLoanId],[fkLoanId],[CaseReference],[fkFunderId],[FunderLoanSplitPct],[FunderLoanSplitAmt],
			[Created] , [CreatedBy] , [Lastupdate] ,[LastUpdateBy]
	from Dawn_Data.Loan.FunderOfLoan
	set @rc=0
	select  @rc FunderBackup
end
GO
/****** Object:  StoredProcedure [Finance].[CaseReferenceCheckGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc  [Finance].[CaseReferenceCheckGet] @cr varchar(255) as begin

	set nocount on
	if exists(
				(
				--select 	cbfl_Id			from		Dawn_Data.loan.loan			where	cbfl_id = @cr
				--union
				 select 	CaseReference	from		Dawn_Data.loan.FunderOfLoan	where	CaseReference = @cr
				)
			)
		select 1 CaseExists
	else
		select 0 CaseExists
end
GO
/****** Object:  StoredProcedure [Finance].[disused_ReconcileByCase2]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Finance].[disused_ReconcileByCase2] @wlId varchar(255)  ,@asOfDate datetime
as begin
	set nocount on

	declare @SageTrans table (CompanyNo varchar(255),CBFL_ID varchar(255), NAME varchar(255), SageCFDate datetime, Amount money, TRAN_NUMBER int , ITEM_COUNT int, SageTransType varchar(255), INV_REF varchar(255), [TYPE]  varchar(255) ,  RecTranType varchar(255) null default 0)
	declare @AuraTrans table (CBFL_ID varchar(255), AuraCFDate datetime, AuraTransType varchar(255) , Amount money, cashflowtype_id int ,  RecTranType varchar(255) null  default 0)

	insert @AuraTrans(CBFL_ID,AuraCFDate,AuraTransType,Amount,cashflowtype_id)
		select	CBFL_id, cashflowinterest_date,cashflowtypedescription,isnull(cashflowinterest_amount,0),isnull(cashflowtype_id,0) cashflowtype_id
		from		Dawn_Data.reconciliation.vwStatementCashflowTransactions cf 
		inner join Dawn_Data.Loan.Loan										l	on l.loan_id = cf.loan_id
		where l.weblabs_id = @wlId--l.CBFL_id = @cr
			and cf.cashflowinterest_date<=@asOfDate


	insert @SageTrans(Companyno,CBFL_ID,NAME,SageCFDate,Amount,TRAN_NUMBER,ITEM_COUNT,SageTransType,INV_REF,[TYPE]) 
		exec Dawn_Data_v100.reconciliation.SageTransactionsRunningTotals2 @wlId

	delete @SageTrans where SageCFDate>@asOfDate or SageTransType like '%deleted%'

	--delete @AuraTrans where AuraTransType like '%Serviced Interest due%'
	--aura
	update @AuraTrans set RecTranType=1 where AuraTransType like '%Opening%' and AuraTransType like '%balance%'
	update @AuraTrans set RecTranType=1 where AuraTransType like '%transfer%' and AuraTransType like '%balance%'
	--update @AuraTrans set AuraTransType =' Opening Balance' where RecTranType=1 and AuraTransType like '%transfer%' and AuraTransType like '%balance%'

	update @AuraTrans set RecTranType=2 where ((AuraTransType like '%Admin Fee%'  and AuraTransType not like '%Arrangement%') or (AuraTransType like '%Legal Fee%'  and AuraTransType not like '%Arrangement%')
										or (AuraTransType like 'Ad-Hoc Cost%'  and AuraTransType not like '%Arrangement%') or (AuraTransType like 'Enquiry Fee%'  and AuraTransType not like '%Arrangement%')
										or (AuraTransType like 'In House Fees%'  and AuraTransType not like '%Arrangement%') or (AuraTransType like '%Legal Fees%'  and AuraTransType not like '%Arrangement%')
										or (AuraTransType like 'Receiver Fees%'  and AuraTransType not like '%Arrangement%') or (AuraTransType like '%Asset Manager%'  and AuraTransType not like '%Arrangement%')
										or (AuraTransType like 'TT charge (Bank Charges)%'  and AuraTransType not like '%Arrangement%'))
	update @AuraTrans set RecTranType=3 where AuraTransType like '%insurance%'		--insurance
	update @AuraTrans set RecTranType=4 where AuraTransType like 'Arrangement Fee%' --fee in
	update @AuraTrans set RecTranType=5 where ((AuraTransType like 'Arrangement Fee Payable on Redemption%') or (AuraTransType like 'Fee Interest Due to Broker Out%')) --fee out
	update @AuraTrans set RecTranType=6 where AuraTransType like '%interest%'		--interest

	--sage
	update @SageTrans set RecTranType=1 where 
								(	([TYPE] = 'SP') or ([TYPE] = 'Sa' and SageTransType not like '%deleted%' )
									or ([TYPE] = 'SI' and SageTransType like '%principal%' and SageTransType like '%securitised%' )
									or ([TYPE] = 'Sc' and SageTransType like '%principal%' and SageTransType like '%securitised%' )
									or ([TYPE] = 'Sr' and SageTransType like '%Sales Receipt%' ))
	update @SageTrans set RecTranType=3 where SageTransType like '%insurance%'							--insurance
	update @SageTrans set RecTranType=4 where SageTransType like 'Arrangement Fee%'	or SageTransType like '%Fee In%'				--fee in
	update @SageTrans set RecTranType=5 where SageTransType like '%Fee%' and SageTransType like '%out%' --fee out
	update @SageTrans set RecTranType=6 where SageTransType like '%interest%' or SageTransType like '%int period adj%'

	select 
		ISNULL(s.CompanyNo,'-'),isnull(s.CBFL_ID,a.CBFL_ID) [Case] ,  isnull(CONVERT(varchar,a.AuraCFDate,105),'') AuraCashFlowDate, isnull(a.AuraTransType,'') AuraTransType , isnull(a.Amount,0) Amount
			,isnull(CONVERT(varchar,s.SageCFDate,105),'') SageCashFlowDate,isnull(s.SageTransType,'') SageTransType, isnull(s.Amount,0) Amount
	from	
		@AuraTrans a		
		--(select
		--	isnull(CBFL_ID,'') CBFL_ID ,  AuraCFDate, AuraTransType, sum(Amount) amount , RecTranType
		--	from @AuraTrans	
		--	group by isnull(CBFL_ID,'') ,  AuraCFDate, RecTranType, AuraTransType
		--) a

	full outer join	@SageTrans	s	on a.RecTranType = s.RecTranType and CONVERT(varchar,a.AuraCFDate,105)=CONVERT(varchar,s.SageCFDate,105)
		and a.AuraTransType = s.SageTransType
	order by isnull(a.AuraCFDate,s.SageCFDate)

	--select	 *	from @AuraTrans
	--select	* from	@SageTrans
end
GO
/****** Object:  StoredProcedure [Finance].[FunderPercentageUpdate]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-07-04		Gurdeep			Updated FunderPct decimal places and FunderAmt data type
2018-07-17		Gurdeep			Updated @FundSplit parameter length to varchar(MAX) to handle larger splits

*/

CREATE proc  [Finance].[FunderPercentageUpdate] @FundSplit varchar(MAX) as begin

	set nocount on

	declare		 @LoanId			int
				,@FunderSplitStr	varchar(MAX)
				,@Cr				varchar(255)
				,@FunderPct			decimal(20,16)
			    ,@FunderAmt			decimal(20,2)
				,@FunderId			int
				,@rc				int
	declare		@FunderSplit table(id int identity,Fundersplit varchar(MAX))

	set @rc=-1
	select	@LoanId = [value] from dbo.fn_split(@FundSplit,'$') where idx=0
	select	@Cr = upper([value]) from dbo.fn_split(@FundSplit,'$') where idx=1
	select	@FunderSplitStr = [value] from dbo.fn_split(@FundSplit,'$') where idx=2
	insert	@FunderSplit select replace(replace([value],'{',''),'}','') from dbo.fn_split(@FunderSplitStr,'|')

	--select	@LoanId ,@cr
	--select	@FunderSplitStr
   --select * from @FunderSplit
	--goto earlyexit

	if @LoanId=0 begin
		if exists(select * from Dawn_Data.Loan.Loan where cbfl_id=@cr)
			select @LoanId=Loan_Id from Dawn_Data.Loan.Loan where cbfl_id=@cr
	end 

	if @LoanId=0
		delete Dawn_Data.Loan.FunderOfLoan where casereference=@cr
	else
		delete Dawn_Data.Loan.FunderOfLoan where fkloanid=@LoanId

	declare @i int
	select @i=min(id) from @FunderSplit
	while @i is not null begin
		select 
			 @FunderId	=	(select replace(replace(replace([value],' ',''),'=',''),'FunderId','') from dbo.fn_split(Fundersplit,',') where idx=0)
			,@FunderPct	=	(select replace(replace(replace([value],' ',''),'=',''),'FunderPercentage','') from dbo.fn_split(Fundersplit,',') where idx=1)
			,@FunderAmt	=	(select replace(replace(replace([value],' ',''),'=',''),'FunderAmount','') from dbo.fn_split(Fundersplit,',') where idx=2)
		from @FunderSplit where id=@i
		
		--select  @FunderId , @FunderPct ,@FunderAmt ,@cr
		
		insert Dawn_Data.Loan.FunderOfLoan(fkLoanId,fkFunderId,FunderLoanSplitPct,FunderLoanSplitAmt,CaseReference,Lastupdate,LastUpdateBy) values (@LoanId,@FunderId,@FunderPct,@FunderAmt,@cr,getdate(),suser_sname())

		select @i=min(id) from @FunderSplit where id>@i
	end
	set @rc=0

	select @rc SplitUpdated

	earlyexit:
end
GO
/****** Object:  StoredProcedure [Finance].[FunderPercentageUpdateWithCaseRef]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc  [Finance].[FunderPercentageUpdateWithCaseRef] @FundSplit varchar(max)
as begin
	/*	Version	Date			Author			Decription
		1.00	2018			PJR				Initial
		2.00    2018-07-05		Gurdeep			Updated @Funderpct and @FunderAmt datatypes
		
	*/
	set nocount on

		declare		 @LoanId			int
					,@FunderSplitStr	varchar(max)
					,@Cr				varchar(max)
					,@FunderPct			decimal(20,16)
					,@FunderAmt			decimal(20,2)
					,@FunderId			int
					,@rc				int
		declare		@FunderSplit table(id int identity,Fundersplit varchar(max))
		set @rc=-1
		select @Cr = upper([value]) from dbo.fn_split(@FundSplit,'$') where idx=0
		select @LoanId=Loan_id from Dawn_Data.Loan.Loan where CBFL_id=@Cr
		set @FundSplit = convert(varchar(255),@LoanId)+'$'+@FundSplit
		select	@LoanId = [value] from dbo.fn_split(@FundSplit,'$') where idx=0
		select	@Cr = upper([value]) from dbo.fn_split(@FundSplit,'$') where idx=1
		select	@FunderSplitStr = [value] from dbo.fn_split(@FundSplit,'$') where idx=2
		insert	@FunderSplit select replace(replace([value],'{',''),'}','') from dbo.fn_split(@FunderSplitStr,'|')
		if @LoanId=0 begin
			if exists(select * from Dawn_Data.Loan.Loan where cbfl_id=@cr)
				select @LoanId=Loan_Id from Dawn_Data.Loan.Loan where cbfl_id=@cr
		end 
		if @LoanId=0
			delete Dawn_Data.Loan.FunderOfLoan where casereference=@cr
		else
			delete Dawn_Data.Loan.FunderOfLoan where fkloanid=@LoanId

		declare @i int = (select min(id) from @FunderSplit)
		while @i is not null begin
			select 
				 @FunderId	=	(select replace(replace(replace([value],' ',''),'=',''),'FunderId','') from dbo.fn_split(Fundersplit,',') where idx=0)
				,@FunderPct	=	(select replace(replace(replace([value],' ',''),'=',''),'FunderPercentage','') from dbo.fn_split(Fundersplit,',') where idx=1)
				,@FunderAmt	=	(select replace(replace(replace([value],' ',''),'=',''),'FunderAmount','') from dbo.fn_split(Fundersplit,',') where idx=2)
			from @FunderSplit where id=@i

			if @FunderPct!=0.0
				insert Dawn_Data.Loan.FunderOfLoan(fkLoanId,fkFunderId,FunderLoanSplitPct,FunderLoanSplitAmt,CaseReference,Lastupdate,LastUpdateBy) values (@LoanId,@FunderId,@FunderPct,@FunderAmt,@cr,getdate(),suser_sname())
	
	--select @LoanId,@FunderId,@FunderPct,@FunderAmt,@cr,getdate(),suser_sname()

			select @i=min(id) from @FunderSplit where id>@i
		end
	set @rc=0
	select @rc SplitUpdated
	earlyexit:
end
GO
/****** Object:  StoredProcedure [Finance].[FunderSplitGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-07-04		Gurdeep			Updated FunderPct decimal places and FunderAmt data type

*/

CREATE proc  [Finance].[FunderSplitGet] @LoanId int , @Cr varchar(255) as begin

	set nocount on

	select 	 l.loan_id					as	LoanId
			--,CBFL_id					as	CaseReference
			,f.Funder_Name				as	Funder
			,f.Funder_ID				as	FunderId
			,convert(decimal(20,16),fl.[FunderLoanSplitPct])	as	FunderPercentage
			,convert(decimal(20,2),fl.FunderLoanSplitAmt) as FunderAmount 
	from		Dawn_Data.loan.loan			l
	inner join	Dawn_Data.Loan.FunderOfLoan		fl	on	fl.fkloanId		=	l.loan_id
	inner join	Dawn_Data.[Reference].[Funders]	f	on	f.Funder_Id	=	fl.fkFunderId	
	where	l.loan_id = @LoanId
	
	union
	/*cases funders without cases
	*/
	select 	 0							as	LoanId
			,f.Funder_Name				as	Funder
			,f.Funder_ID				as	FunderId
			,convert(decimal(20,16),fl.[FunderLoanSplitPct])	as	FunderPercentage
			,convert(decimal(20,2),fl.FunderLoanSplitAmt) as FunderAmount 
	from	Dawn_Data.Loan.FunderOfLoan			fl
	inner join	Dawn_Data.[Reference].[Funders]	f	on	f.Funder_Id	=	fl.fkFunderId
	where	CaseReference	= @Cr and fkLoanId=0

	order by f.Funder_Name
end


GO
/****** Object:  StoredProcedure [Finance].[FunderValuesGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Finance].[FunderValuesGet] as begin

	set nocount on
	/*	when		who		v		what
		2018.3.9	PJR		1.00	create case * funder %
		2018.7.9    GS		2.00	Aded isLive and Amount decimal places
	*/
	select	 l.CBFL_id
			,l.Loan_id as LoanId
			,af.funder_id
			,af.funder_name
			,convert(decimal(20,16),0) as FunderPercentage
			,convert(decimal(20,2),0) as FunderAmount	
			, 0 as IsLive
	into #cf
	from		Dawn_Data.Loan.Loan			l,Dawn_Data.Loan.Funder		af
	--where af.funder_name not in ('DPR Unknown')

	update #cf set FunderPercentage = isnull(fol.FunderLoanSplitPct,0.0) , FunderAmount = isnull(fol.FunderLoanSplitAmt,0.0)
		from Dawn_Data.Loan.FunderOfLoan fol 
		inner join #cf c on c.LoanId = fol.fkLoanId and c.funder_id = fol.fkFunderId

--select * from Dawn_Data.Loan.Funder
--select * from #cf order by loanid


	--loans w/o counterpart loan
	insert #cf (CBFL_id,LoanId, funder_id,funder_name,FunderPercentage,FunderAmount, IsLive)
		select	 CaseReference
				,0 as Loan_Id
				,af.Funder_Id
				,funder_name
				,0
				,0
				,0 as IsLive
		from	Dawn_Data.Loan.FunderOfLoan	l
			   ,Dawn_Data.Loan.Funder		af 
		where fkloanId=0
		--and af.funder_name not in ('DPR Unknown')

	update #cf set FunderPercentage = isnull(l.FunderLoanSplitPct,0.0),FunderAmount = isnull(l.FunderLoanSplitAmt,0.0)
--	select t.* ,l.fkfunderid
		from #cf t inner join Dawn_Data.Loan.FunderOfLoan	l 
			on	t.CBFL_id = l.casereference and l.fkfunderid=t.funder_id
		where fkLoanId=0

	select		 distinct
				 af.CBFL_ID				CaseReference
				,af.funder_name			Funder
				,af.FunderPercentage
				,af.FunderAmount
				,CASE WHEN (l.redeemed_date is null OR ISNULL(lh.loan_balance, 0) > 0) AND (lh.Division IS NOT NULL AND ISNULL(lh.ProductTypeID,0) > 0 AND ISNULL(lh.ProductInterestTypeID,0) > 0 AND lh.ProductTermCombination IS NOT NULL)  THEN 1 
				  ELSE 0 
			    END AS IsLive

	from		#cf af
	inner join	Dawn_Data.Loan.Loan			l on (l.loan_id = af.LoanId)
	inner join Dawn_Data.Loan.History lh on (lh.DIM_loan_id_SSK = l.loan_id)

	--where af.cbfl_id =  '12_PROPERTY_FE_LIMITED2707/06/2015' --'M1001337334' --'ANDREW-NEW_1-50%'
	order by af.CBFL_id,af.funder_name
end
GO
/****** Object:  StoredProcedure [Finance].[FundingOfCaseGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-07-04		Gurdeep			Added IsLive and PrincipalAdvance
2018-07-26      Gurdeep			Added Redeemed date and Balance outcome
*/

CREATE proc  [Finance].[FundingOfCaseGet] @SearchText varchar(255),@FunderId int
--declare @SearchText varchar(255),@FunderId int 
as begin

	set nocount on

	select 	 l.loan_id	as	LoanId
			,upper(l.CBFL_id)	as	CaseReference	
			,(	select Count(*) n
				from		Dawn_Data.Loan.FunderOfLoan
				where	fkLoanId=f.FkLoanId
				group by fkLoanId
			)			as Funders		
			,ISNULL(lh.loan_amount, 0.0) + ISNULL(lh.TitleInsurance, 0.0) + ISNULL(lh.insurance_cost, 0.0) as PrincipalAdvance
			, CASE WHEN (l.redeemed_date is null OR ISNULL(lh.loan_balance, 0) > 0) AND (lh.Division IS NOT NULL AND ISNULL(lh.ProductTypeID,0) > 0 AND ISNULL(lh.ProductInterestTypeID,0) > 0 AND lh.ProductTermCombination IS NOT NULL)  THEN 1 
				  ELSE 0 
			  END AS IsLive			
	from (
				select fkloanId
				from		Dawn_Data.Loan.FunderOfLoan
				where fkFunderId = case when @FunderId=0 then fkFunderId else @FunderId end
				and fkLoanId <>0
				group by fkLoanId
			) f
	inner join	Dawn_Data.Loan.Loan				l	on	l.loan_id = f.fkloanId
	inner join Dawn_Data.Loan.History           lh	on (lh.DIM_loan_id_SSK = l.Loan_Id)
	where (COALESCE(l.CBFL_id, '') LIKE '%' + @SearchText + '%')

	--union
	--/*	fund splits without a case
	--*/

	--select 	 0					as LoanId
	--		,upper(f.CaseReference)	as CaseReference
	--		,(	select Count(*) n
	--			from	Dawn_Data.Loan.FunderOfLoan
	--			where	CaseReference = f.CaseReference
	--			group by fkLoanId
	--		)					as Funders
	--		,f.PrincipalAdvance as PrincipalAdvance
	--		,0 as IsLive			
	--from (
	--					select 0 LoanID , CaseReference, 0 PrincipalAdvance
	--					from		Dawn_Data.Loan.FunderOfLoan
	--					where fkFunderId = case when @FunderId=0 then fkFunderId else @FunderId end
	--					and CaseReference is not null
	--					and fkLoanId =0
	--					group by CaseReference
	--				) f
	--where (COALESCE(f.CaseReference, '') LIKE '%' + @SearchText + '%')
	order by casereference
end
GO
/****** Object:  StoredProcedure [Finance].[InsertNewfunder]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-07-04		Gurdeep			Added FunderOrder,IsActive, Created, CreatedBy flag
2018-08-10		Gurdeep			Added email notification

*/

CREATE proc [Finance].[InsertNewfunder] @NewFunder varchar(1024) as begin

	set nocount on
	declare		@rc				int
	set @rc=-1

	 declare @FunderOrder int;
	 declare @CreatedDate datetime = getdate();

	 select @FunderOrder = ISNULL(max(FunderOrder), 0) from Dawn_Data.Reference.Funders

	INSERT Dawn_Data.Reference.Funders(Funder_Name, FunderOrder, IsActive, Created, CreatedBy) SELECT @NewFunder, @FunderOrder + 10, 1, @CreatedDate, 'SysOp'
	SET @rc=0

	select @rc FunderCreated

	if(@rc = 0)
		begin

			 -- Send email notification	
			DECLARE @tableHTML  NVARCHAR(MAX) ;

			SET @tableHTML = N'<H2>New Funder Added</H2><br/>' +  
			                 N'<b>Environment: </b> ' +  @@SERVERNAME + '<br/><br/>' +
							 N'<b>New Funder Name:</b> ' +  @NewFunder + '<br/><br/>' +
							 N'<b>Created Date:</b> ' + CAST(@CreatedDate AS nvarchar(30))  + '<br/><br/>' +
							 N'<b>User:</b> ' + suser_sname() + '<br/><br/>' +
							 N'<b>Note:</b> ' + 'Please add this funder to ProdGL DB. Peter W to do his Magic :)' + '<br/><br/>'   

							 --1	SMTP Relay	            -   AmicusProd Profile
							 --1	AmicusProdGL Profile	-	AmicusProdGL Profile

			 EXEC msdb.dbo.sp_send_dbmail @recipients='gurdeep.singh@amicusplc.co.uk;David.Linwood@amicusplc.co.uk;Paul.Stevens@amicusplc.co.uk;Peter.Wegrzyn@amicusplc.co.uk;Alison.Deacon@amicusplc.co.uk',  
										  @profile_name = 'AmicusProdGL Profile',--'SMTP Relay', 										  
										  @subject = 'New Funder added',  
										  @body = @tableHTML,  
										  @body_format = 'HTML' ; 

		end
END
GO
/****** Object:  StoredProcedure [Finance].[LoanProductGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  proc  [Finance].[LoanProductGet]	@LoanId int 
as begin
	set nocount on

	declare @Product table(ProductId int, ProductName nvarchar(255), ProductDescription nvarchar(255))

	insert @Product(ProductId, ProductName, ProductDescription)
	select	 p.ProductId									ProductId
			,isnull(p.ProductCode,'Product Code')			ProductName
			,case when p.SubType is not null then replace(replace(p.SubType,'/',' / '),'  ',' ') else 'Not Found' end ProductDescription
	from		Dawn_Data.Loan.vwAllCaseProducts	p
	inner join	Dawn_Data.Loan.History			h	on h.CBFL_id	= p.CaseReference
	where	h.dim_loan_id_ssk	= @LoanId

	if @@ROWCOUNT=0
		insert @Product(ProductId, ProductName, ProductDescription)
			select	 0,'Product Code','Not Found'

	select * from @Product
end
GO
/****** Object:  StoredProcedure [Finance].[SageIrr]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Finance].[SageIrr] @FilterCBFL_ID nvarchar(255)
AS BEGIN
	-- 24/07/2014. Peter Wegrzyn. performs a running sum on The NET and GROSS amounts, generates the LTV (on the current valuation) and IRR. 
	-- 1/10/2014. Modified to allow the selection of Transactions which are not being picked up by the random nature of their entry to SAGE.
	-- 13/10/2014. Modified Projected IRR to include projected Broker fees 
	SET NOCOUNT ON
	DECLARE @st TABLE (
	[CurrentValuation] Float NULL,	[CurrentLTV] Float NULL,		[ACCOUNT_REF] nvarchar(255) NULL,	[CompanyNumber] nvarchar(255) NULL,	[CBFL_ID] nvarchar(255) NULL,	[NAME] nvarchar(255) NULL,
	[Date] datetime2(7) NULL,	[NET_AMOUNT] float NULL,	[GROSS_AMOUNT] float NULL,	[TRAN_NUMBER] int NULL,	[ITEM_COUNT] int NULL,	[DETAILS] nvarchar(255) NULL,	[INV_REF] nvarchar(255) NULL,
	[TYPE] nvarchar(255) NULL,	[ANALYSIS_1] nvarchar(255) NULL,	[ANALYSIS_2] nvarchar(255) NULL,	[ANALYSIS_3] nvarchar(255) NULL,	[SSMA_TimeStamp] timestamp NOT NULL,
	[Staff_ID] nvarchar(255) NULL,	[dteDate] datetime NULL,	[SumNET_AMOUNT] float NULL,	[SumGROSS_AMOUNT] float NULL,	[IRR] float NULL, 	[UseInLTV] TinyInt NULL,
	[Broker_fee_ActuallyPaidOut] float NULL,	Deleted_Flag TinyInt NULL
					);

	 DECLARE @CurrentValuation Float 
	 DECLARE @CurrentLTV Float 
	 DECLARE @ACCOUNT_REF nvarchar(255) 
	 DECLARE @CompanyNumber nvarchar(255) 
	 DECLARE @CBFL_ID nvarchar(255) 
	 DECLARE @NAME nvarchar(255) 
	 DECLARE @Date datetime2(7) 
	 DECLARE @NET_AMOUNT float 
	 DECLARE @GROSS_AMOUNT float 
	 DECLARE @TRAN_NUMBER int 
	 DECLARE @ITEM_COUNT int 
	 DECLARE @DETAILS nvarchar(255) 
	 DECLARE @INV_REF nvarchar(255) 
	 DECLARE @TYPE nvarchar(255) 
	 DECLARE @ANALYSIS_1 nvarchar(255),	@ANALYSIS_2 nvarchar(255), @ANALYSIS_3 nvarchar(255) 
	 DECLARE @Staff_ID nvarchar(255) 
	 DECLARE @dteDate datetime 
	 DECLARE @SumNET_AMOUNT float
	 DECLARE @SumGROSS_AMOUNT float 
	 DECLARE @GROSS_AMOUNTRunningTotal float = 0
	 DECLARE @NET_AMOUNTRunningTotal float = 0
	 DECLARE @IRR float = 0
	 DECLARE @IRRFantasy float = 0 -- imagine if the loan is repaid today or on maturity date
	 DECLARE @IRRFantasyRedeemed float = 0 -- The Outstanding balance required to fully redeem the loan.
	 
	 DECLARE @IRRStartDate datetime2(7) -- starting date of Net IRR. Fees etc are accounted Monthly in Sage, but the dates need to be changed to start and end for IRR purposes
	 DECLARE @IRREndDate datetime2(7) -- End date for Net IRR 
	 DECLARE @UseInLTV TinyInt --UseIRR: 
	 DECLARE @Broker_fee_ActuallyPaidOut float -- The fee paid out to Broker. not cosistant with calcualtions so its hard coded in tbl_loan 
	 DECLARE @Broker_fee_Projected float
	 DECLARE @Broker_fee_flat float
	 DECLARE @Broker_fee_IN_Projected float  --Fee paid going into the loan, paid on completion (in a  day or two)
	 DECLARE @Broker_fee_OUT_Projected float --Fee paid going Out of the loan, paid on redemption or on Maturity if a Projected IRR
	 DECLARE @BrokerTrailFeeCash float	-- Trailer Fee, (term x interest rate) paid going Out of the loan, paid on redemption or on Maturity if a Projected IRR
	 DECLARE @RedeemedDate datetime2(7) 
	 DECLARE @MaturityDate datetime2(7)
	 DECLARE @CompletionDate datetime2(7)
 	 DECLARE @Deleted_Flag TinyInt 
	 /* This determine the use of the transaction. UseInLTV and UseInIRR are IDENTICAL, so we can use either. If they do differ the SP will have to be changed.
	 In MS Access. This query qryMoveToSQLServerSageUNIONCompanyTransactions populates . Removed SAGE type SI
	 
	 IIf((([Type]="SP" Or [Type]="SR" Or [Type]="SA") Or ([Details]="Opening Balance" And ([Type]="SC" Or [Type]="SI")) Or (Left([Details],8)="Open Bal" And ([Type]="SI" Or [Type]="SC")) Or (([Details]="Fee In" Or [Details]="Fee Out") And [Type]="SI")),1,0);
	*/

	select @IRRStartDate=NULL , @IRREndDate=NULL
		
	SELECT  @BrokerTrailFeeCash= isnull(gross_loan,0) *(isnull(broker_fee_outInterestRate,0) * (isnull(term,0))), @RedeemedDate=redeemed_date, @MaturityDate=Maturity_Date, @CompletionDate=Completion_Date
	-- =[arrangement_fee_in_percentage]+[arrangement_fee_out_percentage]-[broker_fee_in_percentage]-[broker_fee_out_percentage]-([broker_flat_fee]/[gross_loan])
	FROM [Dawn_Data].[Loan].[Loan] WHERE [CBFL_ID]= @FilterCBFL_ID
	
	IF @RedeemedDate is null --AND @RedeemedDate is null    
	begin
		IF   @MaturityDate < getdate() 
			SET  @RedeemedDate =getdate() 
		ELSE 
			SET @RedeemedDate=@MaturityDate;
	end

	SELECT  @Broker_fee_ActuallyPaidOut= Broker_fee_ActuallyPaidOut, 
			@Broker_fee_flat= isnull(broker_flat_fee,0),
			@Broker_fee_OUT_Projected =isnull(gross_loan,0) *  isnull(broker_fee_out_percentage,0),
			@Broker_fee_IN_Projected =isnull(gross_loan,0) * isnull(broker_fee_in_percentage,0) 			
	FROM [Dawn_Data].[Loan].[Loan] WHERE [CBFL_ID]= @FilterCBFL_ID;
			
	set @Broker_fee_Projected =@Broker_fee_flat + @Broker_fee_IN_Projected +@Broker_fee_OUT_Projected + @BrokerTrailFeeCash
	
	DECLARE c CURSOR
		LOCAL STATIC FORWARD_ONLY READ_ONLY
		FOR
		-- This add up all valuations
		select	 [Report].[fn_getMarketValue](@FilterCBFL_ID)
				,[ACCOUNT_REF], [CompanyNumber], [CBFL_ID], [NAME], [Date], [NET_AMOUNT]
				,[GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE]
				,[ANALYSIS_1], [ANALYSIS_2], [ANALYSIS_3]
				,  [Staff_ID], [dteDate],[UseInLTV], Deleted_Flag
		from	Dawn_Data.dbo.tbl_SageUNIONCompanyTransactions T1
		where	T1.[CBFL_ID]= @FilterCBFL_ID 
		order by	[Date]	,CompanyNumber	,Tran_number

	OPEN c;

	FETCH NEXT FROM c
		INTO @CurrentValuation, @ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
				@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @UseInLTV, @Deleted_Flag;

--select @CurrentValuation

	WHILE @@FETCH_STATUS = 0 begin

		If @Deleted_Flag =0 BEGIN
			SET @GROSS_AMOUNTRunningTotal = @GROSS_AMOUNTRunningTotal + @GROSS_AMOUNT;

			IF @TYPE='SP' 
				SET @SumNET_AMOUNT = isnull(@SumNET_AMOUNT,0) + isnull(@GROSS_AMOUNT,0);
		END

		 -- Pickup the first date
		 IF @IRRStartDate IS NULL AND 
			 ((@Type='SP' OR @Type='SR' OR @Type='SA') OR(@Details='Opening Balance' AND @Type='SI') OR (@Details='Opening Balance' AND @Type='SI') OR (LEFT(@Details,8)='Open Bal'  AND @Type='SC' ) OR (LEFT(@Details,8)='Open Bal' AND @Type='SI') )
			SET @IRRStartDate = @DATE

		 -- Pickup the Last Sale Recipt date
		 IF (@Type='SR' ) 
				SET @IRREndDate = @DATE
		
		--SET @NET_AMOUNTRunningTotal = @NET_AMOUNTRunningTotal + @NET_AMOUNT;
		INSERT @st(CurrentValuation,CurrentLTV, [ACCOUNT_REF], [CompanyNumber], [CBFL_ID], [NAME], [Date], [NET_AMOUNT], [GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE], 
			[ANALYSIS_1], [ANALYSIS_2], [ANALYSIS_3],  [Staff_ID], [dteDate], [SumNET_AMOUNT],[SumGROSS_AMOUNT],[UseInLTV], Deleted_Flag)
		SELECT @CurrentValuation
		, CASE WHEN (@GROSS_AMOUNTRunningTotal/@CurrentValuation)> 0 THEN (@GROSS_AMOUNTRunningTotal/@CurrentValuation)  ELSE 0 END As CurrentLTV
		,@ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
		@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @SumNET_AMOUNT, @GROSS_AMOUNTRunningTotal, @UseInLTV, @Deleted_Flag;
			
		FETCH NEXT FROM c 
			INTO @CurrentValuation,@ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
					@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @UseInLTV, @Deleted_Flag;
	END
	CLOSE c;
	DEALLOCATE c;




		SELECT @IRR = Dawn_Data.wct.XIRR(cf_amt, cf_date, 0.2)
		FROM 
		(
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Type]='SP' OR [Type]='SR' OR [Type]='SA') AND Deleted_Flag=0
				UNION ALL
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Details]='Opening Balance' AND [Type]='SC')	AND Deleted_Flag=0
				UNION ALL
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE (LEFT([Details],8)='Open Bal' AND [Type]='SC') AND Deleted_Flag=0
				UNION ALL
			SELECT @BrokerTrailFeeCash,CONVERT(VARCHAR(10),@MaturityDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_OUT_Projected,CONVERT(VARCHAR(10),@MaturityDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_IN_Projected,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_flat,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
		)	n	(cf_amt, cf_date);

		SELECT TOP 1 @IRRFantasyRedeemed= ROUND([SumGROSS_AMOUNT], 0) FROM @st ORDER BY  [Date] DESC, CompanyNumber DESC, Tran_number DESC;

		SELECT @IRRFantasy = Dawn_Data.wct.XIRR(cf_amt, cf_date, 0.2)
		FROM (
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Type]='SP' OR [Type]='SR' OR [Type]='SA') AND Deleted_Flag=0
				UNION ALL
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Details]='Opening Balance' AND [Type]='SC') AND Deleted_Flag=0	
				UNION ALL
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE (LEFT([Details],8)='Open Bal' AND [Type]='SC') AND Deleted_Flag=0
				UNION ALL
				-- Produce a Fantasy IRR. Imagine if they paid back the full amount on maturity date.
				SELECT -1 * @IRRFantasyRedeemed, @RedeemedDate AS [MM/DD/YYYY]  
				FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID  
				UNION ALL  -- Use projected
				SELECT @BrokerTrailFeeCash,CONVERT(VARCHAR(10),@RedeemedDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_OUT_Projected,CONVERT(VARCHAR(10),@RedeemedDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_IN_Projected,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_flat,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
		)	n	(cf_amt, cf_date);
		
		SELECT	[CompanyNumber], [CBFL_ID], [NAME], [Date], [GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE] 
		FROM @st 
		ORDER BY  [Date], CompanyNumber, Tran_number;

		SELECT @IRR Irr , @IRRFantasy Fantasy
END
GO
/****** Object:  StoredProcedure [Finance].[SageTransactionsRunningTotals]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [Finance].[SageTransactionsRunningTotals] @FilterCBFL_ID nvarchar(255)
AS BEGIN
	-- 24/07/2014. Peter Wegrzyn. performs a running sum on The NET and GROSS amounts, generates the LTV (on the current valuation) and IRR. 
	-- 1/10/2014. Modified to allow the selection of Transactions which are not being picked up by the random nature of their entry to SAGE.
	-- 13/10/2014. Modified Projected IRR to include projected Broker fees 
	SET NOCOUNT ON
	DECLARE @st TABLE (
	[CurrentValuation] Float NULL,	[CurrentLTV] Float NULL,		[ACCOUNT_REF] nvarchar(255) NULL,	[CompanyNumber] nvarchar(255) NULL,	[CBFL_ID] nvarchar(255) NULL,	[NAME] nvarchar(255) NULL,
	[Date] datetime2(7) NULL,	[NET_AMOUNT] float NULL,	[GROSS_AMOUNT] float NULL,	[TRAN_NUMBER] int NULL,	[ITEM_COUNT] int NULL,	[DETAILS] nvarchar(255) NULL,	[INV_REF] nvarchar(255) NULL,
	[TYPE] nvarchar(255) NULL,	[ANALYSIS_1] nvarchar(255) NULL,	[ANALYSIS_2] nvarchar(255) NULL,	[ANALYSIS_3] nvarchar(255) NULL,	[SSMA_TimeStamp] timestamp NOT NULL,
	[Staff_ID] nvarchar(255) NULL,	[dteDate] datetime NULL,	[SumNET_AMOUNT] float NULL,	[SumGROSS_AMOUNT] float NULL,	[IRR] float NULL, 	[UseInLTV] TinyInt NULL,
	[Broker_fee_ActuallyPaidOut] float NULL,	Deleted_Flag TinyInt NULL
					);

	 DECLARE @CurrentValuation Float 
	 DECLARE @CurrentLTV Float 
	 DECLARE @ACCOUNT_REF nvarchar(255) 
	 DECLARE @CompanyNumber nvarchar(255) 
	 DECLARE @CBFL_ID nvarchar(255) 
	 DECLARE @NAME nvarchar(255) 
	 DECLARE @Date datetime2(7) 
	 DECLARE @NET_AMOUNT float 
	 DECLARE @GROSS_AMOUNT float 
	 DECLARE @TRAN_NUMBER int 
	 DECLARE @ITEM_COUNT int 
	 DECLARE @DETAILS nvarchar(255) 
	 DECLARE @INV_REF nvarchar(255) 
	 DECLARE @TYPE nvarchar(255) 
	 DECLARE @ANALYSIS_1 nvarchar(255),	@ANALYSIS_2 nvarchar(255), @ANALYSIS_3 nvarchar(255) 
	 DECLARE @Staff_ID nvarchar(255) 
	 DECLARE @dteDate datetime 
	 DECLARE @SumNET_AMOUNT float
	 DECLARE @SumGROSS_AMOUNT float 
	 DECLARE @GROSS_AMOUNTRunningTotal float = 0
	 DECLARE @NET_AMOUNTRunningTotal float = 0
	 DECLARE @IRR float = 0
	 DECLARE @IRRFantasy float = 0 -- imagine if the loan is repaid today or on maturity date
	 DECLARE @IRRFantasyRedeemed float = 0 -- The Outstanding balance required to fully redeem the loan.
	 
	 DECLARE @IRRStartDate datetime2(7) -- starting date of Net IRR. Fees etc are accounted Monthly in Sage, but the dates need to be changed to start and end for IRR purposes
	 DECLARE @IRREndDate datetime2(7) -- End date for Net IRR 
	 DECLARE @UseInLTV TinyInt --UseIRR: 
	 DECLARE @Broker_fee_ActuallyPaidOut float -- The fee paid out to Broker. not cosistant with calcualtions so its hard coded in tbl_loan 
	 DECLARE @Broker_fee_Projected float
	 DECLARE @Broker_fee_flat float
	 DECLARE @Broker_fee_IN_Projected float  --Fee paid going into the loan, paid on completion (in a  day or two)
	 DECLARE @Broker_fee_OUT_Projected float --Fee paid going Out of the loan, paid on redemption or on Maturity if a Projected IRR
	 DECLARE @BrokerTrailFeeCash float	-- Trailer Fee, (term x interest rate) paid going Out of the loan, paid on redemption or on Maturity if a Projected IRR
	 DECLARE @RedeemedDate datetime2(7) 
	 DECLARE @MaturityDate datetime2(7)
	 DECLARE @CompletionDate datetime2(7)
 	 DECLARE @Deleted_Flag TinyInt 
	 /* This determine the use of the transaction. UseInLTV and UseInIRR are IDENTICAL, so we can use either. If they do differ the SP will have to be changed.
	 In MS Access. This query qryMoveToSQLServerSageUNIONCompanyTransactions populates . Removed SAGE type SI
	 
	 IIf((([Type]="SP" Or [Type]="SR" Or [Type]="SA") Or ([Details]="Opening Balance" And ([Type]="SC" Or [Type]="SI")) Or (Left([Details],8)="Open Bal" And ([Type]="SI" Or [Type]="SC")) Or (([Details]="Fee In" Or [Details]="Fee Out") And [Type]="SI")),1,0);
	*/

	select @IRRStartDate=NULL , @IRREndDate=NULL
		
	SELECT  @BrokerTrailFeeCash= isnull(gross_loan,0) *(isnull(broker_fee_outInterestRate,0) * (isnull(term,0))), @RedeemedDate=redeemed_date, @MaturityDate=Maturity_Date, @CompletionDate=Completion_Date
	-- =[arrangement_fee_in_percentage]+[arrangement_fee_out_percentage]-[broker_fee_in_percentage]-[broker_fee_out_percentage]-([broker_flat_fee]/[gross_loan])
	FROM [Dawn_Data].[Loan].[Loan] WHERE [CBFL_ID]= @FilterCBFL_ID
	
	IF @RedeemedDate is null --AND @RedeemedDate is null    
	begin
		IF   @MaturityDate < getdate() 
			SET  @RedeemedDate =getdate() 
		ELSE 
			SET @RedeemedDate=@MaturityDate;
	end

	SELECT  @Broker_fee_ActuallyPaidOut= Broker_fee_ActuallyPaidOut, 
			@Broker_fee_flat= isnull(broker_flat_fee,0),
			@Broker_fee_OUT_Projected =isnull(gross_loan,0) *  isnull(broker_fee_out_percentage,0),
			@Broker_fee_IN_Projected =isnull(gross_loan,0) * isnull(broker_fee_in_percentage,0) 			
	FROM [Dawn_Data].[Loan].[Loan] WHERE [CBFL_ID]= @FilterCBFL_ID;
			
	set @Broker_fee_Projected =@Broker_fee_flat + @Broker_fee_IN_Projected +@Broker_fee_OUT_Projected + @BrokerTrailFeeCash
	
	DECLARE c CURSOR
		LOCAL STATIC FORWARD_ONLY READ_ONLY
		FOR
		-- This add up all valuations
		select	 [Report].[fn_getMarketValue](@FilterCBFL_ID)
				,[ACCOUNT_REF], [CompanyNumber], [CBFL_ID], [NAME], [Date], [NET_AMOUNT]
				,[GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE]
				,[ANALYSIS_1], [ANALYSIS_2], [ANALYSIS_3]
				,  [Staff_ID], [dteDate],[UseInLTV], Deleted_Flag
		from	Dawn_Data.dbo.tbl_SageUNIONCompanyTransactions T1
		where	T1.[CBFL_ID]= @FilterCBFL_ID 
		order by	[Date]	,CompanyNumber	,Tran_number

	OPEN c;

	FETCH NEXT FROM c
		INTO @CurrentValuation, @ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
				@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @UseInLTV, @Deleted_Flag;

	WHILE @@FETCH_STATUS = 0 begin

		If @Deleted_Flag =0 BEGIN
			SET @GROSS_AMOUNTRunningTotal = @GROSS_AMOUNTRunningTotal + @GROSS_AMOUNT;

			IF @TYPE='SP' 
				SET @SumNET_AMOUNT = isnull(@SumNET_AMOUNT,0) + isnull(@GROSS_AMOUNT,0);
		END

		 -- Pickup the first date
		 IF @IRRStartDate IS NULL AND 
			 ((@Type='SP' OR @Type='SR' OR @Type='SA') OR(@Details='Opening Balance' AND @Type='SI') OR (@Details='Opening Balance' AND @Type='SI') OR (LEFT(@Details,8)='Open Bal'  AND @Type='SC' ) OR (LEFT(@Details,8)='Open Bal' AND @Type='SI') )
			SET @IRRStartDate = @DATE

		 -- Pickup the Last Sale Recipt date
		 IF (@Type='SR' ) 
				SET @IRREndDate = @DATE
		
		--SET @NET_AMOUNTRunningTotal = @NET_AMOUNTRunningTotal + @NET_AMOUNT;
		INSERT @st(CurrentValuation,CurrentLTV, [ACCOUNT_REF], [CompanyNumber], [CBFL_ID], [NAME], [Date], [NET_AMOUNT], [GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE], 
			[ANALYSIS_1], [ANALYSIS_2], [ANALYSIS_3],  [Staff_ID], [dteDate], [SumNET_AMOUNT],[SumGROSS_AMOUNT],[UseInLTV], Deleted_Flag)
		SELECT @CurrentValuation
		, CASE WHEN (@GROSS_AMOUNTRunningTotal/@CurrentValuation)> 0 THEN (@GROSS_AMOUNTRunningTotal/@CurrentValuation)  ELSE 0 END As CurrentLTV
		,@ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
		@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @SumNET_AMOUNT, @GROSS_AMOUNTRunningTotal, @UseInLTV, @Deleted_Flag;
			
		FETCH NEXT FROM c 
			INTO @CurrentValuation,@ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
					@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @UseInLTV, @Deleted_Flag;
	END
	CLOSE c;
	DEALLOCATE c;

		SELECT @IRR = Dawn_Data.wct.XIRR(cf_amt, cf_date, 0.2)
		FROM 
		(
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Type]='SP' OR [Type]='SR' OR [Type]='SA') AND Deleted_Flag=0
				UNION ALL
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Details]='Opening Balance' AND [Type]='SC')	AND Deleted_Flag=0
				UNION ALL
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE (LEFT([Details],8)='Open Bal' AND [Type]='SC') AND Deleted_Flag=0
				UNION ALL
			SELECT @BrokerTrailFeeCash,CONVERT(VARCHAR(10),@MaturityDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_OUT_Projected,CONVERT(VARCHAR(10),@MaturityDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_IN_Projected,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_flat,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
		)	n	(cf_amt, cf_date);

		SELECT TOP 1 @IRRFantasyRedeemed= ROUND([SumGROSS_AMOUNT], 0) FROM @st ORDER BY  [Date] DESC, CompanyNumber DESC, Tran_number DESC;

		SELECT @IRRFantasy = Dawn_Data.wct.XIRR(cf_amt, cf_date, 0.2)
		FROM (
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Type]='SP' OR [Type]='SR' OR [Type]='SA') AND Deleted_Flag=0
				UNION ALL
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Details]='Opening Balance' AND [Type]='SC') AND Deleted_Flag=0	
				UNION ALL
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE (LEFT([Details],8)='Open Bal' AND [Type]='SC') AND Deleted_Flag=0
				UNION ALL
				-- Produce a Fantasy IRR. Imagine if they paid back the full amount on maturity date.
				SELECT -1 * @IRRFantasyRedeemed, @RedeemedDate AS [MM/DD/YYYY]  
				FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID  
				UNION ALL  -- Use projected
				SELECT @BrokerTrailFeeCash,CONVERT(VARCHAR(10),@RedeemedDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_OUT_Projected,CONVERT(VARCHAR(10),@RedeemedDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_IN_Projected,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_flat,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
		)	n	(cf_amt, cf_date);
		
		SELECT	[CompanyNumber], [CBFL_ID], [NAME], [Date], [GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE] 
		FROM @st 
		ORDER BY  [Date], CompanyNumber, Tran_number;
END
GO
/****** Object:  StoredProcedure [Finance].[TransactionTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Finance].[TransactionTypeGet] as begin
	set nocount on

	select
	 t.TransactionTypeid
	,t.NonCash
	,t.Cash
	,case	when tt.transaction_type is null then cf.CashflowTypeDescription
			when cf.CashflowTypeDescription is null then tt.transaction_type
			else ''
			end
	--,tt.transaction_type
	--,cf.CashflowTypeDescription
	from		Dawn_Data.[Finance].[TransactionType]		t
	left join	Dawn_Data.[LoanCalc].[TransactionType]	tt	on	tt.transaction_id	=	fkTransaction_id
	left join	Dawn_Data.[LoanCalc].[Cashflowtype]		cf	on	cf.CashFlowType_id	=	fkCashFlowType_id
	order by
	case	when tt.transaction_type is null then cf.CashflowTypeDescription
			when cf.CashflowTypeDescription is null then tt.transaction_type
			else ''
	end
end

GO
/****** Object:  StoredProcedure [Finance].[WaterfallAllocationAmountDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Finance].[WaterfallAllocationAmountDel] 	
	@WaterfallAllocationId INT
AS
DELETE FROM Dawn_Data.[Finance].[WaterfallAllocationAmount] 
WHERE FkWaterfallAllocationId = @WaterfallAllocationId;

GO
/****** Object:  StoredProcedure [Finance].[WaterfallAllocationAmountGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Finance].[WaterfallAllocationAmountGet]
	@WaterfallAllocationId INT = NULL

AS BEGIN 
	SET NOCOUNT ON;

	SELECT 
		[WaterfallAllocationAmountId],
		[FkWaterfallAllocationId] AS WaterfallAllocationId,
		[FkWaterfallAllocationAmountTypeId] AS AmountType,
		[Amount],
		[Created],
		[CreatedBy]
	FROM [Dawn_Data].[Finance].[WaterfallAllocationAmount] waa
	WHERE (@WaterfallAllocationId IS NULL OR waa.FkWaterfallAllocationId = @WaterfallAllocationId);

END
GO
/****** Object:  StoredProcedure [Finance].[WaterfallAllocationAmountIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Finance].[WaterfallAllocationAmountIns] 
	@WaterfallAllocationAmountId INT OUTPUT,
	@WaterfallAllocationId INT,
	@AmountType INT,
	@Amount MONEY,
	@Created DATETIME OUTPUT,
	@CreatedBy NVARCHAR(255)
AS

DECLARE @now DATETIME;
SELECT @now = GETDATE();

INSERT INTO Dawn_Data.[Finance].[WaterfallAllocationAmount] 
	(
		[FkWaterfallAllocationId],
		[FkWaterfallAllocationAmountTypeId],
		[Amount],
		[Created],
		[CreatedBy]
	)
VALUES (
		@WaterfallAllocationId,
		@AmountType,
		@Amount,
		@now,
		@CreatedBy
	);

SELECT @WaterfallAllocationId = SCOPE_IDENTITY();
SELECT @Created = @now;
GO
/****** Object:  StoredProcedure [Finance].[WaterfallAllocationDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Finance].[WaterfallAllocationDel]
	@WaterfallAllocationId INT

AS BEGIN 
	SET NOCOUNT ON;

	DELETE FROM [Dawn_Data].[Finance].[WaterfallAllocation]
	WHERE WaterfallAllocationId = @WaterfallAllocationId;

END
GO
/****** Object:  StoredProcedure [Finance].[WaterfallAllocationGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Finance].[WaterfallAllocationGet]
	@LoanId INT = NULL, 
	@TransactionId INT = NULL

AS BEGIN 
	SET NOCOUNT ON;

	SELECT
		[WaterfallAllocationId],
		[FkLoanId] AS LoanId,
		[FkTransactionId] AS TransactionId,		
		[TransactionTime],
		[Created],
		[LastUpdate],
		[LastUpdateBy]
	FROM [Dawn_Data].[Finance].[WaterfallAllocation] wa
	WHERE 
		(@LoanId IS NULL OR (wa.FkLoanId = @LoanId)) AND
		(@TransactionId IS NULL OR (wa.FkTransactionId = @TransactionId));

END
GO
/****** Object:  StoredProcedure [Finance].[WaterfallAllocationInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Finance].[WaterfallAllocationInsUpd]
	@WaterfallAllocationId INT OUTPUT,
	@LoanId INT,
	@TransactionId INT,	
	@TransactionTime VARCHAR(2),
	@Created DATETIME OUTPUT,
	@LastUpdate DATETIME OUTPUT,
	@LastUpdateBy NVARCHAR(255),
	@RowCount INT OUTPUT
AS

DECLARE @Now DATETIME;
SELECT @Now = GETDATE();

IF EXISTS (SELECT * FROM Dawn_Data.Finance.WaterfallAllocation WHERE WaterfallAllocationId = @WaterfallAllocationId)
	BEGIN
		UPDATE Dawn_Data.Finance.WaterfallAllocation
		SET			
			TransactionTime = @TransactionTime,
			LastUpdate = @Now,
			LastUpdateBy = @LastUpdateBy
		WHERE WaterfallAllocationId = @WaterfallAllocationId AND LastUpdate = @LastUpdate;
		
		SELECT @RowCount = @@ROWCOUNT;	
		SELECT @LastUpdate = @now; 

	END
ELSE
	BEGIN			

		INSERT INTO Dawn_Data.[Finance].[WaterfallAllocation]
				   ([FkLoanId]
				   ,[FkTransactionId]				   
				   ,[TransactionTime]
				   ,[Created]
				   ,[LastUpdate]
				   ,[LastUpdateBy])
			 VALUES
				   (@LoanId,
					@TransactionId,					
					@TransactionTime,
					@Now,
					@Now,
					@LastUpdateBy);

		SELECT @RowCount = @@ROWCOUNT;	
		SELECT @WaterfallAllocationId = SCOPE_IDENTITY();
		SELECT @Created = @now;
		SELECT @LastUpdate = @now;
		
	END


GO
/****** Object:  StoredProcedure [LetterTemplate].[GetLetterTemplateFields]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [LetterTemplate].[GetLetterTemplateFields] 
AS
BEGIN
	set nocount on
	SELECT * FROM Dawn_Data.Reference.[DocumentTemplateField] where templateid>0 order by templateid , Id
END

GO
/****** Object:  StoredProcedure [LetterTemplate].[GetLetterTemplates]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------------------------------------------------------------------------------------------
-- bulk letters
-----------------------------------------------------------------------------------------------------------------------------

CREATE PROCEDURE [LetterTemplate].[GetLetterTemplates] 
AS
BEGIN
	--PJR aug 2017 Bulk letters
	set nocount on
	--SELECT * FROM  Dawn_Data.[Reference].[DocumentTemplate] 
	select	distinct
			 t.DocumentTemplateId		as Id
			,t.[Filename]				as [Name]
			,bu.BusinessUnitDescription	as	Department
			,s.StyleDescription
			,t.[DocumentPath]			as	Location
			,''							as	OutputPath
		from Dawn_Data.[Reference].[DocumentTemplate] t
		inner join Dawn_Data.[Reference].DocumentTemplateBusinessUnit bu	on	bu.DocumentTemplateBusinessUnitId = t.fkDocumentTemplateBusinessUnitId
		inner join Dawn_Data.[Reference].DocumentTemplateStyle		 s	on	s.DocumentTemplateStyleId = t.fkDocumentTemplateStyleId

	where	t.isActive=1 and bu.IsActive=1
END
GO
/****** Object:  StoredProcedure [Loan].[AddressActiveUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[AddressActiveUpd]
	@AddressId Int,
	@ContactId Int,
	@LegalEntityId Int,
	@IsActive bit,
	@User NVarChar(255)
AS

SET NOCOUNT ON

IF (@ContactId > 0)
	UPDATE Dawn_Data.Loan.AddressOfContact
	SET IsActive = @IsActive,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE FkContactId = @ContactId
	  AND FkAddressId = @AddressId
ELSE
	UPDATE Dawn_Data.Loan.AddressOfLegalEntity
	SET IsActive = @IsActive,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE FkLegalEntityId = @LegalEntityId
	  AND FkAddressId = @AddressId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[AddressGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[AddressGet]
	@AddressId Int,
	@ContactId Int,
	@LegalEntityId Int
AS

SET NOCOUNT ON

IF (@ContactId > 0)
	SELECT 
		AddressId,
		@ContactId As ContactId,
		@LegalEntityId As LegalEntityId,
		AddrLn1,
		AddrLn2,
		AddrLn3,
		AddrLn4,
		PostCode,
		County,
		Notes,
		FkISOCountry As CountryId,
		IsPrimary, 
		c.IsActive
	FROM Dawn_Data.Loan.Address a
	JOIN Dawn_Data.Loan.AddressOfContact c ON c.FkAddressId = a.AddressId
	WHERE c.FkContactId = @ContactId
	  AND (@AddressId = 0 OR a.AddressId = @AddressId)
	  AND c.IsActive = 1
ELSE
	SELECT 
		AddressId,
		@ContactId As ContactId,
		@LegalEntityId As LegalEntityId,
		AddrLn1,
		AddrLn2,
		AddrLn3,
		AddrLn4,
		PostCode,
		County,
		Notes,
		FkISOCountry As CountryId,
		IsPrimary, 
		l.IsActive
	FROM Dawn_Data.Loan.Address a
	JOIN Dawn_Data.Loan.AddressOfLegalEntity l ON l.FkAddressId = a.AddressId
	WHERE l.FkLegalEntityId = @LegalEntityId
	  AND (@AddressId = 0 OR a.AddressId = @AddressId)
	  AND l.IsActive = 1

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[AddressHide]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[AddressHide]
	@AddressId Int,
	@ContactId Int,
	@LegalEntityId Int,
	@IsActive bit,
	@User NVarChar(255)
AS

SET NOCOUNT ON

IF (@ContactId > 0)
	UPDATE Dawn_Data.Loan.AddressOfContact
	SET IsActive = @IsActive,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE FkContactId = @ContactId
	  AND FkAddressId = @AddressId
ELSE
	UPDATE Dawn_Data.Loan.AddressOfLegalEntity
	SET IsActive = @IsActive,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE FkLegalEntityId = @LegalEntityId
	  AND FkAddressId = @AddressId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[AddressInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[AddressInsUpd]
	@AddressId Int,
	@ContactId Int,
	@LegalEntityId Int,
	@AddrLn1 NVarChar(255),
	@AddrLn2 NVarChar(255),
	@AddrLn3 NVarChar(255),
	@AddrLn4 NVarChar(255),
	@PostCode NVarChar(32),
	@County NVarChar(128),
	@CountryId Int,
	@Notes NVarChar(max),
	@User NVarChar(255)
AS

SET NOCOUNT ON

IF (@AddressId = 0)
	BEGIN
		INSERT INTO Dawn_Data.Loan.Address(AddrLn1, AddrLn2, AddrLn3, AddrLn4, PostCode, County, FkIsoCountry, Notes, IsActive, Created, CreatedBy, LastUpdate, LastUpdateBy)
		SELECT @AddrLn1, @AddrLn2, @AddrLn3, @AddrLn4, @PostCode, @County, @CountryId, @Notes, 1, GETDATE(), @User, GETDATE(), @User

		SELECT @AddressId = SCOPE_IDENTITY()

		IF (@ContactId > 0)
			INSERT INTO Dawn_Data.Loan.AddressOfContact(FkAddressId, FkContactId, IsPrimary, IsActive, Created, CreatedBy, LastUpdate, LastUpdateBy)
			SELECT @AddressId, @ContactId, 1, 1, GETDATE(), @User, GETDATE(), @User
		ELSE
			INSERT INTO Dawn_Data.Loan.AddressOfLegalEntity(FkAddressId, FkLegalEntityId, IsPrimary, IsActive, Created, CreatedBy, LastUpdate, LastUpdateBy)
			SELECT @AddressId, @LegalEntityId, 1, 1, GETDATE(), @user, GETDATE(), @User
	END
ELSE
	UPDATE Dawn_Data.Loan.Address
		SET AddrLn1 = @AddrLn1,
			AddrLn2 = @AddrLn2,
			AddrLn3 = @AddrLn3,
			AddrLn4 = @AddrLn4,
			PostCode = @PostCode,
			County = @County,
			FkISOCountry = @CountryId,
			Notes = @Notes
	WHERE AddressId = @AddressId

SELECT @AddressId As AddressId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[BorrowerAuthorisationUpSert]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[BorrowerAuthorisationUpSert]	@FundRequestId Int,	@BA varchar(max)
as begin
	set nocount on
	--BA += ba.AuthorisationSent + "|" + ba.SecurityId + "|" + ba.CreatedBy + "|" + ba.CreatedDate.ToString() + "~~";

	if exists(select * from Dawn_Data.[Loan].[FundRequestBorrowerAuthorisation] where fkFundRequestId=@FundRequestId)
		delete Dawn_Data.[Loan].[FundRequestBorrowerAuthorisation] where fkFundRequestId=@FundRequestId

	declare @i int, @AuthSep varchar(16), @RowSep varchar(16), @AuthString varchar(max);	select @AuthSep='~~',@RowSep='|',@i=0
	
	declare @BorroAuth table(AuthSent datetime,AuthRecvd datetime,CreatedDate datetime,createdBy varchar(32),FkContactId int)

	select  * into #BA from dbo.fn_split(@BA,@AuthSep)
	delete #BA where ltrim(isnull(value,''))=''

	select @i = min(idx) from #BA

	while @i is not null begin

		select @AuthString = Value from #BA where idx=@i

		insert @BorroAuth(AuthSent,AuthRecvd, FkContactId,createdBy,CreatedDate)
			values (
			 convert(datetime,(select value from dbo.fn_split(@AuthString,@RowSep) where idx=0))
			,convert(datetime,(select value from dbo.fn_split(@AuthString,@RowSep) where idx=1))
			,convert(int,(select value from dbo.fn_split(@AuthString,@RowSep) where idx=2))
			,(select value from dbo.fn_split(@AuthString,@RowSep) where idx=3)
			,getdate()
			)
		select @i = min(idx) from #BA where idx>@i
	end

	delete @BorroAuth where FkContactId is null

	if exists(select * from @BorroAuth)
		insert Dawn_Data.[Loan].[FundRequestBorrowerAuthorisation] (fkFundRequestId,AuthorisationSent ,AuthorisationReceived,created,fkContactId,CreatedBy)
			select  @FundRequestId , AuthSent ,AuthRecvd, createddate , FkContactId , createdBy  from @BorroAuth
end
GO
/****** Object:  StoredProcedure [Loan].[BorrowerPrimarySecurityTypeByLoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--drop proc [Loan].[BorrowerPrimarySecurityTypeGetByLoan]

CREATE  proc [Loan].[BorrowerPrimarySecurityTypeByLoanGet]  @LoanId int
as begin 
	set nocount on


	if exists(select * from Dawn_Data.Loan.Loan where Loan_Id = @LoanId and CBFL_id not like 'M1001%')
		select l.loan_id LoanID, c.CaseReference , m.security_id SecurityId, s.security_name SecurityDescription ,Primarypropertytype PrimarySecurityType
		from		Dawn_Data_staging.Weblabs.[case]	c
		inner join	Dawn_Data.loan.loan			l	on l.cbfl_id	=	c.CaseReference
		inner join	Dawn_Data.loan.SecurityMap	m	on	m.loan_id	=	l.loan_id
		inner join	Dawn_Data.Loan.[Security]	s	on	s.security_id = m.security_id
		where primaryaddress like '%' + s.security_name + '%' and l.loan_id = @LoanId
	else
		select l.loan_id LoanID, c.CaseReference , m.security_id SecurityId, s.security_name SecurityDescription ,Primarypropertytype PrimarySecurityType
		from		Dawn_Data_staging.DPR_Dw.[case]	c
		inner join	Dawn_Data.loan.loan			l	on l.cbfl_id	=	c.CaseReference
		inner join	Dawn_Data.loan.SecurityMap	m	on	m.loan_id	=	l.loan_id
		inner join	Dawn_Data.Loan.[Security]	s	on	s.security_id = m.security_id
		where primaryaddress like '%' + s.security_name + '%' and l.loan_id = @LoanId
end
GO
/****** Object:  StoredProcedure [Loan].[BorrowerSecurityByLoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[BorrowerSecurityByLoanGet]
	@LoanId  INT,
	@SecurityId  INT,
	@ShowHidden  BIT
AS
BEGIN
	/*	v		who		when		what
		1.00	AK		15'			init, includes some nice ansi '89 joins! how quaint.
		1.01	DVM		17'			DIM-116': Modified: DVM:  Adding 'SecuritySubTypeId' & 'SecurityTenureId'
		1.02	PJR		19.2.18		add security type + a little tidy
*/

	set nocount on

	SELECT	sm.loan_id								AS LoanId,
			s.security_id							AS SecurityId,
			s.security_name							AS SecurityName,
			s.security_description					AS SecurityDescription,
			replace(s.address_1,char(39),'\'+char(39)) AS Address1, 
			s.address_2								AS Address2,
			s.address_3								AS Address3,
			s.address_4								AS Address4,
			s.county								AS County,
			s.country								AS CountryId,
			c.country_name							AS Country,
			s.post_code								AS PostCode,
			s.lat									AS Latitude,
			s.long									AS Longditude,
			s.TitleOfSecurity,
			sm.second_charge,
			sm.isPrimary							AS	IsPrimary,
			sm.onStatement							AS	OnStatement,
			sm.isActive								AS	IsActive,

			SecSubType.SecuritySubTypeId			AS	SecuritySubTypeId,
			SecSubType.SecuritySubType				AS	SecuritySubTypeName,

			SecTenure.SecurityTenureId				AS	SecurityTenureId,
			SecTenure.SecurityTenure				AS	SecurityTenureName,

			st.security_type_id						AS	SecurityTypeId,
			st.security_types						AS	SecurityTypeName

		FROM		Dawn_Data.Loan.SecurityMap			SM,
					Dawn_Data.Loan.[Security]			S
		LEFT JOIN	Dawn_Data.Reference.Country			C			ON		C.country_id = S.country
		LEFT JOIN	Dawn_Data.Reference.SecurityTenure	SecTenure	ON		SecTenure.SecurityTenureId	= S.FkSecurityTenureId
		LEFT JOIN	Dawn_Data.Reference.SecuritySubType  SecSubType	ON		SecSubType.SecuritySubTypeId= S.FkSecuritySubTypeId
		--PJR v.01
		LEFT JOIN	Dawn_Data.Reference.SecurityType		st			ON		st.Security_Type_Id			= s.FkSecurityTypeId
		WHERE
			sm.security_id = s.security_id AND
			(@LoanId = 0 OR sm.loan_id = @LoanId) AND
			(@SecurityId = 0 OR s.security_id = @SecurityId) AND
			(@ShowHidden = 1 OR sm.IsActive = 1)
		ORDER BY
			sm.IsActive DESC,
			sm.OnStatement DESC,
			sm.IsPrimary DESC ;
END
GO
/****** Object:  StoredProcedure [Loan].[BorrowerSecurityByLoanGet_20171218]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[BorrowerSecurityByLoanGet_20171218]
	@LoanId  INT,
	@SecurityId  INT,
	@ShowHidden  BIT
AS
BEGIN
	-- 'DIM-116': Modified: DVM:  Adding 'SecuritySubTypeId' & 'SecurityTenureId'

	SELECT
			sm.loan_id AS LoanId,
			s.security_id AS SecurityId,
			s.security_name AS SecurityName,
			s.security_description AS SecurityDescription,
			s.address_1 AS Address1,
			s.address_2 AS Address2,
			s.address_3 AS Address3,
			s.address_4 AS Address4,
			s.county AS County,
			s.country AS CountryId,
			c.country_name AS Country,
			s.post_code AS PostCode,
			s.lat AS Latitude,
			s.long AS Longditude,
			sm.isPrimary AS IsPrimary,
			sm.onStatement AS OnStatement,
			sm.isActive AS IsActive,
			SecSubType.SecuritySubTypeId AS SecuritySubTypeId,
			SecSubType.SecuritySubType AS SecuritySubTypeName,
			SecTenure.SecurityTenureId AS SecurityTenureId,
			SecTenure.SecurityTenure AS SecurityTenureName
		FROM
			Dawn_Data.Loan.SecurityMap  SM,
			Dawn_Data.Loan.[Security]  S
				LEFT JOIN
					Dawn_Data.Reference.Country  C
						ON
							C.country_id = S.country
				LEFT JOIN
					Dawn_Data.Reference.SecurityTenure  SecTenure
						ON
							SecTenure.SecurityTenureId = S.FkSecurityTenureId
				LEFT JOIN
					Dawn_Data.Reference.SecuritySubType  SecSubType
						ON
							SecSubType.SecuritySubTypeId = S.FkSecuritySubTypeId
		WHERE
			sm.security_id = s.security_id AND
			(@LoanId = 0 OR sm.loan_id = @LoanId) AND
			(@SecurityId = 0 OR s.security_id = @SecurityId) AND
			(@ShowHidden = 1 OR sm.IsActive = 1)
		ORDER BY
			sm.IsActive DESC,
			sm.OnStatement DESC,
			sm.IsPrimary DESC ;
END

GO
/****** Object:  StoredProcedure [Loan].[BorrowerSecurityInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[BorrowerSecurityInsUpd]	@LoanId  INT,@SecurityId  INT OUTPUT, @SecurityName  NVARCHAR(255), @SecurityDescription  NVARCHAR(255),
												@Address1  NVARCHAR(255),@Address2  NVARCHAR(255),@Address3  NVARCHAR(255),@Address4  NVARCHAR(255),
												@County  NVARCHAR(255),@PostCode  NVARCHAR(10),@CountryId  INT,
												@Longditude  MONEY,@Latitude  MONEY,
												@User  NVARCHAR(255),
												@SecurityTenureId  INT
												,@SecurityTypeId  INT, @SecuritySubTypeId  INT,
												@TitleOfSecurity varchar(255)
as begin
	/*	v		who	when	what
		1.00	AK	15'		init
		1.01	DVM	17'		DIM-116': Modified: DVM:  Adding 'SecuritySubTypeId' & 'SecurityTenureId'
		1.02	PJR	21.2.18	Added security type & a little tidying
	*/

	set nocount on

	IF EXISTS (SELECT 1 FROM Dawn_Data.Loan.Security  S WHERE S.security_id = @SecurityId)
		BEGIN
			UPDATE Dawn_Data.Loan.Security
				SET	 security_name = @SecurityName,		security_description = @SecurityDescription
					,address_1 = @Address1 ,address_2 = @Address2 ,address_3 = @Address3 ,address_4 = @Address4, county = @County, post_code = @PostCode, country = @CountryId
					,long = @Longditude, lat = @Latitude
					,staff_id			=	@User
					,dteDate			=	GETDATE()
					,FkSecurityTypeId	=	@SecurityTypeId	, FkSecuritySubTypeId=	@SecuritySubTypeId
					,FkSecurityTenureId	=	@SecurityTenureId
					,TitleOfSecurity	=	@TitleOfSecurity
				WHERE
					security_id = @SecurityId
		END
	ELSE
		BEGIN
			INSERT INTO Dawn_Data.Loan.Security
				(
					security_name,	security_description,
					address_1,address_2,address_3,address_4,county,post_code,country,
					long,	lat,
					date_created, time_created,
					staff_id,
					dteDate,
					FkSecurityTypeId,FkSecuritySubTypeId,
					FkSecurityTenureId,
					TitleOfSecurity
				)
				SELECT	@SecurityName
						,@SecurityDescription
						,@Address1,@Address2,@Address3,@Address4,@County,@PostCode,@CountryId
						,@Longditude, @Latitude
						,GETDATE(),GETDATE()
						,@User
						,GETDATE()
						,@SecurityTypeId,@SecuritySubTypeId						
						,@SecurityTenureId
						,@TitleOfSecurity

			SELECT @SecurityId = SCOPE_IDENTITY() ;

			insert into Dawn_Data.Loan.SecurityMap
				(	date_created,	time_created,
					staff_id,
					exit_id,
					security_id,
					loan_id,
					second_charge,
					first_charge_outstanding,	first_charge_valutation,
					isActive
				) SELECT	GETDATE(),
						GETDATE(),
						@User,
						1,
						@SecurityId,
						@LoanId,
						0,
						0,	0,
						1 
		END
	SELECT @SecurityId As Id ;
END
GO
/****** Object:  StoredProcedure [Loan].[BorrowerSecurityInsUpd_20171218]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[BorrowerSecurityInsUpd_20171218]
	@LoanId  INT,
	@SecurityId  INT OUTPUT,
	@SecurityName  NVARCHAR(255),
	@SecurityDescription  NVARCHAR(255),
	@Address1  NVARCHAR(255),
	@Address2  NVARCHAR(255),
	@Address3  NVARCHAR(255),
	@Address4  NVARCHAR(255),
	@County  NVARCHAR(255),
	@PostCode  NVARCHAR(10),
	@CountryId  INT,
	@Longditude  MONEY,
	@Latitude  MONEY,
	@User  NVARCHAR(255),
	@SecurityTenureId  INT,
	@SecuritySubTypeId  INT

AS
BEGIN
	-- 'DIM-116': Modified: DVM:  Adding 'SecuritySubTypeId' & 'SecurityTenureId'

	SET NOCOUNT ON

	IF EXISTS (SELECT 1 FROM Dawn_Data.Loan.Security  S WHERE S.security_id = @SecurityId)
		BEGIN
			UPDATE Dawn_Data.Loan.Security
				SET
					security_name = @SecurityName,
					security_description = @SecurityDescription,
					address_1 = @Address1,
					address_2 = @Address2,
					address_3 = @Address3,
					address_4 = @Address4,
					county = @County,
					post_code = @PostCode,
					country = @CountryId,
					long = @Longditude,
					lat = @Latitude,
					staff_id = @User,
					dteDate = GETDATE(),
					FkSecuritySubTypeId = @SecuritySubTypeId,
					FkSecurityTenureId = @SecurityTenureId
				WHERE
					security_id = @SecurityId ;
		END
	ELSE
		BEGIN
			INSERT INTO Dawn_Data.Loan.Security
				(
					security_name,
					security_description,
					address_1,
					address_2,
					address_3,
					address_4,
					county,
					post_code,
					country,
					long,
					lat,
					date_created,
					time_created,
					staff_id,
					dteDate,
					FkSecuritySubTypeId,
					FkSecurityTenureId
				)
				SELECT
						@SecurityName,
						@SecurityDescription,
						@Address1,
						@Address2,
						@Address3,
						@Address4,
						@County,
						@PostCode,
						@CountryId,
						@Longditude,
						@Latitude,
						GETDATE(),
						GETDATE(),
						@User,
						GETDATE(),
						@SecuritySubTypeId,
						@SecurityTenureId
					;

			SELECT @SecurityId = SCOPE_IDENTITY() ;

			INSERT INTO Dawn_Data.Loan.SecurityMap
				(
					date_created,
					time_created,
					staff_id,
					exit_id,
					security_id,
					loan_id,
					second_charge,
					first_charge_outstanding,
					first_charge_valutation,
					isActive
				)
				SELECT
						GETDATE(),
						GETDATE(),
						@User,
						1,
						@SecurityId,
						@LoanId,
						0,
						0,
						0,
						1 ;

			--SELECT
			--		SM.*
			--	FROM
			--		Dawn_Data.Loan.SecurityMap  SM ;
		END

	SELECT @SecurityId As Id ;
END

GO
/****** Object:  StoredProcedure [Loan].[BorrowerSecurityIsActiveUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[BorrowerSecurityIsActiveUpd]
	@LoanId Int,
	@SecurityId Int,
	@IsActive bit,
	@User NVarChar(255) -- passing user down but no user/last update field on this table, needs adding later
AS

SET NOCOUNT ON

UPDATE Dawn_Data.Loan.SecurityMap
SET isActive = @IsActive
WHERE loan_id = @LoanID
	AND security_id = @SecurityId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[BorrowerSecurityIsPrimaryUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[BorrowerSecurityIsPrimaryUpd]
	@LoanId Int,
	@SecurityId Int,
	@User NVarChar(255) -- passing user down but no user/last update field on this table, needs adding later
AS

SET NOCOUNT ON

UPDATE Dawn_Data.Loan.SecurityMap
SET isPrimary = CASE WHEN security_id = @SecurityId THEN 1 ELSE 0 END
WHERE loan_id = @LoanID

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[BorrowerSecurityMapByLoanSecurityGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[BorrowerSecurityMapByLoanSecurityGet]	@LoanId Int,
															@SecurityId Int
as begin
	SELECT [loan_to_security_id]
		  ,[date_created]
		  ,[time_created]
		  ,[staff_id]
		  ,[exit_id]
		  ,[security_id]
		  ,[loan_id]
		  ,[second_charge]
		  ,[first_charge_outstanding]
		  ,[first_charge_valutation]
		  ,[NotUsedAsSecurity] [NotUsedAsaSecurity]
		  ,[isActive]
		  ,[isPrimary]
		  ,[onStatement]
	  FROM	[Dawn_Data].Loan.[SecurityMap]
	  where loan_id		=	@LoanId
	  and	security_id	=	@SecurityId
end
GO
/****** Object:  StoredProcedure [Loan].[BorrowerSecurityMapUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*

--------------------------------------------------------------------------------------------
Date			User				ChangeDesc
--------------------------------------------------------------------------------------------
2018-11-23		Gurdeep				Added @ShowOnStatement flag


*/

CREATE PROCEDURE [Loan].[BorrowerSecurityMapUpd]
	@LoanId Int,
	@SecurityId Int OUTPUT,
	@Second_charge bit, 
	@ChargeAmount money,
	@First_Charge_Valuation money,
	@NotUsedAsASecurity bit,
	@OnStatement bit =0,
	@User NVarChar(255)
as Begin

	set nocount on

	if exists (select * from Dawn_data.loan.securityMap where security_id = @securityid and loan_id=@LoanId)
	begin

			update Dawn_data.Loan.SecurityMap
				set  second_charge				=@Second_charge
					,first_charge_outstanding	=case when @Second_charge !=0 then @ChargeAmount else 0 end
					--,first_charge_outstanding	=@ChargeAmount
					,[first_charge_valutation]	=0
					,[onStatement] = @OnStatement
					,[NotUsedAsSecurity]		=@NotUsedAsASecurity
					,[staff_id]					=@User
				 where security_id = @securityid and loan_id=@LoanId
	end

end
GO
/****** Object:  StoredProcedure [Loan].[BorrowerSecurityOnStatementUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[BorrowerSecurityOnStatementUpd]
	@LoanId Int,
	@SecurityId Int,
	@OnStatement bit,
	@User NVarChar(255) -- passing user down but no user/last update field on this table, needs adding later
AS

SET NOCOUNT ON

UPDATE Dawn_Data.Loan.SecurityMap
SET onStatement = @OnStatement
WHERE loan_id = @LoanID
	AND security_id = @SecurityId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[BorrrowerAccountDetailsGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [Loan].[BorrrowerAccountDetailsGet] @CaseReference varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	select @rc=-1 , @message=''
	begin try
		select      distinct  
					 l.loan_id				LoanId
					,l.CBFL_id				CaseReference
					,l.completion_date		CompletionDate
					,l.redemption_date		RedemptionDate
					,l.loan_amount			NetAdvance
					,l.facility_date		NetAdvanceDate
					,l.insurance_cost		AmicusInsurance
					,l.CBFL_legals			AmicusLegalFee
					,l.interest_amount		AdvanceInterest
					,l.arrangement_fee_Flat	ArrangementFee
					,l.gross_loan			GrossLoanAmount
					,0						ArrangementFeePoR
		from        Dawn_Data.Loan.ParticipantOfCase	p
		left join	Dawn_Data.Loan.Loan					l	on	l.CBFL_id	=	p.CaseReference
		where p.CaseReference   =     @CaseReference

		select @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
	Rollback

ExitOk:
end

GO
/****** Object:  StoredProcedure [Loan].[BorrrowerDetailGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [Loan].[BorrrowerDetailGet] @CaseReference varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try

		declare @nSecurities smallint

		select @nSecurities = count(*)
		FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
		left join	Dawn_Data.Loan.Loan					l	on	l.CBFL_id	=	p.CaseReference
		left join	Dawn_Data.Loan.SecurityMap			sm	on	sm.loan_id	=	l.loan_id
		left join   Dawn_Data.[Loan].Contact             c	on  c.ContactId     =   p.FkContactId
		left join   Dawn_Data.Loan.LegalEntity           le	on  le.LegalEntityId=	p.FkLegalEntityId
		left join	Dawn_Data.Loan.[Security]			s	on	s.security_id	=	sm.security_id
		where p.CaseReference   =     @CaseReference

		select       distinct
					'NameOfBorrower'  as Id
					,l.CBFL_id		CaseReference
					,l.loan_id		LoanId  
					,case when isnull(le.LegalEntityName,'')!=''
							then le.LegalEntityName 
							else c.[Title] + ' ' +  c.FirstName + ' ' + c.Surname
					end BorrowerValue
					
					,@nSecurities	as	ItemCount
		FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
		left join	Dawn_Data.Loan.Loan					l	on	l.CBFL_id	=	p.CaseReference
		left join	Dawn_Data.Loan.SecurityMap			sm	on	sm.loan_id	=	l.loan_id
		left join   Dawn_Data.[Loan].Contact             c	on  c.ContactId     =   p.FkContactId
		left join   Dawn_Data.Loan.LegalEntity           le	on  le.LegalEntityId=	p.FkLegalEntityId
		left join	Dawn_Data.Loan.[Security]			s	on	s.security_id	=	sm.security_id
		where p.CaseReference   =     @CaseReference

		union
		select		'NameOfBorrower'	as	ID
					,@CaseReference	as CaseReference
					,0 as LoanId
					,'zzzzzzzzz'	as BorrowerValue
					,1 as ItemCount
		union
		select		'NameOfBorrower'	as	ID
					,@CaseReference	as CaseReference
					,0 as LoanId
					,'yyyy'	as BorrowerValue
					,1 as ItemCount

		union

		select       distinct
					'SecurityAddress'  as Id
					,l.CBFL_id		CaseReference
					,l.loan_id		LoanId
					,s.security_name
					+case when s.address_1 is not null and isnull(s.address_1,'')!='' and isnull(s.address_1,'')!=isnull(s.security_name,'') then ',' + s.address_1 else '' end
					+case when s.address_2 is not null and isnull(s.address_2,'')!='' then ',' + s.address_2 else '' end
					+case when s.address_3 is not null and isnull(s.address_3,'')!='' then ',' + s.address_3 else '' end
					+case when s.address_4 is not null and isnull(s.address_4,'')!='' then ',' + s.address_4 else '' end			 
					+case when s.county is not null and isnull(s.county,'')!='' then ',' + s.county else '' end		
					+case when s.post_code is not null and isnull(s.post_code,'')!='' then ',' + s.post_code else '' end	BorrowerValue
					,0 as ItemCount
		FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
		left join	Dawn_Data.Loan.Loan					l	on	l.CBFL_id	=	p.CaseReference
		left join	Dawn_Data.Loan.SecurityMap			sm	on	sm.loan_id	=	l.loan_id
		left join   Dawn_Data.[Loan].Contact             c	on  c.ContactId     =   p.FkContactId
		left join   Dawn_Data.Loan.LegalEntity           le	on  le.LegalEntityId=	p.FkLegalEntityId
		left join	Dawn_Data.Loan.[Security]			s	on	s.security_id	=	sm.security_id
		where p.CaseReference   =     @CaseReference

		union

		select		'AccountNo'	as	ID
					,@CaseReference	as CaseReference
					,0 as LoanId
					,@CaseReference	as BorrowerValue
					,1 as ItemCount

		union

		select       distinct
					'CompletionDate'	as	Id
					,l.CBFL_id			as	CaseReference
					,l.loan_id			as	LoanId
					,convert(varchar,l.completion_date,103)	as	BorrowerValue
					,0 as ItemCount
		FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
		left join	Dawn_Data.Loan.Loan					l	on	l.CBFL_id	=	p.CaseReference
		left join	Dawn_Data.Loan.SecurityMap			sm	on	sm.loan_id	=	l.loan_id
		left join   Dawn_Data.[Loan].Contact             c	on  c.ContactId     =   p.FkContactId
		left join   Dawn_Data.Loan.LegalEntity           le	on  le.LegalEntityId=	p.FkLegalEntityId
		left join	Dawn_Data.Loan.[Security]			s	on	s.security_id	=	sm.security_id
		where p.CaseReference   =     @CaseReference

		union

		select       distinct
					'RedemptionDate'	as	Id
					,l.CBFL_id			as	CaseReference
					,l.loan_id			as	LoanId
					,convert(varchar,isnull(l.redemption_date,'01 jan 1900'),103)	as	BorrowerValue
					,0 as ItemCount
		FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
		left join	Dawn_Data.Loan.Loan					l	on	l.CBFL_id	=	p.CaseReference
		left join	Dawn_Data.Loan.SecurityMap			sm	on	sm.loan_id	=	l.loan_id
		left join   Dawn_Data.[Loan].Contact             c	on  c.ContactId     =   p.FkContactId
		left join   Dawn_Data.Loan.LegalEntity           le	on  le.LegalEntityId=	p.FkLegalEntityId
		left join	Dawn_Data.Loan.[Security]			s	on	s.security_id	=	sm.security_id
		where p.CaseReference   =     @CaseReference


	select @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:
	Rollback

ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[BorrrowerDetailsGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[BorrrowerDetailsGet] @CaseReference varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try

		declare @Contacts table (rid int identity(1,1) primary key,Id varchar(255),CaseReference varchar(255), LoanId int null, BorrowerValue varchar(512), ItemCount int, isPrimary smallint,Surname varchar(255))

		if exists(select * from Dawn_Data.[Loan].[ParticipantOfCase] where CaseReference=@CaseReference and FkLegalEntityId!=0
		and FKParticipantTypeId in (select ParticipantId from Dawn_Data.loan.ParticipantType where ParticipantType='borrower'))
		/*l.ent*/
				insert @Contacts(Id,CaseReference,LoanId,BorrowerValue,ItemCount,isPrimary,Surname)
				select       distinct
							'NameOfBorrower'  as Id
							,p.CaseReference
							,p.FkLoanId LoanId
							,le.LegalEntityName
							,0	as	ItemCount
							,isnull(p.IsPrimary,0) isPrimary
							,'' as Surname
				FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
				left join   Dawn_Data.Loan.LegalEntity			le	on  le.LegalEntityId=	p.FkLegalEntityId
				where		p.CaseReference=@CaseReference
					and		p.IsActive		= 1
					and		p.FKParticipantTypeId in (select ParticipantId from Dawn_Data.loan.ParticipantType where ParticipantType='borrower')
					and		le.IsActive		= 1
				order by isnull(p.IsPrimary,0)
		else
		/*1-n borro not l.ent */
				insert @Contacts(Id,CaseReference,LoanId,BorrowerValue,ItemCount,isPrimary,Surname)
				select       distinct
							'NameOfBorrower'  as Id
							,p.CaseReference
							,p.FkLoanId LoanId
							,replace(isnull(c.[Title],''),' ','') + ' ' + isnull(c.FirstName,'') + ' ' + replace(isnull(c.Surname,''),' ','')  BorrowerValue
							,0	as	ItemCount
							,isnull(p.IsPrimary,0) isPrimary
							,replace(isnull(c.Surname,''),' ','') Surname
				FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
				left join   Dawn_Data.[Loan].Contact             c	on  c.ContactId   = p.FkContactId
				where p.CaseReference=@CaseReference
					and p.IsActive = 1
					and p.FKParticipantTypeId in (select ParticipantId from Dawn_Data.loan.ParticipantType where ParticipantType='borrower')
					and c.IsActive=1
				order by isnull(p.IsPrimary,0) , replace(isnull(c.Surname,''),' ','')

		select	Id,CaseReference,LoanId,BorrowerValue from @Contacts

		set @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:
	--Rollback

ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[BorrrowerDetailsSearch]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[BorrrowerDetailsSearch] @Searchtext varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try

		select       distinct
					--'NameOfBorrower'  as Id
					l.CBFL_id		CaseReference
					,l.loan_id		LoanId  
					,case when isnull(le.LegalEntityName,'')!=''
							then le.LegalEntityName 
							else ''--c.[Title] + ' ' +  c.FirstName + ' ' + c.Surname
					end BorrowerValue
					,c.[Title] + ' ' +  c.FirstName + ' ' + c.Surname
							BorrowerName
					
					
		FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
		left join	Dawn_Data.Loan.Loan					l	on	l.CBFL_id	=	p.CaseReference
		left join	Dawn_Data.Loan.SecurityMap			sm	on	sm.loan_id	=	l.loan_id
		left join   Dawn_Data.[Loan].Contact             c	on  c.ContactId     =   p.FkContactId
		left join   Dawn_Data.Loan.LegalEntity           le	on  le.LegalEntityId=	p.FkLegalEntityId
		left join	Dawn_Data.Loan.[Security]			s	on	s.security_id	=	sm.security_id
		where       (c.FirstName LIKE('%' + @Searchtext + '%')  OR 
					 c.Surname  LIKE('%' + @Searchtext + '%')   OR  
					 l.CBFL_id LIKE('%' + @Searchtext + '%') OR
					 le.LegalEntityName LIKE('%' + @Searchtext + '%')  
					 )
					 AND (NOT l.CBFL_id  IS NULL)
					and p.FKParticipantTypeId in (select ParticipantId from Dawn_Data.[Loan].ParticipantType where ParticipantType='borrower')
		ORDER BY BorrowerName
	select @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:
	Rollback

ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[BorrrowerSecurityGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[BorrrowerSecurityGet] @CaseReference varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin

	/*get statement address of security

	2015		PJR		v1.0
	2017.12.4	PJR		v1.1	modified output format, keep space in pcode.
	*/

	set nocount on
	select @rc=-1 , @message=''

	begin try

		declare	@inSecAddr table(rid int 
					,Id				varchar(255)					,LoanId			int					,CaseReference	varchar(255)					,security_name	varchar(255)
					,address_1		varchar(255)					,address_2		varchar(255)		,address_3		varchar(255)					,address_4		varchar(255)
					,county			varchar(255)					,postcode		varchar(255)		,FullAddress	varchar(2048)					,itemCount		int	default 0
					)

		declare	@outSecAddr table(rid int
					,Id				varchar(255)	,LoanId		int			,CaseReference	varchar(255)
					,FullAddress	varchar(2048)	,itemCount	int	default 0
					)

		insert	@inSecAddr(rid, Id,CaseReference,LoanId,security_name,address_1,address_2,address_3,address_4,county,postcode,FullAddress
		)
		select       ROW_NUMBER() over (order by isnull(s.security_name,'') , isnull(s.post_code,''))
					,'SecurityAddress'	as Id
					,l.CBFL_id			as	CaseReference
					,l.Loan_Id
					,s.security_name
					,isnull(s.address_1,''),isnull(s.address_2,''),isnull(s.address_3,''),isnull(s.address_4,''),isnull(s.county,''),isnull(s.post_code,'')
					,''
		from        Dawn_Data.Loan.Loan				l				
		left join	Dawn_Data.Loan.SecurityMap		sm	on	sm.loan_id	=	l.loan_id
		left join	Dawn_Data.Loan.[Security]		s	on	s.security_id	=	sm.security_id
		where l.cbfl_id   =     @CaseReference
			and isnull(sm.isActive,0)	 = 1
			and isnull(sm.onStatement,0) = 1

--select * from @inSecAddr

		declare	 @LoanId		int					,@maxPageWidth	tinyint
				,@i				int					,@j				int
				,@k				int
				,@FullAddress	varchar(2048)			,@outFullAddress varchar(2048)
				,@dl			smallint				,@rid			int
				,@lastsep		smallint				,@AddrLineNo	tinyint
				,@AddrLine		varchar(1024)			,@wc			int
				,@word			varchar(1024)
				,@pc				varchar(1024)

		set @maxPageWidth=80

		create table #Address(idx int,Value varchar(1024))
		create table #word(idx int,Value varchar(1024))

		select @i=min(rid)  , @j=1  ,@k=1 from @inSecAddr
		while @i is not null begin

			select	 @FullAddress	=	 case when isnull(address_1,'')!='' then		ltrim(rtrim(isnull(address_1,'')))	else '' end

										+case when isnull(address_2,'')!='' then 
											case when substring(reverse(ltrim(rtrim(isnull(address_1,'')))),1,1) = ',' then '' else case when isnumeric(address_1)=1 then ' ' else ',' end end 
											+  ltrim(rtrim(isnull(address_2,'')))	else '' end

										+case when isnull(address_3,'')!='' then
											case when substring(reverse(ltrim(rtrim(isnull(address_2,'')))),1,1) = ',' then '' else case when isnumeric(address_2)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(address_3,'')))	else '' end

										+case when isnull(address_4,'')!='' then 
											case when substring(reverse(ltrim(rtrim(isnull(address_3,'')))),1,1) = ',' then '' else case when isnumeric(address_3)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(address_4,'')))	else '' end

										+case when isnull(county,'')   !='' then
											case when substring(reverse(ltrim(rtrim(isnull(address_4,'')))),1,1) = ',' then '' else case when isnumeric(address_4)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(county,'')))		else '' end

										+case when isnull(postcode,'')!=''  then case when substring(reverse(ltrim(rtrim(isnull(county,'')))),1,1) = ','	then '' else ',' end 

										+  replace(ltrim(rtrim(isnull(postcode,''))),' ','~~')	else '' end

					,@pc		=	isnull(postcode,'')
					,@LoanId	=	LoanId
					,@rid		=	rid
			 from @inSecAddr where rid=@i

			select @FullAddress=replace(replace(replace(replace(ltrim(@FullAddress),',',', '),':',''),';',''),',,',',')
			select @outfulladdress='' , @lastsep=0 , @dl = datalength(@FullAddress)

			if @dl >= @maxPageWidth begin	 /*multiline addr*/

				delete #word
				insert #word (idx,value) select idx,value from fn_Split(@fulladdress,' ')

				select @j=0 , @wc=max(idx) from #word

				while @j<=@wc begin

					select @word = ltrim(value) from #word where idx = @j

					if datalength(@outFullAddress + ' ' + @word) <= @maxPageWidth
						set @outFullAddress = @outFullAddress + ' ' + @word
					else 
						begin
							insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
								select @k,'SecurityAddress',@LoanId,@CaseReference,ltrim(@outFullAddress),0

							select @outFullAddress = @word , @k = @k+1
						end 

					set @j=@j+1
				end

				if @outFullAddress!='' begin
					insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
						select @k,'SecurityAddress',@LoanId,@CaseReference,@outFullAddress,0
					set @k = @k+1
				end

				if @i>= @k
					set @i=9999

				select @outFullAddress='',@FullAddress=''

			end	 /*multiline addr*/

			else begin /*single line*/
				insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
					select @k,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0
				select @FullAddress='', @k=@k+1
			end
				
			select @i=min(rid) from @inSecAddr where rid>@i
		end

		if @FullAddress!=''
			insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
				select @k,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0

		delete @outSecAddr where ltrim(rtrim(isnull(FullAddress,'')))=''

		update @outSecAddr set ItemCount=(select count(distinct FullAddress)  from @outSecAddr)
		update @outSecAddr set FullAddress=replace(FullAddress,'~',' ')

		select Id,CaseReference,LoanId,BorrowerValue,Itemcount
			from	(	select       distinct
									'SecurityAddress'	as Id
									,a.CaseReference
									,a.LoanId
									,a.FullAddress		as	BorrowerValue
									,ItemCount
									,rid
						from        @outSecAddr	a	) s
			order by rid

		select @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:
	--Rollback

ExitOk:

end
GO
/****** Object:  StoredProcedure [Loan].[BorrrowerSecurityGet_20171218]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[BorrrowerSecurityGet_20171218] @CaseReference varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin

	/*get statement address of security

	2015		PJR		v1.0
	2017.12.4	PJR		v1.1	modified output format, keep space in pcode.
	*/

	set nocount on
	select @rc=-1 , @message=''

	begin try

		declare	@inSecAddr table(rid int 
					,Id				varchar(255)					,LoanId			int					,CaseReference	varchar(255)					,security_name	varchar(255)
					,address_1		varchar(255)					,address_2		varchar(255)		,address_3		varchar(255)					,address_4		varchar(255)
					,county			varchar(255)					,postcode		varchar(255)		,FullAddress	varchar(2048)					,itemCount		int	default 0
					)

		declare	@outSecAddr table(rid int
					,Id				varchar(255)	,LoanId		int			,CaseReference	varchar(255)
					,FullAddress	varchar(2048)	,itemCount	int	default 0
					)

		insert	@inSecAddr(rid, Id,CaseReference,LoanId,security_name,address_1,address_2,address_3,address_4,county,postcode,FullAddress
		)
		select       ROW_NUMBER() over (order by isnull(s.security_name,'') , isnull(s.post_code,''))
					,'SecurityAddress'	as Id
					,l.CBFL_id			as	CaseReference
					,l.Loan_Id
					,s.security_name
					,isnull(s.address_1,''),isnull(s.address_2,''),isnull(s.address_3,''),isnull(s.address_4,''),isnull(s.county,''),isnull(s.post_code,'')
					,''
		from        Dawn_Data.Loan.Loan				l				
		left join	Dawn_Data.Loan.SecurityMap		sm	on	sm.loan_id	=	l.loan_id
		left join	Dawn_Data.Loan.[Security]		s	on	s.security_id	=	sm.security_id
		where l.cbfl_id   =     @CaseReference
			and isnull(sm.isActive,0)	 = 1
			and isnull(sm.onStatement,0) = 1

--select * from @inSecAddr

		declare	 @LoanId		int					,@maxPageWidth	tinyint
				,@i				int					,@j				int
				,@k				int
				,@FullAddress	varchar(2048)			,@outFullAddress varchar(2048)
				,@dl			smallint				,@rid			int
				,@lastsep		smallint				,@AddrLineNo	tinyint
				,@AddrLine		varchar(1024)			,@wc			int
				,@word			varchar(1024)
				,@pc				varchar(1024)

		set @maxPageWidth=80

		create table #Address(idx int,Value varchar(1024))
		create table #word(idx int,Value varchar(1024))

		select @i=min(rid)  , @j=1  ,@k=1 from @inSecAddr
		while @i is not null begin

			select	 @FullAddress	=	 case when isnull(address_1,'')!='' then		ltrim(rtrim(isnull(address_1,'')))	else '' end

										+case when isnull(address_2,'')!='' then 
											case when substring(reverse(ltrim(rtrim(isnull(address_1,'')))),1,1) = ',' then '' else case when isnumeric(address_1)=1 then ' ' else ',' end end 
											+  ltrim(rtrim(isnull(address_2,'')))	else '' end

										+case when isnull(address_3,'')!='' then
											case when substring(reverse(ltrim(rtrim(isnull(address_2,'')))),1,1) = ',' then '' else case when isnumeric(address_2)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(address_3,'')))	else '' end

										+case when isnull(address_4,'')!='' then 
											case when substring(reverse(ltrim(rtrim(isnull(address_3,'')))),1,1) = ',' then '' else case when isnumeric(address_3)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(address_4,'')))	else '' end

										+case when isnull(county,'')   !='' then
											case when substring(reverse(ltrim(rtrim(isnull(address_4,'')))),1,1) = ',' then '' else case when isnumeric(address_4)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(county,'')))		else '' end

										+case when isnull(postcode,'')!=''  then case when substring(reverse(ltrim(rtrim(isnull(county,'')))),1,1) = ','	then '' else ',' end 

										+  replace(ltrim(rtrim(isnull(postcode,''))),' ','~~')	else '' end

					,@pc		=	isnull(postcode,'')
					,@LoanId	=	LoanId
					,@rid		=	rid
			 from @inSecAddr where rid=@i

			select @FullAddress=replace(replace(replace(replace(ltrim(@FullAddress),',',', '),':',''),';',''),',,',',')
			select @outfulladdress='' , @lastsep=0 , @dl = datalength(@FullAddress)

			if @dl >= @maxPageWidth begin	 /*multiline addr*/

				delete #word
				insert #word (idx,value) select idx,value from fn_Split(@fulladdress,' ')

				select @j=0 , @wc=max(idx) from #word

				while @j<=@wc begin

					select @word = ltrim(value) from #word where idx = @j

					if datalength(@outFullAddress + ' ' + @word) <= @maxPageWidth
						set @outFullAddress = @outFullAddress + ' ' + @word
					else 
						begin
							insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
								select @k,'SecurityAddress',@LoanId,@CaseReference,ltrim(@outFullAddress),0

							select @outFullAddress = @word , @k = @k+1
						end 

					set @j=@j+1
				end

				if @outFullAddress!='' begin
					insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
						select @k,'SecurityAddress',@LoanId,@CaseReference,@outFullAddress,0
					set @k = @k+1
				end

				if @i>= @k
					set @i=9999

				select @outFullAddress='',@FullAddress=''

			end	 /*multiline addr*/

			else begin /*single line*/
				insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
					select @k,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0
				select @FullAddress='', @k=@k+1
			end
				
			select @i=min(rid) from @inSecAddr where rid>@i
		end

		if @FullAddress!=''
			insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
				select @k,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0

		delete @outSecAddr where ltrim(rtrim(isnull(FullAddress,'')))=''

		update @outSecAddr set ItemCount=(select count(distinct FullAddress)  from @outSecAddr)
		update @outSecAddr set FullAddress=replace(FullAddress,'~',' ')

		select Id,CaseReference,LoanId,BorrowerValue,Itemcount
			from	(	select       distinct
									'SecurityAddress'	as Id
									,a.CaseReference
									,a.LoanId
									,a.FullAddress		as	BorrowerValue
									,ItemCount
									,rid
						from        @outSecAddr	a	) s
			order by rid

		select @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:
	--Rollback

ExitOk:

end
GO
/****** Object:  StoredProcedure [Loan].[BorrrowerSecurityGet_v1]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Loan].[BorrrowerSecurityGet_v1] @CaseReference varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try

		declare	@inSecAddr table(rid int 
					,Id				varchar(255)					,LoanId			int					,CaseReference	varchar(255)					,security_name	varchar(255)
					,address_1		varchar(255)					,address_2		varchar(255)		,address_3		varchar(255)					,address_4		varchar(255)
					,county			varchar(255)					,postcode		varchar(255)		,FullAddress	varchar(2048)					,itemCount		int	default 0
					)

		declare	@outSecAddr table(rid int 
					,Id				varchar(255)	,LoanId		int			,CaseReference	varchar(255)
					,FullAddress	varchar(2048)	,itemCount	int	default 0
					)

		insert	@inSecAddr(rid, Id,CaseReference,LoanId,security_name,address_1,address_2,address_3,address_4,county,postcode,FullAddress
		)
		select       ROW_NUMBER() over (order by isnull(s.security_name,'') , isnull(s.post_code,''))
					,'SecurityAddress'	as Id
					,l.CBFL_id			as	CaseReference
					,l.Loan_Id
					,s.security_name
					,isnull(s.address_1,''),isnull(s.address_2,''),isnull(s.address_3,''),isnull(s.address_4,''),isnull(s.county,''),isnull(s.post_code,'')
					,''
		from        Dawn_Data.Loan.Loan				l				
		left join	Dawn_Data.Loan.SecurityMap		sm	on	sm.loan_id	=	l.loan_id
		left join	Dawn_Data.Loan.[Security]		s	on	s.security_id	=	sm.security_id
		where l.cbfl_id   =     @CaseReference
			and case when isnull(sm.isActive,0)=1 then isnull(sm.isActive,0) else 0 end = 1
			and case when isnull(sm.onStatement,0)= 1 then  isnull(sm.onStatement,0) else 0 end =1

		declare	@maxPageWidth	tinyint
				,@i				int
				,@j				int
				,@k				int
				,@FullAddress	varchar(2048)
				,@dl			smallint
				,@LoanId		int
				,@rid			int
				,@outFullAddress varchar(2048)
				,@lastsep		smallint
				,@AddrLineNo	tinyint
				,@AddrLine		varchar(1024)
				,@wc			int
				,@word			varchar(1024)

		set @maxPageWidth=70

		create table #Address(idx int,Value varchar(1024))
		create table #word(idx int,Value varchar(1024))
		select @i=min(rid)  , @j=1 from @inSecAddr

		while @i is not null begin
			select	 @FullAddress	=	rtrim(isnull(security_name,''))
										+case when isnull(address_1,'')!='' then ',' + rtrim(isnull(address_1,'')) else '' end
										+case when isnull(address_2,'')!='' then ',' + rtrim(isnull(address_2,'')) else '' end
										+case when isnull(address_3,'')!='' then ',' + rtrim(isnull(address_3,'')) else '' end
										+case when isnull(address_4,'')!='' then ',' + rtrim(isnull(address_4,'')) else '' end
										+case when isnull(county,'')!='' then ',' + rtrim(isnull(county,'')) else '' end
										+case when isnull(postcode,'')!=''  then ',' + rtrim(isnull(postcode,'')) else '' end
					,@LoanId	=	LoanId
					,@rid		=	rid
			 from @inSecAddr where rid=@i

			 /*de-dupe address line elements
			 */
			 delete #Address
			 insert #Address(idx,value) select idx,value from fn_Split(@FullAddress,',')
			 delete #Address where isnull(Value,'') =''
			 select @FullAddress='' , @AddrLineNo=min(idx) from #Address
			 while @AddrLineNo is not null begin
				select @AddrLine=value from #Address where idx=@AddrLineNo 
				if charindex(@AddrLine,@FullAddress)=0
					set @FullAddress = @FullAddress + case when @FullAddress != '' then ',' else '' end + @AddrLine
				select @AddrLineNo=min(idx) from #Address where idx>@AddrLineNo
			 end

			select @FullAddress=ltrim(replace(@FullAddress,',',', '))

--select	 '>'+@FullAddress+'<'
 
			select @outfulladdress='' , @lastsep=0 , @dl = datalength(@FullAddress)

			if @dl >= @maxPageWidth begin	 /*multiline addr*/
				delete #word
				insert #word (idx,value) select idx,value from fn_Split(@fulladdress,' ')
				select @j=0 , @wc=max(idx) from #word

				while @j<=@wc begin

					select @word = ltrim(value) from #word where idx=@j
					if datalength(@outFullAddress+ ' '+@word)<=@maxPageWidth
						set @outFullAddress = @outFullAddress + ' ' + @word
					else 
						begin
							insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
								select @j,'SecurityAddress',@LoanId,@CaseReference,@outFullAddress,0

							set @outFullAddress = @word
						end 

					set @j=@j+1
				end
				if @outFullAddress!=''
					insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
						select @j,'SecurityAddress',@LoanId,@CaseReference,@outFullAddress,0

--select * from @outSecAddr

				if @i>= @k
					select @i=9999
					
				select @outFullAddress='',@FullAddress=''

			end	 /*multiline addr*/

			else begin /*single line*/
				insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
					select @j,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0
				set @FullAddress=''
			end
				
			select @i=min(rid) from @inSecAddr where rid>@i
		end

		if @FullAddress!=''
			insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
				select @j,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0

/*
		select       distinct
					'SecurityAddress'  as Id
					,l.CBFL_id		CaseReference
					,l.loan_id		LoanId
					,s.security_name
					+case when isnull(s.address_1,'')!='' and isnull(s.address_1,'')!=isnull(s.security_name,'') then ',' + s.address_1 else '' end
					+case when isnull(s.address_2,'')!='' then ',' + s.address_2 else '' end
					+case when isnull(s.address_3,'')!='' then ',' + s.address_3 else '' end
					+case when isnull(s.address_4,'')!='' then ',' + s.address_4 else '' end			 
					+case when isnull(s.county,'')!='' then ',' + s.county else '' end		
					+case when isnull(s.post_code,'')!='' then ',' + s.post_code else '' end	BorrowerValue
					,0 as ItemCount
		FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
		left join	Dawn_Data.Loan.Loan					l	on	l.CBFL_id	=	p.CaseReference
		left join	Dawn_Data.Loan.SecurityMap			sm	on	sm.loan_id	=	l.loan_id
		left join	Dawn_Data.Loan.[Security]			s	on	s.security_id	=	sm.security_id
		where p.CaseReference   =     @CaseReference
		and case when sm.isActive is not null then sm.isActive else 1 end = 1
*/
	delete @outSecAddr where ltrim(rtrim(isnull(FullAddress,'')))=''

	update @outSecAddr set ItemCount=(select count(distinct FullAddress)  from @outSecAddr)

	--select * from @outSecAddr

	select Id,CaseReference,LoanId,BorrowerValue,Itemcount
	from
		(
		select       distinct
					'SecurityAddress'	as Id
					,a.CaseReference
					,a.LoanId
					,a.FullAddress		as	BorrowerValue
					,ItemCount
					,rid
		FROM        @outSecAddr	a
		) s
		order by rid

	select @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:
	--Rollback

ExitOk:
end

GO
/****** Object:  StoredProcedure [Loan].[BorrrowerSecurityGet_xx]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[BorrrowerSecurityGet_xx] @CaseReference varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try

		declare	@inSecAddr table(rid int 
					,Id				varchar(255)					,LoanId			int					,CaseReference	varchar(255)					,security_name	varchar(255)
					,address_1		varchar(255)					,address_2		varchar(255)		,address_3		varchar(255)					,address_4		varchar(255)
					,county			varchar(255)					,postcode		varchar(255)		,FullAddress	varchar(2048)					,itemCount		int	default 0
					)

		declare	@outSecAddr table(rid int
					,Id				varchar(255)	,LoanId		int			,CaseReference	varchar(255)
					,FullAddress	varchar(2048)	,itemCount	int	default 0
					)

		insert	@inSecAddr(rid, Id,CaseReference,LoanId,security_name,address_1,address_2,address_3,address_4,county,postcode,FullAddress
		)
		select       ROW_NUMBER() over (order by isnull(s.security_name,'') , isnull(s.post_code,''))
					,'SecurityAddress'	as Id
					,l.CBFL_id			as	CaseReference
					,l.Loan_Id
					,s.security_name
					,isnull(s.address_1,''),isnull(s.address_2,''),isnull(s.address_3,''),isnull(s.address_4,''),isnull(s.county,''),isnull(s.post_code,'')
					,''
		from        Dawn_Data.Loan.Loan				l				
		left join	Dawn_Data.Loan.SecurityMap		sm	on	sm.loan_id	=	l.loan_id
		left join	Dawn_Data.Loan.[Security]		s	on	s.security_id	=	sm.security_id
		where l.cbfl_id   =     @CaseReference
			and isnull(sm.isActive,0)	 = 1
			and isnull(sm.onStatement,0) = 1

--select * from @inSecAddr

		declare	 @LoanId		int					,@maxPageWidth	tinyint
				,@i				int					,@j				int
				,@k				int
				,@FullAddress	varchar(2048)			,@outFullAddress varchar(2048)
				,@dl			smallint				,@rid			int
				,@lastsep		smallint				,@AddrLineNo	tinyint
				,@AddrLine		varchar(1024)			,@wc			int
				,@word			varchar(1024)
				,@pc				varchar(1024)

		set @maxPageWidth=80

		create table #Address(idx int,Value varchar(1024))
		create table #word(idx int,Value varchar(1024))

		select @i=min(rid)  , @j=1  ,@k=1 from @inSecAddr
		while @i is not null begin

			select	 @FullAddress	=	 case when isnull(address_1,'')!='' then		ltrim(rtrim(isnull(address_1,'')))	else '' end

										+case when isnull(address_2,'')!='' then 
											case when substring(reverse(ltrim(rtrim(isnull(address_1,'')))),1,1) = ',' then '' else case when isnumeric(address_1)=1 then ' ' else ',' end end 
											+  ltrim(rtrim(isnull(address_2,'')))	else '' end

										+case when isnull(address_3,'')!='' then
											case when substring(reverse(ltrim(rtrim(isnull(address_2,'')))),1,1) = ',' then '' else case when isnumeric(address_2)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(address_3,'')))	else '' end

										+case when isnull(address_4,'')!='' then 
											case when substring(reverse(ltrim(rtrim(isnull(address_3,'')))),1,1) = ',' then '' else case when isnumeric(address_3)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(address_4,'')))	else '' end

										+case when isnull(county,'')   !='' then
											case when substring(reverse(ltrim(rtrim(isnull(address_4,'')))),1,1) = ',' then '' else case when isnumeric(address_4)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(county,'')))		else '' end

										+case when isnull(postcode,'')!=''  then case when substring(reverse(ltrim(rtrim(isnull(county,'')))),1,1) = ','	then '' else ',' end 

										+  replace(ltrim(rtrim(isnull(postcode,''))),' ','~~')	else '' end

					,@pc		=	isnull(postcode,'')
					,@LoanId	=	LoanId
					,@rid		=	rid
			 from @inSecAddr where rid=@i

			select @FullAddress=replace(replace(replace(replace(ltrim(@FullAddress),',',', '),':',''),';',''),',,',',')
			select @outfulladdress='' , @lastsep=0 , @dl = datalength(@FullAddress)

			if @dl >= @maxPageWidth begin	 /*multiline addr*/

				delete #word
				insert #word (idx,value) select idx,value from fn_Split(@fulladdress,' ')

				select @j=0 , @wc=max(idx) from #word

				while @j<=@wc begin

					select @word = ltrim(value) from #word where idx = @j

					if datalength(@outFullAddress + ' ' + @word) <= @maxPageWidth
						set @outFullAddress = @outFullAddress + ' ' + @word
					else 
						begin
							insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
								select @k,'SecurityAddress',@LoanId,@CaseReference,ltrim(@outFullAddress),0

							select @outFullAddress = @word , @k = @k+1
						end 

					set @j=@j+1
				end

				if @outFullAddress!='' begin
					insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
						select @k,'SecurityAddress',@LoanId,@CaseReference,@outFullAddress,0
					set @k = @k+1
				end

				if @i>= @k
					set @i=9999

				select @outFullAddress='',@FullAddress=''

			end	 /*multiline addr*/

			else begin /*single line*/
				insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
					select @k,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0
				select @FullAddress='', @k=@k+1
			end
				
			select @i=min(rid) from @inSecAddr where rid>@i
		end

		if @FullAddress!=''
			insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount)
				select @k,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0

		delete @outSecAddr where ltrim(rtrim(isnull(FullAddress,'')))=''

		update @outSecAddr set ItemCount=(select count(distinct FullAddress)  from @outSecAddr)
		update @outSecAddr set FullAddress=replace(FullAddress,'~',' ')

		select Id,CaseReference,LoanId,BorrowerValue,Itemcount
			from	(	select       distinct
									'SecurityAddress'	as Id
									,a.CaseReference
									,a.LoanId
									,a.FullAddress		as	BorrowerValue
									,ItemCount
									,rid
						from        @outSecAddr	a	) s
			order by rid

		select @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:
	--Rollback

ExitOk:

end
GO
/****** Object:  StoredProcedure [Loan].[BorrrowerSecurityGet_xxx]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[BorrrowerSecurityGet_xxx] @CaseReference varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin

	/*get statement address of security

	2015		PJR		v1.0
	2017.12.4	PJR		v1.1	modified output format, keep space in pcode.
	*/

	set nocount on
	select @rc=-1 , @message=''

	begin try

		declare	@inSecAddr table(rid int 
					,Id				varchar(255)					,LoanId			int					,CaseReference	varchar(255)					,security_name	varchar(255)
					,address_1		varchar(255)					,address_2		varchar(255)		,address_3		varchar(255)					,address_4		varchar(255)
					,county			varchar(255)					,postcode		varchar(255)		,FullAddress	varchar(2048)					,itemCount		int	default 0
					,isPrimary		int default 0
					)

		declare	@outSecAddr table(rid int
					,Id				varchar(255)	,LoanId		int			,CaseReference	varchar(255)
					,FullAddress	varchar(2048)	,itemCount	int	default 0,isPrimary int default 0
					)

		insert	@inSecAddr(rid, Id,CaseReference,LoanId,security_name,address_1,address_2,address_3,address_4,county,postcode,FullAddress,isPrimary)
		select       ROW_NUMBER() over (order by isnull(s.security_name,'') , isnull(s.post_code,''))
					,'SecurityAddress'	as Id
					,l.CBFL_id			as	CaseReference
					,l.Loan_Id
					,s.security_name
					,isnull(s.address_1,''),isnull(s.address_2,''),isnull(s.address_3,''),isnull(s.address_4,''),isnull(s.county,''),isnull(s.post_code,'')
					,''
					,sm.isPrimary
		from        Dawn_Data.Loan.Loan				l				
		left join	Dawn_Data.Loan.SecurityMap		sm	on	sm.loan_id	=	l.loan_id
		left join	Dawn_Data.Loan.[Security]		s	on	s.security_id	=	sm.security_id
		where l.cbfl_id   =     @CaseReference
			and isnull(sm.isActive,0)	 = 1
			and isnull(sm.onStatement,0) = 1

--select * from @inSecAddr

		declare	 @LoanId		int					,@maxPageWidth	tinyint
				,@i				int					,@j				int
				,@k				int
				,@FullAddress	varchar(2048)			,@outFullAddress varchar(2048)
				,@dl			smallint				,@rid			int
				,@lastsep		smallint				,@AddrLineNo	tinyint
				,@AddrLine		varchar(1024)			,@wc			int
				,@word			varchar(1024)
				,@pc				varchar(1024)
				,@isPrimary		int

		set @maxPageWidth=80

		create table #Address(idx int,Value varchar(1024))
		create table #word(idx int,Value varchar(1024))

		select @i=min(rid)  , @j=1  ,@k=1 from @inSecAddr
		while @i is not null begin

			select	 @FullAddress	=	 case when isnull(address_1,'')!='' then		ltrim(rtrim(isnull(address_1,'')))	else '' end

										+case when isnull(address_2,'')!='' then 
											case when substring(reverse(ltrim(rtrim(isnull(address_1,'')))),1,1) = ',' then '' else case when isnumeric(address_1)=1 then ' ' else ',' end end 
											+  ltrim(rtrim(isnull(address_2,'')))	else '' end

										+case when isnull(address_3,'')!='' then
											case when substring(reverse(ltrim(rtrim(isnull(address_2,'')))),1,1) = ',' then '' else case when isnumeric(address_2)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(address_3,'')))	else '' end

										+case when isnull(address_4,'')!='' then 
											case when substring(reverse(ltrim(rtrim(isnull(address_3,'')))),1,1) = ',' then '' else case when isnumeric(address_3)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(address_4,'')))	else '' end

										+case when isnull(county,'')   !='' then
											case when substring(reverse(ltrim(rtrim(isnull(address_4,'')))),1,1) = ',' then '' else case when isnumeric(address_4)=1 then ' ' else ',' end end
											+  ltrim(rtrim(isnull(county,'')))		else '' end

										+case when isnull(postcode,'')!=''  then case when substring(reverse(ltrim(rtrim(isnull(county,'')))),1,1) = ','	then '' else ',' end 

										+  replace(ltrim(rtrim(isnull(postcode,''))),' ','~~')	else '' end

					,@pc		=	isnull(postcode,'')
					,@LoanId	=	LoanId
					,@rid		=	rid
					,@isPrimary =	isPrimary
			 from @inSecAddr where rid=@i

			select @FullAddress=replace(replace(replace(replace(ltrim(@FullAddress),',',', '),':',''),';',''),',,',',')
			select @outfulladdress='' , @lastsep=0 , @dl = datalength(@FullAddress)

			if @dl >= @maxPageWidth begin	 /*multiline addr*/

				delete #word
				insert #word (idx,value) select idx,value from fn_Split(@fulladdress,' ')

				select @j=0 , @wc=max(idx) from #word

				while @j<=@wc begin

					select @word = ltrim(value) from #word where idx = @j

					if datalength(@outFullAddress + ' ' + @word) <= @maxPageWidth
						set @outFullAddress = @outFullAddress + ' ' + @word
					else 
						begin
							insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount,isPrimary)
								select @k,'SecurityAddress',@LoanId,@CaseReference,ltrim(@outFullAddress),0,@isPrimary

							select @outFullAddress = @word , @k = @k+1
						end 

					set @j=@j+1
				end

				if @outFullAddress!='' begin
					insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount,isPrimary)
						select @k,'SecurityAddress',@LoanId,@CaseReference,@outFullAddress,0,@isPrimary
					set @k = @k+1
				end

				if @i>= @k
					set @i=9999

				select @outFullAddress='',@FullAddress=''

			end	 /*multiline addr*/

			else begin /*single line*/
				insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount,isPrimary)
					select @k,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0,@isPrimary
				select @FullAddress='', @k=@k+1
			end
				
			select @i=min(rid) from @inSecAddr where rid>@i
		end

		if @FullAddress!=''
			insert @outSecAddr(rid,Id,LoanId,CaseReference,FullAddress,itemCount,isPrimary)
				select @k,'SecurityAddress',@LoanId,@CaseReference,@FullAddress,0,@isPrimary

		delete @outSecAddr where ltrim(rtrim(isnull(FullAddress,'')))=''

		update @outSecAddr set ItemCount=(select count(distinct FullAddress)  from @outSecAddr)
		update @outSecAddr set FullAddress=replace(FullAddress,'~',' ')

		select Id,CaseReference,LoanId,BorrowerValue,Itemcount
			from	(	select       distinct
									'SecurityAddress'	as Id
									,a.CaseReference
									,a.LoanId
									,a.FullAddress		as	BorrowerValue
									,ItemCount
									,rid
									,isPrimary
						from        @outSecAddr	a	) s
			order by isPrimary desc,rid

		select @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:
	--Rollback

ExitOk:

end

GO
/****** Object:  StoredProcedure [Loan].[CaseCalendarGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[CaseCalendarGet]
	@LoanId Int,
	@ResourceId Int
AS

BEGIN

	DECLARE @Resources VarChar(max)

	SELECT EventId, LoanId, ev.EventTypeId, StartTime, EndTime, Subject, Description, EventNotes, 
		Resource = (SELECT TOP 1 Description 
			FROM Dawn_Data.Loan.EventResources xer, Dawn_Data.Loan.ResourceTypes ert 
			WHERE ev.EventTypeId = xer.EventTypeId 
			  AND xer.ResourceTypeId = ert.ResourceTypeId)
	FROM Dawn_Data.Loan.Event ev, Dawn_Data.Loan.EventResources er
	WHERE ev.EventTypeId = er.EventTypeId
	  AND (@ResourceId = 0 OR er.ResourceTypeId = @ResourceId)
	  AND (@LoanId = 0 OR ev.LoanId = @LoanId)
END

GO
/****** Object:  StoredProcedure [Loan].[CaseDrawdownGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc  [Loan].[CaseDrawdownGet]	@SearchText varchar(255) , @Status int, @OrderBy int, @WorkStationId int
--declare @SearchText varchar(255) , @Status int, @OrderBy int, @WorkStationId int
--s-elect @SearchText='anthat' , @Status=1, @OrderBy=2, @WorkStationId=1

as begin

		set nocount on

		select 
			l.loan_id																								as	LoanId
			,l.CBFL_id																								as	CaseReference
			,ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId)										as	ContactRowNumber
			,ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id)									as	SecurityRowNumber
			,COALESCE(c.Title, '') + case when COALESCE(c.Title, '')<>'' then ' ' else '' end + COALESCE(c.FirstName, '')  + case when COALESCE(c.FirstName, '')<>'' then ' ' else '' end + COALESCE(c.Surname, '')				as	PrimaryContactName
			,isnull(s.address_1,'') + case when isnull(s.address_2,'') <>'' then ',' else '' end +
				isnull(s.address_2,'') + case when isnull(s.address_3,'') <>'' then ',' else '' end +
				isnull(s.address_3,'') + case when isnull(s.address_4,'') <>'' then ',' else '' end +
				isnull(s.address_4,'') + case when isnull(s.County,'') <>'' then ',' else '' end +
				isnull(s.post_code,'')																				as	[Address]
			,lc.FKParticipantTypeId

			--,(select value from dbo.fn_split(l.Productnames,' ') where idx=0)										as	ProductCode
			,p.ProductCode																							as	ProductCode		

			,(select count(*) from  Dawn_Data.Loan.FundRequest where FkLoanId = l.loan_id AND Fundsreleased=0 AND isnull(FkStatusId,0)!=3 AND isnull(FkStatusId,0)!=8)	as	CurrentDrawDowns
			,h.checked

			,isnull((
				select top 1 s.[Description]
					from		Dawn_Data.Loan.FundRequest				f
					left join	Dawn_Data.Reference.FundRequestStatus	s		on	s.FundRequestStatusId		=	f.fkStatusId
						where FkLoanId = l.loan_id --AND Fundsreleased=0 
						 AND	isnull(FkStatusId,0)!=3
						 --AND	isnull(FkStatusId,0)!=8
					order by FundsReleased
			 ),'') CurrentStatus

		into #TempLoanDetails
		from		Dawn_Data.Loan.Loan					l
		inner join  Dawn_Data.Loan.History				h	on	h.DIM_loan_id_SSK	=	l.Loan_ID
		left join	Dawn_Data.Loan.ParticipantOfCase		lc	on	l.loan_id			=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
		left join	Dawn_Data.Loan.Contact				c	on	lc.FkContactId		=	c.ContactId
		left join	Dawn_Data.Loan.SecurityMap			sm	on	l.loan_id			=	sm.loan_id
		left join	Dawn_Data.Loan.[Security]			s	on	sm.security_id		=	s.security_id
		left join	Dawn_Data.[Loan].[vwAllCaseProducts]	p	on	p.CaseReference		=	l.CBFL_id
		where lc.fkcontactid<>0  and lc.isActive = 1 
				and (
					(COALESCE(l.CBFL_id, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(c.FirstName, '') + ' ' + COALESCE(c.MiddleName, '') + ' ' + COALESCE(c.Surname, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(s.address_1, '') + ' ' + COALESCE(s.address_2, '') + ' ' + COALESCE(s.address_3, '') + ' ' + COALESCE(s.address_4, '')
						+ ' ' + COALESCE(s.county, '') + ' ' + COALESCE(s.post_code, '') LIKE '%' + @SearchText + '%')
				)
		
				and	l.redeemed_date is null

			union

		select 
			l.loan_id																								as	LoanId
			,l.CBFL_id																								as	CaseReference
			,ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId)										as	ContactRowNumber
			,ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id)									as	SecurityRowNumber
			--,COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '')				as	PrimaryContactName
			,COALESCE(c.Title, '') + case when COALESCE(c.Title, '')<>'' then ' ' else '' end + COALESCE(c.FirstName, '')  + case when COALESCE(c.FirstName, '')<>'' then ' ' else '' end 
			+ COALESCE(c.Surname, '')				as	PrimaryContactName


			,isnull(s.address_1,'') + case when isnull(s.address_2,'') <>'' then ',' else '' end +
				isnull(s.address_2,'') + case when isnull(s.address_3,'') <>'' then ',' else '' end +
				isnull(s.address_3,'') + case when isnull(s.address_4,'') <>'' then ',' else '' end +
				isnull(s.address_4,'') + case when isnull(s.County,'') <>'' then ',' else '' end +
				isnull(s.post_code,'')																				as	[Address]
			,lc.FKParticipantTypeId

			--,(select value from dbo.fn_split(l.Productnames,' ') where idx=0)										as	ProductCode
			,p.ProductCode																							as	ProductCode		
			
			,(select count(*) from  Dawn_Data.Loan.FundRequest where FkLoanId = l.loan_id AND Fundsreleased=0 AND isnull(FkStatusId,0)!=3)	as	CurrentDrawDowns
			,h.checked
			,isnull((
				select top 1 s.[Description]
				--select *
					from		Dawn_Data.Loan.FundRequest				f
					left join	Dawn_Data.Reference.FundRequestStatus	s		on	s.FundRequestStatusId		=	f.fkStatusId
						where FkLoanId = l.loan_id --AND Fundsreleased=0 
						AND	isnull(FkStatusId,0)!=3
						-- AND	isnull(FkStatusId,0)!=8

				order by FundsReleased
			 ),'') CurrentStatus
--select * from Dawn_Data.Reference.FundRequestStatus
		from		Dawn_Data.Loan.Loan l
		inner join  Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.Loan_ID
		left join	Dawn_Data.Loan.ParticipantOfCase			lc	ON	l.loan_id			=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
		left join	Dawn_Data.[Loan].[ContactOfLegalEntity]	cl	on	cl.fkLegalEntityId	=	lc.fkLegalEntityId
		left join	Dawn_Data.Loan.Contact					c	ON	c.ContactId			=	cl.FkContactId
		left join	Dawn_Data.Loan.SecurityMap				sm	ON	sm.loan_id			=	l.loan_id
		left join	Dawn_Data.Loan.Security					s	ON	s.security_id		=	sm.security_id
		left join	Dawn_Data.[Loan].[vwAllCaseProducts]		p	on	p.CaseReference		=	l.CBFL_id

		WHERE lc.fkcontactid=0 and lc.isActive = 1 
			and (
						(COALESCE(l.CBFL_id, '') LIKE '%' + @SearchText + '%'
						OR COALESCE(c.FirstName, '') + ' ' + COALESCE(c.MiddleName, '') + ' ' + COALESCE(c.Surname, '') LIKE '%' + @SearchText + '%'
						OR COALESCE(s.address_1, '') + ' ' + COALESCE(s.address_2, '') + ' ' + COALESCE(s.address_3, '') + ' ' + COALESCE(s.address_4, '')
							+ ' 
							' + COALESCE(s.county, '') + ' ' + COALESCE(s.post_code, '') LIKE '%' + @SearchText + '%')
					)
			and	l.redeemed_date is null

	delete #TempLoanDetails where ContactRowNumber != 1 --and SecurityRowNumber != 1

	if @Status=2 /*keep those with active dd only*/
		delete #TempLoanDetails where CurrentDrawDowns=0

	select	 LoanId
			,CaseReference
			,PrimaryContactName
			,[Address]
			,isnull(ProductCode,'') ProductCode
 			,CurrentDrawDowns
			,checked
			,CurrentStatus
	from	#TempLoanDetails
	order by
		case when @OrderBy=2 then 
				ProductCode
			else ''
		end
		, CaseReference

end
GO
/****** Object:  StoredProcedure [Loan].[CashflowInterestRateCurrent]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [Loan].[CashflowInterestRateCurrent]
@Loan_id INT, 
@CashflowInterestRate_id INT, 
@cashflowInterest_typeExcluded INT,
@InInterestDate VARCHAR(10), 
@message varchar(255) output, @rc int output, @debug int
as begin
	--20180122. Peter Wegrzyn
	-- Provide @Loan_id and date and return any overlapping interest Ranges and the type of interest applicable at @InterestDate

IF ((@Loan_id IS NULL) AND NOT (@CashflowInterestRate_id IS NULL)) 
 	SELECT @Loan_id =CIR.loan_id FROM [Dawn_Data].LoanCalc.CashflowInterestRate AS CIR WHERE (CIR.CashflowInterestRate_id = @CashflowInterestRate_id) 
--ELSE
--Goto Failed;

--print @Loan_id

				SELECT IntType.CashflowInterestType
				--,datediff(d,CIR.InterestStartDate ,' + @InInterestDate + ') AS InStart
				--,datediff(d,CIR.InterestEndDate ,' + @InInterestDate + ') as InEnd
				,CIR.InterestRate
				,FORMAT( CIR.InterestStartDate, 'd', 'en-gb' ) AS InterestStartDate 
			    ,FORMAT(CIR.InterestEndDate, 'd', 'en-gb')	AS InterestEndDate
				FROM      [Dawn_Data].LoanCalc.CashflowInterestRate AS CIR 
				LEFT OUTER JOIN
				[Dawn_Data].[Reference].[CashflowInterestType] AS IntType ON CIR.cashflowInterest_type = IntType.[CashflowInterestTypeKey]
				WHERE     (CIR.Loan_id= @Loan_id  ) 
				AND 
				(				  
				(datediff(d,CIR.InterestStartDate ,  @InInterestDate  )>=0) AND (datediff(d,CIR.InterestEndDate , @InInterestDate )<=0)
				)
            --group by IntType.CashflowInterestType,CIR.InterestRate

Failed:
end

GO
/****** Object:  StoredProcedure [Loan].[CashflowInterestTypeForLoan]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[CashflowInterestTypeForLoan] @LoanId int
as begin

	set nocount on
	
	select	 isnull(l.CashflowInterestType,'*Unknown*')												Narrative
			,round(convert(decimal(18,4),isnull(i.InterestRateText,0)),4,0)							InterestRate
			,replace(convert(varchar(32),i.InterestStartDate,106),' ','-')							FromDate
			,replace(convert(varchar(32),i.InterestEndDate,106),' ','-')							ToDate
	from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i
	left join	Dawn_Data.Reference.CashflowInterestType		l	on l.CashflowInterestTypeKey	=	i.cashflowInterest_type
	where loan_id=@LoanId
	order by	i.InterestStartDate
	
end
GO
/****** Object:  StoredProcedure [Loan].[CollectionNoteDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[CollectionNoteDel]	@CollectionNoteId int, @ts varchar(25) , @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try
		if exists(select * from Dawn_Data.Report.CollectionNote where CollectionNoteId = @CollectionNoteId)
			begin
				declare @i int ,@LastUpdated varchar(max) , @Note varchar(max) ,@iCount smallint,@NotesOut varchar(max),@NotesIn varchar(max), @xmlNotesIn xml ,@IsUpdated bit

				select @xmlNotesIn = LoanNotes from Dawn_Data.Report.CollectionNote where CollectionNoteId = @CollectionNoteId

				select @i=1,@IsUpdated=0,@icount=@xmlNotesIn.value('count(//Loan/CollectionNote)','int') , @NotesOut = '<Loan>'

				while (@i <= @iCount) begin

					select	 @LastUpdated = @xmlNotesIn.value('((//Loan/CollectionNote/Updated)[sql:variable("@i")])[1]','varchar(25)')
							,@NotesIn = @xmlNotesIn.value('((//Loan/CollectionNote/Note)[sql:variable("@i")])[1]','varchar(25)') 

					if @debug=1 select  @LastUpdated 'current' , @ts 'to delete' ,@xmlNotesIn.value('((//Loan/CollectionNote/Updated)[sql:variable("@i")])[1]','varchar(25)')

					if @LastUpdated != @ts
							select	 @NotesOut = @NotesOut + '<CollectionNote><Updated>' + @LastUpdated + '</Updated><Note>' + @NotesIn + '</Note></CollectionNote>'
					else 
						set @IsUpdated=1

					set @i = @i + 1
				end
				set @NotesOut = @NotesOut + '</Loan>'

				/*write the updated xml
				*/				
				if @IsUpdated=1
					update Dawn_Data.Report.CollectionNote set LoanNotes=convert(xml,@NotesOut) where CollectionNoteId = @CollectionNoteId

				set @rc=0
			end
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:

ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[CollectionNoteGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[CollectionNoteGet]	@LoanId int, @message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try

		select	 cH.CollectionNoteId
				,case when cH.LastUpdate is not null then cH.LastUpdate else cH.Created end LastUpdate
				,cH.LoanNotes
				,case when cH.LastUpdateBy is not null then cH.LastUpdateBy else cH.CreatedBy end LastUpdatedBy
		from	Dawn_Data.Report.CollectionNote	cH
		where	cH.LoanId = @LoanId
		select @rc=0

	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:

ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[CollectionNoteIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[CollectionNoteIns]	@LoanId int, @Note varchar(max), @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try

		insert	Dawn_Data.Loan.LoanNote(fkLoanId,CaseReference,fkSourceId,fkNoteSourceId,fkNotePropertyID,[Note])
			select	 @LoanId 
					,(select CBFL_id			from Dawn_Data.Loan.Loan					where loan_id		=	@LoanId)
					,@LoanId
					,isnull((select NoteSourceID	from Dawn_Data.Reference.NoteSource		where NoteSource	=	'CollectionReport'),0)
					,isnull((select NotePropertyId	from Dawn_Data.Reference.NoteProperty	where NoteProperty	=	'Note'),0)
					,@Note

		set @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[CollectionNoteUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[CollectionNoteUpd]	@CollectionNoteId int, @SourceOfNote varchar(255) , @Note varchar(max), @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try
		if exists(select * from Dawn_Data.Report.CollectionNote where CollectionNoteId = @CollectionNoteId)
			begin

			update Dawn_Data.Report.CollectionNote set Note = @Note  , LastUpdate=getdate() where CollectionNoteId = @CollectionNoteId

				--declare @i int ,@LastUpdated varchar(max) , @Note varchar(max) ,@iCount smallint,@NotesOut varchar(max),@NotesIn varchar(max), @xmlNotesIn xml ,@IsUpdated bit

				--select @xmlNotesIn = LoanNotes from Dawn_Data.Report.CollectionNote where CollectionNoteId = @CollectionNoteId

				--select @i=1,@IsUpdated=0,@icount=@xmlNotesIn.value('count(//Loan/CollectionNote)','int') , @NotesOut = '<Loan>'

				--while (@i <= @iCount) begin
				--	select	 @LastUpdated = @xmlNotesIn.value('((//Loan/CollectionNote/Updated)[sql:variable("@i")])[1]','varchar(25)')
				--			,@NotesIn = @xmlNotesIn.value('((//Loan/CollectionNote/Note)[sql:variable("@i")])[1]','varchar(25)') 
				--	--select 'update' , @LastUpdated , @ts ,  @NotesIn
				--	if @LastUpdated = @ts begin
				--		select @NotesIn = @UpdatedNote , @LastUpdated = convert(varchar(25),getdate(),121) , @IsUpdated=1
				--	end
				--	select	 @NotesOut = @NotesOut + '<CollectionNote><Updated>' + @LastUpdated + '</Updated><Note>' + @NotesIn + '</Note></CollectionNote>'
				--			,@i = @i + 1
				--end
				--set @NotesOut = @NotesOut + '</Loan>'

				--/*write the updated xml
				--*/				
				--if @IsUpdated=1
				--	update Dawn_Data.Report.CollectionNote set LoanNotes=convert(xml,@NotesOut) where CollectionNoteId = @CollectionNoteId

				set @rc=0
			end
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:

ExitOk:
end

GO
/****** Object:  StoredProcedure [Loan].[CommsHide]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[CommsHide]
	@CommsOfContactId Int,
	@IsActive bit,
	@User NVarChar(255)
AS

SET NOCOUNT ON

UPDATE Dawn_Data.Loan.CommsOfContact
SET IsActive = 0,
	LastUpdate = GETDATE(),
	LastUpdateBy = @User
WHERE CommsOfContactId = @CommsOfContactId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[CommsIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[CommsIns]
	@ContactId Int,
	@CommsTypeId Int,
	@CommsValue NVarChar(255),
	@User NVarChar(255)
AS

SET NOCOUNT ON

INSERT INTO Dawn_Data.Loan.CommsOfContact(FkContactId, FkContactOfCompanyId, FkCommsTypeId, CommsValue, IsActive, Created, CreatedBy, LastUpdate, LastUpdateBy)
SELECT @ContactId, 0, @CommsTypeId, @CommsValue, 1, GETDATE(), @User, GETDATE(), @User

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[CommsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[CommsUpd]
	@CommsOfContactId Int,
	@ContactId Int,
	@CommsTypeId Int,
	@CommsValue NVarChar(255),
	@User NVarChar(255)
AS

SET NOCOUNT ON

UPDATE Dawn_Data.Loan.CommsOfContact
SET FkCommsTypeId = @CommsTypeId,
	CommsValue = @CommsValue,
	LastUpdate = GETDATE(),
	LastUpdateBy = @User
WHERE CommsOfContactId = @CommsOfContactId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[ContactActiveUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[ContactActiveUpd]
	@ContactId Int,
	@LoanId Int,
	@LegalEntityId Int,
	@IsActive bit,
	@User NVarChar(255)
AS

SET NOCOUNT ON

IF (@LegalEntityId > 0)
	UPDATE Dawn_Data.Loan.ContactOfLegalEntity
	SET IsActive = @IsActive,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE FkContactId = @ContactId
	  AND FkLegalEntityId = @LegalEntityId
ELSE
	UPDATE Dawn_Data.Loan.ParticipantOfCase
	SET IsActive = @IsActive,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE FkContactId = @ContactId
	  AND FkLoanId = @LoanId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[ContactByLegalEntityGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[ContactByLegalEntityGet]
	@LegalEntityId Int,
	@ShowHidden bit
AS
BEGIN
	-- Modified - 'Loan.ContactGet': 'DIM-56': DVM:  Added the "Date Of Birth" (/'DoB')

	SET NOCOUNT ON

	SELECT 
			cl.ContactOfLegalEntityId,
			c.ContactId,
			c.Title,
			c.FirstName,
			c.MiddleName,
			c.Surname,
			c.DoB AS DateOfBirth,
			(SELECT TOP 1 p.LegalEntityPosition
				FROM Dawn_Data.Loan.PosnOfLegalEntityContact x
				JOIN Dawn_Data.Loan.LegalEntityPosition p ON x.LegalEntityPositionId = p.LegalEntityPositionId 
				WHERE x.FkContactOfLegalEntityId = cl.ContactOfLegalEntityId) As Position,
			(SELECT TOP 1 CommsValue
				FROM Dawn_Data.Loan.CommsOfContact x WHERE x.FkContactId = c.ContactId AND x.FkCommsTypeId = 1) As Email,
			(SELECT TOP 1 CommsValue
				FROM Dawn_Data.Loan.CommsOfContact x WHERE x.FkContactId = c.ContactId AND x.FkCommsTypeId = 2) As Mobile,
			(SELECT TOP 1 CommsValue
				FROM Dawn_Data.Loan.CommsOfContact x WHERE x.FkContactId = c.ContactId AND x.FkCommsTypeId = 3) As Telephone,
			cl.IsActive,
			cl.IsPrimary
		FROM Dawn_Data.Loan.LegalEntity l
		JOIN Dawn_Data.Loan.ContactOfLegalEntity cl ON l.LegalEntityId = cl.FkLegalEntityId
		JOIN Dawn_Data.Loan.Contact c ON cl.FkContactId = c.ContactId
		WHERE LegalEntityId = @LegalEntityId
		  AND (@ShowHidden = 1 OR cl.IsActive = 1)
		ORDER BY cl.IsActive DESC
END

GO
/****** Object:  StoredProcedure [Loan].[ContactGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[ContactGet]
	@ContactId Int
AS
BEGIN
	-- Modified - 'Loan.ContactGet': 'DIM-56': DVM:  Added the "Date Of Birth" (/'DoB')

	SET NOCOUNT ON

	SELECT 
		ContactId,
		Title,
		Surname,
		FirstName,
		MiddleName,
		Initials,
		DoB AS DateOfBirth
	FROM Dawn_Data.Loan.Contact
	WHERE ContactId = @ContactId AND IsActive = 1

	SELECT 
		FkContactId As ContactID,
		CommsOfContactId,
		CommsValue,
		FkCommsTypeId As CommsTypeId,
		CommsType
	FROM Dawn_Data.Loan.CommsOfContact c
	JOIN Dawn_Data.Loan.CommsType t ON c.FkCommsTypeId = t.CommsTypeId
	WHERE FkContactId = @ContactId
	  AND c.IsActive = 1
END

GO
/****** Object:  StoredProcedure [Loan].[ContactHide]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[ContactHide]
	@ContactId Int,
	@LoanId Int,
	@LegalEntityId Int,
	@IsActive bit,
	@User NVarChar(255)
AS

SET NOCOUNT ON

IF (@LegalEntityId > 0)
	UPDATE Dawn_Data.Loan.ContactOfLegalEntity
	SET IsActive = @IsActive,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE FkContactId = @ContactId
	  AND FkLegalEntityId = @LegalEntityId
ELSE
	UPDATE Dawn_Data.Loan.ParticipantOfCase
	SET IsActive = @IsActive,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE FkContactId = @ContactId
	  AND FkLoanId = @LoanId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[ContactInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[ContactInsUpd]
	@ContactId Int,
	@LoanId Int,
	@LegalEntityId Int,
	@Title NVarChar(32),
	@Surname NVarChar(128),
	@FirstName NVarChar(128),
	@MiddleName NVarChar(128),
	@DateOfBirth DateTime,
	@ParticipantTypeId Int,
	@LegalEntityPositionId Int,
	@User NVarChar(255)
AS
BEGIN
	-- Modified - 'Loan.ContactInsUpd': 'DIM-56': DVM:  Added the "Date Of Birth" (/'DoB')

	SET NOCOUNT ON

	IF (@ContactId = 0)
		BEGIN
			INSERT INTO Dawn_Data.Loan.Contact(Title, Surname, FirstName, MiddleName, DoB, FKParticipantTypeId, IsActive, Created, CreatedBy, LastUpdate, LastUpdateBy)
			SELECT @Title, @Surname, @FirstName, @MiddleName, @DateOfBirth, @ParticipantTypeId, 1, GETDATE(), @User, GETDATE(), @User

			SELECT @ContactId = SCOPE_IDENTITY()

			IF (@LegalEntityId > 0)
				BEGIN
					DECLARE @ContactOfLegalEntityId Int

					INSERT INTO Dawn_Data.Loan.ContactOfLegalEntity(FkContactId, FkLegalEntityId, IsPrimary, IsActive, Created, CreatedBy, LastUpdate, LastUpdateBy)
					SELECT @ContactId, @LegalEntityId, 0, 1, GETDATE(), @User, GETDATE(), @User

					SELECT @ContactOfLegalEntityId = SCOPE_IDENTITY()

					INSERT INTO Dawn_Data.Loan.PosnOfLegalEntityContact(FkContactOfLegalEntityId, LegalEntityPositionId, IsPrimary, IsActive, Created, CreatedBy, LastUpdate, LastUpdateBy)
					SELECT @ContactOfLegalEntityId, @LegalEntityPositionId, 1, 1, GETDATE(), @User, GETDATE(), @User
				END
			ELSE IF (@LoanId > 0)
				BEGIN
					INSERT INTO Dawn_Data.Loan.ParticipantOfCase(FkLoanId, FkContactId, FkLegalEntityId, FkParticipantTypeId, CaseReference, IsPrimary, IsActive, OnStatement,
							Created, CreatedBy, LastUpdate, LastUpdateBy)
					SELECT @LoanId, @ContactId, 0, @ParticipantTypeId, CBFL_id, 0, 1, 1, GETDATE(), @User, GETDATE(), @User
					FROM Dawn_Data.Loan.Loan
					WHERE loan_id = @LoanId
				END
		END
	ELSE
		UPDATE Dawn_Data.Loan.Contact
		SET Title = @Title,
			Surname = @Surname,
			FirstName = @FirstName,
			MiddleName = @MiddleName,
			DoB = @DateOfBirth,
			LastUpdate = GETDATE(),
			LastUpdateBy = @User
		WHERE ContactId = @ContactId

	SELECT @ContactId As ContactId
END

GO
/****** Object:  StoredProcedure [Loan].[ContactsByLoanAllGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[ContactsByLoanAllGet]
	@LoanId Int,
	@ParticipantTypeId Int,
	@ShowHidden Bit
AS begin

	set nocount on

	SELECT 
		c.ContactId,
		LTRIM(isnull(c.Title,'') + ' ' +  isnull(c.FirstName,'') + ' ' + isnull(c.Surname,'')) As Name
	FROM Dawn_Data.Loan.ParticipantOfCase p 
	JOIN Dawn_Data.Loan.Contact c ON p.FkContactId = c.ContactId
	WHERE p.FkLoanId = @LoanId
	  AND p.FkParticipantTypeId = case when isnull(@ParticipantTypeId,0)=0 then 1 else @ParticipantTypeId end
	  	 	  AND (@ShowHidden = 1 OR p.IsActive = 1)
	UNION ALL

	SELECT 
		c.ContactId,
		LTRIM(isnull(c.Title,'') + ' ' +  isnull(c.FirstName,'') + ' ' + isnull(c.Surname,'')) --+ ' (c/o ' + l.LegalEntityName + ')')
	FROM Dawn_Data.Loan.ParticipantOfCase p 
	JOIN Dawn_Data.Loan.LegalEntity l ON p.FkLegalEntityId = l.LegalEntityId
	JOIN Dawn_Data.Loan.ContactOfLegalEntity e ON l.LegalEntityId = e.FkLegalEntityId
	JOIN Dawn_Data.Loan.Contact c ON e.FkContactId = c.ContactId
	WHERE p.FkLoanId = @LoanId
	  AND p.FkParticipantTypeId = case when isnull(@ParticipantTypeId,0)=0 then 1 else @ParticipantTypeId end
	  AND (@ShowHidden = 1 OR e.IsActive = 1)
	  --PJR 2017.7.28
	  and p.isactive=1
end
GO
/****** Object:  StoredProcedure [Loan].[ContactsByLoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------------------------------------------------------------------------------------------
-- Active flag fix
-----------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE [Loan].[ContactsByLoanGet]
											@LoanId Int,
											@ParticipantTypeId Int
AS	BEGIN

	/*	Date		Author		Ver		Note
		2015.8		AKeenan		1.0		init
		2016.9.7	PJR			1.1		fix for returning corp clients
		2017.3.14	PJR			1.2		isActive flag added -> contactoflegalentity
		2017.7.28	PJR			1.3		isActive flag added -> participantofcase
	*/
	set nocount on

	if exists(select * from Dawn_Data.Loan.ParticipantOfCase where fkLoanId = @LoanId and fkLegalEntityId=0)

		select lc.FkLoanId As LoanId, c.*
		from		Dawn_Data.Loan.ParticipantOfCase lc
		inner join	Dawn_Data.Loan.Contact			c	on lc.FkContactId = c.ContactId
	
		where lc.FkLoanId = @LoanId
		  and (@ParticipantTypeId = 0 OR lc.FKParticipantTypeId = @ParticipantTypeId)
		  and c.IsActive=1
	else

		select lc.FkLoanId As LoanId, c.*
		from		Dawn_Data.Loan.ParticipantOfCase			lc
		inner join	Dawn_Data.[Loan].[ContactOfLegalEntity]	cl	on	cl.fkLegalEntityId	=	lc.fkLegalEntityId
		inner join	Dawn_Data.Loan.Contact					c	on	cl.FkContactId		=	c.ContactId

		where lc.FkLoanId = @LoanId
		  and (@ParticipantTypeId = 0 OR lc.FKParticipantTypeId = @ParticipantTypeId)
		  and cl.IsActive=1
	  --PJR 2017.7.28
		  and lc.isactive=1

end
GO
/****** Object:  StoredProcedure [Loan].[ContactsWithlegalEntityByLoanAllGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [Loan].[ContactsWithlegalEntityByLoanAllGet]
	@LoanId Int,
	@ParticipantTypeId Int,
	@ShowHidden Bit
AS begin

	set nocount on

	SELECT 
		c.ContactId,
		LTRIM(isnull(c.Title,'') + ' ' +  isnull(c.FirstName,'') + ' ' + isnull(c.Surname,'')) As Name
	FROM Dawn_Data.Loan.ParticipantOfCase p 
	JOIN Dawn_Data.Loan.Contact c ON p.FkContactId = c.ContactId
	WHERE p.FkLoanId = @LoanId
	  AND p.FkParticipantTypeId = case when isnull(@ParticipantTypeId,0)=0 then 1 else @ParticipantTypeId end

	UNION ALL

	SELECT 
		c.ContactId,
		LTRIM(isnull(c.Title,'') + ' ' +  isnull(c.FirstName,'') + ' ' + isnull(c.Surname,'')) + ' (c/o ' + ltrim(l.LegalEntityName) + ')'
	FROM Dawn_Data.Loan.ParticipantOfCase p 
	JOIN Dawn_Data.Loan.LegalEntity l ON p.FkLegalEntityId = l.LegalEntityId
	JOIN Dawn_Data.Loan.ContactOfLegalEntity e ON l.LegalEntityId = e.FkLegalEntityId
	JOIN Dawn_Data.Loan.Contact c ON e.FkContactId = c.ContactId
	WHERE p.FkLoanId = @LoanId
	  AND p.FkParticipantTypeId = case when isnull(@ParticipantTypeId,0)=0 then 1 else @ParticipantTypeId end

end

GO
/****** Object:  StoredProcedure [Loan].[disused_ValuationGet_v1]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[disused_ValuationGet_v1]
	@SecurityId Int, 
	@ValuationId Int
AS Begin

	set nocount on

	SELECT 
		ValuationId,
		ISNULL(FkLoanId, 0) As LoanId,
		ISNULL(FkSecurityId, 0) As SecurityId,
		ApplicantValueEstimate,
		ApplicantGdvEstimate,
		ApplicantValuationFee,
		SurveyorComments,
		ISNULL(FkContactId, 0) As ContactId,
		LTRIM(ISNULL(c.FirstName + ' ' + c.Surname, '')) As ContactName,
		MarketValue,
		NinetyDayValue,
		GrossDevelopmentValue,
		GrossDevelopmentNinetyDayValue,
		RentalValue,
		ReinstatementValue,
		v.Notes,
		DateOfInstruction,
		DateOfInspection,
		DateOfValuation,
		FkValuationStatusId As ValuationStatusId,
		s.Description As ValuationStatus,

		ISNULL(FkLegalEntityId, 0) As LegalEntityId,
		l.LegalEntityName As SurveyorName,
		--ISNULL(ValuerId, 0) As LegalEntityId,
		--l.Valuer As SurveyorName,
		l.LastUpdate,
		l.LastUpdateBy,

		sec.address_1 + 
			CASE WHEN sec.address_2 = '' THEN '' ELSE ', ' + sec.address_2 END +
			CASE WHEN sec.address_3 = '' THEN '' ELSE ', ' + sec.address_3 END +
			CASE WHEN sec.county = '' THEN '' ELSE ', ' + sec.county END +
			CASE WHEN sec.post_code = '' THEN '' ELSE ', ' + sec.post_code END
			As SecurityAddress
	FROM Dawn_Data.Loan.Valuation v
	LEFT OUTER JOIN Dawn_Data.Loan.Contact c ON v.FkContactId = c.ContactId
	LEFT OUTER JOIN Dawn_Data.Loan.LegalEntity l ON v.FkLegalEntityId = l.LegalEntityId

	JOIN Dawn_Data.Reference.ValuationStatus s ON v.FkValuationStatusId = s.ValuationStatusId
	JOIN Dawn_Data.Loan.Security sec ON v.FkSecurityId = sec.security_id
	WHERE (@SecurityId = 0 OR FkSecurityid = @SecurityId)
	  AND (@ValuationId = 0 OR ValuationId = @ValuationId)
	ORDER BY DateOfValuation

end
GO
/****** Object:  StoredProcedure [Loan].[DivisionGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Loan].[DivisionGet] @LoanID int as
begin
	begin try

		declare @DefaultCompanydivision varchar(255); set @DefaultCompanydivision = 'Amicus'

		select @DefaultCompanydivision = isnull(Division,@DefaultCompanydivision)
		from [Dawn_Data].[Loan].History
		where DIM_loan_id_SSK = @LoanId

	end try
	begin catch

		select ''

	end catch

	select @DefaultCompanydivision

end
GO
/****** Object:  StoredProcedure [Loan].[DocumentByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[DocumentByIdGet]
	@DocumentId Int
AS

SELECT 
	docFilePath as FileName, 
	a.docDocument As Document
FROM Dawn_Data.Loan.DocumentAttachment a
WHERE a.tbl_loan_documents_id = @DocumentId

GO
/****** Object:  StoredProcedure [Loan].[DocumentByLoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[DocumentByLoanGet]
	@LoanId Int

as begin

	set nocount on

	SELECT 
		d.ID As DocumentId, 
		d.loan_id As LoanId, 
		d.filetype As FileTypeId, 
		dt.fileType_name As FileTypeName,
		da.docFilePath As FileName,  
		da.dteDate As DocumentDate,
		DATALENGTH(da.docDocument) As DocumentLength
	INTO #TempList
	FROM Dawn_Data.Loan.Document d
	JOIN Dawn_Data.Loan.DocumentAttachment da ON d.ID = da.tbl_loan_documents_id
	JOIN Dawn_Data.Reference.DocumentType dt ON d.filetype = dt.ID
	WHERE loan_id = @LoanId
	 -- AND da.docDocument IS NOT NULL
	ORDER BY d.FileType, dteDate DESC

	SELECT * 
	FROM #TempList
	WHERE DocumentLength IS NOT NULL

end
GO
/****** Object:  StoredProcedure [Loan].[DocumentDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[DocumentDel]	@DocumentId Int
as begin

		set nocount on

		declare @RowsDeleted int

		delete Dawn_Data.Loan.Document where ID = @DocumentId
		set @RowsDeleted=@@rowcount

		delete Dawn_Data.Loan.DocumentAttachment where tbl_loan_documents_id=@DocumentId

		set @RowsDeleted=@@rowcount+@RowsDeleted

		select @RowsDeleted RowsDeleted
end
GO
/****** Object:  StoredProcedure [Loan].[DocumentExists]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[DocumentExists]
	@LoanId Int,
	@FileType NVarChar(255),
	@FileName NVarChar(4000)
AS

SELECT	
	CASE WHEN EXISTS (SELECT TOP 1 *
						FROM Dawn_Data.Loan.Document d
						JOIN Dawn_Data.Loan.DocumentAttachment a ON d.id = a.tbl_loan_documents_id
						JOIN Dawn_Data.Reference.DocumentType dt on d.fileType = dt.id
						WHERE d.loan_id = @LoanId
							AND a.docFilePath = @FileName
							--AND dt.filetype_name = @FileType
							AND dt.id = @FileType
							)
		THEN CONVERT(bit, 1)
		ELSE CONVERT(bit, 0)
	END As DocumentExists

GO
/****** Object:  StoredProcedure [Loan].[DocumentIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[DocumentIns]
	@DocumentId Int OUTPUT,
	@LoanId Int,
	@FileType Int,
	@FileName NVarChar(4000),
	@FileChunk VarBinary(max),
	@User NVarChar(255)
AS begin

	-- Staff_Id is stored with domain prefix some places and without domain prefix in others.
	-- The convention in the tbl_staff table is without prefix, so Aura will do the same
	-- we can fudge it here so the Access calculator still works and then fix it later

	set nocount on

	IF (CHARINDEX('OMN\', @User) = 0)
		SELECT @User = 'OMN\' + @User

	INSERT INTO Dawn_Data.Loan.Document(loan_id, filetype, staff_id)
		SELECT @LoanId, @FileType, @User 

	SELECT @DocumentId = SCOPE_IDENTITY()

	INSERT INTO Dawn_Data.Loan.DocumentAttachment(tbl_loan_documents_id, docFilePath, docDocument, staff_id, docDescription, docSourceFilePath, dteDate)
		SELECT @DocumentId, @FileName, @FileChunk, @User, @FileName, @FileName, GETDATE()

End
GO
/****** Object:  StoredProcedure [Loan].[DocumentUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[DocumentUpd]
	@DocumentId Int,
	@FileChunk VarBinary(max)
AS begin
	set nocount on

	UPDATE Dawn_Data.Loan.DocumentAttachment
	SET docDocument.Write(@FileChunk, null, null)
	WHERE tbl_loan_documents_id = @DocumentId
end
GO
/****** Object:  StoredProcedure [Loan].[ExitStrategyListGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[ExitStrategyListGet]		 @Debug			tinyint	=	0
as begin
	set nocount on
	select	 [ExitStrategyId]
			,[ExitStrategy]
	from	Dawn_Data.Loan.ExitStrategy
	order by DisplayOrder
end
GO
/****** Object:  StoredProcedure [Loan].[FunderListGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[FunderListGet]
as begin
	set nocount on

	declare @f table (DisplayOrder int identity, Funder_Id int,  FunderName varchar(255) )
	
	insert @f (FunderName,Funder_Id) select '*All*' , 0

	insert @f (Funder_Id, FunderName) 
		select Funder_Id		as FunderId
				,funder_name	as	FunderName
		from	Dawn_Data.Loan.funder
		where funder_name<>''
		order by FunderName

	select Funder_Id, FunderName
	from @f
	order by DisplayOrder
end
GO
/****** Object:  StoredProcedure [Loan].[FunderOfLoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [Loan].[FunderOfLoanGet]
AS 
BEGIN
	SET NOCOUNT ON

	SELECT 
		fl.fkLoanId AS LoanId,
		fl.fkFunderId AS FunderId,
		fl.FunderLoanSplitPct AS SplitPct,
		f.funder_name AS FunderName
	FROM [Dawn_Data].Loan.FunderOfLoan fl
	INNER JOIN [Dawn_Data].Loan.Funder f on f.funder_id = fl.fkFunderId
	
END
GO
/****** Object:  StoredProcedure [Loan].[FunderOfLoanIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[FunderOfLoanIns]
							 @LoanId				int
							,@FunderId				int
							,@FunderLoanSplitPct	decimal(18,4)
							,@FunderLoanSplitAmt	decimal(18,4)
							,@UserId				int
							,@message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	select @rc=-1 , @message=''

	begin try

		insert  [Dawn_Data].[Loan].[FunderOfLoan](
				[fkLoanId]
			   ,[fkFunderId]
			   ,[FunderLoanSplitPct]
			   ,[FunderLoanSplitAmt]
			   ,CreatedBy
		) values (
			 @LoanId
			,@FunderId
			,@FunderLoanSplitPct
			,@FunderLoanSplitAmt
			,@UserId
		)
		set @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[FunderOfLoanUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[FunderOfLoanUpd]	 
							 @FunderOfLoanId		int
							,@FunderId				int
							,@FunderLoanSplitPct	decimal(18,4)
							,@FunderLoanSplitAmt	decimal(18,4)
							,@UserId				int
							,@message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try

		update  [Dawn_Data].[Loan].[FunderOfLoan]
				set  [FunderLoanSplitPct]	=	null
					,[FunderLoanSplitAmt]	=	null
					,[Lastupdate]			=	getdate()
					,[LastUpdateBy]			=	@UserId
		where	[FunderOfLoanId] = @FunderOfLoanId


		update  [Dawn_Data].[Loan].[FunderOfLoan]
				set  [fkFunderId]			=	case when @FunderId is not null then @FunderId else [fkFunderId] end

					,[FunderLoanSplitPct]	=	case when @FunderLoanSplitPct is not null then @FunderLoanSplitPct else [FunderLoanSplitPct] end

					,[FunderLoanSplitAmt]	=	case when @FunderLoanSplitAmt is not null then @FunderLoanSplitAmt else [FunderLoanSplitAmt] end
					,[Lastupdate]			=	getdate()
					,[LastUpdateBy]			=	@UserId
		where	[FunderOfLoanId] = @FunderOfLoanId

		set @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[FundRequestBorroAuthGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE  PROCEDURE [Loan].[FundRequestBorroAuthGet]	 @FundRequestId				Int
AS Begin
	set nocount on

	select ba.[FundRequestBorrowerAuthorisationId]
		  ,ba.[FkFundRequestId]
		  ,ba.[FkContactId] ContactId
		  ,ba.authorisationSent
		  ,case when year(ba.AuthorisationReceived)=1900 then null else ba.AuthorisationReceived end AuthorisationReceived
			
			,isnull(c.FirstName,'') + case when isnull(c.FirstName,'') <>'' then ' ' else '' end
			+isnull(c.MiddleName,'') 
			+case when isnull(c.MiddleName,'') <>'' then ' ' else '' end
			+isnull(c.SurName,'') 
			+case when isnull(c.SurName,'') <>'' then ' ' else '' end
			ContactName
		  ,ba.[Created]
		  ,ba.[CreatedBy]
		  ,ba.[LastUpdate]
		  ,ba.[LastUpdateBy]
	from		Dawn_Data.[Loan].[FundRequestBorrowerAuthorisation] ba
	left join	Dawn_Data.Loan.Contact								c	on	c.ContactId	=	ba.fkContactId
	where ba.FkFundRequestId = @FundRequestId
end

GO
/****** Object:  StoredProcedure [Loan].[FundRequestDocumentByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[FundRequestDocumentByIdGet]
	@FundRequestDocumentId Int
AS

SELECT 
	FileName, 
	Document
FROM Dawn_Data.Loan.FundRequestDocument
WHERE FundRequestDocumentId = @FundRequestDocumentId


GO
/****** Object:  StoredProcedure [Loan].[FundRequestDocumentDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[FundRequestDocumentDel]
	@FundRequestDocumentId Int
AS

DELETE Dawn_Data.Loan.FundRequestDocument
WHERE FundRequestDocumentId = @FundRequestDocumentId


GO
/****** Object:  StoredProcedure [Loan].[FundRequestDocumentExists]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[FundRequestDocumentExists]
	@FundRequestId Int,
	@FundRequestDocumentTypeId Int,
	@FileName NVarChar(4000)
AS

SELECT	
	CASE WHEN EXISTS (SELECT TOP 1 *
						FROM Dawn_Data.Loan.FundRequestDocument d
						WHERE d.FkFundRequestId = @FundRequestID
						  AND d.FkFundRequestDocumentTypeId = @FundRequestDocumentTypeId
						  AND d.FileName = @FileName)
		THEN CONVERT(bit, 1)
		ELSE CONVERT(bit, 0)
	END As DocumentExists


GO
/****** Object:  StoredProcedure [Loan].[FundRequestDocumentGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[FundRequestDocumentGet]
	@FundRequestId Int,
	@FundRequestDocumentTypeId Int
AS begin
set nocount on
SELECT 
	FundRequestDocumentId,
	FkFundRequestId AS FundRequestId,
	FkFundRequestDocumentTypeId As FundRequestDocumentTypeId,
	FileName,
	LastUpdate As DocumentDate,
	DataLength(Document) As DocumentLength
INTO #TempList
FROM Dawn_Data.Loan.FundRequestDocument
WHERE FkFundRequestId = @FundRequestId
  AND (@FundRequestDocumentTypeId = 0 OR FkFundRequestDocumentTypeID = @FundRequestDocumentTypeId)

-- For some reason if you do the IS NOT NULL on the document within the where clause, 
-- it seems to do a full scan of every document which causes the query to hang, hence
-- selecting via temporary table
SELECT * 
FROM #TempList
WHERE DocumentLength IS NOT NULL

end
GO
/****** Object:  StoredProcedure [Loan].[FundRequestDocumentIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[FundRequestDocumentIns]
	@FundRequestDocumentId Int OUTPUT,
	@FundRequestId Int,
	@FundRequestDocumentTypeID Int,
	@FileName NVarChar(1000),
	@FileChunk VarBinary(max),
	@User NVarChar(255)
AS

-- Staff_Id is stored with domain prefix some places and without domain prefix in others.
-- The convention in the tbl_staff table is without prefix, so Aura will do the same
-- we can fudge it here so the Access calculator still works and then fix it later

IF (CHARINDEX('OMN\', @User) = 0)
	SELECT @User = 'OMN\' + @User

INSERT INTO Dawn_Data.Loan.FundRequestDocument(FkFundRequestId, FkFundRequestDocumentTypeID, FileName, Document, CreatedBy, Created, LastUpdateBy, LastUpdate)
SELECT @FundRequestId, @FundRequestDocumentTypeID, @FileName, @FileChunk, @User, GETDATE(), @User, GETDATE()

SELECT @FundRequestDocumentId = SCOPE_IDENTITY()

GO
/****** Object:  StoredProcedure [Loan].[FundRequestDocumentUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[FundRequestDocumentUpd]
	@FundRequestDocumentId Int,
	@FileChunk VarBinary(max)
AS

UPDATE Dawn_Data.Loan.FundRequestDocument
SET Document.Write(@FileChunk, null, null)
WHERE FundRequestDocumentId = @FundRequestDocumentId


GO
/****** Object:  StoredProcedure [Loan].[FundRequestGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[FundRequestGet]
	@LoanId Int,
	@FundRequestId Int
AS
/*
SELECT 
	FundRequestId,
	f.FkLoanId As LoanId,
	s.FundRequestStatusId,
	s.Description As FundRequestStatus,
	f.FundRequestDate,
	f.Amount,
	f.BankruptcyCheckDate,
	f.BankruptcyCheckedBy,
	f.BankruptcyCheckSuccessful,
	f.AuthorisationReceivedDate,
	f.AuthorisationReceivedBy,
	f.FundRequestSentDate,
	f.FundRequestSentBy,
	f.FundReleaseDate,
	f.FundsReleased,
	f.Notes,
	CONVERT(VarChar, SUM(CASE v.FkValuationStatusId WHEN 3 THEN 1 ELSE 0 END)) + '/' + CONVERT(VarChar, COUNT(v.ValuationId)) + ' Received' AS 'ValuationStatus',
	SUM(CASE v.FkValuationStatusId WHEN 3 THEN 1 ELSE 0 END) As ReceivedValuations,
	COUNT(v.ValuationId) As TotalValuations
	--IIF(SUM(CASE v.FkValuationStatusId WHEN 3 THEN 1 ELSE 0 END) = COUNT(v.ValuationId), CONVERT(bit, 1), CONVERT(bit, 0)) As ValuationsReceived
FROM Dawn_Data.Loan.FundRequest f
JOIN Dawn_Data.Reference.FundRequestStatus s		ON f.FkFundRequestStatusId = s.FundRequestStatusId
JOIN Dawn_Data.Loan.FundRequestValuation fv		ON f.FundRequestId = fv.FkFundRequestId
JOIN Dawn_Data.Loan.Valuation v					ON fv.FkValuationId = v.ValuationId
WHERE (@FundRequestId = 0 OR f.FundRequestId = @FundRequestId)
  AND (@LoanId = 0 OR f.FkLoanId = @LoanId)
GROUP BY FundRequestId, f.fkLoanId, s.FundRequestStatusId, s.Description, f.FundRequestDate, f.Amount, f.BankruptcyCheckDate, f.BankruptcyCheckedBy, f.BankruptcyCheckSuccessful, f.AuthorisationReceivedDate, 
	f.AuthorisationReceivedBy, f.FundRequestSentDate, f.FundRequestSentBy, f.FundReleaseDate, f.FundsReleased, f.Notes
ORDER BY f.FundRequestDate
*/

GO
/****** Object:  StoredProcedure [Loan].[FundRequestInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[FundRequestInsUpd]
												@FundRequestId Int,
												@LoanId Int,
												@FundRequestStatusId Int,
												@Amount Money,
												@BankruptcyCheckDate DateTime,
												@BankruptcyCheckedBy NVarChar(255),
												@BankruptcyCheckSuccessful bit,
												@AuthorisationReceivedDate DateTime,
												@AuthorisationReceivedBy NVarChar(255),
												@FundRequestSentDate DateTime,
												@FundRequestSentBy NVarChar(255),
												@FundReleaseDate DateTime,
												@FundsReleased bit,
												@Notes VarChar(max),
												@User NVarChar(255)
AS begin

	set nocount on 

	DECLARE @SecurityId Int, @ValuationId Int
/*
	IF EXISTS (SELECT * FROM Dawn_Data.Loan.FundRequest WHERE FundRequestId = @FundRequestId)
		UPDATE Dawn_Data.Loan.FundRequest
		SET FkFundRequestStatusId = @FundRequestStatusId,
			Amount = @Amount,
			BankruptcyCheckDate = @BankruptcyCheckDate,
			BankruptcyCheckedBy = @BankruptcyCheckedBy,
			BankruptcyCheckSuccessful = @BankruptcyCheckSuccessful,
			AuthorisationReceivedDate = @AuthorisationReceivedDate,
			AuthorisationReceivedBy = @AuthorisationReceivedBy,
			FundRequestSentDate = @FundRequestSentDate,
			FundRequestSentBy = @FundRequestSentBy,
			FundReleaseDate = @FundReleaseDate,
			FundsReleased = @FundsReleased,
			Notes = @Notes,
			LastUpdate = GETDATE(),
			LastUpdateBy = @User
		WHERE FundRequestId = @FundRequestId
	ELSE
		BEGIN 
			INSERT INTO Dawn_Data.Loan.FundRequest(FkLoanId, FkFundRequestStatusId, FundRequestDate, Amount, BankruptcyCheckDate, BankruptcyCheckedBy, AuthorisationReceivedDate, BankruptcyCheckSuccessful, 
				AuthorisationReceivedBy, FundRequestSentDate, FundRequestSentBy, FundReleaseDate, FundsReleased, Notes, Created, CreatedBy, LastUpdate, LastUpdateBy)
			SELECT @LoanId, @FundRequestStatusId, CONVERT(VarChar, GETDATE(), 106), @Amount, @BankruptcyCheckDate, @BankruptcyCheckedBy, @AuthorisationReceivedDate, @AuthorisationReceivedBy, @BankruptcyCheckSuccessful,
				@FundRequestSentDate, @FundRequestSentBy, @FundReleaseDate, @FundsReleased, @Notes, GETDATE(), @User, GETDATE(), @User

			SET @FundRequestId = SCOPE_IDENTITY()

			DECLARE SecurityCursor CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT security_id
			FROM Dawn_Data.Loan.SecurityMap s (NOLOCK)
			WHERE s.loan_id = @LoanId
			  AND s.IsActive = 1

			OPEN SecurityCursor

			FETCH NEXT FROM SecurityCursor INTO @SecurityId

			WHILE @@FETCH_STATUS = 0
				BEGIN
					INSERT INTO Dawn_Data.Loan.Valuation(FkLoanId, FkSecurityId, FkValuationStatusId, Notes, Created, CreatedBy, LastUpdate, LastUpdateBy)
					SELECT @LoanId, @SecurityId, 1, '', GETDATE(), @User, GETDATE(), @User
					FROM Dawn_Data.Loan.SecurityMap s (NOLOCK)
					WHERE s.loan_id = @LoanId
					  AND s.isActive = 1

					SELECT @ValuationId = SCOPE_IDENTITY()
				
					INSERT INTO Dawn_Data.Loan.FundRequestValuation(FkFundRequestId, FkValuationId, Created, CreatedBy, LastUpdate, LastUpdateBy)
					SELECT @FundRequestId, @ValuationId, GETDATE(), @User, GETDATE(), @User 

					FETCH NEXT FROM SecurityCursor INTO @SecurityId
				END

			CLOSE SecurityCursor

			DEALLOCATE SecurityCursor
		END
	*/
		SELECT @FundRequestId As FundRequestId
end

GO
/****** Object:  StoredProcedure [Loan].[FundRequestNotesGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[FundRequestNotesGet]	 @LoanId			Int
												,@FundRequestId		Int
												,@StationId			int
as Begin
	set nocount on

	if isnull(@FundRequestId,0)!=0
		select	 f.FundRequestId
				,f.FkLoanId								as	LoanId
				,convert(varchar,frn.Created,106) + ' ' + LEFT(convert(varchar,frn.Created,8),8)		as	CreatedDate
				,frn.CreatedBy
				,frn.Notes								as Notes
				,frn.fkWorkFlowStationId
	--	select *
		FROM		Dawn_Data.Loan.FundRequest				f
		inner join	Dawn_Data.Loan.FundRequestNotes			frn		on	frn.fkFundRequestId			=	f.FundRequestId			
		where	f.FundRequestId				= @FundRequestId
		order by f.Created desc
	else
		select	 0									as FundRequestId
			,frn.FkLoanId							as	LoanId
			,convert(varchar,frn.Created,106) + ' ' + LEFT(convert(varchar,frn.Created,8),8)		as	CreatedDate
			,frn.CreatedBy
			,frn.Notes								as Notes
		from	Dawn_Data.Loan.FundRequestNotes			frn
		where	isnull(frn.fkLoanId,0)				= @LoanId
			and frn.fkFundrequestId=0
		order by frn.Created desc
end

GO
/****** Object:  StoredProcedure [Loan].[FundRequestNotesUpSert]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[FundRequestNotesUpSert]	@LoanId int, @FundRequestId Int,	@Notes varchar(max)
as begin

	set nocount on

	/*fund request notes*/
	if exists(select * from Dawn_Data.[Loan].[FundRequestNotes] where fkLoanId = 0 and fkFundRequestId = @FundRequestId)
			 delete Dawn_Data.[Loan].[FundRequestNotes] where fkFundRequestId = @FundRequestId and fkLoanId = 0

	/*case notes*/
	if exists(select * from Dawn_Data.[Loan].[FundRequestNotes] where fkLoanId = @LoanId and fkFundRequestId=@FundRequestId)
			 delete Dawn_Data.[Loan].[FundRequestNotes] where fkLoanId = @LoanId and fkFundRequestId = @FundRequestId

	declare @i int, @NoteSep varchar(16), @RowSep varchar(16), @NoteString varchar(max);	select @NoteSep='~~',@RowSep='|',@i=0
	declare @Note table(createddate varchar(255),station varchar(32),author varchar(128),note varchar(max))

	select  * into #Notes from dbo.fn_split(@Notes,@NoteSep)

	select @i = min(idx) from #notes
	while @i is not null begin

		select @NoteString = Value from #Notes where idx=@i

		insert @Note(createddate,station,author,note
					) values (
			 (select value from dbo.fn_split(@NoteString,@RowSep) where idx=0) 
			,(select value from dbo.fn_split(@NoteString,@RowSep) where idx=1) 
			,(select value from dbo.fn_split(@NoteString,@RowSep) where idx=2)
			,(select value from dbo.fn_split(@NoteString,@RowSep) where idx=3)
			)
		
		select @i = min(idx) from #notes where idx>@i
	end
	delete @Note where note is null

	if exists(select * from @Note)
		insert Dawn_Data.[Loan].[FundRequestNotes] (fkLoanId,fkFundRequestId,created,fkWorkflowStationId,CreatedBy,Notes)
			select  @LoanId,@FundRequestId , createddate , station , author , Note from @Note
end

GO
/****** Object:  StoredProcedure [Loan].[FundRequestSecurityGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE  PROCEDURE [Loan].[FundRequestSecurityGet]	 @LoanId				Int
AS Begin
	set nocount on
	
	select 
		distinct
		l.loan_id																								as	LoanId
		,isnull(s.address_1,'') + case when isnull(s.address_2,'') <>'' then ',' else '' end +
		isnull(s.address_2,'') + case when isnull(s.address_3,'') <>'' then ',' else '' end +
		isnull(s.address_3,'') + case when isnull(s.address_4,'') <>'' then ',' else '' end +
		isnull(s.address_4,'') + case when isnull(s.County,'') <>'' then ',' else '' end +
		isnull(s.post_code,'')																					as	[SecurityAddress]
	from		Dawn_Data.Loan.Loan					l
	left join	Dawn_Data.Loan.ParticipantOfCase		lc	on	l.loan_id		=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
	left join	Dawn_Data.Loan.Contact				c	on	lc.FkContactId	=	c.ContactId
	left join	Dawn_Data.Loan.SecurityMap			sm	on	l.loan_id		=	sm.loan_id
	left join	Dawn_Data.Loan.[Security]			s	on	sm.security_id	=	s.security_id
	where l.loan_id = @LoanId

end

GO
/****** Object:  StoredProcedure [Loan].[FundRequestStatusUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[FundRequestStatusUpd]
	@FundRequestId Int,
	@FundRequestStatusId Int
AS

UPDATE Dawn_Data.Loan.FundRequest
SET FkFundRequestStatusId = @FundRequestStatusId
WHERE FundRequestId = @FundRequestId


GO
/****** Object:  StoredProcedure [Loan].[FundRequestSummaryGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [Loan].[FundRequestSummaryGet]	@LoanId Int,	@FundRequestId Int
as begin
	set nocount on

	declare @debug int;set @debug=0

	declare @StageTaskStatusId int , @StationId int , @StationDescription varchar(255), @StageDescription varchar(255) , @StageStatusDescription varchar(255) , @LastUpdatedBy nvarchar(255) ,@StationNotes varchar(max)
	declare @frstatus table (fr int, StageTaskStatusId int,StationId int ,StationDescription varchar(255),StageDescription varchar(255), StageStatusDescription varchar(255) , LastUpdatedBy nvarchar(255), StationNotes varchar(max))
	declare @fr table (fr int)

	declare @i int
	if @FundRequestId=0
		insert @fr(fr)	select fundrequestid from Dawn_Data.Loan.FundRequest where FkLoanId=@LoanId --and fkStatusId!=3
	else
		begin
			insert @fr(fr) select @FundRequestId
			
			--also get other completed fr's 
			insert @fr(fr) 
					select	FundRequestId
					from	Dawn_Data.Loan.FundRequest
					where	FkLoanId=@LoanId
						and fundrequestid!=@fundrequestid
						and fkStatusId = 8
		end

if @debug=1
	select * from @fr

	select 
		FundRequestId
		,f.FkLoanId									LoanId
		,convert(varchar,f.FundRequestDate,106)		FundRequestDate
		,convert(varchar,f.FundReleaseDate,106)		FundsReleaseDate
		,case when f.FundsReleased=1 
			then 'Y' else 'N' end					FundsReleased
		,isnull(f.Amount,'')						Amount
		,isnull(f.LastUpdateBy,'')					CurrentOwner
		,isnull(n.StationId,0)						StationId
		,isnull(n.StationDescription,'Unknown')		[Station]	-->> biz.proc
		,isnull(s.Description,'Unknown')			[Stage]
		,isnull(s.Description,'Unknown')			[Status]
		,case when fundRequestId=(select FundRequestId
										from Dawn_Data.[Loan].[FundRequest]
									where coalesce(LastUpdate,created) in (select max(coalesce(LastUpdate,created)) from Dawn_Data.[Loan].[FundRequest])
										and FundReleaseDate is null
									)
			then	'Current'									
			else	''
		 end										RequestType
		,''											Notes
		,f.LTV
		,f.QC1AdderessMatchesReport
		,f.QC2ValuerMatchesReport
		,f.QC3ValuationDateMatchesReport
		,f.QC4BankruptcyReportAttached
		,f.QC5LandSearchReportAttached
		,f.QC6CreditSafeReportAttached
		,f.QC7SolicitorCorrect
		,f.QC8DrawdownAmountCorrect
		,f.QC9InsuranceExists
		,f.QC10ValuationUpdate
		,f.UseFeesInLTV
--		select *
	from		Dawn_Data.Loan.FundRequest				f
	left join	Dawn_Data.Reference.FundRequestStatus	s		on	s.FundRequestStatusId		=	f.fkStatusId
	inner join	Dawn_Data.[WorkFlow].[Station]			n		on	n.StationId					=	f.fkcurrentWorkStationId
	inner join	Dawn_Data.Loan.Loan						l		on	l.loan_id					=	f.FkLoanId
	inner join	@fr											fr		on	fr.fr						=	f.FundRequestId

	where	(@FundRequestId =0
			 OR 
			 f.FundRequestId in (select fr from @fr)
			 )--= @FundRequestId)

		and (@LoanId = 0 OR f.FkLoanId = @LoanId)
		--and f.fkStatusId <> 3 --not cancelled
		--and f.fkStatusId <> 8 --funds released
		--and f.FundRequestDate is null
	order by 
	--f.FundRequestDate
	case when fundRequestId=(select FundRequestId --select *
										from Dawn_Data.[Loan].[FundRequest]
									where coalesce(LastUpdate,created) in (select max(coalesce(LastUpdate,created)) from Dawn_Data.[Loan].[FundRequest])
										and FundReleaseDate is null
									)
			then	'Current'									
			else	''
		 end desc



/*
		 select * from Dawn_Data.Reference.FundRequestStatus
		 select * from Dawn_Data.[WorkFlow].[Station]
		 select * from Dawn_Data.WorkFlow.Stage
*/
--if @debug=1
--	select * from @frstatus
end
GO
/****** Object:  StoredProcedure [Loan].[FundRequestUpSert]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[FundRequestUpSert]	@FundRequestId Int,
										@FundRequestDate DateTime,
										@FundsReleased int,
										@FundReleaseDate DateTime,
										@LoanId Int,
										@Amount Money,
										@LTV Money,
										@User NVarChar(255),
										@UserStationId int,
										@FundRequestStatusId int,
										@QC1AdderessMatchesReport bit,
										@QC2ValuerMatchesReport bit,
										@QC3ValuationDateMatchesReport bit,
										@QC4BankruptcyReportAttached bit,
										@QC5LandSearchReportAttached bit,
										@QC6CreditSafeReportAttached bit,
										@QC7SolicitorCorrect bit,
										@QC8DrawdownAmountCorrect bit,
										@QC9InsuranceExists bit,
										@QC10ValuationUpdate bit,
										@UseFeesInLTV bit
as Begin

	set nocount on

	
	DECLARE @SecurityId Int, @ValuationId Int
	if exists (SELECT * FROM Dawn_Data.Loan.FundRequest WHERE FundRequestId = @FundRequestId)

		--declare @Wid int
		--select @WId =fkLastWorkstationId FROM Dawn_Data.Loan.FundRequest WHERE FundRequestId = @FundRequestId

		Update Dawn_Data.Loan.FundRequest
			set Amount = @Amount,LTV=@LTV, FundsReleased=@FundsReleased,FundReleaseDate=@FundReleaseDate, LastUpdate = GETDATE(), LastUpdateBy = @User
				,fkLastWorkstationId=fkCurrentWorkStationId,fkCurrentWorkStationId=@UserStationId,fkStatusId=@FundRequestStatusId   
				,QC1AdderessMatchesReport		=@QC1AdderessMatchesReport
				,QC2ValuerMatchesReport			=@QC2ValuerMatchesReport 
				,QC3ValuationDateMatchesReport	=@QC3ValuationDateMatchesReport
				,QC4BankruptcyReportAttached	=@QC4BankruptcyReportAttached
				,QC5LandSearchReportAttached	=@QC5LandSearchReportAttached
				,QC6CreditSafeReportAttached	=@QC6CreditSafeReportAttached
				,QC7SolicitorCorrect			=@QC7SolicitorCorrect
				,QC8DrawdownAmountCorrect		=@QC8DrawdownAmountCorrect
				,QC9InsuranceExists				=@QC9InsuranceExists
				,QC10ValuationUpdate			=@QC10ValuationUpdate
				,UseFeesInLTV					=@UseFeesInLTV
		where fkloanId = @LoanId and FundRequestId = @FundRequestId
	else begin

		Insert Dawn_Data.Loan.FundRequest(FundRequestDate,FkFundRequestStatusId,FkLoanId,Amount,LTV,FundsReleased,FundReleaseDate,fkCurrentWorkStationId,fkLastWorkstationId,fkstatusId,
		QC1AdderessMatchesReport,QC2ValuerMatchesReport,QC3ValuationDateMatchesReport,QC4BankruptcyReportAttached,QC5LandSearchReportAttached,
				QC6CreditSafeReportAttached,QC7SolicitorCorrect,QC8DrawdownAmountCorrect,QC9InsuranceExists,QC10ValuationUpdate,UseFeesInLTV
		,Created,CreatedBy,LastUpdate,LastUpdateBy)
		Select @FundRequestDate,1,@LoanId, @Amount,@LTV, @FundsReleased, @FundReleaseDate,@UserStationId,@UserStationId,1 ,
		@QC1AdderessMatchesReport ,@QC2ValuerMatchesReport , @QC3ValuationDateMatchesReport , @QC4BankruptcyReportAttached ,
		@QC5LandSearchReportAttached ,	@QC6CreditSafeReportAttached ,	@QC7SolicitorCorrect ,	@QC8DrawdownAmountCorrect,@QC9InsuranceExists,@QC10ValuationUpdate,
		@UseFeesInLTV	,GETDATE(), @User, GETDATE(), @User
		SET @FundRequestId = SCOPE_IDENTITY()

	end
	select @FundRequestId As FundRequestId
end
GO
/****** Object:  StoredProcedure [Loan].[FundRequestValuationInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [Loan].[FundRequestValuationInsUpd]	@FundRequestId	int,
											@ValuationId Int,
											@LoanId Int,
											@SecurityId Int,
											@LegalEntityId Int,
											@ValuationStatusId Int,
											@ContactId Int,
											@SurveyorComments NVarChar(max),
											@DateOfInstruction DateTime,
											@DateOfInspection DateTime,
											@DateOfValuation DateTime,
											@ApplicantValueEstimate Money,	@ApplicantGdvEstimate Money,	@ApplicantValuationFee Money,
											@MarketValue Money,
											@NinetyDayValue Money,
											@GrossDevelopmentValue Money,	@GrossDevelopmentNinetyDayValue Money,
											@RentalValue Money,
											@ReinstatementValue Money,
											@Notes NVarChar(max),
											@User NVarChar(255)
as begin
	set nocount on

	IF EXISTS (SELECT * FROM Dawn_Data.Loan.Valuation WHERE ValuationId = @ValuationId)
		UPDATE Dawn_Data.Loan.Valuation
		SET FkSecurityId = @SecurityId,
			FkLegalEntityId = @LegalEntityId,
			FkValuationStatusId = @ValuationStatusId,
			FkContactId = @ContactId,
			SurveyorComments = @SurveyorComments,
			DateOfInstruction = @DateOfInstruction,
			DateOfInspection = @DateOfInspection,
			DateOfValuation = @DateOfValuation,
			ApplicantValueEstimate = @ApplicantValueEstimate,
			ApplicantGdvEstimate = @ApplicantGdvEstimate,
			ApplicantValuationFee = @ApplicantValuationFee,
			MarketValue = @MarketValue,
			NinetyDayValue = @NinetyDayValue,
			GrossDevelopmentValue = @GrossDevelopmentValue,
			GrossDevelopmentNinetyDayValue = @GrossDevelopmentNinetyDayValue,
			RentalValue = @RentalValue,
			ReinstatementValue = @ReinstatementValue,
			Notes = @Notes,
			LastUpdate = GETDATE(),
			LastUpdateBy = @User
		WHERE ValuationId = @ValuationId
	ELSE
		BEGIN
			insert Dawn_Data.Loan.Valuation(
				 FkLoanId, FkSecurityId, FkLegalEntityId, FkValuationStatusId, FkContactId, SurveyorComments
				,DateOfInstruction, DateOfInspection, DateOfValuation, ApplicantValueEstimate, ApplicantGdvEstimate
				,ApplicantValuationFee, MarketValue, NinetyDayValue, GrossDevelopmentValue, GrossDevelopmentNinetyDayValue, RentalValue
				,ReinstatementValue, Notes, Created, CreatedBy, LastUpdate, LastUpdateBy
				)
			select @LoanId, @SecurityId, @LegalEntityId, @ValuationStatusId, @ContactId, @SurveyorComments
				,@DateOfInstruction, @DateOfInspection, @DateOfValuation, @ApplicantValueEstimate, @ApplicantGdvEstimate
				,@ApplicantValuationFee, @MarketValue, @NinetyDayValue, @GrossDevelopmentValue, @GrossDevelopmentNinetyDayValue, @RentalValue
				,@ReinstatementValue, @Notes, GETDATE(), @User, GETDATE(), @User

			select @ValuationId = SCOPE_IDENTITY()

			insert Dawn_Data.Loan.FundRequestValuation(FkFundRequestId, FkValuationId, Created, CreatedBy, LastUpdate, LastUpdateBy)
				select @FundRequestId, @ValuationId, GETDATE(), @User, GETDATE(), @User 


		END

	SELECT @ValuationId As ValuationId
end

GO
/****** Object:  StoredProcedure [Loan].[GetLoanDataMin]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-07-26		Gurdeep			First version

*/

CREATE PROCEDURE [Loan].[GetLoanDataMin]	
AS 

BEGIN
	SET NOCOUNT ON

	select r.*, COUNT(lf.fkFunderId) as Funders
	
	from (SELECT 
	     l.loan_id	as	LoanId
			,upper(l.CBFL_id)	as	CaseReference						
			,ISNULL(lh.loan_amount, 0.0) + ISNULL(lh.TitleInsurance, 0.0) + ISNULL(lh.insurance_cost, 0.0) as PrincipalAdvance
			, CASE WHEN (l.redeemed_date is null OR ISNULL(lh.loan_balance, 0) > 0) AND (lh.Division IS NOT NULL AND ISNULL(lh.ProductTypeID,0) > 0 AND ISNULL(lh.ProductInterestTypeID,0) > 0 AND lh.ProductTermCombination IS NOT NULL)  THEN 1 
				  ELSE 0 
			  END AS IsLive
			,lh.loan_balance as LoanBalance
			,l.redeemed_date as RedeemedDate			
					
	from      	Dawn_Data.Loan.Loan				l
	left join   Dawn_Data.Loan.History           lh	on (lh.DIM_loan_id_SSK = l.loan_id)
	) as r
	left join Dawn_Data.Loan.FunderOfLoan lf on (r.LoanId = lf.fkLoanId)
	group by r.CaseReference, r.IsLive, r.LoanBalance, r.LoanId, r.PrincipalAdvance, r.RedeemedDate
	order by r.CaseReference

END
GO
/****** Object:  StoredProcedure [Loan].[InsertSkeletonCase]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- LE
--execute Dawn_v100.[Loan].[InsertSkeletonCase]  0,'2018-10-01','',67.59,77.7,2000,0.01,0.03,0,'OPF','Uptownfunk2 Limited',0.01,0.77,0,0,0,0,2,6,12,12,9.32,0,False,-1
-- Individual
--execute Dawn_v100.[Loan].[InsertSkeletonCase]  0,'2018-10-01','',67.59,77.7,2000,0.01,0.03,0,'OPF','Upto',0.01,0.77,0,0,0,0,2,6,12,12,9.32,0,False,0
-- =============================================
-- Author:		Peter Wegrzyn, Amicus
-- Create date: 9th Sept 2019
-- Create a new case as a blank skeleton. This can then be fleshed out in Dawn Servicing and the DSC
-- 20191002. PW. Expanded to include values generated/input for pre-calculation 
-- 20191011. PW Add more fields

-- =============================================
CREATE PROCEDURE [Loan].[InsertSkeletonCase] 
	-- Add the parameters for the stored procedure here
	@LoanID int = 0,
	@CompletionDate date,
	@Case_id nvarchar(255),
	@loan_amount decimal(18,6),-- NET
	@gross_loan decimal(18,6),
	@Total_Facility decimal(18,6),
	@monthly_int_amount  decimal(18,6),
	@penalty_int_amount  decimal(18,6),
	@CaseOwnerId int = 0,
	@Division nvarchar(255)  ='OPF',
	@ClientName  nvarchar(255)  = 'Test',
	@ArrangementFeeInPercent  decimal(18,6), --20190102
	@ArrangementFeeFlat decimal(18,6),
	@legal_cost decimal(18,6),
	@InsuranceCost decimal(18,6),
	@TitleInsurance decimal(18,6),
	@AdministrationFee decimal(18,6),
	@ProductTypeID int,
	@ProductInterestTypeID int,
	@ProductTermCombination varchar(5),
	@Term varchar(5),
	@interest_amount decimal(18,6),
	@MonthlyServicedInterest decimal(18,6),
	@isAddFirstMonthServiceLoan bit,
	@isEntity bit --20191015
AS
BEGIN
DECLARE @SCDStartDate as varchar(20)
DECLARE @SCDEndDate as varchar(20)
DECLARE @ThisDateTime as datetime
DECLARE @CaseNumber as varchar(6)
set dateformat  ymd
IF @LoanID = 0
  BEGIN
	SET NOCOUNT ON;
	SET @ThisDateTime =GETDATE()
	--print GETDATE()
	--select convert(varchar(10), @ThisDateTime, 108)
	--PRINT LEFT(convert(varchar(10), @ThisDateTime, 108),2) 
	--PRINT  SUBSTRING(convert(varchar(10), @ThisDateTime, 108),4,2) 
	--PRINT  RIGHT(convert(varchar(10), @ThisDateTime, 108),2)
	--print  Right('00' + cast(MONTH(@ThisDateTime) as VARCHAR(2)),2)
	
	SET  @SCDStartDate =cast(YEAR(@ThisDateTime) as VARCHAR(4)) +  Right('00' + cast(MONTH(@ThisDateTime) as VARCHAR(2)),2)  +  Right('00' + cast(DAY(@ThisDateTime) as VARCHAR(2)),2)+
	LEFT(convert(varchar(10), @ThisDateTime, 108),2) + SUBSTRING(convert(varchar(10), @ThisDateTime, 108),4,2) + RIGHT(convert(varchar(10), @ThisDateTime, 108),2) 
	-- tag on Milliseconds
	SET  @SCDStartDate = @SCDStartDate + Right('0000' + cast(DATEPART(ms,@ThisDateTime) as VARCHAR(4)),4) -- Using DATEPART, becuase there is so many ways to do it..
	--print @SCDStartDate
	SET @SCDEndDate =CAST(CAST(@SCDStartDate AS bigint) -1 AS varchar(20))

	--print @SCDStartDate 

	--SELECT max([CBFL_id]) FROM [Dawn_Data].[Loan].[Loan]
	SELECT @CaseNumber= LTRIM(RTRIM(CAST( MAX(try_cast(LEFT([CBFL_id],5) as int))+1 AS VARCHAR)))  FROM  [Dawn_Data].[Loan].[Loan]
	--SELECT @CaseNumber= CAST( MAX(try_cast(LEFT([CBFL_id],5) as int))+1 AS VARCHAR)  FROM  [Dawn_Data].[Loan].[Loan]

	SELECT @Case_id = RIGHT('00000'+ @CaseNumber, 5) + '-' +RIGHT('####' + LEFT(@ClientName,4) , 4) --20191015
	/*
	PRINT '@Case_id =' -- +  @Case_id
	PRINT  @Case_id
	PRINT  '@CaseNumber ='--+ @CaseNumber
	PRINT  @CaseNumber
	PRINT	@legal_cost 
	PRINT	@InsuranceCost 
	PRINT	@TitleInsurance 
	PRINT	@AdministrationFee
	*/
	INSERT INTO [Dawn_Data].[Loan].[Loan]
           ([completion_date]
           ,[CBFL_id]
           ,[loan_amount]
           ,[gross_loan]
           ,[Total_Facility]
		   ,[monthly_int_amount]
           ,[penalty_int_amount]
		   ,[CaseOwnerId],
			TitleInsurance,
			AdministrationFee,
			insurance_cost,
			legal_cost ,
			Term 
			,arrangement_fee_in_percentage --FeeInPercent  		 	
			,arrangement_fee_Flat 
			,ProductTypeID
			,ProductInterestTypeID							
			--,ProductTermCombinationsID 	
			,Interest_amount 					
			,isAddFirstMonthServiceLoan 	
		   )
	VALUES(	@CompletionDate		,
			@Case_id			,
			@loan_amount		,
			@gross_loan			,
			@Total_Facility		,
			@monthly_int_amount ,
			@penalty_int_amount ,
			@CaseOwnerId,
			@TitleInsurance,
			@AdministrationFee,
			@InsuranceCost,
			@legal_cost, 
			@Term 
			,@ArrangementFeeInPercent  			
			,@ArrangementFeeFlat 				
			,@ProductTypeID 					
			,@ProductInterestTypeID		
			--,@ProductTermCombination 		
			,@Interest_amount 					
			,@isAddFirstMonthServiceLoan 		


			)
			--@Division			
			SELECT @LoanID=scope_identity() 

	-- History
    -- Kill the old ones
	Update [Dawn_Data].[Loan].History  SET  SCDStatus='H'  WHERE DIM_loan_id_SSK=@LoanID; -- Just to be sure, make everything previous History

    Update [Dawn_Data].[Loan].History  SET SCDEndDate=@SCDEndDate, SCDStatus='H' FROM -- Set the end date of the previous record.
	(SELECT TOP (1) [DIM_loan_id_DWSK] FROM [Dawn_Data].[Loan].History WHERE DIM_loan_id_SSK=@LoanID ORDER by SCDEndDate DESC) As TopLH
	WHERE TopLH.DIM_loan_id_DWSK =[Dawn_Data].[Loan].History.DIM_loan_id_DWSK;	
    
	INSERT INTO [Dawn_Data].[Loan].History
            (DIM_loan_id_SSK, completion_date, loan_to_security_id, principal, maturity_date, CBFL_id, Weblabs_id, facility_date, redeemed_date, enquiry_date, 
            redemption_date, product_id, development_costs, development_time, type, monthly_int_amount, penalty_int_amount, int_type, term, loan_amount, loan_adjustment, 
            loan_balance, gross_loan, Total_Facility, Total_FurtherAdvance, monthly_cbfl_interest_percent, monthly_broker_interest_rate, 

            arrangement_fee_out_percentage,  broker_flat_fee, broker_fee_in_percentage, broker_fee_out_percentage, Broker_fee_ActuallyPaidOut, 
            interest_adjustments, interest_balance, other_fees, solicitor, solicitor_fee,  bank_charge, CBFL_insurance, CBFL_legals,  
            staged_redemptions, loan_rolled, rolled_date, further_releases, percent_utilisation, additional_funding, additional_amount, reciever_appointed, receiver_date, 
            repossed, rebate, rebate_amount, shortfall, checked, loan_notes, broker_fee_outInterestRate, TrailerFeeInterestDueToBroker, DocFolder, LoanStatus, DocFolder1, 
            DocFolder2, DocFolder3, DocFolder4, DocFolder5, [ProductNames],ProductDescription,[ProductNamesID],[TermMonthID],
			arrangement_fee_in_percentage  ,
			arrangement_fee_Flat, 
			legal_cost, 
			Insurance_Cost ,
			TitleInsurance ,
			AdministrationFee,
			[ProductTypeID],
			ProductInterestTypeID,
			[ProductTermCombination],
			Staff_ID, dteDate, dteDateUpdated,[Division], 
			isAddFirstMonthServiceLoan,
			interest_amount, 
			MonthlyInterest,
			SCDStartDate, SCDEndDate, SCDStatus)
	SELECT   loan_id, completion_date, loan_to_security_id, principal, maturity_date, CBFL_id, Weblabs_id, facility_date, redeemed_date, enquiry_date,
			redemption_date, product_id, development_costs, development_time, type, monthly_int_amount, penalty_int_amount, int_type, term, loan_amount, loan_adjustment, 
			loan_balance,gross_loan, Total_Facility, Total_FurtherAdvance, monthly_cbfl_interest_percent, monthly_broker_interest_rate, 
			
			arrangement_fee_out_percentage, broker_flat_fee, broker_fee_in_percentage, broker_fee_out_percentage, Broker_fee_ActuallyPaidOut, 
			interest_adjustments, interest_balance, other_fees, solicitor, solicitor_fee,  bank_charge, CBFL_insurance, CBFL_legals,  
			staged_redemptions, loan_rolled, rolled_date, further_releases, percent_utilisation, additional_funding, additional_amount, reciever_appointed, receiver_date, 
			repossed, rebate, rebate_amount, shortfall, checked, loan_notes, broker_fee_outInterestRate, TrailerFeeInterestDueToBroker, DocFolder, LoanStatus, DocFolder1, 
			DocFolder2, DocFolder3, DocFolder4, DocFolder5, [ProductNames],ProductDescription,[ProductNamesID],[TermMonthID],
			@ArrangementFeeInPercent,
			@ArrangementFeeFlat ,
			@legal_cost, 
			@InsuranceCost ,
			@TitleInsurance ,
			@AdministrationFee,
			@ProductTypeID,
			@ProductInterestTypeID,
			@ProductTermCombination,
			Staff_ID,dteDate, dteDateUpdated, @Division, 
			@isAddFirstMonthServiceLoan,
			@Interest_amount, 					
			@MonthlyServicedInterest, 	
			-- Historize it
			@SCDStartDate AS SCDStartDate, 
 			999999999999999999 AS SCDEndDate, --infinite date in the future. We will all be dead.
			'C' AS SCDStatus
	FROM    [Dawn_Data].[Loan].loan
	WHERE     (loan_id = @LoanID);
			
	
	-- Borrowers
	DECLARE	@ContactId Int=0,
	@LegalEntityId Int = 0,
	@Title NVarChar(32) ='Title',
	@Surname NVarChar(128) = @Case_id,
	@FirstName NVarChar(128),
	@MiddleName NVarChar(128),
	@DateOfBirth DateTime,
	@ParticipantTypeId Int=1,
	@LegalEntityPositionId Int,
	@User NVarChar(255)=suser_sname()

	DECLARE  
	@AddressId Int =0 ,
	@AddrLn1 NVarChar(255) ='Street',
	@AddrLn2 NVarChar(255)='AddrLn2',
	@AddrLn3 NVarChar(255)='AddrLn3',
	@AddrLn4 NVarChar(255)=' ',
	@PostCode NVarChar(32)='PostCode',
	@County NVarChar(128)=' ' ,
	@CountryId Int =229, --uk ISO 3166-1 numeric NO!!!!!!!!!! 229 ...becuase some dim-wit hard coded it to only show this code. Appararently Benin is our home country. https://en.wikipedia.org/wiki/Benin
	@Notes NVarChar(max)

CREATE TABLE #tmpContactId(ContactId INT)
CREATE TABLE #tmpSecurityId(SecurityId INT)
CREATE TABLE #tmpAddressId(AddressId INT)
CREATE TABLE #tmpValuationId(ValuationId Int)
CREATE TABLE #tmpLegalEntityId(LegalEntityId Int)
select @LegalEntityId=0
--print @isEntity
	If @isEntity =1
	begin
		--print cast(@LoanID as varchar(10))  + '--' + @ClientName + '--' + @User 
		INSERT INTO #tmpLegalEntityId
		EXECUTE [Dawn_v100].[Loan].[LegalEntityInsUpd] @LoanID,0,  @ClientName,1,1 ,null,@User ;
		SELECT @LegalEntityId=LegalEntityId FROM #tmpLegalEntityId
	end
	else
	--Borrower
	begin
		INSERT INTO #tmpContactId
		EXEC [Dawn_V100].[Loan].[ContactInsUpd]  @ContactId ,@LoanId ,@LegalEntityId ,@Title,	@Surname ,@FirstName ,@MiddleName,@DateOfBirth ,@ParticipantTypeId,@LegalEntityPositionId ,@User ;
		SELECT @ContactId =ContactId FROM #tmpContactId;
	end

	--Borrower Address
	INSERT INTO #tmpAddressId
	EXEC  [Dawn_v100].[Loan].[AddressInsUpd] @AddressId	,@ContactId, @LegalEntityId ,@AddrLn1 ,@AddrLn2 ,@AddrLn3 ,@AddrLn4 ,@PostCode,@County,@CountryId ,@Notes ,@User ;
	SELECT @AddressId=AddressId FROM #tmpAddressId

	--Security Address
	DECLARE @SecurityId  INT , @SecurityName  NVARCHAR(255)='SecurityName', @SecurityDescription  NVARCHAR(255)='SecurityDescription',
												@Address1  NVARCHAR(255),@Address2  NVARCHAR(255),@Address3  NVARCHAR(255),@Address4  NVARCHAR(255),
												@Longditude  MONEY,@Latitude  MONEY,
												@SecurityTenureId  INT=3
												,@SecurityTypeId  INT=6, @SecuritySubTypeId  INT=27,
												@TitleOfSecurity varchar(255) 
	INSERT INTO #tmpSecurityId
	EXEC [Loan].[BorrowerSecurityInsUpd] @LoanId , @SecurityId, @SecurityName, @SecurityDescription,@Address1, @Address2 ,@Address3,@Address4,@County ,@PostCode,@CountryId 
										,@Longditude  ,@Latitude,@User,@SecurityTenureId ,@SecurityTypeId, @SecuritySubTypeId,@TitleOfSecurity;
	SELECT @SecurityId = SecurityId FROM #tmpSecurityId

	--Security valuation
	DECLARE @ValuationId Int,
		--@LoanId Int,
		--@SecurityId Int,
		--@LegalEntityId Int,
		@ValuationBasisId Int, --PJR 17.6.2
		@ValuationStatusId Int=2,
		--@ContactId Int,
		@SurveyorComments NVarChar(max),
		@DateOfInstruction DateTime,
		@DateOfInspection DateTime,
		@DateOfValuation DateTime,
		@ApplicantValueEstimate Money,	@ApplicantGdvEstimate Money,	@ApplicantValuationFee Money,
		@MarketValue Money,
		@NinetyDayValue Money,
		@GrossDevelopmentValue Money,	@GrossDevelopmentNinetyDayValue Money,
		@RentalValue Money,
		@ReinstatementValue Money
	INSERT INTO #tmpValuationId
	EXEC [Loan].[ValuationInsUpd]	 @ValuationId ,@LoanId ,@SecurityId ,@LegalEntityId ,@ValuationBasisId , @ValuationStatusId ,@ContactId ,@SurveyorComments,@DateOfInstruction, @DateOfInspection ,
				@DateOfValuation, @ApplicantValueEstimate , @ApplicantGdvEstimate ,@ApplicantValuationFee ,@MarketValue ,@NinetyDayValue ,@GrossDevelopmentValue , @GrossDevelopmentNinetyDayValue ,@RentalValue ,@ReinstatementValue , @Notes ,@User ;
	SELECT @ValuationId=ValuationId FROM  #tmpValuationId
	
	SELECT @Case_id AS Case_id  , @LoanID AS LoanID,@ContactId AS ContactId,@AddressId AS ConatactAddressId, @SecurityId AS SecurityId, ValuationId, @LegalEntityId as EntityId FROM  #tmpValuationId

		IF OBJECT_ID('tempdb.dbo.#tmpValuationId') IS NOT NULL DROP TABLE #tmpValuationId
		IF OBJECT_ID('tempdb.dbo.#tmpSecurityId') IS NOT NULL DROP TABLE #tmpSecurityId
		IF OBJECT_ID('tempdb.dbo.#tmpAddressId') IS NOT NULL DROP TABLE #tmpAddressId
		IF OBJECT_ID('tempdb.dbo.#tmpContactId') IS NOT NULL DROP TABLE #tmpContactId
		IF OBJECT_ID('tempdb.dbo.#tmpLegalEntityId') IS NOT NULL DROP TABLE #tmpLegalEntityId
		

 END
END

GO
/****** Object:  StoredProcedure [Loan].[IsLoanSetup]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[IsLoanSetup]
-- 20170511. Peter Wegrzyn
@loan_id int,
--@Case_ID VARCHAR(255),
@LiveProduct INT OUTPUT
as 
BEGIN
	-- 'LEN-114' (/DIM-141): Altered: DVM: 2017-05-30:  Change in the requirement; adding the inclusion of the 'History.Checked' value (- "Information message for uninitialised cases not always shown")
	-- Now has to consider whether the loan is checked as part of the validation process

       set nocount on

       --DECLARE @loan_id int
       DECLARE @Division VARCHAR(50)
       DECLARE @ProductTypeID int
       DECLARE @ProductInterestTypeID int
       DECLARE @ProductTermCombination VARCHAR(50)

                           
       SELECT @Division     = NULL               
       SELECT @ProductTypeID = 0                
       SELECT @ProductInterestTypeID = 0
       SELECT @ProductTermCombination =NULL
       SET @LiveProduct=0 

       IF NOT EXISTS(select 1 from [Dawn_Data].loan.history  H where        --cbfl_id = @Case_ID OR
				H.DIM_loan_id_SSK = @loan_id and
				H.Checked = 1    -- 'LEN-114' (/DIM-141): Added: DVM: 2017-05-30:  Change in the requirement
			  )
       BEGIN
              SET @LiveProduct=0 
              --PRINT 'Not EXIST'
              GOTO ExitHere
       END
       select   @loan_id=[DIM_loan_id_SSK], @Division=Division   ,@ProductTypeID=ProductTypeID   ,@ProductInterestTypeID=ProductInterestTypeID, 
        @ProductTermCombination=ProductTermCombination
       from [Dawn_Data].loan.history
       where
       --cbfl_id = @Case_ID OR
       DIM_loan_id_SSK=@loan_id

       If @loan_id= 0       OR @Division IS NULL OR    @ProductTypeID = 0 OR @ProductInterestTypeID = 0  OR @ProductTermCombination IS NULL
              SELECT @LiveProduct=0    
       ELSE   
              SELECT @LiveProduct=1;
              --PRINT 'EXIST'
              --PRINT @LiveProduct
ExitHere:
       return @LiveProduct
END
GO
/****** Object:  StoredProcedure [Loan].[IsSecurityTitleUnique]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [Loan].[IsSecurityTitleUnique] @SecurityTitle varchar(255) ,@SecurityTitleId int
as begin
	select isnull(count(*),0)  from Dawn_Data.Loan.[Security] where TitleOfSecurity=@SecurityTitle and Security_id<>@SecurityTitleId
end
GO
/****** Object:  StoredProcedure [Loan].[LatestExtendedMaturityDateGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*

------------------------------------------------------------------------------------
Date			Name		Description
------------------------------------------------------------------------------------
2018-08-09		GS			Added formal and Informal split
2018-08-23		GS			Added Created Date to the output

*/

CREATE proc [Loan].[LatestExtendedMaturityDateGet] @LoanId int


as begin

       set nocount on

        SELECT result.*

		FROM (
		select top 1 
                      r.ExtendedmaturityDate                                                                                                                  as     LatestExtendedMaturityDate
                     -- WRONG ,(select maturity_date from Dawn_Data.Loan.History where DIM_loan_id_SSK=@LoanId)   as     OriginalMaturityDate
                     ,(SELECT TOP 1 InterestEndDate FROM Dawn_Data.[LoanCalc].[CashflowInterestRate] WHERE cashflowInterest_type<>1 AND cashflowInterest_type<>3 AND (loan_id=@LoanId) ORDER BY InterestEndDate DESC) as       OriginalMaturityDate
                     , nsc.[NoteSubCategory] ExtendType -- 200180717. PW
                     , nsc.[NoteSubCategoryId]            -- 200180717. PW  
					 , r.Created as CreatedDate
              from          [Dawn_Data].[Loan].[RecoveryAction]                 r
              inner join    [Dawn_Data].[Loan].LoanNote                                ln     on       ln.LoanNoteID = r.fkNoteId
              inner join    [Dawn_Data].Reference.NoteType                      nt     on       nt.NoteTypeID = ln.fkNoteTypeId
              INNER JOIN  [Dawn_Data].[Reference].[NoteSubCategory]      nsc ON ln.fkSubKeyId = nsc.[NoteSubCategoryId] -- 200180717. PW
       where  
              r.fkLoanId    =      @LoanId and 
              r.isactive    =      1
              and r.ExtendedmaturityDate is not null
              --and r.ExtendedmaturityDate >r.Created
              and nt.NoteType like '%Extend%' 
              and nt.NoteType like '%Maturity%'
			  and nsc.NoteSubCategory = 'Formal'
        order by isnull(r.LastUpdate,r.Created) desc

	   UNION

	   select top 1 
                      r.ExtendedmaturityDate                                                                                                                  as     LatestExtendedMaturityDate
                     -- WRONG ,(select maturity_date from Dawn_Data.Loan.History where DIM_loan_id_SSK=@LoanId)   as     OriginalMaturityDate
                     ,(SELECT TOP 1 InterestEndDate FROM Dawn_Data.[LoanCalc].[CashflowInterestRate] WHERE cashflowInterest_type<>1 AND cashflowInterest_type<>3 AND (loan_id=@LoanId) ORDER BY InterestEndDate DESC) as       OriginalMaturityDate
                     , nsc.[NoteSubCategory] ExtendType -- 200180717. PW
                     , nsc.[NoteSubCategoryId]            -- 200180717. PW  
					 , r.Created as CreatedDate
              from          [Dawn_Data].[Loan].[RecoveryAction]                 r
              inner join    [Dawn_Data].[Loan].LoanNote                                ln     on       ln.LoanNoteID = r.fkNoteId
              inner join    [Dawn_Data].Reference.NoteType                      nt     on       nt.NoteTypeID = ln.fkNoteTypeId
              INNER JOIN  [Dawn_Data].[Reference].[NoteSubCategory]      nsc ON ln.fkSubKeyId = nsc.[NoteSubCategoryId] -- 200180717. PW
       where  
              r.fkLoanId    =      @LoanId and 
              r.isactive    =      1
              and r.ExtendedmaturityDate is not null
              --and r.ExtendedmaturityDate >r.Created
              and nt.NoteType like '%Extend%' 
              and nt.NoteType like '%Maturity%'
			  and nsc.NoteSubCategory = 'Informal'
			     order by isnull(r.LastUpdate,r.Created) desc
			  
       ) AS result
	   
	  

end
GO
/****** Object:  StoredProcedure [Loan].[LatestExtendedMaturityDateGetV2]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--exec [Loan].[LatestExtendedMaturityDateGetV2] 2619
CREATE proc [Loan].[LatestExtendedMaturityDateGetV2] @LoanId int
as begin
--20180717. PW added Extension type. Fix bug in Maturity date
	set nocount on

		select	top 1 
			 r.ExtendedmaturityDate																	as	LatestExtendedMaturityDate
			-- WRONG ,(select maturity_date from Dawn_Data.Loan.History where DIM_loan_id_SSK=@LoanId)	as	OriginalMaturityDate
			,(SELECT TOP 1 InterestEndDate FROM Dawn_Data.[LoanCalc].[CashflowInterestRate] WHERE cashflowInterest_type<>1 AND cashflowInterest_type<>3 AND (loan_id=@LoanId) ORDER BY InterestEndDate DESC) as	OriginalMaturityDate
			, nsc.[NoteSubCategory] ExtendType -- 200180717. PW
			, nsc.[NoteSubCategoryId]		   -- 200180717. PW	
		from		[Dawn_Data].[Loan].[RecoveryAction]			r
		inner join	[Dawn_Data].[Loan].LoanNote					ln	on	ln.LoanNoteID	= r.fkNoteId
		inner join	[Dawn_Data].Reference.NoteType				nt	on	nt.NoteTypeID	= ln.fkNoteTypeId
		INNER JOIN  [Dawn_Data].[Reference].[NoteSubCategory]	nsc ON	ln.fkSubKeyId	= nsc.[NoteSubCategoryId] -- 200180717. PW
	where	
		r.fkLoanId	=	@LoanId and 
		r.isactive	=	1
		and r.ExtendedmaturityDate is not null
		--and r.ExtendedmaturityDate >r.Created
		and nt.NoteType like '%Extend%'
		and nt.NoteType like '%Maturity%'
	order by isnull(r.LastUpdate,r.Created) desc

end
GO
/****** Object:  StoredProcedure [Loan].[LegalEntityActiveUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LegalEntityActiveUpd]
	@LoanId Int,
	@LegalEntityId Int,
	@IsActive bit,
	@User NVarChar(255)

AS

SET NOCOUNT ON

UPDATE Dawn_Data.Loan.ParticipantOfCase
SET IsActive = @IsActive,
	LastUpdate = GETDATE(),
	LastUpdateBy = @User
WHERE FkLoanId = @LoanId
  AND FkLegalEntityId = @LegalEntityId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[LegalEntityByLoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------------------------------------------------------------------------------------------
-- Legal entity regn number
-----------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE [Loan].[LegalEntityByLoanGet]	@LoanId Int,
												@LegalEntityId Int
as begin
	--PJR 2017.8.1 added legalentitynumber re: Len-83
	set nocount on

	SELECT 
		 p.FkLoanId				As LoanId
		,e.LegalEntityId
		,e.LegalEntityName
		,e.FkLegalEntityTypeId	As LegalEntityTypeId

		--PJR 2017.8.1 added
		,e.LegalEntityNumber
		,p.FKParticipantTypeId	As ParticipantTypeID
		,p.IsActive
		,p.IsPrimary

	from		Dawn_Data.Loan.LegalEntity			e
	inner join	Dawn_Data.Loan.ParticipantOfCase		p ON e.LegalEntityId = p.FkLegalEntityId
	where LegalEntityId = @LegalEntityId
		AND p.FkLoanId = @LoanId

end

GO
/****** Object:  StoredProcedure [Loan].[LegalEntityByTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[LegalEntityByTypeGet]
	@ParticipantTypeId Int,
	@ShowInactive bit
AS Begin

	set nocount on

/*		select	 distinct 
				e.LegalRepId			LegalEntityId
				,e.LegalRepName			LegalEntityName
				,p.FkParticipantTypeId	LegalEntityTypeId
		from Dawn_Data.Reference.LegalRepresentative e
		inner JOIN Dawn_Data.Loan.ParticipantOfCase p ON e.LegalRepId = p.FkLegalEntityId
		WHERE p.FkParticipantTypeId	=	@ParticipantTypeId
		ORDER BY LegalEntityName
*/

	if @ParticipantTypeId = 6 /*valuer*/
		select	 distinct
			 --e.SurveyorId					LegalEntityId
			 l.LegalEntityId
			,l.LegalEntityName
			,l.fkLegalEntityTypeId			LegalEntityTypeId
		from		Dawn_Data.[Loan].[Surveyor]		e
		inner join	Dawn_Data.[Loan].[LegalEntity]	l	on	l.LegalEntityId	=	e.fkLegalEntityId
		and l.IsActive=1
		ORDER BY LegalEntityName

	if @ParticipantTypeId not in (6)
		select distinct
								LegalEntityId, 
								LegalEntityName, 
								FkLegalEntityTypeId As LegalEntityTypeId
		FROM Dawn_Data.Loan.LegalEntity				e
		inner JOIN Dawn_Data.Loan.ParticipantOfCase	p ON e.LegalEntityId = p.FkLegalEntityId
		WHERE FkParticipantTypeId = @ParticipantTypeId
		ORDER BY LegalEntityName

end
GO
/****** Object:  StoredProcedure [Loan].[LegalEntityGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[LegalEntityGet]
	@LoanId Int,
	@LegalEntityId Int
AS Begin 
	SET NOCOUNT ON

	SELECT 
		p.FkLoanId As LoanId,
		e.LegalEntityId,
		e.LegalEntityName,
		e.FkLegalEntityTypeId As LegalEntityTypeId,
		p.FKParticipantTypeId As ParticipantTypeID,
		p.IsActive,
		p.IsPrimary
	FROM Dawn_Data.Loan.LegalEntity e
	JOIN Dawn_Data.Loan.ParticipantOfCase p ON e.LegalEntityId = p.FkLegalEntityId
	WHERE LegalEntityId = @LegalEntityId
		AND p.FkLoanId = @LoanId

end
GO
/****** Object:  StoredProcedure [Loan].[LegalEntityHide]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LegalEntityHide]
	@LoanId Int,
	@LegalEntityId Int,
	@IsActive bit,
	@User NVarChar(255)

AS

SET NOCOUNT ON

UPDATE Dawn_Data.Loan.ParticipantOfCase
SET IsActive = @IsActive,
	LastUpdate = GETDATE(),
	LastUpdateBy = @User
WHERE FkLoanId = @LoanId
  AND FkLegalEntityId = @LegalEntityId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[LegalEntityInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LegalEntityInsUpd]
	@LoanId Int,
	@LegalEntityId Int,
	@LegalEntityName NVarChar(512),
	@LegalEntityTypeId Int,
	@ParticipantTypeId Int,
	@LegalEntityNumber VarChar(50),
	@User NVarChar(255)
as Begin

	--PJR 2017.8.1 added legalentitynumber re: Len-83

	set nocount on

	IF (@LegalEntityId = 0)
		BEGIN
			INSERT INTO Dawn_Data.Loan.LegalEntity(LegalEntityName, LegalEntityNumber, FkLegalEntityTypeId, IsActive, Created, CreatedBy, LastUpdate, LastUpdateBy)
			SELECT @LegalEntityName,@LegalEntityNumber,@LegalEntityTypeId, 1, GETDATE(), @User, GETDATE(), @User

			SELECT @LegalEntityId = SCOPE_IDENTITY()

			INSERT INTO Dawn_Data.Loan.ParticipantOfCase(FkLoanId, FkContactId, FkLegalEntityId, FkParticipantTypeId, FKLegalRepresentativeId, CaseReference, 
				IsPrimary, IsActive, OnStatement, Created, CreatedBy, LastUpdate, LastUpdateBy)
			SELECT @LoanId, 0, @LegalEntityId, @ParticipantTypeId, 0, l.CBFL_id, 
				1, 1, 1, GETDATE(), @User, GETDATE(), @User
			FROM Dawn_Data.Loan.Loan l
			WHERE l.loan_id = @LoanId
		END
	ELSE
		UPDATE Dawn_Data.Loan.LegalEntity
		SET LegalEntityName = @LegalEntityName,
			LegalEntityNumber = @LegalEntityNumber,
			FkLegalEntityTypeId = @LegalEntityTypeId,
			LastUpdate = GETDATE(),
			LastUpdateBy = @User
		WHERE LegalEntityId = @LegalEntityId

	SELECT @LegalEntityId As LegalEntityId
end

GO
/****** Object:  StoredProcedure [Loan].[LiveLoansGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-07-04		Gurdeep			First version

*/

CREATE PROCEDURE [Loan].[LiveLoansGet]
	 @searchText nvarchar(100) = ''
	,@IncludeExistingSplits bit = 1
AS BEGIN
	SET NOCOUNT ON

	SELECT DISTINCT
	   L.CBFL_id AS CaseRef
	  ,ISNULL(lh.loan_amount, 0.0) + ISNULL(lh.TitleInsurance, 0.0) + ISNULL(lh.insurance_cost, 0.0) as PrincipalAdvance
	  ,l.loan_id as LoanId
	FROM 
		Dawn_Data.loan.Loan l
		inner join Dawn_Data.Loan.History lh on (lh.DIM_loan_id_SSK = l.Loan_Id)
		LEFT JOIN Dawn_Data.loan.FunderOfLoan fl ON (FL.fkLoanId = L.loan_id)
	WHERE
		(L.CBFL_id LIKE '%' + @searchText + '%' OR @searchText = '')
	AND (l.redeemed_date is null OR ISNULL(lh.loan_balance, 0) > 0)
	AND (fl.fkLoanId IS NULL OR @IncludeExistingSplits = 1)
	AND (LH.Division IS NOT NULL AND ISNULL(LH.ProductTypeID,0) <> 0 AND ISNULL(LH.ProductInterestTypeID,0) <> 0 AND LH.ProductTermCombination IS NOT NULL)
	ORDER BY 
		L.CBFL_id
END
GO
/****** Object:  StoredProcedure [Loan].[LoanAmountSummaryGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LoanAmountSummaryGet]
	@LoanId  int,
	@SummaryDate  DateTime
AS
BEGIN
	-- 'DIM-116': Modified: DVM: Bug-fix:  Fixing the 'Report.fn_getMarketValue()' parameter (- should be the case-reference & not the loan-id)

	SELECT
			H.AdministrationFee AS AdministrationFee,
			(
				SELECT
						SUM(Trx.Amount)
					FROM
						Dawn_Data.LoanCalc.[Transaction]  Trx
					WHERE
						Trx.Transaction_Type = 8 AND
						Trx.loan_id = @LoanId
			) As Drawdowns,
			H.Gross_Loan AS GrossLoan,
			H.Legal_Cost AS LegalCost,
			Report.fn_getMarketValue(H.CBFL_id) AS MarketValue,
			H.loan_amount + H.insurance_cost + H.TitleInsurance AS NetLoan,
			H.Total_Facility AS TotalFacility,
			isnull(H.loan_balance,0) as LoanBalance
		FROM
			Dawn_Data.Loan.History  H
		WHERE
			H.DIM_loan_id_SSK = @loanId;
END
GO
/****** Object:  StoredProcedure [Loan].[LoanAuxExitStrategyGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [Loan].[LoanAuxExitStrategyGet] @LoanId Int
as begin
	set nocount on

	IF EXISTS (SELECT * FROM Dawn_Data.Loan.LoanAux WHERE fkLoanId = @LoanId)
		SELECT 
			fkLoanId As LoanId,
			--fkActualExitStrategyId As ActualExitStrategyId,  --20170920.PW
			--fkPlannedExitStrategyId As PlannedExitStrategyId
			
			fkActualExitStrategyId		As ActualExitStrategyId,	--PJR -PW didn't know how this works!
			fkPlannedExitStrategyId		As PlannedExitStrategyId

		FROM Dawn_Data.Loan.LoanAux
		WHERE fkLoanId = @LoanId
	ELSE
		SELECT
			@LoanId As LoanId,
			--(SELECT TOP 1 ExitStrategyId FROM Dawn_Data.Loan.ExitStrategy WHERE IsActive = 1 ORDER BY DisplayOrder) 
			null As ActualExitStrategyId,
			null  As PlannedExitStrategyId
			--(SELECT TOP 1 ExitStrategyId FROM Dawn_Data.Loan.ExitStrategy WHERE IsActive = 1 ORDER BY DisplayOrder) As PlannedExitStrategyId
end
GO
/****** Object:  StoredProcedure [Loan].[LoanAuxExitStrategyInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LoanAuxExitStrategyInsUpd]
	@LoanId Int,
	@PlannedExitStrategyId Int,
	@ActualExitStrategyId Int,
	@User NVarChar(255)
as begin
	/*	Version	Date	Author			Decription
		1.00	2015	?AK/PW/PJR		Initial
		1.01	8.1.18	PJR				put in set nocount / set strategy to null if 0 -> this is key to devexpress
	*/

	set nocount on
	IF EXISTS (SELECT * FROM Dawn_Data.Loan.LoanAux WHERE fkLoanId = @LoanId)
		UPDATE Dawn_Data.Loan.LoanAux
		SET fkPlannedExitStrategyId = case when @PlannedExitStrategyId=0 then null else @PlannedExitStrategyId end,
			fkActualExitStrategyId = case when @ActualExitStrategyId=0 then null else @ActualExitStrategyId end,
			Created = GETDATE(),
			CreatedBy = @User
		WHERE fkLoanId = @LoanId
	ELSE
		INSERT INTO Dawn_Data.Loan.LoanAux(fkLoanId, fkPlannedExitStrategyId, fkActualExitStrategyId, Created, CreatedBy, LastUpdate, LastUpdateBy)
		SELECT @LoanId,  case when @PlannedExitStrategyId=0 then null else @PlannedExitStrategyId end, case when @ActualExitStrategyId=0 then null else @ActualExitStrategyId end, GETDATE(), @User, GETDATE(), @User
end
GO
/****** Object:  StoredProcedure [Loan].[LoanAuxIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[LoanAuxIns]	 @LoanId				int
							,@ExitStrategyId		int
							,@OwnerId				int
							,@RedemptionMethodId	int
							,@LoanBriefDesc			varchar(255)
							,@LoanFullDesc			varchar(1024)
							,@UserId				int
							,@message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try

		if not exists(select * from [Dawn_Data].Loan.[LoanAux] where [fkLoanId]=@LoanId)
			begin
				insert  [Dawn_Data].Loan.[LoanAux] (
						[fkLoanId]
					   ,fkPlannedExitStrategyId
					   ,[fkOwnerId]
					   ,[fkRedemptionMethodId]
					   ,[LoanBriefDesc]
					   ,[LoanFullDesc]
					   ,CreatedBy
				) values (
					 @LoanId
					,@ExitStrategyId
					,@OwnerId
					,@RedemptionMethodId
					,@LoanBriefDesc
					,@LoanFullDesc
					,@UserId
				)
				set @rc=0
			end
			else
			begin
				set @message = 'Error, Aux Loan Data Already Exists'
			end
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[LoanAuxRedemptionStatusGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LoanAuxRedemptionStatusGet]
	@LoanId Int
as begin

	--20160524 PJR prevent null LoanRedemptionStatusId
	IF EXISTS (SELECT * FROM Dawn_Data.Loan.LoanAux WHERE fkLoanId = @LoanId)
		SELECT 
			fkLoanId As LoanId,
			fkLoanRedemptionStatusId as LoanRedemptionStatusId
		FROM Dawn_Data.Loan.LoanAux
		WHERE fkLoanId = @LoanId
	ELSE
		SELECT
			@LoanId As LoanId,
			--(SELECT TOP 1 isnull(LoanRedemptionStatusId,0) FROM Dawn_Data.Reference.LoanRedemptionStatus ORDER BY DisplayOrder)
			null As LoanRedemptionStatusId
end
GO
/****** Object:  StoredProcedure [Loan].[LoanAuxRedemptionStatusInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LoanAuxRedemptionStatusInsUpd]
	@LoanId Int,
	@LoanRedemptionStatusId Int,
	@User NVarChar(255)
AS

IF EXISTS (SELECT * FROM Dawn_Data.Loan.LoanAux WHERE fkLoanId = @LoanId)
	UPDATE Dawn_Data.Loan.LoanAux
	SET fkLoanRedemptionStatusId = @LoanRedemptionStatusId,
		Created = GETDATE(),
		CreatedBy = @User
	WHERE fkLoanId = @LoanId
ELSE
	INSERT INTO Dawn_Data.Loan.LoanAux(fkLoanId, fkLoanRedemptionStatusId, Created, CreatedBy, LastUpdate, LastUpdateBy)
	SELECT @LoanId, @LoanRedemptionStatusId, GETDATE(), @User, GETDATE(), @User

GO
/****** Object:  StoredProcedure [Loan].[LoanAuxUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[LoanAuxUpd]	 @AuxLoanID				int
							,@ExitStrategyId		int
							,@OwnerId				int
							,@RedemptionMethodId	int
							,@LoanBriefDesc			varchar(255)
							,@LoanFullDesc			varchar(1024)
							,@UserId				int
							,@message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try

		update  [Dawn_Data].Loan.[LoanAux]
				set  fkPlannedExitStrategyId		=	case when @ExitStrategyId is not null then @ExitStrategyId else fkPlannedExitStrategyId end
					,[fkOwnerId]			=	case when @OwnerId is not null then @OwnerId else [fkOwnerId] end
					,[fkRedemptionMethodId] =	case when @RedemptionMethodId is not null then @RedemptionMethodId else [fkRedemptionMethodId] end
					,[LoanBriefDesc]		=	case when @LoanBriefDesc is not null then @LoanBriefDesc else [LoanBriefDesc] end
					,[LoanFullDesc]			=	case when @LoanFullDesc is not null then @LoanFullDesc else [LoanFullDesc] end
					,[Lastupdate]			=	getdate()
					,[LastUpdateBy]			=	@UserId
		where	AuxLoanID = @AuxLoanID

		set @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[LoanByCBFLIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[LoanByCBFLIdGet] 	 @LoanId		int
									,@Debug			tinyint	=	0
as begin
	set nocount on

	--;with CTE_Loan
 --   as (
	select	 l.loan_id
			,h.[DIM_loan_id_SSK]
			,h.[ProductType]
			,h.[completion_date]
			,h.[loan_to_security_id]
			,h.[principal]
			,h.[maturity_date]
			,h.[CBFL_id]
			,h.[Weblabs_id]
			,h.[facility_date]
			,h.[redeemed_date]
			,h.[enquiry_date]
			,h.[redemption_date]
			,h.[product_id]
			,h.[development_costs]
			,h.[development_time]
			,h.[type]
			,h.[monthly_int_amount]
			,h.[penalty_int_amount]
			,h.[int_type] 
			,h.[term]
			,h.[loan_amount]
			,h.[loan_adjustment]
			,h.[loan_balance]
			,h.[gross_loan]
			,h.[Total_Facility]
			,h.[Total_FurtherAdvance]
			,h.[monthly_cbfl_interest_percent]
			,h.[monthly_broker_interest_rate]
			,h.[arrangement_fee_in_percentage]
			,h.[arrangement_fee_out_percentage] 
			,h.[arrangement_fee_Flat]
			,h.[broker_flat_fee] 
			,h.[broker_fee_in_percentage]
			,h.[broker_fee_out_percentage]
			,h.[Broker_fee_ActuallyPaidOut]
			,h.[interest_amount]
			,h.[interest_adjustments] 
			,h.[interest_balance]
			,h.[other_fees]
			,h.[solicitor]
			,h.[solicitor_fee]
			,h.[legal_cost]
			,h.[bank_charge]
			,h.[CBFL_insurance]
			,h.[CBFL_legals]
			,h.[insurance_cost]
			,h.[staged_redemptions]
			,h.[loan_rolled] 
			,h.[rolled_date]
			,h.[further_releases]
			,h.[percent_utilisation]
			,h.[additional_funding]
			,h.[additional_amount]
			,h.[reciever_appointed]
			,h.[receiver_date]
			,h.[repossed]
			,h.[rebate] 
			,h.[rebate_amount]
			,h.[shortfall]
			,h.[checked]
			,h.[loan_notes]
			,h.[broker_fee_outInterestRate]
			,h.[TrailerFeeInterestDueToBroker]
			,h.[DocFolder]
			,h.[LoanStatus]
			,h.[DocFolder1]
			,h.[DocFolder2]
			,h.[DocFolder3]
			,h.[DocFolder4]
			,h.[DocFolder5]
			,h.[StartDate]
			,h.[EndDate]
			,h.[TermInDays]
			,h.[RedemptionDate]
			,h.[ArrangementFeeForFund%]
			,h.[ArrangementFeeForFund]
			,h.[MonthlyInterest]
			,h.[InterestOnFurtherAdvances]
			,h.[TotalInitialInterest]
			,h.[TotalNominalDueBack]
			,h.[AccrueToDate]
			,h.[DailyInterest]
			,h.[DaysPast]
			,h.[Interest accrued] 
			,h.[Interest accrued on further advances]
			,h.[Total_Committed]
			,h.[DateCalculated]
			,h.[CalcualtionMethodology]
			,h.[RollUpMonthlyInterest]
			,h.[RollUpLoan]
			,h.[CalcAdjustmentsFromStart]
			,h.[ExcludeLegalFees] 
			,h.[ExcludeInsuranceFee]
			,h.[Ignore]
			,h.[CalculationOK]
			,h.[SSMA_TimeStamp]
			,h.[Staff_ID]
			,h.[dteDate]
			,h.[dteDateUpdated]
			,h.[SCDStartDate] 
			,h.[SCDEndDate] 
			,h.[SCDStatus]
			,h.[Further_Advances]
			,h.[Net_interest_rate]
			,h.[Total_Further_Advances]
			,h.[Interest_on_further_advances]
			,h.[Total_Repayments]
			,h.[ArrangementFeeTOTAL%]
			,h.[ProductNames] 
			,h.[ProductDescription]
			,h.[ProductNamesID] 
			,h.[ProductTypeID]  
			,h.[ProductTermCombinationsID]
			,h.[TermMonthID]
			,h.[ProductInterestTypeID]
			,h.[InterestTypeID]
			,l.maturity_date AS maturity_dateOrg
			,l.facility_date AS facility_dateOrg
			,l.redeemed_date AS redeemed_dateOrg
			,l.redemption_date AS redemption_dateOrg
			,l.term AS termOrg
			,l.loan_amount AS loan_amountOrg
			,l.loan_balance AS loan_balanceOrg
			,l.gross_loan AS gross_loanOrg
			,l.Total_Facility AS Total_FacilityOrg
			,l.completion_date AS completion_dateOrg
			,l.Total_FurtherAdvance AS Total_FurtherAdvanceOrg 
		from		Loan.Loan			l 
		left join	Loan.Loan_History	h	ON l.loan_id = h.DIM_loan_id_SSK
		where	l.loan_id = @LoanId
	--)

	--select	*
	--into	#l
	--from	CTE_Loan

	--alter table #l add primary key (loan_id)

	--select  loan_id
	--		,[DIM_loan_id_SSK]    ,[ProductType]    ,[completion_date]    ,[loan_to_security_id]    ,[principal]
	--		,[maturity_date]
	--		,[CBFL_id]
	--		,[Weblabs_id]
	--		,[facility_date]    ,[redeemed_date]    ,[enquiry_date]    ,[redemption_date]
	--		,[product_id]    ,[development_costs]    ,[development_time]    ,[type]
	--		,[monthly_int_amount]    ,[penalty_int_amount]
	--		,[int_type]    ,[term]
	--		,[loan_amount]    ,[loan_adjustment]    ,[loan_balance]    ,[gross_loan]
	--		,[Total_Facility] ,[Total_FurtherAdvance]
	--		,[monthly_cbfl_interest_percent]    ,[monthly_broker_interest_rate]
	--		,[arrangement_fee_in_percentage]    ,[arrangement_fee_out_percentage]    ,[arrangement_fee_Flat]
	--		,[broker_flat_fee]    ,[broker_fee_in_percentage]    ,[broker_fee_out_percentage]    ,[Broker_fee_ActuallyPaidOut]
	--		,[interest_amount]    ,[interest_adjustments]    ,[interest_balance]    ,[other_fees]
	--		,[solicitor]    ,[solicitor_fee]
	--		,[legal_cost]
	--		,[bank_charge]
	--		,[CBFL_insurance]    ,[CBFL_legals]
	--		,[insurance_cost]
	--		,[staged_redemptions]
	--		,[loan_rolled]    ,[rolled_date]
	--		,[further_releases]
	--		,[percent_utilisation]
	--		,[additional_funding]    ,[additional_amount]
	--		,[reciever_appointed]    ,[receiver_date]
	--		,[repossed]
	--		,[rebate]    ,[rebate_amount]
	--		,[shortfall]
	--		,[checked]
	--		,[loan_notes]
	--		,[broker_fee_outInterestRate]
	--		,[TrailerFeeInterestDueToBroker]
	--		,[DocFolder]
	--		,[LoanStatus]
	--		,[DocFolder1]		,[DocFolder2]    ,[DocFolder3]    ,[DocFolder4]    ,[DocFolder5]
	--		,[StartDate]		,[EndDate]
	--		,[TermInDays]
	--		,[RedemptionDate]
	--		,[ArrangementFeeForFund%]    ,[ArrangementFeeForFund]
	--		,[MonthlyInterest]
	--		,[InterestOnFurtherAdvances]
	--		,[TotalInitialInterest]    ,[TotalNominalDueBack]
	--		,[AccrueToDate]
	--		,[DailyInterest]
	--		,[DaysPast]
	--		,[Interest accrued]    ,[Interest accrued on further advances]
	--		,[Total_Committed]
	--		,[DateCalculated]
	--		,[CalcualtionMethodology]
	--		,[RollUpMonthlyInterest]
	--		,[RollUpLoan]
	--		,[CalcAdjustmentsFromStart]
	--		,[ExcludeLegalFees]    ,[ExcludeInsuranceFee]
	--		,[Ignore]
	--		,[CalculationOK]
	--		,[SSMA_TimeStamp]
	--		,[Staff_ID]
	--		,[dteDate]
	--		,[dteDateUpdated]
	--		,[SCDStartDate]    ,[SCDEndDate]    ,[SCDStatus]
	--		,[Further_Advances]
	--		,[Net_interest_rate]
	--		,[Total_Further_Advances]    ,[Interest_on_further_advances]    ,[Total_Repayments]
	--		,[ArrangementFeeTOTAL%]
	--		,[ProductNames]    ,[ProductDescription]    ,[ProductNamesID]    ,[ProductTypeID]    ,[ProductTermCombinationsID]
	--		,[TermMonthID]
	--		,[ProductInterestTypeID]
	--		,[InterestTypeID]
	--		,maturity_dateOrg	,facility_dateOrg	,redeemed_dateOrg	,redemption_dateOrg
	--		,term AS termOrg
	--		,loan_amountOrg	,loan_balanceOrg	,gross_loanOrg
	--		,Total_FacilityOrg
	--		,completion_dateOrg
	--		,Total_FurtherAdvanceOrg 

	--		from #l
end
GO
/****** Object:  StoredProcedure [Loan].[LoanByCBFLIdList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[LoanByCBFLIdList] 	@PageSize		smallint =	20
										,@PageNo		smallint =	0
										,@Filter		varchar(255)
										,@FilterType	varchar(255)
										,@Order			varchar(32)
										,@Debug			tinyint	=	0
as begin

	set nocount on
	set rowcount @Pagesize
	--set Fmtonly on

	declare @StartRId int , @EndRid int

	if @PageNo<>0 begin
		select	 @StartRId	=	@PageSize * (@PageNo-1) +1
				,@EndRid	=	@PageSize * (@PageNo-1) + @PageSize
		
	end
	else
		select	 @StartRId	=	1
				,@EndRid	=	@PageSize

	--if @debug>0
	--	select	 @StartRId	,	@EndRid

	--;with CTE_Loan
 --   as (
	--select	 ROW_NUMBER() OVER	(ORDER BY 
	--									 case when @Filter is not null and @FilterType = 'cbfl'		and @Order='ASC'	then h.[CBFL_id] end ASC
	--									,case when @Filter is not null and @FilterType = 'cbfl'		and @Order='DESC'	then h.[CBFL_id] end DESC
	--									--,case when @Filter is not null and @FilterType = 'postcode' and @Order='ASC'	then h.[CBFL_id] end ASC
	--									--,case when @Filter is not null and @FilterType = 'postcode' and @Order='DESC'	then h.[CBFL_id] end DESC
	--							) AS Rid
	--		,l.loan_id
	--		,h.[CBFL_id]
	--	from		Loan.Loan		l 
	--	left join	Loan.Loan_History	h	ON l.loan_id = h.DIM_loan_id_SSK
	--	where	h.[CBFL_id] like case when @Filter is not null and @FilterType='cbfl' then '%' + @Filter + '%' else h.[CBFL_id] end
	--)

	--create table loan.temploan (rid int,loan_id int primary key,cbfl_id nvarchar(255))
	delete loan.temploan

	insert loan.temploan(rid,loan_id,cbfl_id)
	select	 ROW_NUMBER() OVER	(ORDER BY 
										 case when @Filter is not null and @FilterType = 'cbfl'		and @Order='ASC'	then h.[CBFL_id] end ASC
										,case when @Filter is not null and @FilterType = 'cbfl'		and @Order='DESC'	then h.[CBFL_id] end DESC
										--,case when @Filter is not null and @FilterType = 'postcode' and @Order='ASC'	then h.[CBFL_id] end ASC
										--,case when @Filter is not null and @FilterType = 'postcode' and @Order='DESC'	then h.[CBFL_id] end DESC
								) AS Rid
			,l.loan_id
			,h.[CBFL_id]
		from		Loan.Loan		l 
		left join	Loan.Loan_History	h	ON l.loan_id = h.DIM_loan_id_SSK
		where	h.[CBFL_id] like case when @Filter is not null and @FilterType='cbfl' then '%' + @Filter + '%' else h.[CBFL_id] end

	select rid,loan_id,cbfl_id
	from loan.temploan --CTE_Loan
	where Rid between @StartRId and @EndRid	
	order by RId

end
GO
/****** Object:  StoredProcedure [Loan].[LoanContactIsPrimaryUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [Loan].[LoanContactIsPrimaryUpd]
	@LoanId				Int,
	@ContactId			Int,
	@LegalEntityId		Int,
	@ParticipantType	Tinyint,
	@User				NVarChar(255)
	AS
Begin
	-- PR v1.0 8.8.17
	set nocount on

	if @LegalEntityId<>0
		update Dawn_Data.Loan.ContactOfLegalentity
			set isPrimary = case when fkContactId = @ContactId then 1 else 0 end
				,IsActive = case when isActive=0 and fkContactId = @ContactId then 1 else IsActive end
				,LastUpdateBy = @User
				,Lastupdate	=	getdate()
		where FkLegalEntityId = @LegalEntityId
	
	else
		update Dawn_Data.Loan.ParticipantOfCase
			set isPrimary = case when fkContactId = @ContactId then 1 else 0 end
				,IsActive = case when isActive=0 and fkContactId = @ContactId then 1 else IsActive end
				,LastUpdateBy = @User
				,Lastupdate	=	getdate()
		where FkLoanId = @LoanId
			and FKParticipantTypeId = @ParticipantType
End
GO
/****** Object:  StoredProcedure [Loan].[LoanDetailSearchGlobalList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  proc  [Loan].[LoanDetailSearchGlobalList]	@SearchText varchar(255) , @UnRedeemed int,  @OrderBy int as begin

--declare @SearchText varchar(255) , @UnRedeemed int,  @OrderBy int
--select @SearchText ='7576', @UnRedeemed=0,  @OrderBy=0

		--2017.1.31 PJR init ver 1.00
		--2017.6.1	PJR init ver 1.01
		--2017.9.8  PJR now getting correct pri borro
		set nocount on

		select 	l.loan_id					as LoanId,
				l.CBFL_id					as LoanReference,
				--ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId) As ContactRowNumber,
				ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY cl.isprimary desc) As ContactRowNumber,
				ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id) As SecurityRowNumber,
				COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '') As PrimaryContactName,
				s.address_1					as Address1,
				s.address_2					as Address2,
				s.address_3					as Address3,
				s.address_4					as Address4,
				lc.FKParticipantTypeId,
				s.County					as County,
				s.post_code					as PostCode
				,isnull(p.ProductCode,'')	as	ProductCode		
				,l.completion_date			as	CompletionDate
				,l.maturity_date			as	MaturityDate
				--,h.maturity_date			as	MaturityDate//PJR
				--,h.redeemed_date			as	RedeemedDate//PJR
				,l.redeemed_date			as	RedeemedDate
				--,cl.IsPrimary
				--,c.ContactId				as	ContactId
			into #TempLoanDetails
			from		Dawn_Data.Loan.Loan					l
			left join	Dawn_Data.Loan.history				h	ON	h.DIM_loan_id_SSK	=	l.Loan_Id
			left join	Dawn_Data.Loan.ParticipantOfCase		lc	ON	l.loan_id			=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
			left join	Dawn_Data.Loan.ContactOfLegalEntity	cl	on	cl.fkLegalEntityId	=	lc.fkLegalEntityId
			left join	Dawn_Data.Loan.Contact				c	ON	c.ContactId			=	cl.FkContactId
			left join	Dawn_Data.Loan.SecurityMap			sm	ON	sm.loan_id			=	l.loan_id
			left join	Dawn_Data.Loan.[Security]			s	ON	s.security_id		=	sm.security_id
			left join	Dawn_Data.[Loan].[vwAllCaseProducts]	p	on	l.CBFL_id			=	p.CaseReference
			where	isnull(lc.fkContactid,0) = 0  and c.IsActive=1 				and sm.IsActive=1 
				and	(COALESCE(l.CBFL_id, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(c.FirstName, '') + ' ' + COALESCE(c.MiddleName, '') + ' ' + COALESCE(c.Surname, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(s.address_1, '') + ' ' + COALESCE(s.address_2, '') + ' ' + COALESCE(s.address_3, '') + ' ' + COALESCE(s.address_4, '') + ' ' + COALESCE(s.county, '') + ' ' + COALESCE(s.post_code, '') LIKE '%' + @SearchText + '%'
					)

		insert	#TempLoanDetails( LoanId,LoanReference,ContactRowNumber,SecurityRowNumber,PrimaryContactName,
			Address1,Address2,Address3,Address4,lc.FKParticipantTypeId,County,PostCode,ProductCode,CompletionDate
			,MaturityDate,RedeemedDate)--,IsPrimary,ContactId )
		select 	l.loan_id					as LoanId,
				l.CBFL_id					as LoanReference,
				--ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId) As ContactRowNumber,
				ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY lc.isprimary desc) As ContactRowNumber,
				ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id) As SecurityRowNumber,
				COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '') As PrimaryContactName,
				s.address_1					as Address1,
				s.address_2					as Address2,
				s.address_3					as Address3,
				s.address_4					as Address4,
				lc.FKParticipantTypeId,
				s.County					as County,
				s.post_code					as PostCode
				,isnull(p.ProductCode,'')	as	ProductCode		
				,l.completion_date			as	CompletionDate
				--,h.maturity_date			as	MaturityDate
				,l.maturity_date			as	MaturityDate
				,l.redeemed_date			as	RedeemedDate
				--,lc.IsPrimary
				--,lc.fkContactId
			from		Dawn_Data.Loan.Loan					l
			left join	Dawn_Data.Loan.History				h	ON	h.DIM_loan_id_SSK	=	l.Loan_Id
			left join	Dawn_Data.Loan.ParticipantOfCase		lc	ON	l.loan_id			=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
			left join	Dawn_Data.Loan.Contact				c	ON	lc.FkContactId		=	c.ContactId
			left join	Dawn_Data.Loan.SecurityMap			sm	ON	l.loan_id			=	sm.loan_id
			left join	Dawn_Data.Loan.[Security]			s	ON	sm.security_id		=	s.security_id
			left join	Dawn_Data.[Loan].[vwAllCaseProducts]	p	on	p.CaseReference		=	l.CBFL_id
			WHERE	isnull(lc.fkContactid,0) <> 0
				and c.IsActive=1
				and sm.IsActive=1 
				and	(COALESCE(l.CBFL_id, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(c.FirstName, '') + ' ' + COALESCE(c.MiddleName, '') + ' ' + COALESCE(c.Surname, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(s.address_1, '') + ' ' + COALESCE(s.address_2, '') + ' ' + COALESCE(s.address_3, '') + ' ' + COALESCE(s.address_4, '') + ' ' + COALESCE(s.county, '') + ' ' + COALESCE(s.post_code, '') LIKE '%' + @SearchText + '%'
					)

	--select distinct * from #TempLoanDetails order by address1
	if @UnRedeemed=2
		delete #TempLoanDetails where RedeemedDate is not null

	select	distinct
			 LoanId
			,LoanReference
			,PrimaryContactName
			,isnull(ProductCode,'') ProductCode
			,CompletionDate
			,MaturityDate
			,RedeemedDate
	from	#TempLoanDetails
	where ContactRowNumber = 1
	--	AND SecurityRowNumber = 1
	order by LoanReference
	--order by	case when @OrderBy=2 then 
	--					PrimaryContactName
	--				else LoanReference
	--			end
	--			,LoanReference
end
GO
/****** Object:  StoredProcedure [Loan].[LoanDetailSearchGlobalList2]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  proc  [Loan].[LoanDetailSearchGlobalList2]	@SearchText varchar(255) , @UnRedeemed int,  @OrderBy int

as begin
		--2017.1.31 PJR init ver 1.00
		set nocount on

		select 	l.loan_id					as LoanId,
				l.CBFL_id					as LoanReference,
				ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId) As ContactRowNumber,
				ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id) As SecurityRowNumber,
				COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '') As PrimaryContactName,
				s.address_1					as Address1,
				s.address_2					as Address2,
				s.address_3					as Address3,
				s.address_4					as Address4,
				lc.FKParticipantTypeId,
				s.County					as County,
				s.post_code					as PostCode
				,isnull(p.ProductCode,'')	as	ProductCode		
				,l.completion_date			as	CompletionDate
				,h.maturity_date			as	MaturityDate
				,h.redeemed_date			as	RedeemedDate
				--,cl.IsPrimary
				--,c.ContactId				as	ContactId
			into #TempLoanDetails
			from		Dawn_Data.Loan.Loan					l
			left join	Dawn_Data.Loan.history				h	ON	h.DIM_loan_id_SSK	=	l.Loan_Id
			left join	Dawn_Data.Loan.ParticipantOfCase		lc	ON	l.loan_id			=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
			left join	Dawn_Data.Loan.ContactOfLegalEntity	cl	on	cl.fkLegalEntityId	=	lc.fkLegalEntityId
			left join	Dawn_Data.Loan.Contact				c	ON	c.ContactId			=	cl.FkContactId
			left join	Dawn_Data.Loan.SecurityMap			sm	ON	sm.loan_id			=	l.loan_id
			left join	Dawn_Data.Loan.[Security]			s	ON	s.security_id		=	sm.security_id
			left join	Dawn_Data.[Loan].[vwAllCaseProducts]	p	on	l.CBFL_id			=	p.CaseReference
			where	isnull(lc.fkContactid,0) = 0  and c.IsActive=1 				and sm.IsActive=1 
				and	(COALESCE(l.CBFL_id, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(c.FirstName, '') + ' ' + COALESCE(c.MiddleName, '') + ' ' + COALESCE(c.Surname, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(s.address_1, '') + ' ' + COALESCE(s.address_2, '') + ' ' + COALESCE(s.address_3, '') + ' ' + COALESCE(s.address_4, '') + ' ' + COALESCE(s.county, '') + ' ' + COALESCE(s.post_code, '') LIKE '%' + @SearchText + '%'
					)

		insert	#TempLoanDetails( LoanId,LoanReference,ContactRowNumber,SecurityRowNumber,PrimaryContactName,
			Address1,Address2,Address3,Address4,lc.FKParticipantTypeId,County,PostCode,ProductCode,CompletionDate
			,MaturityDate,RedeemedDate)--,IsPrimary,ContactId )
		select 	l.loan_id					as LoanId,
				l.CBFL_id					as LoanReference,
				ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId) As ContactRowNumber,
				ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id) As SecurityRowNumber,
				COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '') As PrimaryContactName,
				s.address_1					as Address1,
				s.address_2					as Address2,
				s.address_3					as Address3,
				s.address_4					as Address4,
				lc.FKParticipantTypeId,
				s.County					as County,
				s.post_code					as PostCode
				,isnull(p.ProductCode,'')	as	ProductCode		
				,l.completion_date			as	CompletionDate
				,h.maturity_date			as	MaturityDate
				,l.redeemed_date			as	RedeemedDate
				--,lc.IsPrimary
				--,lc.fkContactId
			from		Dawn_Data.Loan.Loan					l
			left join	Dawn_Data.Loan.History				h	ON	h.DIM_loan_id_SSK	=	l.Loan_Id
			left join	Dawn_Data.Loan.ParticipantOfCase		lc	ON	l.loan_id			=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
			left join	Dawn_Data.Loan.Contact				c	ON	lc.FkContactId		=	c.ContactId
			left join	Dawn_Data.Loan.SecurityMap			sm	ON	l.loan_id			=	sm.loan_id
			left join	Dawn_Data.Loan.[Security]			s	ON	sm.security_id		=	s.security_id
			left join	Dawn_Data.[Loan].[vwAllCaseProducts]	p	on	p.CaseReference		=	l.CBFL_id
			WHERE	isnull(lc.fkContactid,0) <> 0
				and c.IsActive=1
				and sm.IsActive=1 
				and	(COALESCE(l.CBFL_id, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(c.FirstName, '') + ' ' + COALESCE(c.MiddleName, '') + ' ' + COALESCE(c.Surname, '') LIKE '%' + @SearchText + '%'
					OR COALESCE(s.address_1, '') + ' ' + COALESCE(s.address_2, '') + ' ' + COALESCE(s.address_3, '') + ' ' + COALESCE(s.address_4, '') + ' ' + COALESCE(s.county, '') + ' ' + COALESCE(s.post_code, '') LIKE '%' + @SearchText + '%'
					)

--select distinct * from #TempLoanDetails
		order by address1

	if @UnRedeemed=2
		delete #TempLoanDetails where RedeemedDate is not null

	select	distinct
			 LoanId
			,LoanReference
			,PrimaryContactName
			,isnull(ProductCode,'') ProductCode
			,CompletionDate
			,MaturityDate
			,RedeemedDate
	from	#TempLoanDetails
	where ContactRowNumber = 1
	--	AND SecurityRowNumber = 1
	order by LoanReference
	--order by	case when @OrderBy=2 then 
	--					PrimaryContactName
	--				else LoanReference
	--			end
	--			,LoanReference

end
GO
/****** Object:  StoredProcedure [Loan].[LoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LoanGet]
	@LoanId		int = NULL,
	@Debug		tinyint	= 0
AS BEGIN
	SET NOCOUNT ON

	SELECT
			l.loan_id As LoanId
			,h.[DIM_loan_id_SSK]    
			,h.[ProductType]    
			,h.[completion_date] As CompletionDate
			,h.[loan_to_security_id] As LoanToSecurityId
			,h.[principal]

			--,Reference.fn_CalculateMaturityDate(h.completion_date, h.ProductTermCombination) As MaturityDate
			--PW said exclude 1 and 3 in 11.12.17
			,(select top 1 max(i.InterestEndDate)	from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i	where loan_id=l.loan_id and cashflowInterest_type not in (1,3))  As MaturityDate
			,Reference.fn_CalculateMaturityDate(l.loan_id) As MaturityDate
			,h.[CBFL_id] As LoanReference
			,h.[Weblabs_id] As WeblabsId

			,CONVERT(DateTime, h.[facility_date], 103) As FacilityDate

			,l.[redeemed_date] As RedeemedDate
			,CASE 
				WHEN DATEDIFF(m, h.maturity_date, h.redeemed_date) < 0 THEN 0 
				ELSE DATEDIFF(m, h.maturity_date, h.redeemed_date) 
			END As LoanDefault
			,h.[enquiry_date] As EnquiryDate
			,h.[redeemed_date] As RedemptionDate
			,h.[product_id] As ProductId
			,h.[development_costs] As DevelopmentCosts
			,h.[development_time] As DevelopmentTime
			,h.[type] As Type
			,h.[monthly_int_amount] * 100 As MonthlyInterestAmount
			,h.[penalty_int_amount] * 100 As PenaltyInterestAmount
			,h.[int_type] As InterestType
			,h.[term]
			,h.[loan_amount] As LoanAmount
			,h.[loan_adjustment] As LoanAdjustment   
			,h.[loan_balance] As LoanBalance
			,h.[gross_loan] As GrossLoan
			,h.[Total_Facility] As TotalFacility
			,h.[Total_FurtherAdvance] As TotalFurtherAdvance
			,h.[monthly_cbfl_interest_percent] As MonthlyInterestPercent -- doesn't seem to contain anything
			,h.[monthly_broker_interest_rate] As MonthlyBrokerInterestRate
			,h.[arrangement_fee_Flat] As ArrangementFeeInFlat
			,h.[arrangement_fee_in_percentage] * 100 As ArrangementFeeInPercentage

			--PJR 1.12.16
			,case when isnull(h.[arrangement_fee_flat],0)>0  then  h.[arrangement_fee_flat] else h.[arrangement_fee_in_percentage] * h.[gross_loan] end
				 As ArrangementFeeInTotal

			,h.[arrangement_fee_out_percentage] * 100 As ArrangementFeeOutPercentage
			,h.[arrangement_fee_out_percentage] * h.[gross_loan] As ArrangementFeeOutTotal
			,h.[broker_flat_fee] As BrokerFlatFee
			,h.[broker_fee_in_percentage] * 100 As BrokerFeeInPercentage
			,h.[broker_fee_out_percentage] * 100 As BrokerFeeOutPercentage
			,h.[Broker_fee_ActuallyPaidOut] As BrokerFeeActuallyPaidOut
			,h.[interest_amount] As InterestAmount
			,h.[interest_adjustments] As InterestAdjustments
			,h.[interest_balance] As InterestBalance
			,h.[other_fees] As OtherFees
			,h.[solicitor] As SolicitorId
			,h.[solicitor_fee] As SolicitorFee
			,h.[legal_cost] As LegalCost
			,h.[bank_charge] As BankCharge
			,h.[CBFL_insurance] As InternalInsurance
			,h.[CBFL_legals] As Legals
			,h.[insurance_cost] As InsuranceCost
			,h.[TitleInsurance]
			,h.[staged_redemptions] As StagedRedemptions
			,h.[loan_rolled] As LoanRolled
			,h.[rolled_date] As RolledDate
			,h.[further_releases] As FurtherReleases
			,h.[percent_utilisation] As PercentUtilisation
			,h.[additional_funding] As AdditionalFunding
			,h.[additional_amount] As AdditionalFundingAmount
			,h.[reciever_appointed] As ReceiverAppointed
			,h.[receiver_date] As ReceiverDate
			,h.[repossed] 
			,h.[rebate] 
			,h.[rebate_amount] As RebateAmount
			,h.[shortfall] 
			,h.[checked]
			,h.[loan_notes] As LoanNotes
			,h.[broker_fee_outInterestRate] As BrokerFeeOutInterestRate
			,h.[TrailerFeeInterestDueToBroker] 
			,h.[DocFolder]
			,h.[LoanStatus]
			,h.[DocFolder1]		
			,h.[DocFolder2]    
			,h.[DocFolder3]    
			,h.[DocFolder4]    
			,h.[DocFolder5]
			,h.[StartDate]		
			,h.[EndDate]
			,h.[TermInDays]
			,h.[ArrangementFeeForFund%] As ArrangementFeeForFundPercentage
			,h.[ArrangementFeeForFund]
			,h.[MonthlyInterest]
			,h.[InterestOnFurtherAdvances]
			,h.[TotalInitialInterest]    
			,h.[TotalNominalDueBack]
			,h.[AccrueToDate]
			,h.[DailyInterest]
			,h.[DaysPast]
			,h.[Interest accrued] As InterestAccrued    
			,h.[Interest accrued on further advances] As InterestAccruedOnFurtherAdvances
			,h.[Total_Committed] As TotalCommitted
			,h.[DateCalculated] 
			,h.[CalcualtionMethodology]
			,h.[RollUpMonthlyInterest]
			,h.[RollUpLoan]
			,h.[CalcAdjustmentsFromStart]
			,h.[ExcludeLegalFees]    
			,h.[ExcludeInsuranceFee]
			,h.[Ignore]
			,h.[CalculationOK]
			,h.[SSMA_TimeStamp] As Timestamp
			,h.[Staff_ID] As StaffId
			,h.[dteDate] As DateCreated --Guessing!
			,h.[dteDateUpdated] As DateUpdated
			,h.[SCDStartDate]    
			,h.[SCDEndDate]    
			,h.[SCDStatus]
			,h.[Further_Advances] As FurtherAdvances
			,h.[Net_interest_rate] As NetInterestRate
			,h.[Total_Further_Advances] As TotalFurtherAdvances
			,h.[Interest_on_further_advances] As InterestOnFurtherAdvances
			,h.[Total_Repayments] As TotalRepayments
			,h.[ArrangementFeeTOTAL%] As TotalArrangementFee
			,h.[ProductNames]    
			,h.[ProductDescription]    
			,h.[ProductNamesID]    
			,h.[ProductTypeID]    
			,h.[ProductTermCombinationsID]
			,h.[TermMonthID]
			,h.[ProductInterestTypeID]
			,h.[InterestTypeID]
			,h.ProductTermCombination
			,h.AdministrationFee
			,h.arrangement_fee_out_Value AS ArrangementFeeOutFlat
		from		Dawn_Data.Loan.Loan				l
		left join	Dawn_Data.Loan.History			h	on	l.loan_id		=	h.DIM_loan_id_SSK
		where	(@LoanId IS NULL OR l.loan_id = @LoanId)

	select	 l.loan_id As LoanId
			--,Reference.fn_CalculateMaturityDate(h.completion_date, h.ProductTermCombination) As MaturityDate
			--,l.maturity_date AS MaturityDate	
			,Reference.fn_CalculateMaturityDate(l.loan_id) As MaturityDate
			,l.facility_date AS FacilityDate
			,l.redeemed_date AS RedeemedDate
			,l.redemption_date AS RedemptionDate
			,l.term AS Term
			,l.loan_amount AS LoanAmount
			,l.loan_balance AS LoanBalance
			,l.gross_loan AS GrossLoan
			,l.Total_Facility AS TotalFacility
			,l.completion_date AS CompletionDate
			,l.Total_FurtherAdvance AS TotalFurtherAdvance
		from		Dawn_Data.Loan.Loan				l
		left join	Dawn_Data.Loan.History			h	on	l.loan_id		=	h.DIM_loan_id_SSK
		where	(@LoanId IS NULL OR l.loan_id = @LoanId)
END
GO
/****** Object:  StoredProcedure [Loan].[LoanGetLoanDetail]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LoanGetLoanDetail]
	@LoanId  INT,
	@Debug  TINYINT = 0
AS
BEGIN
	-- 'DIM-116': Created: DVM:

	--2017.12.12 PJR Maturity date update

	SET NOCOUNT ON

	SELECT
			L.loan_id AS LoanId,
			H.[DIM_loan_id_SSK] AS DIM_loan_id_SSK,
			H.[ProductType] AS ProductType,
			H.[completion_date] AS CompletionDate,
			H.[loan_to_security_id] AS LoanToSecurityId,
			H.[principal] AS principal,
			/*
			l.checked lc,			
			h.checked hc,
			l.Maturity_Date lm,
			*/
			--case when l.checked=0
			--	then l.Maturity_Date
			--	else Reference.fn_CalculateMaturityDate(h.completion_date, h.ProductTermCombination) 
			--end MaturityDate,
			--Reference.fn_CalculateMaturityDate(h.completion_date, h.ProductTermCombination) As MaturityDate,
			--(select top 1 max(i.InterestEndDate)	from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i	where cashflowInterest_type not in (1,3) and loan_id=l.loan_id)  As MaturityDate,
			Reference.fn_CalculateMaturityDate(l.loan_id) As MaturityDate,

			H.[CBFL_id] AS LoanReference,
			H.[Weblabs_id] AS WeblabsId,
			CONVERT(DateTime, h.[facility_date], 103) AS FacilityDate,
			L.[redeemed_date] AS RedeemedDate,
			CASE
				WHEN
					DATEDIFF(m, h.maturity_date, h.redeemed_date) < 0
				THEN
					0
				ELSE
					DATEDIFF(m, h.maturity_date, h.redeemed_date)
			END AS LoanDefault,
			H.[enquiry_date] AS EnquiryDate,
			H.[redeemed_date] AS RedemptionDate,
			H.[product_id] AS ProductId,
			H.[development_costs] AS DevelopmentCosts,
			H.[development_time] AS DevelopmentTime,
			H.[type] AS [Type],
			H.[monthly_int_amount] * 100 AS MonthlyInterestAmount,
			H.[penalty_int_amount] * 100 AS PenaltyInterestAmount,
			H.[int_type] AS InterestType,
			H.[term] AS Term,
			H.[loan_amount] AS LoanAmount,
			H.[loan_adjustment] AS LoanAdjustment,
			H.[loan_balance] AS LoanBalance,
			H.[gross_loan] AS GrossLoan,
			H.[Total_Facility] AS TotalFacility,
			H.[Total_FurtherAdvance] AS TotalFurtherAdvance,
			H.[monthly_cbfl_interest_percent] AS MonthlyInterestPercent,
			H.[monthly_broker_interest_rate] AS MonthlyBrokerInterestRate,
			H.[arrangement_fee_Flat] AS ArrangementFeeInFlat,
			H.[arrangement_fee_in_percentage] * 100 AS ArrangementFeeInPercentage,
			-- DVM:  Adding the following change (to 'ArrangementFeeInTotal') taken from Prod but missing from source-control
			Case
				When
					IsNull(H.arrangement_fee_flat, 0) > 0
				Then
					H.arrangement_fee_flat
				Else
					H.arrangement_fee_in_percentage * h.gross_loan
			End AS ArrangementFeeInTotal,
			-- H.[arrangement_fee_flat] + h.[arrangement_fee_in_percentage] * h.[gross_loan] AS ArrangementFeeInTotal,
			H.[arrangement_fee_out_percentage] * 100 AS ArrangementFeeOutPercentage,
			H.[arrangement_fee_out_percentage] * h.[gross_loan] AS ArrangementFeeOutTotal,
			H.[broker_flat_fee] AS BrokerFlatFee,
			H.[broker_fee_in_percentage] * 100 AS BrokerFeeInPercentage,
			H.[broker_fee_out_percentage] * 100 AS BrokerFeeOutPercentage,
			H.[Broker_fee_ActuallyPaidOut] AS BrokerFeeActuallyPaidOut,
			H.[interest_amount] AS InterestAmount,
			H.[interest_adjustments] AS InterestAdjustments,
			H.[interest_balance] AS InterestBalance,
			H.[other_fees] AS OtherFees,
			H.[solicitor] AS SolicitorId,
			H.[solicitor_fee] AS SolicitorFee,
			isnull(H.[legal_cost],0.00) AS LegalCost,
			H.[bank_charge] AS BankCharge,
			H.[CBFL_insurance] AS InternalInsurance,
			H.[CBFL_legals] AS Legals,
			isnull(H.[insurance_cost],0.00) AS InsuranceCost,
			isnull(H.[TitleInsurance],0.00) AS TitleInsurance,
			H.[staged_redemptions] AS StagedRedemptions,
			H.[loan_rolled] AS LoanRolled,
			H.[rolled_date] AS RolledDate,
			H.[further_releases] AS FurtherReleases,
			H.[percent_utilisation] AS PercentUtilisation,
			H.[additional_funding] AS AdditionalFunding,
			H.[additional_amount] AS AdditionalFundingAmount,
			H.[reciever_appointed] AS ReceiverAppointed,
			H.[receiver_date] AS ReceiverDate,
			H.[repossed] AS Repossed,
			H.[rebate] AS Rebate,
			H.[rebate_amount] AS RebateAmount,
			H.[shortfall] AS Shortfall,
			H.[checked] AS Checked,
			H.[loan_notes] AS LoanNotes,
			H.[broker_fee_outInterestRate] AS BrokerFeeOutInterestRate,
			H.[TrailerFeeInterestDueToBroker] AS TrailerFeeInterestDueToBroker,
			H.[DocFolder] AS DocFolder,
			H.[LoanStatus] AS LoanStatus,
			H.[DocFolder1] AS DocFolder1,
			H.[DocFolder2] AS DocFolder2,
			H.[DocFolder3] AS DocFolder3,
			H.[DocFolder4] AS DocFolder4,
			H.[DocFolder5] AS DocFolder5,
			H.[StartDate] AS StartDate,
			H.[EndDate] AS EndDate,
			H.[TermInDays] AS TermInDays,
			H.[ArrangementFeeForFund%] AS ArrangementFeeForFundPercentage,
			H.[ArrangementFeeForFund] AS ArrangementFeeForFund,
			H.[MonthlyInterest] AS MonthlyInterest,
			H.[InterestOnFurtherAdvances] AS InterestOnFurtherAdvances,
			H.[TotalInitialInterest] AS TotalInitialInterest,
			H.[TotalNominalDueBack] AS TotalNominalDueBack,
			H.[AccrueToDate] AS AccrueToDate,
			H.[DailyInterest] AS DailyInterest,
			H.[DaysPast] AS DaysPast,
			H.[Interest accrued] AS InterestAccrued,
			H.[Interest accrued on further advances] AS InterestAccruedOnFurtherAdvances,
			H.[Total_Committed] AS TotalCommitted,
			H.[DateCalculated] AS DateCalculated,
			H.[CalcualtionMethodology] AS CalcualtionMethodology,
			H.[RollUpMonthlyInterest] AS RollUpMonthlyInterest,
			H.[RollUpLoan] AS RollUpLoan,
			H.[CalcAdjustmentsFromStart] AS CalcAdjustmentsFromStart,
			H.[ExcludeLegalFees] AS ExcludeLegalFees,
			H.[ExcludeInsuranceFee] AS ExcludeInsuranceFee,
			H.[Ignore] AS Ignore,
			H.[CalculationOK] AS CalculationOK,
			H.[SSMA_TimeStamp] AS [Timestamp],
			H.[Staff_ID] AS StaffId,
			H.[dteDate] AS DateCreated,
			H.[dteDateUpdated] AS DateUpdated,
			H.[SCDStartDate] AS SCDStartDate,
			H.[SCDEndDate] AS SCDEndDate,
			H.[SCDStatus] AS SCDStatus,
			H.[Further_Advances] AS FurtherAdvances,
			H.[Net_interest_rate] AS NetInterestRate,
			H.[Total_Further_Advances] AS TotalFurtherAdvances,
			H.[Interest_on_further_advances] AS InterestOnFurtherAdvances,
			H.[Total_Repayments] AS TotalRepayments,
			H.[ArrangementFeeTOTAL%] AS TotalArrangementFee,
			H.[ProductNames] AS ProductNames,
			H.[ProductDescription] AS ProductDescription,
			H.[ProductNamesID] AS ProductNamesID,
			H.[ProductTypeID] AS ProductTypeID,
			H.[ProductTermCombinationsID] AS ProductTermCombinationsID,
			H.[TermMonthID] AS TermMonthID,
			H.[ProductInterestTypeID] AS ProductInterestTypeID,
			H.[InterestTypeID] AS InterestTypeID,
			H.ProductTermCombination AS ProductTermCombination,
			H.AdministrationFee,
			H.arrangement_fee_out_Value AS ArrangementFeeOutFlat,
			LA.LoanPurpose AS LoanPurpose,
			LA.LoanPurposeReason AS LoanPurposeReason
			,p.ProductCode
		FROM		Dawn_Data.Loan.Loan		L
		LEFT JOIN	Dawn_Data.Loan.History	H	ON	H.DIM_loan_id_SSK = L.loan_id
		LEFT JOIN	Dawn_Data.Loan.LoanAux  LA	ON	LA.fkLoanId = L.loan_id
		left join	Dawn_Data.Loan.vwAllCaseProducts	p	on	p.CaseReference	=	l.CBFL_id
		WHERE	L.loan_id = @LoanId ;

		select	 l.loan_id As LoanId
			--,Reference.fn_CalculateMaturityDate(h.completion_date, h.ProductTermCombination) As MaturityDate
			--,l.maturity_date AS MaturityDate	
			,Reference.fn_CalculateMaturityDate(l.loan_id) As MaturityDate
			,l.facility_date AS FacilityDate
			,l.redeemed_date AS RedeemedDate
			,l.redemption_date AS RedemptionDate
			,l.term AS Term
			,l.loan_amount AS LoanAmount
			,l.loan_balance AS LoanBalance
			,l.gross_loan AS GrossLoan
			,l.Total_Facility AS TotalFacility
			,l.completion_date AS CompletionDate
			,l.Total_FurtherAdvance AS TotalFurtherAdvance

		from		Dawn_Data.Loan.Loan				l
		left join	Dawn_Data.Loan.History			h	on	l.loan_id		=	h.DIM_loan_id_SSK
		where	(@LoanId IS NULL OR l.loan_id = @LoanId)

	--SELECT
	--		L.loan_id AS LoanId,
	--		L.maturity_date AS MaturityDate,
	--		L.facility_date AS FacilityDate,
	--		L.redeemed_date AS RedeemedDate,
	--		L.redemption_date AS RedemptionDate,
	--		L.term AS Term,
	--		L.loan_amount AS LoanAmount,
	--		L.loan_balance AS LoanBalance,
	--		L.gross_loan AS GrossLoan,
	--		L.Total_Facility AS TotalFacility,
	--		L.completion_date AS CompletionDate,
	--		L.Total_FurtherAdvance AS TotalFurtherAdvance
	--	FROM
	--		Dawn_Data.Loan.Loan  L
	--	WHERE
	--		L.loan_id = @LoanId ;
END
GO
/****** Object:  StoredProcedure [Loan].[LoanHasVulnerableCustGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[LoanHasVulnerableCustGet] @LoanId int
as begin
	set nocount on

	declare @NoteTypeId int = (select top 1 nt.NoteTypeID from [Dawn_Data].Reference.NoteType nt	where	nt.NoteType like '%Vulnerable%'	and nt.NoteType like	'%Customer%')
	declare @NoteSubCategoryId int = (select top 1 sc.NoteSubCategoryId from [Dawn_Data].Reference.NoteSubCategory sc	where	sc.NoteSubCategory like	'Active%')

	select fkContactId ContactId , max(isnull(r.Lastupdate,r.Created)) LastUpdate
	into #c
	from		Dawn_Data.Loan.RecoveryAction			r
	inner join	[Dawn_Data].[Loan].LoanNote				ln	on	ln.LoanNoteID	= r.fkNoteId
	inner join	[Dawn_Data].Reference.NoteType			nt	on	nt.NoteTypeID	= ln.fkNoteTypeId
	inner join	[Dawn_Data].Reference.NoteSubCategory	sc	on	sc.NoteSubCategoryId = ln.fkSubKeyId
	where	r.isactive				= 1
		and	isnull(r.fkContactId,0)	>0
		and	nt.NoteTypeID			= @NoteTypeId
		and ln.fkLoanId				= @LoanId
	group by fkContactid

	select top 1
		case when sc.NoteSubCategory='Active' then 1 else 0 end--, isnull(r.Lastupdate,r.Created)
	--select r.* , sc.NoteSubCategory
	FROM		Dawn_Data.Loan.RecoveryAction			r
	inner join	#c											c	on	c.ContactId		=	r.fkContactId and c.LastUpdate = isnull(r.Lastupdate,r.Created)
	inner join	[Dawn_Data].[Loan].LoanNote				ln	on	ln.LoanNoteID	= r.fkNoteId
	inner join	[Dawn_Data].Reference.NoteType			nt	on	nt.NoteTypeID	= ln.fkNoteTypeId
	inner join	[Dawn_Data].Reference.NoteSubCategory	sc	on	sc.NoteSubCategoryId = ln.fkSubKeyId
	where	r.isactive				= 1
		and	nt.NoteTypeID			= @NoteTypeId
		and ln.fkLoanId				= @LoanId
	--order by isnull(r.Lastupdate,r.Created) desc
	order by isnull(r.Lastupdate,r.Created) , case when sc.NoteSubCategory='Active' then 1 else 0 end desc
end
GO
/****** Object:  StoredProcedure [Loan].[LoanNoteByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[LoanNoteByIdGet]
	@LoanNoteId Int
AS

SELECT
	LoanNoteId,
	fkLoanId As LoanId,
	CaseReference,
	fkNoteTypeId As NoteTypeId,
	fkSubKeyId As SubKeyId,
	Note,
	COALESCE(l.LastUpdate, l.Created) As NoteDate
FROM Dawn_Data.Loan.LoanNote l
WHERE LoanNoteId = @LoanNoteId
GO
/****** Object:  StoredProcedure [Loan].[LoanNoteMultiGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[LoanNoteMultiGet]
	@LoanId Int,
	@NoteTypes VarChar(100)
as begin
	/*	Version	Date	Author			Decription
		1.00	2015	?AK				Initial
		1.01	8.1.18	PJR				add comments, set nocount, fix 'or' statement
	*/
	set nocount on

	SELECT	LoanNoteId,
			fkLoanId As LoanId,
			CaseReference,
			fkNoteTypeId As NoteTypeId,
			n.NoteType,
			fkSubKeyId As SubKeyId,
			Note,
			COALESCE(l.LastUpdate, l.Created) As NoteDate
	FROM Dawn_Data.Loan.LoanNote l
	JOIN Dawn_Data.Reference.NoteType n ON l.fkNoteTypeId = n.NoteTypeId
	WHERE 
			(
				fkLoanId = @LoanId AND @NoteTypes = ''
			)
		OR
			(
				fkLoanId = @LoanId AND @NoteTypes LIKE '%|' + CONVERT(VarChar, fkNoteTypeId) + '|%'
			)

	ORDER BY COALESCE(l.LastUpdate, l.Created) DESC
end

GO
/****** Object:  StoredProcedure [Loan].[LoanPageList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[LoanPageList]	 @PageSize		smallint = 20
								,@Filter		varchar(255)
								,@FilterType	varchar(255) --'cbfl'
								,@Order			varchar(32)
								,@Debug			tinyint	=	0
as begin
	set nocount on

	select	 ROW_NUMBER() OVER	(ORDER BY 
										 case when @Filter is not null and @FilterType = 'cbfl'		and @Order='ASC'	then l.[CBFL_id] end ASC
										,case when @Filter is not null and @FilterType = 'cbfl'		and @Order='DESC'	then l.[CBFL_id] end DESC
										--,case when @Filter is not null and @FilterType = 'postcode' and @Order='ASC'	then h.[CBFL_id] end ASC
										--,case when @Filter is not null and @FilterType = 'postcode' and @Order='DESC'	then h.[CBFL_id] end DESC
								) AS Rid
			,l.cbfl_id
		into #Rids
		from	Loan.Loan		l 
		where	l.[CBFL_id] like case when @Filter is not null and @FilterType='cbfl' then '%' + @Filter + '%' else l.[CBFL_id] end

	if @debug>0
			select * from #Rids

	select	ROW_NUMBER() OVER (ORDER BY Rid) PageNo , Rid
	into #Pages
	from	#Rids
	where Rid % @PageSize = 0

	if @debug>0 and exists(select * from #pages)
				select 'pages',* from #Pages

	declare @lastPageRid int , @lastRid int

	select @lastPageRid=isnull(max(Rid),0) from #Pages
	select @lastRid=max(Rid) from #Rids

	if @debug>0
			select @lastPageRid '@lastPageRid' , @lastRid '@lastRid'

	if @lastPageRid<=0
		insert #Pages(PageNo)  select 1 

	if @lastPageRid<@lastRid and @lastPageRid>0
		insert #Pages(PageNo)  select max(PageNo) + 1 from #Pages

	select PageNo from #Pages order by PageNo

--	select convert(int,0) PageNo --from #Pages order by PageNo
end
GO
/****** Object:  StoredProcedure [Loan].[LoanRecoveryNoteMultiGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[LoanRecoveryNoteMultiGet]		@LoanId Int,	@NoteTypes VarChar(100)
as begin
	/*
	select * from Dawn_Data.Loan.Loan where cbfl_id like '%3159%'
	select * FROM		Dawn_Data.Loan.LoanNote where fkLoanId=@loanid
	select * FROM		Dawn_Data.Loan.RecoveryAction where fkLoanId=@LoanId
	*/
	set nocount on

	select	 LoanNoteId
			,l.fkLoanId								As LoanId
			,CaseReference
			,fkNoteTypeId							As NoteTypeId
			,n.NoteType
			,sc.NoteSubCategory
			,fkSubKeyId								As SubKeyId
			,ra.EffectiveFrom
			,ra.EffectiveTo
			,Note
			,COALESCE(l.LastUpdate, l.Created)		As NoteDate
			,COALESCE(l.LastUpdateBy, l.CreatedBy)	As [User]

	from		Dawn_Data.Loan.LoanNote				l
	inner join	Dawn_Data.Reference.NoteType			n	on	l.fkNoteTypeId			=	n.NoteTypeId
	inner join	Dawn_Data.Reference.NoteSubCategory	sc	on	sc.NoteSubCategoryId	=	l.fkSubKeyId
	inner join	Dawn_Data.loan.RecoveryAction		ra	on	ra.fkLoanId				=	@LoanId and	ra.fkNoteId = l.LoanNoteID

	where 
		(
				l.fkLoanId = @LoanId AND @NoteTypes = ''
			)
		OR
			(
				l.fkLoanId = @LoanId AND @NoteTypes LIKE '%|' + CONVERT(VarChar, fkNoteTypeId) + '|%'
			)
	ORDER BY COALESCE(l.LastUpdate, l.Created) DESC

end
GO
/****** Object:  StoredProcedure [Loan].[LoanSearchByCaseOrSecurityList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[LoanSearchByCaseOrSecurityList] 	@SearchCriteria varchar(1024) , @SearchType char(1) , @message varchar(255) output, @rc int output, @debug tinyint=0
as begin
	set nocount on
	begin try

		select	 l.Loan_Id											as	LoanId
				,l.CBFL_id											as	CaseRef
				,'XXXXXXXXXXXXXXXXXXXX'								as	SecurityAddress
				,ISNULL(l.ProductDescription,'')					as	Product
				,isnull(convert(varchar,l.completion_date,106),'')	as	CompletionDate
				,isnull(convert(varchar,l.redeemed_date,106),'')	as	RedemptionDueDate
				,convert(money,l.gross_loan)						as	GrossLoan
				,convert(money,l.loan_amount)						as	NetLoan

		from		Dawn_Data.Loan.Loan			l
		inner join	Dawn_Data.Loan.SecurityMap	m	on	m.loan_id	=	l.loan_id
		where
			l.CBFL_id	like	'%' + replace(@SearchCriteria,'_','[_]') + '%'
		order by
			l.CBFL_id
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:

ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[LoanSearchGlobalList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[LoanSearchGlobalList]	@SearchText VarChar(100)
as Begin

	/******************************
	** File:    LoanSearchGlobalList.sql
	** Name:	[Dawn_Data_v100]. [Loan].[LoanSearchGlobalList]
	** Desc:	
	** Version	2.2

	** Date: 
	**************************
	** Change History
	**************************
	** PR   Date        Author		Description 
	** --   --------   -------		------------------------------------
	** 1.0					PR      Created
	** 2.0	  20170712		AL		Updated	
	** 2.1	  20170907		PR		Fixed primary borrower
									Removed commented out previous version
									Added set nocount on
	** 2.2	  20170911		AL		Fixed primary borrower
									Added 	IsActive Flag checks  ON left joins
	**		  20170913		AL		Added query to filter results set
	*******************************/

	set NoCount on

;WITH   CTE_TempLoanFilter AS
(
	SELECT DISTINCT
		l.loan_id As LoanId
	FROM Dawn_Data.Loan.Loan l
		LEFT JOIN Dawn_Data.Loan.ParticipantOfCase lc	
			ON l.loan_id = lc.FkLoanId 
			AND lc.FKParticipantTypeId = 1
			AND lc.IsActive=1
				LEFT JOIN Dawn_Data.Loan.Contact c				
					ON lc.FkContactId = c.ContactId
					AND c.IsActive=1
					LEFT JOIN Dawn_Data.Loan.[AddressOfContact] ac
						ON c.ContactId = ac.FkContactId
						AND ac.IsActive=1
						LEFT JOIN Dawn_Data.Loan.address a
							ON ac.FkAddressId =a.AddressId
							AND a.IsActive=1
				LEFT JOIN Dawn_Data.Loan.LegalEntity le				
					ON lc.FkLegalEntityId = le.LegalEntityId
					AND le.IsActive=1
					LEFT JOIN Dawn_Data.Loan.[ContactOfLegalEntity] cle				
						ON le.LegalEntityId = cle.FKLegalEntityId
						AND cle.IsActive=1
						LEFT JOIN Dawn_Data.Loan.Contact cc				
							ON cle.FkContactId = cc.ContactId
							AND cc.IsActive=1
						LEFT JOIN Dawn_Data.Loan.[AddressOfContact] acc
							ON cc.ContactId = acc.FkContactId
							AND  acc.IsActive=1
							LEFT JOIN Dawn_Data.Loan.address aa
								ON acc.FkAddressId =aa.AddressId
								AND aa.IsActive=1
		LEFT JOIN Dawn_Data.Loan.SecurityMap sm			
			ON l.loan_id = sm.loan_id
			AND sm.IsActive=1
			LEFT JOIN Dawn_Data.Loan.Security s				
				ON sm.security_id = s.security_id

	WHERE ( 
		(COALESCE(CBFL_id, '') LIKE '%' + @SearchText + '%' OR (COALESCE(CBFL_id, '') LIKE '%' + REPLACE(@SearchText,' ','_') + '%'))
		OR REPLACE(COALESCE(c.Title, '') +' '+COALESCE(c.FirstName, '') + ' ' + COALESCE(c.MiddleName, '') + ' ' + COALESCE(c.Surname, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		OR REPLACE(COALESCE(s.address_1, '') + ' ' + COALESCE(s.address_2, '') + ' ' + COALESCE(s.address_3, '') + ' ' + COALESCE(s.address_4, '') + ' ' + COALESCE(s.county, '') + ' ' + COALESCE(s.post_code, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		OR REPLACE(COALESCE(cc.Title, '') +' '+COALESCE(cc.FirstName, '') + ' ' + COALESCE(cc.MiddleName, '') + ' ' + COALESCE(cc.Surname, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		OR COALESCE(le.LegalEntityName, '') LIKE '%' + @SearchText + '%' 
		OR REPLACE(COALESCE(a.AddrLn1, '') +' '+COALESCE(a.AddrLn2, '') + ' ' + COALESCE(a.AddrLn3, '') + ' ' + COALESCE(a.AddrLn4, '')+ ' ' + COALESCE(a.PostCode, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		OR REPLACE(COALESCE(aa.AddrLn1, '') +' '+COALESCE(aa.AddrLn2, '') + ' ' + COALESCE(aa.AddrLn3, '') + ' ' + COALESCE(aa.AddrLn4, '')+ ' ' + COALESCE(aa.PostCode, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		)
)
,
CTE_TempLoanDetail AS
(
	SELECT 
		l.loan_id As LoanId,
		CBFL_id As LoanReference,

		--** 2.1	  20170907		PR		Fixed primary borrower
		--ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY c.ContactId) As ContactRowNumber,
		--ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY cle.isprimary desc) As ContactRowNumber,
		--** 2.2	  20170911		AL		Fixed primary borrower
		ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY lc.isprimary desc,cle.isprimary desc) As ContactRowNumber,
		ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY  sm.isPrimary DESC,s.post_code) As SecurityRowNumber,
		--ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY le.LegalEntityId) As LegalEntityRowNumber,
		CASE WHEN c.ContactId IS NOT NULL THEN
				COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '') 
			ELSE 
				COALESCE(cc.Title, '') + ' ' + COALESCE(cc.FirstName, '') + ' ' + COALESCE(cc.Surname, '') 
		 END As PrimaryContactName,
		s.address_1 As Address1,
		s.address_2 As Address2,
		s.address_3 As Address3,
		s.address_4 As Address4,
		s.County As County,
		s.post_code As PostCode,
		le.LegalEntityName
	FROM Dawn_Data.Loan.Loan l
		LEFT JOIN Dawn_Data.Loan.ParticipantOfCase lc	
			ON l.loan_id = lc.FkLoanId 
			AND lc.FKParticipantTypeId = 1
			AND lc.IsActive=1
				LEFT JOIN Dawn_Data.Loan.Contact c				
					ON lc.FkContactId = c.ContactId
					AND c.IsActive=1
					--LEFT JOIN Dawn_Data.Loan.[AddressOfContact] ac
					--	ON c.ContactId = ac.FkContactId
					--	AND ac.IsActive=1
					--	LEFT JOIN Dawn_Data.Loan.address a
					--		ON ac.FkAddressId =a.AddressId
					--		AND a.IsActive=1
				LEFT JOIN Dawn_Data.Loan.LegalEntity le				
					ON lc.FkLegalEntityId = le.LegalEntityId
					AND le.IsActive=1
					LEFT JOIN Dawn_Data.Loan.[ContactOfLegalEntity] cle				
						ON le.LegalEntityId = cle.FKLegalEntityId
						AND cle.IsActive=1
						LEFT JOIN Dawn_Data.Loan.Contact cc				
							ON cle.FkContactId = cc.ContactId
							AND cc.IsActive=1
						--LEFT JOIN Dawn_Data.Loan.[AddressOfContact] acc
						--	ON cc.ContactId = acc.FkContactId
						--	AND  acc.IsActive=1
						--	LEFT JOIN Dawn_Data.Loan.address aa
						--		ON acc.FkAddressId =aa.AddressId
						--		AND aa.IsActive=1
		LEFT JOIN Dawn_Data.Loan.SecurityMap sm			
			ON l.loan_id = sm.loan_id
			AND sm.IsActive=1
			LEFT JOIN Dawn_Data.Loan.Security s				
				ON sm.security_id = s.security_id
)		
 SELECT * 
 INTO	#TempLoanDetails 
 FROM	CTE_TempLoanDetail
 WHERE LoanId IN (SELECT LoanId FROM CTE_TempLoanFilter )



	-- Updated AL 20170712
	SELECT 
		LoanId=MAX(LoanId),
		LoanReference,

		--** 2.1	  20170907		PR
		--PrimaryContactName=ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN PrimaryContactName ELSE '' END),'') ,
		PrimaryContactName = ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN PrimaryContactName+ isnull(' (' + LegalEntityName+')','')  ELSE '' END),'') ,

		Address1=ISNULL(MAX(CASE WHEN SecurityRowNumber =1 THEN Address1 ELSE '' END),'') ,
		Address2=ISNULL(MAX(CASE WHEN SecurityRowNumber =1 THEN Address2 ELSE '' END),'') ,
		Address3=ISNULL(MAX(CASE WHEN SecurityRowNumber =1 THEN Address3 ELSE '' END),'') ,
		Address4=ISNULL(MAX(CASE WHEN SecurityRowNumber =1 THEN Address4 ELSE '' END),'') ,
		County=ISNULL(MAX(CASE WHEN SecurityRowNumber =1 THEN County ELSE '' END),'') ,
		PostCode =ISNULL(MAX(CASE WHEN SecurityRowNumber =1 THEN PostCode ELSE '' END),'') 
		--,LegalEntityName =ISNULL(MAX(CASE WHEN LegalEntityRowNumber =1 THEN LegalEntityName ELSE '' END),'') 
	FROM #TempLoanDetails
	GROUP BY LoanReference

END




GO
/****** Object:  StoredProcedure [Loan].[LoanSearchGlobalList_v2.1]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [Loan].[LoanSearchGlobalList_v2.1]	@SearchText VarChar(100)
as Begin

	/******************************
	** File:    LoanSearchGlobalList.sql
	** Name:	[Dawn_Data_v100]. [Loan].[LoanSearchGlobalList]
	** Desc:	
	** Version	2.2

	** Date: 
	**************************
	** Change History
	**************************
	** PR   Date        Author		Description 
	** --   --------   -------		------------------------------------
	** 1.0					PR      Created
	** 2.0	  20170712		AL		Updated	
	** 2.1	  20170907		PR		Fixed primary borrower
									Removed commented out previous version
									Added set nocount on
	** 2.2	  20170712		AL		Fixed primary borrower
									Added 	IsActive Flag checks  ON left joins
	*******************************/

	set NoCount on

	-- Updated AL 20170712
	SELECT 
		l.loan_id As LoanId,
		CBFL_id As LoanReference,

		--** 2.1	  20170907		PR		Fixed primary borrower
		--ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY c.ContactId) As ContactRowNumber,
		--ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY cle.isprimary desc) As ContactRowNumber,
		--** 2.2	  20170911		AL		Fixed primary borrower
		ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY lc.isprimary desc,cle.isprimary desc) As ContactRowNumber,

		ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY s.post_code) As SecurityRowNumber,
		ROW_NUMBER() OVER (PARTITION BY l.loan_id ORDER BY le.LegalEntityId) As LegalEntityRowNumber,
		CASE WHEN c.ContactId IS NOT NULL THEN
				COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '') 
			ELSE 
				COALESCE(cc.Title, '') + ' ' + COALESCE(cc.FirstName, '') + ' ' + COALESCE(cc.Surname, '') 
		 END As PrimaryContactName,
		s.address_1 As Address1,
		s.address_2 As Address2,
		s.address_3 As Address3,
		s.address_4 As Address4,
		lc.FKParticipantTypeId,
		s.County As County,
		s.post_code As PostCode
		,le.LegalEntityName
	INTO #TempLoanDetails
	--select count(*)
	FROM Dawn_Data.Loan.Loan l
		LEFT JOIN Dawn_Data.Loan.ParticipantOfCase lc	
			ON l.loan_id = lc.FkLoanId 
			AND lc.FKParticipantTypeId = 1
			AND lc.IsActive=1
				LEFT JOIN Dawn_Data.Loan.Contact c				
					ON lc.FkContactId = c.ContactId
					AND c.IsActive=1
					LEFT JOIN Dawn_Data.Loan.[AddressOfContact] ac
						ON c.ContactId = ac.FkContactId
						AND ac.IsActive=1
						LEFT JOIN Dawn_Data.Loan.address a
							ON ac.FkAddressId =a.AddressId
							AND a.IsActive=1
				LEFT JOIN Dawn_Data.Loan.LegalEntity le				
					ON lc.FkLegalEntityId = le.LegalEntityId
					AND le.IsActive=1
					LEFT JOIN Dawn_Data.Loan.[ContactOfLegalEntity] cle				
						ON le.LegalEntityId = cle.FKLegalEntityId
						AND cle.IsActive=1
						LEFT JOIN Dawn_Data.Loan.Contact cc				
							ON cle.FkContactId = cc.ContactId
							AND cc.IsActive=1
						LEFT JOIN Dawn_Data.Loan.[AddressOfContact] acc
							ON cc.ContactId = acc.FkContactId
							AND  acc.IsActive=1
							LEFT JOIN Dawn_Data.Loan.address aa
								ON acc.FkAddressId =aa.AddressId
								AND aa.IsActive=1
		LEFT JOIN Dawn_Data.Loan.SecurityMap sm			
			ON l.loan_id = sm.loan_id
			AND sm.IsActive=1
			LEFT JOIN Dawn_Data.Loan.Security s				
				ON sm.security_id = s.security_id

	WHERE ( 
		(COALESCE(CBFL_id, '') LIKE '%' + @SearchText + '%' OR (COALESCE(CBFL_id, '') LIKE '%' + REPLACE(@SearchText,' ','_') + '%'))
		OR REPLACE(COALESCE(c.Title, '') +' '+COALESCE(c.FirstName, '') + ' ' + COALESCE(c.MiddleName, '') + ' ' + COALESCE(c.Surname, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		OR REPLACE(COALESCE(s.address_1, '') + ' ' + COALESCE(s.address_2, '') + ' ' + COALESCE(s.address_3, '') + ' ' + COALESCE(s.address_4, '') + ' ' + COALESCE(s.county, '') + ' ' + COALESCE(s.post_code, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		OR REPLACE(COALESCE(cc.Title, '') +' '+COALESCE(cc.FirstName, '') + ' ' + COALESCE(cc.MiddleName, '') + ' ' + COALESCE(cc.Surname, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		OR COALESCE(le.LegalEntityName, '') LIKE '%' + @SearchText + '%' 
		OR REPLACE(COALESCE(a.AddrLn1, '') +' '+COALESCE(a.AddrLn2, '') + ' ' + COALESCE(a.AddrLn3, '') + ' ' + COALESCE(a.AddrLn4, '')+ ' ' + COALESCE(a.PostCode, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		OR REPLACE(COALESCE(aa.AddrLn1, '') +' '+COALESCE(aa.AddrLn2, '') + ' ' + COALESCE(aa.AddrLn3, '') + ' ' + COALESCE(aa.AddrLn4, '')+ ' ' + COALESCE(aa.PostCode, ''),'  ',' ') LIKE '%' + REPLACE(@SearchText,'  ',' ') + '%'
		)
		--AND 	(lc.FKParticipantTypeId = 1 AND lc.IsActive=1)
		

	-- Updated AL 20170712
	SELECT 
		LoanId=MAX(LoanId),
		LoanReference,

		--** 2.1	  20170907		PR
		--PrimaryContactName=ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN PrimaryContactName ELSE '' END),'') ,
		PrimaryContactName = ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN PrimaryContactName+ isnull(' (' + LegalEntityName+')','')  ELSE '' END),'') ,

		Address1=ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN Address1 ELSE '' END),'') ,
		Address2=ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN Address2 ELSE '' END),'') ,
		Address3=ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN Address3 ELSE '' END),'') ,
		Address4=ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN Address4 ELSE '' END),'') ,
		County=ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN County ELSE '' END),'') ,
		PostCode =ISNULL(MAX(CASE WHEN ContactRowNumber =1 THEN PostCode ELSE '' END),'') 
		--,LegalEntityName =ISNULL(MAX(CASE WHEN LegalEntityRowNumber =1 THEN LegalEntityName ELSE '' END),'') 
	FROM #TempLoanDetails
	GROUP BY LoanReference

END



GO
/****** Object:  StoredProcedure [Loan].[LoanUpdateCaseOwner]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-08-03		Gurdeep			First version

*/

CREATE PROCEDURE [Loan].[LoanUpdateCaseOwner]    @LoanId		Int
												,@CaseOnwerId	Int
as Begin
	set nocount on
	UPDATE [Dawn_Data].[Loan].[Loan] SET [CaseOwnerId] = @CaseOnwerId WHERE [loan_id] = @LoanId
end
GO
/****** Object:  StoredProcedure [Loan].[NoteDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[NoteDel]	@NoteId int, @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try

		delete 	Dawn_Data.Loan.LoanNote where [LoanNoteID] = @NoteId
		set @rc=0

	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[NoteGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[NoteGet]	@LoanId int, @NoteTypeId int, @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	declare  @dfltDateFormat		smallint

	select	 @dfltDateFormat		=	106
			,@rc					=	-1
			,@message				=	''

	begin try

		select n.LoanNoteId, n.Note , isnull(n.Lastupdate,n.created) LastUpdate, isnull(n.Lastupdateby,n.createdby) UpdatedBy
		from		[Dawn_Data].Loan.LoanNote			n
		where fkloanId = @LoanId and fkNoteTypeId=@NoteTypeId
		order by  isnull(n.Lastupdate,n.created) desc

		set @rc=0

	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
select @message
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[NoteIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[NoteIns]	@LoanId int, @NoteTypeId int, @SubKeyId int, @Note varchar(max), @User varchar(255) ,@message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''
	begin try
		insert	Dawn_Data.Loan.LoanNote(fkLoanId,CaseReference,fkNoteTypeId,fkSubKeyId,[Note],CreatedBy)
			select	 @LoanId 
					,(select CBFL_id			from Dawn_Data.Loan.Loan					where loan_id		=	@LoanId)
					,@NoteTypeId
					,@SubKeyId
					,@Note
					,@User
		set @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk

ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[NoteUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[NoteUpd] @NoteId int, @NoteTypeId Int,  @Note varchar(max), @User varchar(255) , @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try

		update Dawn_Data.Loan.LoanNote set Note = @Note , fkNoteTypeId = @NoteTypeId, LastUpdateBy=@User where [LoanNoteID] = @NoteId
		set @rc=0

	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[ParticipantsByLoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Loan].[ParticipantsByLoanGet]
	@LoanId Int,
	@ParticipantTypeId Int,
	@ShowHidden Bit
AS
BEGIN
	-- Modified - 'Loan.ParticipantsByLoanGet': 'DIM-56': DVM:  Added the "Date Of Birth" (/'DoB')

	SET NOCOUNT ON

	-- Get Contacts
	SELECT 
		lc.FkLoanId As LoanId, 
		c.ContactId,
		c.Title,
		c.Surname,
		c.FirstName,
		c.MiddleName,
		c.Initials,
		c.DoB AS DateOfBirth,
		lc.IsActive,
		lc.IsPrimary
	INTO #ParticipantContacts
	FROM Dawn_Data.Loan.ParticipantOfCase lc
	JOIN Dawn_Data.Loan.Contact c ON lc.FkContactId = c.ContactId
	WHERE lc.FkLoanId = @LoanId
	  AND (@ParticipantTypeId = 0 OR lc.FKParticipantTypeId = @ParticipantTypeId)
	  AND (@ShowHidden = 1 OR lc.IsActive = 1)
	  AND c.IsActive = 1

	-- Get LegalEntities
	SELECT 
		lc.FkLoanId As LoanId, 
		l.LegalEntityId,
		l.LegalEntityName,
		lc.IsActive,
		lc.IsPrimary,
		l.[LegalEntityNumber]
	INTO #ParticipantLegalEntities
	FROM Dawn_Data.Loan.ParticipantOfCase lc
	JOIN Dawn_Data.Loan.LegalEntity l ON lc.FkLegalEntityId = l.LegalEntityId
	WHERE lc.FkLoanId = @LoanId
	  AND (@ParticipantTypeId = 0 OR lc.FKParticipantTypeId = @ParticipantTypeId)
	  AND (@ShowHidden = 1 OR lc.IsActive = 1)
	  AND l.IsActive = 1

	-- Get Legal Entity Contacts
	SELECT 
		l.LoanId,
		l.LegalEntityId,
		cl.ContactOfLegalEntityId,
		c.ContactId,
		c.Title,
		c.Surname,
		c.FirstName,
		c.MiddleName,
		c.Initials,
		c.DoB AS DateOfBirth,
		cl.IsActive As IsActive,
		cl.IsPrimary As IsPrimary
	INTO #LegalEntityContacts 
	FROM #ParticipantLegalEntities l
	JOIN Dawn_Data.Loan.ContactOfLegalEntity cl ON l.LegalEntityId = cl.FkLegalEntityId
	JOIN Dawn_Data.Loan.Contact c ON cl.FkContactId = c.ContactId
	WHERE
	  (@ShowHidden = 1 OR cl.IsActive = 1)
	  AND c.IsActive = 1

	SELECT * FROM #ParticipantContacts
	SELECT * FROM #ParticipantLegalEntities
	SELECT * FROM #LegalEntityContacts

	SELECT DISTINCT ContactId
	INTO #AllContacts
	FROM (SELECT ContactId FROM #ParticipantContacts
		  UNION ALL
		  SELECT ContactId FROM #LegalEntityContacts) As ContactsUnion

	-- Get Addresses
	SELECT
		#AllContacts.ContactId,
		a.AddressId,
		a.AddrLn1,
		a.AddrLn2,
		a.AddrLn3,
		a.AddrLn4,
		a.PostCode,
		a.County,
		a.Notes,
		a.FkISOCountry As CountryId,
		c.country_name As Country,
		ac.IsActive,
		ac.IsPrimary
	FROM #AllContacts 
	JOIN Dawn_Data.Loan.AddressOfContact ac ON #AllContacts.ContactId = ac.FkContactId
	JOIN Dawn_Data.Loan.Address a ON ac.FkAddressId = a.AddressId
	JOIN Dawn_Data.Reference.Country c ON a.FkISOCountry = c.country_id
	WHERE (@ShowHidden = 1 OR ac.IsActive = 1)
	ORDER By ac.IsActive DESC

	SELECT
		p.LegalEntityId,
		a.AddressId,
		a.AddrLn1,
		a.AddrLn2,
		a.AddrLn3,
		a.AddrLn4,
		a.PostCode,
		a.County,
		a.Notes,
		a.FkISOCountry As CountryId,
		c.country_name,
		al.IsActive,
		al.IsPrimary
	FROM #ParticipantLegalEntities p
	JOIN Dawn_Data.Loan.AddressOfLegalEntity al ON p.LegalEntityId = al.FkLegalEntityId
	JOIN Dawn_Data.Loan.Address a ON al.FkAddressId = a.AddressId
	JOIN Dawn_Data.Reference.Country c ON a.FkISOCountry = c.country_id
	WHERE (@ShowHidden = 1 OR al.IsActive = 1)

	SELECT
		l.ContactOfLegalEntityId,
		p.LegalEntityPositionId,
		p.LegalEntityPosition As Position,
		pl.IsActive,
		pl.IsPrimary,
		p.DisplayOrder
	FROM #LegalEntityContacts l
	JOIN Dawn_Data.Loan.PosnOfLegalEntityContact pl ON l.ContactOfLegalEntityId = pl.FkContactOfLegalEntityId
	JOIN Dawn_Data.Loan.LegalEntityPosition p ON pl.LegalEntityPositionId = p.LegalEntityPositionId

	SELECT 
		a.ContactId,
		c.CommsOfContactId,
		c.CommsValue,
		t.CommsTypeId,
		t.CommsType
	FROM #AllContacts a
	JOIN Dawn_Data.Loan.CommsOfContact c ON a.ContactId = c.FkContactId
	JOIN Dawn_Data.Loan.CommsType t ON c.FkCommsTypeId = t.CommsTypeId
	WHERE c.IsActive = 1
END

GO
/****** Object:  StoredProcedure [Loan].[PosnOfLegalEntityGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[PosnOfLegalEntityGet]
	@ContactId Int,
	@LegalEntityId Int
AS

SET NOCOUNT ON

SELECT 
	PosnOfLegalEntityContactId,
	FkContactOfLegalEntityId, 
	LegalEntityPositionId
INTO #TempData
FROM Dawn_Data.Loan.PosnOfLegalEntityContact p
JOIN Dawn_Data.Loan.ContactOfLegalEntity c ON c.ContactOfLegalEntityId = p.FkContactOfLegalEntityId
WHERE c.FkLegalEntityId = @LegalEntityId
  AND c.FkContactId = @ContactId
  AND p.IsActive = 1

IF NOT EXISTS (SELECT * FROM #TempData)
	INSERT INTO #TempData
	SELECT TOP 1 0, ContactOfLegalEntityId, p.LegalEntityPositionId
	FROM Dawn_Data.Loan.ContactOfLegalEntity c, Dawn_Data.Loan.LegalEntityPosition p
	WHERE c.FkLegalEntityId = @LegalEntityId
	  AND c.FkContactId = @ContactId
	ORDER BY DisplayOrder

SELECT * FROM #TempData

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[PosnOfLegalEntityInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[PosnOfLegalEntityInsUpd]
	@ContactId Int,
	@LegalEntityId Int,
	@LegalEntityPositionId Int,
	@User NVarChar(255)
AS

SET NOCOUNT ON

DECLARE @PosnOfLegalEntityContactId Int, @ContactOfLegalEntityId Int

SELECT TOP 1 @PosnOfLegalEntityContactId = PosnOfLegalEntityContactId, @ContactOfLegalEntityId = FkContactOfLegalEntityId
FROM Dawn_Data.Loan.ContactOfLegalEntity c 
LEFT OUTER JOIN Dawn_Data.Loan.PosnOfLegalEntityContact p ON c.ContactOfLegalEntityId = p.FkContactOfLegalEntityId
WHERE c.FkLegalEntityId = @LegalEntityId
  AND c.FkContactId = @ContactId
  AND p.IsActive = 1

IF (@PosnOfLegalEntityContactId IS NULL)
	INSERT INTO Dawn_Data.Loan.PosnOfLegalEntityContact(FkContactOfLegalEntityId, LegalEntityPositionId, IsPrimary, IsActive, Created, CreatedBy, LastUpdate, LastUpdateBy)
	SELECT @ContactId, @LegalEntityPositionId, 1, 1, GETDATE(), @User, GETDATE(), @User
ELSE
	UPDATE Dawn_Data.Loan.PosnOfLegalEntityContact
	SET LegalEntityPositionId = @LegalEntityPositionId,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE PosnOfLegalEntityContactId = @PosnOfLegalEntityContactId

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Loan].[PostRedemptionAnalysisNoteIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[PostRedemptionAnalysisNoteIns]	@LoanId int, @Note varchar(max), @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try

		insert	Dawn_Data.Loan.LoanNote(fkLoanId,CaseReference,fkSourceId,fkNoteSourceId,fkNotePropertyID,[Note])
			select	 @LoanId 
					,(select CBFL_id			from Dawn_Data.Loan.Loan					where loan_id		=	@LoanId)
					,@LoanId
					,isnull((select NoteSourceID	from Dawn_Data.Reference.NoteSource		where NoteSource	=	'PostRedemptionAnalysis'),0)
					,isnull((select NotePropertyId	from Dawn_Data.Reference.NoteProperty	where NoteProperty	=	'Note'),0)
					,@Note

		set @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[PurposeListGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[PurposeListGet]
as begin
	set nocount on
	select	 [PurposeId]
			,[Purpose]
	from	Dawn_Data.Loan.Purpose
		where IsActive=1
	order by DisplayOrder
end
GO
/****** Object:  StoredProcedure [Loan].[RecoveryActionGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Loan].[RecoveryActionGet]
			 @RecoveryActionId	int
as begin 
	set nocount on

	select RecoveryActionId,fkLoanId,fkNoteId,fkContactId,IsVulnerable,EffectiveFrom,EffectiveTo,ExtendedMaturityDate,CreatedBy,Created,Lastupdate,LastUpdateBy
		from Dawn_Data.Loan.RecoveryAction
	where fkNoteId = @RecoveryActionId

end
GO
/****** Object:  StoredProcedure [Loan].[RecoveryActionInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [Loan].[RecoveryActionInsUpd]
			 @RecoveryActionId	int
			,@loanId			int
			,@NoteId			int
			,@ExtendedMaturityDate datetime
			,@EffectiveFrom		datetime
			,@EffectiveTo		datetime
			,@ContactId			int
			,@SecurityId		int
			,@EventId			int
			,@IsVulnerable		bit
			,@user				varchar(255)
as begin 
	set nocount on

	if @RecoveryActionId=0
		begin
			insert Dawn_Data.Loan.RecoveryAction(fkLoanId,fkNoteId,fkContactId,IsVulnerable,fkSecurityId,fkEventPlannerId,CreatedBy,EffectiveFrom,EffectiveTo,ExtendedMaturityDate)
				select @loanId,  @NoteId, @ContactId, @IsVulnerable, @SecurityId , @EventId ,@user,@EffectiveFrom,@EffectiveTo,@ExtendedMaturityDate

			select @RecoveryActionId=SCOPE_IDENTITY()
		end
	else
		begin
			update Dawn_Data.Loan.RecoveryAction
				set  EffectiveFrom	= case when @EffectiveFrom	<>EffectiveFrom	and @EffectiveFrom	<>null then @EffectiveFrom else EffectiveFrom end
					,EffectiveTo	= case when @EffectiveTo	<>EffectiveTo	and @EffectiveTo	<>null then @EffectiveTo else EffectiveTo end
					,fkContactId	= case when @ContactId		<>fkContactId	and @ContactId		<>null then @ContactId else fkContactId end
					,IsVulnerable	= case when @IsVulnerable	<>IsVulnerable	and @IsVulnerable	<>null then @IsVulnerable else IsVulnerable end
					,ExtendedMaturityDate	= case when @ExtendedMaturityDate	<>ExtendedMaturityDate	and @ExtendedMaturityDate	<>null then @ExtendedMaturityDate else ExtendedMaturityDate end
					,fkSecurityId	= case when @SecurityId<>fkSecurityId then @SecurityId else fkSecurityId end
					,fkEventPlannerId	= case when @EventId<>fkEventPlannerId then @EventId else fkEventPlannerId end
					,Lastupdate		= getDate()
					,LastUpdateBy	= @user
				where RecoveryActionId = @RecoveryActionId
		end

	select @RecoveryActionId
end
GO
/****** Object:  StoredProcedure [Loan].[RecoveryNoteIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[RecoveryNoteIns]	@LoanId int, @NoteTypeId int, @SubKeyId int, @Note varchar(max), @User varchar(255) ,@message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''
	begin try
		insert	Dawn_Data.Loan.LoanNote(fkLoanId,CaseReference,fkNoteTypeId,fkSubKeyId,[Note],CreatedBy)
			select	 @LoanId 
					,(select CBFL_id			from Dawn_Data.Loan.Loan					where loan_id		=	@LoanId)
					,@NoteTypeId
					,@SubKeyId
					,@Note
					,@User
		set @rc=0
		select SCOPE_IDENTITY() NoteId

	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk

ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[RecoveryNoteUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[RecoveryNoteUpd] @NoteId int, @NoteTypeId Int,  @SubKeyId Int,@Note varchar(max), @User varchar(255) , @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try

		update Dawn_Data.Loan.LoanNote set Note = @Note , fkNoteTypeId = @NoteTypeId, fksubkeyid=@SubKeyId, LastUpdateBy=@User, Lastupdate=getdate() where [LoanNoteID] = @NoteId
		set @rc=0

	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[RedemptionDateClear]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[RedemptionDateClear]
	@LoanId  INT,
	@ReasonDescription  NVARCHAR(Max),
	@UserIdentity  NVARCHAR(255),
	@RecipGrpDesc  VARCHAR(512),
	@SenderId  INT,
	@Debug  TINYINT = 0
AS
BEGIN
	-- 'LEN-78' (- was 'DIM-140'): Created: DVM:  "Ability to un-redeem a loan: must be audited (audit table required)"
	-- Clears the redeemed/'Redemption' date and stores the (un-redeemed loan) 'reason description'/loan-note

	SET NOCOUNT ON

	BEGIN TRAN ClearLoanRedemptionDate  -- WITH MARK 'Clear loan redemption date'

	IF (EXISTS (SELECT 1 FROM Dawn_Data.Loan.Loan  L WHERE L.loan_id = @LoanId))
	BEGIN
		DECLARE
			@message VARCHAR(255),
			@rc INT = -1 ;

		DECLARE @redemptionsNoteTypeID INT = (
				SELECT
						NT.NoteTypeID
					FROM
						Dawn_Data.Reference.NoteType  NT
					WHERE
						NT.NoteType = 'Redemptions'
			) ;

		DECLARE @unRedeemingLoanNoteTypeID INT = (
				SELECT
						NT.NoteTypeID
					FROM
						Dawn_Data.Reference.NoteType  NT
					WHERE
						NT.NoteType = 'Un-Redeeming Loan'
			) ;

		DECLARE @caseReference NVARCHAR(255) ;
		DECLARE @redemptionDate DATETIME ;

		SELECT
				@caseReference  = L.CBFL_id,
				@redemptionDate = L.redeemed_date
			FROM
				Dawn_Data.Loan.Loan  L
			WHERE
				L.loan_id = @LoanId

		/*
		INSERT INTO Dawn_Data.Loan.LoanNote
				(
					[fkLoanId],
					[CaseReference],
					[fkNoteTypeId],
					[fkSubKeyId],
					[Note],
					[Created],
					[CreatedBy],
					[Lastupdate],
					[LastUpdateBy]
				)
			VALUES
				(
					@LoanId,  -- fkLoanId
					@caseReference,  -- CaseReference
					@redemptionsNoteTypeID,  -- fkNoteTypeId
					@unRedeemingLoanNoteTypeID,  -- fkSubKeyId
					@ReasonDescription,  -- Note
					GetDate(),  -- Created
					@UserIdentity,  -- CreatedBy
					NULL,  -- Lastupdate
					NULL  -- LastUpdateBy
				) ;
		*/

		DECLARE @recipGrpId INT = (
				SELECT
						RG.RecipientGroupId
					FROM
						Dawn_Data_Comms.Comms.RecipientGroup  RG
					WHERE
						RG.RecipientGroupDescription = @RecipGrpDesc
			) ;

		DECLARE @datetimeNow DATETIME = GetDate() ;

		DECLARE @emailMessage VARCHAR(Max) =
						'''' + LTrim(RTrim(@caseReference)) + '''' + ' was un-redeemed on ' + Convert(VarChar, @datetimeNow, 106) + ' ' + Convert(VarChar, @datetimeNow, 108) + ' by User: ''' + LTrim(RTrim(@UserIdentity)) + '''.' + Char(13) +
							Char(13) +
							'The redemption date was set to ''' + Convert(VarChar, @redemptionDate, 106) + ' ' + Convert(VarChar, @redemptionDate, 108) + ''' (/''' + Convert(VarChar, @redemptionDate, 126) + ''').' + Char(13) +
							Char(13) +                                                                
                            'The reason was:' + Char(13) +
							Char(13) +
                            @ReasonDescription + Char(13) ;

		EXEC Loan.NoteIns
						@LoanId,
						@redemptionsNoteTypeID,
						@unRedeemingLoanNoteTypeID,
						@ReasonDescription,
						@UserIdentity,
						@message OUTPUT,
						@rc OUTPUT,
						@Debug ;

		EXEC Comms.QueueMessage
						'Email',  -- @MessageType
						@recipGrpId,  -- @RecipientGroupId
						0,  --  @RecipientId
						@SenderId,  -- @SenderId
						'Un-Redeemed Loan notification',  -- @Subject
						@emailMessage ;  -- @Message

		UPDATE Dawn_Data.Loan.Loan
			SET
				Redeemed_date = NULL
			WHERE
				loan_id = @LoanId ;
	END

	COMMIT TRAN ClearLoanRedemptionDate
END

GO
/****** Object:  StoredProcedure [Loan].[RedemptionDateUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Loan].[RedemptionDateUpd]		 @LoanId			int
											,@RedemptionDate	datetime
											,@User				NVarChar(255)
as begin

	if exists (select * from Dawn_Data.Loan.Loan where loan_id = @LoanId)
		update Dawn_Data.Loan.Loan set Redeemed_date = @RedemptionDate where loan_id = @LoanId

end
GO
/****** Object:  StoredProcedure [Loan].[ServicedInterestPaymentEndDatesGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[ServicedInterestPaymentEndDatesGet] @LoanID int
as begin
	set nocount on
	--for serviced payments

	--2017.11.13 below is removed for now, because it is incorrect if a statement has been produced for SH type letters.
	--calc. requires a mod to get this right.

	/*
	select top 1
		 @loanid																						LoanId
		,(select isnull(i.InterestStartDate,convert(datetime,'01 jan 1900'))
			from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i
			inner join	Dawn_Data.Reference.CashflowInterestType		l	
			on l.CashflowInterestTypeKey	=	i.cashflowInterest_type
			where i.cashflowInterest_type =2 and loan_id=@loanid)										DateOfFirstServicedPayment

		,(select isnull(i.InterestEndDate,convert(datetime,'01 jan 1900'))
			from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i 
			inner join	Dawn_Data.Reference.CashflowInterestType		l	
			on l.CashflowInterestTypeKey	=	i.cashflowInterest_type
			where i.cashflowInterest_type =2 and loan_id=@loanid)										DateOfFinalServicedPayment

		,(select monthlyinterest	from Dawn_Data.loan.history where DIM_loan_id_SSK=@loanid)		AmountOfServicedPayment

		,isnull((	select 
			(
			select sum(convert(int,[value]))
			from dbo.fn_Split(isnull(h.producttermcombination,''),'+')
			where idx=0
			)
			from	Dawn_Data.Loan.History h      
		 where   h.DIM_loan_id_SSK = @loanid
		 ),0)																							RetainedInterestPeriodMonths
		 
		 ,(select isnull(datediff(mm,i.IntereststartDate,i.InterestEndDate),0)
			from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i 
			inner join	Dawn_Data.Reference.CashflowInterestType		l	
			on l.CashflowInterestTypeKey	=	i.cashflowInterest_type
			where i.cashflowInterest_type =2 and loan_id=@loanid)										ServicingPeriodMonths
	from Dawn_Data.loan.history where DIM_loan_id_SSK = @loanid
	*/

	SELECT TOP 1
		'FirstPayment' PaymentType
		,loan_id LoanId
		,[cashflowInterest_date]
		,[cashflowInterest_amount]
		,[CashflowTypeDescription]
	into #PaymentEndpoints
	--select *
	FROM [Dawn_Data].[LoanCalc].[qryStatementCashflowTransactions]
	where CashflowTypeDescription='Serviced Interest due'
		and loan_id=@loanid
	order by   cashflowInterest_date   asc

	insert #PaymentEndpoints(PaymentType,LoanId,cashflowInterest_date,cashflowInterest_amount,CashflowTypeDescription)
		SELECT TOP 1 
		'FinalPayment' PaymentType
		,loan_id LoanId
		,[cashflowInterest_date]
		,[cashflowInterest_amount]
		,[CashflowTypeDescription]

		FROM [Dawn_Data].[LoanCalc].[qryStatementCashflowTransactions]
		where CashflowTypeDescription='Serviced Interest due'
			and loan_id=@loanid
		order by  cashflowInterest_date  desc

	select
		@LoanId LoanId
		,isnull((select cashflowInterest_date from #PaymentEndpoints where PaymentType='FirstPayment'),convert(datetime,'01 jan 1900'))		DateOfFirstServicedPayment
		,isnull((select cashflowInterest_date from #PaymentEndpoints where PaymentType='FinalPayment'),convert(datetime,'01 jan 1900'))		DateOfFinalServicedPayment
		,isnull((select day(cashflowInterest_date) from #PaymentEndpoints where PaymentType='FirstPayment'),0)								DayOfServicedPayment
		,isnull((select cashflowInterest_amount from #PaymentEndpoints where PaymentType='FirstPayment'),0)									AmountOfServicedPayment

		,isnull((	select 
			(
			select sum(convert(int,[value]))
			from dbo.fn_Split(isnull(h.producttermcombination,''),'+')
			where idx=0
			)
			from	Dawn_Data.Loan.History h      
		 where   h.DIM_loan_id_SSK = @loanid
		 ),0)																																RetainedInterestPeriodMonths

		,isnull((SELECT COUNT(*) FROM [Dawn_Data].[LoanCalc].[qryStatementCashflowTransactions]
			where CashflowTypeDescription='Serviced Interest due' and loan_id=@loanid),0)													ServicingPeriodMonths

end
GO
/****** Object:  StoredProcedure [Loan].[ServicedInterestPaymentScheduleGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[ServicedInterestPaymentScheduleGet]	@LoanId int ,@message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try
			SELECT	 i.loan_id											as	LoanId
					 ,convert(varchar(25),cashflowInterest_date,106)	as	PaymentDate
					 ,i.cashflowInterest_amount							as	PaymentAmount
					--,i.cashflowInterest_id
					--,i.cashflowInterest_type
					--,t.CashflowType
					--,t.CashflowTypeDescription
			--select *
			from		Dawn_Data.Loan.CashflowInterest		i
			inner join	Dawn_Data.Loan.CashflowType			t	on	t.CashFlowType_id	=	i.cashflowInterest_type
			where loan_id in (
								select	l.loan_id --, l.CBFL_id , l.loan_amount , l.gross_loan , h.DIM_loan_id_DWSK
									from		Dawn_Data.[Loan].[Loan]	l
									inner join	Dawn_Data.[Loan].History	h		on	h.DIM_loan_id_SSK	=	l.loan_id
									where
											h.SCDEndDate	= 999999999999999999
											and l.loan_id = @LoanId
							  )
			and		t.CashflowType	=	'Serviced'
			order by i.loan_id , cashflowInterest_date
		select @rc=0

	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:

ExitOk:
end

GO
/****** Object:  StoredProcedure [Loan].[ServicedLoanReportx]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[ServicedLoanReportx]
	@ReportDate DateTime
AS

BEGIN

SELECT @ReportDate = DATEADD(month, DATEDIFF(month, 0, @ReportDate), 0)

CREATE TABLE #ReportData (
	LoanId Int,
	CaseReference NVarChar(255),
	BorrowerName NVarChar(512),
	PrimarySecurity VarChar(max),
	CompletionDate DateTime,
	RedemptionDueDate DateTime,
	ServicingStartDate DateTime,
	RedeemedDate DateTime,
	ServicedTerm VarChar(10),
	CountOfPayments Int,
	AmountReceived Int,
	ServicingAmount Money,
	Month1Status Int,
	Month1Amount Money,
	Month1DateDue DateTime,
	Month1DatePaid DateTime,
	Month2Status Int,
	Month2Amount Money,
	Month2DateDue DateTime,
	Month2DatePaid DateTime,
	Month3Status Int,
	Month3Amount Money,
	Month3DateDue DateTime,
	Month3DatePaid DateTime,
	Month4Status Int,
	Month4Amount Money,
	Month4DateDue DateTime,
	Month4DatePaid DateTime,
	Month5Status Int,
	Month5Amount Money,
	Month5DateDue DateTime,
	Month5DatePaid  DateTime,
	Month6Status Int,
	Month6Amount Money,
	Month6DateDue DateTime,
	Month6DatePaid DateTime
)

INSERT INTO #ReportData(LoanId, CaseReference, CompletionDate, RedemptionDueDate, RedeemedDate, ServicingStartDate, ServicedTerm)
SELECT DISTINCT 
	l.loan_id,
	l.CBFL_id,
	l.completion_date,
	h.redeemed_date, -- seems to be the predicted redemption date
	l.redeemed_date,
	CASE h.ProductInterestTypeId
		WHEN 1 THEN l.completion_date
		ELSE DATEADD(mm, CONVERT(Int, SUBSTRING(h.ProductTermCombination, 0, CHARINDEX('+', h.ProductTermCombination))), l.completion_date)
		END,
	h.ProductTermCombination
FROM 
	Dawn_Data.Loan.Loan l, 
	Dawn_Data.LoanCalc.CashFlowInterest i,
	Dawn_Data.Loan.History h
	LEFT OUTER JOIN Dawn_Data.Product.TermCombinations tc ON h.ProductTermCombinationsId = tc.ProductTermCombinationsID
	LEFT OUTER JOIN Dawn_Data.Product.Term t ON tc.TermMonthId = t.TermMonthId
WHERE l.Loan_id = h.DIM_loan_id_SSK
  AND h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND cashflowInterest_date BETWEEN @ReportDate AND DATEADD(m, 6, @ReportDate)
  AND h.ProductTermCombination IS NOT NULL
  AND cashflowInterest_Date < h.redeemed_date

-- Get all the serviced interest payments
SELECT DISTINCT 
	l.loan_id As LoanId,
	i.cashflowInterest_amount As Amount,
	i.cashflowInterest_date As Date,
	CONVERT(DateTime, 0) As PaidDate,
	DATEADD(month, DATEDIFF(month, 0, i.cashflowInterest_date), 0) As MonthStart,
	CONVERT(Money, 0) As CumulativeAmount,
	CONVERT(Money, 0) As CumulativeActual,
	CONVERT(Money, 0) As TotalActual,
	0 As PaidOnTime,
	0 As Paid
INTO #ServicedInterestDue
FROM 
	#ReportData r,
	Dawn_Data.Loan.Loan l, 
	Dawn_Data.Loan.History h,
	Dawn_Data.LoanCalc.CashFlowInterest i
WHERE r.LoanId = l.loan_id
  AND l.Loan_id = h.DIM_loan_id_SSK
  AND h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND h.ProductTermCombination IS NOT NULL
  AND i.cashflowInterest_date <= COALESCE(r.RedeemedDate, r.RedemptionDueDate) --fix for issue where serviced interest payments are being calculated and stored past maturity date.
  
-- Work out the cumulative amount due
UPDATE #ServicedInterestDue
SET CumulativeAmount = (SELECT SUM(Amount) 
						FROM #ServicedInterestDue x 
						WHERE x.LoanId = #ServicedInterestDue.LoanId 
						  AND x.Date <= #ServicedInterestDue.Date)


-- Get actual interest payments
SELECT DISTINCT
	t.loan_id As LoanId, 
	t.Amount, 
	t.transaction_date As Date,
	(SELECT SUM(x.Amount) FROM Dawn_Data.LoanCalc.[Transaction] x WHERE x.loan_id = r.LoanId AND x.transaction_date <= t.transaction_date AND x.transaction_type = 18) As CumulativeAmount
INTO #ActualInterestPayments
FROM #ReportData r
JOIN Dawn_Data.LoanCalc.[Transaction] t ON r.LoanId = t.Loan_id
WHERE t.transaction_type = 18

-- Work out actual cumulative/totals
UPDATE #ServicedInterestDue
SET CumulativeActual = (SELECT SUM(Amount) 
						FROM #ActualInterestPayments x 
						WHERE x.LoanId = #ServicedInterestDue.LoanId 
						  AND x.Date <= #ServicedInterestDue.Date),
	TotalActual = (SELECT SUM(Amount)
					FROM #ActualInterestPayments x 
						WHERE x.LoanId = #ServicedInterestDue.LoanId),
	PaidDate = (SELECT MIN(a.Date)
				FROM #ActualInterestPayments a
				WHERE a.LoanId = #ServicedInterestDue.LoanId
				  AND a.CumulativeAmount * -1 >= #ServicedInterestDue.CumulativeAmount)

SELECT * FROM #ActualInterestPayments
WHERE LoanId = 1139

SELECT SUM(Amount) 
						FROM #ActualInterestPayments x 
						WHERE x.LoanId = 1139
						  AND x.Date <= '5-Oct-2015'

SELECT * FROM #ServicedInterestDue
WHERE LoanId = 1139

-- Work out whether paid on time
UPDATE #ServicedInterestDue
SET PaidOnTime = CASE WHEN CumulativeAmount + CumulativeActual <= 0 THEN 1 ELSE 0 END,
	Paid = Case WHEN CumulativeAmount + TotalActual <= 0 THEN 1 ELSE 0 END

-- SELECT * FROM #ServicedInterestDue WHERE LoanId = 1067
-- SELECT * FROM #ActualInterestPayments WHERE LoanId = 1067

UPDATE #ReportData
SET CountOfPayments = (SELECT COUNT(*)
						FROM 
							Dawn_Data.Loan.Loan l, 
							Dawn_Data.LoanCalc.CashFlowInterest i,
							Dawn_Data.Loan.History h
						WHERE #ReportData.Loanid = l.loan_id
						  AND l.Loan_id = h.DIM_loan_id_SSK
						  AND h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
						  AND SCDStatus = 'C'
						  AND cashflowInterest_type = 16
						  AND i.cashflowInterest_date <= h.redeemed_date)


-- Attempt to get Legal Entity Name first, if there is one
UPDATE #ReportData
SET BorrowerName = (SELECT TOP 1 e.LegalEntityName
					FROM Dawn_Data.Loan.ParticipantOfCase c, Dawn_Data.Loan.LegalEntity e
					WHERE c.FkLoanId = #ReportData.LoanId
					  AND c.FkLegalEntityId = e.LegalEntityId
					  AND c.FKParticipantTypeId = 1)

-- Otherwise get borrower name
UPDATE #ReportData
SET BorrowerName = (SELECT TOP 1 ISNULL(co.FirstName, '') + ' ' + ISNULL(co.Surname, '')
					FROM Dawn_Data.Loan.ParticipantOfCase c, Dawn_Data.Loan.Contact co
					WHERE c.FkLoanId = #ReportData.LoanId
					  AND c.FkContactId = co.ContactId
					  AND c.FKParticipantTypeId = 1)
WHERE BorrowerName IS NULL

UPDATE #ReportData
SET PrimarySecurity = (SELECT TOP 1 ISNULL(s.address_1 , '')
						FROM Dawn_Data.Loan.SecurityMap m, Dawn_Data.Loan.Security s
						WHERE m.loan_id = #ReportData.LoanId
						  AND m.security_id = s.security_id)

UPDATE #ReportData
SET AmountReceived = ISNULL((SELECT SUM(ABS(Amount))
						FROM #ActualInterestPayments a
						WHERE a.LoanId = #ReportData.LoanId), 0)

DECLARE @i Int, @Sql NVarChar(4000), @ParamDefinition NVarChar(500)
SET @i = 1

WHILE @i <= 6
	BEGIN
	
	--SELECT * FROM #ReportData WHERE LoanId = 1347

		SET @Sql = 'UPDATE #ReportData
					SET Month' + CONVERT(VarChar, @i) + 'Amount = ISNULL(si.Amount, 0),
						Month' + CONVERT(VarChar, @i) + 'Status = CASE 
											WHEN #ReportData.RedeemedDate IS NOT NULL AND @ReportDate = DATEADD(month, DATEDIFF(month, 0, #ReportData.RedeemedDate), 0) THEN 6 -- Early Redemption
											WHEN si.PaidOnTime = 1 THEN 1	-- Paid On Time
											WHEN si.Paid = 1 THEN 2			-- Paid Late
											WHEN si.Date > GETDATE() THEN 0 -- Future Payment
											WHEN si.LoanId IS NOT NULL THEN 3 -- Payment scheduled but missed
											WHEN @ReportDate > #ReportData.RedeemedDate THEN 4 -- Loan Finished -- redeemed date seems to be full redemption date, not redemption due date
											WHEN @ReportDate < #ReportData.CompletionDate THEN 5 -- Loan Not Started
											WHEN #ReportData.RedeemedDate IS NULL AND @ReportDate = DATEADD(month, DATEDIFF(month, 0, #ReportData.RedemptionDueDate), 0) THEN 8 -- Redemption Due
											WHEN #ReportData.RedeemedDate IS NULL AND @ReportDate > DATEADD(month, DATEDIFF(month, 0, #ReportData.RedemptionDueDate), 0) THEN 4 -- Loan Finished
											ELSE 7 -- Interest Retained
										END,
						Month' + CONVERT(VarChar, @i) + 'DateDue = ISNULL(si.Date, 0),
						Month' + CONVERT(VarChar, @i) + 'DatePaid = ISNULL(si.PaidDate, 0)
					FROM #ReportData
						LEFT OUTER JOIN #ServicedInterestDue si ON si.MonthStart = @ReportDate AND si.LoanId = #ReportData.LoanId'

		SET @ParamDefinition = '@ReportDate DateTime'

		EXEC sp_executeSql @Sql, @ParamDefinition, @ReportDate

		SELECT @ReportDate = DATEADD(month, 1, @ReportDate)

		SET @i = @i + 1
	END

-- Delete any items from the report that have no payments (i.e. they're all retained or redeemed)
DELETE #ReportData
WHERE Month1Status NOT IN (0, 1, 2, 3)
  AND Month2Status NOT IN (0, 1, 2, 3)
  AND Month3Status NOT IN (0, 1, 2, 3)
  AND Month4Status NOT IN (0, 1, 2, 3)
  AND Month5Status NOT IN (0, 1, 2, 3)
  AND Month6Status NOT IN (0, 1, 2, 3)

SELECT * 
FROM #ReportData
ORDER BY ServicingStartDate

END
GO
/****** Object:  StoredProcedure [Loan].[StatementDetailsGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [Loan].[StatementDetailsGet] @CaseReference varchar(255), @message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try

		select       distinct  
					case when isnull(le.LegalEntityName,'')!=''
							then le.LegalEntityName 
							else c.[Title] + ' ' +  c.FirstName + ' ' + c.Surname
					end NameOfBorrower
					,l.CBFL_id		CaseReference
					,l.loan_id		LoanId
					,s.security_name
					+case when s.address_1 is not null and isnull(s.address_1,'')!='' and isnull(s.address_1,'')!=isnull(s.security_name,'') then ',' + s.address_1 else '' end
					+case when s.address_2 is not null and isnull(s.address_2,'')!='' then ',' + s.address_2 else '' end
					+case when s.address_3 is not null and isnull(s.address_3,'')!='' then ',' + s.address_3 else '' end
					+case when s.address_4 is not null and isnull(s.address_4,'')!='' then ',' + s.address_4 else '' end			 
					+case when s.county is not null and isnull(s.county,'')!='' then ',' + s.county else '' end		
					+case when s.post_code is not null and isnull(s.post_code,'')!='' then ',' + s.post_code else '' end	SecurityAddress	
		FROM        Dawn_Data.[Loan].[ParticipantOfCase]	p
		left join	Dawn_Data.Loan.Loan					l	on	l.CBFL_id	=	p.CaseReference
		left join	Dawn_Data.Loan.SecurityMap			sm	on	sm.loan_id	=	l.loan_id
		left join   Dawn_Data.[Loan].Contact             c	on  c.ContactId     =   p.FkContactId
		left join   Dawn_Data.Loan.LegalEntity           le	on  le.LegalEntityId=	p.FkLegalEntityId
		left join	Dawn_Data.Loan.[Security]			s	on	s.security_id	=	sm.security_id
		where p.CaseReference   =     @CaseReference
	select @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:
	Rollback

ExitOk:
end
GO
/****** Object:  StoredProcedure [Loan].[StatementGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [Loan].[StatementGet]
	@LoanId Int,
	@StatementType VARCHAR(1),
	@StatementDate as DATE,
	@UseTBC AS BIT

  AS
--Returns the Statement Loan Details  
--20180315. Peter Wegrzyn
--20180324. PW. @Adjustments allow transaction_date to be NULL.Remove duplicate Interest rebate
--20180904 PW extended maturity date [Dawn_v100].Loan.LatestExtendedMaturityDateGet  has additional columns
-- 20191104. PW bigger decription Varchar, use 255

SET NOCOUNT ON

SET DATEFORMAT YMD
DECLARE @TMD Table (LatestExtendedMaturityDate date,	OriginalMaturityDate date, ExtendType VARCHAR(20),NoteSubCategoryId INTEGER, CreatedDate date) --20180904
--20180324
DECLARE @Adjustments Table ([Adjustment_Id] [int] IDENTITY(1,1) NOT NULL,transaction_id INT NULL, transaction_date VARCHAR(200) NULL,  Amount DECIMAL(18,9), loan_id INT, transaction_type VARCHAR(200) NULL, transaction_Description VARCHAR(255), 
							SumOfcashflowInterest_amount DECIMAL(18,9), dateval date, TypeOrder INT)
DECLARE @DetailsLoan TABLE (DispOrg INT, CompletionDate DATE, [Description] VARCHAR(255),  Amount VARCHAR(50), AmountVAL DECIMAL(18,9))
DECLARE @Interestperiods TABLE (CashflowInterestType VARCHAR(250),InterestEndDate DATE,InterestStartDate DATE, InterestRateText VARCHAR(250),InterestRate DECIMAL(18,9),loan_id INT,cashflowInterest_type INT)

--DECLARE @LoanId Int
DECLARE @LatestExtendedMaturityDate date,	@OriginalMaturityDate date
DECLARE @InitialInterestType AS VARCHAR(25)
DECLARE @SumOfAdjustment AS DECIMAL(18,9)
DECLARE @SumOfDebitAdjustment AS DECIMAL(18,9)
DECLARE @SumOfCreditAdjustment AS DECIMAL(18,9)

DECLARE @CurrentInterestRate AS DECIMAL(18,9)
DECLARE @TotalDue AS DECIMAL(18,9)
DECLARE @TTcharge AS DECIMAL(18,9)
DECLARE @PayableOnRedemption AS DECIMAL(18,9)

DECLARE @ProductTermCombination  AS VARCHAR(10)
--DECLARE @StatementDate AS DATE
DECLARE @StatementDatefmt  AS DATE
DECLARE @CompletionDate AS DATE
DECLARE @MaturityDate AS DATE
DECLARE @FinalMaturityDate AS DATE
DECLARE @RedemptionDueDate AS DATE
DECLARE @DateCalculated AS DATETIME
DECLARE @RedeemedDate AS DATE
DECLARE @InterestAmount AS DECIMAL(18,9)
DECLARE @MonthlyIntAmount AS DECIMAL(18,9)-- % RATE
DECLARE @DefaultInterestRate AS DECIMAL(18,9)-- % RATE
DECLARE @MonthlyInterest AS DECIMAL(18,9)
DECLARE @NetAdvance AS DECIMAL(18,9)
DECLARE @LoanBalance AS DECIMAL(18,9)
DECLARE @GrossLoan AS DECIMAL(18,9)
DECLARE @TotalFacility AS DECIMAL(18,9)
DECLARE @ArrangementFeeIn AS DECIMAL(18,9)
DECLARE @ArrangementFeeOut AS DECIMAL(18,9)
DECLARE @ArrangementfeeFlat AS DECIMAL(18,9)
DECLARE @BrokerFlatFee AS DECIMAL(18,9)
DECLARE @LegalFee AS DECIMAL(18,9)
DECLARE @AmicusInsurance AS DECIMAL(18,9)
DECLARE @TitleInsurance AS DECIMAL(18,9)
DECLARE @AdministrationFee AS DECIMAL(18,9)
DECLARE @DailyRate AS DECIMAL(18,9)
DECLARE @DailyRateDefault AS DECIMAL(18,9)
DECLARE @CaseId AS VARCHAR(20)
DECLARE @Division AS VARCHAR(20)
DECLARE @isAddFirstMonthServiceLoan AS BIT
DECLARE @isShowDailyRate AS BIT
DECLARE @isOveride3MonthsMin AS BIT
		
DECLARE @DailyRateDays AS INT
DECLARE @DailyRateDaysDefault AS INT

--SELECT transaction_id, transaction_date, Amount, loan_id, transaction_type, transaction_Description, SumOfcashflowInterest_amount, CAST(DateOrdered AS DATE) AS dateval, TypeOrder 
--						FROM [Dawn_Data].LoanCalc.vwLoanMasterTransactions286  WHERE Loan_ID=@LoanID order by  CAST(DateOrdered AS DATE) 

print Format(DateAdd(day, 1, @StatementDate), 'yyyy-MM-dd', 'en-gb' )
	INSERT @TMD
	EXEC [Dawn_v100].Loan.LatestExtendedMaturityDateGet @LoanId
	SELECT @LatestExtendedMaturityDate=LatestExtendedMaturityDate, @OriginalMaturityDate=OriginalMaturityDate FROM @Tmd

IF (@LoanId > 0)
begin
--		select	@InitialInterestType = l.CashflowInterestType
--		from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i
--		left join	Dawn_Data.Reference.CashflowInterestType		l	on l.CashflowInterestTypeKey	=	i.cashflowInterest_type
--		where loan_id=@LoanId --AND  l.CashflowInterestType	= 'Serviced Interest'

		INSERT @Interestperiods
		select CIT.CashflowInterestType,i.InterestEndDate,i.InterestStartDate,i.InterestRateText,i.InterestRate,i.loan_id,i.cashflowInterest_type
		from		Dawn_Data.[LoanCalc].[CashflowInterestRate]	i
		left join	Dawn_Data.Reference.CashflowInterestType		CIT	on CIT.CashflowInterestTypeKey	=	i.cashflowInterest_type
		where loan_id=@LoanId 
		ORDER BY I.InterestStartDate 

		SELECT TOP 1 @InitialInterestType = CashflowInterestType FROM @Interestperiods ORDER BY InterestStartDate 
		SELECT TOP 1 @FinalMaturityDate=InterestEndDate FROM @Interestperiods WHERE cashflowInterest_type<>1 AND cashflowInterest_type<>3  AND loan_id= @LoanId  ORDER BY InterestEndDate DESC	 --20180329
		SELECT @OriginalMaturityDate=@FinalMaturityDate
		-- 
		PRINT @InitialInterestType
		PRINT '@InitialInterestType'
		--DECLARE  AS VARCHAR(20)
		SELECT  @CompletionDate=LH.completion_date,
				@MaturityDate=LH.maturity_date
				--@LatestExtendedMaturityDate = LatestExtendedMaturityDate, @OriginalMaturityDate = OriginalMaturityDate , 
				,@CaseId=LH.CBFL_id
				,@MonthlyIntAmount=LH.MonthlyInterest -- need to use MonthlyInterest
				,@NetAdvance=LH.loan_amount
				,@LoanBalance=LH.loan_balance 
				,@GrossLoan=LH.gross_loan 
				,@TotalFacility=LH.Total_Facility 
				,@ArrangementFeeIn=LH.arrangement_fee_in_Value 
				,@ArrangementFeeOut=LH.arrangement_fee_out_Value 
				,@ArrangementfeeFlat=LH.arrangement_fee_Flat 
				,@BrokerFlatFee=LH.broker_flat_fee
				,@InterestAmount= LH.interest_amount 
				,@LegalFee=LH.legal_cost
				,@AmicusInsurance=LH.insurance_cost 
				,@TitleInsurance=LH.TitleInsurance 
				,@AdministrationFee=LH.AdministrationFee
				,@MonthlyInterest= LH.MonthlyInterest
				,@DefaultInterestRate=LH.penalty_int_amount
				,@Division=LH.Division 
				,@isOveride3MonthsMin=LH.isOveride3MonthsMin 
				,@isShowDailyRate=LH.isShowDailyRate 
				,@DailyRate=LH.DailyRate 
				,@DailyRateDays=LH.DailyRateDays 
				,@DateCalculated= LH.DateCalculated
				,@DailyRateDefault=LH.DailyRateDefault
				,@DailyRateDaysDefault= LH.DailyRateDaysDefault
				,@RedeemedDate=L.redeemed_date
				,@RedemptionDueDate =LH.StartDate
				,@ProductTermCombination=LH.ProductTermCombination
		FROM    [Dawn_Data].Loan.History AS LH INNER JOIN
				[Dawn_Data].Loan.Loan AS L ON LH.DIM_loan_id_SSK = L.loan_id
		WHERE  L.loan_id= @LoanId;
		SET @StatementDate=@RedemptionDueDate
		print '@StatementDate'
		print @StatementDate
		SET @StatementDatefmt= CAST(FORMAT (@StatementDate, 'yyyy-MM-dd', 'en-gb' ) AS DATE)
		print @StatementDatefmt
		PRINT @CompletionDate 
		PRINT 'Net Advance' 
		PRINT @NetAdvance
		PRINT '@MonthlyInterest'
		PRINT @MonthlyInterest
		PRINT '@InitialInterestType'
		PRINT @InitialInterestType
		--SELECT	CASE WHEN @InitialInterestType = 'Serviced Interest' THEN  'month' + FORMAT(@MonthlyIntAmount, 'C', 'en-gb' ) ELSE 'Total' + FORMAT(@InterestAmount, 'C', 'en-gb' ) END   AS IntTYPE

		INSERT @DetailsLoan
		SELECT 1 AS DispOrg, @CompletionDate AS [Date], 'Net Advance' AS [Description], FORMAT(@NetAdvance, 'C', 'en-gb' ) AS [Amount], @NetAdvance AS AmountVal -- FROM @TMD --FORMAT(@NetAdvance, '#,##.000') 
		UNION
		--SELECT 2 AS DispOrg, @CompletionDate , 'Amicus Insurance'  , FORMAT(@AmicusInsurance , 'C', 'en-gb' )   --WHERE @AmicusInsurance>0 
		--UNION
		SELECT 2 AS DispOrg, @CompletionDate , 'Insurance Indemnity Fee'  , FORMAT(@AmicusInsurance , 'C', 'en-gb' ) ,@AmicusInsurance AS AmountVal  WHERE @AmicusInsurance>0 
		UNION
		SELECT 3 AS DispOrg, @CompletionDate , 'Amicus Legals'  ,  FORMAT(@LegalFee, 'C', 'en-gb' ) ,@LegalFee AS AmountVal  WHERE @LegalFee>0 
		UNION
		SELECT 4 AS DispOrg, @CompletionDate , 'Title Insurance'  ,  FORMAT(@TitleInsurance, 'C', 'en-gb' )  ,@TitleInsurance AS AmountVal WHERE @TitleInsurance>0 
		UNION
		SELECT 5 AS DispOrg, @CompletionDate , 'Advance Interest'  ,
			CASE WHEN @InitialInterestType = 'Serviced Interest' THEN FORMAT(@MonthlyIntAmount, 'C', 'en-gb' ) ELSE FORMAT(@InterestAmount, 'C', 'en-gb' ) END AS Amount,
			CASE WHEN @InitialInterestType = 'Serviced Interest' THEN @MonthlyIntAmount ELSE @InterestAmount END AS AmountVal
			WHERE @InterestAmount>0 
		UNION
		SELECT 6 AS DispOrg, @CompletionDate , 'Arrangement Fees'  ,  FORMAT(@ArrangementfeeFlat, 'C', 'en-gb' ) ,@ArrangementfeeFlat AS AmountVal  WHERE @ArrangementfeeFlat>0 
		UNION
		SELECT 7 AS DispOrg, @CompletionDate , 'Administration Fee'  ,  FORMAT(@AdministrationFee, 'C', 'en-gb' ) ,@AdministrationFee AS AmountVal  WHERE @AdministrationFee>0 
		ORDER BY DispOrg

		--SET @StatementDatefmt='''' + FORMAT (@StatementDate, 'dd/MMM/yyyy', 'en-gb' ) + ''''
		PRINT @StatementDatefmt
		print '@ProductTermCombination'
		print @ProductTermCombination
		print '@InitialInterestType'
		print @InitialInterestType
			If @InitialInterestType = 'Serviced Interest' Or CHARINDEX ('+',@ProductTermCombination) > 0  -- ignore last interest payment. 20150727 ' 20150807 Hybrids
				BEGIN
					-- Rebate
					print '0000'
					-- --20180324. Its already there whent he statement is generated.
					INSERT into @adjustments(transaction_id, transaction_date,  Amount, loan_id, transaction_type, transaction_Description, SumOfcashflowInterest_amount, dateval, TypeOrder )
						SELECT transaction_id, transaction_date,  Amount, loan_id, ISNULL(transaction_type ,''),  ISNULL(transaction_Description,''), SumOfcashflowInterest_amount, CAST(DateOrdered AS DATE) AS dateval, TypeOrder 
						FROM [Dawn_Data].LoanCalc.vwLoanMasterTransactions286   WHERE Loan_ID= @LoanID   
						AND (ISNULL(Transaction_Type,'')='Interest Rebate') 
						AND DateOrdered<=Format(DateAdd(day, 1, @StatementDate), 'yyyy-MM-dd', 'en-gb' )  --@StatementDate
					-- --20180324. 
					If @UseTBC = -1 
					 --20151110 Add NOT 'Refund Interest Charge' here??
					 begin
					 print 1
						INSERT into @adjustments(transaction_id, transaction_date,  Amount, loan_id, transaction_type, transaction_Description, SumOfcashflowInterest_amount, dateval, TypeOrder )
						SELECT transaction_id, transaction_date, IIF(TypeOrder=0,'TBC.', Amount) , loan_id,  ISNULL(transaction_type,''),  ISNULL(transaction_Description,''), 
							SumOfcashflowInterest_amount*100, CAST(DateOrdered AS DATE) AS dateval, TypeOrder FROM [Dawn_Data].LoanCalc.vwLoanMasterTransactions286 
							WHERE Loan_ID=@LoanID 
							AND (ISNULL(Transaction_Type,'')='TT charge (Bank Charges)' OR DateOrdered<= @StatementDate  )  
							AND NOT (ISNULL(Transaction_Description,'')='Arrangement Fee Payable on Redemption' 
							AND DateOrdered= @StatementDate  ) AND (ISNULL(transaction_Description,'')<>'Refund Interest Charge') -- 20151111
							AND (ISNULL(Transaction_Type,'')<>'Interest Rebate')  --20180324.  
					end
					Else
					begin
					print 2
						 -- The demands and payments
						INSERT into @adjustments(transaction_id, transaction_date,  Amount, loan_id,  transaction_type, transaction_Description, SumOfcashflowInterest_amount, dateval, TypeOrder )
						SELECT	transaction_id, transaction_date, Amount , loan_id, ISNULL(transaction_type,''), ISNULL(transaction_Description,''), SumOfcashflowInterest_amount, CAST(DateOrdered AS DATE) AS dateval, TypeOrder 
						FROM [Dawn_Data].LoanCalc.vwLoanMasterTransactions286     
							WHERE Loan_ID=@LoanID  
							AND (ISNULL(Transaction_Type,'')='TT charge (Bank Charges)' OR DateOrdered <= @StatementDate)  
							AND NOT (ISNULL(Transaction_Description,'')='Arrangement Fee Payable on Redemption' AND DateOrdered=@StatementDate) 
							AND (ISNULL(transaction_Description,'')<>'Refund Interest Charge')  --20151111
							AND (ISNULL(Transaction_Type,'')<>'Interest Rebate')  --20180324. 
					end	
				END
				Else
					BEGIN
					print 3
				-- 20150803 >PW Stop. Needs checking 20151101. Ok?
				  -- The payments
					INSERT into @adjustments(transaction_id, transaction_date,  Amount, loan_id, transaction_type, transaction_Description, SumOfcashflowInterest_amount, dateval, TypeOrder )
					SELECT transaction_id, transaction_date, Amount , loan_id, ISNULL(transaction_type,''), ISNULL(transaction_Description,''), SumOfcashflowInterest_amount, CAST(DateOrdered AS DATE) AS dateval, TypeOrder FROM [Dawn_Data].LoanCalc.vwLoanMasterTransactions286 
						WHERE Loan_ID=@LoanID 
						AND (ISNULL(Transaction_Type,'')='TT charge (Bank Charges)' OR DateOrdered<= @StatementDatefmt) 
						AND  (ISNULL(Transaction_Type,'')<>'Arrangement Fee Payable on Redemption')  
						AND  (ISNULL(Transaction_Description,'')<>'Interest Rebate') 
						AND (ISNULL(transaction_Description,'')<>'Refund Interest Charge')--  exclude 20, "Arrangement Fee Payable on Redemption"					-- 20180523
					UNION 
					SELECT transaction_id, transaction_date, Amount, loan_id, ISNULL(transaction_type,''), ISNULL(transaction_Description,''), SumOfcashflowInterest_amount, CAST(DateOrdered AS DATE) AS dateval, TypeOrder 
						FROM [Dawn_Data].LoanCalc.vwLoanMasterTransactions286  WHERE Loan_ID=@LoanID   AND (ISNULL(Transaction_Type,'')='Interest Rebate') 
						AND DateOrdered<=Format(DateAdd(day, 1, @StatementDate), 'yyyy-MM-dd', 'en-gb' ) 
					-- 20180523
					END
		
		SELECT * FROM @DetailsLoan

		SELECT @GrossLoan=SUM(AmountVal) FROM @DetailsLoan
--		ELSE
--			SELECT @GrossLoan=SUM(AmountVal) FROM @DetailsLoan WHERE transaction_Description <>'Serviced Interest due';

		SELECT * FROM @adjustments WHERE (ISNULL(Transaction_Type,'')<>'TT charge (Bank Charges)') ORDER BY dateVal, TypeOrder,transaction_type 
		SELECT @SumOfDebitAdjustment=sum(Amount) FROM @adjustments WHERE (ISNULL(Transaction_Type,'')<>'TT charge (Bank Charges)') AND Amount<0
		SELECT @SumOfCreditAdjustment=sum(Amount) FROM @adjustments WHERE (ISNULL(Transaction_Type,'')<>'TT charge (Bank Charges)') AND Amount>0
		SELECT @SumOfAdjustment=sum(Amount) FROM @adjustments WHERE (ISNULL(Transaction_Type,'')<>'TT charge (Bank Charges)')
		
		SELECT @TTcharge=sum(Amount) FROM @adjustments WHERE (ISNULL(Transaction_Type,'')='TT charge (Bank Charges)')

		SELECT @TotalDue=ISNULL(@GrossLoan,0) + ISNULL(@ArrangementFeeOut,0) + ISNULL(@SumOfAdjustment,0) + ISNULL(@TTcharge,0)
	END    
-- End 
--  @CurrentInterestRate is the rate on statement date.
SELECT @CurrentInterestRate=SUM(InterestRate)--,  @StatementDate, InterestStartDate, InterestEndDate, InterestRateText, cashflowInterest_type, CashflowInterestType
--, DATEDIFF(D, InterestStartDate,@StatementDate) as [After] ,DATEDIFF(D, InterestEndDate,@StatementDate) as [before]
FROM ([Dawn_Data].loan.History LH LEFT JOIN [Dawn_Data].[LoanCalc].[CashflowInterestRate] CIR  ON LH.DIM_loan_id_SSK = CIR.loan_id) 
LEFT JOIN [Dawn_Data].[Reference].[CashflowInterestType] CIT ON CIR.cashflowInterest_type = CIT.CashflowInterestTypeKey
WHERE 
 DATEDIFF(D, InterestStartDate,@StatementDate) >=0 AND DATEDIFF(D, InterestEndDate,@StatementDate) <=0
--(InterestStartDate>=@StatementDate AND InterestEndDate<=@StatementDate) AND 
AND Loan_Id=@LoanId
--ORDER BY LH.CBFL_id, CIR.InterestStartDate;

SELECT @PayableOnRedemption = @GrossLoan + @ArrangementFeeOut 

SELECT	@CurrentInterestRate AS 'CurrentInterestRate' 
		,@isShowDailyRate AS 'isShowDailyRate'
		,@DailyRate AS 'DailyRate'
		,@DailyRateDays AS 'DailyRateDays'		
		,@DateCalculated AS 'DateCalculated'
		,@DailyRateDefault AS 'DailyRateDefault'
		,@DailyRateDaysDefault AS 'DailyRateDaysDefault'
		,@RedeemedDate AS 'RedeemedDate'
		,FORMAT(@GrossLoan , 'C', 'en-gb' )  AS 'Gross Loan'
		,FORMAT(@PayableOnRedemption  , 'C', 'en-gb' ) AS 'Payable On Redemption'
		,FORMAT(@ArrangementFeeOut , 'C', 'en-gb' ) AS 'Arrangement Fee Out'
		,FORMAT(@ArrangementFeeIn, 'C', 'en-gb' ) AS 'Arrangement Fee'
		,@StatementDatefmt AS 'Statement Date'
		,ISNULL(@LatestExtendedMaturityDate,'') AS 'Extended Maturity Date'
		--,@LatestExtendedMaturityDate,'' AS 'Extended Maturity Date'
		,@FinalMaturityDate AS 'Maturity Date'
		,FORMAT(@TotalDue , 'C', 'en-gb' ) AS 'Total Due on' 
		, FORMAT(@SumOfAdjustment, 'C', 'en-gb' )  as 'Transactions and Adjustments'
		, FORMAT(@SumOfDebitAdjustment, 'C', 'en-gb' )  as 'Debit Transactions and Adjustments'
		, FORMAT(@SumOfCreditAdjustment, 'C', 'en-gb' )  as 'Credit Transactions and Adjustments'
		, FORMAT(@TTcharge, 'C', 'en-gb' )  as 'Bank Charge'
		

		--,FORMAT(@GrossLoan , 'C', 'en-gb' )  AS 'Gross Loan'
		--,FORMAT(@ArrangementFeeOut , 'C', 'en-gb' ) AS 'Arrangement Fee'
		--,@PayableOnRedemption = @GrossLoan + @ArrangementFeeOut 
		--,FORMAT(@PayableOnRedemption , 'C', 'en-gb' ) AS 'Payable On Redemption'
		--,@StatementDatefmt AS 'Statement Date'
		--,FORMAT(@TotalDue , 'C', 'en-gb' ) AS ' Total Due on ' 



/*
		SELECT FORMAT(@GrossLoan , 'C', 'en-gb' )  AS 'Gross Loan'
		SELECT FORMAT(@ArrangementFeeOut , 'C', 'en-gb' ) AS 'Arrangement Fee'
		SELECT @PayableOnRedemption = @GrossLoan + @ArrangementFeeOut 
		SELECT FORMAT(@PayableOnRedemption , 'C', 'en-gb' ) AS 'Payable On Redemption'
		SELECT @StatementDatefmt AS 'Statement Date'
		SELECT FORMAT(@TotalDue , 'C', 'en-gb' ) AS ' Total Due on ' */
GO
/****** Object:  StoredProcedure [Loan].[SubStatusListGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[SubStatusListGet]		 @Debug			tinyint	=	0
as begin

	set nocount on

	select	 [SubStatusId]
			,[SubStatus]
	from	Loan.SubStatus
	where	IsActive=1 and FkStatusId in (select loan_status_id from Loan.Status where status_description like '%enquiry%')
	order by DisplayOrder asc

end
GO
/****** Object:  StoredProcedure [Loan].[SurveyorContactsByLoanAllGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[SurveyorContactsByLoanAllGet]	@LoanId Int,
														@ParticipantTypeId Int,
														@ShowHidden Bit
as Begin
	set nocount on	--PJR

	--PJR 20160509	this contact is the contact for the surveyor to use when arranging a visit/ valuation

	SELECT 
		c.ContactId,
		LTRIM(c.FirstName + ' ' + c.Surname) As Name
	FROM Dawn_Data.Loan.ParticipantOfCase p 
	JOIN Dawn_Data.Loan.Contact c ON p.FkContactId = c.ContactId
	WHERE p.FkLoanId = @LoanId
	  AND p.FkParticipantTypeId = 1
	UNION ALL
	SELECT 
		c.ContactId,
		LTRIM(c.FirstName + ' ' + c.Surname + ' (c/o ' + l.LegalEntityName + ')')
	FROM Dawn_Data.Loan.ParticipantOfCase p 
	JOIN Dawn_Data.Loan.LegalEntity l ON p.FkLegalEntityId = l.LegalEntityId
	JOIN Dawn_Data.Loan.ContactOfLegalEntity e ON l.LegalEntityId = e.FkLegalEntityId
	JOIN Dawn_Data.Loan.Contact c ON e.FkContactId = c.ContactId
	WHERE p.FkLoanId = @LoanId
	  AND p.FkParticipantTypeId = 1
/*
	SELECT	0	as ContactId,
			''	as Name
*/
end
GO
/****** Object:  StoredProcedure [Loan].[TransactionGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Loan].[TransactionGet]
	@LoanId INT = NULL,	
	@TransactionTypes AS dbo.ListOfIds READONLY,
	@StartDate DATETIME = NULL,
	@EndDate DATETIME = NULL
	 
 AS BEGIN
	
	SET NOCOUNT ON
	
	SELECT 
		[transaction_id] AS TransactionId,
		[transaction_type] AS TransactionType,
		[transaction_Description] AS TransactionDescription,
		[transaction_date] AS TransactionDate,
		[Amount],
		[loan_id] AS LoanId,
		[DIM_loan_id_DWSK],
		[SSMA_TimeStamp],
		[Staff_ID],
		[dteDate],
		[dteDateUpdated],
		[AccountingDate]
	FROM [Dawn_Data].[LoanCalc].[Transaction] txn
	WHERE (@LoanId IS NULL OR txn.loan_id = @LoanId) AND
		(NOT EXISTS(SELECT Id FROM @TransactionTypes) OR txn.transaction_type IN (SELECT Id FROM @TransactionTypes)) AND
		(@StartDate IS NULL OR txn.transaction_date >= @StartDate) AND
		(@EndDate IS NULL OR txn.transaction_date <= @EndDate)
			 	
END
GO
/****** Object:  StoredProcedure [Loan].[TransactionIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Loan].[TransactionIns] @LoanId int,@FundRequestId int, @TranTypeDesc varchar(255),@Trandate datetime,@Amount money
	as begin
		begin try

			--update Dawn_Data.[Loan].[FundRequest] set Amount=@Amount,FundsReleased=1,FundReleaseDate=@TranDate where FundRequestId=@FundRequestId and fkLoanId=@LoanId

			declare @HistoryKey int
			select @HistoryKey = dim_loan_id_dwsk from Dawn_Data.loan.History where DIM_Loan_Id_SSK = @LoanId

			insert Dawn_Data.[LoanCalc].[Transaction] 
				(
				[transaction_type]
			   ,[transaction_Description]
			   ,[transaction_date]
			   ,[Amount]
			   ,[loan_id]
			   ,[DIM_loan_id_DWSK]
			   )
			values
			   (8
			   , @TranTypeDesc
			   ,@Trandate
			   ,@Amount
			   ,@LoanId
			   ,@HistoryKey
			   )
			select @@Rowcount Inserted

		end try
		begin catch
			select 0 Inserted
		end catch
end
GO
/****** Object:  StoredProcedure [Loan].[ValuationBasisGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Updates to valuation sprocs																			   ******/
/********************************************************************************************************************/
CREATE proc [Loan].[ValuationBasisGet] @ShowInactive bit as begin
	
	set nocount on
	
	Select	 [ValuationBasisId]
			,[ValuationBasis] as [ValuationBasisDescription]
			--,[DisplayOrder]
			,isActive

	from	[Dawn_Data].[Reference].[ValuationBasis]

	where	isActive!=@ShowInactive

	order by	[DisplayOrder] asc

end
GO
/****** Object:  StoredProcedure [Loan].[ValuationByFundRequestGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[ValuationByFundRequestGet]	@FundRequestId Int
AS Begin

	set nocount on 

	declare @Valuations table(
							ValuationId					int,
							LoanId						int,
							SecurityId					int,
							ApplicantValueEstimate		money,
							ApplicantGdvEstimate		money,
							ApplicantValuationFee		money,
							SurveyorComments			varchar(max),
							ContactId					int,
							ContactName					varchar(max),
							MarketValue					money,
							NinetyDayValue				money,
							GrossDevelopmentValue		money,
							GrossDevelopmentNinetyDayValue	money,
							RentalValue					money,
							ReinstatementValue			money,
							Notes						varchar(max),
							DateOfInstruction			datetime,
							DateOfInspection			datetime,
							DateOfValuation				datetime,
							ValuationStatusId			int,
							ValuationStatus				varchar(max),
							LegalEntityId				int,
							SurveyorName				varchar(max),
							LastUpdate					datetime,
							LastUpdateBy				varchar(128),
							SecurityAddress				varchar(max),
							SecurityPostCode			varchar(max),
							isExternalValuation			bit
							)

	insert	@Valuations (	ValuationId,
							LoanId,
							SecurityId,
							ApplicantValueEstimate	,
							ApplicantGdvEstimate		,
							ApplicantValuationFee		,
							SurveyorComments			,
							ContactId					,
							ContactName					,
							MarketValue					,
							NinetyDayValue				,
							GrossDevelopmentValue		,
							GrossDevelopmentNinetyDayValue	,
							RentalValue					,
							ReinstatementValue			,
							Notes						,
							DateOfInstruction			,
							DateOfInspection			,
							DateOfValuation				,
							ValuationStatusId			,
							ValuationStatus				,
							LegalEntityId				,
							SurveyorName				,
							LastUpdate					,
							LastUpdateBy				,
							SecurityAddress				,
							SecurityPostCode			,
							isExternalValuation
							)
	select
		v.ValuationId										as	ValuationId,
		IsNull(v.FkLoanId, 0)								as	LoanId,
		IsNull(v.FkSecurityId, 0)							as	SecurityId,
		IsNull(v.ApplicantValueEstimate,0)					as	ApplicantValueEstimate,
		IsNull(v.ApplicantGdvEstimate,0)					as	ApplicantGdvEstimate,
		IsNull(v.ApplicantValuationFee,0)					as	ApplicantValuationFee,
		IsNull(v.SurveyorComments,'')						as	SurveyorComments,
		IsNull(v.FkContactId, 0)							as	ContactId,
		LTRIM(IsNull(c.FirstName + ' ' + c.Surname, ''))	as	ContactName,
		IsNull(v.MarketValue, 0)							as	MarketValue,
		IsNull(v.NinetyDayValue, 0)							as	NinetyDayValue,
		IsNull(v.GrossDevelopmentValue, 0)					as	GrossDevelopmentValue,
		IsNull(v.GrossDevelopmentNinetyDayValue, 0)			as	GrossDevelopmentNinetyDayValue,
		IsNull(v.RentalValue, 0)							as	RentalValue,
		IsNull(v.ReinstatementValue, 0)						as	ReinstatementValue,
		IsNull(v.Notes,'')									as	Notes,
		isnull(v.DateOfInstruction,'01 Jan 1900')				as DateOfInstruction,
		isnull(v.DateOfInspection,'01 Jan 1900')				as DateOfInspection,
		isnull(v.DateOfValuation,'01 Jan 1900')				as DateOfValuation,

		IsNull(v.FkValuationStatusId,0)						as ValuationStatusId,
		s.[Description]										as ValuationStatus,
		IsNull(v.FkLegalEntityId, 0)						as LegalEntityId,	--surveyor
		IsNull(l.LegalEntityName,'')						as SurveyorName,
		l.LastUpdate,
		IsNull(l.LastUpdateBy,'')							as	LastUpdateBy,
		IsNull(sec.address_1, '') + 
			CASE WHEN IsNull(sec.address_2, '') = '' THEN '' ELSE ', ' + IsNull(sec.address_2, '') END +
			CASE WHEN IsNull(sec.address_3, '') = '' THEN '' ELSE ', ' + IsNull(sec.address_3, '') END +
			CASE WHEN IsNull(sec.county, '')	= '' THEN '' ELSE ', ' + IsNull(sec.county, '') END +
			CASE WHEN IsNull(sec.post_code, '') = '' THEN '' ELSE ', ' + IsNull(sec.post_code, '') END
															As	SecurityAddress,
		IsNull(sec.post_code, '')							as	SecurityPostCode,
		case when isnull(frv.FkValuationId,0)<>0 then 0 else 1 end as isExternalValuation

	from			Dawn_Data.Loan.FundRequest			f
	inner join		Dawn_Data.Loan.Valuation				v	ON f.FkLoanId			= v.FkLoanId
	left join		Dawn_Data.Loan.FundRequestValuation	frv	on	frv.FkValuationId	=	v.ValuationId
	left outer join Dawn_Data.Loan.Contact				c	ON v.FkContactId		= c.ContactId
	left outer join Dawn_Data.Loan.LegalEntity			l	ON v.FkLegalEntityId	= l.LegalEntityId
	inner join		Dawn_Data.Reference.ValuationStatus	s	ON v.FkValuationStatusId = s.ValuationStatusId
	inner join		Dawn_Data.Loan.[Security]			sec ON v.FkSecurityId		= sec.security_id
	WHERE f.FundRequestId = @FundRequestId
	--from			Dawn_Data.Loan.FundRequestValuation	f
	--inner join		Dawn_Data.Loan.Valuation				v	ON f.FkValuationId		= v.ValuationId
	--left outer join Dawn_Data.Loan.Contact				c	ON v.FkContactId		= c.ContactId
	--left outer join Dawn_Data.Loan.LegalEntity			l	ON v.FkLegalEntityId	= l.LegalEntityId
	--inner join		Dawn_Data.Reference.ValuationStatus	s	ON v.FkValuationStatusId = s.ValuationStatusId
	--inner join		Dawn_Data.Loan.[Security]			sec ON v.FkSecurityId		= sec.security_id
	--WHERE f.FkFundRequestId = @FundRequestId
	
	insert	@Valuations (	ValuationId,
							LoanId,
							SecurityId,
							ApplicantValueEstimate	,
							ApplicantGdvEstimate		,
							ApplicantValuationFee		,
							SurveyorComments			,
							ContactId					,
							ContactName					,
							MarketValue					,
							NinetyDayValue				,
							GrossDevelopmentValue		,
							GrossDevelopmentNinetyDayValue	,
							RentalValue					,
							ReinstatementValue			,
							Notes						,
							DateOfInstruction			,
							DateOfInspection			,
							DateOfValuation				,
							ValuationStatusId			,
							ValuationStatus				,
							LegalEntityId				,
							SurveyorName				,
							LastUpdate					,
							LastUpdateBy				,
							SecurityAddress				,
							SecurityPostCode			,
							isExternalValuation
							)

	select
		v.ValuationId										as	ValuationId,
		IsNull(v.FkLoanId, 0)								as	LoanId,
		IsNull(v.FkSecurityId, 0)							as	SecurityId,
		IsNull(v.ApplicantValueEstimate,0)					as	ApplicantValueEstimate,
		IsNull(v.ApplicantGdvEstimate,0)					as	ApplicantGdvEstimate,
		IsNull(v.ApplicantValuationFee,0)					as	ApplicantValuationFee,
		IsNull(v.SurveyorComments,'')						as	SurveyorComments,
		IsNull(v.FkContactId, 0)							as	ContactId,
		LTRIM(IsNull(c.FirstName + ' ' + c.Surname, ''))	as	ContactName,
		IsNull(v.MarketValue, 0)							as	MarketValue,
		IsNull(v.NinetyDayValue, 0)							as	NinetyDayValue,
		IsNull(v.GrossDevelopmentValue, 0)					as	GrossDevelopmentValue,
		IsNull(v.GrossDevelopmentNinetyDayValue, 0)			as	GrossDevelopmentNinetyDayValue,
		IsNull(v.RentalValue, 0)							as	RentalValue,
		IsNull(v.ReinstatementValue, 0)						as	ReinstatementValue,
		IsNull(v.Notes,'')									as	Notes,
		isnull(v.DateOfInstruction,'01 Jan 1900')				as DateOfInstruction,
		isnull(v.DateOfInspection,'01 Jan 1900')				as DateOfInspection,
		isnull(v.DateOfValuation,'01 Jan 1900')				as DateOfValuation,

		IsNull(v.FkValuationStatusId,0)						as ValuationStatusId,
		s.[Description]										as ValuationStatus,
		IsNull(v.FkLegalEntityId, 0)						as LegalEntityId,	--surveyor
		IsNull(l.LegalEntityName,'')						as SurveyorName,
		l.LastUpdate,
		IsNull(l.LastUpdateBy,'')							as	LastUpdateBy,
		IsNull(sec.address_1, '') + 
			CASE WHEN IsNull(sec.address_2, '') = '' THEN '' ELSE ', ' + IsNull(sec.address_2, '') END +
			CASE WHEN IsNull(sec.address_3, '') = '' THEN '' ELSE ', ' + IsNull(sec.address_3, '') END +
			CASE WHEN IsNull(sec.county, '')	= '' THEN '' ELSE ', ' + IsNull(sec.county, '') END +
			CASE WHEN IsNull(sec.post_code, '') = '' THEN '' ELSE ', ' + IsNull(sec.post_code, '') END
															As SecurityAddress,
		IsNull(sec.post_code, '')							as	SecurityPostCode,
														 
															 1 as isExternalValuation
	from			Dawn_Data.Loan.Valuation				v
	left join		@Valuations								vs	on vs.ValuationId		= v.ValuationId
	left outer join Dawn_Data.Loan.Contact				c	on v.FkContactId		= c.ContactId
	left outer join Dawn_Data.Loan.LegalEntity			l	on v.FkLegalEntityId	= l.LegalEntityId
	inner join		Dawn_Data.Reference.ValuationStatus	s	on v.FkValuationStatusId = s.ValuationStatusId
	inner join		Dawn_Data.Loan.[Security]			sec on v.FkSecurityId		= sec.security_id
	where	v.fkLoanId in (
		select distinct fkLoanId from Dawn_Data.Loan.FundRequest where FundRequestId = @FundRequestId
	)
		and vs.ValuationId is null
		and v.DateOfInstruction is not null

	delete @Valuations where ValuationId not in (
			select min(v.ValuationId) 
				from		@Valuations				v
				inner join	(select distinct 
											convert(int,0) ValuationId
											,LoanId
											,SecurityId
											,isnull(DateOfInstruction,'01 Jan 1900') DateOfInstruction
											,isnull(DateOfValuation,'01 Jan 1900') DateOfValuation
											, isnull(MarketValue,0) MarketValue
											,ValuationStatusId
							from @Valuations
							)	d
					on	v.SecurityId		=	d.SecurityId
					and v.DateOfInstruction	=	d.DateOfInstruction
					and v.DateOfValuation	=	d.DateOfValuation
					and	v.MarketValue		=	d.MarketValue
			group by
				v.SecurityId,v.DateOfInstruction,v.DateOfValuation,v.MarketValue,v.ValuationStatusId
			)


	select	ValuationId,
			LoanId,
			SecurityId,
			ApplicantValueEstimate,
			ApplicantGdvEstimate,
			ApplicantValuationFee,
			SurveyorComments,
			ContactId					,
			ContactName					,
			MarketValue					,
			NinetyDayValue				,
			GrossDevelopmentValue		,
			GrossDevelopmentNinetyDayValue	,
			RentalValue					,
			ReinstatementValue			,
			Notes						,
			DateOfInstruction			,
			DateOfInspection			,
			DateOfValuation				,
			ValuationStatusId			,
			ValuationStatus				,
			LegalEntityId				,
			SurveyorName				,
			LastUpdate					,
			LastUpdateBy				,
			SecurityAddress				,
			SecurityPostCode			,
			isExternalValuation
	from
		@Valuations
	order by 
	--ValuationId
		DateOfValuation
end

GO
/****** Object:  StoredProcedure [Loan].[ValuationByLoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[ValuationByLoanGet]	@LoanId Int
AS Begin

	set nocount on 

	declare @Valuations table(
							ValuationId					int,
							LoanId						int,
							SecurityId					int,
							ApplicantValueEstimate		money,
							ApplicantGdvEstimate		money,
							ApplicantValuationFee		money,
							SurveyorComments			varchar(max),
							ContactId					int,
							ContactName					varchar(max),
							MarketValue					money,
							NinetyDayValue				money,
							GrossDevelopmentValue		money,
							GrossDevelopmentNinetyDayValue	money,
							RentalValue					money,
							ReinstatementValue			money,
							Notes						varchar(max),
							DateOfInstruction			datetime,
							DateOfInspection			datetime,
							DateOfValuation				datetime,
							ValuationStatusId			int,
							ValuationStatus				varchar(max),
							LegalEntityId				int,
							SurveyorName				varchar(max),
							LastUpdate					datetime,
							LastUpdateBy				varchar(128),
							SecurityAddress				varchar(max),
							SecurityPostCode			varchar(32),
							isExternalValuation			bit
							)

	--select * from Dawn_Data.Loan.Valuation

	insert	@Valuations (	ValuationId,
							LoanId,
							SecurityId,
							ApplicantValueEstimate	,
							ApplicantGdvEstimate		,
							ApplicantValuationFee		,
							SurveyorComments			,
							ContactId					,
							ContactName					,
							MarketValue					,
							NinetyDayValue				,
							GrossDevelopmentValue		,
							GrossDevelopmentNinetyDayValue	,
							RentalValue					,
							ReinstatementValue			,
							Notes						,
							DateOfInstruction			,
							DateOfInspection			,
							DateOfValuation				,
							ValuationStatusId			,
							ValuationStatus				,
							LegalEntityId				,
							SurveyorName				,
							LastUpdate					,
							LastUpdateBy				,
							SecurityAddress				,
							SecurityPostCode			,
							isExternalValuation
							)

	select
		v.ValuationId										as	ValuationId,
		IsNull(v.FkLoanId, 0)								as	LoanId,
		IsNull(v.FkSecurityId, 0)							as	SecurityId,
		IsNull(v.ApplicantValueEstimate,0)					as	ApplicantValueEstimate,
		IsNull(v.ApplicantGdvEstimate,0)					as	ApplicantGdvEstimate,
		IsNull(v.ApplicantValuationFee,0)					as	ApplicantValuationFee,
		IsNull(v.SurveyorComments,'')						as	SurveyorComments,
		IsNull(v.FkContactId, 0)							as	ContactId,
		LTRIM(IsNull(c.FirstName + ' ' + c.Surname, ''))	as	ContactName,
		IsNull(v.MarketValue, 0)							as	MarketValue,
		IsNull(v.NinetyDayValue, 0)							as	NinetyDayValue,
		IsNull(v.GrossDevelopmentValue, 0)					as	GrossDevelopmentValue,
		IsNull(v.GrossDevelopmentNinetyDayValue, 0)			as	GrossDevelopmentNinetyDayValue,
		IsNull(v.RentalValue, 0)							as	RentalValue,
		IsNull(v.ReinstatementValue, 0)						as	ReinstatementValue,
		IsNull(v.Notes,'')									as	Notes,
		isnull(DateOfInstruction,'01 Jan 1900')				as DateOfInstruction,
		isnull(DateOfInspection,'01 Jan 1900')				as DateOfInspection,
		isnull(DateOfValuation,'01 Jan 1900')				as DateOfValuation,
		IsNull(v.FkValuationStatusId,0)						as ValuationStatusId,
		s.[Description]										as ValuationStatus,
		IsNull(v.FkLegalEntityId, 0)						as LegalEntityId,	--surveyor
		IsNull(l.LegalEntityName,'')						as SurveyorName,
		l.LastUpdate,
		IsNull(l.LastUpdateBy,'')							as	LastUpdateBy,
		IsNull(sec.address_1, '') + 
			CASE WHEN IsNull(sec.address_2, '') = '' THEN '' ELSE ', ' + IsNull(sec.address_2, '') END +
			CASE WHEN IsNull(sec.address_3, '') = '' THEN '' ELSE ', ' + IsNull(sec.address_3, '') END +
			CASE WHEN IsNull(sec.county, '')	= '' THEN '' ELSE ', ' + IsNull(sec.county, '') END +
			CASE WHEN IsNull(sec.post_code, '') = '' THEN '' ELSE ', ' + IsNull(sec.post_code, '') END
															As SecurityAddress
		,IsNull(sec.post_code, '')							as	SecurityPostCode			
		,1													as isExternalValuation
	from			Dawn_Data.Loan.Valuation				v
	left outer join Dawn_Data.Loan.Contact				c	on v.FkContactId		= c.ContactId
	left outer join Dawn_Data.Loan.LegalEntity			l	on v.FkLegalEntityId	= l.LegalEntityId
	inner join		Dawn_Data.Reference.ValuationStatus	s	on v.FkValuationStatusId = s.ValuationStatusId
	inner join		Dawn_Data.Loan.[Security]			sec on v.FkSecurityId		= sec.security_id
	where	v.fkLoanId  = @LoanId

	delete @Valuations where ValuationId not in (
			select min(v.ValuationId) 
				from		@Valuations				v
				inner join	(select distinct 
											convert(int,0) ValuationId
											,LoanId
											,SecurityId
											,isnull(DateOfInstruction,'01 Jan 1900') DateOfInstruction
											,isnull(DateOfValuation,'01 Jan 1900') DateOfValuation
											, isnull(MarketValue,0) MarketValue
											,ValuationStatusId
							from @Valuations
							)	d
					on	v.SecurityId		=	d.SecurityId
					and v.DateOfInstruction	=	d.DateOfInstruction
					and v.DateOfValuation	=	d.DateOfValuation
					and	v.MarketValue		=	d.MarketValue
			group by
				v.SecurityId,v.DateOfInstruction,v.DateOfValuation,v.MarketValue,v.ValuationStatusId
			)

	select	ValuationId,
			LoanId,
			SecurityId,
			ApplicantValueEstimate,
			ApplicantGdvEstimate,
			ApplicantValuationFee,
			SurveyorComments,
			ContactId					,
			ContactName					,
			MarketValue					,
			NinetyDayValue				,
			GrossDevelopmentValue		,
			GrossDevelopmentNinetyDayValue	,
			RentalValue					,
			ReinstatementValue			,
			Notes						,
			DateOfInstruction			,
			DateOfInspection			,
			DateOfValuation				,
			ValuationStatusId			,
			ValuationStatus				,
			LegalEntityId				,
			SurveyorName				,
			LastUpdate					,
			LastUpdateBy				,
			SecurityAddress				,
			SecurityPostCode			,
			isExternalValuation
	from
		@Valuations
	order by 
	--ValuationId
		DateOfValuation
end
GO
/****** Object:  StoredProcedure [Loan].[ValuationDelete]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [Loan].[ValuationDelete]
										@SecurityId Int, 
										@ValuationId Int
as begin
	delete Dawn_Data.Loan.Valuation WHERE (FkSecurityid = @SecurityId and ValuationId = @ValuationId)
end
GO
/****** Object:  StoredProcedure [Loan].[ValuationDocumentByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[ValuationDocumentByIdGet]
	@ValuationDocumentId Int
AS

SELECT 
	FileName, 
	Document
FROM Dawn_Data.Loan.ValuationDocument
WHERE ValuationDocumentId = @ValuationDocumentId


GO
/****** Object:  StoredProcedure [Loan].[ValuationDocumentExists]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[ValuationDocumentExists]
	@ValuationId Int,
	@ValuationDocumentTypeId Int,
	@FileName NVarChar(4000)
AS

SELECT	
	CASE WHEN EXISTS (SELECT TOP 1 *
						FROM Dawn_Data.Loan.ValuationDocument d
						WHERE d.FkValuationId = @ValuationId
						  AND d.FkValuationDocumentTypeId = @ValuationDocumentTypeId
						  AND d.FileName = @FileName)
		THEN CONVERT(bit, 1)
		ELSE CONVERT(bit, 0)
	END As DocumentExists


GO
/****** Object:  StoredProcedure [Loan].[ValuationDocumentGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[ValuationDocumentGet]
	@ValuationId Int,
	@ValuationDocumentTypeId Int

AS

SELECT 
	ValuationDocumentId,
	FkValuationId AS ValuationId,
	FkValuationDocumentTypeId As ValuationDocumentTypeId,
	FileName,
	LastUpdate As DocumentDate,
	DataLength(Document) As DocumentLength
INTO #TempList
FROM Dawn_Data.Loan.ValuationDocument
WHERE FkValuationId = @ValuationId
  AND (@ValuationDocumentTypeId = 0 OR FkValuationDocumentTypeId = @ValuationDocumentTypeId)

-- For some reason if you do the IS NOT NULL on the document within the where clause, 
-- it seems to do a full scan of every document which causes the query to hang, hence
-- selecting via temporary table
SELECT * 
FROM #TempList
WHERE DocumentLength IS NOT NULL


GO
/****** Object:  StoredProcedure [Loan].[ValuationDocumentIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Loan].[ValuationDocumentIns]
	@ValuationDocumentId Int OUTPUT,
	@ValuationId Int,
	@ValuationDocumentTypeId Int,
	@FileName NVarChar(1000),
	@FileChunk VarBinary(max),
	@User NVarChar(255)
AS

-- Staff_Id is stored with domain prefix some places and without domain prefix in others.
-- The convention in the tbl_staff table is without prefix, so Aura will do the same
-- we can fudge it here so the Access calculator still works and then fix it later

IF (CHARINDEX('OMN\', @User) = 0)
	SELECT @User = 'OMN\' + @User

INSERT INTO Dawn_Data.Loan.ValuationDocument(FkValuationId, FkValuationDocumentTypeId, FileName, Document, CreatedBy, Created, LastUpdateBy, LastUpdate)
SELECT @ValuationId, @ValuationDocumentTypeId, @FileName, @FileChunk, @User, GETDATE(), @User, GETDATE()

SELECT @ValuationDocumentId = SCOPE_IDENTITY()
GO
/****** Object:  StoredProcedure [Loan].[ValuationDocumentUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Loan].[ValuationDocumentUpd]
	@ValuationDocumentId Int,
	@FileChunk VarBinary(max)
AS

UPDATE Dawn_Data.Loan.ValuationDocument
SET Document.Write(@FileChunk, null, null)
WHERE ValuationDocumentId = @ValuationDocumentId


GO
/****** Object:  StoredProcedure [Loan].[ValuationGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/********************************************************************************************************************/

CREATE PROCEDURE [Loan].[ValuationGet]	@SecurityId Int, 
										@ValuationId Int
AS Begin

	-- PJR 21.11.16 made security a left join -> we have vals with missing securities, not parsed in import process.
	-- PJR 20170317 show insp instead of val date
	-- PJR 20170602 add valuation basis
	-- PJR 20170614 fix time in dates
	set nocount on

	select 
		ValuationId,
		ISNULL(FkLoanId, 0)									LoanId,
		ISNULL(FkSecurityId, 0)								SecurityId,
		ISNULL(FkValuationBasisId, 0)						ValuationBasisId,
		ISNULL(ValuationBasis, '')							ValuationBasis,
		ApplicantValueEstimate,
		ApplicantGdvEstimate,
		ApplicantValuationFee,
		SurveyorComments,
		ISNULL(FkContactId, 0)								ContactId,
		LTRIM(ISNULL(c.FirstName + ' ' + c.Surname, ''))	ContactName,
		isnull(MarketValue,0)								MarketValue,
		isnull(NinetyDayValue,0)							NinetyDayValue,
		isnull(GrossDevelopmentValue,0)						GrossDevelopmentValue,
		isnull(GrossDevelopmentNinetyDayValue,0)			GrossDevelopmentNinetyDayValue,
		isnull(RentalValue,0)								RentalValue,
		isnull(ReinstatementValue,0)						ReinstatementValue,
		v.Notes,
		isnull(v.DateOfInstruction,'01 Jan 1900')			DateOfInstruction,
		isnull(v.DateOfInspection,'01 Jan 1900')			DateOfInspection,
		isnull(v.DateOfValuation,'01 Jan 1900')				DateOfValuation,
		FkValuationStatusId									ValuationStatusId,
		s.Description										ValuationStatus,
		ISNULL(FkLegalEntityId, 0)							LegalEntityId,
		l.LegalEntityName									SurveyorName,
		l.LastUpdate,
		l.LastUpdateBy,
		ISNULL(sec.address_1,'') + 
			CASE WHEN ISNULL(sec.address_2,'') = '' THEN '' ELSE ', ' + ISNULL(sec.address_2,'') END +
			CASE WHEN ISNULL(sec.address_3,'') = '' THEN '' ELSE ', ' + ISNULL(sec.address_3,'') END +
			CASE WHEN ISNULL(sec.county,'') = '' THEN '' ELSE ', ' +ISNULL(sec.county,'') END +
			CASE WHEN ISNULL(sec.post_code,'') = '' THEN '' ELSE ', ' + ISNULL(sec.post_code,'') END
															SecurityAddress
	into #v
	FROM			Dawn_Data.Loan.Valuation				v
	left join		Dawn_Data.Reference.ValuationBasis	vb	on	vb.ValuationBasisId		=	v.fkValuationBasisId
	LEFT OUTER JOIN Dawn_Data.Loan.Contact				c	ON v.FkContactId			=	c.ContactId
	LEFT OUTER JOIN Dawn_Data.Loan.LegalEntity			l	ON v.FkLegalEntityId		=	l.LegalEntityId
	JOIN Dawn_Data.Reference.ValuationStatus				s	ON v.FkValuationStatusId	=	s.ValuationStatusId
	left JOIN Dawn_Data.Loan.Security					sec ON v.FkSecurityId			=	sec.security_id
	WHERE (@SecurityId = 0 OR FkSecurityid = @SecurityId)
	  AND (@ValuationId = 0 OR ValuationId = @ValuationId)

	select 	ValuationId,
			LoanId,
			SecurityId,
			ValuationBasisId,
			ValuationBasis,
			ApplicantValueEstimate,
			ApplicantGdvEstimate,
			ApplicantValuationFee,
			SurveyorComments,
			ContactId,
			ContactName,
			MarketValue,
			NinetyDayValue,
			GrossDevelopmentValue,

			GrossDevelopmentNinetyDayValue,
			RentalValue,
			ReinstatementValue,
			Notes,
			case when DateOfInstruction = '1 jan 1900' then null else DateOfInstruction end DateOfInstruction,
			case when DateOfInspection = '1 jan 1900' then null else DateOfInspection end DateOfInspection,
--PJR 20170317 to fool the web
			--case when DateOfInspection = '1 jan 1900' then null else DateOfInspection end DateOfValuation,
			case when DateOfValuation = '1 jan 1900' then null else DateOfValuation end DateOfValuation,
			ValuationStatusId,
			ValuationStatus,
			LegalEntityId,
			SurveyorName,
			LastUpdate,
			LastUpdateBy,
			SecurityAddress
	from	#v
--PJR 20170614
	--order by DateOfValuation desc
	order by case when DateOfInstruction='31 dec 9999' then '1 jan 1900' else DateOfInstruction end desc

end

GO
/****** Object:  StoredProcedure [Loan].[ValuationInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/********************************************************************************************************************/

CREATE PROCEDURE [Loan].[ValuationInsUpd]	@ValuationId Int,
											@LoanId Int,
											@SecurityId Int,
											@LegalEntityId Int,
											@ValuationBasisId Int, --PJR 17.6.2
											@ValuationStatusId Int,
											@ContactId Int,
											@SurveyorComments NVarChar(max),
											@DateOfInstruction DateTime,
											@DateOfInspection DateTime,
											@DateOfValuation DateTime,
											@ApplicantValueEstimate Money,	@ApplicantGdvEstimate Money,	@ApplicantValuationFee Money,
											@MarketValue Money,
											@NinetyDayValue Money,
											@GrossDevelopmentValue Money,	@GrossDevelopmentNinetyDayValue Money,
											@RentalValue Money,
											@ReinstatementValue Money,
											@Notes NVarChar(max),
											@User NVarChar(255)
as begin

	set nocount on

	--PJR 20170614 handle time in vals

	IF exists (select * from Dawn_Data.Loan.Valuation where ValuationId = @ValuationId)
		begin

		--PJR 20170614 handle time in vals
			declare 	@prevDateOfInstruction DateTime,
						@prevDateOfInspection DateTime,
						@prevDateOfValuation DateTime		

			select	@prevDateOfInstruction	=	DateOfInstruction,
					@prevDateOfInspection	=	DateOfInspection,
					@prevDateOfValuation	=	DateOfValuation
			from	Dawn_Data.Loan.Valuation
			where	ValuationId					= @ValuationId

			if @prevDateOfInstruction is not null begin
				if convert(date,@DateOfInstruction) <> convert(date,@prevDateOfInstruction)--day changed?
					set @DateOfInstruction = convert(datetime, convert(varchar,convert(date,@DateOfInstruction))) + ' ' + convert(varchar,getdate(),108)
				else
					set @DateOfInstruction = @prevDateOfInstruction --this will preserve the time
			end

			if  @prevDateOfInspection is not null begin
					if convert(date,@DateOfInspection) <> convert(date,@prevDateOfInspection) --day changed?
						set @DateOfInspection = convert(datetime, convert(varchar,convert(date,@DateOfInspection))) + ' ' + convert(varchar,getdate(),108)
					else
						set @DateOfInspection = @prevDateOfInspection
			end

			if  @prevDateOfValuation is not null begin
				if convert(date,@DateOfValuation) <> convert(date,@prevDateOfValuation) --day changed?
					set @DateOfValuation = convert(datetime, convert(varchar,convert(date,@DateOfValuation))) + ' ' + convert(varchar,getdate(),108)
				else
					set @DateOfValuation = @prevDateOfInstruction
			end
			--PJR 20170614 end of change

			update Dawn_Data.Loan.Valuation
				SET FkSecurityId				= @SecurityId,
					FkLegalEntityId				= @LegalEntityId,
					FkValuationStatusId			= @ValuationStatusId,
					FkValuationBasisId			= @ValuationBasisId,
					FkContactId					= @ContactId,
					SurveyorComments			= @SurveyorComments,
					DateOfInstruction			= @DateOfInstruction,
					DateOfInspection			= @DateOfInspection,
					DateOfValuation				= @DateOfValuation,
					ApplicantValueEstimate		= @ApplicantValueEstimate,
					ApplicantGdvEstimate		= @ApplicantGdvEstimate,
					ApplicantValuationFee		= @ApplicantValuationFee,
					MarketValue					= @MarketValue,
					NinetyDayValue				= @NinetyDayValue,
					GrossDevelopmentValue		= @GrossDevelopmentValue,
					GrossDevelopmentNinetyDayValue = @GrossDevelopmentNinetyDayValue,
					RentalValue					= @RentalValue,
					ReinstatementValue			= @ReinstatementValue,
					Notes						= @Notes,
					LastUpdate					= GETDATE(),
					LastUpdateBy				= @User
			where	ValuationId					= @ValuationId

		end
	else
		begin
			insert Dawn_Data.Loan.Valuation(
							FkLoanId, FkSecurityId, FkLegalEntityId, FkValuationStatusId, FkValuationBasisId, FkContactId --PJR 17.6.2
							, SurveyorComments
							, DateOfInstruction, DateOfInspection, DateOfValuation
							, ApplicantValueEstimate, ApplicantGdvEstimate,	ApplicantValuationFee
							, MarketValue, NinetyDayValue
							, GrossDevelopmentValue, GrossDevelopmentNinetyDayValue
							, RentalValue, ReinstatementValue, Notes
							, Created, CreatedBy, LastUpdate, LastUpdateBy
							)

			select	@LoanId, @SecurityId, @LegalEntityId
					, @ValuationStatusId
					--,(select top 1 isnull(ValuationStatusId,0) from Dawn_Data.[Reference].[ValuationStatus] where rtrim(ltrim([Description]))='Received')
					, @ValuationBasisId --PJR 17.6.2
					, @ContactId
					, @SurveyorComments
					--, @DateOfInstruction, @DateOfInspection, @DateOfValuation
					,convert(datetime, convert(varchar,convert(date,@DateOfInstruction))) + ' ' + convert(varchar,getdate(),108)
					,convert(datetime, convert(varchar,convert(date,@DateOfInspection))) + ' ' + convert(varchar,getdate(),108)
					,convert(datetime, convert(varchar,convert(date,@DateOfValuation))) + ' ' + convert(varchar,getdate(),108)

					/*
					DateOfInstruction			= @DateOfInstruction,
					DateOfInspection			= @DateOfInspection,
					DateOfValuation				= @DateOfValuation,
					*/

					, @ApplicantValueEstimate, @ApplicantGdvEstimate, @ApplicantValuationFee
					, @MarketValue	
					--, @ApplicantValueEstimate
					, @NinetyDayValue
					, @GrossDevelopmentValue, @GrossDevelopmentNinetyDayValue
					, @RentalValue, @ReinstatementValue, @Notes
					, GETDATE(), @User, GETDATE(), @User
	
			SELECT @ValuationId = SCOPE_IDENTITY()
		end

	SELECT @ValuationId As ValuationId

errexit:
end
--select * from Dawn_Data.[Reference].[ValuationStatus]
GO
/****** Object:  StoredProcedure [Loan].[ValuationSecurityAddressUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Loan].[ValuationSecurityAddressUpd]	@ValuationId Int,@SecurityAddress varchar(max)
as begin
	set nocount on 
	declare	 @SecurityId	int
			,@LoanId		int
			,@PrevSecaddr	varchar(max)
			,@PrevValuationId int
	if exists(select * from Dawn_Data.Loan.Valuation where ValuationId=@ValuationId)
	begin
		select 	@SecurityId=fksecurityId,@LoanId=FkLoanId from Dawn_Data.Loan.Valuation where ValuationId=@ValuationId

		select @PrevValuationId  = max(ValuationId) from Dawn_Data.Loan.Valuation where ValuationId<@ValuationId and @SecurityId=fksecurityId and @LoanId=FkLoanId

		select 	@PrevSecaddr=SecurityAddress from Dawn_Data.Loan.Valuation where ValuationId=@PrevValuationId

		update Dawn_Data.Loan.Valuation  set SecurityAddress = @PrevSecaddr where ValuationId = @ValuationId
	end
end

GO
/****** Object:  StoredProcedure [Loan].[ValuerEntityGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [Loan].[ValuerEntityGet]	@LegalEntityId Int
as Begin

	set nocount on

	select	 --e.SurveyorId					LegalEntityId
			 l.LegalEntityId
			,l.LegalEntityName
			,l.fkLegalEntityTypeId
	from		Dawn_Data.[Loan].[Surveyor]		e
	inner join	Dawn_Data.[Loan].[LegalEntity]	l	on	l.LegalEntityId	=	e.fkLegalEntityId
	--where	SurveyorId = @LegalEntityId
	where	l.LegalEntityId = @LegalEntityId

	if exists(select * from Dawn_Data.[Loan].[AddressOfLegalEntity] where [FkLegalEntityId] = @LegalEntityId)
		select	 a.[AddressId]
				,a.[AddrLn1]	,a.[AddrLn2]	,a.[AddrLn3]	,a.[AddrLn4]	,a.[PostCode]	,a.[County]
				,a.[Notes]		,a.[FkISOCountry]	,a.[FkRegionId],a.isActive,a.Created,a.CreatedBy,a.Lastupdate,a.LastupdateBy
		from Dawn_Data.Loan.AddressOfLegalEntity	al
		join Dawn_Data.Loan.[Address]			a	ON al.FkAddressId = a.AddressId
		where	al.FkLegalEntityId	= @LegalEntityId
			and al.Isactive			= 1 
			and a.IsActive			= 1
	else
		select	 convert(tinyint,0)	[AddressId]
				,convert(varchar(255),'')	[AddrLn1]	
				,convert(varchar(255),'')	[AddrLn2]	
				,convert(varchar(255),'')	[AddrLn3]
				,convert(varchar(255),'')	[AddrLn4]
				,convert(varchar(32),'')	[PostCode]
				,convert(varchar(128),'')	[County]
				,convert(varchar(max),'')	[Notes]
				,convert(tinyint,0)			[FkISOCountry]
				,convert(tinyint,0)			[FkRegionId]
				,convert(tinyint,0)			isActive
				,convert(datetime,null)		Created
				,'Process'					CreatedBy
				,convert(datetime,null)		Lastupdate
				,'Process'					LastupdateBy
end
GO
/****** Object:  StoredProcedure [Loan].[WriteOffNoteIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Loan].[WriteOffNoteIns]	@LoanId int, @Note varchar(max), @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try

		insert	Dawn_Data.Loan.LoanNote(fkLoanId,CaseReference,fkSourceId,fkNoteSourceId,fkNotePropertyID,[Note])
			select	 @LoanId 
					,(select CBFL_id			from Dawn_Data.Loan.Loan					where loan_id		=	@LoanId)
					,@LoanId
					,isnull((select NoteSourceID	from Dawn_Data.Reference.NoteSource		where NoteSource	=	'WriteOffLog'),0)
					,isnull((select NotePropertyId	from Dawn_Data.Reference.NoteProperty	where NoteProperty	=	'Note'),0)
					,@Note

		set @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [LoanCalc].[GenerateInterestWeighting]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [LoanCalc].[GenerateInterestWeighting] @message varchar(255) output, @rc int output, @debug int
as begin
/*	PW		20180426	First version
*/
	set nocount on
--	set dateformat dmy
--USE [Dawn_Data_v100]
--GO

--/****** Object:  Schema [LoanCalc]    Script Date: 26/04/2018 17:16:48 ******/
--CREATE SCHEMA [LoanCalc]
--GO

DECLARE @StartDate DATE
DECLARE @Term INTEGER
DECLARE @loanId INTEGER
DECLARE @I INTEGER
DECLARE @InterestRate DECIMAL(18,9)
DECLARE @SumCashflowInterest DECIMAL(18,9)
DECLARE @CashflowInterestRate_id INTEGER, @InterestStartDate DATE, @InterestEndDate DATE, @cashflowInterest_type INTEGER
DECLARE @InterestEndDatePlusOne DATE -- the following month
DECLARE @EndOfDaysId INT, @StartDay INT, @StartMonth INT, @StartYear INT, @EndDay INT, @EndMonth INT, @EndYear INT, @Days  INT, @LeapYear INT, @Series INT, @IsActive BIT
SET @loanId=1805
SET @Term=18
SET @StartDate =GETDATE()
PRINT Format(@StartDate, 'dd-MMM-yyyy', 'en-US')
SET @InterestRate = 0.030000000

CREATE TABLE #cfir(id INT IDENTITY(1,1) NOT NULL, CashflowInterestRate_id INT,InterestStartDate DATE,InterestEndDate DATE, cashflowInterest_type INT, InterestRate DECIMAL(18,9))
CREATE TABLE #EndOfDays(CashflowInterestRate_id INTEGER, CashflowDate DATETIME, EndOfDaysId INT, StartDay INT, StartMonth INT, StartYear INT, EndDay INT, EndMonth INT, EndYear INT, [Days]  INT, LeapYear INT, Series INT, IsActive BIT,StartDiff INT, EndDIFF INT)
 -- Regulated lending does NOT have default loading
TRUNCATE TABLE #cfir
TRUNCATE TABLE #EndOfDays
INSERT #cfir(CashflowInterestRate_id, InterestStartDate, InterestEndDate, cashflowInterest_type , InterestRate ) 
			SELECT CashflowInterestRate_id, CFIR.InterestStartDate, CFIR.InterestEndDate, cashflowInterest_type , InterestRate               
			FROM [Dawn_Data].[LoanCalc].[CashflowInterestRate] CFIR WHERE loan_id=@loanId AND (InterestRate <>0.030000000 AND cashflowInterest_type=1)

--SELECT CashflowInterestRate_id, CFIR.InterestStartDate, CFIR.InterestEndDate, cashflowInterest_type , InterestRate               
--			FROM [Dawn_Data].[LoanCalc].[CashflowInterestRate] CFIR WHERE loan_id=@loanId AND (InterestRate <>0.030000000 AND cashflowInterest_type=1);

 			select @i= min(CashflowInterestRate_id) from #cfir

while @i is not null begin
	PRINT @I
		SELECT @InterestStartDate=InterestStartDate, 	@CashflowInterestRate_id=CashflowInterestRate_id,  @InterestEndDate=InterestEndDate, @cashflowInterest_type=cashflowInterest_type, 
		@InterestRate =InterestRate 
		FROM #cfir WHERE CashflowInterestRate_id=@i

		PRINT Format(@InterestStartDate, 'dd-MMM-yyyy', 'en-US') + ' ' +  Format(@InterestEndDate, 'dd-MMM-yyyy', 'en-US')
		SELECT @InterestEndDatePlusOne =DATEADD(MONTH,1, @InterestEndDate) -- Follow on month to get the number of days
		SELECT @StartDay=DAY(@InterestStartDate), @StartMonth=MONTH(@InterestStartDate), @StartYear=YEAR(@InterestStartDate)
		SELECT @endDay=DAY(@InterestEndDate), @endMonth=MONTH(@InterestEndDate), @endYear=YEAR(@InterestEndDate)

		--SELECT @EndOfDaysId=EndOfDaysId, @StartDay=StartDay, @StartMonth=StartMonth, @StartYear=StartYear,
		--@EndDay=EndDay, @EndMonth=EndMonth, @EndYear=EndYear,
		--@Days=[Days], @LeapYear=LeapYear,  @Series=Series,  @IsActive=IsActive
		SELECT @EndOfDaysId=EndOfDaysId, @Series=Series,  @IsActive=IsActive
		FROM  Reference.EndOfDays
		WHERE StartDay=@StartDay AND StartMonth=@StartMonth AND StartYear=@StartYear AND IsActive=1
		print '@EndOfDaysId'
		print isnull(@EndOfDaysId,0)
		PRINT @endYear +'-' 
		PRINT  @endMonth +'-' 
		PRINT  @endDay
		PRINT '@Series'
		PRINT @Series
/*
23-Apr-2016 10-May-2017
23-Sep-2016 24-Oct-2017

*/
		
		IF @EndOfDaysId is not null 
	
			INSERT INTO #EndOfDays(CashflowInterestRate_id,CashflowDate, StartDiff, EndDIFF,EndOfDaysId, StartDay, StartMonth, StartYear, EndDay, EndMonth, EndYear, [Days], LeapYear, Series, IsActive)
			
			SELECT   @i, CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST(EndDay  AS VARCHAR(2))) [CashflowDate],
			DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(StartDay  AS VARCHAR(2)) )) StarTDiff,
			--@InterestStartDate AS [@InterestStartDate],
			DATEDIFF(d, @InterestEndDatePlusOne, CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST(EndDay  AS VARCHAR(2)) )) EndDIFF,
			--@InterestEndDate AS [@InterestEndDate],
			EndOfDaysId, StartDay, StartMonth, StartYear, EndDay, EndMonth, EndYear, [Days], LeapYear, Series, IsActive
			FROM  [Dawn_Data].Reference.EndOfDays
			WHERE Series=@Series AND IsActive=1 

			AND  DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(StartDay  AS VARCHAR(2)) ))>=0
			AND  DATEDIFF(d, @InterestEndDatePlusOne, CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST(EndDay  AS VARCHAR(2)) ))<=0

			ORDER BY StartYear, StartMonth, StartDay
			--StartDay=@StartDay AND StartMonth=@StartMonth AND StartYear=@StartYear AND IsActive=-1 ORDER BY Series
		ELSE
			-- Series 1 is 27th to 26th pattern, hence can be used for all regular month periods.
			INSERT INTO #EndOfDays(CashflowInterestRate_id, CashflowDate, StartDiff, EndDIFF, EndOfDaysId, StartDay, StartMonth, StartYear, EndDay, EndMonth, EndYear, [Days], LeapYear, Series, IsActive)
			SELECT    @i, CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST(EndDay  AS VARCHAR(2))) [CashflowDate],
			DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(StartDay  AS VARCHAR(2)) )) StarTDiff,
			DATEDIFF(d,@InterestEndDate, CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST(EndDay  AS VARCHAR(2)) )) EndDIFF,
			--CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(StartDay  AS VARCHAR(2))), @InterestStartDate AS [@InterestStartDate] ,
			--CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST(EndDay  AS VARCHAR(2)) ),@InterestEndDate AS [@InterestEndDate],
			0, @StartDay, StartMonth, StartYear, @StartDay-1, EndMonth, EndYear, [Days], LeapYear, Series, IsActive
			FROM  [Dawn_Data].Reference.EndOfDays
			WHERE Series=1 AND IsActive=1 
			AND  DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(StartDay  AS VARCHAR(2)) ))>=0
			AND  DATEDIFF(d, @InterestEndDatePlusOne, CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST(EndDay  AS VARCHAR(2)) ))<=0

			
			--EndMonth>=@EndMonth AND EndYear>=@EndYear
			ORDER BY StartYear, StartMonth, StartDay;
		--END;
	
		
		SELECT @SumCashflowInterest=SUM(a.cashflowInterest_amount) 
		FROM [Dawn_Data].[LoanCalc].vwStatementCashflowTransactions267  AS a  
		WHERE loan_id =@loanId  AND cashflowInterest_date<@StartDate AND  NOT(cashflowInterest_date=@StartDate AND CashflowTypeDescription='Service Interest payment') 
		print @SumCashflowInterest
		--SELECT * FROM #EndOfDays

		select @i=min(CashflowInterestRate_id) from #cfir where CashflowInterestRate_id>@i -- Increment loop
	end

	SELECT #cfir.*,#EndOfDays.* FROM #cfir INNER JOIN #EndOfDays  ON #cfir.CashflowInterestRate_id=#EndOfDays.CashflowInterestRate_id 
	--SELECT * FROM #cfir 
	DROP TABLE #cfir
	DROP TABLE #EndOfDays

end
		--WHERE StartDay=@StartDay AND StartMonth=@StartMonth AND StartYear=@StartYear
		--SELECT @Series=Series, @StartDay=DAY(InterestStartDate), @StartMonth=MONTH(InterestStartDate), @StartYear=YEAR(InterestStartDate)
		--, @endDay=DAY(InterestEndDate), @endMonth=MONTH(InterestEndDate), @endYear=YEAR(InterestEndDate)
--		USE [Dawn_Data]
--GO


	--DROP TABLE #cfir
	--DROP TABLE #EndOfDays


/****** Object:  View [LoanCalc].[vwRunningIntrerestBalance267]    Script Date: 25/04/2018 15:02:28 ******/
SET ANSI_NULLS ON
GO
/****** Object:  StoredProcedure [Planner].[disused_EventPostCalculationGenerateV0]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



--UAT
Create PROCEDURE [Planner].[disused_EventPostCalculationGenerateV0]
	@LoanId Int, @User NVarChar(255) = ''
AS

BEGIN
-- change: PJR 10.3.2016. PW - to match production
--			   20160727.  PW. Fix still deleting events	
--DECLARE @User AS VARCHAR(50)
--DECLARE @LoanId Int
DECLARE @ExistingEventCount AS INT
DECLARE @RedeemDuedate AS DATE
DECLARE @Maturitydate AS DATE
DECLARE @KeepServicedEvents AS BINARY
DECLARE @ExistingServicedEvents AS INT


SELECT @KeepServicedEvents=Checked FROM  Dawn_Data.Loan.History WHERE DIM_loan_id_SSK=@LoanId; 
PRINT '@KeepServicedEvents'
PRINT @KeepServicedEvents

SELECT
	@ExistingServicedEvents=COUNT(FkEventTypeId)
FROM 
	Dawn_Data.Planner.Event
WHERE 
	FkLoanId =@LoanId
	AND FkEventTypeId=4

IF @User = ''
	SET @User = REPLACE(SYSTEM_USER, 'OMN\', '')

SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	CASE 
		WHEN d.ReferenceDate = 'MaturityDate'
			THEN DATEADD(dd, d.OffsetInDays, h.maturity_date)
		WHEN d.ReferenceDate = 'CompletionDate'
			THEN DATEADD(dd, d.OffsetInDays, h.completion_date)
	END As EventDate,
	0 As ExistingEventId
INTO #TempEvents
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND d.ReferenceDate IN ('MaturityDate', 'CompletionDate')

INSERT INTO #TempEvents
SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	DATEADD(dd, d.OffsetInDays, MIN(cashflowinterest_Date)) As EventDate,
	0
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.LoanCalc.CashFlowInterest i ON h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND d.ReferenceDate = 'ServicedPeriodStartDate'
GROUP BY d.Subject, d.FkEventTypeId, d.OffsetInDays
ORDER BY EventDate

INSERT INTO #TempEvents
SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	DATEADD(dd, d.OffsetInDays, cashflowinterest_Date) As EventDate,
	0
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.LoanCalc.CashFlowInterest i ON h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND d.ReferenceDate = 'ServicedInterestDate'
ORDER BY EventDate

/*change: PJR 10.3.2016

		event date should be Monday not Friday

		also see: [Planner].[EventInsUpd]
*/
/*
UPDATE #TempEvents
SET EventDate = EventDate - 1
WHERE DATENAME(dw, EventDate) = 'Saturday'

UPDATE #TempEvents
SET EventDate = EventDate - 2
WHERE DATENAME(dw, EventDate) = 'Sunday'
*/
--UPDATE #TempEvents	SET EventDate = EventDate + 2	WHERE DATENAME(dw, EventDate) = 'Saturday'
--UPDATE #TempEvents	SET EventDate = EventDate + 1	WHERE DATENAME(dw, EventDate) = 'Sunday'


-- Work out which events already exist
UPDATE #TempEvents
SET ExistingEventId = t.EventId
FROM #TempEvents e 
JOIN Dawn_Data.Planner.Event t 
	ON e.EventDate = t.EventDate 
	AND e.EventTypeID = t.FkEventTypeID 
	AND t.FkLoanId = @LoanId

IF @KeepServicedEvents <> 0 AND @ExistingServicedEvents>0
	BEGIN
	-- Delete any existing events that aren't related to this and have never been used
	DELETE Dawn_Data.Planner.Event
	FROM Dawn_Data.Planner.Event e
	WHERE FkLoanId = @LoanId
	  AND EventId NOT IN (SELECT ExistingEventId FROM #TempEvents)
	  AND e.EventActioned = 0
	  AND e.EventNotes = ''
	  AND e.Automatic = 1
	  AND LastUpdate = Created
	  AND FkEventTypeId<>4 --serviced

	-- Insert the new events
	INSERT INTO Dawn_Data.Planner.Event(FkLoanId, FkEventTypeId, EventDate, Subject, EventNotes, EventActioned, EventActionedBy, EventActionedDate, Automatic, Created, CreatedBy, LastUpdate, LastUpdateBy)
	SELECT @LoanId, EventTypeId, EventDate, Subject, '', 0, null, null, 1, GETDATE(), @User, GETDATE(), @User
	FROM #TempEvents
	WHERE ExistingEventId = 0
	END
ELSE
	BEGIN
	-- Delete any existing events that aren't related to this and have never been used
	DELETE Dawn_Data.Planner.Event
	FROM Dawn_Data.Planner.Event e
	WHERE FkLoanId = @LoanId
	  AND EventId NOT IN (SELECT ExistingEventId FROM #TempEvents)
	  AND e.EventActioned = 0
	  AND e.EventNotes = ''
	  AND e.Automatic = 1
	  AND LastUpdate = Created

	-- Insert the new events
	INSERT INTO Dawn_Data.Planner.Event(FkLoanId, FkEventTypeId, EventDate, Subject, EventNotes, EventActioned, EventActionedBy, EventActionedDate, Automatic, Created, CreatedBy, LastUpdate, LastUpdateBy)
	SELECT @LoanId, EventTypeId, EventDate, Subject, '', 0, null, null, 1, GETDATE(), @User, GETDATE(), @User
	FROM #TempEvents
	WHERE ExistingEventId = 0
		AND ExistingEventId <>4	
	END


END







GO
/****** Object:  StoredProcedure [Planner].[disused_EventPostCalculationGenerateV2]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[disused_EventPostCalculationGenerateV2]
	@LoanId Int, @User NVarChar(255) = ''
AS

BEGIN

IF @User = ''
	SET @User = REPLACE(SYSTEM_USER, 'OMN\', '')

SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	CASE 
		WHEN d.ReferenceDate = 'MaturityDate'
			THEN DATEADD(dd, d.OffsetInDays, h.maturity_date)
		WHEN d.ReferenceDate = 'CompletionDate'
			THEN DATEADD(dd, d.OffsetInDays, h.completion_date)
	END As EventDate,
	0 As ExistingEventId
INTO #TempEvents
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND d.ReferenceDate IN ('MaturityDate', 'CompletionDate')

INSERT INTO #TempEvents
SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	DATEADD(dd, d.OffsetInDays, MIN(cashflowinterest_Date)) As EventDate,
	0
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.LoanCalc.CashFlowInterest i ON h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND d.ReferenceDate = 'ServicedPeriodStartDate'
GROUP BY d.Subject, d.FkEventTypeId, d.OffsetInDays
ORDER BY EventDate

INSERT INTO #TempEvents
SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	DATEADD(dd, d.OffsetInDays, cashflowinterest_Date) As EventDate,
	0
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.LoanCalc.CashFlowInterest i ON h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND d.ReferenceDate = 'ServicedInterestDate'
ORDER BY EventDate

/*change: PJR 10.3.2016

		event date should be Monday not Friday

		also see: [Planner].[EventInsUpd]
*/
/*
UPDATE #TempEvents
SET EventDate = EventDate - 1
WHERE DATENAME(dw, EventDate) = 'Saturday'

UPDATE #TempEvents
SET EventDate = EventDate - 2
WHERE DATENAME(dw, EventDate) = 'Sunday'
*/
--UPDATE #TempEvents	SET EventDate = EventDate + 2	WHERE DATENAME(dw, EventDate) = 'Saturday'
--UPDATE #TempEvents	SET EventDate = EventDate + 1	WHERE DATENAME(dw, EventDate) = 'Sunday'


-- Work out which events already exist
UPDATE #TempEvents
SET ExistingEventId = t.EventId
FROM #TempEvents e 
JOIN Dawn_Data.Planner.Event t 
	ON e.EventDate = t.EventDate 
	AND e.EventTypeID = t.FkEventTypeID 
	AND t.FkLoanId = @LoanId

-- Delete any existing events that aren't related to this and have never been used
DELETE Dawn_Data.Planner.Event
FROM Dawn_Data.Planner.Event e
WHERE FkLoanId = @LoanId
  AND EventId NOT IN (SELECT ExistingEventId FROM #TempEvents)
  AND e.EventActioned = 0
  AND e.EventNotes = ''
  AND e.Automatic = 1
  AND LastUpdate = Created

-- Insert the new events
INSERT INTO Dawn_Data.Planner.Event(FkLoanId, FkEventTypeId, EventDate, Subject, EventNotes, EventActioned, EventActionedBy, EventActionedDate, Automatic, Created, CreatedBy, LastUpdate, LastUpdateBy)
SELECT @LoanId, EventTypeId, EventDate, Subject, '', 0, null, null, 1, GETDATE(), @User, GETDATE(), @User
FROM #TempEvents
WHERE ExistingEventId = 0

END

GO
/****** Object:  StoredProcedure [Planner].[disused_EventPostCalculationGenerateV3]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Batch submitted through debugger: Possible_Solution_PROCPlanner_EventPostCalculationGenerateV3.sql|11|0|Z:\Office\Aura_project\Amicus_Development\Project Documents\Projects\Event Planner\Possible_Solution_PROCPlanner_EventPostCalculationGenerateV3.sql

CREATE PROCEDURE [Planner].[disused_EventPostCalculationGenerateV3]
	@LoanId Int, @User NVarChar(255) = ''
AS

BEGIN
-- change: PJR 10.3.2016. PW - to match production
--		 : PW. 20160726, Keep existing serviced events 	
--DECLARE @User AS VARCHAR(50)
--DECLARE @LoanId Int
DECLARE @ExistingEventCount AS INT
DECLARE @RedeemDuedate AS DATE
DECLARE @Maturitydate AS DATE
DECLARE @KeepServicedEvents AS BINARY
DECLARE @ExistingServicedEvents AS INT


SELECT @KeepServicedEvents=Checked FROM  Dawn_Data.Loan.History --Checked
SELECT
	@ExistingServicedEvents=COUNT(FkEventTypeId)
FROM 
	Dawn_Data.Planner.Event
WHERE 
	FkLoanId =@LoanId
	AND FkEventTypeId=4

IF @User = ''
	SET @User = REPLACE(SYSTEM_USER, 'OMN\', '')

SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	CASE 
		WHEN d.ReferenceDate = 'MaturityDate'
			THEN DATEADD(dd, d.OffsetInDays, h.maturity_date)
		WHEN d.ReferenceDate = 'CompletionDate'
			THEN DATEADD(dd, d.OffsetInDays, h.completion_date)
	END As EventDate,
	0 As ExistingEventId
INTO #TempEvents
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND d.ReferenceDate IN ('MaturityDate', 'CompletionDate')

INSERT INTO #TempEvents
SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	DATEADD(dd, d.OffsetInDays, MIN(cashflowinterest_Date)) As EventDate,
	0
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.LoanCalc.CashFlowInterest i ON h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND d.ReferenceDate = 'ServicedPeriodStartDate'
GROUP BY d.Subject, d.FkEventTypeId, d.OffsetInDays
ORDER BY EventDate

INSERT INTO #TempEvents
SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	DATEADD(dd, d.OffsetInDays, cashflowinterest_Date) As EventDate,
	0
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.LoanCalc.CashFlowInterest i ON h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND d.ReferenceDate = 'ServicedInterestDate'
ORDER BY EventDate

/*change: PJR 10.3.2016

		event date should be Monday not Friday

		also see: [Planner].[EventInsUpd]
*/
/*
UPDATE #TempEvents
SET EventDate = EventDate - 1
WHERE DATENAME(dw, EventDate) = 'Saturday'

UPDATE #TempEvents
SET EventDate = EventDate - 2
WHERE DATENAME(dw, EventDate) = 'Sunday'
*/
--UPDATE #TempEvents	SET EventDate = EventDate + 2	WHERE DATENAME(dw, EventDate) = 'Saturday'
--UPDATE #TempEvents	SET EventDate = EventDate + 1	WHERE DATENAME(dw, EventDate) = 'Sunday'


-- Work out which events already exist
UPDATE #TempEvents
SET ExistingEventId = t.EventId
FROM #TempEvents e 
JOIN Dawn_Data.Planner.Event t 
	ON e.EventDate = t.EventDate 
	AND e.EventTypeID = t.FkEventTypeID 
	AND t.FkLoanId = @LoanId

IF @KeepServicedEvents = -1 AND @ExistingServicedEvents>0
	BEGIN
	-- Delete any existing events that aren't related to this and have never been used
	DELETE Dawn_Data.Planner.Event
	FROM Dawn_Data.Planner.Event e
	WHERE FkLoanId = @LoanId
	  AND EventId NOT IN (SELECT ExistingEventId FROM #TempEvents)
	  AND e.EventActioned = 0
	  AND e.EventNotes = ''
	  AND e.Automatic = 1
	  AND LastUpdate = Created

	-- Insert the new events
	INSERT INTO Dawn_Data.Planner.Event(FkLoanId, FkEventTypeId, EventDate, Subject, EventNotes, EventActioned, EventActionedBy, EventActionedDate, Automatic, Created, CreatedBy, LastUpdate, LastUpdateBy)
	SELECT @LoanId, EventTypeId, EventDate, Subject, '', 0, null, null, 1, GETDATE(), @User, GETDATE(), @User
	FROM #TempEvents
	WHERE ExistingEventId = 0
	END
ELSE
	BEGIN
	-- Delete any existing events that aren't related to this and have never been used
	DELETE Dawn_Data.Planner.Event
	FROM Dawn_Data.Planner.Event e
	WHERE FkLoanId = @LoanId
	  AND EventId NOT IN (SELECT ExistingEventId FROM #TempEvents)
	  AND e.EventActioned = 0
	  AND e.EventNotes = ''
	  AND e.Automatic = 1
	  AND LastUpdate = Created

	-- Insert the new events
	INSERT INTO Dawn_Data.Planner.Event(FkLoanId, FkEventTypeId, EventDate, Subject, EventNotes, EventActioned, EventActionedBy, EventActionedDate, Automatic, Created, CreatedBy, LastUpdate, LastUpdateBy)
	SELECT @LoanId, EventTypeId, EventDate, Subject, '', 0, null, null, 1, GETDATE(), @User, GETDATE(), @User
	FROM #TempEvents
	WHERE ExistingEventId = 0
		AND ExistingEventId <>4	
	END


END


GO
/****** Object:  StoredProcedure [Planner].[EventByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventByIdGet]
	@EventId Int
AS

BEGIN

	SET NOCOUNT ON

	SELECT EventId, ev.FkLoanId As LoanId, l.CBFL_id As LoanReference, ev.FkEventTypeId As EventTypeId, EventDate, e.Description AS EventType, Subject, EventNotes, 
		Resource = Stuff(
			(SELECT ', ' + Description 
			FROM Dawn_Data.Planner.EventResource xer, Dawn_Data.Reference.ResourceType ert 
			WHERE ev.FkEventTypeId = xer.FkEventTypeId 
			  AND xer.FkResourceTypeId = ert.ResourceTypeId
			ORDER BY Description
			FOR XML PATH('')), 1, 1, ''), EventActioned, EventActionedBy, EventActionedDate
	FROM Dawn_Data.Planner.Event ev, Dawn_Data.Planner.EventResource er, Dawn_Data.Planner.EventType e, Dawn_Data.Loan.Loan l
	WHERE ev.FkEventTypeId = er.FkEventTypeId
	  AND ev.FkLoanId = l.loan_id
	  AND ev.EventId = @EventId
	  AND ev.FkEventTypeID = e.EventTypeID
	  
	SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [Planner].[EventComplete]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventComplete]
	@EventId Int,
	@EventActionedBy NVarChar(255),
	@EventNotes VarChar(max),
	@User nVarChar(255)
AS

BEGIN
	SET NOCOUNT ON

	UPDATE Dawn_Data.Planner.Event
	SET EventActioned = 1,
		EventNotes = @EventNotes,
		EventActionedBy = @EventActionedBy,
		EventActionedDate = GETDATE(),
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE EventId = @EventId
	
	SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [Planner].[EventForImportGenerate]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventForImportGenerate]
	@LoanId Int, @User NVarChar(255) = ''
AS

BEGIN

SET NOCOUNT OFF

IF @User = ''
	SET @User = REPLACE(SYSTEM_USER, 'OMN\', '')

IF NOT EXISTS (SELECT * FROM Dawn_Data.Planner.Event WHERE FkLoanId = @LoanId AND FkEventTypeId = 16)
	INSERT INTO Dawn_Data.Planner.Event(FkLoanId, FkEventTypeId, EventDate, Subject, EventNotes, EventActioned, EventActionedBy, EventActionedDate, Automatic, Created, CreatedBy, LastUpdate, LastUpdateBy)
	SELECT @LoanId, 16, GETDATE(), 'Loan Imported', '', 0, NULL, NULL, 1, GETDATE(), @User, GETDATE(), @User

SET NOCOUNT ON

END


GO
/****** Object:  StoredProcedure [Planner].[EventGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-08-06		Gurdeep			Added Case owner
20190818		PW				Moved to Omni

*/

CREATE PROCEDURE [Planner].[EventGet]
	@StartDate DateTime,
	@EndDate DateTime,
	@LoanId Int,
	@ResourceTypeIds VarChar(1000),
	@EventTypeIds VarChar(1000),
	@CaseOwnerIds VarChar(1000),
	@HideActioned bit,
	@ShowRedeemed bit
AS

BEGIN
	SET NOCOUNT ON

	IF (@ResourceTypeIds != '')
		SET @ResourceTypeIds = '|' + @ResourceTypeIds + '|'

	IF (@EventTypeIds != '')
		SET @EventTypeIds = '|' + @EventTypeIds + '|'

	IF (@CaseOwnerIds != '')
		SET @CaseOwnerIds = '|' + @CaseOwnerIds + '|'

	SELECT DISTINCT 
		EventId
		,ev.FkLoanId	As LoanId
		,l.CBFL_id		As LoanReference
		,ev.FkEventTypeId
		,ev.CaseOwnerId
		,EventDate
		,Subject
		,e.Description AS EventType
		,EventNotes
		,Resource = Stuff(
			(SELECT ', ' + Description 
			FROM Dawn_Data.Planner.EventResource xer, Dawn_Data.Reference.ResourceType ert 
			WHERE ev.FkEventTypeId = xer.FkEventTypeId 
			  AND ert.ResourceTypeId = xer.FkResourceTypeId
			ORDER BY Description
			FOR XML PATH('')), 1, 1, '')
		,EventActioned
		,EventActionedBy
		,EventActionedDate
		,convert(varchar(255),'') BorrowerName 
	into	#ReportData
	from	 Dawn_Data.Planner.Event			ev
			,Dawn_Data.Planner.EventResource er
			,Dawn_Data.Planner.EventType		e
			,Dawn_Data.Loan.Loan				l

	where ev.FkEventTypeId = er.FkEventTypeId
	  AND ev.FkLoanId = l.loan_id
	  AND ev.FkEventTypeID = e.EventTypeID
	  AND (@ResourceTypeIds = '' OR 
			EXISTS (SELECT * 
						FROM Dawn_Data.Planner.EventResource yer 
						WHERE yer.FkEventTypeId = ev.FkEventTypeId
						  AND @ResourceTypeIds LIKE '%|' + CONVERT(VarChar, yer.FkResourceTypeId) + '|%'))
	  AND (@LoanId = 0 OR ev.FkLoanId = @LoanId)
	  AND (@EventTypeIds = '' OR @EventTypeIds LIKE '%|' + CONVERT(VarChar, ev.FkEventTypeId) + '|%')
	  AND (@CaseOwnerIds = '' OR @CaseOwnerIds LIKE '%|' + CONVERT(VarChar, ev.CaseOwnerId) + '|%')
	  AND ev.EventDate BETWEEN @StartDate AND @EndDate
	  AND (@HideActioned = 0 OR EventActioned = 0)
	  AND (@ShowRedeemed = 1 OR l.redeemed_date IS NULL)

	-- Attempt to get Legal Entity Name first, if there is one
	UPDATE #ReportData
	SET BorrowerName = (SELECT top 1
							e.LegalEntityName
						FROM Dawn_Data.Loan.ParticipantOfCase c, Dawn_Data.Loan.LegalEntity e
						WHERE c.FkLoanId = #ReportData.LoanId
						  AND c.FkLegalEntityId = e.LegalEntityId
						  AND c.FKParticipantTypeId = 1
	--PJR 20171110
						  AND c.isPrimary = 1
						  )

	-- Otherwise get borrower name
	UPDATE #ReportData
	SET BorrowerName = (SELECT  top 1
							ISNULL(co.FirstName, '') + ' ' + ISNULL(co.Surname, '')
						FROM Dawn_Data.Loan.ParticipantOfCase c, Dawn_Data.Loan.Contact co
						WHERE c.FkLoanId = #ReportData.LoanId
						  AND c.FkContactId = co.ContactId
						  AND c.FKParticipantTypeId = 1
	--PJR 20171110
						  and isnull(c.IsPrimary,0)=1)
	where BorrowerName IS NULL
	 
	select distinct 
			EventId, 
			LoanId, 
			LoanReference, 
			FkEventTypeId, 
			EventDate, 
			[Subject], 
			EventType,
			EventNotes, 
			[Resource], 
			EventActioned, 
			EventActionedBy, 
			EventActionedDate, 
			BorrowerName, 
			rd.CaseOwnerId as CaseOwnerID,  
			CASE rd.CaseOwnerId
			WHEN 0 THEN '[Not Allocated]'
			ELSE CONCAT(co.FirstName, ' ', co.LastName) 
			END AS CaseOwnerName
	from	#ReportData rd
	left join Dawn_Data.Reference.CaseOwner co on co.CaseOwnerID = rd.CaseOwnerId
END

GO
/****** Object:  StoredProcedure [Planner].[EventGet_20171218]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventGet_20171218]
	@StartDate DateTime,
	@EndDate DateTime,
	@LoanId Int,
	@ResourceTypeIds VarChar(1000),
	@EventTypeIds VarChar(1000),
	@HideActioned bit,
	@ShowRedeemed bit
AS

BEGIN
	SET NOCOUNT ON

	IF (@ResourceTypeIds != '')
		SET @ResourceTypeIds = '|' + @ResourceTypeIds + '|'

	IF (@EventTypeIds != '')
		SET @EventTypeIds = '|' + @EventTypeIds + '|'

	SELECT DISTINCT EventId, ev.FkLoanId As LoanId, l.CBFL_id As LoanReference, ev.FkEventTypeId, EventDate, Subject, e.Description AS EventType, EventNotes, 
		Resource = Stuff(
			(SELECT ', ' + Description 
			FROM Dawn_Data.Planner.EventResource xer, Dawn_Data.Reference.ResourceType ert 
			WHERE ev.FkEventTypeId = xer.FkEventTypeId 
			  AND ert.ResourceTypeId = xer.FkResourceTypeId
			ORDER BY Description
			FOR XML PATH('')), 1, 1, ''), EventActioned, EventActionedBy, EventActionedDate
	FROM Dawn_Data.Planner.Event ev, Dawn_Data.Planner.EventResource er, Dawn_Data.Planner.EventType e, Dawn_Data.Loan.Loan l
	WHERE ev.FkEventTypeId = er.FkEventTypeId
	  AND ev.FkLoanId = l.loan_id
	  AND ev.FkEventTypeID = e.EventTypeID
	  AND (@ResourceTypeIds = '' OR 
			EXISTS (SELECT * 
						FROM Dawn_Data.Planner.EventResource yer 
						WHERE yer.FkEventTypeId = ev.FkEventTypeId
						  AND @ResourceTypeIds LIKE '%|' + CONVERT(VarChar, yer.FkResourceTypeId) + '|%'))
	  AND (@LoanId = 0 OR ev.FkLoanId = @LoanId)
	  AND (@EventTypeIds = '' OR @EventTypeIds LIKE '%|' + CONVERT(VarChar, ev.FkEventTypeId) + '|%')
	  AND ev.EventDate BETWEEN @StartDate AND @EndDate
	  AND (@HideActioned = 0 OR EventActioned = 0)
	  AND (@ShowRedeemed = 1 OR l.redeemed_date IS NULL)
	  
	SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [Planner].[EventInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventInsUpd]
	@EventId Int,
	@LoanId Int,
	@EventTypeId Int,
	@EventDate DateTime,
	@Subject VarChar(100),
	@EventNotes VarChar(max),
	@User nVarChar(255)
AS

BEGIN

	SET NOCOUNT ON
	
	/*change: PJR 10.3.2016

		1--event date should be Monday not Friday
		2--event date should be w/end not changed to fri or mon
		also see: [Planner].[EventPostCalculationGenerate]
	*/
	/*
	IF DATENAME(dw, @EventDate) = 'Saturday'
		SET @EventDate = @EventDate - 1

	IF DATENAME(dw, @EventDate) = 'Sunday'
		SET @EventDate = @EventDate - 2
	*/

	--IF DATENAME(dw, @EventDate) = 'Saturday'
	--	SET @EventDate = @EventDate + 2

	--IF DATENAME(dw, @EventDate) = 'Sunday'
	--	SET @EventDate = @EventDate + 1

	/*change: PJR 10.3.2016
	*/

	IF (@EventId = 0)
		BEGIN
			INSERT INTO Dawn_Data.Planner.Event(FkLoanId, FkEventTypeId, EventDate, Subject, EventNotes, EventActioned, Automatic, Created, CreatedBy, LastUpdate, LastUpdateBy)
			SELECT @LoanId, @EventTypeId, @EventDate, @Subject, @EventNotes, 0, 0, GETDATE(), @User, GETDATE(), @User

			SELECT @EventId = SCOPE_IDENTITY()
		END
	ELSE
		UPDATE Dawn_Data.Planner.Event
		SET FkLoanId = @LoanId,
			FkEventTypeId = @EventTypeId,
			EventDate = @EventDate,
			Subject = @Subject,
			EventNotes = @EventNotes,
			LastUpdate = GETDATE(),
			LastUpdateBy = @User
		WHERE EventId = @EventId

	SELECT @EventId As EventId

	--SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [Planner].[EventPostCalculationGenerate]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Planner].[EventPostCalculationGenerate]
	@LoanId Int, @User NVarChar(255) = ''
AS
BEGIN
-- change: PJR 10.3.2016.	PW - to match production
--				20160727.	PW. Fix still deleting events.
--				20160922.	PW. Fix deletion of 'Standing Order Instruction Sent' 		
--				20161018.	PW. Use Service period to get the date when to inform customer to setup standing order (Hybrid/Serviced). 				
--exec [Dawn_Data_v100].[Planner].[EventPostCalculationGenerate] 1182

DECLARE @ExistingEventCount AS INT
DECLARE @RedeemDuedate AS DATE
DECLARE @Maturitydate AS DATE
DECLARE @KeepServicedEvents AS BINARY
DECLARE @ExistingServicedEvents AS INT


SELECT @KeepServicedEvents=Checked FROM  Dawn_Data.Loan.History WHERE DIM_loan_id_SSK=@LoanId; 
PRINT '@KeepServicedEvents'
PRINT @KeepServicedEvents

SELECT
	@ExistingServicedEvents=COUNT(FkEventTypeId)
FROM 
	Dawn_Data.Planner.Event
WHERE 
	FkLoanId =@LoanId
	AND FkEventTypeId=4

IF @User = ''
	SET @User = REPLACE(SYSTEM_USER, 'OMN\', '')
 -----------------------------------------------------------------
SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	CASE 
		WHEN d.ReferenceDate = 'CompletionDate'
			THEN DATEADD(dd, d.OffsetInDays, h.completion_date)
	END As EventDate,
	0 As ExistingEventId
INTO #TempEvents
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND d.ReferenceDate IN ( 'CompletionDate') -- Keep all these manually entered events. PW 20160922 
 
 -- Actual Maturity date, for loans with a Serviced period 
 SELECT TOP 1 @Maturitydate=InterestEndDate FROM Dawn.dbo.tbl_CashflowInterestRate WHERE cashflowInterest_type<>1 AND cashflowInterest_type<>3 AND (loan_id=@LoanId) ORDER BY InterestEndDate DESC

INSERT INTO #TempEvents
  SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	CASE 
		WHEN d.ReferenceDate = 'MaturityDate'
			THEN DATEADD(dd, d.OffsetInDays,@Maturitydate)--20161018 original maturity date.  l.maturity_date
	END As EventDate,
	0 As ExistingEventId
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND d.ReferenceDate IN ('MaturityDate') -- Keep all these manually entered events. PW 20160922 
 
  -----------------------------------------------------------------
-- 20161018. Use Service period to get the date when to inform customer to setup standing order
INSERT INTO #TempEvents
SELECT 
	d.Subject, --20161018. Was D
	d.FkEventTypeId As EventTypeId,
	CASE -- Serviced Loans, Reminder cannot be before completion date
	WHEN DATEADD(dd, d.OffsetInDays, MIN(i.InterestStartDate)) <= h.completion_date
		THEN DATEADD(dd, 2, MIN(h.completion_date)) --  SEND TWO DAYS AFTER COMPLETION
	WHEN DATEADD(dd, d.OffsetInDays, MIN(i.InterestStartDate)) > h.completion_date
		THEN 	DATEADD(dd, d.OffsetInDays, MIN(i.InterestStartDate)) 
	END As EventDate,
	0
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.LoanCalc.[CashflowInterestRate] i ON h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId
  AND SCDStatus = 'C'
  AND [cashflowInterest_type]=2
  AND d.ReferenceDate = 'ServicedPeriodStartDate'
GROUP BY d.Subject, d.FkEventTypeId, d.OffsetInDays,h.completion_date
ORDER BY EventDate;

INSERT INTO #TempEvents
SELECT 
	d.Subject,
	d.FkEventTypeId As EventTypeId,
	DATEADD(dd, d.OffsetInDays, cashflowinterest_Date) As EventDate,
	0
FROM 
	Dawn_Data.Loan.Loan l
	JOIN Dawn_Data.Loan.History h ON l.Loan_id = h.DIM_loan_id_SSK
	JOIN Dawn_Data.LoanCalc.CashFlowInterest i ON h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
	JOIN Dawn_Data.Planner.EventTemplate t ON ISNULL(l.product_id, 0) = t.FkProductId
	JOIN Dawn_Data.Planner.EventTemplateDetail d ON t.EventTemplateId = d.FkEventTemplateId
WHERE l.loan_id = @LoanId 
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND d.ReferenceDate = 'ServicedInterestDate'
ORDER BY EventDate


SELECT * FROM #TempEvents					--20160922

-- Work out which events already exist
UPDATE #TempEvents
SET ExistingEventId = t.EventId
FROM #TempEvents e 
JOIN Dawn_Data.Planner.Event t 
	ON e.EventDate = t.EventDate 
	AND e.EventTypeID = t.FkEventTypeID 
	--AND e.subject = t.subject Only do this if you want to keep changed subjects, i.e there is an existing Event on the same day
	AND t.FkLoanId = @LoanId

SELECT * FROM #TempEvents					--20160922

SELECT * FROM Dawn_Data.Planner.Event where FkLoanId = @LoanId--20160922

IF @KeepServicedEvents <> 0 -- If Checked  --20160922 --AND @ExistingServicedEvents>0 -- If unchecked and there are existing SIP demands
	BEGIN
	-- Delete any existing events that aren't related to this and have never been used
	DELETE Dawn_Data.Planner.Event
	FROM Dawn_Data.Planner.Event e
	WHERE FkLoanId = @LoanId
	  AND EventId NOT IN (SELECT ExistingEventId FROM #TempEvents)
	  AND e.EventActioned = 0
	  AND e.EventNotes = ''
	  AND e.Automatic = 1
	  AND LastUpdate = Created
	  AND FkEventTypeId<>4 --serviced

	-- Insert the new events
	INSERT INTO Dawn_Data.Planner.Event(FkLoanId, FkEventTypeId, EventDate, Subject, EventNotes, EventActioned, EventActionedBy, EventActionedDate, Automatic, Created, CreatedBy, LastUpdate, LastUpdateBy)
	SELECT @LoanId, EventTypeId, EventDate, Subject, '', 0, null, null, 1, GETDATE(), @User, GETDATE(), @User
	FROM #TempEvents
	WHERE ExistingEventId = 0
	END
ELSE
	BEGIN
	-- Delete any existing events that aren't related to this and have never been used, insert the new Service paymnet requests
SELECT * FROM #TempEvents--20160922

	DELETE Dawn_Data.Planner.Event --20160922.	PW. delete Existing Service Payment demands
	FROM Dawn_Data.Planner.Event e
	WHERE FkLoanId = @LoanId
	  AND EventId NOT IN (SELECT ExistingEventId FROM #TempEvents)  --20160922.	PW. 
	  AND e.EventActioned = 0
	  AND e.EventNotes = ''
	  AND e.Automatic = 1
	  AND LastUpdate = Created

	-- Insert the new events.  --20160922.	PW. Insert new Service Payment demands
	INSERT INTO Dawn_Data.Planner.Event(FkLoanId, FkEventTypeId, EventDate, Subject, EventNotes, EventActioned, EventActionedBy, EventActionedDate, Automatic, Created, CreatedBy, LastUpdate, LastUpdateBy)
	SELECT @LoanId, EventTypeId, EventDate, Subject, '', 0, null, null, 1, GETDATE(), @User, GETDATE(), @User
	FROM #TempEvents
	WHERE ExistingEventId = 0
	--	AND ExistingEventId <>4	 Insert the new   Service Payment demands
	END
END
GO
/****** Object:  StoredProcedure [Planner].[EventTemplateDetailByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventTemplateDetailByIdGet]
	@EventTemplateDetailId Int
AS

BEGIN
	SET NOCOUNT ON
	
	SELECT 
		EventTemplateDetailId, 
		FkEventTemplateId As EventTemplateId, 
		Subject, 
		ReferenceDate, 
		OffsetInDays, 
		d.FkEventTypeId As EventTypeId
	FROM Dawn_Data.Planner.EventTemplateDetail d, Dawn_Data.Planner.EventType et
	WHERE d.FkEventTypeId = et.EventTypeId
	  AND @EventTemplateDetailId = EventTemplateDetailId

	SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [Planner].[EventTemplateDetailDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventTemplateDetailDel]
	@EventTemplateDetailId Int
AS
	SET NOCOUNT ON

	DELETE Dawn_Data.Planner.EventTemplateDetail WHERE EventTemplateDetailId = @EventTemplateDetailId

GO
/****** Object:  StoredProcedure [Planner].[EventTemplateDetailGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventTemplateDetailGet]
	@EventTemplateId Int
AS

BEGIN
	SET NOCOUNT ON
	
	SELECT EventTemplateDetailId, Subject, ReferenceDate, OffsetInDays, 
		CASE ReferenceDate
			WHEN 'CompletionDate' THEN 1
			WHEN 'ServicedPeriodStartDate' THEN 2
			WHEN 'ServicedInterestDate' THEN 3
			WHEN 'MaturityDate' THEN 4
		END AS OrderBy, et.*
	FROM Dawn_Data.Planner.EventTemplateDetail d, Dawn_Data.Planner.EventType et
	WHERE d.FkEventTypeId = et.EventTypeId
	  AND d.FkEventTemplateId = @EventTemplateId
	ORDER BY OrderBy, OffsetInDays
		  
	SET NOCOUNT OFF
END

GO
/****** Object:  StoredProcedure [Planner].[EventTemplateDetailInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventTemplateDetailInsUpd]
	@EventTemplateDetailId Int,
	@EventTemplateId Int,
	@EventTypeId Int,
	@Subject VarChar(1000),
	@ReferenceDate VarChar(100),
	@OffsetInDays Int,
	@User NVarChar(255)

AS
	SET NOCOUNT ON

	IF (@EventTemplateDetailId = 0)
		BEGIN
			INSERT INTO Dawn_Data.Planner.EventTemplateDetail
			SELECT @EventTemplateId, @EventTypeId, @Subject, @ReferenceDate, @OffsetInDays, GETDATE(), @User, GETDATE(), @User

			SELECT @EventTemplateDetailId = SCOPE_IDENTITY()
		END
	ELSE
		UPDATE Dawn_Data.Planner.EventTemplateDetail
		SET FkEventTypeId = @EventTypeId,
			Subject = @Subject,
			ReferenceDate = @ReferenceDate,
			OffsetInDays = @OffsetInDays,
			LastUpdate = GETDATE(),
			LastUpdateBy = @User 
		WHERE EventTemplateDetailId = @EventTemplateDetailId

	SELECT @EventTemplateDetailId

GO
/****** Object:  StoredProcedure [Planner].[EventTemplateGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventTemplateGet]
AS
BEGIN
	SET NOCOUNT ON

	SELECT
			e.EventTemplateId,
			e.FkProductId As ProductId,
			-- QST:  No such column as 'ProductName'; was this meant to be 'ProductCode'?
			p.ProductCode AS ProductName,
			-- QST:  Is 'Description' supposed to be 'ProductDescription'?  Seems reasonable
			p.[Description] As ProductDescription
		FROM
			Dawn_Data.Product.Product  P,
			Dawn_Data.Planner.EventTemplate  E
		WHERE
			p.Productid = e.FkProductId ;

	SET NOCOUNT OFF
END
GO
/****** Object:  StoredProcedure [Planner].[EventTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[EventTypeGet]

AS

BEGIN

	SET NOCOUNT ON

	SELECT EventTypeId, Description, Automatic
	FROM Dawn_Data.Planner.EventType

	SET NOCOUNT OFF

END

GO
/****** Object:  StoredProcedure [Planner].[RegenerateAllEvents]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Planner].[RegenerateAllEvents]

AS

DECLARE @User NVarChar(255), @LoanId Int

IF @User = ''
	SET @User = REPLACE(SYSTEM_USER, 'OMN\', '')

DECLARE LoanCursor CURSOR
READ_ONLY FAST_FORWARD
FOR 
SELECT loan_id
FROM Dawn_Data.Loan.Loan

OPEN LoaNCursor

FETCH NEXT FROM LoanCursor INTO @LoanId

WHILE @@FETCH_STATUS = 0
	BEGIN
		EXEC Planner.EventForImportGenerate @LoanId, @User
		EXEC  Planner.EventPostCalculationGenerate @LoanId, @User

		FETCH NEXT FROM LoanCursor INTO @LoanId
	END

CLOSE LoanCursor

DEALLOCATE LoanCursor
GO
/****** Object:  StoredProcedure [Planner].[UpdateCaseOwnerAllPendingEvents]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-08-06		Gurdeep			First Version (Update CaseOwner for all pending events for a Loan)

*/


CREATE PROCEDURE [Planner].[UpdateCaseOwnerAllPendingEvents]	
	@LoanId int	
AS

BEGIN
		UPDATE ev
		SET 
		ev.CaseOwnerId = l.CaseOwnerId
	    FROM 
				   Dawn_Data.Planner.Event	ev
		INNER JOIN Dawn_Data.Loan.Loan		l on (l.loan_id = ev.FkLoanId)
		WHERE 
					ev.EventActioned = 0
					and l.loan_id = @LoanId
END

GO
/****** Object:  StoredProcedure [Product].[LoanProductGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [Product].[LoanProductGet]
	@LoanProductId Int,
	@ShowExpired bit
AS

	SELECT 
		LoanProductId,
		ProductCode,
		Description,
		AvailabilityStartDate,
		AvailabilityEndDate,
		HasMaxLtvDayOne,
		MaxLtvDayOne,
		HasMaxLtvThroughout,
		MaxLtvThroughout,
		HasMaxLtvGross,
		MaxLtvGross,
		HasMaxLtvGdv,
		MaxLtvGdv,
		--FkLoanCategoryId As LoanCategoryId,
		STUFF((SELECT ' + ' + i.InterestType 
				FROM Dawn_Data.Product.LoanProductInterestType t, Dawn_Data.Reference.InterestType i 
				WHERE t.FkInterestTypeId = i.InterestTypeId and t.FkLoanProductId = p.LoanProductId
				FOR XML PATH('')), 1, 3, '') As InterestType
--select *
	FROM Dawn_Data.Product.LoanProduct p
	WHERE (@LoanProductId = 0 OR LoanProductId = @LoanProductId)
	  AND (@ShowExpired = 1 OR AvailabilityEndDate IS NULL OR AvailabilityEndDate < GETDATE())

GO
/****** Object:  StoredProcedure [Product].[LoanProductInterestTypeDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Product].[LoanProductInterestTypeDel]
	@LoanProductInterestTypeId int
AS

DELETE Dawn_Data.Product.LoanProductInterestType
WHERE LoanProductInterestTypeId = @LoanProductInterestTypeId

GO
/****** Object:  StoredProcedure [Product].[LoanProductInterestTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Product].[LoanProductInterestTypeGet]
	@LoanProductId int
AS

SELECT 
	LoanProductInterestTypeId,
	FkLoanProductId As LoanProductId,
	FkInterestTypeId As InterestTypeId,
	r.InterestType,
	Sequence
FROM Dawn_Data.Product.LoanProductInterestType i,
	 Dawn_Data.Reference.InterestType r
WHERE FkLoanProductId = @LoanProductId
  AND i.FkInterestTypeId = r.InterestTypeId

GO
/****** Object:  StoredProcedure [Product].[LoanProductInterestTypeInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Product].[LoanProductInterestTypeInsUpd]
	@LoanProductInterestTypeId int,
	@LoanProductId int,
	@InterestTypeId int,
	@Sequence int,
	@User nvarchar(255)
AS

IF (@LoanProductInterestTypeId = 0)
	BEGIN
		SELECT @Sequence = ISNULL(MAX(Sequence), 0) + 1
		FROM Dawn_Data.Product.LoanProductInterestType i
		WHERE i.FkLoanProductId = @LoanProductId

		INSERT INTO Dawn_Data.Product.LoanProductInterestType(FkLoanProductId, FkInterestTypeId, Sequence, Created, CreatedBy, LastUpdate, LastUpdateBy)
		SELECT @LoanProductId, @InterestTypeId, @Sequence, GETDATE(), @User, GETDATE(), @User

		SET @LoanProductInterestTypeId = SCOPE_IDENTITY()
	END
ELSE
	UPDATE Dawn_Data.Product.LoanProductInterestType
	SET
		fkInterestTypeId = @InterestTypeId,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE LoanProductInterestTypeId = @LoanProductInterestTypeId

-- Re-order

DECLARE @CursorLoanProductInterestTypeId Int, @Count Int

SET @Count = 1

DECLARE LoanProductInterestTypes CURSOR READ_ONLY FAST_FORWARD
FOR
SELECT LoanProductInterestTypeId
FROM Dawn_Data.Product.LoanProductInterestType
WHERE FkLoanProductId = @LoanProductId
ORDER BY Sequence

OPEN LoanProductInterestTypes

FETCH NEXT FROM LoanProductInterestTypes INTO @CursorLoanProductInterestTypeId

WHILE @@FETCH_STATUS = 0
	BEGIN
		UPDATE Dawn_Data.Product.LoanProductInterestType
		SET Sequence = @Count
		WHERE LoanProductInterestTypeId = @CursorLoanProductInterestTypeId

		SET @Count = @Count + 1

		FETCH NEXT FROM LoanProductInterestTypes INTO @CursorLoanProductInterestTypeId
	END

CLOSE LoanProductInterestTypes

DEALLOCATE LoanProductInterestTypes

GO
/****** Object:  StoredProcedure [Product].[LoanProductTermCombinationGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Product].[LoanProductTermCombinationGet]
	@LoanProductId Int

AS

DECLARE @DynamicPivotQuery AS NVARCHAR(MAX)
DECLARE @ColumnName AS NVARCHAR(MAX), @InterestIds As nvarchar(Max)

SELECT 
	LoanProductInterestTypeId,
	FkLoanProductId As LoanProductId,
	FkInterestTypeId As InterestTypeId,
	'LoanProductInterestTypeId_' + CONVERT(VarChar, LoanProductInterestTypeId) As ColumnName,
	i.InterestType,
	Sequence
FROM Dawn_Data.Product.LoanProductInterestType p,
	Dawn_Data.Reference.InterestType i
WHERE FkLoanProductId = @LoanProductId
  AND p.FkInterestTypeId = i.InterestTypeId

--Get distinct values of the PIVOT Column 
SELECT 
	@ColumnName = ISNULL(@ColumnName + ',','') + QUOTENAME(CONVERT(VarChar, LoanProductInterestTypeId)) + ' AS LoanProductInterestTypeId_' + CONVERT(VarChar, LoanProductInterestTypeId),
	@InterestIds = ISNULL(@InterestIds + ',','') + QUOTENAME(CONVERT(VarChar, LoanProductInterestTypeId))
FROM (SELECT DISTINCT LoanProductInterestTypeId FROM Dawn_Data.Product.LoanProductInterestType WHERE FkLoanProductId = @LoanProductId) AS InterestTypes

--Prepare the PIVOT query using dynamic sql
SET @DynamicPivotQuery = 
  N'SELECT FkLoanProductTermCombinationId As LoanProductTermCombinationId, ' + @ColumnName + '
    FROM (SELECT FkLoanProductTermCombinationId, FkLoanProductInterestTypeId, Term
			FROM Dawn_Data.Product.LoanProductTermCombination c, Dawn_Data.Product.LoanProductTerm t
			WHERE c.LoanProductTermCombinationId = t.fkLoanProductTermCombinationId
			  AND c.FkLoanProductId = ' + CONVERT(varchar, @LoanProductId) + ') p ' +
    'PIVOT( SUM(Term)
          FOR FkLoanProductInterestTypeId IN (' + @InterestIds + ')) AS InterestRates'

--Execute the Dynamic Pivot Query
EXEC sp_executesql @DynamicPivotQuery

GO
/****** Object:  StoredProcedure [Product].[LoanProductTermCombinationInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Product].[LoanProductTermCombinationInsUpd]
	@LoanProductTermCombinationId int,
	@LoanProductId int,
	@LoanProductInterestTypeId int,
	@Term int,
	@User nvarchar(255)
AS

IF NOT EXISTS (SELECT * FROM Dawn_Data.Product.LoanProductTermCombination WHERE LoanProductTermCombinationId = @LoanProductTermCombinationId)
	BEGIN

		INSERT INTO Dawn_Data.Product.LoanProductTermCombination(FkLoanProductId, Created, CreatedBy, LastUpdate, LastUpdateBy)
		SELECT @LoanProductID, GETDATE(), @User, GETDATE(), @User

		SELECT @LoanProductTermCombinationId = SCOPE_IDENTITY()
	END

IF EXISTS (SELECT * FROM Dawn_Data.Product.LoanProductTerm 
			WHERE FkLoanProductTermCombinationId = @LoanProductTermCombinationId 
			  AND FkLoanProductInterestTypeId = @LoanProductInterestTypeId)
	UPDATE Dawn_Data.Product.LoanProductTerm
	SET Term = @Term,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE FkLoanProductTermCombinationId = @LoanProductTermCombinationId 
	  AND FkLoanProductInterestTypeId = @LoanProductInterestTypeId
ELSE
	BEGIN
		INSERT INTO Dawn_Data.Product.LoanProductTerm(FkLoanProductTermCombinationId, FkLoanProductInterestTypeId, Term, Created, CreatedBy, LastUpdate, LastUpdateBy)
		SELECT @LoanProductTermCombinationId, @LoanProductInterestTypeId, @Term, GETDATE(), @User, GETDATE(), @User
	END

SELECT @LoanProductTermCombinationId As LoanProductTermCombinationId

GO
/****** Object:  StoredProcedure [Product].[LoanProductTermCombinationIsUnique]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Product].[LoanProductTermCombinationIsUnique]
	@LoanProductId int,
	@TermCombination VarChar(100)
AS

SET NOCOUNT ON

SELECT c.FkLoanProductId, c.LoanProductTermCombinationId,
		STUFF((SELECT ',' + CONVERT(VarChar, t.Term)
				FROM Dawn_Data.Product.LoanProductTerm t, Dawn_Data.Product.LoanProductInterestType i
				WHERE i.LoanProductInterestTypeId = t.FkLoanProductInterestTypeId
				  AND t.FkLoanProductTermCombinationId = c.LoanProductTermCombinationId
				ORDER BY i.Sequence
				FOR XML PATH('')), 1, 1, '') As Term
INTO #ValidTerms
FROM Dawn_Data.Product.LoanProductTermCombination c

IF EXISTS(SELECT * FROM #ValidTerms WHERE Term = @TermCombination)
	SELECT CONVERT(bit, 1) As Result
ELSE
	SELECT CONVERT(bit, 0) As Result

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Product].[LoanProductTermCombinationsDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Product].[LoanProductTermCombinationsDel]
	@LoanProductTermCombinationId int
AS

	DELETE Dawn_Data.Product.LoanProductTerm
	WHERE FkLoanProductTermCombinationId = @LoanProductTermCombinationId

	DELETE Dawn_Data.Product.LoanProductTermCombination
	WHERE LoanProductTermCombinationId = @LoanProductTermCombinationId

GO
/****** Object:  StoredProcedure [Product].[ProductGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Product].[ProductGet]
	@LoanProductId Int,
	@ShowExpired bit
AS

	SELECT 
		LoanProductId,
		ProductCode,
		Description,
		AvailabilityStartDate,
		AvailabilityEndDate,
		HasMaxLtvDayOne,
		MaxLtvDayOne,
		HasMaxLtvThroughout,
		MaxLtvThroughout,
		HasMaxLtvGross,
		MaxLtvGross,
		HasMaxLtvGdv,
		MaxLtvGdv,
		STUFF((SELECT ' + ' + i.InterestType 
				FROM Dawn_Data.Product.LoanProductInterestType t, Dawn_Data.Reference.InterestType i 
				WHERE t.FkInterestTypeId = i.InterestTypeId and t.FkLoanProductId = p.LoanProductId
				FOR XML PATH('')), 1, 3, '') As InterestType
	FROM Dawn_Data.Product.LoanProduct p
	WHERE (@LoanProductId = 0 OR LoanProductId = @LoanProductId)
	  AND (@ShowExpired = 1 OR AvailabilityEndDate IS NULL OR AvailabilityEndDate < GETDATE())

GO
/****** Object:  StoredProcedure [Product].[ProductInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Product].[ProductInsUpd]
	@LoanProductId int,
	@ProductCode varchar(100),
	@Description varchar(100),
	@AvailabilityStartDate datetime,
	@AvailabilityEndDate datetime,
	@HasMaxLtvDayOne bit,
	@MaxLtvDayOne money,
	@HasMaxLtvThroughout bit,
	@MaxLtvThroughout money,
	@HasMaxLtvGross bit,
	@MaxLtvGross money,
	@HasMaxLtvGdv bit,
	@MaxLtvGdv money,
	@User nvarchar(255)
AS

IF @LoanProductId = 0
	BEGIN
		INSERT INTO Dawn_Data.Product.LoanProduct(ProductCode, Description, AvailabilityStartDate, AvailabilityEndDate, HasMaxLtvDayOne, MaxLtvDayOne, HasMaxLtvThroughout, MaxLtvThroughout,
			HasMaxLtvGross, MaxLtvGross, HasMaxLtvGdv, MaxLtvGdv, Created, CreatedBy, LastUpdate, LastUpdateBy)
		SELECT @ProductCode, @Description, @AvailabilityStartDate, @AvailabilityEndDate, @HasMaxLtvDayOne, @MaxLtvDayOne, @HasMaxLtvThroughout, @MaxLtvThroughout,
			@HasMaxLtvGross, @MaxLtvGross, @HasMaxLtvGdv, @MaxLtvGdv, GETDATE(), @User, GETDATE(), @User

		SELECT @LoanProductId = SCOPE_IDENTITY()
	END
ELSE
	UPDATE Dawn_Data.Product.LoanProduct
	SET ProductCode = @ProductCode,
		Description = @Description,
		AvailabilityStartDate = AvailabilityStartDate,
		AvailabilityEndDate = AvailabilityEndDate,
		HasMaxLtvDayOne = @HasMaxLtvDayOne,
		MaxLtvDayOne = @MaxLtvDayOne,
		HasMaxLtvThroughout = @HasMaxLtvThroughout,
		MaxLtvThroughout = @MaxLtvThroughout,
		HasMaxLtvGross = @HasMaxLtvGross,
		MaxLtvGross = @MaxLtvGross,
		HasMaxLtvGdv = @HasMaxLtvGdv,
		MaxLtvGdv = @MaxLtvGdv,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE LoanProductId = @LoanProductId

SELECT @LoanProductId As LoanProductId

GO
/****** Object:  StoredProcedure [Product].[ProductListGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Product].[ProductListGet]	@NetloanAmount decimal(18,9) , @SecurityValue decimal(18,9)	, @Debug	tinyint	=	0
as begin


	set nocount on

	select p.ProductNamesId,  p.ProductCode 
	from		[Product].[ProductName]		p
	--where 	@SecurityValue / case when isnull(@NetloanAmount,0) >0 then @NetloanAmount else @SecurityValue end / 100	< MaxLtvDay1
	order by
		 p.ProductCode

	/*
	select 	 
		 	p.ProductNamesID
			,rtrim(lTrim([ProductCode]))
				+ ' ' + rtrim(lTrim([TermMonth]))
				+ 'M ' + rtrim(lTrim([Description]))
				+ ' ' 
				+ case when isnull([PeriodCovered],0) = 0 then 'Initial' else 'Further' end
				+ ' ' + rtrim(lTrim([interestTypeName])) AS [Amicus Product]
		,pt.ProductType
		,p.ProductCode
		,t.TermMonth
		,p.TermMonths AS [Term Options]
		,p.Description
		,ict.interestTypeName
		,pt.ProductTypeID
		,tc.ProductTermCombinationsID
		,t.TermMonthID
		,pim.ProductInterestTypeID
		,ict.interestTypeID
		,case when [PeriodCovered]=0 then 'Initial Term' else 'Further Term' end as [Term Covered]
	from		[Product].[ProductName]					p 
	left join	[Product].[TermCombinations]			tc	ON p.ProductNamesID	= tc.ProductNamesID
	left join	[Product].[Term]		 				t	ON tc.TermMonthID	= t.TermMonthID
	left join	[Product].[InterestTypeMap]				pim	ON p.ProductNamesID 	= pim.ProductNamesID
	left join	[Product].[InterestCalculationTypes]	ict	ON pim.InterestTypeID	= ict.interestTypeID
	left join	[Product].[ProductType]					pt	ON p.ProductTypeID	= pt.ProductTypeID
	where case when isnull([PeriodCovered],0) = 0 then 'Initial Term' else '' end = 'Initial Term'
	order by
		 p.ProductCode
		,ict.interestTypeName
		,substring(t.Termmonth,1,1)
	*/
end
GO
/****** Object:  StoredProcedure [Reconciliation].[disused_SageTransactionsRunningTotals]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Reconciliation].[disused_SageTransactionsRunningTotals] @FilterCBFL_ID nvarchar(255)
AS BEGIN
	-- 24/07/2014. Peter Wegrzyn. performs a running sum on The NET and GROSS amounts, generates the LTV (on the current valuation) and IRR. 
	-- 1/10/2014. Modified to allow the selection of Transactions which are not being picked up by the random nature of their entry to SAGE.
	-- 13/10/2014. Modified Projected IRR to include projected Broker fees 
	SET NOCOUNT ON
	DECLARE @st TABLE (
	[CurrentValuation] Float NULL,	[CurrentLTV] Float NULL,		[ACCOUNT_REF] nvarchar(255) NULL,	[CompanyNumber] nvarchar(255) NULL,	[CBFL_ID] nvarchar(255) NULL,	[NAME] nvarchar(255) NULL,
	[Date] datetime2(7) NULL,	[NET_AMOUNT] float NULL,	[GROSS_AMOUNT] float NULL,	[TRAN_NUMBER] int NULL,	[ITEM_COUNT] int NULL,	[DETAILS] nvarchar(255) NULL,	[INV_REF] nvarchar(255) NULL,
	[TYPE] nvarchar(255) NULL,	[ANALYSIS_1] nvarchar(255) NULL,	[ANALYSIS_2] nvarchar(255) NULL,	[ANALYSIS_3] nvarchar(255) NULL,	[SSMA_TimeStamp] timestamp NOT NULL,
	[Staff_ID] nvarchar(255) NULL,	[dteDate] datetime NULL,	[SumNET_AMOUNT] float NULL,	[SumGROSS_AMOUNT] float NULL,	[IRR] float NULL, 	[UseInLTV] TinyInt NULL,
	[Broker_fee_ActuallyPaidOut] float NULL,	Deleted_Flag TinyInt NULL
					);

	 DECLARE @CurrentValuation Float 
	 DECLARE @CurrentLTV Float 
	 DECLARE @ACCOUNT_REF nvarchar(255) 
	 DECLARE @CompanyNumber nvarchar(255) 
	 DECLARE @CBFL_ID nvarchar(255) 
	 DECLARE @NAME nvarchar(255) 
	 DECLARE @Date datetime2(7) 
	 DECLARE @NET_AMOUNT float 
	 DECLARE @GROSS_AMOUNT float 
	 DECLARE @TRAN_NUMBER int 
	 DECLARE @ITEM_COUNT int 
	 DECLARE @DETAILS nvarchar(255) 
	 DECLARE @INV_REF nvarchar(255) 
	 DECLARE @TYPE nvarchar(255) 
	 DECLARE @ANALYSIS_1 nvarchar(255),	@ANALYSIS_2 nvarchar(255), @ANALYSIS_3 nvarchar(255) 
	 DECLARE @Staff_ID nvarchar(255) 
	 DECLARE @dteDate datetime 
	 DECLARE @SumNET_AMOUNT float
	 DECLARE @SumGROSS_AMOUNT float 
	 DECLARE @GROSS_AMOUNTRunningTotal float = 0
	 DECLARE @NET_AMOUNTRunningTotal float = 0
	 DECLARE @IRR float = 0
	 DECLARE @IRRFantasy float = 0 -- imagine if the loan is repaid today or on maturity date
	 DECLARE @IRRFantasyRedeemed float = 0 -- The Outstanding balance required to fully redeem the loan.
	 
	 DECLARE @IRRStartDate datetime2(7) -- starting date of Net IRR. Fees etc are accounted Monthly in Sage, but the dates need to be changed to start and end for IRR purposes
	 DECLARE @IRREndDate datetime2(7) -- End date for Net IRR 
	 DECLARE @UseInLTV TinyInt --UseIRR: 
	 DECLARE @Broker_fee_ActuallyPaidOut float -- The fee paid out to Broker. not cosistant with calcualtions so its hard coded in tbl_loan 
	 DECLARE @Broker_fee_Projected float
	 DECLARE @Broker_fee_flat float
	 DECLARE @Broker_fee_IN_Projected float  --Fee paid going into the loan, paid on completion (in a  day or two)
	 DECLARE @Broker_fee_OUT_Projected float --Fee paid going Out of the loan, paid on redemption or on Maturity if a Projected IRR
	 DECLARE @BrokerTrailFeeCash float	-- Trailer Fee, (term x interest rate) paid going Out of the loan, paid on redemption or on Maturity if a Projected IRR
	 DECLARE @RedeemedDate datetime2(7) 
	 DECLARE @MaturityDate datetime2(7)
	 DECLARE @CompletionDate datetime2(7)
 	 DECLARE @Deleted_Flag TinyInt 
	 /* This determine the use of the transaction. UseInLTV and UseInIRR are IDENTICAL, so we can use either. If they do differ the SP will have to be changed.
	 In MS Access. This query qryMoveToSQLServerSageUNIONCompanyTransactions populates . Removed SAGE type SI
	 
	 IIf((([Type]="SP" Or [Type]="SR" Or [Type]="SA") Or ([Details]="Opening Balance" And ([Type]="SC" Or [Type]="SI")) Or (Left([Details],8)="Open Bal" And ([Type]="SI" Or [Type]="SC")) Or (([Details]="Fee In" Or [Details]="Fee Out") And [Type]="SI")),1,0);
	*/

	select @IRRStartDate=NULL , @IRREndDate=NULL
		
	SELECT  @BrokerTrailFeeCash= isnull(gross_loan,0) *(isnull(broker_fee_outInterestRate,0) * (isnull(term,0))), @RedeemedDate=redeemed_date, @MaturityDate=Maturity_Date, @CompletionDate=Completion_Date
	-- =[arrangement_fee_in_percentage]+[arrangement_fee_out_percentage]-[broker_fee_in_percentage]-[broker_fee_out_percentage]-([broker_flat_fee]/[gross_loan])
	FROM [Dawn_Data].[Loan].[Loan] WHERE [CBFL_ID]= @FilterCBFL_ID
	
	IF @RedeemedDate is null --AND @RedeemedDate is null    
	begin
		IF   @MaturityDate < getdate() 
			SET  @RedeemedDate =getdate() 
		ELSE 
			SET @RedeemedDate=@MaturityDate;
	end

	SELECT  @Broker_fee_ActuallyPaidOut= Broker_fee_ActuallyPaidOut, 
			@Broker_fee_flat= isnull(broker_flat_fee,0),
			@Broker_fee_OUT_Projected =isnull(gross_loan,0) *  isnull(broker_fee_out_percentage,0),
			@Broker_fee_IN_Projected =isnull(gross_loan,0) * isnull(broker_fee_in_percentage,0) 			
	FROM [Dawn_Data].[Loan].[Loan] WHERE [CBFL_ID]= @FilterCBFL_ID;
			
	set @Broker_fee_Projected =@Broker_fee_flat + @Broker_fee_IN_Projected +@Broker_fee_OUT_Projected + @BrokerTrailFeeCash
	
	DECLARE c CURSOR
		LOCAL STATIC FORWARD_ONLY READ_ONLY
		FOR
		-- This add up all valuations
		select	 [Report].[fn_getMarketValue](@FilterCBFL_ID)
				,[ACCOUNT_REF], [CompanyNumber], [CBFL_ID], [NAME], [Date], [NET_AMOUNT]
				,[GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE]
				,[ANALYSIS_1], [ANALYSIS_2], [ANALYSIS_3]
				,  [Staff_ID], [dteDate],[UseInLTV], Deleted_Flag
		from	Dawn_Data.dbo.tbl_SageUNIONCompanyTransactions T1
		where	T1.[CBFL_ID]= @FilterCBFL_ID 
		order by	[Date]	,CompanyNumber	,Tran_number

	OPEN c;

	FETCH NEXT FROM c
		INTO @CurrentValuation, @ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
				@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @UseInLTV, @Deleted_Flag;

	WHILE @@FETCH_STATUS = 0 begin

		If @Deleted_Flag =0 BEGIN
			SET @GROSS_AMOUNTRunningTotal = @GROSS_AMOUNTRunningTotal + @GROSS_AMOUNT;

			IF @TYPE='SP' 
				SET @SumNET_AMOUNT = isnull(@SumNET_AMOUNT,0) + isnull(@GROSS_AMOUNT,0);
		END

		 -- Pickup the first date
		 IF @IRRStartDate IS NULL AND 
			 ((@Type='SP' OR @Type='SR' OR @Type='SA') OR(@Details='Opening Balance' AND @Type='SI') OR (@Details='Opening Balance' AND @Type='SI') OR (LEFT(@Details,8)='Open Bal'  AND @Type='SC' ) OR (LEFT(@Details,8)='Open Bal' AND @Type='SI') )
			SET @IRRStartDate = @DATE

		 -- Pickup the Last Sale Recipt date
		 IF (@Type='SR' ) 
				SET @IRREndDate = @DATE
		
		--SET @NET_AMOUNTRunningTotal = @NET_AMOUNTRunningTotal + @NET_AMOUNT;
		INSERT @st(CurrentValuation,CurrentLTV, [ACCOUNT_REF], [CompanyNumber], [CBFL_ID], [NAME], [Date], [NET_AMOUNT], [GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE], 
			[ANALYSIS_1], [ANALYSIS_2], [ANALYSIS_3],  [Staff_ID], [dteDate], [SumNET_AMOUNT],[SumGROSS_AMOUNT],[UseInLTV], Deleted_Flag)
		SELECT @CurrentValuation
		, CASE WHEN (@GROSS_AMOUNTRunningTotal/@CurrentValuation)> 0 THEN (@GROSS_AMOUNTRunningTotal/@CurrentValuation)  ELSE 0 END As CurrentLTV
		,@ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
		@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @SumNET_AMOUNT, @GROSS_AMOUNTRunningTotal, @UseInLTV, @Deleted_Flag;
			
		FETCH NEXT FROM c 
			INTO @CurrentValuation,@ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
					@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @UseInLTV, @Deleted_Flag;
	END
	CLOSE c;
	DEALLOCATE c;

		SELECT @IRR = Dawn_Data.wct.XIRR(cf_amt, cf_date, 0.2)
		FROM 
		(
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Type]='SP' OR [Type]='SR' OR [Type]='SA') AND Deleted_Flag=0
				UNION ALL
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Details]='Opening Balance' AND [Type]='SC')	AND Deleted_Flag=0
				UNION ALL
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE (LEFT([Details],8)='Open Bal' AND [Type]='SC') AND Deleted_Flag=0
				UNION ALL
			SELECT @BrokerTrailFeeCash,CONVERT(VARCHAR(10),@MaturityDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_OUT_Projected,CONVERT(VARCHAR(10),@MaturityDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_IN_Projected,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_flat,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
		)	n	(cf_amt, cf_date);

		SELECT TOP 1 @IRRFantasyRedeemed= ROUND([SumGROSS_AMOUNT], 0) FROM @st ORDER BY  [Date] DESC, CompanyNumber DESC, Tran_number DESC;

		SELECT @IRRFantasy = Dawn_Data.wct.XIRR(cf_amt, cf_date, 0.2)
		FROM (
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Type]='SP' OR [Type]='SR' OR [Type]='SA') AND Deleted_Flag=0
				UNION ALL
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Details]='Opening Balance' AND [Type]='SC') AND Deleted_Flag=0	
				UNION ALL
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE (LEFT([Details],8)='Open Bal' AND [Type]='SC') AND Deleted_Flag=0
				UNION ALL
				-- Produce a Fantasy IRR. Imagine if they paid back the full amount on maturity date.
				SELECT -1 * @IRRFantasyRedeemed, @RedeemedDate AS [MM/DD/YYYY]  
				FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID  
				UNION ALL  -- Use projected
				SELECT @BrokerTrailFeeCash,CONVERT(VARCHAR(10),@RedeemedDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_OUT_Projected,CONVERT(VARCHAR(10),@RedeemedDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_IN_Projected,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_flat,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
		)	n	(cf_amt, cf_date);
		
		SELECT	[CompanyNumber], [CBFL_ID], [NAME], [Date], [GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE] 
		FROM @st 
		ORDER BY  [Date], CompanyNumber, Tran_number;
END
GO
/****** Object:  StoredProcedure [Reconciliation].[disused_SageTransactionsRunningTotals2]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [Reconciliation].[disused_SageTransactionsRunningTotals2] @wlId varchar(255)
AS BEGIN
	-- 24/07/2014. Peter Wegrzyn. performs a running sum on The NET and GROSS amounts, generates the LTV (on the current valuation) and IRR. 
	-- 1/10/2014. Modified to allow the selection of Transactions which are not being picked up by the random nature of their entry to SAGE.
	-- 13/10/2014. Modified Projected IRR to include projected Broker fees 
	SET NOCOUNT ON
	DECLARE @st TABLE (
	[CurrentValuation] Float NULL,	[CurrentLTV] Float NULL,		[ACCOUNT_REF] nvarchar(255) NULL,	[CompanyNumber] nvarchar(255) NULL,	[CBFL_ID] nvarchar(255) NULL,	[NAME] nvarchar(255) NULL,
	[Date] datetime2(7) NULL,	[NET_AMOUNT] float NULL,	[GROSS_AMOUNT] float NULL,	[TRAN_NUMBER] int NULL,	[ITEM_COUNT] int NULL,	[DETAILS] nvarchar(255) NULL,	[INV_REF] nvarchar(255) NULL,
	[TYPE] nvarchar(255) NULL,	[ANALYSIS_1] nvarchar(255) NULL,	[ANALYSIS_2] nvarchar(255) NULL,	[ANALYSIS_3] nvarchar(255) NULL,	[SSMA_TimeStamp] timestamp NOT NULL,
	[Staff_ID] nvarchar(255) NULL,	[dteDate] datetime NULL,	[SumNET_AMOUNT] float NULL,	[SumGROSS_AMOUNT] float NULL,	[IRR] float NULL, 	[UseInLTV] TinyInt NULL,
	[Broker_fee_ActuallyPaidOut] float NULL,	Deleted_Flag TinyInt NULL
					);

	 DECLARE @CurrentValuation Float 
	 DECLARE @CurrentLTV Float 
	 DECLARE @ACCOUNT_REF nvarchar(255) 
	 DECLARE @CompanyNumber nvarchar(255) 
	 DECLARE @CBFL_ID nvarchar(255) 
	 DECLARE @NAME nvarchar(255) 
	 DECLARE @Date datetime2(7) 
	 DECLARE @NET_AMOUNT float 
	 DECLARE @GROSS_AMOUNT float 
	 DECLARE @TRAN_NUMBER int 
	 DECLARE @ITEM_COUNT int 
	 DECLARE @DETAILS nvarchar(255) 
	 DECLARE @INV_REF nvarchar(255) 
	 DECLARE @TYPE nvarchar(255) 
	 DECLARE @ANALYSIS_1 nvarchar(255),	@ANALYSIS_2 nvarchar(255), @ANALYSIS_3 nvarchar(255) 
	 DECLARE @Staff_ID nvarchar(255) 
	 DECLARE @dteDate datetime 
	 DECLARE @SumNET_AMOUNT float
	 DECLARE @SumGROSS_AMOUNT float 
	 DECLARE @GROSS_AMOUNTRunningTotal float = 0
	 DECLARE @NET_AMOUNTRunningTotal float = 0
	 DECLARE @IRR float = 0
	 DECLARE @IRRFantasy float = 0 -- imagine if the loan is repaid today or on maturity date
	 DECLARE @IRRFantasyRedeemed float = 0 -- The Outstanding balance required to fully redeem the loan.
	 
	 DECLARE @IRRStartDate datetime2(7) -- starting date of Net IRR. Fees etc are accounted Monthly in Sage, but the dates need to be changed to start and end for IRR purposes
	 DECLARE @IRREndDate datetime2(7) -- End date for Net IRR 
	 DECLARE @UseInLTV TinyInt --UseIRR: 
	 DECLARE @Broker_fee_ActuallyPaidOut float -- The fee paid out to Broker. not cosistant with calcualtions so its hard coded in tbl_loan 
	 DECLARE @Broker_fee_Projected float
	 DECLARE @Broker_fee_flat float
	 DECLARE @Broker_fee_IN_Projected float  --Fee paid going into the loan, paid on completion (in a  day or two)
	 DECLARE @Broker_fee_OUT_Projected float --Fee paid going Out of the loan, paid on redemption or on Maturity if a Projected IRR
	 DECLARE @BrokerTrailFeeCash float	-- Trailer Fee, (term x interest rate) paid going Out of the loan, paid on redemption or on Maturity if a Projected IRR
	 DECLARE @RedeemedDate datetime2(7) 
	 DECLARE @MaturityDate datetime2(7)
	 DECLARE @CompletionDate datetime2(7)
 	 DECLARE @Deleted_Flag TinyInt 

	 DECLARE @FilterCBFL_ID VARCHAR(255)
	 /* This determine the use of the transaction. UseInLTV and UseInIRR are IDENTICAL, so we can use either. If they do differ the SP will have to be changed.
	 In MS Access. This query qryMoveToSQLServerSageUNIONCompanyTransactions populates . Removed SAGE type SI
	 
	 IIf((([Type]="SP" Or [Type]="SR" Or [Type]="SA") Or ([Details]="Opening Balance" And ([Type]="SC" Or [Type]="SI")) Or (Left([Details],8)="Open Bal" And ([Type]="SI" Or [Type]="SC")) Or (([Details]="Fee In" Or [Details]="Fee Out") And [Type]="SI")),1,0);
	*/

	select @IRRStartDate=NULL , @IRREndDate=NULL
		
	SELECT  @FilterCBFL_ID = CBFL_ID ,@BrokerTrailFeeCash= isnull(gross_loan,0) *(isnull(broker_fee_outInterestRate,0) * (isnull(term,0))), @RedeemedDate=redeemed_date, @MaturityDate=Maturity_Date, @CompletionDate=Completion_Date
	-- =[arrangement_fee_in_percentage]+[arrangement_fee_out_percentage]-[broker_fee_in_percentage]-[broker_fee_out_percentage]-([broker_flat_fee]/[gross_loan])
	FROM [Dawn_Data].[Loan].[Loan] WHERE weblabs_id = @wlId --[CBFL_ID]= @FilterCBFL_ID
	
	IF @RedeemedDate is null --AND @RedeemedDate is null    
	begin
		IF   @MaturityDate < getdate() 
			SET  @RedeemedDate =getdate() 
		ELSE 
			SET @RedeemedDate=@MaturityDate;
	end

	SELECT  @Broker_fee_ActuallyPaidOut= Broker_fee_ActuallyPaidOut, 
			@Broker_fee_flat= isnull(broker_flat_fee,0),
			@Broker_fee_OUT_Projected =isnull(gross_loan,0) *  isnull(broker_fee_out_percentage,0),
			@Broker_fee_IN_Projected =isnull(gross_loan,0) * isnull(broker_fee_in_percentage,0) 			
	FROM [Dawn_Data].[Loan].[Loan] WHERE  weblabs_id = @wlId --[CBFL_ID]= @FilterCBFL_ID;
			
	set @Broker_fee_Projected =@Broker_fee_flat + @Broker_fee_IN_Projected +@Broker_fee_OUT_Projected + @BrokerTrailFeeCash
	
	DECLARE c CURSOR
		LOCAL STATIC FORWARD_ONLY READ_ONLY
		FOR
		-- This add up all valuations
		select	 [Report].[fn_getMarketValue](@FilterCBFL_ID)
				,[ACCOUNT_REF], [CompanyNumber], [CBFL_ID], [NAME], [Date], [NET_AMOUNT]
				,[GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE]
				,[ANALYSIS_1], [ANALYSIS_2], [ANALYSIS_3]
				,  [Staff_ID], [dteDate],[UseInLTV], Deleted_Flag
		from	Dawn_Data.dbo.tbl_SageUNIONCompanyTransactions T1
		where	(T1.[CBFL_ID]= @FilterCBFL_ID or T1.ACCOUNT_REF = @wlId)
		order by	[Date]	,CompanyNumber	,Tran_number


	OPEN c;

	FETCH NEXT FROM c
		INTO @CurrentValuation, @ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
				@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @UseInLTV, @Deleted_Flag;

	WHILE @@FETCH_STATUS = 0 begin

		If @Deleted_Flag =0 BEGIN
			SET @GROSS_AMOUNTRunningTotal = @GROSS_AMOUNTRunningTotal + @GROSS_AMOUNT;

			IF @TYPE='SP' 
				SET @SumNET_AMOUNT = isnull(@SumNET_AMOUNT,0) + isnull(@GROSS_AMOUNT,0);
		END

		 -- Pickup the first date
		 IF @IRRStartDate IS NULL AND 
			 ((@Type='SP' OR @Type='SR' OR @Type='SA') OR(@Details='Opening Balance' AND @Type='SI') OR (@Details='Opening Balance' AND @Type='SI') OR (LEFT(@Details,8)='Open Bal'  AND @Type='SC' ) OR (LEFT(@Details,8)='Open Bal' AND @Type='SI') )
			SET @IRRStartDate = @DATE

		 -- Pickup the Last Sale Recipt date
		 IF (@Type='SR' ) 
				SET @IRREndDate = @DATE
		
		--SET @NET_AMOUNTRunningTotal = @NET_AMOUNTRunningTotal + @NET_AMOUNT;
		INSERT @st(CurrentValuation,CurrentLTV, [ACCOUNT_REF], [CompanyNumber], [CBFL_ID], [NAME], [Date], [NET_AMOUNT], [GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE], 
			[ANALYSIS_1], [ANALYSIS_2], [ANALYSIS_3],  [Staff_ID], [dteDate], [SumNET_AMOUNT],[SumGROSS_AMOUNT],[UseInLTV], Deleted_Flag)
		SELECT @CurrentValuation
		, CASE WHEN (@GROSS_AMOUNTRunningTotal/@CurrentValuation)> 0 THEN (@GROSS_AMOUNTRunningTotal/@CurrentValuation)  ELSE 0 END As CurrentLTV
		,@ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
		@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @SumNET_AMOUNT, @GROSS_AMOUNTRunningTotal, @UseInLTV, @Deleted_Flag;
			
		FETCH NEXT FROM c 
			INTO @CurrentValuation,@ACCOUNT_REF, @CompanyNumber, @CBFL_ID, @NAME, @Date, @NET_AMOUNT, @GROSS_AMOUNT, @TRAN_NUMBER, @ITEM_COUNT, @DETAILS, @INV_REF, @TYPE, 
					@ANALYSIS_1, @ANALYSIS_2, @ANALYSIS_3,  @Staff_ID, @dteDate, @UseInLTV, @Deleted_Flag;
	END
	CLOSE c;
	DEALLOCATE c;
/*
		SELECT @IRR = Dawn_Data.wct.XIRR(cf_amt, cf_date, 0.2)
		FROM 
		(
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Type]='SP' OR [Type]='SR' OR [Type]='SA') AND Deleted_Flag=0
				UNION ALL
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Details]='Opening Balance' AND [Type]='SC')	AND Deleted_Flag=0
				UNION ALL
			SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE (LEFT([Details],8)='Open Bal' AND [Type]='SC') AND Deleted_Flag=0
				UNION ALL
			SELECT @BrokerTrailFeeCash,CONVERT(VARCHAR(10),@MaturityDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_OUT_Projected,CONVERT(VARCHAR(10),@MaturityDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_IN_Projected,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
			SELECT @Broker_fee_flat,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
		)	n	(cf_amt, cf_date);

		SELECT TOP 1 @IRRFantasyRedeemed= ROUND([SumGROSS_AMOUNT], 0) FROM @st ORDER BY  [Date] DESC, CompanyNumber DESC, Tran_number DESC;

		SELECT @IRRFantasy = Dawn_Data.wct.XIRR(cf_amt, cf_date, 0.2)
		FROM (
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Type]='SP' OR [Type]='SR' OR [Type]='SA') AND Deleted_Flag=0
				UNION ALL
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE ([Details]='Opening Balance' AND [Type]='SC') AND Deleted_Flag=0	
				UNION ALL
				SELECT [GROSS_AMOUNT] , CONVERT(VARCHAR(10),[Date] , 101) AS [MM/DD/YYYY]  FROM @st WHERE (LEFT([Details],8)='Open Bal' AND [Type]='SC') AND Deleted_Flag=0
				UNION ALL
				-- Produce a Fantasy IRR. Imagine if they paid back the full amount on maturity date.
				SELECT -1 * @IRRFantasyRedeemed, @RedeemedDate AS [MM/DD/YYYY]  
				FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID  
				UNION ALL  -- Use projected
				SELECT @BrokerTrailFeeCash,CONVERT(VARCHAR(10),@RedeemedDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_OUT_Projected,CONVERT(VARCHAR(10),@RedeemedDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_IN_Projected,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
				UNION ALL
				SELECT @Broker_fee_flat,CONVERT(VARCHAR(10),@CompletionDate , 101) AS [MM/DD/YYYY]  FROM [Dawn_Data].[Loan].[Loan] WHERE CBFL_ID=@FilterCBFL_ID 
		)	n	(cf_amt, cf_date);
*/
		SELECT	[CompanyNumber], [CBFL_ID], [NAME], [Date], [GROSS_AMOUNT], [TRAN_NUMBER], [ITEM_COUNT], [DETAILS], [INV_REF], [TYPE] 
		FROM @st 
		ORDER BY  [Date], CompanyNumber, Tran_number;
END
GO
/****** Object:  StoredProcedure [Reference].[CommsTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[CommsTypeGet]
	
AS

SELECT
	CommsTypeId,
	CommsType As CommsTypeDescription
FROM Dawn_Data.Loan.CommsType

GO
/****** Object:  StoredProcedure [Reference].[CountryGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [Reference].[CountryGet]
AS

SELECT
	country_id As CountryId,
	country_name As CountryName,
	country_code As CountryCode
FROM Dawn_Data.Reference.Country

GO
/****** Object:  StoredProcedure [Reference].[DocumentLog]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Reference].[DocumentLog] @Message varchar(255) , @User varchar(132)
as begin
	insert Dawn_Data.Audit.DocumentLog([Message],Created,[User]) values (@Message,getdate(),@User)
end
GO
/****** Object:  StoredProcedure [Reference].[DocumentTemplateByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[DocumentTemplateByIdGet]
	@DocumentTemplateId Int
AS

SELECT 
	DocumentTemplateId,
	FkDocumentTemplateTypeId As DocumentTemplateTypeId,
	FileName, 
	IsActive
	--Document
FROM Dawn_Data.Reference.DocumentTemplate
WHERE DocumentTemplateId = @DocumentTemplateId

GO
/****** Object:  StoredProcedure [Reference].[DocumentTemplateClear]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Reference].[DocumentTemplateClear]
	@DocumentTemplateId Int OUTPUT,
	@FileChunk VarBinary(max),
	@User NVarChar(255)
AS

UPDATE Dawn_Data.Reference.DocumentTemplate
SET 
	--Document = @FileChunk, 
	LastUpdate = GETDATE(),
	LastUpdateBy = @User
WHERE DocumentTemplateId = @DocumentTemplateId
GO
/****** Object:  StoredProcedure [Reference].[DocumentTemplateExists]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Reference].[DocumentTemplateExists]
	@DocumentTemplateId Int,
	@DocumentTemplateTypeId Int,
	@FileName VarChar(1000)
AS

SELECT	
	CASE WHEN EXISTS (SELECT TOP 1 *
						FROM Dawn_Data.Reference.DocumentTemplate d
						WHERE d.FkDocumentTemplateTypeId = @DocumentTemplateTypeId
							AND d.FileName = @FileName
							AND DocumentTemplateId <> @DocumentTemplateId)
		THEN CONVERT(bit, 1)
		ELSE CONVERT(bit, 0)
	END As DocumentExists


GO
/****** Object:  StoredProcedure [Reference].[DocumentTemplateFileUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Reference].[DocumentTemplateFileUpd]
	@DocumentTemplateId Int,
	@FileChunk VarBinary(max),
	@User NVarChar(255)
AS
/*
IF EXISTS (SELECT * FROM Dawn_Data.Reference.DocumentTemplate WHERE Document IS NULL AND DocumentTemplateId = @DocumentTemplateId)
	UPDATE Dawn_Data.Reference.DocumentTemplate
	SET Document = @FileChunk,
		LastUpdate = GETDATE(),
		LastUpdateBy = @User
	WHERE DocumentTemplateId = @DocumentTemplateId
ELSE
	UPDATE Dawn_Data.Reference.DocumentTemplate
	SET Document.Write(@FileChunk, null, null), 
		LastUpdate = GETDATE(), 
		LastUpdateBy = @User
	WHERE DocumentTemplateId = @DocumentTemplateId
*/

GO
/****** Object:  StoredProcedure [Reference].[DocumentTemplateGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Reference].[DocumentTemplateGet]
	@DocumentTemplateTypeId int,
	@ShowHidden bit
AS BEGIN

SET NOCOUNT on

SELECT 
	DocumentTemplateId,
	FkDocumentTemplateTypeId As DocumentTemplateTypeId,
	t.Description As DocumentTemplateType,
	FileName
FROM Dawn_Data.Reference.DocumentTemplate d
JOIN Dawn_Data.Reference.DocumentTemplateType t ON d.FkDocumentTemplateTypeId = t.DocumentTemplateTypeId
WHERE (@ShowHidden = 1 OR IsActive = 1)
  AND (@DocumentTemplateTypeId = 0 OR FkDocumentTemplateTypeId = @DocumentTemplateTypeId)
ORDER BY FkDocumentTemplateTypeId, FileName

END

GO
/****** Object:  StoredProcedure [Reference].[DocumentTemplateIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Reference].[DocumentTemplateIns]
	@DocumentTemplateId Int OUTPUT,
	@DocumentTemplateTypeId Int,
	@FileName NVarChar(1000),
	@FileChunk VarBinary(max),
	@User NVarChar(255)
AS

-- Staff_Id is stored with domain prefix some places and without domain prefix in others.
-- The convention in the tbl_staff table is without prefix, so Aura will do the same
-- we can fudge it here so the Access calculator still works and then fix it later

IF (CHARINDEX('OMN\', @User) = 0)
	SELECT @User = 'OMN\' + @User
/*
INSERT INTO Dawn_Data.Reference.DocumentTemplate(FkDocumentTemplateTypeId, FileName, Document, IsActive, CreatedBy, Created, LastUpdateBy, LastUpdate)
SELECT @DocumentTemplateTypeId, @FileName, @FileChunk, 1, @User, GETDATE(), @User, GETDATE()
*/
SELECT @DocumentTemplateId = SCOPE_IDENTITY()

GO
/****** Object:  StoredProcedure [Reference].[DocumentTemplateIsActiveUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Reference].[DocumentTemplateIsActiveUpd]
	@DocumentTemplateId Int,
	@IsActive bit,
	@User NVarChar(255)
AS

-- Staff_Id is stored with domain prefix some places and without domain prefix in others.
-- The convention in the tbl_staff table is without prefix, so Aura will do the same
-- we can fudge it here so the Access calculator still works and then fix it later

IF (CHARINDEX('OMN\', @User) = 0)
	SELECT @User = 'OMN\' + @User

UPDATE Dawn_Data.Reference.DocumentTemplate
SET IsActive = @IsActive,
	LastUpdate = GETDATE(),
	LastUpdateBy = @User
WHERE DocumentTemplateId = @DocumentTemplateId

GO
/****** Object:  StoredProcedure [Reference].[DocumentTemplateTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[DocumentTemplateTypeGet]
AS

SELECT 
	DocumentTemplateTypeId,
	Description
FROM Dawn_Data.Reference.DocumentTemplateType


GO
/****** Object:  StoredProcedure [Reference].[DocumentTemplateUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Reference].[DocumentTemplateUpd]
	@DocumentTemplateId Int,
	@DocumentTemplateTypeId Int,
	@FileName NVarChar(1000),
	@User NVarChar(255)
AS

-- Staff_Id is stored with domain prefix some places and without domain prefix in others.
-- The convention in the tbl_staff table is without prefix, so Aura will do the same
-- we can fudge it here so the Access calculator still works and then fix it later

IF (CHARINDEX('OMN\', @User) = 0)
	SELECT @User = 'OMN\' + @User

UPDATE Dawn_Data.Reference.DocumentTemplate
SET FkDocumentTemplateTypeId = @DocumentTemplateTypeId,
	FileName = @FileName,
	LastUpdate = GETDATE(),
	LastUpdateBy = @User
WHERE DocumentTemplateId = @DocumentTemplateId
GO
/****** Object:  StoredProcedure [Reference].[EndOfDaysPeriodsGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Reference].[EndOfDaysPeriodsGet]
	 @InterestStartDate DATE
-- 20180522. PW . Get the periodocity
-- 20180611 1st day to last day of month - special case.

/*DECLARE @InterestStartDate DATE
SET @InterestStartDate ='02-08-2017'
exec [Reference].[EndOfDaysPeriodsGet] @InterestStartDate 
go
*/
	AS 	BEGIN
		set nocount on
		DECLARE @PeriodDay INT, @PeriodMonth INT, @PeriodYear INT -- period dates
		DECLARE @InterestEndDate DATE,@InterestEndDatePlusOne DATE -- the following month
		DECLARE @EndOfDaysId INT, @StartDay INT, @StartMonth INT, @StartYear INT, @EndDay INT, @EndMonth INT, @EndYear INT, @Days  INT, @LeapYear INT, @Series INT, @IsActive BIT
		DECLARE @DayCount INT

		PRINT Format(@InterestStartDate, 'dd-MMM-yyyy', 'en-US') --+ ' ' +  Format(@InterestEndDate, 'dd-MMM-yyyy', 'en-US')
		--SELECT @InterestEndDatePlusOne =DATEADD(MONTH,1, @InterestEndDate) -- Follow on month to get the number of days
		SELECT @StartDay=DAY(@InterestStartDate), @StartMonth=MONTH(@InterestStartDate), @StartYear=YEAR(@InterestStartDate)
		SELECT @endDay=DAY(@InterestEndDate), @endMonth=MONTH(@InterestEndDate), @endYear=YEAR(@InterestEndDate)
		PRINT @StartDay 
		PRINT @StartMonth 
		PRINT @StartYear
		PRINT @endDay 
		PRINT @endMonth 
		PRINT @endYear

		SELECT @EndOfDaysId=EndOfDaysId, @Series=Series,  @IsActive=IsActive FROM  [Dawn_Data].Reference.EndOfDays
		WHERE StartDay=@StartDay AND StartMonth=@StartMonth AND StartYear=@StartYear AND IsActive=1
	
		print '@EndOfDaysId'
		print @EndOfDaysId
		print '@Series'
		print @Series
		print '@IsActive'	
		print @IsActive	
		print @EndOfDaysId

	IF @StartDay=1 -- 20180611 1st day to last day of month - special case.
		BEGIN
				SELECT  
				CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST((@StartDay)  AS VARCHAR(2))) [CashflowDate] ,
				@InterestStartDate AS InterestStartDate,
				DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(@StartDay  AS VARCHAR(2)) )) StarTDiff,
				DATEDIFF(d,@InterestEndDate, CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST((@StartDay)  AS VARCHAR(2)) )) EndDIFF,
				0 AS EndOfDaysId, @StartDay AS StartDay, 
				StartMonth, StartYear, [Days] as [EndDays], StartMonth AS [EndMonth], StartYear AS [EndYear], [Days], LeapYear, Series, IsActive
				FROM  [Dawn_Data].Reference.EndOfDays
				WHERE Series=1 AND IsActive=1 
				AND  DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(@StartDay  AS VARCHAR(2)) ))>=0
				ORDER BY StartYear, StartMonth, StartDay;
				--GOTO EXITHERE
		END
		ELSE
		BEGIN		
			IF @EndOfDaysId is not null 
					SELECT CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST(EndDay  AS VARCHAR(2))) [CashflowDate],
					@InterestStartDate AS InterestStartDate,
					DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(StartDay  AS VARCHAR(2)) )) StarTDiff,
					DATEDIFF(d, @InterestEndDatePlusOne, CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST(EndDay  AS VARCHAR(2)) )) EndDIFF,
					EndOfDaysId, StartDay, StartMonth, StartYear, EndDay, EndMonth, EndYear, [Days], LeapYear, Series, IsActive
					FROM  [Dawn_Data].Reference.EndOfDays
					WHERE Series=@Series AND IsActive=1 

					AND  DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(StartDay  AS VARCHAR(2)) ))>=0
					ORDER BY StartYear, StartMonth, StartDay
					--StartDay=@StartDay AND StartMonth=@StartMonth AND StartYear=@StartYear AND IsActive=-1 ORDER BY Series
			ELSE
				-- Series 1 is 27th to 26th pattern, hence can be used for all regular month periods.
					SELECT  
					CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST((@StartDay-1)  AS VARCHAR(2))) [CashflowDate],
					@InterestStartDate AS InterestStartDate,
					DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(@StartDay  AS VARCHAR(2)) )) StarTDiff,
					DATEDIFF(d,@InterestEndDate, CONVERT(date, CAST(EndYear AS VARCHAR(4)) + '-' + CAST(EndMonth  AS VARCHAR(2)) + '-' + CAST((@StartDay-1)  AS VARCHAR(2)) )) EndDIFF,
					0 AS EndOfDaysId, @StartDay AS StartDay, 
					StartMonth, StartYear, @StartDay-1 as [EndDays], EndMonth, EndYear, [Days], LeapYear, Series, IsActive
					FROM  [Dawn_Data].Reference.EndOfDays
					WHERE Series=1 AND IsActive=1 
					AND  DATEDIFF(d,@InterestStartDate,CONVERT(date, CAST(StartYear AS VARCHAR(4)) + '-' + CAST(StartMonth  AS VARCHAR(2)) + '-' + CAST(@StartDay  AS VARCHAR(2)) ))>=0
					ORDER BY StartYear, StartMonth, StartDay;
		END
END
GO
/****** Object:  StoredProcedure [Reference].[ExitStrategyGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[ExitStrategyGet]
	@ShowOnlyActive bit
AS

SELECT 
	ExitStrategyId,
	ExitStrategy As Description, 
	DisplayOrder,
	IsActive
FROM Dawn_Data.Loan.ExitStrategy
WHERE (@ShowOnlyActive = 0 OR IsActive = 1)
ORDER BY DisplayOrder

GO
/****** Object:  StoredProcedure [Reference].[FunderByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Reference].[FunderByIdGet]	@FunderId		int
											,@Message			varchar(max)	output
											,@Debug				tinyint	=	0
as begin
	set nocount on

	declare @rc int
	set @rc = -1	/*initialised as false/failure*/

	begin try
		select	convert(bigint,0) as Rid
			,[Funder_Id] [ID]
			,[Funder_Name] as Funder
		from Reference.Funders
		where	[Funder_Id] = @FunderId

		set @rc=0

	end try

	begin catch
		set	@Message = 'Error in: SP:' + OBJECT_NAME(@@PROCID) + ' , ' + ERROR_MESSAGE() + ' , User: ' + system_user
	end catch

	return @rc
end
GO
/****** Object:  StoredProcedure [Reference].[FunderByNameList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Reference].[FunderByNameList]	 @PageSize		smallint =	20
											,@PageNo		smallint =	0
											,@AccessLevel	tinyint
											,@Filter		varchar(255)
											,@FilterType	varchar(255) --'Funder' or 'postcode'
											,@Order			varchar(32)
											,@Debug			tinyint	=	0
as begin
	set nocount on
	set rowcount @Pagesize

	declare @StartRId int , @EndRid int

	if @PageNo<>0 begin
		select	 @StartRId	=	@PageSize * (@PageNo-1) +1
				,@EndRid	=	@PageSize * (@PageNo-1) + @PageSize
		
	end
	else
		select	 @StartRId	=	1
				,@EndRid	=	@PageSize

	if @debug>0
		select	 @StartRId	,	@EndRid

	;with CTE_Funders
    as (
	select	 ROW_NUMBER() OVER	(ORDER BY 
										 case when @Filter is not null and @FilterType = 'Funder' and @Order='ASC' then [Funder_Name] end ASC
										,case when @Filter is not null and @FilterType = 'Funder' and @Order='DESC' then [Funder_Name] end DESC
								) AS Rid
			,[Funder_Id] [Id]
			,[Funder_Name] as FunderName
	from Reference.Funders
	where	[Funder_Name] like case when @Filter is not null and @FilterType='Funder' then '%' + @Filter + '%' else [Funder_Name] end
	)
	
	select	*
	from	CTE_Funders
	where	Rid between @StartRId and @EndRid

	--select convert(bigint,0) as Rid, funder_id Id, funder_name FunderName from Reference.Funders

end
GO
/****** Object:  StoredProcedure [Reference].[FunderListGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-07-04		Gurdeep			Added FunderOrder,IsActive, Created, CreatedBy flag

*/

CREATE proc [Reference].[FunderListGet] as begin
	set nocount on 

	select distinct
		 Funder_ID		as	FunderId
		,Funder_Name	as	FunderName
		,FunderOrder
		,IsActive
		,Created
		,CreatedBy
	into #f
	from Dawn_Data.[Reference].[Funders]
	Order by funder_name

	set identity_insert #f on
	insert #f (funderid,fundername,FunderOrder,IsActive,Created,CreatedBy) values (0,'*All*',0, 1, GETDATE(), 'SysOp')
	set identity_insert #f off

	select funderid,fundername,FunderOrder,IsActive,Created,CreatedBy
	from #f	order by fundername, FunderOrder	
end
GO
/****** Object:  StoredProcedure [Reference].[GetCaseOwners]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*

------------------------------------------------------------------------------------
Date			Name			Description
------------------------------------------------------------------------------------
2018-08-02		Gurdeep			First version

*/

CREATE PROCEDURE [Reference].[GetCaseOwners]
	
AS

SELECT 0					as [SortOrder]
      ,0					as [CaseOwnerID]
	  ,''					as [LoginName]
	  ,''					as [FirstName]
	  ,''					as [LastName]
      ,'[Not Allocated]'	as FullName
      ,''					as [Email]
      ,1					as [Active]
      ,GETDATE()			as [Created]
      ,''					as [CreatedBy]
      ,GETDATE()			as [Lastupdate]
      ,''					as [LastUpdateBy]
UNION

SELECT 1 as [SortOrder]
      ,[CaseOwnerID]
	  ,[LoginName]
	  ,[FirstName]
	  ,[LastName]
      ,CONCAT([FirstName], ' ', [LastName]) as FullName
      ,[Email]
      ,[Active]
      ,[Created]
      ,[CreatedBy]
      ,[Lastupdate]
      ,[LastUpdateBy]
  FROM [Dawn_Data].[Reference].[CaseOwner]
  order by FullName
GO
/****** Object:  StoredProcedure [Reference].[GetCashflowInterestType]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [Reference].[GetCashflowInterestType] 
as begin
-- 20180211. Created Peter Wegrzyn. Release_1.0.18.11
	set nocount on
	SELECT TOP 1000 [CashflowInterestTypeId]
      ,[CashflowInterestTypeKey]
      ,[CashflowInterestType]
      ,[DisplayOrder]
      ,[Created]
      ,[CreatedBy]
      ,[LastUpdate]
      ,[LastUpdateBy]
  FROM [Dawn_Data].[Reference].[CashflowInterestType]
  ORDER by [DisplayOrder] 
	
end

GO
/****** Object:  StoredProcedure [Reference].[GetDocumentTypes]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[GetDocumentTypes]
as Begin
	set nocount on

	select	Id				As FileTypeId,
			filetype_name	As FileTypeName
	from	Dawn_Data.Reference.DocumentType
	order by 
		filetype_name

end
GO
/****** Object:  StoredProcedure [Reference].[InterestTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[InterestTypeGet]
AS

	SELECT 
		InterestTypeId,
		InterestType As Description
	FROM Dawn_Data.Reference.InterestType

GO
/****** Object:  StoredProcedure [Reference].[IntroducerListGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Reference].[IntroducerListGet]		 @Debug	tinyint	=	0
as begin

	set nocount on

	select [ID]
		  ,[IntroducerName]
		  ,[WebID]
		  ,isnull([PostCode],'')	Postcode
		  ,isnull([Email],'')		Email
		  ,isnull([Telephone],'')	Telephone
	from		[Reference].[Introducer]
	order by	Introducername

end
GO
/****** Object:  StoredProcedure [Reference].[LegalEntityPositionGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[LegalEntityPositionGet]
	
AS

SELECT
	LegalEntityPositionId,
	LegalEntityPosition As Position
FROM Dawn_Data.Loan.LegalEntityPosition
WHERE IsActive = 1
ORDER BY DisplayOrder

GO
/****** Object:  StoredProcedure [Reference].[LegalEntityTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[LegalEntityTypeGet]
AS

BEGIN

SET NOCOUNT ON

SELECT 
	LegalEntityTypeId,
	LegalEntityType As EntityType,
	DisplayOrder
FROM Dawn_Data.Reference.LegalEntityType
WHERE IsActive = 1
ORDER BY DisplayOrder

SET NOCOUNT OFF

END

GO
/****** Object:  StoredProcedure [Reference].[LoanCaseStatusGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[LoanCaseStatusGet]
-- 20191115. PW. Merging Origination and Servicing databases needs a status
AS
BEGIN
	SELECT [StatusId]      ,[Status]
	  FROM [Dawn_Data].[Reference].[Status]
	  where isActive	=	1
	  ORDER BY DisplayOrder

END

GO
/****** Object:  StoredProcedure [Reference].[LoanCategoryGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[LoanCategoryGet]
AS
BEGIN

SET NOCOUNT ON

SELECT 
	LoanCategoryId,
	LoanCategory As Description,
	IsRegulated,
	IsActive
FROM Dawn_Data.Reference.LoanCategory
WHERE IsActive = 1

SET NOCOUNT OFF

END

GO
/****** Object:  StoredProcedure [Reference].[LoanRedemptionStatusGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[LoanRedemptionStatusGet]

AS

BEGIN

SELECT LoanRedemptionStatusId, Description
FROM Dawn_Data.Reference.LoanRedemptionStatus
ORDER BY DisplayOrder

END

GO
/****** Object:  StoredProcedure [Reference].[NoteSubCategoryGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc  [Reference].[NoteSubCategoryGet] @NoteTypeId int ,  @getDefault bit as 
begin
	set nocount on

	select
			sc.NoteSubCategoryId SubKeyId, sc.NoteSubCategory [Description]

	from		Dawn_Data.Reference.NoteSubCategory		sc
	inner join	Dawn_Data.Reference.NoteTypeSubCategory	tsc		on	tsc.fkNoteSubCategoryId	=	sc.NoteSubCategoryId
	where	tsc.fkNoteTypeId=@NoteTypeId --and isDefault=@getDefault
	order by tsc.DisplayOrder
	--where NoteSubCategoryId in (select fkNoteSubCategoryId from Dawn_Data.Reference.NoteTypeSubCategory where fkNoteTypeId=@NoteTypeId and isDefault=@getDefault)
	
end
GO
/****** Object:  StoredProcedure [Reference].[NoteTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[NoteTypeGet]

AS

SET NOCOUNT ON

SELECT 
	NoteTypeId,
	NoteType As Description
FROM Dawn_Data.Reference.NoteType

SET NOCOUNT OFF

GO
/****** Object:  StoredProcedure [Reference].[RecoveryNoteCategoryGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc  [Reference].[RecoveryNoteCategoryGet] @NoteCategoryFilter int as 
begin
	set nocount on

	select	distinct nt.NoteTypeID ,nt.NoteType [Description] , tsc.TypeDisplayOrder
	into #result
	from Dawn_Data.Reference.NoteType nt
	inner join	Dawn_Data.Reference.NoteTypeSubCategory	tsc		on	tsc.fkNoteTypeId	=	nt.NoteTypeID
	where	tsc.fkCategory=1
	and nt.NoteTypeID = case when @NoteCategoryFilter<>0 then @NoteCategoryFilter else nt.NoteTypeID end

	select NoteTypeID ,[Description] from #result	order by TypeDisplayOrder
	--where NoteSubCategoryId in (select fkNoteSubCategoryId from Dawn_Data.Reference.NoteTypeSubCategory where fkNoteTypeId=@NoteTypeId and isDefault=@getDefault)
	
end
GO
/****** Object:  StoredProcedure [Reference].[ResourceTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[ResourceTypeGet]

AS

BEGIN

SELECT ResourceTypeId, Description
FROM Dawn_Data.Reference.ResourceType

END

GO
/****** Object:  StoredProcedure [Reference].[SecuritySubTypeByTypeIDGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Reference].[SecuritySubTypeByTypeIDGet] @SecurityTypeId int as begin
	/*	v		who		when		what
		1.00	PJR		20.2.18		init
	*/
	set nocount on

	select	 st.SecuritySubTypeId		AS SecuritySubTypeId
			,st.SecuritySubType			AS SecuritySubTypeName
--select *
	from		Dawn_Data.Reference.SubTypeOfSecurityType		t
	inner join	Dawn_Data.Reference.SecuritySubType				st	on	st.SecuritySubTypeId	=	t.fkSecuritySubTypeId
	where t.fkSecurityTypeId = @SecurityTypeId
	and	IsActive=1

	order by	st.DisplayOrder ;
end
GO
/****** Object:  StoredProcedure [Reference].[SecuritySubTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[SecuritySubTypeGet]
AS
BEGIN
	-- 'DIM-116': Created: DVM:

	SET NOCOUNT ON

	SELECT
			SecSubType.SecuritySubTypeId AS SecuritySubTypeId,
			SecSubType.SecuritySubType AS SecuritySubTypeName,
			SecSubType.DisplayOrder AS DisplayOrder,
			SecSubType.Created AS Created,
			SecSubType.CreatedBy AS CreatedBy,
			SecSubType.LastUpdate AS LastUpdate,
			SecSubType.LastUpdateBy AS LastUpdateBy
		FROM
			Dawn_Data.Reference.SecuritySubType  SecSubType
		ORDER BY
			SecSubType.DisplayOrder ;
END

GO
/****** Object:  StoredProcedure [Reference].[SecurityTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Reference].[SecurityTypeGet] AS BEGIN
	/*	v		who		when		what
	--1.00	2.2018	PJR		get basic sec type.
	--1.01	19.2.18 PJR		get security type list, also cleans up the col names a little

	--note this is based on the tables in Dawn_Data, so a little incomplete

	*/

	set nocount on

	select	st.Security_Type_Id	AS SecurityTypeId
			,st.Security_Types	AS SecurityTypeName
		--select *
	FROM	Dawn_Data.Reference.SecurityType  st
	where IsActive=1
	ORDER BY
			st.security_types
END
GO
/****** Object:  StoredProcedure [Reference].[SolicitorByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Reference].[SolicitorByIdGet]	@SolicitorId		int
											,@Message			varchar(max)	output
											,@Debug				tinyint	=	0
as begin
	set nocount on

	declare @rc int
	set @rc = -1	/*initialised as false/failure*/

	begin try
		select	convert(bigint,0) as Rid
				,[ID]
				,isnull([Solicitor Key],'') as SolicitorKey
				,isnull([SolicitorName],'') as SolicitorName
				,isnull([WebID],0) as WebId
				,isnull([LastUpdate],getdate()) as LastUpdate
				,isnull([PostCode],'') PostCode
				,isnull([Email],'') Email
				,isnull([Telephone],'') Telephone
				,isnull(convert(varchar(255),[SSMA_TimeStamp]),'') SSMA_TimeStamp
				,isnull([Staff_ID],'') Staff_Id
				,isnull([dteDate],getdate()) dteDate 
		from Reference.Solicitor
		where	Id = @SolicitorId

		set @rc=0

	end try

	begin catch
		set	@Message = 'Error in: SP:' + OBJECT_NAME(@@PROCID) + ' , ' + ERROR_MESSAGE() + ' , User: ' + system_user
	end catch

	return @rc
end
GO
/****** Object:  StoredProcedure [Reference].[SolicitorByNameList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Reference].[SolicitorByNameList]		 @PageSize		smallint =	20
											,@PageNo		smallint =	0
											,@AccessLevel	tinyint
											,@Filter		varchar(255)
											,@FilterType	varchar(255) --'solicitor' or 'postcode'
											,@Order			varchar(32)
											,@Debug			tinyint	=	0
as begin
	set nocount on

	set rowcount @Pagesize

	declare @StartRId int , @EndRid int

	if @PageNo<>0 begin
		select	 @StartRId	=	@PageSize * (@PageNo-1) +1
				,@EndRid	=	@PageSize * (@PageNo-1) + @PageSize
		
	end
	else
		select	 @StartRId	=	1
				,@EndRid	=	@PageSize

	if @debug>0
		select	 @StartRId	,	@EndRid

	;with CTE_Solicitors
    as (
	select	 ROW_NUMBER() OVER	(ORDER BY 
										 case when @Filter is not null and @FilterType = 'solicitor' and @Order='ASC' then [LegalRepName] end ASC
										,case when @Filter is not null and @FilterType = 'solicitor' and @Order='DESC' then [LegalRepName] end DESC
										,case when @Filter is not null and @FilterType = 'postcode' and @Order='ASC' then [LegalRepName] end ASC
										,case when @Filter is not null and @FilterType = 'postcode' and @Order='DESC' then [LegalRepName] end DESC
								) AS Rid
			,[LegalRepID]
			,[LegalRepName]
			,[LastUpdate]
			,[PostCode]
			,[Email]
			,[Telephone]
	from Dawn_Data.Reference.LegalRepresentative
	where	
			--isActive	=	1	and		
			[LegalRepName] like case when @Filter is not null and @FilterType='solicitor' then '%' + @Filter + '%' else [LegalRepName] end
	and		[PostCode] like case when @Filter is not null and @FilterType='postcode' then @Filter + '%' else [PostCode] end
	)

	select	*
	from	CTE_Solicitors
	where	Rid between @StartRId and @EndRid
/*
	select	 convert(int,0) AS Rid
	,[LegalRepID]
			,[LegalRepName]
			,[LastUpdate]
			,[PostCode]
			,[Email]
			,[Telephone]
	from Dawn_Data.Reference.LegalRepresentative
*/
end
GO
/****** Object:  StoredProcedure [Reference].[SolicitorGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Reference].[SolicitorGet]		@SolicitorId	int
											,@Debug			tinyint	=	0
as begin
	set nocount on
	SET FMTONLY OFF

	select	 [ID]
			,[Solicitor Key]
			,[SolicitorName]
			,[WebID]
			,[LastUpdate]
			,[PostCode]
			,[Email]
			,[Telephone]
			,[SSMA_TimeStamp]
			,[Staff_ID]
			,[dteDate]
	from Reference.Solicitor
	where	isActive	=	1
	and		Id = @SolicitorId
end
GO
/****** Object:  StoredProcedure [Reference].[SolicitorIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Reference].[SolicitorIns]		 @SolicitorKey		nvarchar(255)
											,@SolicitorName		nvarchar(255)
											,@WebID				int
											,@PostCode			nvarchar(255)
											,@Email				nvarchar(255)
											,@Telephone			nvarchar(255)
											--,@SSMA_TimeStamp	timestamp

											,@NewPK				int				output
											,@Message			varchar(max)	output
											,@Debug				tinyint	=	0
as begin
	set nocount on

	declare @rc tinyint
	set @rc = -1	/*initialised as false/failure*/

	begin try
		insert [Reference].[Solicitor]([Solicitor Key]
								,[SolicitorName]
								,[WebID]
								,[PostCode]
								,[Email]
								,[Telephone]
								--,[SSMA_TimeStamp]
								)
		select	@SolicitorKey
				,@SolicitorName
				,@WebID
				,@PostCode
				,@Email
				,@Telephone
				--,@SSMA_TimeStamp

		select @rc=0 , @NewPK = @@IDENTITY

	end try

	begin catch
		set	@Message = 'Error in: SP:' + OBJECT_NAME(@@PROCID) + ' , ' + ERROR_MESSAGE() + ' , User: ' + system_user
	end catch

	return @rc
end
GO
/****** Object:  StoredProcedure [Reference].[SolicitorPageList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Reference].[SolicitorPageList]	 @PageSize		smallint = 20
											,@Filter		varchar(255)
											,@FilterType	varchar(255) --'solicitor' or 'postcode'
											,@Order			varchar(32)
											,@Debug			tinyint	=	0
as begin
	set nocount on

	select	 ROW_NUMBER() OVER	(ORDER BY 
										 case when @Filter is not null and @FilterType = 'solicitor' and @Order='ASC' then [SolicitorName] end ASC
										,case when @Filter is not null and @FilterType = 'solicitor' and @Order='DESC' then [SolicitorName] end DESC
										,case when @Filter is not null and @FilterType = 'postcode' and @Order='ASC' then [SolicitorName] end ASC
										,case when @Filter is not null and @FilterType = 'postcode' and @Order='DESC' then [SolicitorName] end DESC
								) AS Rid
	into	#Rids
	from Reference.Solicitor
	where	isActive	=	1
	and		[SolicitorName] like case when @Filter is not null and @FilterType='solicitor' then '%' + @Filter + '%' else [SolicitorName] end
	and		[PostCode] like case when @Filter is not null and @FilterType='postcode' then @Filter + '%' else [PostCode] end

	if @debug>0
			select * from #Rids

	select	ROW_NUMBER() OVER (ORDER BY Rid) PageNo , Rid
	into #Pages
	from	#Rids
	where Rid % @PageSize = 0

	if @debug>0 and exists(select * from #pages)
				select 'pages',* from #Pages

	declare @lastPageRid int , @lastRid int

	select @lastPageRid=isnull(max(Rid),0) from #Pages
	select @lastRid=max(Rid) from #Rids

	if @debug>0
			select @lastPageRid '@lastPageRid' , @lastRid '@lastRid'

	if @lastPageRid<=0
		insert #Pages(PageNo)  select 1 

	if @lastPageRid<@lastRid and @lastPageRid>0
		insert #Pages(PageNo)  select max(PageNo) + 1 from #Pages

	select PageNo from #Pages order by PageNo

	--select convert(int,0) as PageNo
end
GO
/****** Object:  StoredProcedure [Reference].[TenureTypeGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Reference].[TenureTypeGet]
AS
BEGIN
	-- 'DIM-116': Created: DVM:

	SET NOCOUNT ON

	SELECT
			SecTenure.SecurityTenureId AS SecurityTenureId,
			SecTenure.SecurityTenure AS SecurityTenureName,
			SecTenure.DisplayOrder AS DisplayOrder,
			SecTenure.Created AS Created,
			SecTenure.CreatedBy AS CreatedBy,
			SecTenure.LastUpdate AS LastUpdate,
			SecTenure.LastUpdateBy AS LastUpdateBy
		FROM
			Dawn_Data.Reference.SecurityTenure  SecTenure
		ORDER BY
			SecTenure.DisplayOrder ;
END

GO
/****** Object:  StoredProcedure [Report].[AllLatestValuation]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Report].[AllLatestValuation] as begin
	
	set nocount on
	set dateformat dmy;

	WITH Val_CTE (CaseReference , date_of_valuation , SecurityId, SecurityAddress) AS
	(
		select  CaseReference,max(date_of_valuation) date_of_valuation , Security_Id, SecurityAddress 
		from Dawn_Data.Loan.ValuationVW 
			where ValuationStatus='Received' 
		group by Casereference,Security_Id,SecurityAddress
	)

	select	distinct
			l.loan_id
			,l.CBFL_id
			,v.ValuationStatus
			,v.SecurityAddress
			,v.Surveyor
			,v.date_of_valuation
			,v.Valuation
			,v.[90 day_value_of_security]
			,v.rental_value
			,v.[re-instatement_value]
			,v.ValueAfterWorks
			,v.[90DayValueAfterWorks]
			from		Dawn_Data.Loan.Loan					l
			inner join	Dawn_Data.Loan.SecurityMap			sm	on	sm.loan_id		=	l.loan_id
			inner join	Dawn_Data.Loan.valuationVW				v	on	v.security_id	=	sm.security_id and v.CaseReference = l.CBFL_id
			inner join	Val_CTE									v1	on	v1.CaseReference=	l.CBFL_id and v1.date_of_valuation = v.date_of_valuation
	where	l.redeemed_date	is null
		and v.date_of_valuation >= DATEADD(yy,-1,getdate())
	order by l.CBFL_id , v.date_of_valuation desc
end
GO
/****** Object:  StoredProcedure [Report].[CaseContactAddressGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Report].[CaseContactAddressGet]	@sourcefilter varchar(255) , @loanstyle varchar(255)
as begin
	set nocount on 

	if @sourcefilter = 'WebLabs'
		begin
			if @loanstyle='Individual'
				select 
				 @sourcefilter	SourceSystem
				,poc.CaseReference
				,l.completion_date

				,'N/A'
				,c.ContactId
				,c.Title
				,c.FirstName
				,isnull(c.MiddleName,'') MiddleName
				,c.Surname
				,isnull(c.Initials,'') Initials

				,c.Created
				,c.Lastupdate
				,c.LastUpdateBy
				--,aoc.AddressOfContactId
				,aoc.IsPrimary PrimaryAddress
				,a.AddrLn1,a.AddrLn2,a.AddrLn3,a.AddrLn4,a.County,a.PostCode
				,a.IsActive
				from		Dawn_Data.loan.Loan				l
				inner join	Dawn_Data.loan.ParticipantOfCase	poc	on	poc.CaseReference	=	l.CBFL_id
				inner join	Dawn_Data.loan.Contact			c	on	c.ContactId			=	poc.FkContactId
				left  join	Dawn_Data.loan.AddressOfContact	aoc	on	aoc.FkContactId		=	c.ContactId
				left  join	Dawn_Data.loan.[Address]			a	on	a.AddressId			=	aoc.FkAddressId
				where
						poc.fklegalentityid=0
					and	
						poc.CaseReference not like 'm1001%'

				order by
					l.completion_date	desc
					,poc.CaseReference
					,c.Surname

			else --corporate
				select 
				 @sourcefilter	SourceSystem
				,poc.CaseReference
				,l.completion_date

				,le.LegalEntityName
				,c.ContactId
				,c.Title
				,c.FirstName
				,isnull(c.MiddleName,'') MiddleName
				,c.Surname
				,isnull(c.Initials,'') Initials

				,c.Created
				,c.Lastupdate
				,c.LastUpdateBy
				,aoc.IsPrimary PrimaryAddress
				,a.AddrLn1,a.AddrLn2,a.AddrLn3,a.AddrLn4,a.County,a.PostCode
				,a.IsActive
				from		Dawn_Data.loan.Loan					l
				inner join	Dawn_Data.loan.ParticipantOfCase		poc	on	poc.CaseReference	=	l.CBFL_id
				inner join	Dawn_Data.loan.LegalEntity			le	on	le.LegalEntityId	=	poc.FkLegalEntityId
				inner join	Dawn_Data.loan.ContactOfLegalEntity	col	on	col.FkLegalEntityId	=	poc.FkLegalEntityId

				inner join	Dawn_Data.loan.Contact			c	on	c.ContactId				=	col.FkContactId
				left  join	Dawn_Data.loan.AddressOfLegalEntity	aoc	on	aoc.FkLegalEntityId	=	poc.FkLegalEntityId
				left  join	Dawn_Data.loan.[Address]			a	on	a.AddressId				=	aoc.FkAddressId
				where
						poc.fklegalentityid!=0
					and	
						poc.CaseReference not like 'm1001%'

				order by
					l.completion_date	desc
					,poc.CaseReference
					,c.Surname
		end
	else
		begin --dpr
			if @loanstyle='Individual'
				select 
				 @sourcefilter	SourceSystem
				,poc.CaseReference
				,l.completion_date
								,'N/A'
				,c.ContactId
				,c.Title
				,c.FirstName
				,isnull(c.MiddleName,'') MiddleName
				,c.Surname
				,isnull(c.Initials,'') Initials

				,c.Created
				,c.Lastupdate
				,c.LastUpdateBy
				--,aoc.AddressOfContactId
				,aoc.IsPrimary PrimaryAddress
				,a.AddrLn1,a.AddrLn2,a.AddrLn3,a.AddrLn4,a.County,a.PostCode
				,a.IsActive
				from		Dawn_Data.loan.Loan				l
				inner join	Dawn_Data.loan.ParticipantOfCase	poc	on	poc.CaseReference	=	l.CBFL_id
				inner join	Dawn_Data.loan.Contact			c	on	c.ContactId			=	poc.FkContactId
				left  join	Dawn_Data.loan.AddressOfContact	aoc	on	aoc.FkContactId		=	c.ContactId
				left  join	Dawn_Data.loan.[Address]			a	on	a.AddressId			=	aoc.FkAddressId
				where
						poc.fklegalentityid=0
					and	
						poc.CaseReference like 'm1001%'

				order by
					l.completion_date	desc
					,poc.CaseReference
					,c.Surname
			else --corporate
				select 
					 @sourcefilter	SourceSystem
					,poc.CaseReference
					,l.completion_date

					,le.LegalEntityName
					,c.ContactId
					,c.Title
					,c.FirstName
					,isnull(c.MiddleName,'') MiddleName
					,c.Surname
					,isnull(c.Initials,'') Initials

					,c.Created
					,c.Lastupdate
					,c.LastUpdateBy
					,aoc.IsPrimary PrimaryAddress
					,a.AddrLn1,a.AddrLn2,a.AddrLn3,a.AddrLn4,a.County,a.PostCode
					,a.IsActive
					from		Dawn_Data.loan.Loan					l
					inner join	Dawn_Data.loan.ParticipantOfCase		poc	on	poc.CaseReference	=	l.CBFL_id
					inner join	Dawn_Data.loan.LegalEntity			le	on	le.LegalEntityId	=	poc.FkLegalEntityId
					inner join	Dawn_Data.loan.ContactOfLegalEntity	col	on	col.FkLegalEntityId	=	poc.FkLegalEntityId

					inner join	Dawn_Data.loan.Contact			c	on	c.ContactId				=	col.FkContactId
					left  join	Dawn_Data.loan.AddressOfLegalEntity	aoc	on	aoc.FkLegalEntityId	=	poc.FkLegalEntityId
					left  join	Dawn_Data.loan.[Address]			a	on	a.AddressId				=	aoc.FkAddressId
					where
							poc.fklegalentityid!=0
						and	
							poc.CaseReference like 'm1001%'

					order by
						l.completion_date	desc
						,poc.CaseReference
						,c.Surname
		end
end
GO
/****** Object:  StoredProcedure [Report].[CollectionAllNotesGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[CollectionAllNotesGet]	@ReportChoice varchar(64), @includeUpcoming bit,@DayWindow tinyint, @includeArrears bit, @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	declare  @EmptyExitStrategy		varchar(32)
			,@EmptyOwnerCode		varchar(32)
			,@EmptyFunder			varchar(32)
			,@EmptyNote				varchar(32)
			,@CurrentBalIndicator	varchar(16)
			,@IntroducerKey			varchar(32)
			,@dfltCurrBalAsOf		varchar(32)
			,@BorrowerKey			varchar(32)
			,@EmptyTerm				varchar(32)
			,@dfltDateFormat		smallint
			,@FromDate				datetime
			,@NotePropertyId		int

	select	@EmptyExitStrategy		=	'-'
			,@EmptyOwnerCode		=	'-'
			,@EmptyNote				=	'-'
			,@CurrentBalIndicator	=	'c'
			,@IntroducerKey			=	'Introducer'
			,@BorrowerKey			=	'Borrower'
			,@EmptyFunder			=	'-'
			,@dfltCurrBalAsOf		=	''
			,@EmptyTerm				=	'-'
			,@FromDate				=	getdate()
			,@dfltDateFormat		=	106
			,@rc					=	-1
			,@message				=	''

	begin try

		create table #LoanKeys(	 LoanType				varchar(64)
								,LoanId					int
								,Completed				varchar(32)
								,OriginalMaturity		varchar(32)
								,OriginalRedemptionDue	varchar(32)
								,ExpectedRedemptionDue	varchar(32)
								,DaysInArrears			smallint
								,DaysToRedemption		smallint
								,CurrentBalance			money
								,CurrBalAsOf			varchar(32)
								)

		if @ReportChoice='All' or @ReportChoice='SingleAdvance' begin
			insert #LoanKeys 
				exec Report.CollectionSingleAdvance @includeUpcoming, @DayWindow, @includeArrears, @message output, @rc output, @debug
			set @rc=0
		end

		if @message='' and @rc=0 and (@ReportChoice='All' or @ReportChoice='Serviced') begin
			insert #LoanKeys 
				exec Report.CollectionServiced		@includeUpcoming, @DayWindow, @includeArrears, @message output, @rc output, @debug
		end

		--if  @message='' and @rc=0 and (@ReportChoice='All' or @ReportChoice='Hybrid') begin
		--	insert #LoanKeys exec Report.CollectionHybrid @includeUpcoming , @DayWindow , @includeArrears , @message output,@message output,@rc output,@debug
		--end

		/*dud loans*/
		delete #LoanKeys where LoanId in (select fkLoanId from Dawn_Data.[Report].[ExcludedLoans]) 

		if @message!='' goto exitErr

		select	 ln.fkLoanId	LoanId
				,ln.Note
				,case when ln.LastUpdate is not null then ln.LastUpdate else ln.Created end LastUpdate
				,case when ln.LastUpdateBy is not null then ln.LastUpdateBy else ln.CreatedBy end LastUpdatedBy
		from		Dawn_Data.Loan.LoanNote	ln
		inner join	#LoanKeys					l	on l.LoanId = ln.fkLoanId
		inner join Dawn_Data.Reference.[NoteType]	nt	on nt.[NoteTypeID]=ln.fkNoteTypeId
		where nt.[NoteType]='arrears'
		order by ln.fkLoanId , ln.created desc
		select @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
select @message
ExitOk:
end
GO
/****** Object:  StoredProcedure [Report].[CollectionHybrid]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[CollectionHybrid]	@DayWindow tinyint, @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	begin try

		/*Hybrid loans*/
		select 'Hybrid', 0

		select @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Report].[CollectionNoteGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[CollectionNoteGet]	@LoanId int, @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	declare  @EmptyExitStrategy		varchar(32)
			,@EmptyOwnerCode		varchar(32)
			,@EmptyFunder			varchar(32)
			,@EmptyNote				varchar(32)
			,@dfltDateFormat		smallint


	select	 @dfltDateFormat		=	106
			,@rc					=	-1
			,@message				=	''

	begin try

		select n.Note , isnull(n.Lastupdate,n.created) LastUpdate, isnull(n.Lastupdateby,n.createdby) UpdatedBy
		from		[Dawn_Data].Loan.LoanNote			n
		where fkloanId = @LoanId and fkNoteTypeId=2
		order by  isnull(n.Lastupdate,n.created) desc

		set @rc=0

	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
select @message
ExitOk:
end
GO
/****** Object:  StoredProcedure [Report].[Collections]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[Collections]	@ReportChoice varchar(64), @includeUpcoming bit,@DayWindow tinyint, @includeArrears bit, @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	declare  @EmptyExitStrategy		varchar(32)
			,@EmptyOwnerCode		varchar(32)
			,@EmptyFunder			varchar(32)
			,@EmptyNote				varchar(32)
			,@EmptyRedemptionStatus VarChar(32)
			,@CurrentBalIndicator	varchar(16)
			,@IntroducerKey			varchar(32)
			,@dfltCurrBalAsOf		varchar(32)
			,@BorrowerKey			varchar(32)
			,@EmptyTerm				varchar(32)
			,@dfltDateFormat		smallint
			,@FromDate				datetime
			,@NotePropertyId		int
			,@NoteType				tinyint
			,@DaysNotesUpdated		tinyint
			

	select	@EmptyExitStrategy		=	'-'
			,@EmptyOwnerCode		=	'-'
			,@EmptyNote				=	'-'
			,@EmptyRedemptionStatus =   '-'
			,@CurrentBalIndicator	=	'c'
			,@IntroducerKey			=	'Introducer'
			,@BorrowerKey			=	'Borrower'
			,@EmptyFunder			=	'-'
			,@dfltCurrBalAsOf		=	''
			,@EmptyTerm				=	'-'
			,@FromDate				=	getdate()
			,@dfltDateFormat		=	106
			,@rc					=	-1
			,@message				=	''
			,@NoteType				=	2
			,@DaysNotesUpdated		=	14

	begin try

		create table #LoanKeys(	 LoanType				varchar(64)
								,LoanId					int
								,Completed				varchar(32)
								,OriginalMaturity		varchar(32)
								,OriginalRedemptionDue	varchar(32)
								,ExpectedRedemptionDue	varchar(32)
								,DaysInArrears			smallint
								,DaysToRedemption		smallint
								,CurrentBalance			money
								,CurrBalAsOf			varchar(32)
								)

		if @ReportChoice='All' or @ReportChoice='SingleAdvance' begin
			insert #LoanKeys 
				exec Report.CollectionSingleAdvance @includeUpcoming, @DayWindow, @includeArrears, @message output, @rc output, @debug
			set @rc=0
		end

		if @message='' and @rc=0 and (@ReportChoice='All' or @ReportChoice='Serviced') begin
			insert #LoanKeys 
				exec Report.CollectionServiced		@includeUpcoming, @DayWindow, @includeArrears, @message output, @rc output, @debug
		end

		--if  @message='' and @rc=0 and (@ReportChoice='All' or @ReportChoice='Hybrid') begin
		--	insert #LoanKeys exec Report.CollectionHybrid @includeUpcoming , @DayWindow , @includeArrears , @message output,@message output,@rc output,@debug
		--end

		/*dud loans*/
		delete #LoanKeys where LoanId in (select fkLoanId from Dawn_Data.[Report].[ExcludedLoans]) 
							or DaysToRedemption > @DayWindow

--select * from Dawn_Data.Loan.Loan where CBFL_id='MCROBBIE491/03/2013'
--select * from	[Dawn_Data].Loan.[LoanNote] where fkLoanId=282

		select	distinct fkLoanId
		into	#LastUpdated
--select *
		from	[Dawn_Data].Loan.[LoanNote]
		where	datediff(dd,isnull(Lastupdate,created),getdate())<=@DaysNotesUpdated and fkNoteTypeId=@NoteType

		if @message!='' goto exitErr

		select	distinct
		/*Keys*/		
				 ll.LoanType
				,ll.LoanId																	as	LoanId
				,l.CBFL_id																	as	CaseReference
				,case when u.fkloanid is not null then 'Y' else 'N' end						as	updatedInLast2Weeks

				,'LightGreen'																as	CompanyFlagColour /*all green till we can use prod*/
--PJR 6.12.15
				,case when isnull(h.ProductTypeID,0)=4 then	1 else 0 end					as	IsRegulated	
				,case when isnull(h.ProductTypeID,0)=4 then 'Purple' else 'Orange' end		as	IsRegulatedColour

		/*Funding*/
				,isnull(Report.fn_getFunderList(l.loan_id),@EmptyFunder)					as	Funder
				
				,isnull(a.[fkOwnerId],0)		as	OwnerId

				,isnull(
							(
								select ol.[Owner] from Dawn_Data.[Loan].[LoanOwner] ol
									where ISNULL(a.[fkOwnerId], 0) = ol.[LoanOwnerId]
							)
						
							,@EmptyOwnerCode
						)																	as [Owner]

				,case when isnull(i.LegalEntityName,'')='' then 'Unknown' else 
						case when isnull(pt.ParticipantType,'') = @IntroducerKey 
								then Report.fn_getLegalEntityAbbreviation(i.LegalEntityName,' ') 
								else 'Unknown' 
						end
				 end																		as	Introducer

		/*Dates*/
				,isnull(h.producttermcombination,'')										as	Term

				,ll.Completed																as	CompletionDate

				,ll.OriginalMaturity														as	Maturity	/*just for the order by clause*/
				
				,ll.OriginalRedemptionDue													as	OrgDue

				,ll.DaysToRedemption														as	DaysToRedemption

				,ll.DaysInArrears															as	DaysInArrears
				,case
					when abs(ll.DaysInArrears) > 60					then 'Red'
					when abs(ll.DaysInArrears) between 30 and 60 	then 'Amber'
																	else 'Green'
				end																			as	ArrearsStatusColour
			
		/*Financials*/
				,convert(money,isnull(l.loan_amount,0.00))									as	NetLoan
				,convert(money,isnull(l.gross_loan,0.00))									as	GrossLoan

				,convert(money,isnull(ll.CurrentBalance,0.00))								as	CurrBalance

				,ll.CurrBalAsOf																as	BalanceAsOf

				,isnull(a.fkPlannedExitStrategyId,0)										as	ExitStrategyId

				,isnull(	(select ol.[ExitStrategy] from Dawn_Data.[Loan].[ExitStrategy] ol
								where a.[fkPlannedExitStrategyId] = ol.ExitStrategyId) 
								,@EmptyOwnerCode
						)																	as ExitStrategy
				,isnull((select lrs.Description from Dawn_Data.Reference.LoanRedemptionStatus lrs
							where isnull(a.fkLoanRedemptionStatusId, 0) = lrs.LoanRedemptionStatusId AND lrs.DisplayOnCollectionsReport = 1), @EmptyRedemptionStatus) As RedemptionStatus
				,convert(money,Report.fn_getMarketValue(l.CBFL_id))							as	MarketValue		/*this should use loan pk*/
				,convert(money,Report.fn_getValuation90DayValue(l.CBFL_id))					as	NinetyDayValue	/*this should use loan pk*/
				,convert(money,Report.fn_getHeadRoom(l.CBFL_id))							as	HeadRoom		/*this should use loan pk*/

	/*Address of sec*/
				,Report.fn_getPrimaryAddress(l.loan_id)										as	PrimaryAddress

		from		#LoanKeys							ll
		inner join	Dawn_Data.Loan.Loan				l	on	l.Loan_Id	=	ll.LoanId
		left join	Dawn_Data.Loan.History			h	on	h.DIM_loan_id_SSK	=	l.loan_id

		left join	(select ptp.ParticipantType,p.FkLoanId,p.FkLegalEntityId
						from		Dawn_Data.Loan.ParticipantOfCase	p	
						left join	Dawn_Data.loan.ParticipantType	ptp	on	ptp.ParticipantId	=	p.FKParticipantTypeId
						where isnull(ptp.ParticipantType,'') in ('introducer','')
						
					) pt on pt.FkLoanId			=	l.loan_id

		left join	Dawn_Data.[Loan].[FunderOfLoan]	fl	on	fl.fkLoanId			=	l.loan_id
		left join	Dawn_Data.Loan.LegalEntity		i	on	i.LegalEntityId		=	pt.FkLegalEntityId
		left join	Dawn_Data.Loan.LoanAux			a   on  l.loan_id			=   a.fkLoanId
		left join	#LastUpdated						u	on	u.fkLoanId			=	l.loan_id

		--where DaysInArrears + DaysToRedemption >0 --if 0 & 0 then it's upcoming today!
				
		order by DaysInArrears desc , DaysToRedemption

		select @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
select @message
ExitOk:
end
GO
/****** Object:  StoredProcedure [Report].[CollectionServiced]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[CollectionServiced]	@includeUpcoming bit,@DayWindow tinyint, @includeArrears bit, @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	begin try
		declare		 @dfltDateFormat		smallint
					,@CurrentRowIndicator	varchar(16)
					,@CurrentDate			datetime
		select		 @dfltDateFormat		=106
					,@CurrentRowIndicator	='c'
					,@CurrentDate			= getdate()
		
		create table #results(	LoanType				varchar(128)
								,LoanId					int 
								,Completed				varchar(32)
								,OriginalMaturity		varchar(32)
								,OriginalRedemptionDue	varchar(32)
								,ExpectedRedemptionDue	varchar(32)
								,DaysInArrears			smallint
								,DaysToRedemption		int
								,CurrentBalance			money
								,CurrBalAsOf			varchar(32)
							)
		
		select CashFlowType_id	into	#CashFlowType	from Dawn_Data.[LoanCalc].[CashflowType]		where	CashflowType		in	('serviced')
		select Transaction_id	into	#TransType		from Dawn_Data.[LoanCalc].[TransactionType]	where	Transaction_Type	in	('Service Interest payment')

		/*arrears
		*/
		if @includeArrears=1
			insert #results(LoanType,LoanId,Completed,OriginalMaturity,OriginalRedemptionDue,ExpectedRedemptionDue,DaysInArrears,DaysToRedemption,CurrentBalance,CurrBalAsOf)
			select distinct	'Serviced'																LoanType
							,l.loan_id																LoanId
							,isnull(convert(varchar,h.completion_date,@dfltDateFormat),'')			Completed
							--,isnull(convert(varchar,h.maturity_date,@dfltDateFormat),'')			OriginalMaturity
							,convert(varchar,dateadd(dd,-1,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(h.producttermcombination,'+')),h.completion_date)),@dfltDateFormat) OriginalMaturity

							,isnull(convert(varchar,h.redeemed_date,@dfltDateFormat),'')			OriginalRedemptionDue
							,isnull(convert(varchar,h.StartDate,@dfltDateFormat),'')				ExpectedRedemptionDue
							
							,case
									when /*no of pmts expected > no of pmts recvd*/
									(
										/*no pmts recvd*/
										(select count(*)
										from Dawn_Data.[LoanCalc].[Transaction]	t
										inner join #TransType tt on tt.transaction_id = t.transaction_type	
										where   loan_id=l.loan_id and	transaction_date <= @CurrentDate
										)
										<
										/*no of pmts reqd*/
										(select isnull(count(*),0) from	Dawn_Data.[LoanCalc].[CashflowInterest]	i
										inner join	#CashFlowType	c	on c.CashFlowType_id = i.cashflowInterest_type
										where   loan_id=l.loan_id and	cashflowInterest_date < =@CurrentDate
										)
									)
									then	
										/*today-lastdue*/
										datediff(dd
												,(select max(cashflowInterest_date)
													from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
													inner join	#CashFlowType								c
														on c.CashFlowType_id = i.cashflowInterest_type
													where   loan_id=l.loan_id and cashflowInterest_date <= @CurrentDate)
												,@CurrentDate
												)

									when /*no of pmts expected = no of pmts recvd and redemptiondue in past*/
									(
										/*no pmts recvd*/
										(select count(*)
										from Dawn_Data.[LoanCalc].[Transaction]	t
										inner join #TransType tt on tt.transaction_id = t.transaction_type	
										where   loan_id=l.loan_id and	transaction_date <= @CurrentDate
										)
										=
										/*no of pmts reqd*/
										(select isnull(count(*),0) from	Dawn_Data.[LoanCalc].[CashflowInterest]	i
										inner join	#CashFlowType	c	on c.CashFlowType_id = i.cashflowInterest_type
										where   loan_id=l.loan_id and	cashflowInterest_date < =@CurrentDate
										)
										and
										h.redemption_date < @CurrentDate
									)
									then	
										/*today-lastdue*/
										datediff(dd
												,(select max(cashflowInterest_date)
													from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
													inner join	#CashFlowType								c
														on c.CashFlowType_id = i.cashflowInterest_type
													where   loan_id=l.loan_id and cashflowInterest_date <= @CurrentDate)
												,@CurrentDate
												)
									else 
										/*up to date,  but not redeemed*/
											abs(
												datediff(
														 dd
														,@CurrentDate
														,dateadd(mm,(select sum(convert(int,value)) from Dawn_Data_v100.dbo.fn_Split(h.producttermcombination,'+')),h.completion_date)
														)
												)+1
									end																DaysInArrears

							,0																		DaysToRedemption
							,h.loan_balance															CurrentBalance

							,convert(varchar,h.DateCalculated,@dfltDateFormat)						CurrBalAsOf

			from		Dawn_Data.Loan.Loan						l
			left join	Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.loan_id
			left join	Dawn_Data.[LoanCalc].[CashflowInterest]	cf	on	cf.loan_id			=	l.loan_id 
			left join	#CashFlowType								ct	on	ct.CashFlowType_id	=	cf.cashflowInterest_type

			where	cf.loan_id is not null
				and h.SCDStatus	=	@CurrentRowIndicator
				and	l.redeemed_date	is null
				and cf.cashflowInterest_date is not null
				
				and dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(h.producttermcombination,'+')),h.completion_date) <= @CurrentDate

				and (datediff(dd
								,@CurrentDate
								,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(h.producttermcombination,'+')),h.completion_date)
								)
						)
				<=0
			--and l.loan_id=1081

		/*upcoming
		*/
		if @includeUpcoming=1
			insert #results(LoanType,LoanId,Completed,OriginalMaturity,OriginalRedemptionDue,ExpectedRedemptionDue,DaysInArrears,CurrentBalance,CurrBalAsOf,DaysToRedemption)
			select distinct	'Serviced'																LoanType
							,l.loan_id																LoanId

							,isnull(convert(varchar,h.completion_date,@dfltDateFormat),'')			Completed
							--,isnull(convert(varchar,h.maturity_date,@dfltDateFormat),'')			OriginalMaturity
							,convert(varchar,dateadd(dd,-1,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(h.producttermcombination,'+')),h.completion_date)),@dfltDateFormat) OriginalMaturity

							,isnull(convert(varchar,h.redeemed_date,@dfltDateFormat),'')			OriginalRedemptionDue
							,isnull(convert(varchar,h.StartDate,@dfltDateFormat),'')				ExpectedRedemptionDue

							,0																		DaysInArrears
							,h.loan_balance															CurrentBalance
							,convert(varchar,h.DateCalculated,@dfltDateFormat)						CurrBalAsOf

							,abs( datediff(
										 dd
										,@CurrentDate
										,dateadd(mm,(select sum(convert(int,value)) from Dawn_Data_v100.dbo.fn_Split(h.producttermcombination,'+')),h.completion_date)
										)
							)-1																DaysToRedemption

			from		Dawn_Data.Loan.Loan						l
			left join	Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.loan_id
			left join	Dawn_Data.[LoanCalc].[CashflowInterest]	cf	on	cf.loan_id			=	l.loan_id 
			left join	#CashFlowType								ct	on	ct.CashFlowType_id	=	cf.cashflowInterest_type

			where	cf.loan_id					is not null
				and h.SCDStatus					=	@CurrentRowIndicator
				and l.redeemed_date				is null
				and cf.cashflowInterest_date	is not null

				and (datediff(dd
							 ,@CurrentDate
							 ,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(h.producttermcombination,'+')),h.completion_date)
							 )
					)
					>0
				and	abs(datediff(dd
							 ,@CurrentDate
							 ,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(h.producttermcombination,'+')),h.completion_date)
							 )) <5000

			delete #results where DaysToRedemption > 0 and DaysToRedemption > @DayWindow

			select * from #results

		set @rc=0

	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')

		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end

GO
/****** Object:  StoredProcedure [Report].[CollectionSingleAdvance]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[CollectionSingleAdvance]	@includeUpcoming bit , @DayWindow tinyint , @includeArrears bit ,  @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	begin try

		declare		 @dfltDateFormat		smallint
					,@CurrentRowIndicator	varchar(16)

		select		 @dfltDateFormat		=106
					,@CurrentRowIndicator	='c'

		select CashFlowType_id	into	#CashFlowType	from Dawn_Data.[LoanCalc].[CashflowType]		where	CashflowType		in	('retained')
		select Transaction_id	into	#TransType		from Dawn_Data.[LoanCalc].[TransactionType]	where	Transaction_Type	in	('Interest')

		create table #results(	LoanType				varchar(128)
						,LoanId					int 
						,Completed				varchar(32)
						,OriginalMaturity		varchar(32)
						,OriginalRedemptionDue	varchar(32)
						,ExpectedRedemptionDue	varchar(32)
						,DaysInArrears			smallint
						,DaysToRedemption		smallint
						,CurrentBalance			money
						,CurrBalAsOf			varchar(32)
					)

		if @includeArrears=1
			insert #results(LoanType,LoanId,Completed,OriginalMaturity,OriginalRedemptionDue,ExpectedRedemptionDue,DaysInArrears,DaysToRedemption,CurrentBalance,CurrBalAsOf)
			select distinct  'SingleAdvance'														LoanType
							--,l.CBFL_id
							,l.loan_id																LoanId
							,isnull(convert(varchar,h.completion_date,@dfltDateFormat),'')			Completed
							,isnull(convert(varchar,l.maturity_date,@dfltDateFormat),'')			OriginalMaturity
							,isnull(convert(varchar,l.redeemed_date,@dfltDateFormat),'')			OriginalRedemptionDue
							,isnull(convert(varchar,h.StartDate,@dfltDateFormat),'')				ExpectedRedemptionDue

							,case 
								when h.StartDate is null
									then isnull((datediff(dd,l.maturity_date,getdate())),0) 

								else isnull((datediff(dd,h.StartDate,getdate())),0)
							 end																	DaysInArrears

							,0																		DaysToRedemption
							,h.loan_balance															CurrentBalance
							,isnull(convert(varchar,h.DateCalculated,@dfltDateFormat),'')			CurrBalAsOf
			from		Dawn_Data.Loan.Loan						l
			left join	Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.loan_id
			left join	Dawn_Data.[LoanCalc].[CashflowInterest]	cf	on cf.loan_id			=	l.loan_id
			where	h.SCDStatus	=	@CurrentRowIndicator
				and	h.maturity_date < getdate()
				and	l.redeemed_date	is null
				and l.cbfl_id not like 'zz%'
				and cf.loan_id is null
				and h.StartDate<getdate()

		if @includeUpcoming=1
			insert #results(LoanType,LoanId,Completed,OriginalMaturity,OriginalRedemptionDue,ExpectedRedemptionDue,DaysInArrears,DaysToRedemption,CurrentBalance,CurrBalAsOf)
			select distinct  'SingleAdvance'														LoanType
							--,l.CBFL_id
							,l.loan_id																LoanId
							,isnull(convert(varchar,h.completion_date,@dfltDateFormat),'')			Completed
							,isnull(convert(varchar,l.maturity_date,@dfltDateFormat),'')			OriginalMaturity
							,isnull(convert(varchar,l.redeemed_date,@dfltDateFormat),'')			OriginalRedemptionDue
							,isnull(convert(varchar,h.StartDate,@dfltDateFormat),'')				ExpectedRedemptionDue
							,0																		DaysInArrears
							,abs(datediff(dd,h.StartDate,getdate()))								DaysToRedemption
							,h.loan_balance															CurrentBalance
							,convert(varchar,h.DateCalculated,@dfltDateFormat)						CurrBalAsOf

			from		Dawn_Data.Loan.Loan						l
			left join	Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.loan_id
			where	h.SCDStatus	=	@CurrentRowIndicator
				and	h.maturity_date > getdate()
				and	l.redeemed_date	is null
				and l.cbfl_id not like 'zz%'
				and abs(datediff(dd,getdate(),l.maturity_date)) <= @DayWindow
				/*ignore retained that is serviced*/
				and l.loan_id not in (
										select loan_id
										from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
										where   loan_id=l.loan_id
									)

		select * from #results

		set @rc=0

	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Report].[CollectionStats]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[CollectionStats]	@StatsDayOfWeek varchar(16) , @message varchar(255) output, @rc int output, @debug int
	as begin
		set nocount on
		set @rc=-1
		begin try

			/*create the periods*/
			create table #StatsPeriod(id int identity,StatsDay datetime,PrevWeekStatsDay datetime)

			insert #StatsPeriod(StatsDay)
				select StatsDay = DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), n.num) 
					from (select top 366 num = ROW_NUMBER() over(order by a.NAME)-1 from dbo.syscolumns a, dbo.syscolumns b) n
				where datename(weekday, dateadd(yy, datediff(yy, 0, getdate()), n.num)) = @StatsDayOfWeek

			delete #StatsPeriod where StatsDay>getdate() or StatsDay<dateadd(dd,-56,getdate())

			update #StatsPeriod set PrevWeekStatsDay=dateadd(dd,-6,StatsDay)

--select * from #StatsPeriod

			/*get the data*/
			select '>60'	TrafficLight, convert(varchar,sp.StatsDay,106)	asOfDay ,  convert(money,sum(l.gross_loan)) SumOfCurrBalanceValues
				into #StatsList
			from Dawn_Data.Loan.Loan l, #StatsPeriod sp
				where l.Maturity_Date between  '1 Jan 1900' and sp.StatsDay and datediff(dd,l.Maturity_Date,getdate())>60
				and l.Redeemed_Date is null
			group by sp.StatsDay

				union

			select '30-59'	TrafficLight, convert(varchar,sp.StatsDay,106)	asOfDay ,   convert(money,sum(l.gross_loan))
			from Dawn_Data.Loan.Loan l, #StatsPeriod sp
				where l.Maturity_Date 
						between sp.PrevWeekStatsDay and sp.StatsDay 
					and datediff(dd,l.Maturity_Date,getdate())	between 30 and 60
			group by sp.StatsDay

				union

			select '1-29'	TrafficLight, convert(varchar,sp.StatsDay,106)	asOfDay ,   convert(money,sum(l.gross_loan))
			from Dawn_Data.Loan.Loan l, #StatsPeriod sp
				where l.Maturity_Date 
						between sp.PrevWeekStatsDay and sp.StatsDay and datediff(dd,l.Maturity_Date,getdate())<30
			group by sp.StatsDay

			/*build output crosstab*/
			declare @StatsOutput table ( DisplayOrder int identity
                            ,TrafficLight varchar(32) null  
                            ,dataValue1 varchar(32) null default '',dataValue2 varchar(32) null default '',dataValue3 varchar(32) null default '',dataValue4 varchar(32) null default ''
                            ,dataValue5 varchar(32) null default '',dataValue6 varchar(32) null default '',dataValue7 varchar(32) null default '',dataValue8 varchar(32) null default ''
                            )

			declare @Header varchar(32), @i int, @j int , @minDate datetime , @thisColour varchar(32),@cellValue varchar(32)

			set    @Header='Header' 
			insert @StatsOutput (TrafficLight) select    @Header
			insert @StatsOutput (TrafficLight) select    '>60'
			insert @StatsOutput (TrafficLight) select    '30-59'
			insert @StatsOutput (TrafficLight) select    '1-29'

			select distinct asOfDay into #Dates from #StatsList

--select * from  Dawn_Data.Loan.Loan

			/*insert dummy date if missing - we need *8* dates*/
			insert #Dates (asOfDay) select distinct r.StatsDay from #StatsList s right join #StatsPeriod r	on s.asOfDay = r.StatsDay where s.asofday is null
--select * from @StatsOutput
			/*generate the report.*/
			select	@minDate=max(convert(datetime,asOfDay)) , @j=1	from #Dates
			while @minDate is not null begin
				select @i=min(DisplayOrder) from @StatsOutput
				while @i is not null begin
					select @thisColour = TrafficLight from @StatsOutput where DisplayOrder = @i

					select @cellValue=case when @thisColour=@Header then (select convert(varchar,@minDate,106))
						else (select '£'+convert(varchar,SumOfCurrBalanceValues,1) from #StatsList where asOfDay = @minDate and TrafficLight = @thisColour) end
--select @cellValue
					update @StatsOutput 
							set      dataValue1    = case when @j=1 then @cellValue else dataValue1 end
									,dataValue2    = case when @j=2 then @cellValue else dataValue2 end
									,dataValue3    = case when @j=3 then @cellValue else dataValue3 end
									,dataValue4    = case when @j=4 then @cellValue else dataValue4 end
									,dataValue5    = case when @j=5 then @cellValue else dataValue5 end
									,dataValue6    = case when @j=6 then @cellValue else dataValue6 end
									,dataValue7    = case when @j=7 then @cellValue else dataValue7 end
									,dataValue8    = case when @j=8 then @cellValue else dataValue8 end
					where TrafficLight=@thisColour

					select @i=min(DisplayOrder) from @StatsOutput where DisplayOrder>@i
				end
				select @minDate=max(convert(datetime,asOfDay)), @i=1 , @j = @j+1  from #Dates where asOfDay<@minDate
			end

			/*produce the report*/
			select	 TrafficLight
					,isnull(dataValue1,'')	DataValue1,isnull(dataValue2,'')	DataValue2,isnull(dataValue3,'')	DataValue3,isnull(dataValue4,'')	DataValue4
					,isnull(dataValue5,'')	DataValue5,isnull(dataValue6,'')	DataValue6,isnull(dataValue7,'')	DataValue7,isnull(dataValue8,'')	DataValue8
			from @StatsOutput
			order by DisplayOrder

			set @rc=0
	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk
ExitErr:
ExitOk:
end
GO
/****** Object:  StoredProcedure [Report].[CompletedFundRequest]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc  [Report].[CompletedFundRequest]	@RequestType varchar(255)
as begin
		set nocount on

		select 
			l.loan_id																								as	LoanId
			,l.CBFL_id																								as	CaseReference
			,ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId)										as	ContactRowNumber
			,ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id)									as	SecurityRowNumber
			,COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '')				as	PrimaryContactName
			,isnull(s.address_1,'') + case when isnull(s.address_2,'') <>'' then ',' else '' end +
				isnull(s.address_2,'') + case when isnull(s.address_3,'') <>'' then ',' else '' end +
				isnull(s.address_3,'') + case when isnull(s.address_4,'') <>'' then ',' else '' end +
				isnull(s.address_4,'') + case when isnull(s.County,'') <>'' then ',' else '' end +
				isnull(s.post_code,'')																				as	[Address]
			,lc.FKParticipantTypeId
			,(select value from dbo.fn_split(l.Productnames,' ') where idx=0)										as	ProductCode
			,(select count(*) from  Dawn_Data.Loan.FundRequest where FkLoanId = l.loan_id AND FundsReleased=0 AND isnull(FkFundRequestStatusId,0)!=3)	as	CurrentDrawDowns
			,h.checked																								as	Checked
			,fs.[Description]																						as	CurrentRequestStatus
			,ws.StationDescription																					as	[Role]
			,f.Amount																								as	Amount
			,f.[FundReleaseDate]

		into #TempLoanDetails
		from		Dawn_Data.Loan.Loan						l
		inner join  Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.Loan_ID
		inner join	Dawn_Data.Loan.fundRequest				f	on	f.fkLoanId		=	l.Loan_Id
		inner join	Dawn_Data.Reference.fundRequestStatus	fs	on	fs.FundRequestStatusId		=	f.fkStatusId--FundRequestStatusId
		inner join	Dawn_Data.WorkFlow.Station				ws	on	ws.StationId		=	f.fkCurrentWorkstationId
		left join	Dawn_Data.Loan.ParticipantOfCase			lc	on	l.loan_id		=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
		left join	Dawn_Data.Loan.Contact					c	on	lc.FkContactId	=	c.ContactId
		left join	Dawn_Data.Loan.SecurityMap				sm	on	l.loan_id		=	sm.loan_id
		left join	Dawn_Data.Loan.[Security]				s	on	sm.security_id	=	s.security_id
		where lc.fkcontactid<>0 
		and f.FundsReleased=1
			
--select * from Dawn_Data.Reference.fundRequestStatus
--select * from Dawn_Data.WorkFlow.Station						
		union

		select 
			l.loan_id																								as	LoanId
			,l.CBFL_id																								as	CaseReference
			,ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId)										as	ContactRowNumber
			,ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id)									as	SecurityRowNumber
			,COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '')				as	PrimaryContactName
			,isnull(s.address_1,'') + case when isnull(s.address_2,'') <>'' then ',' else '' end +
				isnull(s.address_2,'') + case when isnull(s.address_3,'') <>'' then ',' else '' end +
				isnull(s.address_3,'') + case when isnull(s.address_4,'') <>'' then ',' else '' end +
				isnull(s.address_4,'') + case when isnull(s.County,'') <>'' then ',' else '' end +
				isnull(s.post_code,'')																				as	[Address]
			,lc.FKParticipantTypeId
			,(select value from dbo.fn_split(l.Productnames,' ') where idx=0)										as	ProductCode
			,(select count(*) from  Dawn_Data.Loan.FundRequest where FkLoanId = l.loan_id AND FundsReleased=0 AND isnull(FkFundRequestStatusId,0)!=3)	as	CurrentDrawDowns
			,h.checked
			,fs.[Description]																						as	CurrentRequestStatus
			,ws.StationDescription																					as	[Role]
			,f.Amount																								as	Amount
			,f.[FundReleaseDate]

		from		Dawn_Data.Loan.Loan l
		inner join  Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.Loan_ID
		inner join	Dawn_Data.Loan.fundRequest				f	on	f.fkLoanId			=	l.Loan_Id
		inner join	Dawn_Data.Reference.fundRequestStatus	fs	on	fs.FundRequestStatusId		=	f.fkStatusId--f.fkFundRequestStatusId
		inner join	Dawn_Data.WorkFlow.Station				ws	on	ws.StationId		=	f.fkCurrentWorkstationId
		left join	Dawn_Data.Loan.ParticipantOfCase			lc	ON	l.loan_id = lc.FkLoanId AND lc.FKParticipantTypeId = 1
		left join	Dawn_Data.[Loan].[ContactOfLegalEntity]	cl	on	cl.fkLegalEntityId	=	lc.fkLegalEntityId
		left join	Dawn_Data.Loan.Contact					c	ON	c.ContactId			=	cl.FkContactId
		left join	Dawn_Data.Loan.SecurityMap				sm	ON	sm.loan_id			=	l.loan_id
		left join	Dawn_Data.Loan.Security					s	ON	s.security_id		=	sm.security_id
		WHERE lc.fkcontactid=0 
		and f.FundsReleased=1
		
	delete #TempLoanDetails where ContactRowNumber != 1 and SecurityRowNumber != 1

	select	 LoanId
			,CaseReference
			,'Drawdown' as TransactionType
			,Amount
			,[FundReleaseDate]
			,CurrentRequestStatus
	from	#TempLoanDetails
	order by
		CaseReference
end
GO
/****** Object:  StoredProcedure [Report].[CompletedLoans]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Report].[CompletedLoans]
	@ReportDate DateTime
AS

BEGIN

	SET NOCOUNT ON

	declare		 @dfltDateFormat		smallint
	select		 @dfltDateFormat		=106

	SELECT 
		loan_id As LoanId, 
		l.CBFL_id As CaseReference, 
		--l.completion_date As CompletionDate, 
		ISNULL(h.completion_date,l.completion_date) As CompletionDate, 
		--ISNULL(h.maturity_date, l.maturity_date),
		--convert(varchar,
		isnull(dateadd(dd,-1,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_v100.dbo.fn_Split(h.producttermcombination,'+')),h.completion_date)), l.maturity_date)
		--,@dfltDateFormat) 
		As MaturityDate,

		l.loan_amount As NetLoan,
		l.gross_loan As GrossLoan,
		ISNULL(h.checked, 0) As Entered
	FROM Dawn_Data.Loan.Loan l
	LEFT OUTER JOIN Dawn_Data.Loan.History h ON l.loan_id = h.DIM_loan_id_SSK
	WHERE ISNULL(h.completion_date,l.completion_date) >= @ReportDate
	and l.LoanStatus<>'Case Closed'
	ORDER BY l.completion_date

END


GO
/****** Object:  StoredProcedure [Report].[disused_PipelineValuations]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Report].[disused_PipelineValuations] as begin
	
	set nocount on
	set dateformat dmy;
	select  [CaseReference]
			  ,[ValuationStatus]
			  ,[SecurityAddress]
			  ,[Surveyor]
			  ,[ValuationDate]
			  ,convert(money,[Valuation]) Valuation
			  ,convert(money,[90DayValuation]) [90DayValuation]
			  ,convert(money,[RentalValue]) [RentalValue]
			  ,convert(money,[ReinstatementValue]) [ReinstatementValue]
			  ,convert(money,[ValueAfterWorks]) [ValueAfterWorks]
			  ,convert(money,[90DayValueAfterWorks]) [90DayValueAfterWorks]
	from Dawn_Data_Staging.WebLabs.Valuation

	union

	select	 s.CaseReference
			,s.Valuationstatus
			,s.Securityaddress
			,s.Surveyor
			,convert(datetime,s.ValuationDate,103)
			,s.Valuation
			,s.[90dayValuation]
			,s.RentalValue
			,s.ReinstatementValue
			,s.ValueAfterWorks
			,s.[90DayValueAfterWorks]
			--,s.PostCode
	from		Dawn_Data_staging.DPR_DW.ExportValuation			s
	left join	Dawn_Data.Loan.Valuation		t
		on	s.CaseReference								=	t.CaseReference
		and	s.SecurityAddress							=	t.SecurityAddress
		and	convert(datetime,s.ValuationDate,103)		=	t.date_of_valuation

	where	s.CaseReference		is not null			and	s.SecurityAddress	is not null				and	s.ValuationDate		is not null
		and	t.CaseReference		is null				and	t.SecurityAddress	is null					and	t.date_of_valuation	is null
		AND s.CaseReference	 NOT IN (select ApplicationRef from Dawn_Data_staging.[DPR_DW].[UnusedCaseReference])

end



GO
/****** Object:  StoredProcedure [Report].[disused_UWPipeline]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Report].[disused_UWPipeline] as begin
	
	set nocount on
	set dateformat dmy;

	select distinct
	   [PrimaryBorrower]
      ,[WeblabsLoanID]
      --,[EnquiryDate]
      ,[CaseReference]
      ,convert(money,[LoanAmount])			[LoanAmount]
      ,convert(money,[LoanAdjustment])		[LoanAdjustment]
      ,convert(money,[LoanBalance])			[LoanBalance]

	  ,case when isdate(CompletionDate)=1 
			then	case when convert(datetime,CompletionDate)='31 dec 9999'
							or convert(datetime,CompletionDate)='1 jan 1900' 
						then ''
					when CompletionDate is null
						then ''
					else
						convert(varchar,CompletionDate,103)
				end
			else	''
		end									CompletionDate

      ,case when isdate([MaturityDate])=1 
			then	case	when convert(datetime,[MaturityDate])='31 dec 9999' 
							or convert(datetime,[MaturityDate])='1 jan 1900' 
								then ''
							when [MaturityDate] is null
								then ''
							else
								convert(varchar,[MaturityDate],103)
					end
			else 	''
		end									[MaturityDate]

      ,case when isdate([RedeemedDate])=1 
			then	case	when convert(datetime,[RedeemedDate])='31 dec 9999' 
							or convert(datetime,[RedeemedDate])='1 jan 1900' 
							then ''
						when [RedeemedDate] is null
							then ''
						else
							convert(varchar,[RedeemedDate],103)
					end
			else 	''
		end									[RedeemedDate]

      ,convert(money,[GrossLoan])			[GrossLoan]
      ,convert(money,[ArrangementFeeIn])	[ArrangementFeeIn]
      ,convert(money,[ArrangementFeeOut])	[ArrangementFeeOut]
      ,convert(money,[BrokerFeeInPct])		[BrokerFeeInPct]
      ,convert(money,[BrokerFeeOutPct])		[BrokerFeeOutPct]
      ,convert(money,[BrokerFlatFee])		[BrokerFlatFee]
      ,[Status]
		,case when isdate([FacilityDate])=1 
		then
			case when convert(datetime,[FacilityDate])='31 dec 9999'
						or convert(datetime,[FacilityDate])='1 jan 1900' 
					then convert(varchar,'',103)

				when [FacilityDate] is null
					then convert(varchar,'',103)

				else
					right('00'+convert(varchar,datepart(dd,[FacilityDate])),2) + '/' +
					right('00'+convert(varchar,datepart(mm,[FacilityDate])),2) + '/' +
					convert(varchar,datepart(yyyy,[FacilityDate]))
			end
		else	''
		end [FacilityDate]
      ,[Introducer]
      ,[CBFLSolicitor]
      ,convert(money,[Term])				[Term]
      ,convert(money,[InterestRate])		[InterestRate]
      ,convert(money,[BrokerInterestRate])	[BrokerInterestRate]
      ,convert(money,[TotalMonthlyInterestRate]) [TotalMonthlyInterestRate]
      ,convert(money,[InterestAmount])		[InterestAmount]
      ,convert(money,[InterestAdjustments])	[InterestAdjustments]
      ,convert(money,[InterestBalance])		[InterestBalance]
      ,[ProductCode]
      ,[2ndChargeLender]
      ,convert(money,[1stChargeOutstanding])	[1stChargeOutstanding]
      ,convert(money,[1stChargeValuation])	[1stChargeValuation]
      ,convert(money,[2ndChargeValuation])	[2ndChargeValuation]
      ,convert(money,[TotalValuation])		[TotalValuation]
      ,[ValuationBasis]
      ,[Valuer]
	  ,case when isdate([ValuationDate])=1 
		then
			case when convert(datetime,[ValuationDate])='31 dec 9999'
						or convert(datetime,[ValuationDate])='1 jan 1900' 
					then convert(varchar,'',103)

				when [ValuationDate] is null
					then convert(varchar,'',103)

				else
					right('00'+convert(varchar,datepart(dd,[ValuationDate])),2) + '/' +
					right('00'+convert(varchar,datepart(mm,[ValuationDate])),2) + '/' +
					convert(varchar,datepart(yyyy,[ValuationDate]))
			end
		else	''
		end [ValuationDate]

      ,convert(money,[LTV])					[LTV]
      ,convert(int,[DaysPastRedemption])	[DaysPastRedemption]
      ,convert(int,[NumberProperties])		[NumberProperties]
      ,[PrimaryAddress]
      ,[PrimaryPostcode]
      ,[PrimaryPropertyType]
      ,convert(money,[NumberBorrowers])		[NumberBorrowers]
      ,[PropertyTenure]
      ,convert(money,[AnnualRental])		[AnnualRental]
      ,[IndividualCorporate]
      ,[BorrowerID1]
      ,[BorrowerID2]
      ,[BorrowerID3]
      ,[BorrowerID4]
      ,[BorrowerID5]
      ,convert(money,[BorrowingsPerBorrower])	[BorrowingsPerBorrower]
      ,convert(money,[AdditionalDrawDowns])		[AdditionalDrawDowns]

	 ,case when isdate(EstimatedCompletionDate)=1 
			then
				case when convert(datetime,EstimatedCompletionDate)='31 dec 9999'
							or convert(datetime,EstimatedCompletionDate)='1 jan 1900' 
						then convert(varchar,'',103)

					when EstimatedCompletionDate is null
						then convert(varchar,'',103)

					else
						right('00'+convert(varchar,datepart(dd,EstimatedCompletionDate)),2) + '/' +
						right('00'+convert(varchar,datepart(mm,EstimatedCompletionDate)),2) + '/' +
						convert(varchar,datepart(yyyy,EstimatedCompletionDate))
				end
			else	''
		end									EstimatedCompletionDate

	 ,case when isdate(EstimatedMaturityDate)=1 
			then
				case when convert(datetime,EstimatedMaturityDate)='31 dec 9999'
							or convert(datetime,EstimatedMaturityDate)='1 jan 1900' 
						then convert(varchar,'',103)

					when EstimatedMaturityDate is null
						then convert(varchar,'',103)

					else
						right('00'+convert(varchar,datepart(dd,EstimatedMaturityDate)),2) + '/' +
						right('00'+convert(varchar,datepart(mm,EstimatedMaturityDate)),2) + '/' +
						convert(varchar,datepart(yyyy,EstimatedMaturityDate))
				end
			else	''
		end									EstimatedMaturityDate

	,LoanPurposeReason
	,LoanPurpose
--select *
	from Dawn_Data.Finance.UWPipeline
--where	[CaseReference] like 'M1001334782%'
	--and [PropertyTenure]<>'unknown'
	--Redeemeddate is  null
	--and completiondate is null
	order by [CaseReference]
end

GO
/****** Object:  StoredProcedure [Report].[DW_XLSLoanMasterTransactions]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Report].[DW_XLSLoanMasterTransactions] 
-- 20160905. Peter Wegrzyn 
-- 20161012. Peter Wegrzyn. Moved to datawarehouse
-- 20161013. PW. Added Advanced interest
-- 20170124. PW. Fixed Adv interest to use History not Loan
-- 20190415. PW. Add Compound Interest type
AS 
BEGIN 
	SET NOCOUNT ON;
	SET DATEFORMAT DMY
SELECT  LMT.transaction_id, LMT.transaction_date, LMT.Amount, 
        LMT.loan_id, LMT.transaction_type, LMT.transaction_Description, 
        --LMT.SumOfcashflowInterest_amount, 
		CONVERT(VARCHAR(10),LMT.DateOrdered,103) AS [Date],
		LMT.DateOrdered AS DateOrdered, 
 		LMT.TypeOrder, [Dawn_Data_DW].Loan.Loan.CBFL_id
FROM    [Dawn_Data_DW].LoanCalc.vwLoanMasterTransactions286 LMT INNER JOIN
		[Dawn_Data_DW].Loan.Loan ON LMT.loan_id = [Dawn_Data_DW].Loan.Loan.loan_id
--WHERE DateOrdered<='2016-09-30'
UNION
SELECT XLM.transaction_id,  
		CONVERT(VARCHAR(10),XLM.completion_date,103) AS Trans_Date, 
		XLM.loan_amount, 
		XLM.loan_id, XLM.Transaction_Type, XLM.transaction_Description, 
		CONVERT(VARCHAR(10),XLM.completion_date,103) AS [Date],
		CONVERT(VARCHAR(20),XLM.completion_date,20) AS DateOrdered,--[completion_date], 
		TypeOrder,
		LH.CBFL_id 
		--XLM.DIM_loan_id_DWSK, XLM.DIM_loan_id_DWSK2,XLM.CashFlowType_id, XLM.transactionGroupID
	FROM [Dawn_Data_v100].Report.[DW_XLSLoanMasterRecord] XLM INNER JOIN
	[Dawn_Data_DW].Loan.History LH ON XLM.loan_id = LH.DIM_loan_id_SSK
--WHERE CONVERT(VARCHAR(10),XLM.completion_date,103)<='2016-08-31'
--Advanced interest
UNION
		SELECT  0 AS TID, 
		CONVERT(VARCHAR(10),LN.[completion_date],103) AS [Trans_Date], 
		LN.[interest_amount] AS  Amount, 
        LMT.loan_id, 'Advanced Interest' AS transaction_type, '' AS transaction_Description, 
        --LMT.SumOfcashflowInterest_amount, 
		CONVERT(VARCHAR(10),LN.[completion_date],103) AS [Date],
		CONVERT(VARCHAR(20),LN.completion_date,20) AS [DateOrdered], 
 		0 AS TypeOrder, LN.CBFL_id
FROM    [Dawn_Data_DW].LoanCalc.vwLoanMasterTransactions LMT INNER JOIN
		[Dawn_Data_DW].Loan.History LN ON LMT.loan_id = LN.[DIM_loan_id_SSK]
ORDER BY  CBFL_id, DateOrdered,TypeOrder

END	







GO
/****** Object:  StoredProcedure [Report].[DW_XLSLoanMasterTransactionsHybridList]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--exec [Report].[DW_XLSLoanMasterTransactionsHybridList] 
CREATE  PROCEDURE [Report].[DW_XLSLoanMasterTransactionsHybridList] 
-- 20160905. Peter Wegrzyn 
-- 20161012. Peter Wegrzyn. Moved to datawarehouse
-- 20161013. PW. Added Advanced interest
-- 20170124. PW. Fixed Adv interest to use History not Loan

AS 
BEGIN 
	SET NOCOUNT ON;
	SET DATEFORMAT DMY
SELECT s.* FROM 
(
SELECT  LMT.transaction_id, LMT.transaction_date, LMT.Amount, 
        LMT.loan_id, LMT.transaction_type, LMT.transaction_Description, 
        --LMT.SumOfcashflowInterest_amount, 
		CONVERT(VARCHAR(10),LMT.DateOrdered,103) AS [Date],
		LMT.DateOrdered AS DateOrdered, 
 		LMT.TypeOrder, [Dawn_Data_DW].[Loan].[LoanFilter].CBFL_id
FROM    [Dawn_Data_DW].LoanCalc.vwLoanMasterTransactionsFilter LMT INNER JOIN
		[Dawn_Data_DW].[Loan].[LoanFilter] ON LMT.loan_id = [Dawn_Data_DW].[Loan].[LoanFilter].loan_id
--WHERE DateOrdered<='2016-09-30'
UNION
SELECT XLM.transaction_id,  
		CONVERT(VARCHAR(10),XLM.completion_date,103) AS Trans_Date, 
		XLM.loan_amount, 
		XLM.loan_id, XLM.Transaction_Type, XLM.transaction_Description, 
		CONVERT(VARCHAR(10),XLM.completion_date,103) AS [Date],
		CONVERT(VARCHAR(20),XLM.completion_date,20) AS DateOrdered,--[completion_date], 
		TypeOrder,
		LH.CBFL_id 
		--XLM.DIM_loan_id_DWSK, XLM.DIM_loan_id_DWSK2,XLM.CashFlowType_id, XLM.transactionGroupID
	FROM [Dawn_Data_v100].Report.[DW_XLSLoanMasterRecordHybridList] XLM INNER JOIN
	[Dawn_Data_DW].[Loan].[HistoryFilter] LH ON XLM.loan_id = LH.DIM_loan_id_SSK
--WHERE CONVERT(VARCHAR(10),XLM.completion_date,103)<='2016-08-31'
--Advanced interest
UNION
		SELECT  0 AS TID, 
		CONVERT(VARCHAR(10),LN.[completion_date],103) AS [Trans_Date], 
		LN.[interest_amount] AS  Amount, 
        LMT.loan_id, 'Advanced Interest' AS transaction_type, '' AS transaction_Description, 
        --LMT.SumOfcashflowInterest_amount, 
		CONVERT(VARCHAR(10),LN.[completion_date],103) AS [Date],
		CONVERT(VARCHAR(20),LN.completion_date,20) AS [DateOrdered], 
 		0 AS TypeOrder, LN.CBFL_id
FROM    [Dawn_Data_DW].[LoanCalc].[vwLoanMasterTransactionsFilter] LMT INNER JOIN
		[Dawn_Data_DW].[Loan].[HistoryFilter] LN ON LMT.loan_id = LN.[DIM_loan_id_SSK]
) S
WHERE
[CBFL_id]  in('M1001337465',
'M1001336685',
'M1001337281',
'M1001336535',
'M1001336902',
'M1001337348',
'M1001337821',
'M1001336378',
'M1001337677',
'M1001337042',
'M1001337335',
'M1001335517',
'M1001336486',
'M1001337221',
'M1001337251',
'M1001337717',
'M1001337933',
'M1001337591',
'M1001336961',
'M1001337555',
'M1001337121',
'M1001337543',
'M1001337329',
'M1001336280',
'M1001336212',
'M1001337448',
'M1001336632',
'M1001336496',
'M1001337044',
'M1001337303',
'M1001337384',
'M1001337147',
'M1001336706')
ORDER BY  CBFL_id, DateOrdered,TypeOrder
END	







GO
/****** Object:  StoredProcedure [Report].[DW_XLSLoanMasterTransactionsMOST]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE  PROCEDURE [Report].[DW_XLSLoanMasterTransactionsMOST] 
-- 20160905. Peter Wegrzyn 
-- 20161012. Peter Wegrzyn. Moved to datawarehouse
-- 20161013. PW. Added Advanced interest
-- 20170124. PW. Fixed Adv interest to use History not Loan
AS 
BEGIN 
	SET NOCOUNT ON;
	SET DATEFORMAT DMY
SELECT s.* FROM 
(
SELECT  LMT.transaction_id, LMT.transaction_date, LMT.Amount, 
        LMT.loan_id, LMT.transaction_type, LMT.transaction_Description, 
        --LMT.SumOfcashflowInterest_amount, 
		CONVERT(VARCHAR(10),LMT.DateOrdered,103) AS [Date],
		LMT.DateOrdered AS DateOrdered, 
 		LMT.TypeOrder, [Dawn_Data_DW].Loan.Loan.CBFL_id
FROM    [Dawn_Data_DW].LoanCalc.vwLoanMasterTransactions LMT INNER JOIN
		[Dawn_Data_DW].Loan.Loan ON LMT.loan_id = [Dawn_Data_DW].Loan.Loan.loan_id
--WHERE DateOrdered<='2016-09-30'
UNION
SELECT XLM.transaction_id,  
		CONVERT(VARCHAR(10),XLM.completion_date,103) AS Trans_Date, 
		XLM.loan_amount, 
		XLM.loan_id, XLM.Transaction_Type, XLM.transaction_Description, 
		CONVERT(VARCHAR(10),XLM.completion_date,103) AS [Date],
		CONVERT(VARCHAR(20),XLM.completion_date,20) AS DateOrdered,--[completion_date], 
		TypeOrder,
		LH.CBFL_id 
		--XLM.DIM_loan_id_DWSK, XLM.DIM_loan_id_DWSK2,XLM.CashFlowType_id, XLM.transactionGroupID
	FROM [Dawn_Data_v100].Report.[DW_XLSLoanMasterRecord] XLM INNER JOIN
	[Dawn_Data_DW].Loan.History LH ON XLM.loan_id = LH.DIM_loan_id_SSK
--WHERE CONVERT(VARCHAR(10),XLM.completion_date,103)<='2016-08-31'
--Advanced interest
UNION
		SELECT  0 AS TID, 
		CONVERT(VARCHAR(10),LN.[completion_date],103) AS [Trans_Date], 
		LN.[interest_amount] AS  Amount, 
        LMT.loan_id, 'Advanced Interest' AS transaction_type, '' AS transaction_Description, 
        --LMT.SumOfcashflowInterest_amount, 
		CONVERT(VARCHAR(10),LN.[completion_date],103) AS [Date],
		CONVERT(VARCHAR(20),LN.completion_date,20) AS [DateOrdered], 
 		0 AS TypeOrder, LN.CBFL_id
FROM    [Dawn_Data_DW].LoanCalc.vwLoanMasterTransactions LMT INNER JOIN
		[Dawn_Data_DW].Loan.History LN ON LMT.loan_id = LN.[DIM_loan_id_SSK]
) S
WHERE
[CBFL_id] not in('M1001337465',
'M1001336685',
'M1001337281',
'M1001336535',
'M1001336902',
'M1001337348',
'M1001337821',
'M1001336378',
'M1001337677',
'M1001337042',
'M1001337335',
'M1001335517',
'M1001336486',
'M1001337221',
'M1001337251',
'M1001337717',
'M1001337933',
'M1001337591',
'M1001336961',
'M1001337555',
'M1001337121',
'M1001337543',
'M1001337329',
'M1001336280',
'M1001336212',
'M1001337448',
'M1001336632',
'M1001336496',
'M1001337044',
'M1001337303',
'M1001337384',
'M1001337147',
'M1001336706')
ORDER BY  CBFL_id, DateOrdered,TypeOrder
END	







GO
/****** Object:  StoredProcedure [Report].[exceptionGet_v1]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[exceptionGet_v1] as begin

	set nocount on

	select
	CaseID	
	--,loan_id
	,CaseReference	
	,UnderwriterName	
	,BorrowerName	
	,LoanAmount	
	,LTV	
	,Introducer	
	,ExceptionRequired	
	,Rationale	
	,RequestDate	
	,RequestedBy	
	,AuthorisedBy	
	,Category	
	,FinancialCostToAmicus	
	,Staff_ID	
	,dteDate	
	,dteDateUpdated	
	,ExceptionType	
	,CDD

	--into #v
	from Dawn_Data.Risk.ExceptionsRequestLog
	order by CaseReference

	end
GO
/****** Object:  StoredProcedure [Report].[FundRequestProgress]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc  [Report].[FundRequestProgress]	@RequestType varchar(255)
as begin
		set nocount on

		select 
			l.loan_id																								as	LoanId
			,l.CBFL_id																								as	CaseReference
			,ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId)										as	ContactRowNumber
			,ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id)									as	SecurityRowNumber
			,COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '')				as	PrimaryContactName
			,isnull(s.address_1,'') + case when isnull(s.address_2,'') <>'' then ',' else '' end +
				isnull(s.address_2,'') + case when isnull(s.address_3,'') <>'' then ',' else '' end +
				isnull(s.address_3,'') + case when isnull(s.address_4,'') <>'' then ',' else '' end +
				isnull(s.address_4,'') + case when isnull(s.County,'') <>'' then ',' else '' end +
				isnull(s.post_code,'')																				as	[Address]
			,lc.FKParticipantTypeId
			,(select value from dbo.fn_split(l.Productnames,' ') where idx=0)										as	ProductCode
			,(select count(*) from  Dawn_Data.Loan.FundRequest where FkLoanId = l.loan_id AND FundsReleased=0 AND isnull(FkFundRequestStatusId,0)!=3)	as	CurrentDrawDowns
			,h.checked																								as	Checked
			,fs.[Description]																						as	CurrentRequestStatus
			,ws.StationDescription																					as	[Role]
			,f.Amount																								as	Amount
			,f.[FundRequestDate]
			,datediff(dd,f.[FundRequestDate],getdate())																as AgeIndays
		into #TempLoanDetails
		from		Dawn_Data.Loan.Loan					l
		inner join  Dawn_Data.Loan.History				h	on	h.DIM_loan_id_SSK	=	l.Loan_ID
		inner join	Dawn_Data.Loan.fundRequest			f	on	f.fkLoanId		=	l.Loan_Id
		inner join	Dawn_Data.Reference.fundRequestStatus	fs	on	fs.FundRequestStatusId		=	f.fkFundRequestStatusId
		inner join	Dawn_Data.WorkFlow.Station			ws	on	ws.StationId		=	f.fkCurrentWorkstationId
		left join	Dawn_Data.Loan.ParticipantOfCase		lc	on	l.loan_id		=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
		left join	Dawn_Data.Loan.Contact				c	on	lc.FkContactId	=	c.ContactId
		left join	Dawn_Data.Loan.SecurityMap			sm	on	l.loan_id		=	sm.loan_id
		left join	Dawn_Data.Loan.[Security]			s	on	sm.security_id	=	s.security_id
		where lc.fkcontactid<>0 
		and f.FundsReleased=0
			
--select * from Dawn_Data.Reference.fundRequestStatus
--select * from Dawn_Data.WorkFlow.Station						
		union

		select 
			l.loan_id																								as	LoanId
			,l.CBFL_id																								as	CaseReference
			,ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId)										as	ContactRowNumber
			,ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id)									as	SecurityRowNumber
			,COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '')				as	PrimaryContactName
			,isnull(s.address_1,'') + case when isnull(s.address_2,'') <>'' then ',' else '' end +
				isnull(s.address_2,'') + case when isnull(s.address_3,'') <>'' then ',' else '' end +
				isnull(s.address_3,'') + case when isnull(s.address_4,'') <>'' then ',' else '' end +
				isnull(s.address_4,'') + case when isnull(s.County,'') <>'' then ',' else '' end +
				isnull(s.post_code,'')																				as	[Address]
			,lc.FKParticipantTypeId
			,(select value from dbo.fn_split(l.Productnames,' ') where idx=0)										as	ProductCode
			,(select count(*) from  Dawn_Data.Loan.FundRequest where FkLoanId = l.loan_id AND FundsReleased=0 AND isnull(FkFundRequestStatusId,0)!=3)	as	CurrentDrawDowns
			,h.checked
			,fs.[Description]																						as	CurrentRequestStatus
			,ws.StationDescription																					as	[Role]
			,f.Amount																								as	Amount
			,f.[FundRequestDate]
			,datediff(dd,f.[FundRequestDate],getdate())																as AgeIndays
		from		Dawn_Data.Loan.Loan l
		inner join  Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.Loan_ID
		inner join	Dawn_Data.Loan.fundRequest				f	on	f.fkLoanId			=	l.Loan_Id
		inner join	Dawn_Data.Reference.fundRequestStatus	fs	on	fs.FundRequestStatusId		=	f.fkFundRequestStatusId
		inner join	Dawn_Data.WorkFlow.Station				ws	on	ws.StationId		=	f.fkCurrentWorkstationId
		left join	Dawn_Data.Loan.ParticipantOfCase			lc	ON	l.loan_id = lc.FkLoanId AND lc.FKParticipantTypeId = 1
		left join	Dawn_Data.[Loan].[ContactOfLegalEntity]	cl	on	cl.fkLegalEntityId	=	lc.fkLegalEntityId
		left join	Dawn_Data.Loan.Contact					c	ON	c.ContactId			=	cl.FkContactId
		left join	Dawn_Data.Loan.SecurityMap				sm	ON	sm.loan_id			=	l.loan_id
		left join	Dawn_Data.Loan.Security					s	ON	s.security_id		=	sm.security_id
		WHERE lc.fkcontactid=0 
		and f.FundsReleased=0
		
	delete #TempLoanDetails where ContactRowNumber != 1 and SecurityRowNumber != 1

	select	 LoanId
			,CaseReference
			,'Drawdown' as TransactionType
			,Amount
			,AgeIndays
			,CurrentRequestStatus
			,FundRequestDate
	from	#TempLoanDetails
	order by
		CaseReference
end
GO
/****** Object:  StoredProcedure [Report].[FundRequestStatus]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--drop proc  [Report].[FundRequest]	

CREATE proc  [Report].[FundRequestStatus]	@RequestType varchar(255)
as begin
		set nocount on

		select 
			l.loan_id																								as	LoanId
			,l.CBFL_id																								as	CaseReference
			,ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId)										as	ContactRowNumber
			,ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id)									as	SecurityRowNumber
			,COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '')				as	PrimaryContactName
			,isnull(s.address_1,'') + case when isnull(s.address_2,'') <>'' then ',' else '' end +
				isnull(s.address_2,'') + case when isnull(s.address_3,'') <>'' then ',' else '' end +
				isnull(s.address_3,'') + case when isnull(s.address_4,'') <>'' then ',' else '' end +
				isnull(s.address_4,'') + case when isnull(s.County,'') <>'' then ',' else '' end +
				isnull(s.post_code,'')																				as	[Address]
			,lc.FKParticipantTypeId
			
			--,(select value from dbo.fn_split(l.Productnames,' ') where idx=0)										as	ProductCode
			,p.ProductCode																							as	ProductCode		

			,(select count(*) from  Dawn_Data.Loan.FundRequest where FkLoanId = l.loan_id AND FundsReleased=0 AND isnull(FkFundRequestStatusId,0)!=3)	as	CurrentDrawDowns
			,h.checked																								as	Checked
			,fs.[Description]																					as	CurrentRequestStatus
			,ws.StationDescription																					as	[Role]
			,f.Amount																								as	Amount
			,f.[FundRequestDate]																					as	Requested

		into #TempLoanDetails
		from		Dawn_Data.Loan.Loan					l
		inner join  Dawn_Data.Loan.History				h	on	h.DIM_loan_id_SSK	=	l.Loan_ID
		inner join	Dawn_Data.Loan.fundRequest			f	on	f.fkLoanId		=	l.Loan_Id
		inner join	Dawn_Data.Reference.fundRequestStatus	fs	on	fs.FundRequestStatusId		=	f.fkStatusId
		inner join	Dawn_Data.WorkFlow.Station			ws	on	ws.StationId		=	f.fkCurrentWorkstationId
		left join	Dawn_Data.Loan.ParticipantOfCase		lc	on	l.loan_id		=	lc.FkLoanId AND lc.FKParticipantTypeId = 1
		left join	Dawn_Data.Loan.Contact				c	on	lc.FkContactId	=	c.ContactId
		left join	Dawn_Data.Loan.SecurityMap			sm	on	l.loan_id		=	sm.loan_id
		left join	Dawn_Data.Loan.[Security]			s	on	sm.security_id	=	s.security_id
		left join	Dawn_Data.[Loan].[vwAllCaseProducts]	p	on	p.CaseReference		=	l.CBFL_id

		where lc.fkcontactid<>0 
		and f.FundsReleased=0
			
--select * from Dawn_Data.Reference.fundRequestStatus
--select * from Dawn_Data.WorkFlow.Station						
		union

		select 
			l.loan_id																								as	LoanId
			,l.CBFL_id																								as	CaseReference
			,ROW_NUMBER() OVER (PARTITION BY lc.FkLoanId ORDER BY c.ContactId)										as	ContactRowNumber
			,ROW_NUMBER() OVER (PARTITION BY sm.loan_id ORDER BY sm.security_id)									as	SecurityRowNumber
			,COALESCE(c.Title, '') + ' ' + COALESCE(c.FirstName, '') + ' ' + COALESCE(c.Surname, '')				as	PrimaryContactName
			,isnull(s.address_1,'') + case when isnull(s.address_2,'') <>'' then ',' else '' end +
				isnull(s.address_2,'') + case when isnull(s.address_3,'') <>'' then ',' else '' end +
				isnull(s.address_3,'') + case when isnull(s.address_4,'') <>'' then ',' else '' end +
				isnull(s.address_4,'') + case when isnull(s.County,'') <>'' then ',' else '' end +
				isnull(s.post_code,'')																				as	[Address]
			,lc.FKParticipantTypeId
			--,(select value from dbo.fn_split(l.Productnames,' ') where idx=0)										as	ProductCode
			,p.ProductCode																							as	ProductCode		

			,(select count(*) from  Dawn_Data.Loan.FundRequest where FkLoanId = l.loan_id AND FundsReleased=0 AND isnull(FkFundRequestStatusId,0)!=3)	as	CurrentDrawDowns
			,h.checked
			,fs.[Description]																						as	CurrentRequestStatus
			,ws.StationDescription																					as	[Role]
			,f.Amount																								as	Amount
			,f.[FundRequestDate]																					as	Requested
		from		Dawn_Data.Loan.Loan l
		inner join  Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.Loan_ID
		inner join	Dawn_Data.Loan.fundRequest				f	on	f.fkLoanId			=	l.Loan_Id
		inner join	Dawn_Data.Reference.fundRequestStatus	fs	on	fs.FundRequestStatusId		=	f.fkStatusId
		inner join	Dawn_Data.WorkFlow.Station				ws	on	ws.StationId		=	f.fkCurrentWorkstationId
		left join	Dawn_Data.Loan.ParticipantOfCase			lc	ON	l.loan_id = lc.FkLoanId AND lc.FKParticipantTypeId = 1
		left join	Dawn_Data.[Loan].[ContactOfLegalEntity]	cl	on	cl.fkLegalEntityId	=	lc.fkLegalEntityId
		left join	Dawn_Data.Loan.Contact					c	ON	c.ContactId			=	cl.FkContactId
		left join	Dawn_Data.Loan.SecurityMap				sm	ON	sm.loan_id			=	l.loan_id
		left join	Dawn_Data.Loan.Security					s	ON	s.security_id		=	sm.security_id
		left join	Dawn_Data.[Loan].[vwAllCaseProducts]	p	on	p.CaseReference		=	l.CBFL_id

		WHERE lc.fkcontactid=0 
		and f.FundsReleased=0
			
	delete #TempLoanDetails where ContactRowNumber != 1 and SecurityRowNumber != 1

	select	 LoanId
			,CaseReference
			--,'Drawdown'
			,[Address]
			,isnull(ProductCode,'') ProductCode
			,Amount
			,convert(varchar,Requested,106)	Requested
			,[Role] as CurrentStage
			,CurrentRequestStatus
 			--,CurrentDrawDowns
			,case when checked = 1 then 'Y' else 'N' end CheckedByCollections
	from	#TempLoanDetails
	order by
		CaseReference

end
GO
/****** Object:  StoredProcedure [Report].[GetdateToToday]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Report].[GetdateToToday] 
-- 20190507. Peter Wegrzyn 
@start_date DATETIME = '2018-06-15 00:00:00.000'
AS 
BEGIN 
	SET NOCOUNT ON;
	SET DATEFORMAT DMY

--DECLARE @start_date DATETIME = '2018-06-12 00:00:00.000';

DECLARE @end_date DATETIME = DATEADD(d,-2,GETDATE()); 

WITH    AllDays
          AS ( SELECT   @start_date AS [Date], 1 AS [level]
               UNION ALL
               SELECT   DATEADD(DAY, 1, [Date]), [level] + 1
               FROM     AllDays
               WHERE    [Date] < @end_date )
     SELECT FORMAT([Date],'D','en-GB') AS [Date]--, [level]
     FROM   AllDays OPTION (MAXRECURSION 0);
END
GO
/****** Object:  StoredProcedure [Report].[ManualReportItemDel]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[ManualReportItemDel]	@ManualReportId int, @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try
		if exists(select * from Dawn_Data.Report.ManualReportItems where [ManualReportId]=@ManualReportId)
			begin
				delete Dawn_Data.Report.ManualReportItems where [ManualReportId]=@ManualReportId
				set @rc=0
			end
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end

GO
/****** Object:  StoredProcedure [Report].[ManualReportItemIns]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[ManualReportItemIns]	@LoanId int, @Reporttype varchar(255) , @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on
	select @rc=-1 , @message=''
	begin try

		insert	Dawn_Data.Report.ManualReportItems(LoanId,CaseReference,ReportType,Included)
			select @LoanId , (select CBFL_id from Dawn_Data.Loan.Loan where loan_id=@LoanId) , @Reporttype , 1

		set @rc=0
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end

GO
/****** Object:  StoredProcedure [Report].[ManualReportItemUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[ManualReportItemUpd]	@ManualReportId int, @ReportType varchar(255) , @Include bit , @message varchar(255) output, @rc int output, @debug int
as begin
	set nocount on

	select @rc=-1 , @message=''

	begin try
		if exists(select * from Dawn_Data.Report.ManualReportItems where [ManualReportId]=@ManualReportId)
			begin
				update Dawn_Data.Report.ManualReportItems set included = @Include where [ManualReportId]=@ManualReportId
				set @rc=0
			end
	end try
	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch
	goto ExitOk
ExitErr:
ExitOk:
end

GO
/****** Object:  StoredProcedure [Report].[OpenPipeline]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [Report].[OpenPipeline] as begin
	
	set nocount on
	set dateformat dmy;
	select distinct
	   [PrimaryBorrower]
      ,[WeblabsLoanID]
      --,[EnquiryDate]
      ,[CaseReference]
      ,convert(money,[LoanAmount])			[LoanAmount]
      ,convert(money,[LoanAdjustment])		[LoanAdjustment]
      ,convert(money,[LoanBalance])			[LoanBalance]

	  ,case when isdate(CompletionDate)=1 
			then	case when convert(datetime,CompletionDate)='31 dec 9999'
							or convert(datetime,CompletionDate)='1 jan 1900' 
						then ''
					when CompletionDate is null
						then ''
					else
						convert(varchar,CompletionDate,103)
				end
			else	''
		end									CompletionDate

      ,case when isdate([MaturityDate])=1 
			then	case	when convert(datetime,[MaturityDate])='31 dec 9999' 
							or convert(datetime,[MaturityDate])='1 jan 1900' 
								then ''
							when [MaturityDate] is null
								then ''
							else
								convert(varchar,[MaturityDate],103)
					end
			else 	''
		end									[MaturityDate]

      ,case when isdate([RedeemedDate])=1 
			then	case	when convert(datetime,[RedeemedDate])='31 dec 9999' 
							or convert(datetime,[RedeemedDate])='1 jan 1900' 
							then ''
						when [RedeemedDate] is null
							then ''
						else
							convert(varchar,[RedeemedDate],103)
					end
			else 	''
		end									[RedeemedDate]

      ,convert(money,[GrossLoan])			[GrossLoan]
      ,convert(money,[ArrangementFeeIn])	[ArrangementFeeIn]
      ,convert(money,[ArrangementFeeOut])	[ArrangementFeeOut]
      ,convert(money,[BrokerFeeInPct])		[BrokerFeeInPct]
      ,convert(money,[BrokerFeeOutPct])		[BrokerFeeOutPct]
      ,convert(money,[BrokerFlatFee])		[BrokerFlatFee]
      ,[Status]
      ,[FacilityDate]
      ,[Introducer]
      ,[CBFLSolicitor]
      ,convert(money,[Term])				[Term]
      ,convert(money,[InterestRate])		[InterestRate]
      ,convert(money,[BrokerInterestRate])	[BrokerInterestRate]
      ,convert(money,[TotalMonthlyInterestRate]) [TotalMonthlyInterestRate]
      ,convert(money,[InterestAmount])		[InterestAmount]
      ,convert(money,[InterestAdjustments])	[InterestAdjustments]
      ,convert(money,[InterestBalance])		[InterestBalance]
      ,[ProductCode]
      ,[2ndChargeLender]
      ,convert(money,[1stChargeOutstanding])	[1stChargeOutstanding]
      ,convert(money,[1stChargeValuation])	[1stChargeValuation]
      ,convert(money,[2ndChargeValuation])	[2ndChargeValuation]
      ,convert(money,[TotalValuation])		[TotalValuation]
      ,[ValuationBasis]
      ,[Valuer]
      ,[ValuationDate]
      ,convert(money,[LTV])					[LTV]
      ,convert(int,[DaysPastRedemption])	[DaysPastRedemption]
      ,convert(int,[NumberProperties])		[NumberProperties]
      ,[PrimaryAddress]
      ,[PrimaryPostcode]
      ,[PrimaryPropertyType]
      ,convert(money,[NumberBorrowers])		[NumberBorrowers]
      ,[PropertyTenure]
      ,convert(money,[AnnualRental])		[AnnualRental]
      ,[IndividualCorporate]
      ,[BorrowerID1]
      ,[BorrowerID2]
      ,[BorrowerID3]
      ,[BorrowerID4]
      ,[BorrowerID5]
      ,convert(money,[BorrowingsPerBorrower])	[BorrowingsPerBorrower]
      ,convert(money,[AdditionalDrawDowns])		[AdditionalDrawDowns]

	  ,case when isdate(EstimatedCompletionDate)=1 
			then	case when convert(datetime,EstimatedCompletionDate)='31 dec 9999'
							or convert(datetime,EstimatedCompletionDate)='1 jan 1900' 
						then ''
					when EstimatedCompletionDate is null
						then ''
					else
						convert(varchar,EstimatedCompletionDate,103)
				end
			else	''
		end									EstimatedCompletionDate

	  ,case when isdate(EstimatedMaturityDate)=1 
			then	case when convert(datetime,EstimatedMaturityDate)='31 dec 9999'
							or convert(datetime,EstimatedMaturityDate)='1 jan 1900' 
						then ''
					when EstimatedMaturityDate is null
						then ''
					else
						convert(varchar,EstimatedMaturityDate,103)
				end
			else	''
		end									EstimatedMaturityDate
											
	  --,EstimatedCompletionDate
	  --,EstimatedMaturityDate

--select *
	from Dawn_Data.Finance.OpenPipeline
	--where	[CaseReference] like 'm1001%'
	--and [PropertyTenure]<>'unknown'
	--Redeemeddate is  null
	--and completiondate is null
	order by [CaseReference]
end
GO
/****** Object:  StoredProcedure [Report].[Pipeline]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Report].[Pipeline] as begin
	
	set nocount on
	set dateformat dmy;
	select distinct
	   [PrimaryBorrower]
      ,[WeblabsLoanID]
      --,[EnquiryDate]
      ,[CaseReference]
      ,convert(money,[LoanAmount])			[LoanAmount]
      ,convert(money,[LoanAdjustment])		[LoanAdjustment]
      ,convert(money,[LoanBalance])			[LoanBalance]

	  ,case when isdate(CompletionDate)=1 
			then	case when convert(datetime,CompletionDate)='31 dec 9999'
							or convert(datetime,CompletionDate)='1 jan 1900' 
						then ''
					when CompletionDate is null
						then ''
					else
						convert(varchar,CompletionDate,103)
				end
			else	''
		end									CompletionDate

      ,case when isdate([MaturityDate])=1 
			then	case	when convert(datetime,[MaturityDate])='31 dec 9999' 
							or convert(datetime,[MaturityDate])='1 jan 1900' 
								then ''
							when [MaturityDate] is null
								then ''
							else
								convert(varchar,[MaturityDate],103)
					end
			else 	''
		end									[MaturityDate]

      ,case when isdate([RedeemedDate])=1 
			then	case	when convert(datetime,[RedeemedDate])='31 dec 9999' 
							or convert(datetime,[RedeemedDate])='1 jan 1900' 
							then ''
						when [RedeemedDate] is null
							then ''
						else
							convert(varchar,[RedeemedDate],103)
					end
			else 	''
		end									[RedeemedDate]

      ,convert(money,[GrossLoan])			[GrossLoan]
      ,convert(money,[ArrangementFeeIn])	[ArrangementFeeIn]
      ,convert(money,[ArrangementFeeOut])	[ArrangementFeeOut]
      ,convert(money,[BrokerFeeInPct])		[BrokerFeeInPct]
      ,convert(money,[BrokerFeeOutPct])		[BrokerFeeOutPct]
      ,convert(money,[BrokerFlatFee])		[BrokerFlatFee]
      ,[Status]
      ,[FacilityDate]
      ,[Introducer]
      ,[CBFLSolicitor]
      ,convert(money,[Term])				[Term]
      ,convert(money,[InterestRate])		[InterestRate]
      ,convert(money,[BrokerInterestRate])	[BrokerInterestRate]
      ,convert(money,[TotalMonthlyInterestRate]) [TotalMonthlyInterestRate]
      ,convert(money,[InterestAmount])		[InterestAmount]
      ,convert(money,[InterestAdjustments])	[InterestAdjustments]
      ,convert(money,[InterestBalance])		[InterestBalance]
      ,[ProductCode]
      ,[2ndChargeLender]
      ,convert(money,[1stChargeOutstanding])	[1stChargeOutstanding]
      ,convert(money,[1stChargeValuation])	[1stChargeValuation]
      ,convert(money,[2ndChargeValuation])	[2ndChargeValuation]
      ,convert(money,[TotalValuation])		[TotalValuation]
      ,[ValuationBasis]
      ,[Valuer]
      ,[ValuationDate]
      ,convert(money,[LTV])					[LTV]
      ,convert(int,[DaysPastRedemption])	[DaysPastRedemption]
      ,convert(int,[NumberProperties])		[NumberProperties]
      ,[PrimaryAddress]
      ,[PrimaryPostcode]
      ,[PrimaryPropertyType]
      ,convert(money,[NumberBorrowers])		[NumberBorrowers]
      ,[PropertyTenure]
      ,convert(money,[AnnualRental])		[AnnualRental]
      ,[IndividualCorporate]
      ,[BorrowerID1]
      ,[BorrowerID2]
      ,[BorrowerID3]
      ,[BorrowerID4]
      ,[BorrowerID5]
      ,convert(money,[BorrowingsPerBorrower])	[BorrowingsPerBorrower]
      ,convert(money,[AdditionalDrawDowns])		[AdditionalDrawDowns]

	  ,case when isdate(EstimatedCompletionDate)=1 
			then	case when convert(datetime,EstimatedCompletionDate)='31 dec 9999'
							or convert(datetime,EstimatedCompletionDate)='1 jan 1900' 
						then ''
					when EstimatedCompletionDate is null
						then ''
					else
						convert(varchar,EstimatedCompletionDate,103)
				end
			else	''
		end									EstimatedCompletionDate

	  ,case when isdate(EstimatedMaturityDate)=1 
			then	case when convert(datetime,EstimatedMaturityDate)='31 dec 9999'
							or convert(datetime,EstimatedMaturityDate)='1 jan 1900' 
						then ''
					when EstimatedMaturityDate is null
						then ''
					else
						convert(varchar,EstimatedMaturityDate,103)
				end
			else	''
		end									EstimatedMaturityDate
											
	  --,EstimatedCompletionDate
	  --,EstimatedMaturityDate

--select *
	from Dawn_Data.Finance.Pipeline
	--where	[CaseReference] like 'm1001%'
	--and [PropertyTenure]<>'unknown'
	--Redeemeddate is  null
	--and completiondate is null
	order by [CaseReference]
end
GO
/****** Object:  StoredProcedure [Report].[Pipeline_v2]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Report].[Pipeline_v2] as begin
	
	set nocount on
	set dateformat dmy;

	select distinct
	[Primary Borrower] = [PrimaryBorrower]
	, [LoanID] = [WeblabsLoanID]
	, [Enquiry Date] = [EnquiryDate]
	, [Case Reference] = [CaseReference]
	, [Loan Amount] = [LoanAmount]
	, [Loan Adjustment] = [LoanAdjustment]
	, [Loan Balance] = [LoanBalance]
	, [Completion Date] = [CompletionDate]
	, [Maturity Date] = [MaturityDate]
	, [Redeemed Date] = [RedeemedDate]
	, [Gross Loan] = [GrossLoan]
	, [Arrangement Fee In] = [ArrangementFeeIn]
	, [Arrangement Fee Out] = [ArrangementFeeOut]
	, [Broker Fee In Pct] = [BrokerFeeInPct]
	, [Broker Fee Out Pct] = [BrokerFeeOutPct]
	, [Broker Flat Fee] = [BrokerFlatFee]
	, [Status] = [Status]
	, [Facility Date] = [FacilityDate]
	, [Introducer] = [Introducer]
	, [CBFLSolicitor] = [CBFLSolicitor]
	, [Term] = [Term]
	, [Interest Rate Pct] = [InterestRate]
	, [Broker Interest Rate] = [BrokerInterestRate]
	, [Total Monthly Interest Rate] = [TotalMonthlyInterestRate]
	, [Interest Amount] = [InterestAmount]
	, [Interest Adjustments] = [InterestAdjustments]
	, [Interest Balance] = [InterestBalance]
	, [Product Code] = [ProductCode]
	, [Product Name] = [ProductName]
	, [2nd Charge Lender] = [2ndChargeLender]
	, [1st Charge Outstanding] = [1stChargeOutstanding]
	, [1st Charge Valuation] = [1stChargeValuation]
	, [2nd Charge Valuation] = [2ndChargeValuation]
	, [Total Valuation] = [TotalValuation]
	, [Customer Valuation] = [CustomerVal]
	, [Total Portfolio Valuation] = [TotalPortfolioVal]
	, [Valuation Basis] = [ValuationBasis]
	, [Valuer] = [Valuer]
	, [Valuation Date] = [ValuationDate]
	, [LTV] = [LTV]
	, [Days Past Redemption] = [DaysPastRedemption]
	, [Number of Properties] = [NumberProperties]
	, [Primary Address] = [PrimaryAddress]
	, [Primary Postcode] = [PrimaryPostcode]
	, [Primary Property Type] = [PrimaryPropertyType]
	, [Number of Borrowers] = [NumberBorrowers]
	, [Property Tenure] = [PropertyTenure]
	, [Annual Rental] = [AnnualRental]
	, [Individual/Corporate] = [IndividualCorporate]
	, [BorrowerID1] = [BorrowerID1]
	, [BorrowerID2] = [BorrowerID2]
	, [BorrowerID3] = [BorrowerID3]
	, [BorrowerID4] = [BorrowerID4]
	, [BorrowerID5] = [BorrowerID5]
	, [Borrowings Per Borrower] = [BorrowingsPerBorrower]
	, [Additional Drawdowns] = [AdditionalDrawDowns]
	, [Esitmated Completion Date] = [EstimatedCompletionDate]
	, [Esitmated Maturity Date] = [EstimatedMaturityDate]
	, [Corporate Borrower] = [CorporateBorrower]
	, [Offered Status Date] = [OfferedStatusDate]
	, [Loan Reason] = [LoanReason]
	, [Loan Purpose] = [LoanPurpose]
	, [Loan Type] = [LoanType]
	, [90 Day Valuation] = [90DayValuation]
	, [Underwriter Name] = [UnderwriterName]

	from Dawn_Data.Finance.Pipeline_v2

	order by [CaseReference]
end
GO
/****** Object:  StoredProcedure [Report].[PoolTapeByFunder_v9]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [Report].[PoolTapeByFunder_v9]	@Funder varchar(255) 
as 
begin


select	 isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=1),'')		FunderName1
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=2),'')		FunderName2
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=3),'')		FunderName3
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=4),'')		FunderName4
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=5),'')		FunderName5
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=6),'')		FunderName6
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=7),'')		FunderName7
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=8),'')		FunderName8
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=9),'')		FunderName9
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=10),'')		FunderName10
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=11),'')		FunderName11
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=12),'')		FunderName12
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=13),'')		FunderName13
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=14),'')		FunderName14
				,isnull((select Funder_Name from Dawn_Data.Loan.Funder where Funder_Id=15),'')		FunderName15


SELECT
	--[FunderName],
	[Reference],
	CASE WHEN [FinanceCaseReference] LIKE 'M1001%' THEN 'M'+CONVERT(VARCHAR,[LoanId]) ELSE CONVERT(VARCHAR,[LoanId]) END  AS [LoanId],
	--[LoanId],

	[FinanceCaseReference],
	[Total_Loan_Balance],
	[Loan_Amount],
	[Loan_Adjustment],
	[Loan_Balance],
	[Completion_Date],
	[Maturity_Date],
	[Term],
	[InterestRate],
	[BrokerInterestRate],
	[TotalMonthlyInterestRate],
	[InterestAmount],
	[InterestAmountAdjustment],
	[InterestBalance],
	[ProductCode],
	[2nd Charge Lender],
	[1st Charge Outstanding],
	[1st Charge Valuation],
	[2ndChargeValuation],
	[Total Valuation],
	[Valuation Basis],
	[Reinstatement Value],
	[Valuer],
	[Valuation Date],
	[LTV],
	[Days Past Redemption],
	[Number Properties],
	[Primary Address],
	[Primary Postcode],
	[Primary Property Type],
	[Number Borrowers],
	[Property Tenure],
	[Annual Rental],
	[Individual/Corporate],
	[Number CCJs],
	[CCJ Amount],
	[BorrowerID1],
	[BorrowerID2],
	[BorrowerID3],
	[BorrowerID4],
	[BorrowerID5],
	[Funder1Pct],
	[Funder2Pct],
	[Funder3Pct],
	[Funder4Pct],
	[Funder5Pct],
	[Funder6Pct],
	[Funder7Pct],
	[Funder8Pct],
	[Funder9Pct],
	[Funder10Pct],
	[Funder11Pct],
	[Funder12Pct],
	[Funder13Pct],
	[Funder14Pct],
	[Funder15Pct]
FROM [Dawn_Data_Reporting].[Report].[PoolTapeByFunderReport]
WHERE [FunderName] = @Funder

----CCJSs-------------------------

IF OBJECT_ID('tempdb..#WeblabsCCJ') IS NOT NULL DROP TABLE #WeblabsCCJ
CREATE TABLE #WeblabsCCJ (CaseReference [nvarchar](255),FullName [nvarchar](255), [Number CCJs] INT)
INSERT #WeblabsCCJ VALUES ('MICORE_LEAFIELD_LTD3153/10/2015','Michael Corey',1)--------------------------
INSERT #WeblabsCCJ VALUES ('WIGGINS3259/10/2015','Richard Anthony Wiggins',2)--------------------------------------
INSERT #WeblabsCCJ VALUES ('WIGGINS_DEVELOPMENTS_LIMITED3276/10/2015','Richard Anthony Wiggins',2)-----------------
INSERT #WeblabsCCJ VALUES ('TOWAN_VALLEY_TWO_LIMITED3496/12/2015','Andrew Paul Clark',2)---------------------
INSERT #WeblabsCCJ VALUES ('READING_SECURITIES_2_LLP3949/02/2016','Tim Kelly',1)-----------------------


;WITH CTE_DPR_CCJ AS
	(
SELECT T3.ApplicationRef AS CaseReference ,
		ISNULL(T2.FirstName+' ','')+ISNULL(T2.MiddleName+' ','')+ISNULL(T2.Surname+' ','') AS FullName
FROM [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAAdverseDetail] T1 
	INNER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAApplicant]  T2
		ON T1.ApplicantId = T2.Id
		INNER JOIN [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMAApplication T3
			ON T2.ApplicationId=T3.Id
WHERE 1=1 AND T2.IsCompanyApplicant=0
AND T1.Type = 'CCJ' 
AND T1.DateSatisfiedCleared IS NULL
) ,
CTE_DPR_CCJ2 AS
	( 
SELECT	CaseReference,
		FullName,
		COUNT(*) AS NumberCCJS
FROM CTE_DPR_CCJ
GROUP BY CaseReference,FullName
UNION 
SELECT	CaseReference,
		FullName,
		[Number CCJs]
FROM	#WeblabsCCJ
),
CTE_Funders AS
	(
SELECT  DISTINCT  
		f.Funder_Name,
		l.CBFL_id	 AS CaseReference							
FROM Dawn_Data.Loan.Funder f
	INNER JOIN Dawn_Data.Loan.FunderOfLoan fl	
		ON	f.funder_id = fl.fkFunderId
	INNER JOIN	Dawn_Data.Loan.Loan l	
	ON	l.loan_id	=	fl.fkLoanId
WHERE	l.redeemed_date IS NULL
AND redeemed_date is null		
AND f.Funder_Name = case when @Funder!='*ALL*' then @Funder else f.Funder_Name end
)
SELECT	CaseReference,
		FullName,
		NumberCCJS
FROM	CTE_DPR_CCJ2 b
WHERE EXISTS (	SELECT * 
				FROM CTE_Funders c 
				WHERE b.CaseReference = c.CaseReference)
ORDER BY CaseReference,FullName




end


GO
/****** Object:  StoredProcedure [Report].[PoolTapeByFunderGenerator_v9]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/******************************
** File:   [Report].[PoolTapeByFunderGenerator_v9].sql  
** Name:	PoolTapeByFunderGenerator_v9
** Desc:	Generates Pool tape report from Aura, DPR and Dawn_Data_Staging databases. This is intended 
			as a tactical solution for the purpose of passing the Finance audit. As the data structure 
			in Aura is enhanced and the data in Aura is cleaned the Pool Tape will be gradually migrated 
			to use Aura as its sole data source.
** Version	9.5

** Date:10/3/17
**************************
** Change History
**************************
** PR   Date        Author  Description 
** --   --------   -------   ------------------------------------
** 9.4    10/3/17      AL      Created
** 9.5    16/3/17      AL      Correct valuation date / valuation basis / mutliple tenure types
** 9.10   21/8/17	 AL			Pull all DPR tables into temp tables to speed up DRP queries 
*******************************/
	

CREATE PROC [Report].[PoolTapeByFunderGenerator_v9]	@Funder VARCHAR(255)='*ALL*' , @test INT =0
AS 



BEGIN

	SET NOCOUNT ON
	SET DATEFORMAT mdy
	
--declare @Funder varchar(255) ; select @Funder=  '*ALL*'
--Funder
--------------------------------------------------------------
--v9.10 
IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMAApplication') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMAApplication
select * into #Latest_Orig_BoM_dbo_morAppFma_FMAApplication from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAApplication

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMALoanDetails') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMALoanDetails
select * into #Latest_Orig_BoM_dbo_morAppFma_FMALoanDetails from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMALoanDetails

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMASecurity') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMASecurity
select * into #Latest_Orig_BoM_dbo_morAppFma_FMASecurity from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMASecurity 

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMASecurityContact') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMASecurityContact
select * into #Latest_Orig_BoM_dbo_morAppFma_FMASecurityContact from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMASecurityContact

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMAAddress') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMAAddress
select * into #Latest_Orig_BoM_dbo_morAppFma_FMAAddress from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAAddress

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMASecurityValuation') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMASecurityValuation
select * into #Latest_Orig_BoM_dbo_morAppFma_FMASecurityValuation from  Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMASecurityValuation

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMAPropertySummary') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMAPropertySummary
select * into #Latest_Orig_BoM_dbo_morAppFma_FMAPropertySummary from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAPropertySummary

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMAPropertySurveyDetails') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMAPropertySurveyDetails
select * into #Latest_Orig_BoM_dbo_morAppFma_FMAPropertySurveyDetails from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAPropertySurveyDetails

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMAProperty') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMAProperty
select * into #Latest_Orig_BoM_dbo_morAppFma_FMAProperty from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAProperty

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMAPropertyDetail') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMAPropertyDetail
select * into #Latest_Orig_BoM_dbo_morAppFma_FMAPropertyDetail from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAPropertyDetail

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMAProduct') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMAProduct
select * into #Latest_Orig_BoM_dbo_morAppFma_FMAProduct  from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAProduct

IF OBJECT_ID('tempdb..#Latest_Orig_BoM_dbo_morAppFma_FMASecurityTitleDeedAdmin') IS NOT NULL DROP TABLE #Latest_Orig_BoM_dbo_morAppFma_FMASecurityTitleDeedAdmin
select * into #Latest_Orig_BoM_dbo_morAppFma_FMASecurityTitleDeedAdmin  from Dawn_Data_Staging.DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMASecurityTitleDeedAdmin


------------------------------------------



IF OBJECT_ID('tempdb..#FunderIdList') IS NOT NULL DROP TABLE #FunderIdList
CREATE TABLE #FunderIdList (FunderPct DECIMAL(18,4),  fkLoanId INT)


IF @Funder =  '*ALL*'
	--INSERT #FunderIdList
	--SELECT  DISTINCT 
	--		100.00				AS FunderPct,
	--		fl.fkLoanId			AS fkLoanId							
	--FROM Dawn_Data.Loan.Funder f
	--	INNER JOIN Dawn_Data.Loan.FunderOfLoan fl	
	--		ON	f.funder_id = fl.fkFunderId
	--	INNER JOIN	Dawn_Data.Loan.Loan l	
	--	ON	l.loan_id	=	fl.fkLoanId
	--WHERE	l.redeemed_date IS NULL

	INSERT #FunderIdList
	SELECT  DISTINCT 
			100.00				AS FunderPct,
			l.loan_id			AS fkLoanId							
	FROM Dawn_Data.Loan.Loan l
	WHERE	l.redeemed_date IS NULL

ELSE 
	INSERT #FunderIdList
	SELECT DISTINCT 
			fl.FunderLoanSplitPct	AS FunderPct,
			fl.fkLoanId				AS fkLoanId								
	FROM Dawn_Data.Loan.Funder f
		INNER JOIN Dawn_Data.Loan.FunderOfLoan fl	
			ON	f.funder_id = fl.fkFunderId
		INNER JOIN	Dawn_Data.Loan.Loan l	
		ON	l.loan_id	=	fl.fkLoanId
	WHERE	l.redeemed_date is null
	AND f.Funder_Name = @Funder



IF OBJECT_ID('tempdb..#FunderOfLoan') IS NOT NULL DROP TABLE #FunderOfLoan
SELECT fkLoanId AS Loan_Id,
	MAX(CASE WHEN fkFunderId = 1 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder1Pct], 
	MAX(CASE WHEN fkFunderId = 2 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder2Pct],
	MAX(CASE WHEN fkFunderId = 3 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder3Pct],
	MAX(CASE WHEN fkFunderId = 4 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder4Pct],
	MAX(CASE WHEN fkFunderId = 5 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder5Pct],
	MAX(CASE WHEN fkFunderId = 6 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder6Pct],
	MAX(CASE WHEN fkFunderId = 7 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder7Pct],
	MAX(CASE WHEN fkFunderId = 8 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder8Pct],
	MAX(CASE WHEN fkFunderId = 9 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder9Pct],
	MAX(CASE WHEN fkFunderId = 10 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder10Pct],
	MAX(CASE WHEN fkFunderId = 11 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder11Pct],
	MAX(CASE WHEN fkFunderId = 12 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder12Pct],
	MAX(CASE WHEN fkFunderId = 13 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder13Pct],
	MAX(CASE WHEN fkFunderId = 14 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder14Pct],
	MAX(CASE WHEN fkFunderId = 15 THEN FunderLoanSplitPct ELSE 0 END) AS [Funder15Pct]
INTO #FunderOfLoan 
FROM Dawn_Data.Loan.FunderOfLoan  
GROUP BY fkLoanId

--Corporate / Individual
--------------------------------------------------------------
IF OBJECT_ID('tempdb..#Corporate') IS NOT NULL DROP TABLE #Corporate
SELECT DISTINCT FkLoanId AS loan_id
INTO #Corporate
FROM Dawn_Data.Loan.ParticipantOfCase  poc
WHERE  poc.FkLegalEntityId!=0 and poc.FKParticipantTypeId=1
	
--cashflowinterest
--------------------------------------------------------------
IF OBJECT_ID('tempdb..#cashflowinterest') IS NOT NULL DROP TABLE #cashflowinterest
SELECT	loan_id,
		SUM(isnull(cashflowinterest_amount,0))  AS cashflowinterest_amount
INTO	#cashflowinterest
FROM	Dawn_Data.Reconciliation.vwStatementCashflowTransactions
WHERE	cashflowtypedescription in ('drawdown','Further Drawdown','Early Redemption','Redemption')
OR cashflowtypedescription like '%Further Advance%'
GROUP BY loan_id


--Web labs Loan ID
--------------------------------------------------------------
IF OBJECT_ID('tempdb..#wl_loanid') IS NOT NULL DROP TABLE #wl_loanid
SELECT l.CBFL_id AS CaseReference,
	c.LoanID
INTO #wl_loanid
FROM Dawn_Data.Loan.Loan l
	INNER JOIN [Dawn_Data_Staging].[WebLabs].[Case] c
		ON l.CBFL_id = c.CaseReference

		

--product Code
--------------------------------------------------------------
IF OBJECT_ID('tempdb..#Productdesc') IS NOT NULL DROP TABLE #Productdesc

SELECT a.ProductId,
		a.ProductCode,
		a.ProductCode + ISNULL(' - ' + b.Description,'') AS ProductCodeDesc
into #Productdesc
FROM   Dawn_Data.[Product].[Product] a
INNER JOIN (select distinct [Description],	ProductCode FROM [Dawn_Data].[dbo].[tbl_ProductName]) b
	ON a.ProductCode = b.ProductCode
WHERE a.isActive = 1

  

--CCJs
--------------------------------------------------------------

-- Hard coded CCjs from weblabs
--IF OBJECT_ID('tempdb..#WeblabsCCJ') IS NOT NULL DROP TABLE #WeblabsCCJ
--CREATE TABLE #WeblabsCCJ (CaseReference [nvarchar](255), [Number CCJs] INT)
--INSERT #WeblabsCCJ VALUES ('VINCENT2482/05/2015',3)
--INSERT #WeblabsCCJ VALUES ('MICORE_LEAFIELD_LTD3153/10/2015',1)
--INSERT #WeblabsCCJ VALUES ('WIGGINS3259/10/2015',2)
--INSERT #WeblabsCCJ VALUES ('WIGGINS_DEVELOPMENTS_LIMITED3276/10/2015',2)
--INSERT #WeblabsCCJ VALUES ('NAVITAS_ESTATES_LIMITED3357/11/2015',1)
--INSERT #WeblabsCCJ VALUES ('TOWAN_VALLEY_TWO_LIMITED3496/12/2015',2)
--INSERT #WeblabsCCJ VALUES ('MCDONALD3534/12/2015',1)
--INSERT #WeblabsCCJ VALUES ('SMITH3687/01/2016',1)
--INSERT #WeblabsCCJ VALUES ('BROWN3724/01/2016',1)
--INSERT #WeblabsCCJ VALUES ('READING_SECURITIES_2_LLP3949/02/2016',1)


IF OBJECT_ID('tempdb..#WeblabsCCJ') IS NOT NULL DROP TABLE #WeblabsCCJ
CREATE TABLE #WeblabsCCJ (CaseReference [nvarchar](255),FullName [nvarchar](255), [Number CCJs] INT)
INSERT #WeblabsCCJ VALUES ('MICORE_LEAFIELD_LTD3153/10/2015','Michael Corey',1)--------------------------
INSERT #WeblabsCCJ VALUES ('WIGGINS3259/10/2015','Richard Anthony Wiggins',2)--------------------------------------
INSERT #WeblabsCCJ VALUES ('WIGGINS_DEVELOPMENTS_LIMITED3276/10/2015','Richard Anthony Wiggins',2)-----------------
INSERT #WeblabsCCJ VALUES ('TOWAN_VALLEY_TWO_LIMITED3496/12/2015','Andrew Paul Clark',2)---------------------
INSERT #WeblabsCCJ VALUES ('READING_SECURITIES_2_LLP3949/02/2016','Tim Kelly',1)-----------------------



IF OBJECT_ID('tempdb..#ccj') IS NOT NULL DROP TABLE #ccj
SELECT T3.ApplicationRef AS CaseReference ,
		--ISNULL(T2.FirstName+' ','')+ISNULL(T2.MiddleName+' ','')+ISNULL(T2.Surname+' ','') AS FullName
		COUNT(*)  AS [Number CCJs]
INTO #ccj
FROM [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAAdverseDetail] T1 
	INNER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAApplicant]  T2
		ON T1.ApplicantId = T2.Id
		INNER JOIN [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMAApplication T3
			ON T2.ApplicationId=T3.Id
WHERE 1=1 AND T2.IsCompanyApplicant=0
AND T1.Type = 'CCJ' 
AND T1.DateSatisfiedCleared IS NULL
GROUP BY T3.ApplicationRef
UNION
SELECT CaseReference, SUM([Number CCJs]) AS [Number CCJs]
FROM #WeblabsCCJ
GROUP BY CaseReference


IF  EXISTS (SELECT name,*  FROM tempdb.sys.indexes  WHERE object_id = OBJECT_ID('tempdb..#ccj')
			AND ISNULL(name,'')<>'PK_ccj')
	BEGIN
		CREATE UNIQUE CLUSTERED INDEX  PK_ccj ON #ccj (CaseReference)
	END


--DPR / Staging data to augment  Aura data
--------------------------------------------------------------
IF OBJECT_ID('tempdb..#vwImportedCase_old') IS NOT NULL DROP TABLE #vwImportedCase_old
select	--ROW_NUMBER() OVER (PARTITION BY CaseReference,PrimaryAddress order by PropertyTenure) as row_no,
		Reference,
		LoanID,
		CONVERT(VARCHAR(510),CaseReference) AS CaseReference,
		LoanAmount,
		LoanAdjustment,
		LoanBalance,
		CompletionDate,
		MaturityDate,
		RedeemedDate,
		GrossLoan,
		ArrangementFeeInPct,
		ArrangementFeeOutPct,
		BrokerFeeInPct,
		BrokerFeeOutPct,
		BrokerFlatFee,
		[Status],
		FacilityDate,
		Introducer,
		CBFLSolicitor,
		Term,
		InterestRate,
		BrokerInterestRate,
		TotalMonthlyInterestRate,
		InterestAmount,
		InterestAdjustments,
		InterestBalance,
		ProductCode,
		[2ndChargeLender],
		[1stChargeOutstanding],
		[1stChargeValuation],
		[2ndChargeValuation],
		TotalValuation,
		ValuationBasis,
		Valuer,
		ValuationDate,
		LTV,
		DaysPastRedemption,
		NumberProperties,
		PrimaryAddress,
		PrimaryPostcode,
		PrimaryPropertyType,
		NumberBorrowers,
		PropertyTenure,
		AnnualRental,
		IndividualCorporate,
		BorrowerID1,
		BorrowerID2,
		BorrowerID3,
		BorrowerID4,
		BorrowerID5,
		BorrowingsPerBorrower 
into #vwImportedCase_old
from Dawn_Data.[Loan].[vwImportedCase]



-----






--v9.10 
IF OBJECT_ID('tempdb..#DPRCases') IS NOT NULL DROP TABLE #DPRCases
SELECT DISTINCT T24.VariantCode,
	MT.ApplicationRef AS CaseReference
	,[Product Code] = CASE WHEN T24.VariantCode IS NULL THEN '' ELSE ISNULL(T24.VariantCode,'') + ' ' + ISNULL(T24.ProductName,'') END
	,[2nd Charge Lender] = CASE WHEN T1.LoanType LIKE '%First%' THEN 'N' ELSE 'Y' END
	,[1st Charge Valuation] = CASE WHEN T1.LoanType LIKE '%First%' THEN ISNULL(CONVERT(varchar,T9.PresentValue),'') ELSE '0' END --ISNULL(CONVERT(varchar,T9.PresentValue),'')
	,[2nd Charge Valuation] = CASE WHEN T1.LoanType LIKE '%First%' THEN 0 ELSE ISNULL(T5.ValuationToUsePurchasePrice,0) END
	,[Property Tenure] = T9.TenureType
	,[Primary Property Type] = T9.PropertyType
	,T1.LoanType

	,T5.ValuerFirm 
	,T5.ValuationType	AS [Valuation Basis]
	,ISNULL(CONVERT(varchar,CONVERT(date,T5.ValuationDate)),'') AS ValuationDate
	,T9.ReinstatementValue
	,T9.LettingValue AS RentalIncome

into #DPRCases

--select count(*)
FROM #Latest_Orig_BoM_dbo_morAppFma_FMAApplication MT
	LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMALoanDetails T1
       ON T1.ApplicationId=MT.Id

       LEFT OUTER JOIN 
       (SELECT
              LoanDetailsId
              , Id
              , ROW_NUMBER() OVER(PARTITION BY LoanDetailsId ORDER BY SequenceNumber) AS SeqRank
                     
       FROM #Latest_Orig_BoM_dbo_morAppFma_FMASecurity 

       WHERE IsPrimary=1
       ) T2
       ON T2.LoanDetailsId=T1.Id
       AND T2.SeqRank=1

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMASecurityContact T3
       ON T3.SecurityId=T2.Id
       AND T3.ContactType='Applicant'

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAAddress T4
       ON T4.ParentId=T2.Id 

       LEFT OUTER JOIN 
       (
       SELECT SecurityId
              , Id
              , ValuationType
              , ValuerFirm
              , ValuationDate
			  , ValuationToUsePurchasePrice
              , ROW_NUMBER() OVER(PARTITION BY SecurityId ORDER BY ValuationDate DESC) AS PropRank
       
       FROM #Latest_Orig_BoM_dbo_morAppFma_FMASecurityValuation a
       WHERE IsActiveValuation = 1
       ) T5
       ON T5.SecurityId=T2.Id
       AND T5.PropRank=1

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAPropertySummary T6
       ON T6.SecurityValuationId=T5.Id

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAPropertySurveyDetails T7
       ON T7.PropertySummaryId=T6.Id

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAProperty T8
       ON T8.PropertySurveyDetailsId=T7.Id

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAPropertyDetail T9
       ON T9.PropertyId=T8.Id

		LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAProduct T24
		ON T24.LoanDetailsId=T1.Id



--IF OBJECT_ID('tempdb..#DPRCases') IS NOT NULL DROP TABLE #DPRCases
--SELECT DISTINCT T24.VariantCode,
--	MT.ApplicationRef AS CaseReference
--	,[Product Code] = CASE WHEN T24.VariantCode IS NULL THEN '' ELSE ISNULL(T24.VariantCode,'') + ' ' + ISNULL(T24.ProductName,'') END
--	,[2nd Charge Lender] = CASE WHEN T1.LoanType LIKE '%First%' THEN 'N' ELSE 'Y' END
--	,[1st Charge Valuation] = CASE WHEN T1.LoanType LIKE '%First%' THEN ISNULL(CONVERT(varchar,T9.PresentValue),'') ELSE '0' END --ISNULL(CONVERT(varchar,T9.PresentValue),'')
--	,[2nd Charge Valuation] = CASE WHEN T1.LoanType LIKE '%First%' THEN 0 ELSE ISNULL(T5.ValuationToUsePurchasePrice,0) END
--	,[Property Tenure] = T9.TenureType
--	,[Primary Property Type] = T9.PropertyType
--	,T1.LoanType

--	,T5.ValuerFirm 
--	,T5.ValuationType	AS [Valuation Basis]
--	,ISNULL(CONVERT(varchar,CONVERT(date,T5.ValuationDate)),'') AS ValuationDate
--	,T9.ReinstatementValue
--	,T9.LettingValue AS RentalIncome

--into #DPRCases
--FROM

--	[Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAApplication] MT
--	LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMALoanDetails] T1
--       ON T1.ApplicationId=MT.Id

--       LEFT OUTER JOIN 
--       (SELECT
--              LoanDetailsId
--              , Id
--              , ROW_NUMBER() OVER(PARTITION BY LoanDetailsId ORDER BY SequenceNumber) AS SeqRank
                     
--       FROM [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMASecurity] 

--       WHERE IsPrimary=1
--       ) T2
--       ON T2.LoanDetailsId=T1.Id
--       AND T2.SeqRank=1

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMASecurityContact] T3
--       ON T3.SecurityId=T2.Id
--       AND T3.ContactType='Applicant'

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAAddress] T4
--       ON T4.ParentId=T2.Id 

--       LEFT OUTER JOIN 
--       (
--       SELECT SecurityId
--              , Id
--              , ValuationType
--              , ValuerFirm
--              , ValuationDate
--			  , ValuationToUsePurchasePrice
--              , ROW_NUMBER() OVER(PARTITION BY SecurityId ORDER BY ValuationDate DESC) AS PropRank
       
--       FROM [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMASecurityValuation] a
--       WHERE IsActiveValuation = 1
--       ) T5
--       ON T5.SecurityId=T2.Id
--       AND T5.PropRank=1

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAPropertySummary] T6
--       ON T6.SecurityValuationId=T5.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAPropertySurveyDetails] T7
--       ON T7.PropertySummaryId=T6.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAProperty] T8
--       ON T8.PropertySurveyDetailsId=T7.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAPropertyDetail] T9
--       ON T9.PropertyId=T8.Id

--		LEFT OUTER JOIN [Dawn_Data_Staging].DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAProduct T24
--		ON T24.LoanDetailsId=T1.Id







UPDATE ic
SET
		ic.ProductCode=dc.[Product Code],
		ic.[2ndChargeLender]=dc.[2nd Charge Lender],
		ic.[1stChargeValuation]=CONVERT(money,dc.[1st Charge Valuation]),
		ic.[2ndChargeValuation]=CONVERT(money,dc.[2nd Charge Valuation]),
		ic.PropertyTenure=dc.[Property Tenure],
		ic.PrimaryPropertyType=dc.[Primary Property Type]
FROM #vwImportedCase_old ic
	INNER JOIN #DPRCases dc
		ON dc.CaseReference = ic.CaseReference


INSERT #vwImportedCase_old (
		CaseReference,
		ProductCode,
		[2ndChargeLender],
		[1stChargeValuation],
		[2ndChargeValuation],
		PropertyTenure,
		PrimaryPropertyType
		)
SELECT	CaseReference,
		[Product Code],	
		[2nd Charge Lender],	
		CONVERT(money,[1st Charge Valuation]) AS [1st Charge Valuation],
		CONVERT(money,[2nd Charge Valuation]) AS [2nd Charge Valuation],	
		[Property Tenure],
		[Primary Property Type]
FROM #DPRCases dpr 
WHERE NOT EXISTS 
			(	SELECT * 
				FROM #vwImportedCase_old ic 
				WHERE dpr.CaseReference = ic.CaseReference)



IF OBJECT_ID('tempdb..#vwImportedCase') IS NOT NULL DROP TABLE #vwImportedCase
select 
	ROW_NUMBER() OVER (PARTITION BY CaseReference,PrimaryAddress order by PropertyTenure) as row_no,
	*
INTO #vwImportedCase
from (SELECT DISTINCT * FROM #vwImportedCase_old) a


IF OBJECT_ID('tempdb..#PropertyTenure_Dup') IS NOT NULL DROP TABLE #PropertyTenure_Dup
SELECT 
	CaseReference,
		PrimaryAddress, 
		LTRIM(RTRIM(
		MAX(CASE WHEN row_no = 1 THEN ISNULL(PropertyTenure,'') ELSE '' END) +' '+
		MAX(CASE WHEN row_no = 2 THEN ISNULL(PropertyTenure,'') ELSE '' END) +' '+
		MAX(CASE WHEN row_no = 3 THEN ISNULL(PropertyTenure,'') ELSE '' END) +' '+
		MAX(CASE WHEN row_no = 4 THEN ISNULL(PropertyTenure,'') ELSE '' END) +' '+ 
		MAX(CASE WHEN row_no = 5 THEN ISNULL(PropertyTenure,'') ELSE '' END) )) AS PropertyTenure,
		count(*) as co
	INTO #PropertyTenure_Dup
	FROM #vwImportedCase a
	group by CaseReference,PrimaryAddress
	HAVING COUNT(*) >1
	ORDER by CaseReference,PrimaryAddress

	 

	DELETE #vwImportedCase WHERE row_no>1

	UPDATE a
	SET PropertyTenure =b.PropertyTenure
	FROM #vwImportedCase a
		INNER JOIN #PropertyTenure_Dup b
			ON a.CaseReference = b.CaseReference
			AND a.PrimaryAddress = b.PrimaryAddress

--'squash' all addresses associated with each case on to the the same line
-- add product desc
	IF OBJECT_ID('tempdb..#vwImportedCase2') IS NOT NULL DROP TABLE #vwImportedCase2
	SELECT ROW_NUMBER() OVER (PARTITION BY CaseReference order by PrimaryAddress) as row_no2, a.* 
			,COALESCE (b.ProductCodeDesc,b.ProductCodeDesc) AS ProductCodeDesc
	INTO #vwImportedCase2
	FROM #vwImportedCase  a
	LEFT JOIN #Productdesc b
		ON CASE CHARINDEX(' ', a.productcode, 1) WHEN 0 THEN a.productcode ELSE SUBSTRING(a.productcode, 1, CHARINDEX(' ', a.productcode, 1) - 1) END = b.productcode

		

	IF OBJECT_ID('tempdb..#PropertyTenure_Dup2') IS NOT NULL DROP TABLE #PropertyTenure_Dup2
	SELECT CaseReference,
	CASE WHEN LEN(PrimaryAddress) > 2 
		THEN LEFT(PrimaryAddress, LEN(PrimaryAddress)-2)  
		ELSE PrimaryAddress
	END AS PrimaryAddress
	,NumberProperties
	INTO #PropertyTenure_Dup2
	FROM (
	SELECT CaseReference,
		REPLACE(RTRIM(
		MAX(CASE WHEN row_no2 = 1 THEN ISNULL(PrimaryAddress+'|', '') ELSE '' END) +
		MAX(CASE WHEN row_no2 = 2 THEN ISNULL(PrimaryAddress+'|', '') ELSE '' END) +
		MAX(CASE WHEN row_no2 = 3 THEN ISNULL(PrimaryAddress+'|', '') ELSE '' END) +
		MAX(CASE WHEN row_no2 = 4 THEN ISNULL(PrimaryAddress+'|' ,'') ELSE '' END) +
		MAX(CASE WHEN row_no2 = 5 THEN ISNULL(PrimaryAddress+'|' ,'') ELSE '' END) +
		MAX(CASE WHEN row_no2 = 6 THEN ISNULL(PrimaryAddress+'|' ,'') ELSE '' END) +
		MAX(CASE WHEN row_no2 = 7 THEN ISNULL(PrimaryAddress+'|' ,'') ELSE '' END) +
		MAX(CASE WHEN row_no2 = 8 THEN ISNULL(PrimaryAddress+'|' ,'') ELSE '' END) ),': |','| ')
				AS PrimaryAddress,
		COUNT(*) AS NumberProperties
	FROM #vwImportedCase2
	GROUP BY CaseReference
	) b 

	DELETE #vwImportedCase2 WHERE row_no2>1


	UPDATE a
	SET PrimaryAddress =b.PrimaryAddress,
		NumberProperties = b.NumberProperties
	FROM #vwImportedCase2 a
		INNER JOIN #PropertyTenure_Dup2 b
			ON a.CaseReference = b.CaseReference


	IF  EXISTS (SELECT name,*  FROM tempdb.sys.indexes  WHERE object_id = OBJECT_ID('tempdb..#vwImportedCase2')
			AND ISNULL(name,'')<>'PK_vwImportedCase')
	BEGIN
		CREATE UNIQUE CLUSTERED INDEX  PK_vwImportedCase ON #vwImportedCase2 (CaseReference)
	END
	 


IF OBJECT_ID('tempdb..#Borrowertemp2') IS NOT NULL DROP TABLE #Borrowertemp2
SELECT	*
INTO  #Borrowertemp2
FROM (
	SELECT		lo.CBFL_id													AS CaseReference
				,lo.Loan_Id													AS LoanId
				,p.IsPrimary												AS IsPrimaryIndividual
				,0															AS IsPrimaryCompany
				--,row_number()  over (partition by lo.Loan_Id order by p.FkContactId)	 BorrowerId
				,c.ContactId												AS ContactId
				,CONVERT(VARCHAR(1024),ISNULL(c.FirstName,'') +
										CASE	WHEN LTRIM(RTRIM(ISNULL(c.MiddleName,''))) != ''	
												THEN ' '+ISNULL(c.MiddleName,'') ELSE '' 
												END +
										CASE	WHEN LTRIM(RTRIM(ISNULL(c.Surname,''))) != ''		
												THEN ' '+ISNULL(c.Surname,'') ELSE '' 
												END)
																			AS BorrowerName,
				c.Surname													AS Surname,
				'I'															AS BorrowerType
	FROM Dawn_Data.Loan.Loan	lo	
		INNER JOIN	Dawn_Data.Loan.ParticipantOfCase p	
			ON	lo.Loan_Id	=	p.FkLoanId
			INNER JOIN	Dawn_Data.Loan.Contact c	
				ON	p.FkContactId = c.ContactId
	WHERE FkLegalEntityId	=0
	AND	p.FKParticipantTypeId = 1
	AND	p.IsActive = 1
	AND	c.IsActive = 1
	UNION ALL
	SELECT		lo.CBFL_id													AS CaseReference
				,lo.Loan_Id													AS LoanId
				,p.IsPrimary												AS IsPrimaryIndividual
				,l.IsPrimary												AS IsPrimaryCompany
				--,ROW_NUMBER()  OVER (PARTITION BY lo.Loan_Id ORDER BY p.FkContactId)	AS BorrowerId
				,c.ContactId												AS ContactId
				,CONVERT(VARCHAR(1024),ISNULL(c.FirstName,'') +
										CASE	WHEN LTRIM(RTRIM(ISNULL(c.MiddleName,''))) != ''	
												THEN ' '+isnull(c.MiddleName,'') ELSE '' 
												END +
										CASE	WHEN LTRIM(RTRIM(ISNULL(c.Surname,''))) != ''		
												THEN ' '+isnull(c.Surname,'') ELSE '' 
												END)
																			AS BorrowerName,
				c.Surname													AS Surname,
				'C'															AS BorrowerType
	FROM Dawn_Data.Loan.Loan					lo	
		INNER JOIN	Dawn_Data.Loan.ParticipantOfCase p	
			ON	lo.Loan_Id = p.FkLoanId
			INNER JOIN	Dawn_Data.Loan.ContactOfLegalEntity	l	
				ON	p.FkLegalEntityId = l.FkLegalEntityId
				INNER JOIN	Dawn_Data.Loan.Contact c	
				ON	l.FkContactId = c.ContactId	
	WHERE p.FkLegalEntityId	!=0
	AND	p.FKParticipantTypeId = 1
	AND	p.IsActive = 1
	AND	c.IsActive = 1
	AND	l.IsActive = 1) a
	ORDER BY CaseReference, BorrowerType DESC, IsPrimaryCompany DESC,IsPrimaryIndividual DESC


-- This is a fix to remove dup borrowers per case
IF OBJECT_ID('tempdb..#Borrowertemp3') IS NOT NULL DROP TABLE #Borrowertemp3
SELECT * 
into #Borrowertemp3
FROM (
SELECT	* ,
		ROW_NUMBER()  OVER (PARTITION BY CaseReference,BorrowerName ORDER BY BorrowerType DESC, IsPrimaryCompany DESC,IsPrimaryIndividual DESC)	 RowNo
FROM #Borrowertemp2 ) a
WHERE RowNo = 1


IF OBJECT_ID('tempdb..#Borrower') IS NOT NULL DROP TABLE #Borrower
SELECT a.CaseReference,
		ISNULL(MAX(CASE WHEN a.BorrowerId =1 THEN a.Surname ELSE '' END),'')	AS [BorrowerID1_Surname],
		ISNULL(MAX(CASE WHEN a.BorrowerId =1 THEN a.BorrowerName ELSE '' END),'')  AS [BorrowerID1] ,
		ISNULL(MAX(CASE WHEN a.BorrowerId =2 THEN a.BorrowerName ELSE '' END),'')  AS [BorrowerID2] ,
		ISNULL(MAX(CASE WHEN a.BorrowerId =3 THEN a.BorrowerName ELSE '' END),'')  AS [BorrowerID3] ,
		ISNULL(MAX(CASE WHEN a.BorrowerId =4 THEN a.BorrowerName ELSE '' END),'')  AS [BorrowerID4] ,
		ISNULL(MAX(CASE WHEN a.BorrowerId =5 THEN a.BorrowerName ELSE '' END),'')  AS [BorrowerID5] ,
		COUNT(*) As  [Number Borrowers]
		INTO #Borrower
	FROM  (
			SELECT * ,
			ROW_NUMBER()  OVER (PARTITION BY CaseReference ORDER BY BorrowerType DESC, IsPrimaryCompany DESC,IsPrimaryIndividual DESC)	 BorrowerId
			FROM #Borrowertemp3 
			WHERE  NULLIF(BorrowerName,'') IS NOT NULL
			) a
	GROUP BY CaseReference

--Valuation
--------------------------------------------------------------
	
IF OBJECT_ID('tempdb..#CombinedValuation_old') IS NOT NULL DROP TABLE #CombinedValuation_old
SELECT		CaseReference_fixed,
			date_of_valuation_fixed,
			date_of_inspection_fixed,
			Valuation_fixed,
			ReinstatementValue_fixed,
			REPLACE(SecurityAddress_fixed,'Unknown :','') AS SecurityAddress_fixed,
			ValuationStatus_fixed,
			Surveyor_fixed
into #CombinedValuation_old
FROM (
	SELECT	*,
			ROW_NUMBER()  OVER (PARTITION BY CaseReference_fixed,SecurityAddress_fixed ORDER BY date_of_inspection_fixed DESC) AS RowId
	FROM (
SELECT 	CaseReference AS CaseReference_fixed
	,convert(datetime,ValuationDate,103) date_of_valuation_fixed
	,convert(datetime,ValuationDate,103) date_of_inspection_fixed
	,Valuation AS Valuation_fixed
	,ReinstatementValue AS ReinstatementValue_fixed
	,SecurityAddress AS SecurityAddress_fixed
	,ValuationStatus AS ValuationStatus_fixed
	,Surveyor  AS Surveyor_fixed
	from Dawn_Data_Staging.WebLabs.valuation
	union
	select CaseReference
	,convert(datetime,ValuationDate,103) date_of_valuation 
	,convert(datetime,InspectionDate,103) date_of_inspection
	,Valuation
	,ReinstatementValue
	,SecurityAddress
	,ValuationStatus 
	,Surveyor 
FROM Dawn_Data_Staging.DPR_DW.ExportValuation
					) a
				)a
WHERE RowId = 1



IF OBJECT_ID('tempdb..#CombinedValuationtemp') IS NOT NULL DROP TABLE #CombinedValuationtemp
SELECT	*
into #CombinedValuationtemp
FROM (
	SELECT	*,
			ROW_NUMBER()  OVER (PARTITION BY CaseReference,SecurityAddress ORDER BY NULLIF(NULLIF(date_of_inspection,'1900-01-01'),'9999-12-31')  DESC) AS RowId
	FROM (
		SELECT 	v.CaseReference
			,convert(datetime,v.ValuationDate,103) date_of_valuation
			,convert(datetime,v.ValuationDate,103) date_of_inspection--
			,convert(datetime,v.ValuationDate,103) AS date_of_inspection_Fixed1
			,v.Valuation--
			,rv.ReinstatementValue--
			,v.SecurityAddress
			,v.ValuationStatus
			,v.Surveyor --
			FROM Dawn_Data_Staging.WebLabs.valuation v
				LEFT JOIN (	
						SELECT	CaseReference,
								SecurityAddress,
								ReinstatementValue
						FROM (
							SELECT CaseReference,
									SecurityAddress,
									ReinstatementValue,
									ROW_NUMBER()  OVER (PARTITION BY CaseReference,SecurityAddress ORDER BY CONVERT(DATETIME,ValuationDate,103)  DESC) AS RowId
							FROM Dawn_Data_Staging.WebLabs.valuation 
							WHERE ReinstatementValue<>0) a
						WHERE RowId=1) rv
							ON v.CaseReference = rv.CaseReference
							AND v.SecurityAddress = rv.SecurityAddress
		

		UNION
		SELECT	lo.CBFL_id					AS CaseReference,
				NULLIF(v.DateOfValuation,'1900-01-01')			
											AS date_of_valuation,
				NULLIF(NULLIF(v.DateOfInspection,'9999-12-31'),'1900-01-01')			
											AS date_of_inspection,	
				COALESCE(NULLIF(NULLIF(v.DateOfInspection,'9999-12-31'),'1900-01-01'),NULLIF(v.DateOfValuation,'1900-01-01'))
											AS date_of_inspection_Fixed1,
				v.MarketValue				AS Valuation,
				v.ReinstatementValue		AS ReinstatementValue,
				--COALESCE(v.SecurityAddress,s.security_name)			
				--							AS SecurityAddress,
				--v.SecurityAddress			AS SecurityAddress,
				REPLACE(v.SecurityAddress,'Unknown :','') AS SecurityAddress,
				vs.[Description]			AS ValuationStatus,
				NULL						AS Surveyor 
		FROM [Dawn_Data].[Loan].[Loan] lo
			INNER JOIN [Dawn_Data].[Loan].[Valuation] v
				ON lo.loan_id = v.FkLoanId
				left JOIN [Dawn_Data].[Loan].[Security] s
					ON v.FkSecurityId = s.security_id
				INNER JOIN [Dawn_Data].Reference.ValuationStatus vs
					ON v.FkValuationStatusId = vs.ValuationStatusId
		where  v.SecurityAddress 	IS NOT NULL
		
					) a
				)a
WHERE RowId = 1



IF OBJECT_ID('tempdb..#CombinedValuationtemp2') IS NOT NULL DROP TABLE #CombinedValuationtemp2
SELECT		a.CaseReference							AS CaseReference,
			a.date_of_valuation						AS date_of_valuation,
			a.date_of_inspection					AS date_of_inspection,
			a.date_of_inspection_Fixed1				AS date_of_inspection_Fixed1,
			a.Valuation								AS Valuation,
			a.ReinstatementValue					AS ReinstatementValue,
			a.SecurityAddress						AS SecurityAddress,
			a.ValuationStatus						AS ValuationStatus,
			COALESCE(a.Surveyor, b.Surveyor_fixed)	AS Surveyor 
INTO #CombinedValuationtemp2
FROM #CombinedValuationtemp  a
	LEFT JOIN #CombinedValuation_old b
		ON a.CaseReference = b.CaseReference_fixed
		AND a.SecurityAddress = b.SecurityAddress_fixed

  
INSERT #CombinedValuationtemp2
SELECT 
	vco.CaseReference_fixed	,
	NULLIF(vco.date_of_valuation_fixed,'1900-01-01') AS date_of_valuation	,
	NULLIF(vco.date_of_inspection_fixed,'9999-12-31') AS date_of_inspection	,
	NULLIF(vco.date_of_inspection_fixed,'9999-12-31') AS date_of_inspection_Fixed1,
	vco.Valuation_fixed	,
	vco.ReinstatementValue_fixed	,
	vco.SecurityAddress_fixed	,
	vco.ValuationStatus_fixed	,
	Surveyor_fixed	
FROM #CombinedValuation_old vco
WHERE NOT EXISTS 
	(	SELECT * 
		FROM #CombinedValuationtemp2 cv 
		WHERE cv.CaseReference = vco.CaseReference_fixed
		AND	cv.SecurityAddress = vco.SecurityAddress_fixed)


		 

IF OBJECT_ID('tempdb..#CombinedValuationtemp3') IS NOT NULL DROP TABLE #CombinedValuationtemp3
SELECT * 
INTO #CombinedValuationtemp3
FROM (
SELECT	CaseReference,
			date_of_valuation,
			date_of_inspection,
			date_of_inspection_Fixed1,
			--Valuation,
			SUM(Valuation)  OVER (PARTITION BY CaseReference) AS Valuation,
			ReinstatementValue,
			--SUM(ReinstatementValue)  OVER (PARTITION BY CaseReference) AS ReinstatementValue,
			SecurityAddress,
			ValuationStatus,
			Surveyor ,
			ROW_NUMBER()  OVER (PARTITION BY CaseReference ORDER BY Valuation DESC) AS RowId2,RowId
FROM (
		SELECT CaseReference,
				date_of_valuation,
				date_of_inspection,
				date_of_inspection_Fixed1,
				Valuation,
				--SUM(Valuation)  OVER (PARTITION BY CaseReference) AS Valuation,
				ReinstatementValue,
				--SUM(ReinstatementValue)  OVER (PARTITION BY CaseReference) AS ReinstatementValue,
				SecurityAddress,
				ValuationStatus,
				Surveyor  ,
				ROW_NUMBER()  OVER (PARTITION BY CaseReference,SecurityAddress ORDER BY date_of_inspection DESC) AS RowId
		FROM #CombinedValuationtemp2
	WHERE SecurityAddress IS NOT NULL
				)a
WHERE RowId = 1
) b
WHERE RowId2 = 1




--IF OBJECT_ID('tempdb..#DPRValuation') IS NOT NULL DROP TABLE #DPRValuation
--SELECT	MT.ApplicationRef  AS CaseReference,
--		T5.ValuerFirm, 
--		T5.ValuationType	AS [Valuation Basis],
--		ISNULL(CONVERT(varchar,CONVERT(date,T5.ValuationDate)),'') AS ValuationDate,
--		T9.ReinstatementValue
--		--ISNULL(CONVERT(varchar,CONVERT(date,T9.InspectionDate)),'') AS InspectionDate
--INTO #DPRValuation
--FROM
--	[Dawn_Data_Staging].DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAApplication MT

--	LEFT OUTER JOIN [Dawn_Data_Staging].DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMALoanDetails T1
--	ON T1.ApplicationId=MT.Id

--	LEFT OUTER JOIN [Dawn_Data_Staging].DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMASecurity T2
--	ON T2.LoanDetailsId=T1.Id
--	AND T2.IsPrimary=1
--	AND T2.SequenceNumber=1

--	LEFT OUTER JOIN [Dawn_Data_Staging].DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMASecurityContact T3
--	ON T3.SecurityId=T2.Id
--	AND T3.ContactType='Applicant'

--	LEFT OUTER JOIN [Dawn_Data_Staging].DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMAAddress T4
--	ON T4.ParentId=T2.Id 

--	LEFT OUTER JOIN 
--	(
--	SELECT SecurityId
--		, Id
--		, ValuationType
--		, ValuerFirm
--		, ValuationDate
--		, ROW_NUMBER() OVER(PARTITION BY SecurityId ORDER BY ValuationDate DESC) AS PropRank
	
--	FROM [Dawn_Data_Staging].DPR_DW.Latest_Orig_BoM_dbo_morAppFma_FMASecurityValuation a
--	WHERE IsActiveValuation = 1
--	) T5
--	ON T5.SecurityId=T2.Id
--	AND T5.PropRank=1

--	LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAPropertySummary] T6
--       ON T6.SecurityValuationId=T5.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAPropertySurveyDetails] T7
--       ON T7.PropertySummaryId=T6.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAProperty] T8
--       ON T8.PropertySurveyDetailsId=T7.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAPropertyDetail] T9
--       ON T9.PropertyId=T8.Id


UPDATE cv
SET
		ReinstatementValue =ISNULL(COALESCE(NULLIF(cv.ReinstatementValue,0),dv.ReinstatementValue),0) 
FROM #CombinedValuationtemp3 cv
	INNER JOIN #DPRCases dv
		ON cv.CaseReference = dv.CaseReference



IF OBJECT_ID('tempdb..#CombinedValuation') IS NOT NULL DROP TABLE #CombinedValuation
		SELECT cv.CaseReference,
				date_of_valuation,
				date_of_inspection,
				date_of_inspection_Fixed1,
				--Valuation,
				Valuation,
				--ReinstatementValue,
				--ReinstatementValue,
				ISNULL(COALESCE(NULLIF(cv.ReinstatementValue,0),dv.ReinstatementValue),0) AS ReinstatementValue,
				SecurityAddress,
				ValuationStatus,
				COALESCE(NULLIF(cv.Surveyor,'Unknown'), dv.ValuerFirm )  AS Surveyor,
				dv.[Valuation Basis]
		INTO #CombinedValuation
		FROM #CombinedValuationtemp3 cv
			LEFT JOIN #DPRCases dv
				ON cv.CaseReference =dv.CaseReference




--Security
--------------------------------------------------------------
IF OBJECT_ID('tempdb..#Security') IS NOT NULL DROP TABLE #Security
	SELECT CaseReference,
	CASE WHEN LEN([Address]) > 2 
			THEN LEFT([Address], LEN([Address])-2)  
			ELSE [Address]
	END AS [Address]
	,PostCode
	,NumberProperties
	INTO #Security
	FROM (
	SELECT CaseReference,
			REPLACE(RTRIM(
			MAX(CASE WHEN RowId = 1 THEN ISNULL(SecurityAddress+'|', '') ELSE '' END) +
			MAX(CASE WHEN RowId = 2 THEN ISNULL(SecurityAddress+'|', '') ELSE '' END) +
			MAX(CASE WHEN RowId = 3 THEN ISNULL(SecurityAddress+'|', '') ELSE '' END) +
			MAX(CASE WHEN RowId = 4 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 5 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 6 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 7 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 8 THEN ISNULL(SecurityAddress+'|', '') ELSE '' END) +
			MAX(CASE WHEN RowId = 9 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 10 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 11 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 12 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 13 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 14 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) +
			MAX(CASE WHEN RowId = 15 THEN ISNULL(SecurityAddress+'|' ,'') ELSE '' END) ),': |','| ')
									AS [Address],
			MAX(CASE WHEN RowId = 1 THEN ISNULL(post_code, '') ELSE '' END) AS PostCode,
			COUNT(*)				AS NumberProperties
	FROM (
	 SELECT l.CBFL_id  AS CaseReference , 
				s.security_name,
				s.post_code,
				REVERSE(STUFF(REVERSE(
					ISNULL(RTRIM(s.address_1)+',','')	+
					ISNULL(' '+NULLIF(RTRIM(s.address_2),'')+',','')	+
					ISNULL(' '+NULLIF(RTRIM(s.address_3),'')+',','')	+
					ISNULL(' '+NULLIF(RTRIM(s.address_4),'')+',','')	+
					ISNULL(' '+NULLIF(RTRIM(s.county),'')+',','')	+
					ISNULL(' '+NULLIF(RTRIM(s.post_code),'')+',','')	
				), 1, 1, '')) AS SecurityAddress,
				--cv.SecurityAddress,
				--cv.Valuation,
				ROW_NUMBER()  OVER (PARTITION BY l.CBFL_id  ORDER BY ISNULL(cv.Valuation,0) DESC) AS RowId
		from  Dawn_Data.[Loan].[Loan] l
			LEFT JOIN #CombinedValuation cv
				ON l.CBFL_id = cv.CaseReference
			
			INNER JOIN Dawn_Data.[Loan].[SecurityMap] sm
				ON l.loan_id = sm.loan_id
			
				INNER JOIN [Dawn_Data].[Loan].[Security] s
					ON sm.security_id = s.security_id 

					 ) c
		GROUP BY c.CaseReference
		)d
		
--RentalIncome
--------------------------------------------------------------

--IF OBJECT_ID('tempdb..#RentalIncome') IS NOT NULL DROP TABLE #RentalIncome
--SELECT	MT.ApplicationRef AS CaseReference, 
--		SUM(T9.LettingValue) AS RentalIncome,
--		CASE WHEN MAX(T1.LoanType) LIKE '%FIRST%' THEN 'First Charge' ELSE 'Second Charge' END  AS  LoanType
--		INTO #RentalIncome
--FROM 
--        [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMAApplication MT
       
--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMALoanDetails T1
--       ON T1.ApplicationId=MT.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMASecurity T2
--       ON T2.LoanDetailsId=T1.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMASecurityContact T3
--       ON T3.SecurityId=T2.Id
--       AND T3.ContactType='Applicant'

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMAAddress T4
--       ON T4.ParentId=T2.Id 

--       LEFT OUTER JOIN 
--       (
--       SELECT SecurityId
--              , Id
--              , ValuationType
--              , ROW_NUMBER() OVER(PARTITION BY SecurityId ORDER BY ValuationDate DESC) AS PropRank
       
--       FROM [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMASecurityValuation
--       WHERE IsActiveValuation = 1
--       ) T5
--       ON T5.SecurityId=T2.Id
--       AND T5.PropRank=1

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMAPropertySummary T6
--       ON T6.SecurityValuationId=T5.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMAPropertySurveyDetails T7
--       ON T7.PropertySummaryId=T6.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].Latest_Orig_BoM_dbo_morAppFma_FMAProperty T8
--       ON T8.PropertySurveyDetailsId=T7.Id

--	   LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMAPropertyDetail] T9
--       ON T9.PropertyId=T8.Id

--       LEFT OUTER JOIN [Dawn_Data_Staging].[DPR_DW].[Latest_Orig_BoM_dbo_morAppFma_FMASecurityTitleDeedAdmin] T10
--       ON T10.SecurityId = T2.Id

--	   GROUP BY MT.ApplicationRef


--v9.10 
IF OBJECT_ID('tempdb..#RentalIncome') IS NOT NULL DROP TABLE #RentalIncome
SELECT	MT.ApplicationRef AS CaseReference, 
		SUM(T9.LettingValue) AS RentalIncome,
		CASE WHEN MAX(T1.LoanType) LIKE '%FIRST%' THEN 'First Charge' ELSE 'Second Charge' END  AS  LoanType
		INTO #RentalIncome
FROM 
        #Latest_Orig_BoM_dbo_morAppFma_FMAApplication MT
       
       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMALoanDetails T1
       ON T1.ApplicationId=MT.Id

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMASecurity T2
       ON T2.LoanDetailsId=T1.Id

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMASecurityContact T3
       ON T3.SecurityId=T2.Id
       AND T3.ContactType='Applicant'

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAAddress T4
       ON T4.ParentId=T2.Id 

       LEFT OUTER JOIN 
       (
       SELECT SecurityId
              , Id
              , ValuationType
              , ROW_NUMBER() OVER(PARTITION BY SecurityId ORDER BY ValuationDate DESC) AS PropRank
       
       FROM #Latest_Orig_BoM_dbo_morAppFma_FMASecurityValuation
       WHERE IsActiveValuation = 1
       ) T5
       ON T5.SecurityId=T2.Id
       AND T5.PropRank=1

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAPropertySummary T6
       ON T6.SecurityValuationId=T5.Id

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAPropertySurveyDetails T7
       ON T7.PropertySummaryId=T6.Id

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAProperty T8
       ON T8.PropertySurveyDetailsId=T7.Id

	   LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMAPropertyDetail T9
       ON T9.PropertyId=T8.Id

       LEFT OUTER JOIN #Latest_Orig_BoM_dbo_morAppFma_FMASecurityTitleDeedAdmin T10
       ON T10.SecurityId = T2.Id

	   GROUP BY MT.ApplicationRef





----------------------------------------------------------------------------------------------------------------------------------------------
	/*arrears days calc	*/
		declare		 @dfltDateFormat		smallint
					,@CurrentRowIndicator	varchar(16)
					,@CurrentDate			datetime
		select		 @dfltDateFormat		=106
					,@CurrentRowIndicator	='c'
					,@CurrentDate			= getdate()
	
IF OBJECT_ID('tempdb..#DaysInArrears') IS NOT NULL DROP TABLE #DaysInArrears
	
		create table #DaysInArrears(	LoanId					int 
										,Completed				varchar(32)
										,OriginalMaturity		varchar(32)
										,OriginalRedemptionDue	varchar(32)
										,ExpectedRedemptionDue	varchar(32)
										,DaysInArrears			smallint
										)

	
		select CashFlowType_id	into	#CashFlowType	from Dawn_Data.[LoanCalc].[CashflowType]		where	CashflowType		in	('serviced')
		select Transaction_id	into	#TransType		from Dawn_Data.[LoanCalc].[TransactionType]	where	Transaction_Type	in	('Service Interest payment')

		/*arrears
		*/
		--'Serviced'
		insert #DaysInArrears(LoanId,Completed,OriginalMaturity,OriginalRedemptionDue,ExpectedRedemptionDue,DaysInArrears)--,DaysToRedemption,CurrentBalance,CurrBalAsOf)
		select distinct	
							 l.loan_id																LoanId
							,isnull(convert(varchar,h.completion_date,@dfltDateFormat),'')			Completed

							,convert(varchar,dateadd(dd,-1,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(isnull(h.producttermcombination,''),'+')),h.completion_date)),@dfltDateFormat) OriginalMaturity
							,isnull(convert(varchar,h.redeemed_date,@dfltDateFormat),'')			OriginalRedemptionDue
							,isnull(convert(varchar,h.StartDate,@dfltDateFormat),'')				ExpectedRedemptionDue


							,case	when /*no of pmts expected > no of pmts recvd*/
									(	/*no pmts recvd*/
										(select count(*)
										from		Dawn_Data.[LoanCalc].[Transaction]	t
										inner join	#TransType tt on tt.transaction_id = t.transaction_type	
											where   loan_id=l.loan_id and	transaction_date <= @CurrentDate
										)
										<
										/*no of pmts reqd*/
										(select isnull(count(*),0) from	Dawn_Data.[LoanCalc].[CashflowInterest]	i
										inner join	#CashFlowType	c	on c.CashFlowType_id = i.cashflowInterest_type
											where   loan_id=l.loan_id and	cashflowInterest_date < =@CurrentDate
										)
									)
									then	
										/*today-lastdue*/
										datediff(dd
												,(select max(cashflowInterest_date)
													from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
													inner join	#CashFlowType								c
														on c.CashFlowType_id = i.cashflowInterest_type
													where   loan_id=l.loan_id and cashflowInterest_date <= @CurrentDate)
												,@CurrentDate
												)

									when /*no of pmts expected = no of pmts recvd and redemptiondue in past*/
									(
										/*no pmts recvd*/
										(select count(*)
										from Dawn_Data.[LoanCalc].[Transaction]	t
										inner join #TransType tt on tt.transaction_id = t.transaction_type	
										where   loan_id=l.loan_id and	transaction_date <= @CurrentDate
										)
										=
										/*no of pmts reqd*/
										(select isnull(count(*),0) from	Dawn_Data.[LoanCalc].[CashflowInterest]	i
										inner join	#CashFlowType	c	on c.CashFlowType_id = i.cashflowInterest_type
										where   loan_id=l.loan_id and	cashflowInterest_date < =@CurrentDate
										)
										and
										h.redemption_date < @CurrentDate
									)
									then	
										/*today-lastdue*/
										datediff(dd
												,(select max(cashflowInterest_date)
													from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
													inner join	#CashFlowType								c
														on c.CashFlowType_id = i.cashflowInterest_type
													where   loan_id=l.loan_id and cashflowInterest_date <= @CurrentDate
													and cashflowInterest_date is not null
													)
												,@CurrentDate
												)

									else 
										/*up to date,  but not redeemed*/
											abs(
												datediff(
														 dd
														,@CurrentDate
														,dateadd(mm,(select sum(convert(int,value)) from Dawn_Data_v100.dbo.fn_Split(isnull(h.producttermcombination,''),'+')),h.completion_date)
														)
												)+1
									end																DaysInArrears
			from		Dawn_Data.Loan.Loan						l
			left join	Dawn_Data.Loan.History					h	on	h.DIM_loan_id_SSK	=	l.loan_id
			left join	Dawn_Data.[LoanCalc].[CashflowInterest]	cf	on	cf.loan_id			=	l.loan_id 
			left join	#CashFlowType								ct	on	ct.CashFlowType_id	=	cf.cashflowInterest_type

			where	cf.loan_id is not null
				and h.SCDStatus	=	@CurrentRowIndicator
				and	l.redeemed_date	is null
				and cf.cashflowInterest_date is not null
				and dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(isnull(h.producttermcombination,''),'+')),h.completion_date) <= @CurrentDate
				and (datediff(dd
								,@CurrentDate
								,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(isnull(h.producttermcombination,''),'+')),h.completion_date)
								)
						)
				<=0

--Main Query
--------------------------------------------------------------

DECLARE @ReportingDateFormat tinyint;set @ReportingDateFormat = 103
 

IF OBJECT_ID('tempdb..##Report') IS NOT NULL DROP TABLE ##Report

	--declare @Funder varchar(100) ;--select @Funder = 'HSBC'
	--select @Funder = '*All*'

	SELECT	@Funder AS [FunderName]
				--'%All%' AS [FunderName]
					,CASE 
						WHEN  SUBSTRING(c.[Reference],1,3) in ('mr ','ms ') THEN RIGHT(c.[Reference],DATALENGTH(c.[Reference])-2) 
						WHEN  SUBSTRING(c.[Reference],1,4) ='mrs ' THEN RIGHT(c.[Reference],DATALENGTH(c.[Reference])-3) 
						WHEN  SUBSTRING(c.[Reference],1,5) ='miss ' THEN RIGHT(c.[Reference],DATALENGTH(c.[Reference])-4) 
					ELSE c.[Reference] END  AS ReferenceFixed
				,br.[BorrowerID1] AS Reference
				--,convert(int,case when c.[LoanID]=-1 then 0 else c.[LoanID] end) LoanId /*Weblabs internal or DPR*/
				,CASE 
					WHEN  l.CBFL_id like  'M1001%' THEN l.CBFL_id+ISNULL(br.BorrowerID1_Surname ,'')
					ELSE l.CBFL_id
				END AS FinanceCaseReference 
				,l.CBFL_id AS [CaseReference]
				--,l.Loan_Id AS LoanId
				,CASE WHEN  l.CBFL_id like  'M1001%'  THEN CONVERT(INT,REPLACE(l.CBFL_id,'M','')) ELSE ISNULL(lid.LoanID,'') END AS LoanId

				,(	case when	isnull(
										(select	 isnull(loan_amount,0) 
										from Dawn_Data.Loan.History where CBFL_id=l.CBFL_id
										)
								,0)=0
					then
						isnull(
								(select	 isnull(loan_amount,0) 
										+ isnull(TitleInsurance,0)
										--+ isnull(AdministrationFee,0) --PJR 16.05.04
										+ isnull(insurance_cost,0)
										+ isnull(legal_cost,0)
								from Dawn_Data.Loan.Loan where CBFL_id=l.CBFL_id
								)
						,0)
					else
						isnull(
								(select	 isnull(loan_amount,0) 
										+ isnull(TitleInsurance,0)
										--+ isnull(AdministrationFee,0) --PJR 16.05.04
										+ isnull(insurance_cost,0)
										+ isnull(legal_cost,0)
								from Dawn_Data.Loan.History where CBFL_id=l.CBFL_id
								)
						,0) 
					end
					--MW said this not reqd.
					+

					(isnull(
						(Select SUM(isnull(cashflowinterest_amount,0))	
							from		Dawn_Data.Reconciliation.vwStatementCashflowTransactions cf
							inner join	Dawn_Data.Loan.Loan
										l2 on l2.loan_id = cf.loan_id
							where	(		cashflowtypedescription = 'drawdown' 
										or	cashflowtypedescription = 'Further Drawdown'
										or	cashflowtypedescription like '%Further Advance%'
								or	cashflowtypedescription = 'Early Redemption'
								or	cashflowtypedescription = 'Redemption'
									)
								and l2.CBFL_id = l.CBFL_id 
							),0) 
					)
				)																					Total_Loan_BalanceFixed
				,case when	isnull(h.loan_amount,0) =0 
						then isnull(l.loan_amount,0)+isnull(l.TitleInsurance,0)+isnull(l.insurance_cost,0)+ isnull(l.legal_cost,0)
						else isnull(h.loan_amount,0) + isnull(h.TitleInsurance,0)+ isnull(h.insurance_cost,0)+ isnull(h.legal_cost,0)
				END	 + ISNULL(cfi.cashflowinterest_amount,0) 
								AS Total_Loan_Balance
						---------------------------------------------------------------------------------------------------------------------------------------------
			
				,(	case when	isnull(
										(select	 isnull(loan_amount,0) 
										from Dawn_Data.Loan.History where CBFL_id=l.CBFL_id
										)
								,0)=0
					then
						isnull(
							(select	 isnull(loan_amount,0) 
									+ isnull(TitleInsurance,0)
									--+ isnull(AdministrationFee,0) --PJR 16.05.04
									+ isnull(insurance_cost,0)
									+ isnull(legal_cost,0)
							from Dawn_Data.Loan.Loan where CBFL_id=l.CBFL_id
							)
						,0) 
					else
						isnull(
								(select	 isnull(loan_amount,0) 
										+ isnull(TitleInsurance,0)
										--+ isnull(AdministrationFee,0) --PJR 16.05.04
										+ isnull(insurance_cost,0)
										+ isnull(legal_cost,0)
								from Dawn_Data.Loan.History where CBFL_id=l.CBFL_id
								)
						,0) 
					end
				 )
				*
				case when @Funder='*All*' then 1.00 else FunderPct/100.00 END			Loan_AmountFixed
				
				

				,case when	isnull(h.loan_amount,0) =0 
						then isnull(l.loan_amount,0)+isnull(l.TitleInsurance,0)+isnull(l.insurance_cost,0)+ isnull(l.legal_cost,0)
						else isnull(h.loan_amount,0) + isnull(h.TitleInsurance,0)+ isnull(h.insurance_cost,0)+ isnull(h.legal_cost,0)
				END	 *	case when @Funder='*All*' then 1.00 else FunderPct/100.00 END AS	Loan_Amount
	----------------------------------------------------------------------------------------------------------------------------------------------
				,(isnull(
					(Select SUM(isnull(cashflowinterest_amount,0))	
						from		Dawn_Data.Reconciliation.vwStatementCashflowTransactions cf
						inner join	Dawn_Data.Loan.Loan
									l2 on l2.loan_id = cf.loan_id
						where	(	cashflowtypedescription = 'drawdown' 
								or	cashflowtypedescription = 'Further Drawdown'
								or	cashflowtypedescription = 'Early Redemption'
								or	cashflowtypedescription = 'Redemption'
								or	cashflowtypedescription like '%Further Advance%'
								)
							and l2.CBFL_id = l.CBFL_id 
						),0) 
				)		
				*
				case when @Funder='*All*' then 1.00 else FunderPct/100.00 END			Loan_AdjustmentFixed
				,ISNULL(cfi.cashflowinterest_amount,0)  * case when @Funder='*All*' then 1.00 else FunderPct/100.00 END AS Loan_Adjustment
	----------------------------------------------------------------------------------------------------------------------------------------------

				,(
					case when	isnull(
										(select	 isnull(loan_amount,0) 
										from Dawn_Data.Loan.History where CBFL_id=l.CBFL_id
										)
								,0)=0
					then
						isnull(
								(select	 isnull(loan_amount,0) 
										--+ isnull(total_furtheradvance,0) 
										+ isnull(TitleInsurance,0)
										--+ isnull(AdministrationFee,0) --PJR 16.05.04
										+ isnull(insurance_cost,0)
										+ isnull(legal_cost,0)
								from Dawn_Data.Loan.Loan where CBFL_id=l.CBFL_id
								)
						,0)
					else
						isnull(
								(select	 isnull(loan_amount,0) 
										--+ isnull(total_furtheradvance,0) 
										+ isnull(TitleInsurance,0)
										--+ isnull(AdministrationFee,0) --PJR 16.05.04
										+ isnull(insurance_cost,0)
										+ isnull(legal_cost,0)
								from Dawn_Data.Loan.History where CBFL_id=l.CBFL_id
								)
						,0) 
					end
					+
					(isnull(
						(Select SUM(isnull(cashflowinterest_amount,0))	
							from		Dawn_Data.Reconciliation.vwStatementCashflowTransactions cf
							inner join	Dawn_Data.Loan.Loan
										l2 on l2.loan_id = cf.loan_id
							where	(		cashflowtypedescription = 'drawdown' 
										or	cashflowtypedescription = 'Further Drawdown'
										or	cashflowtypedescription like '%Further Advance%'
								or	cashflowtypedescription = 'Early Redemption'
								or	cashflowtypedescription = 'Redemption'
									)
								and l2.CBFL_id = l.CBFL_id 
							),0) 
					)
				)
				*
				case when @Funder='*All*' then 1.00 else FunderPct/100.00 END						Loan_BalanceFixed

				,(case when	isnull(h.loan_amount,0) =0 
						then isnull(l.loan_amount,0)+isnull(l.TitleInsurance,0)+isnull(l.insurance_cost,0)+ isnull(l.legal_cost,0)
						else isnull(h.loan_amount,0) + isnull(h.TitleInsurance,0)+ isnull(h.insurance_cost,0)+ isnull(h.legal_cost,0)
				END	 + ISNULL(cfi.cashflowinterest_amount,0) )
				* (case when @Funder='*All*' then 1.00 else FunderPct/100.00 END)
								AS Loan_Balance

	----------------------------------------------------------------------------------------------------------------------------------------------
				,convert(varchar
						,l.completion_date
						,@ReportingDateFormat)														Completion_Date

				,isnull(
						case when	h.ProductTermCombination is null
							then	
									convert(varchar,
											convert(datetime,
												case when isdate(c.Maturitydate)=1 then c.Maturitydate else null end)
											,@ReportingDateFormat
											)
								else
									convert(varchar,
											(dateadd(dd,-1,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(h.ProductTermCombination,'+')),h.Completion_date)))
											,@ReportingDateFormat
											)
					

						end		,'')														Maturity_Date_fixed
						,isnull(
							convert(varchar,
									(dateadd(dd,-1,dateadd(mm,(select sum(convert(int,replace(value,' ',''))) from Dawn_Data_v100.dbo.fn_Split(h.ProductTermCombination,'+')),h.Completion_date)))
									,@ReportingDateFormat
									)
						,'')																Maturity_Date

				,isnull((select sum(convert(int,replace(value,' ','')))
						from Dawn_Data_v100.dbo.fn_Split(l.term,'+'))
						,0)																			TermFixed

				--,isnull( COALESCE(	
				--		(select SUM(CONVERT(INT,[value]))  AS term from Dawn_Data_v100.[dbo].[fn_Split]( h.ProductTermCombination ,'+')),
				--		(select SUM(CONVERT(INT,[value]))  AS term from Dawn_Data_v100.[dbo].[fn_Split]( h.term ,'+'))
				--	),'')		 																		Term
				,isnull(  
						(select SUM(CONVERT(INT,[value]))  AS term from Dawn_Data_v100.[dbo].[fn_Split]( h.ProductTermCombination ,'+')) 
					 ,'')		 																		Term
				,round( case when isnull(h.monthly_int_amount,0)=0
							then c.InterestRate 
							else (h.monthly_int_amount * 100) - round(isnull(c.BrokerInterestRate,0),4)
						end		,4)				
																									InterestRateFixed

				,round(   (h.monthly_int_amount * 100) - round(isnull(l.monthly_broker_interest_rate,0),4) ,4)		
																				
																									InterestRate


				,round(isnull(c.BrokerInterestRate,0),4)											BrokerInterestRateFixed

				,round(isnull(l.monthly_broker_interest_rate,0),4)									BrokerInterestRate

				,round( case when isnull(h.monthly_int_amount,0)=0
							then isnull(replace(c.TotalMonthlyInterestRate,'% per month',''),0.00)
							else 
								(isnull(h.monthly_int_amount,0.00) * 100)
						end	
					  ,4)																			TotalMonthlyInterestRateFixed

				,round( (isnull(h.monthly_int_amount,0.00) * 100),4)								TotalMonthlyInterestRate

	----------------------------------------------------------------------------------------------------------------------------------------------
				,isnull(c.InterestAmount,0)
				 *case when @Funder='*All*'
						then
							1.00
						else 																	
							case when @Funder='*All*' then 1.00 else FunderPct/100.00 END	
					end																				InterestAmountFixed

				,isnull(l.interest_amount,0)
				 *case when @Funder='*All*' then 1.00 else FunderPct/100.00 END	
																									InterestAmount
						 
			,(select sum(isnull(amount,0)) from Dawn_Data.[LoanCalc].[Transaction] where loan_id=l.loan_id and transaction_type in (14,22,24,28))
			*
			case when @Funder='*All*' then 1.00 else FunderPct/100.00 END
																								InterestAmountAdjustment

			,isnull(c.InterestBalance,0)*	case when @Funder='*All*' then 1.00 else FunderPct/100.00 END	
																								InterestBalanceFixed
			,isnull(l.interest_balance,0)*	case when @Funder='*All*' then 1.00 else FunderPct/100.00 END	
																								InterestBalance 
			--, isnull(c.ProductCode,'')	 As dd
			
			,COALESCE (nullif(c.ProductCodeDesc,''), CASE CHARINDEX(' ', c.ProductCode, 1) WHEN 0 THEN c.ProductCode ELSE SUBSTRING(c.ProductCode, 1, CHARINDEX(' ', c.ProductCode, 1) - 1) END)													ProductCodeFixed
			--,p.ProductCodeDesc
			--,h.product_id
			--,l.product_id  as  product_id_l
			--, isnull(h.ProductDescription,'')+' - '+isnull(h.ProductNames,'')					ProductCode1
			--, isnull(p.ProductCode,'')+' - '+isnull(p.Description,'')							ProductCode2

			,isnull(c.[2ndChargeLender],'Unknown')													[2ndChargeLenderFixed]
			,convert(money,isnull(c.[1stChargeOutstanding],0))										[1stChargeOutstandingFixed]
			,convert(money,isnull(c.[1stChargeValuation],0))										[1stChargeValuationFixed]
			,convert(money,isnull(c.[2ndChargeValuation],0))										[2ndChargeValuationFixed]

			,case when isnull(Dawn_Data_v100.[Report].[fn_getPoolTapeMarketValue_v9](l.CBFL_id),0)>0					
				then	
					isnull(Dawn_Data_v100.[Report].[fn_getPoolTapeMarketValue_v9](l.CBFL_id),0)
				else
					isnull(c.TotalValuation	,0)
			 end																					[TotalValuationFixed]
			,isnull(cv.Valuation,0)																	TotalValuation
			,isnull(cv.[Valuation Basis],'')															ValuationBasis 
			--,isnull(cv.[Valuation Basis],'')															ValuationBasis 
			,Dawn_Data_v100.[Report].[fn_getPoolTapeReinstatementValue_v9](l.CBFL_id)					[ReinstatementValueFixed]
			,isnull(cv.ReinstatementValue,0)														ReinstatementValue

			,case when isnull((select Surveyor from [Report].[fn_getPoolTapeValuer_v9](l.CBFL_id)),'')<>''
				then
					isnull((select Surveyor from [Report].[fn_getPoolTapeValuer_v9](l.CBFL_id)),'')
				else
					isnull(c.Valuer,'Unknown')
			end																						[ValuerFixed]
			,cv.Surveyor																			[Valuer]
			,case when isnull(Dawn_Data_v100.[Report].fn_getPoolTapeMarketValue_v9(l.CBFL_id),0)>0
				then			
					convert(varchar(10),(select ValuationDate 
						from [Report].[fn_getPoolTapeValuationDate_v9](l.CBFL_id)),@ReportingDateFormat)							
				else
					'Unknown'
					--convert(varchar(10),c.DateOfInspection,@ReportingDateFormat)
			end																						[ValuationDateFixed]
			,isnull(convert(varchar(10),cv.date_of_inspection,@ReportingDateFormat),'Unknown')					[ValuationDate]
			
			,--case when isnull(Dawn_Data_v100.[Report].fn_getPoolTapeMarketValue_v9(l.CBFL_id),0)>0
			case when isnull(cv.Valuation,0)>0
				then	(	
							case	when	(select isnull(loan_amount,0) from Dawn_Data.Loan.History where CBFL_id = l.CBFL_id ) <> 0
								then
									convert(money, (
														isnull(	(	select	 isnull(loan_amount,0)
																			+isnull(TitleInsurance,0)
																			--+isnull(Arrangement_fee_out_Value,0)
																			--+isnull(AdministrationFee,0) --PJR 16.05.04
																			+isnull(insurance_cost,0)
																			+isnull([legal_cost],0)
																	from Dawn_Data.Loan.History where CBFL_id=l.CBFL_id 
																)
															,0) 
														+
														isnull(	(Select SUM(isnull(cashflowinterest_amount,0))	
																from		Dawn_Data.Reconciliation.vwStatementCashflowTransactions cf
																inner join	Dawn_Data.Loan.Loan	l2 on l2.loan_id = cf.loan_id
																where	(	cashflowtypedescription = 'drawdown' 
																		or cashflowtypedescription = 'Further Drawdown'
																		--or	cashflowtypedescription = 'Balance Transfer'
																		or	cashflowtypedescription like '%Further Advance%'
																		or	cashflowtypedescription = 'Early Redemption'
																		or	cashflowtypedescription = 'Redemption'
																		)
																	and l2.CBFL_id = l.CBFL_id 
																)
															,0)
												)
											)
								else
									convert(money, (
												select	 isnull(loan_amount,0)
														+isnull(TitleInsurance,0)
														--+isnull(Arrangement_fee_out_Value,0)
														--+isnull(AdministrationFee,0) --PJR 16.05.04
														+isnull(insurance_cost,0)
														+isnull([legal_cost],0)
												from Dawn_Data.Loan.Loan where CBFL_id=l.CBFL_id
												)
											)
							end
						)
						/ 
						--isnull(Dawn_Data_v100.[Report].fn_getPoolTapeMarketValue_v9(l.CBFL_id),1)
						isnull(cv.Valuation,1)
																					
				else
					case when 	isnull(c.[2ndChargeLender],'Unknown') = 'N'
						then
							(	
								case	when	(select isnull(loan_amount,0) from Dawn_Data.Loan.History where CBFL_id = l.CBFL_id ) <> 0
									then
										convert(money, (
															isnull(	(	select	 isnull(loan_amount,0)
																				+isnull(TitleInsurance,0)
																				--+isnull(Arrangement_fee_out_Value,0)
																				--+isnull(AdministrationFee,0) --PJR 16.05.04
																				+isnull(insurance_cost,0)
																				+isnull([legal_cost],0)
																		from Dawn_Data.Loan.History where CBFL_id=l.CBFL_id 
																	)
																,0) 
															+
															isnull(	(Select SUM(isnull(cashflowinterest_amount,0))	
																	from		Dawn_Data.Reconciliation.vwStatementCashflowTransactions cf
																	inner join	Dawn_Data.Loan.Loan	l2 on l2.loan_id = cf.loan_id
																	where	(	cashflowtypedescription = 'drawdown' 
																			or cashflowtypedescription = 'Further Drawdown'
																			--or	cashflowtypedescription = 'Balance Transfer'
																			or	cashflowtypedescription like '%Further Advance%'
																			or	cashflowtypedescription = 'Early Redemption'
																			or	cashflowtypedescription = 'Redemption'
																			)
																		and l2.CBFL_id = l.CBFL_id 
																	)
																,0)
													)
												)
									else
										convert(money, (
													select	 isnull(loan_amount,0)
															+isnull(TitleInsurance,0)
															--+isnull(Arrangement_fee_out_Value,0)
															--+isnull(AdministrationFee,0) --PJR 16.05.04
															+isnull(insurance_cost,0)
															+isnull([legal_cost],0)
													from Dawn_Data.Loan.Loan where CBFL_id=l.CBFL_id
													)
												)
								end
							)
							/
							case when convert(money,isnull(c.[1stChargeValuation],0))>0
								then convert(money,isnull(c.[1stChargeValuation],0))
								else 1.00
							end
						else
							(	
								case	when	(select isnull(loan_amount,0) from Dawn_Data.Loan.History where CBFL_id = l.CBFL_id ) <> 0
									then
										convert(money, (
															isnull(	(	select	 isnull(loan_amount,0)
																				+isnull(TitleInsurance,0)
																				+isnull(insurance_cost,0)
																				+isnull([legal_cost],0)
																		from Dawn_Data.Loan.History where CBFL_id=l.CBFL_id 
																	)
																,0) 
															+
															isnull(	(Select SUM(isnull(cashflowinterest_amount,0))	
																	from		Dawn_Data.Reconciliation.vwStatementCashflowTransactions cf
																	inner join	Dawn_Data.Loan.Loan	l2 on l2.loan_id = cf.loan_id
																	where	(	cashflowtypedescription = 'drawdown' 
																			or cashflowtypedescription = 'Further Drawdown'
																			or	cashflowtypedescription like '%Further Advance%'
																			or	cashflowtypedescription = 'Early Redemption'
																			or	cashflowtypedescription = 'Redemption'
																			)
																		and l2.CBFL_id = l.CBFL_id 
																	)
																,0)
													)
												)
									else
										convert(money, (
													select	 isnull(loan_amount,0)
															+isnull(TitleInsurance,0)
															+isnull(insurance_cost,0)
															+isnull([legal_cost],0)
													from Dawn_Data.Loan.Loan where CBFL_id=l.CBFL_id
													)
												)
								end
							)
							
							/

							case when convert(money,isnull(c.[2ndChargeValuation],0))>0
								then convert(money,isnull(c.[2ndChargeValuation],0))
								else 1.00
							end

					end
				end																					[LTV]
				,ISNULL(dia.DaysInArrears,0) 																[Days Past Redemption]

							 ,sc.NumberProperties		[Number Properties]

			,isnull(c.PrimaryAddress,'')															[Primary AddressFixed]
			,isnull(sc.Address,'')																	[Primary Address]
			,upper(isnull(c.PrimaryPostcode,'')	)													[Primary PostcodeFixed]	 
			,upper(isnull(sc.PostCode,''))															[Primary Postcode]
			,isnull(c.PrimaryPropertyType,'')														[Primary Property Type]	
			
			--,isnull((select COUNT(*) 
			--	from #Borrower where CaseReference=l.CBFL_id
			--  ),0)																					[Number Borrowers]
			,isnull(br.[Number Borrowers],0)															AS  [Number Borrowers]

			,c.PropertyTenure																		[Property Tenure] 
			 ,ISNULL(ri.RentalIncome,0)											[Annual Rental]
					
			,isnull((select case when exists
				(select * from Dawn_Data.Loan.ParticipantOfCase 
					where FkLoanId=l.loan_id
					and FkLegalEntityId!=0 and FKParticipantTypeId=1
				) then 'Corporate' else 'Individual' end
			 ),'')																					[Individual/CorporateFixed]

			 ,CASE WHEN cor.Loan_Id IS NOT NULL THEN 'Corporate' ELSE 'Individual' END   AS [Individual/Corporate]
			,ISNULL(convert(varchar(255),br.[BorrowerID1]),'')													[BorrowerID1]
			,ISNULL(convert(varchar(255),br.[BorrowerID2]),'')													[BorrowerID2]	 
			,ISNULL(convert(varchar(255),br.[BorrowerID3]),'')													[BorrowerID3]	 
			,ISNULL(convert(varchar(255),br.[BorrowerID4]),'')													[BorrowerID4]	 
			,ISNULL(convert(varchar(255),br.[BorrowerID5]),'')													[BorrowerID5]
			,ISNULL(ccj.[Number CCJs],0) AS [Number CCJs]
			--,ISNULL(ccj.[CCJ Amount],0) AS [CCJ Amount]
			,fol.[Funder1Pct]
			,fol.[Funder2Pct]
			,fol.[Funder3Pct]
			,fol.[Funder4Pct]
			,fol.[Funder5Pct]
			,fol.[Funder6Pct]
			,fol.[Funder7Pct]
			,fol.[Funder8Pct]
			,fol.[Funder9Pct]
			,fol.[Funder10Pct]
			,fol.[Funder11Pct]
			,fol.[Funder12Pct]
			,fol.[Funder13Pct]
			,fol.[Funder14Pct]
			,fol.[Funder15Pct]
			,case when @Funder='*All*' then 1.00 else FunderPct/100.00 END as Perc
		into ##report
-- select COUNT(*)
FROM Dawn_Data.Loan.Loan l
	LEFT JOIN #FunderIdList fil
		ON l.Loan_Id = fil.fkLoanId
	LEFT JOIN Dawn_Data.Loan.History h	
		ON	h.DIM_loan_id_sSK	= l.loan_id
		
		--LEFT JOIN  Dawn_Data.[Product].[Product] p
		--LEFT JOIN #Productdesc p
		--	ON  h.product_id = p.ProductId 
			
 
	LEFT JOIN #vwImportedCase2	c	
		ON	c.CaseReference		=	l.CBFL_id

	LEFT JOIN #RentalIncome ri
		ON	ri.CaseReference = l.CBFL_id
	LEFT JOIN #CombinedValuation  cv
		ON	cv.CaseReference = l.CBFL_id


	LEFT JOIN #Security sc 
		ON sc.CaseReference = l.CBFL_id 
	LEFT JOIN #Borrower br	on	
			br.CaseReference		=	l.CBFL_id
	LEFT JOIN #Corporate cor	on	
			cor.Loan_Id		=	l.Loan_Id
	LEFT JOIN #cashflowinterest cfi	on	
			cfi.Loan_Id		=	l.Loan_Id
	LEFT JOIN #FunderOfLoan fol	on	
			fol.Loan_Id		=	l.Loan_Id

		
	LEFT JOIN #ccj ccj	on	
			l.CBFL_id		=	ccj.CaseReference
	LEFT JOIN #wl_loanid lid	on	
			l.CBFL_id		=	lid.CaseReference	
	LEFT JOIN #DaysInArrears dia	on	
			l.Loan_Id		=	dia.LoanId	
WHERE  l.redeemed_date is null	AND  l.loan_id  in (select fkLoanId from #FunderIdList)

 
IF @test = 0
BEGIN
	
INSERT [Dawn_Data_Reporting].[Report].[PoolTapeByFunderReport] (
		[FunderName],
		[Reference],
		[LoanId],
		[FinanceCaseReference],
		[CaseReference],
		[Total_Loan_Balance],
		[Loan_Amount],
		[Loan_Adjustment],
		[Loan_Balance],
		[Completion_Date],
		[Maturity_Date],
		[Term],
		[InterestRate],
		[BrokerInterestRate],
		[TotalMonthlyInterestRate],
		[InterestAmount],
		[InterestAmountAdjustment],
		[InterestBalance],
		[ProductCode],
		[2nd Charge Lender],
		[1st Charge Outstanding],
		[1st Charge Valuation],
		[2ndChargeValuation],
		[Total Valuation],
		[Valuation Basis],
		[Reinstatement Value],
		[Valuer],
		[Valuation Date],
		[LTV],
		[Days Past Redemption],
		[Number Properties],
		[Primary Address],
		[Primary Postcode],
		[Primary Property Type],
		[Number Borrowers],
		[Property Tenure],
		[Annual Rental],
		[Individual/Corporate],
		[BorrowerID1],
		[BorrowerID2],
		[BorrowerID3],
		[BorrowerID4],
		[BorrowerID5],
		[Funder1Pct],
		[Funder2Pct],
		[Funder3Pct],
		[Funder4Pct],
		[Funder5Pct],
		[Funder6Pct],
		[Funder7Pct],
		[Funder8Pct],
		[Funder9Pct],
		[Funder10Pct],
		[Funder11Pct],
		[Funder12Pct],
		[Funder13Pct],
		[Funder14Pct],
		[Funder15Pct],
		[Number CCJs])
SELECT	 [FunderName]
		,[Reference]
		,LoanId
		,FinanceCaseReference
		,[CaseReference]
		,Total_Loan_Balance
		,Loan_Amount
		,Loan_Adjustment
		,Loan_Balance
		,Completion_Date
		,Maturity_Date
		,Term
		,InterestRate
		,BrokerInterestRate
		,TotalMonthlyInterestRate
		,InterestAmount
		,InterestAmountAdjustment
		,InterestBalance
		,ProductCodeFixed AS ProductCode
		--,ProductCode1
		--,ProductCode2
		,[2ndChargeLenderFixed] AS [2ndChargeLender]
		,[1stChargeOutstandingFixed] AS [1stChargeOutstanding]
		,[1stChargeValuationFixed] AS [1stChargeValuation]
		,[2ndChargeValuationFixed] AS [2ndChargeValuation]
		,[TotalValuation]
		,[ValuationBasis]
		,[ReinstatementValue]
		,[Valuer]
		,[ValuationDate]
		,[LTV]
		,[Days Past Redemption]
		,[Number Properties]
		,[Primary Address]
		,[Primary Postcode]	 
		,[Primary Property Type]	
		,[Number Borrowers]
		,[Property Tenure] 
		,[Annual Rental]
		,[Individual/Corporate]
		,[BorrowerID1]
		,[BorrowerID2]
		,[BorrowerID3]
		,[BorrowerID4]
		,[BorrowerID5]
		,[Funder1Pct]
		,[Funder2Pct]
		,[Funder3Pct]
		,[Funder4Pct]
		,[Funder5Pct]
		,[Funder6Pct]
		,[Funder7Pct]
		,[Funder8Pct]
		,[Funder9Pct]
		,[Funder10Pct]
		,[Funder11Pct]
		,[Funder12Pct]
		,[Funder13Pct]
		,[Funder14Pct]
		,[Funder15Pct]
		,[Number CCJs]
	--INTO ##Report2
	FROM ##Report 
	ORDER BY [CaseReference]
END
ELSE
BEGIN
SELECT	 [FunderName]
		,[Reference]
		,LoanId
		,FinanceCaseReference
		,[CaseReference]
		,Total_Loan_Balance
		,Loan_Amount
		,Loan_Adjustment
		,Loan_Balance
		,Completion_Date
		,Maturity_Date
		,Term
		,InterestRate
		,BrokerInterestRate
		,TotalMonthlyInterestRate
		,InterestAmount
		,InterestAmountAdjustment
		,InterestBalance
		,ProductCodeFixed AS ProductCode
		--,ProductCode1
		--,ProductCode2
		,[2ndChargeLenderFixed] AS [2ndChargeLender]
		,[1stChargeOutstandingFixed] AS [1stChargeOutstanding]
		,[1stChargeValuationFixed] AS [1stChargeValuation]
		,[2ndChargeValuationFixed] AS [2ndChargeValuation]
		,[TotalValuation]
		,[ValuationBasis]
		,[ReinstatementValue]
		,[Valuer]
		,[ValuationDate]
		,[LTV]
		,[Days Past Redemption]
		,[Number Properties]
		,[Primary Address]
		,[Primary Postcode]	 
		,[Primary Property Type]	
		,[Number Borrowers]
		,[Property Tenure] 
		,[Annual Rental]
		,[Individual/Corporate]
		,[BorrowerID1]
		,[BorrowerID2]
		,[BorrowerID3]
		,[BorrowerID4]
		,[BorrowerID5]
		,[Funder1Pct]
		,[Funder2Pct]
		,[Funder3Pct]
		,[Funder4Pct]
		,[Funder5Pct]
		,[Funder6Pct]
		,[Funder7Pct]
		,[Funder8Pct]
		,[Funder9Pct]
		,[Funder10Pct]
		,[Funder11Pct]
		,[Funder12Pct]
		,[Funder13Pct]
		,[Funder14Pct]
		,[Funder15Pct]
		,[Number CCJs]
	--INTO ##Report2
	FROM ##Report 
	ORDER BY [CaseReference]
END


END

GO
/****** Object:  StoredProcedure [Report].[PoolTapeByFunderGeneratorLoop_v9]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [Report].[PoolTapeByFunderGeneratorLoop_v9] 
as 
begin

DELETE [Dawn_Data_Reporting].[Report].[PoolTapeByFunderReport]


Select distinct
            *
      into #Funders
      from
      (
            Select
                        0 as FunderId,
                        '*All*' as FunderName,
                        0  as DisplayOrder
            Union
                  Select distinct
                              Funder_ID as FunderId,
                              Funder_Name as FunderName,
                              ROW_NUMBER() OVER (ORDER BY funder_name) DisplayOrder
                        from
                              [Dawn_Data].[Reference].[Funders]
      ) FI
      order by
            fi.DisplayOrder,
            fi.FunderName ;

-- Select * from #Funders ;

Declare @idx int = 0 ;
Declare @numOfFunders int = ( Select COUNT(*) from #Funders ) ;
Declare @funderName nvarchar(255) ;

While (@idx < @numOfFunders)
Begin
      Select
                  @funderName = FunderName
            from
                  #Funders
            where
                  DisplayOrder = @idx ;

    -- Print @funderName + '  (' + Cast(@idx + 1 As nvarchar) + '/' + Cast(@numOfFunders as nvarchar) + ')'

      Exec [Report].PoolTapeByFunderGenerator_v9 @FunderName,0

      Select @idx = @idx + 1
End
END


GO
/****** Object:  StoredProcedure [Report].[ServicedLoanReport]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Report].[ServicedLoanReport]
	@ReportDate DateTime
AS

BEGIN

SELECT @ReportDate = DATEADD(month, DATEDIFF(month, 0, @ReportDate), 0)

CREATE TABLE #ReportData (
	LoanId Int,
	CaseReference NVarChar(255),
	BorrowerName NVarChar(512),
	PrimarySecurity VarChar(max),
	CompletionDate DateTime,
	RedemptionDueDate DateTime,
	ServicingStartDate DateTime,
	RedeemedDate DateTime,
	ServicedTerm VarChar(10),
	CountOfPayments Int,
	AmountReceived Int,
	ServicingAmount Money,
	Month1Status Int,
	Month1Amount Money,
	Month1DateDue DateTime,
	Month1DatePaid DateTime,
	Month2Status Int,
	Month2Amount Money,
	Month2DateDue DateTime,
	Month2DatePaid DateTime,
	Month3Status Int,
	Month3Amount Money,
	Month3DateDue DateTime,
	Month3DatePaid DateTime,
	Month4Status Int,
	Month4Amount Money,
	Month4DateDue DateTime,
	Month4DatePaid DateTime,
	Month5Status Int,
	Month5Amount Money,
	Month5DateDue DateTime,
	Month5DatePaid  DateTime,
	Month6Status Int,
	Month6Amount Money,
	Month6DateDue DateTime,
	Month6DatePaid DateTime
)

INSERT INTO #ReportData(LoanId, CaseReference, CompletionDate, RedemptionDueDate, RedeemedDate, ServicingStartDate, ServicedTerm)
SELECT DISTINCT 
	l.loan_id,
	l.CBFL_id,
	l.completion_date,
	h.redeemed_date, -- seems to be the predicted redemption date
	l.redeemed_date,
	CASE h.ProductInterestTypeId
		WHEN 1 THEN l.completion_date
		ELSE DATEADD(mm, CONVERT(Int, SUBSTRING(h.ProductTermCombination, 0, CHARINDEX('+', h.ProductTermCombination))), l.completion_date)
		END,
	h.ProductTermCombination
FROM 
	Dawn_Data.Loan.Loan l, 
	Dawn_Data.LoanCalc.CashFlowInterest i,
	Dawn_Data.Loan.History h
	LEFT OUTER JOIN Dawn_Data.Product.TermCombinations tc ON h.ProductTermCombinationsId = tc.ProductTermCombinationsID
	LEFT OUTER JOIN Dawn_Data.Product.Term t ON tc.TermMonthId = t.TermMonthId
WHERE l.Loan_id = h.DIM_loan_id_SSK
  AND h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND cashflowInterest_date BETWEEN @ReportDate AND DATEADD(m, 6, @ReportDate)
  AND h.ProductTermCombination IS NOT NULL
  AND cashflowInterest_Date < h.redeemed_date

-- Get all the serviced interest payments
SELECT DISTINCT 
	l.loan_id As LoanId,
	i.cashflowInterest_amount As Amount,
	i.cashflowInterest_date As Date,
	CONVERT(DateTime, 0) As PaidDate,
	DATEADD(month, DATEDIFF(month, 0, i.cashflowInterest_date), 0) As MonthStart,
	CONVERT(Money, 0) As CumulativeAmount,
	CONVERT(Money, 0) As CumulativeActual,
	CONVERT(Money, 0) As TotalActual,
	0 As PaidOnTime,
	0 As Paid
INTO #ServicedInterestDue
FROM 
	#ReportData r,
	Dawn_Data.Loan.Loan l, 
	Dawn_Data.Loan.History h,
	Dawn_Data.LoanCalc.CashFlowInterest i
WHERE r.LoanId = l.loan_id
  AND l.Loan_id = h.DIM_loan_id_SSK
  AND h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
  AND SCDStatus = 'C'
  AND cashflowInterest_type = 16
  AND h.ProductTermCombination IS NOT NULL
  AND i.cashflowInterest_date <= COALESCE(r.RedeemedDate, r.RedemptionDueDate) --fix for issue where serviced interest payments are being calculated and stored past maturity date.
  
-- Work out the cumulative amount due
UPDATE #ServicedInterestDue
SET CumulativeAmount = (SELECT SUM(Amount) 
						FROM #ServicedInterestDue x 
						WHERE x.LoanId = #ServicedInterestDue.LoanId 
						  AND x.Date <= #ServicedInterestDue.Date)


-- Get actual interest payments
SELECT DISTINCT
	t.loan_id As LoanId, 
	t.Amount, 
	t.transaction_date As Date,
	(SELECT SUM(x.Amount) FROM Dawn_Data.LoanCalc.[Transaction] x WHERE x.loan_id = r.LoanId AND x.transaction_date <= t.transaction_date AND x.transaction_type = 18) As CumulativeAmount
INTO #ActualInterestPayments
FROM #ReportData r
JOIN Dawn_Data.LoanCalc.[Transaction] t ON r.LoanId = t.Loan_id
WHERE t.transaction_type = 18

-- Work out actual cumulative/totals
UPDATE #ServicedInterestDue
SET CumulativeActual = (SELECT SUM(Amount) 
						FROM #ActualInterestPayments x 
						WHERE x.LoanId = #ServicedInterestDue.LoanId 
						  AND x.Date <= #ServicedInterestDue.Date),
	TotalActual = (SELECT SUM(Amount)
					FROM #ActualInterestPayments x 
						WHERE x.LoanId = #ServicedInterestDue.LoanId),
	PaidDate = (SELECT MIN(a.Date)
				FROM #ActualInterestPayments a
				WHERE a.LoanId = #ServicedInterestDue.LoanId
				  AND a.CumulativeAmount * -1 >= #ServicedInterestDue.CumulativeAmount)

-- Work out whether paid on time
UPDATE #ServicedInterestDue
SET PaidOnTime = CASE WHEN CumulativeAmount + CumulativeActual <= 0 THEN 1 ELSE 0 END,
	Paid = Case WHEN CumulativeAmount + TotalActual <= 0 THEN 1 ELSE 0 END

-- SELECT * FROM #ServicedInterestDue WHERE LoanId = 1067
-- SELECT * FROM #ActualInterestPayments WHERE LoanId = 1067

UPDATE #ReportData
SET CountOfPayments = (SELECT COUNT(*)
						FROM 
							Dawn_Data.Loan.Loan l, 
							Dawn_Data.LoanCalc.CashFlowInterest i,
							Dawn_Data.Loan.History h
						WHERE #ReportData.Loanid = l.loan_id
						  AND l.Loan_id = h.DIM_loan_id_SSK
						  AND h.DIM_loan_id_DWSK = i.DIM_loan_id_DWSK
						  AND SCDStatus = 'C'
						  AND cashflowInterest_type = 16
						  AND i.cashflowInterest_date <= h.redeemed_date)


-- Attempt to get Legal Entity Name first, if there is one
UPDATE #ReportData
SET BorrowerName = (SELECT TOP 1 e.LegalEntityName
					FROM Dawn_Data.Loan.ParticipantOfCase c, Dawn_Data.Loan.LegalEntity e
					WHERE c.FkLoanId = #ReportData.LoanId
					  AND c.FkLegalEntityId = e.LegalEntityId
					  AND c.FKParticipantTypeId = 1)

-- Otherwise get borrower name
UPDATE #ReportData
SET BorrowerName = (SELECT TOP 1 ISNULL(co.FirstName, '') + ' ' + ISNULL(co.Surname, '')
					FROM Dawn_Data.Loan.ParticipantOfCase c, Dawn_Data.Loan.Contact co
					WHERE c.FkLoanId = #ReportData.LoanId
					  AND c.FkContactId = co.ContactId
					  AND c.FKParticipantTypeId = 1)
WHERE BorrowerName IS NULL

UPDATE #ReportData
SET PrimarySecurity = (SELECT TOP 1 ISNULL(s.address_1 , '')
						FROM Dawn_Data.Loan.SecurityMap m, Dawn_Data.Loan.Security s
						WHERE m.loan_id = #ReportData.LoanId
						  AND m.security_id = s.security_id)

UPDATE #ReportData
SET AmountReceived = ISNULL((SELECT SUM(ABS(Amount))
						FROM #ActualInterestPayments a
						WHERE a.LoanId = #ReportData.LoanId), 0)

DECLARE @i Int, @Sql NVarChar(4000), @ParamDefinition NVarChar(500)
SET @i = 1

WHILE @i <= 6
	BEGIN
	
	--SELECT * FROM #ReportData WHERE LoanId = 1347

		SET @Sql = 'UPDATE #ReportData
					SET Month' + CONVERT(VarChar, @i) + 'Amount = ISNULL(si.Amount, 0),
						Month' + CONVERT(VarChar, @i) + 'Status = CASE 
											WHEN #ReportData.RedeemedDate IS NOT NULL AND @ReportDate = DATEADD(month, DATEDIFF(month, 0, #ReportData.RedeemedDate), 0) THEN 6 -- Early Redemption
											WHEN si.PaidOnTime = 1 THEN 1	-- Paid On Time
											WHEN si.Paid = 1 THEN 2			-- Paid Late
											WHEN si.Date > GETDATE() THEN 0 -- Future Payment
											WHEN si.LoanId IS NOT NULL THEN 3 -- Payment scheduled but missed
											WHEN @ReportDate > #ReportData.RedeemedDate THEN 4 -- Loan Finished -- redeemed date seems to be full redemption date, not redemption due date
											WHEN @ReportDate < #ReportData.CompletionDate THEN 5 -- Loan Not Started
											WHEN #ReportData.RedeemedDate IS NULL AND @ReportDate = DATEADD(month, DATEDIFF(month, 0, #ReportData.RedemptionDueDate), 0) THEN 8 -- Redemption Due
											WHEN #ReportData.RedeemedDate IS NULL AND @ReportDate > DATEADD(month, DATEDIFF(month, 0, #ReportData.RedemptionDueDate), 0) THEN 4 -- Loan Finished
											ELSE 7 -- Interest Retained
										END,
						Month' + CONVERT(VarChar, @i) + 'DateDue = ISNULL(si.Date, 0),
						Month' + CONVERT(VarChar, @i) + 'DatePaid = ISNULL(si.PaidDate, 0)
					FROM #ReportData
						LEFT OUTER JOIN #ServicedInterestDue si ON si.MonthStart = @ReportDate AND si.LoanId = #ReportData.LoanId'

		SET @ParamDefinition = '@ReportDate DateTime'

		EXEC sp_executeSql @Sql, @ParamDefinition, @ReportDate

		SELECT @ReportDate = DATEADD(month, 1, @ReportDate)

		SET @i = @i + 1
	END

-- Delete any items from the report that have no payments (i.e. they're all retained or redeemed)
DELETE #ReportData
WHERE Month1Status NOT IN (0, 1, 2, 3)
  AND Month2Status NOT IN (0, 1, 2, 3)
  AND Month3Status NOT IN (0, 1, 2, 3)
  AND Month4Status NOT IN (0, 1, 2, 3)
  AND Month5Status NOT IN (0, 1, 2, 3)
  AND Month6Status NOT IN (0, 1, 2, 3)

SELECT * 
FROM #ReportData
ORDER BY ServicingStartDate

END
GO
/****** Object:  StoredProcedure [Report].[StandingOrdersRegister]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[StandingOrdersRegister]	@FromDate varchar(11) , @ToDate varchar(11)
									,@message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try

		select 282 as LoanId,'Borrower name A' as BorrowerName, 'HSBC' as FunderName ,'XXXXXX case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as CompletionDate,'29-Jan-2015' as RedemptionDueDate,'12 Months' as ServicedTerm,'29-Mar-2015' as EOM,3 as NoOfPayments,99999999.99 as AmountReceived,'29 Acacia Avenue, Bland Town, BlandCounty' as PropertyAddress,999999.99 as ServicingAmount,0 as IsDiarised,0 as BankDetailsSent
		union
		select 282 as LoanId,'Borrower name	B' as BorrowerName, 'HSBC' as FunderName ,'XXXXXX case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as CompletionDate,'29-Jan-2015' as RedemptionDueDate,'12 Months' as ServicedTerm,'29-Mar-2015' as EOM,3 as NoOfPayments,99999999.99 as AmountReceived,'29 Acacia Avenue, Bland Town, BlandCounty' as PropertyAddress,999999.99 as ServicingAmount,0 as IsDiarised,0 as BankDetailsSent
		union
		select 282 as LoanId,'Borrower name C' as BorrowerName, 'HSBC' as FunderName ,'XXXXXX case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as CompletionDate,'29-Jan-2015' as RedemptionDueDate,'12 Months' as ServicedTerm,'29-Mar-2015' as EOM,3 as NoOfPayments,99999999.99 as AmountReceived,'29 Acacia Avenue, Bland Town, BlandCounty' as PropertyAddress,999999.99 as ServicingAmount,1 as IsDiarised,1 as BankDetailsSent
		union
		select 282 as LoanId,'Borrower name D' as BorrowerName, 'HSBC' as FunderName ,'XXXXXX case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as CompletionDate,'29-Jan-2015' as RedemptionDueDate,'12 Months' as ServicedTerm,'29-Mar-2015' as EOM,3 as NoOfPayments,99999999.99 as AmountReceived,'29 Acacia Avenue, Bland Town, BlandCounty' as PropertyAddress,999999.99 as ServicingAmount,1 as IsDiarised,1 as BankDetailsSent
		union
		select 282 as LoanId,'Borrower name E' as BorrowerName, 'HSBC' as FunderName ,'XXXXXX case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as CompletionDate,'29-Jan-2015' as RedemptionDueDate,'12 Months' as ServicedTerm,'29-Mar-2015' as EOM,3 as NoOfPayments,99999999.99 as AmountReceived,'29 Acacia Avenue, Bland Town, BlandCounty' as PropertyAddress,999999.99 as ServicingAmount,1 as IsDiarised,1 as BankDetailsSent
		union
		select 282 as LoanId,'Borrower name F' as BorrowerName, 'HSBC' as FunderName ,'XXXXXX case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as CompletionDate,'29-Jan-2015' as RedemptionDueDate,'12 Months' as ServicedTerm,'29-Mar-2015' as EOM,3 as NoOfPayments,99999999.99 as AmountReceived,'29 Acacia Avenue, Bland Town, BlandCounty' as PropertyAddress,999999.99 as ServicingAmount,1 as IsDiarised,1 as BankDetailsSent

		select @rc=0

	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:

ExitOk:
end

GO
/****** Object:  StoredProcedure [Report].[valuationGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Report].[valuationGet] as begin

	set nocount on

	select
		Vw.CaseReference
		,convert(varchar,Vw.Date_of_Valuation,106) Date_of_Valuation
		,Vw.Valuation
		,Vw.Market_Value_of_Security
		,Vw.[90 day_value_of_security]
		,Vw.GDV
		,Vw.GDV_90_day
		,Vw.Rental_value
		,Vw.[re-instatement_value]
		,Vw.ValuationStatus
		,Vw.SecurityAddress
		,Vw.ValueAfterWorks
		,Vw.[90DayValueAfterWorks]
		,Vw.Surveyor
		,v.Created				 DateImported
		,v.ValuationId
	into #v
	from		[Dawn_Data].[Loan].[ValuationVW]	Vw
	inner join	[Dawn_Data].[Loan].Valuation		v		on	v.ValuationId	=	vw.ValuationId
--	order by
--			Vw.CaseReference,Vw.Date_of_Valuation desc

	--select
	--*
	--from #v
	--where CaseReference='ZIETZIG_LTD2469/05/2015'

	--select max(valuationid) from #v --where --CaseReference = 'ZIETZIG_LTD2469/05/2015'
	--						group by 
	--						CaseReference
	--	,Date_of_Valuation
	--	,Valuation
	--	,Market_Value_of_Security
	--	,[90 day_value_of_security]
	--	,GDV
	--	,GDV_90_day
	--	,Rental_value
	--	,[re-instatement_value]
	--	,ValuationStatus

	--	,ltrim(rtrim(SecurityAddress))

	--	,ValueAfterWorks
	--	,[90DayValueAfterWorks]
	--	,Surveyor

	select
		distinct
		 CaseReference
		,Date_of_Valuation
		,Valuation
		,Market_Value_of_Security
		,[90 day_value_of_security]
		,GDV
		,GDV_90_day
		,Rental_value
		,[re-instatement_value]
		,ValuationStatus
		,SecurityAddress
		,ValueAfterWorks
		,[90DayValueAfterWorks]
		,Surveyor
	from	#v
	where valuationId in (select max(valuationid) from #v where CaseReference = #v.CaseReference
							group by 
							CaseReference
		,Date_of_Valuation
		,Valuation
		,Market_Value_of_Security
		,[90 day_value_of_security]
		,GDV
		,GDV_90_day
		,Rental_value
		,[re-instatement_value]
		,ValuationStatus
		,SecurityAddress
		,ValueAfterWorks
		,[90DayValueAfterWorks]
		,Surveyor
	)

	order by
	CaseReference, Date_of_Valuation desc
	--and
	--#v.CaseReference='ZIETZIG_LTD2469/05/2015'
end
GO
/****** Object:  StoredProcedure [Report].[valuationGet_v2]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Report].[valuationGet_v2] as begin

	set nocount on

	select
		Vw.CaseReference
		,convert(varchar,Vw.DateofInspection,106) Date_of_Inspection
		,convert(varchar,Vw.Date_of_Valuation,106) Date_of_Valuation
		,Vw.Valuation
		,Vw.Market_Value_of_Security
		,Vw.[90 day_value_of_security]
		,Vw.GDV
		,Vw.GDV_90_day
		,Vw.Rental_value
		,Vw.[re-instatement_value]
		,Vw.ValuationStatus
		,Vw.SecurityAddress
		,Vw.ValueAfterWorks
		,Vw.[90DayValueAfterWorks]
		,Vw.Surveyor
		,v.Created				 DateImported
		,v.ValuationId
	into #v
	--select *
	from		[Dawn_Data].[Loan].[ValuationVW]	Vw
	inner join	[Dawn_Data].[Loan].Valuation		v		on	v.ValuationId	=	vw.ValuationId

	select
		distinct
		 CaseReference
		,Date_Of_Inspection
		,Date_of_Valuation
		,Valuation
		,Market_Value_of_Security
		,[90 day_value_of_security]
		,GDV
		,GDV_90_day
		,Rental_value
		,[re-instatement_value]
		,ValuationStatus
		,SecurityAddress
		,ValueAfterWorks
		,[90DayValueAfterWorks]
		,Surveyor
	from	#v
	where valuationId in (select max(valuationid) from #v where CaseReference = #v.CaseReference
							group by 
							 CaseReference
							,Date_of_Valuation
							,Date_Of_Inspection
							,Valuation
							,Market_Value_of_Security
							,[90 day_value_of_security]
							,GDV
							,GDV_90_day
							,Rental_value
							,[re-instatement_value]
							,ValuationStatus
							,SecurityAddress
							,ValueAfterWorks
							,[90DayValueAfterWorks]
							,Surveyor
						)
	order by
	CaseReference, Date_of_Valuation desc
end
GO
/****** Object:  StoredProcedure [Report].[WriteOffs]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[WriteOffs]	@FromDate varchar(11) , @ToDate varchar(11)
									,@message varchar(255) output, @rc int output, @debug int
as begin

	set nocount on
	select @rc=-1 , @message=''

	begin try

		select 1 as LoanId,'XXXXXX case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as AsOfDate,'Not charge default interest from 13th Aug- 29 Oct 2014' ChangeToBeMade,'Tom Thomas' RequestedFrom,'The boss' Authoriser,8999.99 EstCostToCBFL,'Difference of £1.59 is difference between 1-3% No auth given' Notes
		union
		select 2 as LoanId,'AAAAAA case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as AsOfDate,'Not charge default interest from 13th Aug- 29 Oct 2014' ChangeToBeMade,'Tom Thomas' RequestedFrom,'The boss' Authoriser,7999.99 EstCostToCBFL,'Difference of £1.59 is difference between 1-3% No auth given' Notes
		union
		select 3 as LoanId,'CCCCCC case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as AsOfDate,'Not charge default interest from 13th Aug- 29 Oct 2014' ChangeToBeMade,'Tom Thomas' RequestedFrom,'The boss' Authoriser,6999.99 EstCostToCBFL,'Difference of £1.59 is difference between 1-3% No auth given' Notes
		union
		select 4 as LoanId,'DDDDDD case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as AsOfDate,'Not charge default interest from 13th Aug- 29 Oct 2014' ChangeToBeMade,'Tom Thomas' RequestedFrom,'The boss' Authoriser,5999.99 EstCostToCBFL,'Difference of £1.59 is difference between 1-3% No auth given' Notes
		union
		select 5 as LoanId,'EEEEEE case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as AsOfDate,'Not charge default interest from 13th Aug- 29 Oct 2014' ChangeToBeMade,'Tom Thomas' RequestedFrom,'The boss' Authoriser,4999.99 EstCostToCBFL,'Difference of £1.59 is difference between 1-3% No auth given' Notes
		union
		select 6 as LoanId,'FFFFFF case ref 1 XXXXXX' as CaseReference,'29-Jan-2015' as AsOfDate,'Not charge default interest from 13th Aug- 29 Oct 2014' ChangeToBeMade,'Tom Thomas' RequestedFrom,'The boss' Authoriser,3999.99 EstCostToCBFL,'Difference of £1.59 is difference between 1-3% No auth given' Notes

		select @rc=0

	end try

	begin catch
		select	 @rc			=-1
				,@Message	= isnull(substring('Error in: ' + ERROR_PROCEDURE() + ' , ' + ERROR_MESSAGE(),1,1024),'Unspecified Error')
		goto ExitErr
	end catch

	goto ExitOk

ExitErr:

ExitOk:
end

GO
/****** Object:  StoredProcedure [Report].[XLAllCases]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Report].[XLAllCases] as begin 

	create table #llr(id int identity
						,loanid		int
						,SageId		int
						,Cr			varchar(512)
						,CrSage		varchar(512)
						,Completion	datetime null
						,Maturity	datetime null
						,Redeemed	datetime null
						,Facility	nvarchar(255) null
						,GrossLoan	decimal(18,6)
						,[broker_fee_in_percentage]		decimal(18,6)
						,[broker_fee_out_percentage]	decimal(18,6)
						,[broker_flat_fee]				decimal(18,6)
						,[Broker_fee_ActuallyPaidOut]	decimal(18,6)
						,Product		varchar(255)
						,monthly_int_amount		decimal(18,6)
						,penalty_int_amount		decimal(18,6),MaxLTVThroughout		decimal(18,6),interest_balance		decimal(18,6),Interest_accrued		decimal(18,6)
						,Term			varchar(32)
						,isRegulated	char(1)
						,ProductType	varchar(255)
						,ProductTypeDesc	varchar(255)

						)

	insert #llr(loanid,cr,sageid,Completion,Redeemed,Maturity,Facility,GrossLoan
				,[broker_fee_in_percentage],[broker_fee_out_percentage],[broker_flat_fee],[Broker_fee_ActuallyPaidOut]
				,monthly_int_amount,penalty_int_amount,MaxLTVThroughout,interest_balance,Interest_accrued
				,Term,isRegulated,Product,ProductType,ProductTypeDesc

				)
	select	distinct 
			 l.Loan_id
			,l.Cbfl_id
			,c.LoanID
			,l.completion_date
			,l.redeemed_date
			,l.maturity_date
			,l.facility_date
			,isnull(l.[gross_loan],0)
			,isnull(l.broker_fee_in_percentage,0)
			,isnull(l.broker_fee_out_percentage,0)
			,isnull(l.broker_flat_fee,0)
			,isnull(l.Broker_fee_ActuallyPaidOut,0)

			,h.monthly_int_amount
			,h.penalty_int_amount
			,p.MaxLTVThroughout
			,h.interest_balance
			,h.[Interest accrued]

			,h.producttermcombination --p.TermMonths--
			,case when isnull(h.ProductTypeID,0)=4 then	'Y' else 'N' end
			,p.ProductCode
			,p.ProductType
			,p.Description
	from		Dawn_Data.Loan.[Loan]		l
	left join	Dawn_Data.Loan.History		h	on	h.DIM_loan_id_SSK	=l.loan_id
	left join	Dawn_Data_Staging.WebLabs.[Case]	c	on	c.CaseReference		= l.CBFL_id
	left join	Dawn_Data.dbo.tbl_ProductName		p	on	p.ProductNamesID	=	h.product_id
	--where	Redeemed_date is null

/*
	select 1,* from Dawn_Data.Loan.History where DIM_loan_id_SSK=1372
	select 2,* from Dawn_Data.Loan.loan where loan_id=1372
	select 3,* from Dawn_Data.dbo.[tbl_ProductName] where ProductNamesID=44
*/

	update #llr set crsage='A&M_DEVELOPMENTS_LTD2685/06/2015' where cr='A_&_M_LONDON_DEVELOPMENTS_LTD2685/06/2015'
	update #llr set crsage='CLARENCE_DEVELOPMENT_SOLUTION2597/06/2015' where cr='CLARENCE_DEVELOPMENT_SOLUTIONS_LIMITED2597/06/2015'
	update #llr set crsage='CPD_(10_PORTLAND_SQUARE)2646/06/2015' where cr='CPD_(10_PORTLAND_SQUARE_LIMITED)2646/06/2015'
	update #llr set crsage='DWELL2449/05/2015' where cr='DWELL_(BIRMINGHAM)_LIMITED2449/05/2015'
	update #llr set crsage='EDAN_INVESTMENT_BARYTA HOUSE_LTD2509/05/2015' where cr='EDAN_IVESTMENT_BARYTA_HOUSE_LTD2509/05/2015'
	update #llr set crsage='GOLDESTATEINVESTMENTSLIMITED2448/05/2015' where cr='GOLDESTATE_INVESTMENTS_LTD2448/05/2015'
	update #llr set crsage='' where cr='HARRIS2087/01/2015'
	update #llr set crsage='' where cr='HUNTER1927/11/2014'
	update #llr set crsage='PROPERTY SPECIALISTS (UK) LIMITED2413/04/2015' where cr='PROPERTY_SPECIALISTS_(UK)_LIMITED2413/04/2015'
	update #llr set crsage='' where cr='LYNN_PORT_DEVELOPMENT_LIMITED1557/07/2014'
	update #llr set crsage='WORLDWIDE_HOUSING_LTD2521/05/2015' where cr='WORLDWIDE_HOUSING_LIMITED2521/05/2015'
	update #llr set crsage='ZIETZIG2469/05/2015' where cr='ZIETZIG_LTD2469/05/2015'

	declare	 @cr			varchar(255)
			,@asOfDate		datetime
			,@i				int
			,@crs			varchar(255)
			,@loanid		int
			,@wlloanid		int
			,@Completion	datetime
			,@Redeemed		datetime
			,@Maturity		datetime
			,@Facility		nvarchar(255)
			,@GrossLoan		decimal(18,6)
			,@BrokerFeeInPct	money 					
			,@BrokerFeeOutPct	money 	
			,@BrokerFlatFee	money 					
			,@BrokerFeeOut	money
			,@ProductTerm	varchar(16)
			,@Product		varchar(255)
			,@isReg			char(1)
			,@ProductType	varchar(255)
			,@ProductTypeDesc	varchar(255)
			,@monthly_int_amount	decimal(18,6)
			,@penalty_int_amount	decimal(18,6)
			,@MaxLTVThroughout		decimal(18,6)
			,@interest_balance		decimal(18,6)
			,@Interest_accrued		decimal(18,6)


	declare @SageTrans table (Companyno varchar(256) ,CBFL_ID varchar(255), NAME varchar(255), Date datetime, GROSS_AMOUNT money, TRAN_NUMBER int , ITEM_COUNT int, DETAILS varchar(255), INV_REF varchar(255), TYPE  varchar(255))
	declare @AuraTrans table (CBFL_ID varchar(255), cashflowinterest_date datetime, cashflowtypedescription varchar(255) ,cashflowinterest_amount money, cashflowtype_id int, isRedeemed bit)

	select	 @asOfDate	='31 dec 2015'
	--delete #llr where cr!='A_&_M_LONDON_DEVELOPMENTS_LIMITED2803/07/2015'
	--delete #llr where cr!='green2476/05/2015'

	declare @Extract
			table (	 SageId				int
					,AuraId				int
					,CaseReference		varchar(255)	
					,Facility			datetime	,Completed	datetime	,Maturity	datetime	
					,Product			varchar(32)
					,ProductType		varchar(255)
					,ProductTypeDesc	varchar(255)
					,Term				varchar(16)

					,monthly_int_amount		decimal(18,6)
					,penalty_int_amount		decimal(18,6)
					,MaxLTVThroughout		decimal(18,6)
					,interest_balance		decimal(18,6)
					,Interest_accrued		decimal(18,6)

					,Regulated			char(1)
					,Redeemed			datetime

					,FundsRequested		datetime
					,AuraGrossLoan		money
					,AuraPrincipal		money			
					,AuraCurrBalance	money

					,AuraBrokerFeeInPct	money 					
					,AuraBrokerFeeOutPct	money 	
					,AuraBrokerFlatFee	money 					
					,AuraBrokerFeeOut	money 	

					,AuraInsurance		money 					
					,AuraLegalFee		money
					,AuraAdminFee		money
					,AuraAdHocCost		money
					,AuraEnquiryFee		money
					,AuraInHouseFees	money
					,AuraLegalFees		money
					,AuraReceiverFees	money
					,AuraAssetManager	money
					,AuraTTcharge		money
					,AuraStatement		money
					,AuraFeeIn			money /* Arrangement fee-in */	
					,AuraFeeOut			money /* Arrangement fee-out */
						
					,AuraNonCashInterest	money
					,AuraCashInterest	money
										
					,AuraDrawdown		money
					,AuraDrawdownInterest	money

					,NoOfProperties		int
					,IndivOrCorporate	varchar(64)

					,SageCurrBalance	money	,SagePrincipal			money					,SageInsurance			money					,SageFee				money					,SageFeeIn				money
					,SageFeeOut			money	,SageInterest			money					,SageDrawdown			money					,SageDrawdownInterest	money
					,SageTotalInterest	money	,SageOpBalInterestFee	money					,SageOpBalDrawdown		money					,SageOpBalDrawdownInterest	money
					)

	select @i=MIN(id) from #llr
	while @i is not null begin

		select	 @wlloanid	= SageId
				,@loanid	= loanid
				,@crs		= CrSage
				,@cr		= cr
				,@Completion=Completion
				,@Redeemed	= Redeemed
				,@Maturity	= Maturity
				,@Facility	= Facility
				,@GrossLoan	=	GrossLoan
				,@BrokerFeeInPct=broker_fee_in_percentage
				,@BrokerFeeOutPct=broker_fee_out_percentage
				,@BrokerFlatFee=broker_flat_fee
				,@BrokerFeeOut=Broker_fee_ActuallyPaidOut
				,@ProductTerm=Term
				,@isReg=isRegulated
				,@Product=Product
				,@ProductType=ProductType
				,@ProductTypeDesc=ProductTypeDesc
				,@monthly_int_amount=monthly_int_amount
				,@penalty_int_amount=penalty_int_amount
				,@MaxLTVThroughout=MaxLTVThroughout
				,@interest_balance=interest_balance
				,@Interest_accrued=Interest_accrued
		from	#llr
		where	id = @i

		/*read aura trans
		*/
		insert @AuraTrans(CBFL_ID, cashflowinterest_date, cashflowtypedescription, cashflowinterest_amount, cashflowtype_id, isRedeemed)
				select	l.CBFL_id, cashflowinterest_date,cashflowtypedescription,isnull(cashflowinterest_amount,0),isnull(cashflowtype_id,0) cashflowtype_id
				,case when h.redeemed_date is null then 0 else 1 end isRedeemed
				from Dawn_Data.reconciliation.vwStatementCashflowTransactions cf
					inner join Dawn_Data.Loan.Loan l on l.loan_id = cf.loan_id
					inner join Dawn_Data.Loan.History h on h.DIM_loan_id_SSK=l.loan_id
				where	l.CBFL_id = @cr
					and cf.cashflowinterest_date <= @asOfDate

		/*read Sage trans
		*/
		--set @cr= case when @crs!='' then @crs else @cr end
		--insert @SageTrans exec Dawn_Data_v100.reconciliation.SageTransactionsRunningTotals @cr
		--delete @SageTrans where [date]>@asOfDate
		--update @SageTrans set GROSS_AMOUNT=0 where GROSS_AMOUNT is null
		--/*fix principal
		--*/
		--if not exists(select * from @SageTrans where [type]='sp')
		--	insert @SageTrans(GROSS_AMOUNT,[type],[details]) select (select GROSS_AMOUNT from @SageTrans where [details]='Principal securitised' and [type]='si'),'sp','principal'


--select * from Dawn_Data.Loan.ParticipantOfCase where FkLoanId=@loanid

		insert @Extract(
					 SageId
					,AuraId
					,CaseReference
					,Facility
					,Completed
					,Maturity
					,Product
					,ProductType
					,ProductTypeDesc
					,Term

					,monthly_int_amount
					,penalty_int_amount
					,MaxLTVThroughout
					,interest_balance
					,Interest_accrued

					,Regulated
					,Redeemed
					,AuraPrincipal	,AuraCurrBalance	,AuraGrossLoan
					
					,AuraBrokerFeeInPct	 ,AuraBrokerFeeOutPct ,AuraBrokerFlatFee ,AuraBrokerFeeOut

					,AuraInsurance	,AuraLegalFee		,AuraAdminFee		,AuraAdHocCost		,AuraEnquiryFee	,AuraInHouseFees	,AuraLegalFees	,AuraReceiverFees	,AuraAssetManager
					,AuraTTcharge	,AuraStatement		
					,AuraFeeIn /* Arrangement fee-in */	
					,AuraFeeOut
					,AuraNonCashInterest
					,AuraCashInterest
					,AuraDrawdown
					,AuraDrawdownInterest

					,NoOfProperties
					,IndivOrCorporate
					)
			select	 @wlloanid
					,@loanid
					,@cr
					,null as Facility
					,@Completion
					,@Maturity
					,@Product Product
					,@ProductType
					,@ProductTypeDesc
					,@ProductTerm as term

					,@monthly_int_amount
					,@penalty_int_amount
					,@MaxLTVThroughout
					,@interest_balance
					,@Interest_accrued

					,@isReg
					,@Redeemed
					,(select isnull(SUM(isnull(cashflowinterest_amount,0)),0)	from @AuraTrans where cashflowtypedescription like '%Opening%' and cashflowtypedescription like '%balance%')
					,(select loan_balance from Dawn_Data.Loan.History where DIM_loan_id_sSK=@loanid)
					,@GrossLoan

					,@BrokerFeeInPct
					,@BrokerFeeOutPct
					,@BrokerFlatFee
					,@BrokerFeeOut

					,(select isnull(SUM(isnull(cashflowinterest_amount,0)),0)	from @AuraTrans where cashflowtypedescription like '%insurance%')
					/*Aura Fees:  Admin Fee, Legal Fee, Ad-Hoc Cost, Enquiry Fee, In House Fees, Legal Fees,Receiver Fees,TT charge (Bank Charges)
					*/
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription like '%Legal Fee'  and cashflowtypedescription not like '%Arrangement%'))
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription = 'Admin Fee'  and cashflowtypedescription not like '%Arrangement%'))
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription = 'Ad-Hoc Cost'  and cashflowtypedescription not like '%Arrangement%'))
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription = 'Enquiry Fee'  and cashflowtypedescription not like '%Arrangement%'))
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription = 'In House Fees'  and cashflowtypedescription not like '%Arrangement%'))
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription = '%Legal Fees'  and cashflowtypedescription not like '%Arrangement%'))
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription = 'Receiver Fees'  and cashflowtypedescription not like '%Arrangement%'))
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription = 'Asset Manager'  and cashflowtypedescription not like '%Arrangement%'))
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription = 'TT charge (Bank Charges)'  and cashflowtypedescription not like '%Arrangement%'))
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (cashflowtypedescription = 'statement'  and cashflowtypedescription not like '%Arrangement%'))
					/*Fee In: Arrangement Fee		
					*/
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where cashflowtypedescription like 'Arrangement Fee%')
					/*Fee out						
					*/
					,(select SUM(isnull(cashflowinterest_amount,0))	from @AuraTrans where (
								(cashflowtypedescription like 'Arrangement Fee Payable on Redemption%')
								or (cashflowtypedescription like 'Fee Interest Due to Broker Out%')
							)
					 )
					 /*noncash interest chgs accruals*/
					,(select abs(SUM(cashflowinterest_amount))	from @AuraTrans where 
								(	cashflowtypedescription = 'Ad-Hoc Cost  Int'					or	cashflowtypedescription = 'DEFAULT Interest'				or	cashflowtypedescription = 'Interest on Drawdown'
								or	cashflowtypedescription = 'Interest Charge'					or	cashflowtypedescription = 'Insurance Int'						or	cashflowtypedescription = 'Refund Interest Charge'
								or	cashflowtypedescription = 'Legal Fees Int'					or	cashflowtypedescription = 'Litigation Int.'						or	cashflowtypedescription = 'Receiver Fees Int.'
								or	cashflowtypedescription = 'Interest on Further Advance'					or	cashflowtypedescription = 'Insurance Int'			or	cashflowtypedescription = 'Retained interest'
								or	cashflowtypedescription = 'Rolled Interest'					or	cashflowtypedescription = 'Serviced Interest due'				or	cashflowtypedescription = 'Serviced Interest Due'
								or	cashflowtypedescription = 'Statement Interest'					or	cashflowtypedescription = 'TT charge (Bank Charges) Int.'))

					 /*cash interest receipts*/
					,(select abs(SUM(cashflowinterest_amount))
						from @AuraTrans where 
							(cashflowtypedescription like '%Service Interest payment%'
							or cashflowtypedescription = 'Interest' 
							or cashflowtypedescription = 'Interest Rebate'
							or cashflowtypedescription = 'Interest Rebate (manual)'
							))

					/*drawdown or bal xfer			*/
					,(select SUM(cashflowinterest_amount)	from @AuraTrans where cashflowtypedescription = 'drawdown' or cashflowtypedescription = 'Balance Transfer' or cashflowtypedescription like '%Further Advance%')

					/*drawdown or bal xfer interest	*/
					,(select SUM(cashflowinterest_amount)	from @AuraTrans where cashflowtypedescription like '%interest%' and cashflowtypedescription like '%drawdown%')

					,(select COUNT(*) from Loan.SecurityMap where loan_id=@loanid)
					,(select case when exists(select * from Loan.ParticipantOfCase where FkLoanId=@loanid and FkLegalEntityId!=0 and FKParticipantTypeId=1) then 'Corporate' else 'Individual' end)

		delete @AuraTrans
		delete @sageTrans
		select @i=MIN(id) from #llr where id>@i
	end

	update @Extract
		set  AuraPrincipal		=isnull(AuraPrincipal,0)
			,AuraInsurance		=isnull(AuraInsurance,0)
			,AuraFeeIn			=isnull(AuraFeeIn,0) 
			,AuraCurrbalance	=isnull(AuraCurrbalance,0)
			,AuraLegalFee		=isnull(AuraLegalFee,0)	
			,AuraAdminFee		=isnull(AuraAdminFee,0)		
			,AuraAdHocCost		=isnull(AuraAdHocCost,0)			
			,AuraEnquiryFee		=isnull(AuraEnquiryFee,0)			
			,AuraInHouseFees	=isnull(AuraInHouseFees,0)			
			,AuraLegalFees		=isnull(AuraLegalFees,0)			
			,AuraReceiverFees	=isnull(AuraReceiverFees,0)		
			,AuraAssetManager	=isnull(AuraAssetManager,0)		
			,AuraTTcharge		=isnull(AuraTTcharge,0)	
			,AuraStatement		=isnull(AuraStatement,0)	
			,AuraFeeOut			=isnull(AuraFeeOut,0)
			,AuraNonCashInterest =isnull(AuraNonCashInterest,0)
			,AuraCashInterest	=isnull(AuraCashInterest,0)
			,Auradrawdown		=isnull(Auradrawdown,0)
			,AuraDrawdownInterest =isnull(AuraDrawdownInterest,0) 
			--,SagePrincipal = isnull(SagePrincipal,0),SageInsurance = isnull(SageInsurance,0) ,SageFee = isnull(SageFee,0) ,SageFeeIn = isnull(SageFeeIn,0) ,SageFeeOut = isnull(SageFeeOut,0) ,SageInterest = isnull(SageInterest,0)

	select 	AuraId
			,CaseReference
			,isnull(convert(varchar,Completed,106),'')	Completed
			,isnull(convert(varchar,Maturity,106),'')	Maturity
			,isnull(convert(varchar,Redeemed,106),'')	Redeemed
			,isnull(Product,'')							ProductCode
			,isnull(ProductType,'')						ProductType
			,isnull(ProductTypeDesc	,'')				ProductDesc
			,isnull(Term,'')							Term
			,Regulated

			,isnull(round(monthly_int_amount	*100,3),0)		RateOfinterest
			,round(penalty_int_amount *100,3)			DefaultRateOfinterest
			,isnull(MaxLTVThroughout,0)					InitialLTV
			,Interest_Balance				
			,AuraNonCashInterest						Interest_Accrued
			,NoOfProperties
			,IndivOrCorporate

			,AuraGrossLoan								GrossLoan
			,AuraPrincipal								Principal
			,AuraCurrbalance							CurrentBalance
			,AuraFeeIn									ArrangementFeeIn
			,AuraFeeOut									ArrangementFeeOut

			,AuraBrokerFeeInPct							BrokerFeeInPct
			,AuraBrokerFlatFee							BrokerFlatFee
			,AuraBrokerFeeOut							BrokerFeeOut
			,AuraBrokerFeeOutPct						BrokerFeeOutPct

			,AuraInsurance
			,AuraLegalFee			
			,AuraAdminFee			
			,AuraAdHocCost			
			,AuraEnquiryFee			
			,AuraInHouseFees		
			,AuraLegalFees			
			,AuraReceiverFees		
			,AuraAssetManager		
			,AuraTTcharge
			,AuraStatement
			--,AuraNonCashInterest						AuraInterestDue
			--,AuraCashInterest							AuraInterestReceived
			,AuraDrawdown								Aura_DrwDn_or_BalXfer_Total
			,AuraDrawdownInterest						Aura_DrwDn_or_BalXferIntrest

	from @Extract
	order by Completed desc
end
GO
/****** Object:  StoredProcedure [Report].[XLBorrowers]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
-- Report.XLCase
CREATE PROCEDURE [Report].[XLBorrowers]
	
AS
BEGIN
	SELECT [CaseReference]
      ,[Title]
      ,[Forename]
      ,[Surname]
      ,[Company]
      ,[Address1] + ISNULL(', ' + [Address2], '') + ISNULL(', ' + [Address3], '') + ISNULL(', ' + [Address4], '') + ISNULL(', ' + [County], '') + ISNULL(', ' + [Postcode], '') + ISNULL(', ' + [Country], '') [Address]
      ,[Address1]
      ,[Address2]
      ,[Address3]
      ,[Address4]
      ,[PostCode]
      ,[County]
      ,[Country]
      ,[Email]
      ,[Telephone]
      ,[Solicitor]
      ,[CreditScore]
      ,CASE WHEN CHARINDEX('P',UPPER([VeriphyScore])) > 0 THEN 'Pass' ELSE NULL END [VeriphyScore]
  FROM [Dawn_Data_Staging].[WebLabs].[BorrowerOverview]
END

GO
/****** Object:  StoredProcedure [Report].[XLCases]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
-- Report.XLCase
CREATE PROCEDURE [Report].[XLCases]
	
AS
BEGIN
	SET DATEFORMAT dmy

	SELECT [Reference]
      ,Convert(int,[LoanID]) [LoanID] 
      ,[CaseReference]
      ,isnull(Convert(money,[LoanAmount]),0) [LoanAmount]
      ,isnull(Convert(money,[LoanAdjustment]),0) [LoanAdjustment]
      ,isnull(Convert(money,[LoanBalance]),0) [LoanBalance]
      ,isnull(Convert(datetime,[CompletionDate]),'') [CompletionDate]
      ,isnull(Convert(datetime,[MaturityDate]),'') [MaturityDate]
      ,isnull(Convert(datetime,[RedeemedDate]),'') [RedeemedDate]
      ,isnull(Convert(money,[GrossLoan]),0) [GrossLoan]
      ,Convert(money,isnull([ArrangementFeeInPct],0)) [ArrangementFeeInPct]
      ,isnull(Convert(money,[ArrangementFeeOutPct]),0) [ArrangementFeeOutPct]
      ,isnull(Convert(money,[BrokerFeeInPct]),0) [BrokerFeeInPct]
      ,isnull(Convert(money,[BrokerFeeOutPct]),0) [BrokerFeeOutPct]
      ,isnull(Convert(money,[BrokerFlatFee]),0) [BrokerFlatFee]
      ,isnull([Status],'') [Status]
      ,isnull(Convert(datetime,[FacilityDate]),'') [FacilityDate]
      ,isnull([Introducer],'')						[Introducer]
      ,isnull([CBFLSolicitor],'') [CBFLSolicitor]
      ,isnull(Convert(money,[Term]),0) [Term]
      ,isnull(Convert(money,[InterestRate]),0) [InterestRate]
      ,isnull(Convert(money,[BrokerInterestRate]),0) [BrokerInterestRate]
      ,isnull(Convert(money,[TotalMonthlyInterestRate]),0) [TotalMonthlyInterestRate]
      ,isnull(Convert(money,[InterestAmount]),0) [InterestAmount]
      ,isnull(Convert(money,[InterestAdjustments]),0) [InterestAdjustments]
      ,isnull(Convert(money,[InterestBalance]),0) [InterestBalance]
      ,isnull([ProductCode],'') [ProductCode]
      ,isnull([2ndChargeLender],'') [2ndChargeLender]
      ,isnull(Convert(money,[1stChargeOutstanding]),0) [1stChargeOutstanding]
      ,isnull(Convert(money,[1stChargeValuation]),0) [1stChargeValuation]
      ,isnull(Convert(money,[2ndChargeValuation]),0) [2ndChargeValuation]
      ,isnull(Convert(money,[TotalValuation]),0) [TotalValuation]
      ,isnull([ValuationBasis],'') [ValuationBasis]
      ,isnull([Valuer],'') [Valuer]
      ,isnull(Convert(datetime,[ValuationDate]),'') [ValuationDate]
      ,isnull(Convert(money,[LTV]),0) [LTV]
      ,isnull(Convert(int,[DaysPastRedemption]),0)		[DaysPastRedemption]
      ,isnull(Convert(int,[NumberProperties]),0)		[NumberProperties]
      ,isnull([PrimaryAddress],'')						[PrimaryAddress]
      ,isnull([PrimaryPostcode],'')						[PrimaryPostcode]
      ,isnull([PrimaryPropertyType],'')					[PrimaryPropertyType]
      ,convert(int,isnull([NumberBorrowers],0))			[NumberBorrowers]
      ,isnull([PropertyTenure],'')						[PropertyTenure]
      ,isnull(Convert(money,[AnnualRental]),0)			[AnnualRental]
      ,isnull([IndividualCorporate],'')					[IndividualCorporate]
      ,isnull([BorrowerID1],'')							[BorrowerID1]
      ,isnull([BorrowerID2],'')							[BorrowerID2]
      ,isnull([BorrowerID3],'')							[BorrowerID3]
      ,isnull([BorrowerID4],'')							[BorrowerID4]
      ,isnull([BorrowerID5],'')							[BorrowerID5]
	  ,isnull(Convert(money,[BorrowingsPerBorrower]),0) [BorrowingsPerBorrower]
	into #t1
  FROM [Dawn_Data_Staging].[WebLabs].[Case]
  WHERE ISNUMERIC([LoanAmount])=1

  SET DATEFORMAT ymd
	SELECT [Reference]
      ,Convert(int,[LoanID])							[LoanID] 
      ,[CaseReference]
      ,isnull(Convert(money,[LoanAmount]),0)			[LoanAmount]
      ,isnull(Convert(money,[LoanAdjustment]),0)		[LoanAdjustment]
      ,isnull(Convert(money,[LoanBalance]),0)			[LoanBalance]

      ,isnull(Convert(datetime,[CompletionDate]),'')	[CompletionDate]
      ,isnull(Convert(datetime,[MaturityDate]),'')		[MaturityDate]
      ,isnull(Convert(datetime,[RedeemedDate]),'')		[RedeemedDate]
      ,isnull(Convert(money,[GrossLoan]),0)				[GrossLoan]

      ,Convert(money,isnull([ArrangementFeeInPct],0))	[ArrangementFeeInPct]
      ,isnull(Convert(money,[ArrangementFeeOutPct]),0)	[ArrangementFeeOutPct]
      ,isnull(Convert(money,[BrokerFeeInPct]),0)		[BrokerFeeInPct]
      ,isnull(Convert(money,[BrokerFeeOutPct]),0)		[BrokerFeeOutPct]
      ,isnull(Convert(money,[BrokerFlatFee]),0)			[BrokerFlatFee]
      ,isnull([Status],'')								[Status]
      ,isnull(Convert(datetime,[FacilityDate]),'')		[FacilityDate]
      ,isnull([Introducer],'')							[Introducer]
      ,isnull([CBFLSolicitor],'')						[CBFLSolicitor]
      ,isnull(Convert(money,[Term]),0)					[Term]

      ,isnull(Convert(money,[InterestRate]),0)			[InterestRate]
      ,isnull(Convert(money,[BrokerInterestRate]),0)	[BrokerInterestRate]
      ,isnull(
				Convert(money,
							replace(
								replace(
									replace(
										replace([TotalMonthlyInterestRate],' ','')
										,'%','')
									,'per','')
						,'month','')
						)
			,0.00)										[TotalMonthlyInterestRate]

      ,isnull(Convert(money,[InterestAmount]),0)		[InterestAmount]
      ,isnull(Convert(money,[InterestAdjustments]),0)	[InterestAdjustments]

      ,isnull(Convert(money,[InterestBalance]),0)		[InterestBalance]
      ,isnull([ProductCode],'')							[ProductCode]
      ,isnull([2ndChargeLender],'')						[2ndChargeLender]
      ,isnull(Convert(money,[1stChargeOutstanding]),0)	[1stChargeOutstanding]
      ,isnull(Convert(money,[1stChargeValuation]),0)	[1stChargeValuation]
      ,isnull(Convert(money,[2ndChargeValuation]),0)	[2ndChargeValuation]
      ,isnull(Convert(money,[TotalValuation]),0)		[TotalValuation]

      ,isnull([ValuationBasis],'')						[ValuationBasis]
      ,isnull([Valuer],'')								[Valuer]
	  ,case when isdate([ValuationDate])=1
		then isnull(Convert(datetime,[ValuationDate]),'')		
		else null
		end												[ValuationDate]

      ,round(
			  case when isnull(Convert(money,[LoanBalance]),0)>0
				then isnull(Convert(money,[LoanBalance]),0)
				else
					isnull(Convert(money,[LoanAmount]),0)
				end
			  /
			  case when 	isnull(Convert(money,[TotalValuation]),0) >0
				then isnull(Convert(money,[TotalValuation]),0)
				else
					1.00
			  end												
			 ,4)										[LTV]

      ,isnull(Convert(int,[DaysPastRedemption]),0)		[DaysPastRedemption]
      ,isnull(Convert(int,[NumberProperties]),0)		[NumberProperties]
      ,isnull([PrimaryAddress],'')						[PrimaryAddress]
      ,isnull([PrimaryPostcode],'')						[PrimaryPostcode]
      ,isnull([PrimaryPropertyType],'')					[PrimaryPropertyType]
      ,convert(int,isnull([NumberBorrowers],0))			[NumberBorrowers]
      ,isnull([PropertyTenure],'')						[PropertyTenure]
      ,isnull(Convert(money,[AnnualRental]),0)			[AnnualRental]
      ,isnull([IndividualCorporate],'')					[IndividualCorporate]
      ,isnull([BorrowerID1],'')							[BorrowerID1]
      ,isnull([BorrowerID2],'')							[BorrowerID2]
      ,isnull([BorrowerID3],'')							[BorrowerID3]
      ,isnull([BorrowerID4],'')							[BorrowerID4]
      ,isnull([BorrowerID5],'')							[BorrowerID5]
      ,isnull(Convert(money,[BorrowingsPerBorrower]),0) [BorrowingsPerBorrower]
  into #t2
  FROM [Dawn_Data_Staging].[DPR_DW].[Case]

  WHERE ISNUMERIC([LoanAmount])=1

	select *
	from	#t1
	union
	select *
	from	#t2
	order by [CaseReference]

END
GO
/****** Object:  StoredProcedure [Report].[XLCasesNew]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
Create PROCEDURE [Report].[XLCasesNew]
	(
		@current_date DATETIME,
		@completion_from DATETIME,
		@completion_to DATETIME,
		@redeemed BIT
	)
AS
BEGIN

SELECT 
	Report.[fn_getBorrowerList](L.loan_id) [Reference],
	L.loan_id [LoanID],
	L.CBFL_id [Case Reference],
	L.loan_amount [Loan Amount],
	L.loan_adjustment [Loan Adjustment],
	ISNULL(H.loan_balance, L.loan_balance) [Loan Balance],
	L.completion_date [Completion Date],
	L.maturity_date [Maturity Date],
	L.redeemed_date [Redeemed Date],
	ISNULL(H.gross_loan,L.gross_loan) [Gross Loan],
	ISNULL(H.arrangement_fee_in_percentage,L.arrangement_fee_in_percentage)*100 [Arrangement Fee In %],
	ISNULL(H.arrangement_fee_out_percentage,L.arrangement_fee_out_percentage)*100 [Arrangement Fee Out %],
	ISNULL(H.broker_fee_in_percentage,L.broker_fee_in_percentage)*100 [Broker Fee In %],
	ISNULL(H.broker_fee_out_percentage,L.broker_fee_out_percentage)*100 [Broker Fee Out %],
	ISNULL(H.broker_flat_fee,L.broker_flat_fee) [Broker Flat Fee],
	CASE WHEN L.redeemed_date IS NOT NULL THEN 'Redeemed' ELSE L.LoanStatus END [Status],
	L.facility_date [Facility Date],
	LEI.LegalEntityName [Introducer],
	WLC.CBFLSolicitor [CBFL Solicitor],
	L.term [Term],
	ISNULL(H.monthly_int_amount,L.monthly_int_amount)*100 [Interest Rate],
	ISNULL(H.monthly_broker_interest_rate,L.monthly_broker_interest_rate)*100 [Broker Interest Rate],
	ISNULL(H.monthly_int_amount,L.monthly_int_amount)*100 [total monthly Interest Rate],
	ISNULL(H.interest_amount,L.interest_amount) [Interest Amount],
	ISNULL(H.interest_adjustments,L.interest_adjustments) [Interest Adjustments],
	L.interest_balance [Interest Balance],
	L.ProductNames [Product Code],
	null [2nd Charge Lender],
	null [1st Charge Outstanding],
	null [1st Charge Valuation],
	null [2nd Charge Valuation],
	V.Valuation [Total Valuation],
	null [Valuation Basis],
	V.Surveyor [Valuer],
	V.date_of_valuation [Valuation Date],
	ISNULL(H.loan_balance, L.loan_balance)/V.Valuation [LTV],
	case
		when /*no of pmts expected > no of pmts recvd*/
		(
			/*no pmts recvd*/
			(
				select count(*)
				from Dawn_Data.[LoanCalc].[Transaction]	t
				where loan_id=L.loan_id 
				and	transaction_date <= @current_date
				and t.transaction_type=18
			)
			<
			/*no of pmts reqd*/
			(
				select isnull(count(*),0) 
				from	Dawn_Data.[LoanCalc].[CashflowInterest]	i
				where   loan_id=L.loan_id 
				and	cashflowInterest_date <= @current_date
				and i.cashflowInterest_type=16
			)
		)
		then	
			/*today-lastdue*/
			datediff(dd
					,(select max(cashflowInterest_date)
						from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
						where i.cashflowInterest_type=16 
						and loan_id=l.loan_id and cashflowInterest_date <= @current_date)
					,@current_date
					)
		when /*last pmt date < last pmt due date*/
		(
			( /*last pmt date */
			select isnull(max(transaction_date),h.StartDate)
			from Dawn_Data.[LoanCalc].[Transaction] t
				where  loan_id=l.loan_id and t.transaction_type=18
			)
			< /* last pmt due */
			(select max(cashflowInterest_date) --should not be null
						from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
						where   loan_id=l.loan_id and cashflowInterest_date <= @current_date
						AND i.cashflowInterest_type=16)
		)
		then
		(
		/*today-lastdue*/
			datediff(dd
					,@current_date
					,(select max(cashflowInterest_date)
						from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
						where   loan_id=l.loan_id and cashflowInterest_date <= @current_date
						AND i.cashflowInterest_type=16)
					)
		)
		else 
			/*up to date,  but not redeemed*/
			abs(datediff(dd,h.StartDate,@current_date))
		end	[Days Past Redemption],
	(
		SELECT COUNT(*)
		FROM Dawn_Data.[Loan].[SecurityMap] SM
		WHERE SM.loan_id=L.loan_id
		AND SM.isActive=1
	) [Number Properties],
	S.address_1 +
	CASE WHEN S.address_2 IS NULL OR LEN(S.address_2) = 0 THEN '' ELSE ' :  ' + S.address_2 END +
	CASE WHEN S.address_3 IS NULL OR LEN(S.address_3) = 0 THEN '' ELSE ' :  ' + S.address_3 END +
	CASE WHEN S.address_4 IS NULL OR LEN(S.address_4) = 0 THEN '' ELSE ' :  ' + S.address_4 END +
	CASE WHEN S.post_code IS NULL OR LEN(S.post_code) = 0 THEN '' ELSE ' :  ' + S.post_code END +
	CASE WHEN S.county IS NULL OR LEN(S.county) = 0 THEN '' ELSE ' :  ' + S.county END [Primary Address],
	S.post_code [Primary Postcode],
	WLC.[PrimaryPropertyType] [Primary Property Type],
	(
		SELECT COUNT(*)
		FROM Dawn_Data.Loan.ParticipantOfCase LPC
		WHERE LPC.FKParticipantTypeId=1
		AND LPC.IsActive=1
		AND LPC.FkLoanId=L.loan_id
	) [Number Borrowers],
	WLC.[PropertyTenure] [Property Tenure],
	CONVERT(float,WLC.[AnnualRental]) [Annual Rental],
	WLC.[IndividualCorporate] [Individual/Corporate],
	WLC.[BorrowerID1],
	WLC.[BorrowerID2],
	WLC.[BorrowerID3],
	WLC.[BorrowerID4],
	WLC.[BorrowerID5],
	CONVERT(float,WLC.[BorrowingsPerBorrower]) [BorrowingsPerBorrower]
	FROM Dawn_Data.Loan.Loan L
	LEFT OUTER JOIN Dawn_Data.[Loan].[History] H ON L.loan_id=H.DIM_loan_id_SSK
	LEFT OUTER JOIN Dawn_Data.Loan.ParticipantOfCase LPCI ON LPCI.FkLoanId=L.loan_id AND LPCI.IsActive=1 AND LPCI.FKParticipantTypeId=8
	LEFT OUTER JOIN Dawn_Data.Loan.LegalEntity LEI ON LEI.LegalEntityId=LPCI.FkLegalEntityId
	LEFT OUTER JOIN [Dawn_Data_Staging].WebLabs.[Case] WLC ON WLC.CaseReference=L.CBFL_id
	LEFT OUTER JOIN (
		SELECT CaseReference,SUM(Valuation) Valuation, Max(date_of_valuation) date_of_valuation,
			(
				SELECT TOP 1 Surveyor
				FROM [Dawn_Data].[Loan].[Valuation] V2
				WHERE x.CaseReference=V2.CaseReference
				AND V2.date_of_valuation=MAX(x.date_of_valuation)
			) Surveyor
		FROM (
			SELECT CaseReference,securityaddress,Valuation,date_of_valuation,[Surveyor],
			ROW_NUMBER() OVER (PARTITION BY CaseReference, securityaddress ORDER BY date_of_valuation desc) row
			FROM [Dawn_Data].[Loan].[Valuation]
			WHERE ValuationStatus='Received'
		) x
		WHERE x.Row = 1
		GROUP BY CaseReference
	) V ON V.CaseReference=L.CBFL_id
	LEFT OUTER JOIN (
		SELECT 
			loan_id,security_id
		FROM (
			SELECT loan_id,security_id,
			ROW_NUMBER() OVER (PARTITION BY [loan_id] ORDER BY isPrimary DESC,[security_id] desc) row
			FROM Dawn_Data.Loan.SecurityMap
			WHERE [isActive]=1
		) x
		WHERE row=1
	) SM ON SM.loan_id=L.loan_id
	LEFT OUTER JOIN Dawn_Data.Loan.Security S ON S.security_id=SM.security_id 
	WHERE L.completion_date BETWEEN @completion_from AND @completion_to
	AND (
		(@redeemed IS NULL)
		OR 
		(@redeemed = 1 AND L.redeemed_date IS NOT NULL)
		OR
		(@redeemed = 0 AND L.redeemed_date IS NULL)
	)
	ORDER BY L.maturity_date desc


END

GO
/****** Object:  StoredProcedure [Report].[XLFunders]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
-- Report.XLCase
CREATE PROCEDURE [Report].[XLFunders]
AS
BEGIN
	SELECT L.CBFL_id [Reference]
		,FOL.fkLoanId [Loan Id]
		,F.funder_name [Funder]
		,FOL.FunderLoanSplitPct [Funder Split %]
	FROM Dawn_Data.Loan.FunderOfLoan FOL
	INNER JOIN Dawn_Data.Loan.Loan L ON L.loan_id=FOL.fkLoanId
	INNER JOIN Dawn_Data.dbo.tbl_funders F ON F.funder_id=FOL.fkFunderId
	ORDER BY L.CBFL_id, F.funder_name
END

GO
/****** Object:  StoredProcedure [Report].[XLLoans]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Report].[XLLoans]
	(
		@current_date DATETIME,
		@completion_from DATETIME,
		@completion_to DATETIME,
		@redeemed BIT
	)
AS
BEGIN

SELECT 
	Report.[fn_getBorrowerList](L.loan_id) [Reference],
	L.loan_id [LoanID],
	L.CBFL_id [Case Reference],
	L.loan_amount [Loan Amount],
	L.loan_adjustment [Loan Adjustment],
	ISNULL(H.loan_balance, L.loan_balance) [Loan Balance],
	L.completion_date [Completion Date],
	L.maturity_date [Maturity Date],
	L.redeemed_date [Redeemed Date],
	ISNULL(H.gross_loan,L.gross_loan) [Gross Loan],
	ISNULL(H.arrangement_fee_in_percentage,L.arrangement_fee_in_percentage)*100 [Arrangement Fee In %],
	ISNULL(H.arrangement_fee_out_percentage,L.arrangement_fee_out_percentage)*100 [Arrangement Fee Out %],
	ISNULL(H.broker_fee_in_percentage,L.broker_fee_in_percentage)*100 [Broker Fee In %],
	ISNULL(H.broker_fee_out_percentage,L.broker_fee_out_percentage)*100 [Broker Fee Out %],
	ISNULL(H.broker_flat_fee,L.broker_flat_fee) [Broker Flat Fee],
	CASE WHEN L.redeemed_date IS NOT NULL THEN 'Redeemed' ELSE L.LoanStatus END [Status],
	L.facility_date [Facility Date],
	LEI.LegalEntityName [Introducer],
	WLC.CBFLSolicitor [CBFL Solicitor],
	L.term [Term],
	ISNULL(H.monthly_int_amount,L.monthly_int_amount)*100 [Interest Rate],
	ISNULL(H.monthly_broker_interest_rate,L.monthly_broker_interest_rate)*100 [Broker Interest Rate],
	ISNULL(H.monthly_int_amount,L.monthly_int_amount)*100 [total monthly Interest Rate],
	ISNULL(H.interest_amount,L.interest_amount) [Interest Amount],
	ISNULL(H.interest_adjustments,L.interest_adjustments) [Interest Adjustments],
	L.interest_balance [Interest Balance],
	L.ProductNames [Product Code],
	null [2nd Charge Lender],
	null [1st Charge Outstanding],
	null [1st Charge Valuation],
	null [2nd Charge Valuation],
	V.Valuation [Total Valuation],
	null [Valuation Basis],
	V.Surveyor [Valuer],
	V.date_of_valuation [Valuation Date],
	ISNULL(H.loan_balance, L.loan_balance)/V.Valuation [LTV],
	case
		when /*no of pmts expected > no of pmts recvd*/
		(
			/*no pmts recvd*/
			(
				select count(*)
				from Dawn_Data.[LoanCalc].[Transaction]	t
				where loan_id=L.loan_id 
				and	transaction_date <= @current_date
				and t.transaction_type=18
			)
			<
			/*no of pmts reqd*/
			(
				select isnull(count(*),0) 
				from	Dawn_Data.[LoanCalc].[CashflowInterest]	i
				where   loan_id=L.loan_id 
				and	cashflowInterest_date <= @current_date
				and i.cashflowInterest_type=16
			)
		)
		then	
			/*today-lastdue*/
			datediff(dd
					,(select max(cashflowInterest_date)
						from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
						where i.cashflowInterest_type=16 
						and loan_id=l.loan_id and cashflowInterest_date <= @current_date)
					,@current_date
					)
		when /*last pmt date < last pmt due date*/
		(
			( /*last pmt date */
			select isnull(max(transaction_date),h.StartDate)
			from Dawn_Data.[LoanCalc].[Transaction] t
				where  loan_id=l.loan_id and t.transaction_type=18
			)
			< /* last pmt due */
			(select max(cashflowInterest_date) --should not be null
						from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
						where   loan_id=l.loan_id and cashflowInterest_date <= @current_date
						AND i.cashflowInterest_type=16)
		)
		then
		(
		/*today-lastdue*/
			datediff(dd
					,@current_date
					,(select max(cashflowInterest_date)
						from		Dawn_Data.[LoanCalc].[CashflowInterest]	i
						where   loan_id=l.loan_id and cashflowInterest_date <= @current_date
						AND i.cashflowInterest_type=16)
					)
		)
		else 
			/*up to date,  but not redeemed*/
			abs(datediff(dd,h.StartDate,@current_date))
		end	[Days Past Redemption],
	(
		SELECT COUNT(*)
		FROM Dawn_Data.[Loan].[SecurityMap] SM
		WHERE SM.loan_id=L.loan_id
		AND SM.isActive=1
	) [Number Properties],
	S.address_1 +
	CASE WHEN S.address_2 IS NULL OR LEN(S.address_2) = 0 THEN '' ELSE ' :  ' + S.address_2 END +
	CASE WHEN S.address_3 IS NULL OR LEN(S.address_3) = 0 THEN '' ELSE ' :  ' + S.address_3 END +
	CASE WHEN S.address_4 IS NULL OR LEN(S.address_4) = 0 THEN '' ELSE ' :  ' + S.address_4 END +
	CASE WHEN S.post_code IS NULL OR LEN(S.post_code) = 0 THEN '' ELSE ' :  ' + S.post_code END +
	CASE WHEN S.county IS NULL OR LEN(S.county) = 0 THEN '' ELSE ' :  ' + S.county END [Primary Address],
	S.post_code [Primary Postcode],
	WLC.[PrimaryPropertyType] [Primary Property Type],
	(
		SELECT COUNT(*)
		FROM Dawn_Data.Loan.ParticipantOfCase LPC
		WHERE LPC.FKParticipantTypeId=1
		AND LPC.IsActive=1
		AND LPC.FkLoanId=L.loan_id
	) [Number Borrowers],
	WLC.[PropertyTenure] [Property Tenure],
	CONVERT(float,WLC.[AnnualRental]) [Annual Rental],
	WLC.[IndividualCorporate] [Individual/Corporate],
	WLC.[BorrowerID1],
	WLC.[BorrowerID2],
	WLC.[BorrowerID3],
	WLC.[BorrowerID4],
	WLC.[BorrowerID5],
	CONVERT(float,WLC.[BorrowingsPerBorrower]) [BorrowingsPerBorrower]
	FROM Dawn_Data.Loan.Loan L
	LEFT OUTER JOIN Dawn_Data.[Loan].[History] H ON L.loan_id=H.DIM_loan_id_SSK
	LEFT OUTER JOIN Dawn_Data.Loan.ParticipantOfCase LPCI ON LPCI.FkLoanId=L.loan_id AND LPCI.IsActive=1 AND LPCI.FKParticipantTypeId=8
	LEFT OUTER JOIN Dawn_Data.Loan.LegalEntity LEI ON LEI.LegalEntityId=LPCI.FkLegalEntityId
	LEFT OUTER JOIN [Dawn_Data_Staging].WebLabs.[Case] WLC ON WLC.CaseReference=L.CBFL_id
	LEFT OUTER JOIN (
		SELECT CaseReference,SUM(Valuation) Valuation, Max(date_of_valuation) date_of_valuation,
			(
				SELECT TOP 1 Surveyor
				FROM [Dawn_Data].[Loan].[ValuationVW] V2
				WHERE x.CaseReference=V2.CaseReference
				AND V2.date_of_valuation=MAX(x.date_of_valuation)
			) Surveyor
		FROM (
			SELECT CaseReference,securityaddress,Valuation,date_of_valuation,[Surveyor],
			ROW_NUMBER() OVER (PARTITION BY CaseReference, securityaddress ORDER BY date_of_valuation desc) row
			FROM [Dawn_Data].[Loan].[ValuationVW]
			WHERE ValuationStatus='Received'
		) x
		WHERE x.Row = 1
		GROUP BY CaseReference
	) V ON V.CaseReference=L.CBFL_id
	LEFT OUTER JOIN (
		SELECT 
			loan_id,security_id
		FROM (
			SELECT loan_id,security_id,
			ROW_NUMBER() OVER (PARTITION BY [loan_id] ORDER BY isPrimary DESC,[security_id] desc) row
			FROM Dawn_Data.Loan.SecurityMap
			WHERE [isActive]=1
		) x
		WHERE row=1
	) SM ON SM.loan_id=L.loan_id
	LEFT OUTER JOIN Dawn_Data.Loan.Security S ON S.security_id=SM.security_id 
	WHERE L.completion_date BETWEEN @completion_from AND @completion_to
	AND (
		(@redeemed IS NULL)
		OR 
		(@redeemed = 1 AND L.redeemed_date IS NOT NULL)
		OR
		(@redeemed = 0 AND L.redeemed_date IS NULL)
	)
	ORDER BY L.maturity_date desc
END
GO
/****** Object:  StoredProcedure [Report].[XLSecurityValuation]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [Report].[XLSecurityValuation]
AS
BEGIN
	SET DATEFORMAT dmy
	select	distinct 
			 l.Loan_id AuraId
			,l.Cbfl_id CaseReference
			,s.security_id AuraSecurityId
			,s.address_1
			,isnull(s.address_2,'')	Address_2
			,isnull(s.address_3,'')	Address_3
			,isnull(s.address_4,'')	Address_4
			,isnull(s.county,'')		County
			,isnull(s.post_code,'')		PostCode
			,case when second_charge=0 then '1st' else '2nd' end Charge
			,isnull(convert(money,Report.fn_getMarketValue(l.CBFL_id)),0)	LatestValuation_AllSecuritiesInCase
	from		Dawn_Data.Loan.[Loan]		l
	left join	Dawn_Data.Loan.History		h	on	h.DIM_loan_id_SSK	=l.loan_id
	left join	Dawn_Data.Loan.SecurityMap	m	on	m.loan_id			=l.loan_id
	left join	Dawn_Data.Loan.Security		s	on	s.security_id		=m.security_id
	order by	l.CBFL_id, s.security_id
end
GO
/****** Object:  StoredProcedure [Report].[XLValuations]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
-- Report.XLCase
Create PROCEDURE [Report].[XLValuations]
	(
		@only_recent bit
	)
AS
BEGIN
	SET DATEFORMAT dmy

	SELECT [CaseReference]
		,[ValuationStatus]
		,[SecurityAddress]
		,[Surveyor]
		,[ValuationDate]
		,[Valuation]
		,[90DayValuation]
		,[RentalValue]
		,[ReinstatementValue]
		,[ValueAfterWorks]
		,[90DayValueAfterWorks]
	FROM (
		SELECT [CaseReference]
			  ,[ValuationStatus]
			  ,[SecurityAddress]
			  ,[Surveyor]
			  ,CONVERT(datetime,[ValuationDate]) [ValuationDate]
			  ,CONVERT(float,[Valuation]) [Valuation]
			  ,CONVERT(float,[90DayValuation]) [90DayValuation]
			  ,CONVERT(float,[RentalValue]) [RentalValue]
			  ,CONVERT(float,[ReinstatementValue]) [ReinstatementValue]
			  ,CONVERT(float,[ValueAfterWorks]) [ValueAfterWorks]
			  ,CONVERT(float,[90DayValueAfterWorks]) [90DayValueAfterWorks]
			  ,row_number() OVER (PARTITION BY [CaseReference], [SecurityAddress] ORDER BY CONVERT(datetime,[ValuationDate]) DESC) [rownum]
		FROM [Dawn_Data_Staging].[WebLabs].[Valuation]
	) x
	WHERE (@only_recent = 0 OR x.rownum=1)
	ORDER BY [CaseReference],[SecurityAddress],[ValuationDate] DESC
END
GO
/****** Object:  StoredProcedure [risk].[ExceptionInsUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  proc [risk].[ExceptionInsUpd]
			 @ExceptionLogId	int
			,@LoanId			int
			,@UnderwriterName	nvarchar(255)
			,@BorrowerName		nvarchar(255)
			,@LoanAmount		money
			,@LTV				int
			,@Introducer		nvarchar(255)
			,@ExceptionRequired	nvarchar(255)
			,@Rationale			ntext
			,@RequestDate		datetime
			,@RequestedBy		varchar(255)
			,@AuthorisedBy		varchar(255)
			,@Category			nvarchar(255)
			,@FinancialCostToAmicus	money
			,@ExceptionType		int
			,@CDD 				varchar(255)
			,@Staff_ID			varchar(255)

as begin
	set nocount on	

	declare @IntroducerTypeId int = 8 

	if(@ExceptionLogId = 0) begin
			insert Dawn_Data.Risk.ExceptionsRequestLog
			(
				[CaseReference]           ,[UnderwriterName]           ,[BorrowerName]           ,[LoanAmount]
			   ,[LTV]           ,[Introducer]           ,[ExceptionRequired]           ,[Rationale]
			   ,[RequestDate]           ,[RequestedBy]           ,[AuthorisedBy]           ,[Category]
			   ,[FinancialCostToAmicus]           ,[Staff_ID]           ,[dteDate]           
			   ,[loan_id]           ,[ExceptionType]           ,[CDD]
			 )
			 values
			 (
	 			 (select cbfl_id from Dawn_Data.Loan.Loan where loan_id=@LoanId)
				,@UnderwriterName
				,@BorrowerName
				,@LoanAmount
				,@LTV
				,@Introducer
				,@ExceptionRequired
				,@Rationale
				,@RequestDate
				,@RequestedBy
				,@AuthorisedBy
				,@Category
				,@FinancialCostToAmicus
				,@Staff_ID
				,getdate()
				,@LoanId
				,@ExceptionType
				,@CDD
		   )
		   set @ExceptionLogId = SCOPE_IDENTITY()
		end

	else begin
		update Dawn_Data.Risk.ExceptionsRequestLog
			set	UnderwriterName	=	@UnderwriterName
				,BorrowerName	=	@BorrowerName
				,LoanAmount		=	@LoanAmount
				,LTV			=	@LTV
				,Introducer		=	@Introducer
				,ExceptionRequired	=	@ExceptionRequired
				,Rationale		=	@Rationale
				,RequestDate	=	@RequestDate
				,RequestedBy	=	@RequestedBy
				,AuthorisedBy	=	@AuthorisedBy
				,Category		=	@Category
				,FinancialCostToAmicus	=	@FinancialCostToAmicus
				,Staff_ID		=	@Staff_ID
				,dteDateUpdated=	getdate()
				,ExceptionType	=	@ExceptionType
				,CDD			=	@CDD
		where 	CaseId = @ExceptionLogId	
	end

	select @ExceptionLogId as ExceptionLogItemId
end
GO
/****** Object:  StoredProcedure [risk].[ExceptionLogItemGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [risk].[ExceptionLogItemGet] @ExceptionLogItemId int as begin
	set nocount on

	declare @IntroducerTypeId int = 8 

	select	   CaseId						ExceptionLogId
			  ,loan_id						LoanId
			  ,isnull(UnderwriterName,'')	UnderwriterName
			  ,isnull(BorrowerName,'')		BorrowerName
			  ,isnull(LoanAmount,0)			LoanAmount
			  ,isnull(LTV,0.00)				LTV
			  ,isnull(le.LegalEntityId,0)		IntroducerId
			  ,isnull(le.LegalEntityName,'')	Introducer
			  ,isnull(ExceptionRequired,'')	ExceptionRequired
			  ,isnull(Rationale,'')			Rationale
			  ,isnull(RequestDate,'')		RequestDate
			  ,isnull(RequestedBy,'')		RequestedBy
			  ,isnull(AuthorisedBy,'')		AuthorisedBy
			  ,isnull(Category,'')			Category
			  ,isnull(FinancialCostToAmicus,0.00) FinancialCostToAmicus
			  ,isnull(ExceptionType,'')		ExceptionType
			  ,isnull(CDD,'')				CDD
			  ,isnull(dteDate,'')			Created
 			  ,isnull(Staff_ID,'')			CreatedBy
			  ,isnull(dteDateUpdated,'')	LastUpdate
 			  ,isnull(Staff_ID,'')			LastUpdateBy

	from		Dawn_Data.Risk.ExceptionsRequestLog	e

	left join	Dawn_Data.Loan.ParticipantOfCase		poc	on	poc.FkLoanId	= e.loan_id
													and poc.FKParticipantTypeId = @IntroducerTypeId

	left join	Dawn_Data.Loan.LegalEntity			le	on	le.LegalEntityId	=	poc.FkLegalEntityId
	
	where	CaseId = @ExceptionLogItemId

end
GO
/****** Object:  StoredProcedure [risk].[ExceptionLogListByLoanGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [risk].[ExceptionLogListByLoanGet] @LoanId int as begin
	set nocount on

	declare @IntroducerTypeId int = 8 

	select	   CaseId						ExceptionLogId
			  ,loan_id						LoanId
			  --,CaseReference
			  ,isnull(UnderwriterName,'')	UnderwriterName
			  ,isnull(BorrowerName,'')		BorrowerName
			  ,isnull(LoanAmount,0)			LoanAmount
			  ,isnull(LTV,0.00)				LTV
			  ,isnull(le.LegalEntityName,'')		Introducer
			  ,isnull(ExceptionRequired,'')	ExceptionRequired
			  ,isnull(Rationale,'')			Rationale
			  ,isnull(RequestDate,'')		RequestDate
			  ,isnull(RequestedBy,'')		RequestedBy
			  ,isnull(AuthorisedBy,'')		AuthorisedBy
			  ,isnull(Category,'')			Category
			  ,isnull(FinancialCostToAmicus,0.00) FinancialCostToAmicus
			  ,isnull(ExceptionType,'')		ExceptionType
			  ,isnull(CDD,'')				CDD

			  ,isnull(dteDate,'')			Created
 			  ,isnull(Staff_ID,'')			CreatedBy
			  ,isnull(dteDateUpdated,'')	LastUpdate
 			  ,isnull(Staff_ID,'')			LastUpdateBy

	from		Dawn_Data.Risk.ExceptionsRequestLog	e
	left join	Dawn_Data.Loan.ParticipantOfCase		poc	on	poc.FkLoanId		=	e.loan_id and poc.FKParticipantTypeId = @IntroducerTypeId
	left join	Dawn_Data.Loan.LegalEntity			le	on	le.LegalEntityId	=	poc.FkLegalEntityId
	where	loan_id = @LoanId
	order by RequestDate desc
end
GO
/****** Object:  StoredProcedure [UserSecurity].[RoleByCategoryGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [UserSecurity].[RoleByCategoryGet]
	@SecurityCategory VarChar(100),
	@SecuritySubCategory VarChar(100)
AS

SELECT a.AdGroupName
FROM Dawn_Data.UserSecurity.Category c,
	 Dawn_Data.UserSecurity.RoleCategory r,
	 Dawn_Data.UserSecurity.RoleAdGroup a
WHERE c.SecurityCategoryId = r.FkSecurityCategoryId
  AND r.FkSecurityRoleId = a.FkSecurityRoleId
  AND c.SecurityCategory = @SecurityCategory
  AND c.SecuritySubCategory = @SecuritySubCategory
  AND AllowAccess = 1

GO
/****** Object:  StoredProcedure [workflow].[AllTaskStatusUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [workflow].[AllTaskStatusUpd] @WorkFlowId int , @FundRequestId int , @TaskUpdates varchar(max), @User nvarchar(255)  as 
begin
	set nocount on
	declare @Message varchar(255),@rc int
	
	begin try
		set @rc=-2

		declare @TaskList table(rid int identity , TaskString varchar(max))
		declare @Result table (rc int null)
		declare @i int, @TaskSep varchar(16), @RowSep varchar(16), @TaskString varchar(max);	select @TaskSep='~~',@RowSep='|',@i=0

		insert @TaskList (TaskString) select value from dbo.fn_split(@TaskUpdates,@TaskSep)
		delete @TaskList where replace(isnull(TaskString,''),' ','')=''

		if not exists(select * from Dawn_Data.WorkFlow.StageTaskStatus where RequestId=@FundRequestId)
			begin
				/*create a complete set of status' for a new request				*/
				insert @Result exec WorkFlow.CreateNewWorkFlow @WorkFlowId, @FundRequestId, @User
				select @rc=min(rc) from @Result
			end
--		else
			/*status' exist, just single station updates
			*/
--			begin
				declare @StatusOfTasks table (StationId int , StageId int , TaskOrder int , IsDone Bit)
				declare @thisTask varchar(1024) , @StageTaskTemplateId int
				/*get the tasks to update
				*/
				declare @StationID int , @StageId int , @TaskOrder int , @IsDone Bit
				select @i=min(rid) from @TaskList
				while @i is not null begin
					select @thisTask = TaskString from @TaskList where rid=@i

					select @StationID	=	value from dbo.fn_split(@thisTask,@RowSep) where idx=0
					select @StageId		=	value from dbo.fn_split(@thisTask,@RowSep) where idx=1
					select @TaskOrder	=	value from dbo.fn_split(@thisTask,@RowSep) where idx=2
					select @IsDone		=	value from dbo.fn_split(@thisTask,@RowSep) where idx=3

					select	@StageTaskTemplateId		= StageTaskTemplateId
						from	Dawn_Data.[WorkFlow].[StageTaskTemplate] 
					where	fkWorkFlowId	= @WorkFlowId
						and		fkStationId		= @StationID
						and		fkStageId		= @StageId
						and		TaskOrder		= @TaskOrder

					update Dawn_Data.[WorkFlow].[StageTaskStatus] set IsDone =@IsDone , LastUpdate = getDate() , LastUpdateBy=@User where fkStageTaskTemplateId=@StageTaskTemplateId and RequestId=@FundRequestId and IsDone != @IsDone

					select @i=min(rid) from @TaskList where rid>@i
				end
				set @rc=0

--			end
			
		set @rc=0
	end try
	begin catch
		set @rc=-1
	end catch

earlyexit:
	select @rc 
end
GO
/****** Object:  StoredProcedure [workflow].[CreateNewFundRequestWorkFlow]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [workflow].[CreateNewFundRequestWorkFlow] @FundRequestId int , @User nvarchar(255) as 
begin
	begin try
		set nocount on

		declare @WorkFlowId int , @rc int , @Message varchar(255)
		select @WorkFlowId=0 , @rc=-3 , @Message=''

		if not exists(select * from Dawn_Data.WorkFlow.StageTaskStatus where RequestId=@FundRequestId)
		begin
			set @rc=-2
			declare @wfId table(id int)
			insert @wfId(id) exec WorkFlow.WorkFlowIdGet 'Drawdown Process'
			select @WorkFlowId = min(id) from @wfId
			if @WorkFlowId<>0
				begin
					set @rc=-1
					delete @wfId
					insert @wfId(id) exec WorkFlow.CreateNewWorkFlow @WorkFlowId , @FundRequestId , @User
					select @rc = min(id) from @wfId
					if @rc=0
						update 
						--select * from 
							Dawn_Data.WorkFlow.StageTaskStatus
						set Isdone=1

						where RequestId=@FundRequestId
							and fkStageTaskTemplateId = 1

					if @rc<>0
						set @Message='Error: Failed to copy Workflow Template.'
					else
						set @rc=0
				end
			else
				set  @Message='Error: Invalid workflow Id.'
		end
		else
			set  @Message='Error: Fund Request alreasady Exists.'

	end try
	begin catch
		select @rc=-1 , @Message = ERROR_MESSAGE()
	end catch

	select @rc rc , @Message [Message]
end
GO
/****** Object:  StoredProcedure [workflow].[CreateNewWorkFlow]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [workflow].[CreateNewWorkFlow] @WorkFlowId int , @RequestId int , @User nvarchar(255)  as 
begin
	set nocount on
	declare @Message varchar(255),@rc int
	begin try
		set @rc=-2
		insert Dawn_Data.WorkFlow.StageTaskStatus (fkStageTaskTemplateId,RequestId,CreatedBy)
			select	StageTaskTemplateId,@RequestId,@User	from	Dawn_Data.WorkFlow.StageTaskTemplate	where fkWorkFlowId=@WorkFlowId

		set @rc=0
	end try
	begin catch
		set @rc=-1
	end catch
	select @rc 
end
GO
/****** Object:  StoredProcedure [workflow].[FunctionMapGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [workflow].[FunctionMapGet] @WorkFlowId int,@StationId int , @rc int output
as begin try
	set nocount on;	set @rc=-1

	select	 sf.StationFunctionId
			,a.ActivityId
			,a.[Description]
			,InsertData
			,UpdateData
			,DeleteData
			,ReadData
	--select *
	from		Dawn_Data.WorkFlow.StationFunction	sf
	inner join	Dawn_Data.WorkFlow.Activity			a	on	a.ActivityId	=	sf.fkActivityId
	where		sf.IsActive		=	1
			and	a.IsActive		=	1
			and sf.fkWorkFlowId	=	@WorkFlowId
			and sf.fkStationId = @StationId

	set @rc=0
end try
begin catch
	set @rc=-1
end catch
GO
/****** Object:  StoredProcedure [workflow].[NextStationGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [workflow].[NextStationGet] @WorkFlowId int,@RequestId int ,@StationId int , @StationType varchar(255) , @rc int output
as begin try
	set nocount on;	set @rc=-1

	declare @StageTaskId int
	declare @StationList table (StationId int, StationDescription varchar(255))
	declare @CurrentStatus table (StationId int,StageId int	, StageDescription varchar(255)	, StageStatusDescription varchar(255)	,TaskOrder int	,IsMandatory bit	,RequiredToCompleteStage bit ,Completed int, IsForDisplay int	)

	/*what station is a request at...
	*/
	insert @StationList	select  StationId,StationDescription from Dawn_Data.WorkFlow.Station where StationId = @StationId

	if @StationType='next' begin
		--is this stage / station complete
		--declare @IsComplete tinyint=0

		--insert @CurrentStatus 
		--	exec WorkFlow.WorkFlowTaskStatusGet @WorkFlowId, @StationId, @RequestId, -1 ,@rc output

		--select @IsComplete=sum(Completed) from @CurrentStatus

		--if @IsComplete>0 begin

			delete @StationList
			insert @StationList	select  StationId,StationDescription from Dawn_Data.WorkFlow.Station where StationId in 
				(select TargetStationId from Dawn_Data.WorkFlow.StationRouting where SourceStationId=@StationId)

--		end

	end

	--if @thisStationType='prev' begin	end

	select StationId,StationDescription from @StationList order by StationId
	set @rc=0
end try

begin catch
	set @rc=-1
	select error_message()
end catch

GO
/****** Object:  StoredProcedure [workflow].[StationDescriptionByIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [workflow].[StationDescriptionByIdGet] @StationId int 
as begin
	set nocount on
	declare @rc int
	begin try
		select StationDescription from Dawn_Data.WorkFlow.Station where StationId = @StationId
		set @rc=0
	end try
	begin catch
		set @rc=-1
	end catch
	--select @rc
end
GO
/****** Object:  StoredProcedure [workflow].[StationDescriptionGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [workflow].[StationDescriptionGet] @UserName nvarchar(255)-- ,@rc int output
as begin
	set nocount on
		select StationId,StationDescription from Dawn_Data.WorkFlow.Station where StationId in (
			select	top 1 fkStationId StationId from	Dawn_Data.WorkFlow.StationUser where UserName = @UserName
			)

end
GO
/****** Object:  StoredProcedure [workflow].[StationGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [workflow].[StationGet] @UserName nvarchar(255)-- ,@rc int output
as begin
	set nocount on
	declare @rc int
	begin try
		declare @sid int;
		set @sid=99
		select	@sid= fkStationId from	Dawn_Data.WorkFlow.StationUser where UserName = @UserName

		select @sid StationId
		set @rc=0
	end try
	begin catch
		set @rc=-1
	end catch
	select @rc
end
--select * from	Dawn_Data.WorkFlow.StationUser where UserName
GO
/****** Object:  StoredProcedure [workflow].[WorkFlowIdGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [workflow].[WorkFlowIdGet] @WorkFlow nvarchar(255)  as 
begin
	set nocount on
	--declare @Id int
	select WorkFlowId Id from Dawn_Data.WorkFlow.WorkFlow where [Description] = @WorkFlow
end
GO
/****** Object:  StoredProcedure [workflow].[WorkFlowStatusGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [workflow].[WorkFlowStatusGet] @WorkFlowId int, @RequestId int 
as begin
	set nocount on

	if @RequestId<>0
		select	wfSts.RequestId
				,stn.StationId
				,stage.StageId	,stage.StageDescription
				,sts.StageStatusDescription		
				,IsForDisplay		,TaskOrder		,IsMandatory		,RequiredToCompleteStage
				,IsDone

		from			Dawn_Data.WorkFlow.StageTaskStatus	wfSts
		inner	join	Dawn_Data.WorkFlow.StageTaskTemplate	tmplt		on	tmplt.StageTaskTemplateId	=	wfSts.fkStageTaskTemplateId
		inner	join	Dawn_Data.WorkFlow.Station			stn			on	stn.StationId				=	tmplt.fkStationId
		inner	join	Dawn_Data.WorkFlow.WorkFlow			flow		on	flow.WorkFlowId				=	tmplt.fkWorkFlowId
		inner	join	Dawn_Data.WorkFlow.Stage				stage		on	stage.StageId				=	tmplt.fkStageId
		inner	join	Dawn_Data.WorkFlow.StageStatus		sts			on	sts.StageStatusId			=	tmplt.fkStageStatusId

		where	flow.IsActive	= 1
			and	tmplt.IsActive	= 1
			and	stn.IsActive	= 1
			and	stage.IsActive	= 1
			and	sts.IsActive	= 1
			and flow.workflowid = @WorkFlowId 
			and wfSts.RequestId = @RequestId 
			and tmplt.IsForDisplay=1
		order	by	flow.WorkFlowId	, stage.StageId , tmplt.TaskOrder
	else
		/*blank template when creating a new fund request*/
		select	 0 as RequestId
				,stn.StationId
				,stage.StageId
				,stage.StageDescription
				,sts.StageStatusDescription		
				,tmplt.IsForDisplay
				,tmplt.TaskOrder
				,tmplt.IsMandatory
				,tmplt.RequiredToCompleteStage
				,0 as IsDone
		from			Dawn_Data.WorkFlow.StageTaskStatus	wfSts
		inner	join	Dawn_Data.WorkFlow.StageTaskTemplate	tmplt		on	tmplt.StageTaskTemplateId	=	wfSts.fkStageTaskTemplateId
		inner	join	Dawn_Data.WorkFlow.Station			stn			on	stn.StationId				=	tmplt.fkStationId
		inner	join	Dawn_Data.WorkFlow.WorkFlow			flow		on	flow.WorkFlowId				=	tmplt.fkWorkFlowId
		inner	join	Dawn_Data.WorkFlow.Stage				stage		on	stage.StageId				=	tmplt.fkStageId
		inner	join	Dawn_Data.WorkFlow.StageStatus		sts			on	sts.StageStatusId			=	tmplt.fkStageStatusId

		where	flow.IsActive	= 1
			and	tmplt.IsActive	= 1
			and	stn.IsActive	= 1
			and	stage.IsActive	= 1
			and	sts.IsActive	= 1

			and	flow.workflowid = @WorkFlowId 
			and tmplt.IsForDisplay=1
		order	by	flow.WorkFlowId	, stage.StageId , tmplt.TaskOrder
end
GO
/****** Object:  StoredProcedure [workflow].[WorkFlowTaskStatusGet]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [workflow].[WorkFlowTaskStatusGet] @WorkFlowId int, @StationId int , @RequestId int , @Status smallint , @rc int output --done or not or any 
as begin try
	set nocount on;	set @rc=-1

	/*if station==0 then get all sts
	*/
	declare @WorkFlowStatus table (  RequestId					int
									,StationId					int
									,StageId					int
									,StageDescription			varchar(255)
									,StageStatusDescription		varchar(255)
									,IsForDisplay				bit
									,TaskOrder					int
									,IsMandatory				bit
									,RequiredToCompleteStage	bit
									,IsDone						bit
									)
	if @RequestId<>0 begin

		insert @WorkFlowStatus	(	RequestId
									,StationId
									,StageId
									,StageDescription
									,StageStatusDescription
									,IsForDisplay
									,TaskOrder
									,IsMandatory
									,RequiredToCompleteStage
									,IsDone 
									)
		select	 wfSts.RequestId
				,stn.StationId
				,stage.StageId
				,stage.StageDescription
				,sts.StageStatusDescription		
				,tmplt.IsForDisplay
				,tmplt.TaskOrder
				,tmplt.IsMandatory
				,tmplt.RequiredToCompleteStage
				,IsDone
		from			Dawn_Data.WorkFlow.StageTaskStatus		wfSts
		inner	join	Dawn_Data.WorkFlow.StageTaskTemplate		tmplt		on	tmplt.StageTaskTemplateId	=	wfSts.fkStageTaskTemplateId
		inner	join	Dawn_Data.WorkFlow.WorkFlow				flow		on	flow.WorkFlowId				=	tmplt.fkWorkFlowId
		inner	join	Dawn_Data.WorkFlow.Stage					stage		on	stage.StageId				=	tmplt.fkStageId
		inner	join	Dawn_Data.WorkFlow.StageStatus			sts			on	sts.StageStatusId			=	tmplt.fkStageStatusId
		inner	join	Dawn_Data.WorkFlow.Station				stn			on	stn.StationId				=	tmplt.fkStationId

		where		flow.IsActive	= 1
				and	tmplt.IsActive	= 1
				and	stn.IsActive	= 1
				and	stage.IsActive	= 1
				and	sts.IsActive	= 1

			and	flow.workflowid		=	@WorkFlowId 
			and	wfSts.RequestId		=	@RequestId
			and tmplt.fkStationId	=	case when @StationId=0 then tmplt.fkStationId else @StationId end
			and tmplt.IsForDisplay	=	1--case when @Status >=0 then 1 else IsForDisplay end
			--and IsDone				=	case when @Status >=0 then @Status else IsDone end
			--and tmplt.RequiredToCompleteStage	= 1
	end
	else begin
--select 1
		insert @WorkFlowStatus	(	RequestId	,StationId	,StageId	,StageDescription	,StageStatusDescription	,IsForDisplay
									,TaskOrder	,IsMandatory	,RequiredToCompleteStage	,IsDone 
									)
		select		 0 RequestId
					,stn.StationId
					,stage.StageId
					,stage.StageDescription
					,sts.StageStatusDescription		
					,tmplt.IsForDisplay
					,tmplt.TaskOrder
					,tmplt.IsMandatory
					,tmplt.RequiredToCompleteStage
					,0 IsDone
		from			Dawn_Data.WorkFlow.StageTaskTemplate		tmplt		
		inner	join	Dawn_Data.WorkFlow.WorkFlow				flow		on	flow.WorkFlowId				=	tmplt.fkWorkFlowId
		inner	join	Dawn_Data.WorkFlow.Stage					stage		on	stage.StageId				=	tmplt.fkStageId
		inner	join	Dawn_Data.WorkFlow.StageStatus			sts			on	sts.StageStatusId			=	tmplt.fkStageStatusId
		inner	join	Dawn_Data.WorkFlow.Station				stn			on	stn.StationId				=	tmplt.fkStationId

		where		flow.IsActive	= 1		and	tmplt.IsActive	= 1		and	stn.IsActive	= 1		and	stage.IsActive	= 1		and	sts.IsActive	= 1
			and	flow.workflowid		=	@WorkFlowId 	
			and tmplt.fkStationId	=	case when @StationId=0 then tmplt.fkStationId else @StationId end
			--and RequiredToCompleteStage=1
	end

--select * from Dawn_Data.WorkFlow.StageTaskTemplate
	select	 StationId
			,StageId	
			,StageDescription
			,StageStatusDescription		
			,TaskOrder
			,IsMandatory
			,RequiredToCompleteStage
			,IsDone
			,IsForDisplay
	from	@WorkFlowStatus
	order	by
		StageId , TaskOrder

	set @rc=0
end try
begin catch
	set @rc=-1
end catch
GO
/****** Object:  StoredProcedure [workflow].[WorkFlowTaskStatusUpd]    Script Date: 15/11/2019 13:34:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
----------------------------------------------------------------------------------------------------------------------------------
--Update single task sts or all task sts for a request
----------------------------------------------------------------------------------------------------------------------------------
create proc [workflow].[WorkFlowTaskStatusUpd] @WorkFlowStageTaskStatusId int, @User nvarchar(255), @Status smallint--,@rc int output
as begin
	set nocount on
	declare @rc int
	begin try
		set @rc=-1

		update Dawn_Data.WorkFlow.StageTaskStatus
			set IsDone = @Status , LastUpdate = getdate() , LastUpdateBy = @User
		where	
			StageTaskStatusId = @WorkFlowStageTaskStatusId
		set @rc=0

	end try
	begin catch
		set @rc=-1
	end catch
	select @rc rc
end
GO
USE [master]
GO
ALTER DATABASE [Dawn_v100] SET  READ_WRITE 
GO
