-- Manual script to insert missing case numbers into the system if not already present
USE Dawn_Data;
DECLARE @entrycount SMALLINT;
DECLARE @casenr NVARCHAR(255);
DECLARE @id NVARCHAR(36);
DECLARE @caseid INTEGER;
DECLARE @DipContactId INTEGER;
DECLARE @DipLoanPropertyDevelopmentId INTEGER;
DECLARE @DipLoanFinancialDetailsId INTEGER;
DECLARE @DipLoanFinancialDetailsMultiId INTEGER;
DECLARE @DipLoanFinancialDetailsDevId INTEGER;


-- 10002-PROG - Progressive Developers Kent Limited
SET  @casenr = '10002-PROG';
SELECT  @entrycount = count(*) FROM Origination.[Case] WHERE CaseNr = @casenr
IF (@entrycount = 0)
BEGIN
    SET @id = LOWER(NEWID());
    INSERT INTO Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@id, @casenr, 'dip', null, 4, GETDATE());    
    SELECT @caseid = CaseId FROM Origination.[Case] WHERE Id = @id
    
	INSERT INTO Origination.DipContact DEFAULT VALUES;
	select @DipContactId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanPropertyDevelopment DEFAULT VALUES;
	select @DipLoanPropertyDevelopmentId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsDev DEFAULT VALUES;
	select @DipLoanFinancialDetailsDevId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsMulti DEFAULT VALUES;
	select @DipLoanFinancialDetailsMultiId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetails (FkLoanFinancialDetailsMultiId, FkLoanFinancialDetailsDevId) VALUES (@DipLoanFinancialDetailsMultiId, @DipLoanFinancialDetailsDevId);
	select @DipLoanFinancialDetailsId = SCOPE_IDENTITY();

	INSERT INTO Origination.Dip (CreatedBy, FkCaseId, FkContactId, FkLoanPropertyDevelopmentId, FkLoanFinancialDetailsId) 
	VALUES (GETDATE(), @caseid, @DipContactId, @DipLoanPropertyDevelopmentId, @DipLoanFinancialDetailsId);
END

-- 10003-PROG - Progressive Developers Land Limited
SET  @casenr = '10003-PROG';
SELECT  @entrycount = count(*) FROM Origination.[Case] WHERE CaseNr = @casenr
IF (@entrycount = 0)
BEGIN
    SET @id = LOWER(NEWID());
    INSERT INTO Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@id, @casenr, 'dip', null, 4, GETDATE());    
    SELECT @caseid = CaseId FROM Origination.[Case] WHERE Id = @id
    
	INSERT INTO Origination.DipContact DEFAULT VALUES;
	select @DipContactId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanPropertyDevelopment DEFAULT VALUES;
	select @DipLoanPropertyDevelopmentId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsDev DEFAULT VALUES;
	select @DipLoanFinancialDetailsDevId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsMulti DEFAULT VALUES;
	select @DipLoanFinancialDetailsMultiId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetails (FkLoanFinancialDetailsMultiId, FkLoanFinancialDetailsDevId) VALUES (@DipLoanFinancialDetailsMultiId, @DipLoanFinancialDetailsDevId);
	select @DipLoanFinancialDetailsId = SCOPE_IDENTITY();

	INSERT INTO Origination.Dip (CreatedBy, FkCaseId, FkContactId, FkLoanPropertyDevelopmentId, FkLoanFinancialDetailsId) 
	VALUES (GETDATE(), @caseid, @DipContactId, @DipLoanPropertyDevelopmentId, @DipLoanFinancialDetailsId);
END

-- 10004-PROG - Progressive Developers London Limited
SET  @casenr = '10004-PROG';
SELECT  @entrycount = count(*) FROM Origination.[Case] WHERE CaseNr = @casenr
IF (@entrycount = 0)
BEGIN
    SET @id = LOWER(NEWID());
    INSERT INTO Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@id, @casenr, 'dip', null, 4, GETDATE());    
    SELECT @caseid = CaseId FROM Origination.[Case] WHERE Id = @id
    
	INSERT INTO Origination.DipContact DEFAULT VALUES;
	select @DipContactId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanPropertyDevelopment DEFAULT VALUES;
	select @DipLoanPropertyDevelopmentId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsDev DEFAULT VALUES;
	select @DipLoanFinancialDetailsDevId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsMulti DEFAULT VALUES;
	select @DipLoanFinancialDetailsMultiId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetails (FkLoanFinancialDetailsMultiId, FkLoanFinancialDetailsDevId) VALUES (@DipLoanFinancialDetailsMultiId, @DipLoanFinancialDetailsDevId);
	select @DipLoanFinancialDetailsId = SCOPE_IDENTITY();

	INSERT INTO Origination.Dip (CreatedBy, FkCaseId, FkContactId, FkLoanPropertyDevelopmentId, FkLoanFinancialDetailsId) 
	VALUES (GETDATE(), @caseid, @DipContactId, @DipLoanPropertyDevelopmentId, @DipLoanFinancialDetailsId);
END

-- 10005-LAVE - Lavender Estates Limited
SET  @casenr = '10005-LAVE';
SELECT  @entrycount = count(*) FROM Origination.[Case] WHERE CaseNr = @casenr
IF (@entrycount = 0)
BEGIN
    SET @id = LOWER(NEWID());
    INSERT INTO Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@id, @casenr, 'dip', null, 4, GETDATE());    
    SELECT @caseid = CaseId FROM Origination.[Case] WHERE Id = @id
    
	INSERT INTO Origination.DipContact DEFAULT VALUES;
	select @DipContactId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanPropertyDevelopment DEFAULT VALUES;
	select @DipLoanPropertyDevelopmentId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsDev DEFAULT VALUES;
	select @DipLoanFinancialDetailsDevId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsMulti DEFAULT VALUES;
	select @DipLoanFinancialDetailsMultiId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetails (FkLoanFinancialDetailsMultiId, FkLoanFinancialDetailsDevId) VALUES (@DipLoanFinancialDetailsMultiId, @DipLoanFinancialDetailsDevId);
	select @DipLoanFinancialDetailsId = SCOPE_IDENTITY();

	INSERT INTO Origination.Dip (CreatedBy, FkCaseId, FkContactId, FkLoanPropertyDevelopmentId, FkLoanFinancialDetailsId) 
	VALUES (GETDATE(), @caseid, @DipContactId, @DipLoanPropertyDevelopmentId, @DipLoanFinancialDetailsId);
END

-- 10006-INVE - Investment DAR (U.K.) Limited
SET  @casenr = '10006-INVE';
SELECT  @entrycount = count(*) FROM Origination.[Case] WHERE CaseNr = @casenr
IF (@entrycount = 0)
BEGIN
    SET @id = LOWER(NEWID());
    INSERT INTO Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@id, @casenr, 'dip', null, 4, GETDATE());    
    SELECT @caseid = CaseId FROM Origination.[Case] WHERE Id = @id
    
	INSERT INTO Origination.DipContact DEFAULT VALUES;
	select @DipContactId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanPropertyDevelopment DEFAULT VALUES;
	select @DipLoanPropertyDevelopmentId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsDev DEFAULT VALUES;
	select @DipLoanFinancialDetailsDevId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsMulti DEFAULT VALUES;
	select @DipLoanFinancialDetailsMultiId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetails (FkLoanFinancialDetailsMultiId, FkLoanFinancialDetailsDevId) VALUES (@DipLoanFinancialDetailsMultiId, @DipLoanFinancialDetailsDevId);
	select @DipLoanFinancialDetailsId = SCOPE_IDENTITY();

	INSERT INTO Origination.Dip (CreatedBy, FkCaseId, FkContactId, FkLoanPropertyDevelopmentId, FkLoanFinancialDetailsId) 
	VALUES (GETDATE(), @caseid, @DipContactId, @DipLoanPropertyDevelopmentId, @DipLoanFinancialDetailsId);
END

-- 10007-JSFO - JS Focus Properties Limited
SET  @casenr = '10007-JSFO';
SELECT  @entrycount = count(*) FROM Origination.[Case] WHERE CaseNr = @casenr
IF (@entrycount = 0)
BEGIN
    SET @id = LOWER(NEWID());
    INSERT INTO Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@id, @casenr, 'dip', null, 4, GETDATE());    
    SELECT @caseid = CaseId FROM Origination.[Case] WHERE Id = @id
    
	INSERT INTO Origination.DipContact DEFAULT VALUES;
	select @DipContactId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanPropertyDevelopment DEFAULT VALUES;
	select @DipLoanPropertyDevelopmentId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsDev DEFAULT VALUES;
	select @DipLoanFinancialDetailsDevId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsMulti DEFAULT VALUES;
	select @DipLoanFinancialDetailsMultiId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetails (FkLoanFinancialDetailsMultiId, FkLoanFinancialDetailsDevId) VALUES (@DipLoanFinancialDetailsMultiId, @DipLoanFinancialDetailsDevId);
	select @DipLoanFinancialDetailsId = SCOPE_IDENTITY();

	INSERT INTO Origination.Dip (CreatedBy, FkCaseId, FkContactId, FkLoanPropertyDevelopmentId, FkLoanFinancialDetailsId) 
	VALUES (GETDATE(), @caseid, @DipContactId, @DipLoanPropertyDevelopmentId, @DipLoanFinancialDetailsId);
END

-- 10008-LOWE - Lowestoft Court Apartments Limited
SET  @casenr = '10008-LOWE';
SELECT  @entrycount = count(*) FROM Origination.[Case] WHERE CaseNr = @casenr
IF (@entrycount = 0)
BEGIN
    SET @id = LOWER(NEWID());
    INSERT INTO Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@id, @casenr, 'dip', null, 4, GETDATE());    
    SELECT @caseid = CaseId FROM Origination.[Case] WHERE Id = @id
    
	INSERT INTO Origination.DipContact DEFAULT VALUES;
	select @DipContactId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanPropertyDevelopment DEFAULT VALUES;
	select @DipLoanPropertyDevelopmentId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsDev DEFAULT VALUES;
	select @DipLoanFinancialDetailsDevId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetailsMulti DEFAULT VALUES;
	select @DipLoanFinancialDetailsMultiId = SCOPE_IDENTITY();

	INSERT INTO Origination.DipLoanFinancialDetails (FkLoanFinancialDetailsMultiId, FkLoanFinancialDetailsDevId) VALUES (@DipLoanFinancialDetailsMultiId, @DipLoanFinancialDetailsDevId);
	select @DipLoanFinancialDetailsId = SCOPE_IDENTITY();

	INSERT INTO Origination.Dip (CreatedBy, FkCaseId, FkContactId, FkLoanPropertyDevelopmentId, FkLoanFinancialDetailsId) 
	VALUES (GETDATE(), @caseid, @DipContactId, @DipLoanPropertyDevelopmentId, @DipLoanFinancialDetailsId);
END