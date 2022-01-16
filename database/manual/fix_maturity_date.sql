-- Manual script to update cases with maturity date off by one day
USE Dawn_Data;
DECLARE @casenr NVARCHAR(255);
DECLARE @caseId NVARCHAR(36);
DECLARE @exisitingMaturityDate DATETIME;
DECLARE @correctedMaturityDate DATETIME


-- 10044-SOSA
SET @casenr = '10044-SOSA';
SELECT @caseId = CaseId
FROM Origination.[Case]
WHERE CaseNr = @casenr;

SELECT @exisitingMaturityDate = DateOfMaturity
FROM Servicing.Completed
WHERE FkCaseId = @caseId;

SELECT @correctedMaturityDate = DATEADD(day, 1, @exisitingMaturityDate);

update Servicing.Completed
SET DateOfMaturity = @correctedMaturityDate
WHERE FkCaseId = @caseId;

--10018-SOSA
SET @casenr = '10018-SOSA';
SELECT @caseId = CaseId
FROM Origination.[Case]
WHERE CaseNr = @casenr;

SELECT @exisitingMaturityDate = DateOfMaturity
FROM Servicing.Completed
WHERE FkCaseId = @caseId;

SELECT @correctedMaturityDate = DATEADD(day, 1, @exisitingMaturityDate);

update Servicing.Completed
SET DateOfMaturity = @correctedMaturityDate
WHERE FkCaseId = @caseId;

-- 10040-CLIC
SET @casenr = '10040-CLIC';
SELECT @caseId = CaseId
FROM Origination.[Case]
WHERE CaseNr = @casenr;

SELECT @exisitingMaturityDate = DateOfMaturity
FROM Servicing.Completed
WHERE FkCaseId = @caseId;

SELECT @correctedMaturityDate = DATEADD(day, 1, @exisitingMaturityDate);

update Servicing.Completed
SET DateOfMaturity = @correctedMaturityDate
WHERE FkCaseId = @caseId;

-- 10038-CROW
SET @casenr = '10038-CROW';
SELECT @caseId = CaseId
FROM Origination.[Case]
WHERE CaseNr = @casenr;

SELECT @exisitingMaturityDate = DateOfMaturity
FROM Servicing.Completed
WHERE FkCaseId = @caseId;

SELECT @correctedMaturityDate = DATEADD(day, 1, @exisitingMaturityDate);

update Servicing.Completed
SET DateOfMaturity = @correctedMaturityDate
WHERE FkCaseId = @caseId;

-- 10034-FCHO
SET @casenr = '10034-FCHO';
SELECT @caseId = CaseId
FROM Origination.[Case]
WHERE CaseNr = @casenr;

SELECT @exisitingMaturityDate = DateOfMaturity
FROM Servicing.Completed
WHERE FkCaseId = @caseId;

SELECT @correctedMaturityDate = DATEADD(day, 1, @exisitingMaturityDate);

update Servicing.Completed
SET DateOfMaturity = @correctedMaturityDate
WHERE FkCaseId = @caseId;

-- 10028-CAST
SET @casenr = '10028-CAST';
SELECT @caseId = CaseId
FROM Origination.[Case]
WHERE CaseNr = @casenr;

SELECT @exisitingMaturityDate = DateOfMaturity
FROM Servicing.Completed
WHERE FkCaseId = @caseId;

SELECT @correctedMaturityDate = DATEADD(day, 1, @exisitingMaturityDate);

update Servicing.Completed
SET DateOfMaturity = @correctedMaturityDate
WHERE FkCaseId = @caseId;

-- 10048-E1HO
SET @casenr = '10048-E1HO';
SELECT @caseId = CaseId
FROM Origination.[Case]
WHERE CaseNr = @casenr;

SELECT @exisitingMaturityDate = DateOfMaturity
FROM Servicing.Completed
WHERE FkCaseId = @caseId;

SELECT @correctedMaturityDate = DATEADD(day, 1, @exisitingMaturityDate);

update Servicing.Completed
SET DateOfMaturity = @correctedMaturityDate
WHERE FkCaseId = @caseId;

--  10039-HART
SET @casenr = ' 10039-HART';
SELECT @caseId = CaseId
FROM Origination.[Case]
WHERE CaseNr = @casenr;

SELECT @exisitingMaturityDate = DateOfMaturity
FROM Servicing.Completed
WHERE FkCaseId = @caseId;

SELECT @correctedMaturityDate = DATEADD(day, 1, @exisitingMaturityDate);

update Servicing.Completed
SET DateOfMaturity = @correctedMaturityDate
WHERE FkCaseId = @caseId;

--  10051-PREM
SET @casenr = ' 10051-PREM';
SELECT @caseId = CaseId
FROM Origination.[Case]
WHERE CaseNr = @casenr;

SELECT @exisitingMaturityDate = DateOfMaturity
FROM Servicing.Completed
WHERE FkCaseId = @caseId;

SELECT @correctedMaturityDate = DATEADD(day, 1, @exisitingMaturityDate);

update Servicing.Completed
SET DateOfMaturity = @correctedMaturityDate
WHERE FkCaseId = @caseId;