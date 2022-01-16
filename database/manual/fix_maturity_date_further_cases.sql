-- Manual script to update cases with maturity date off by one day
USE Dawn_Data;
DECLARE @casenr NVARCHAR(255);
DECLARE @caseId NVARCHAR(36);
DECLARE @exisitingMaturityDate DATETIME;
DECLARE @correctedMaturityDate DATETIME


-- 10301-MARS 
SET @casenr = '10301-MARS ';
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

--10224-GAIN
SET @casenr = '10224-GAIN';
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

-- 10316-ESQU
SET @casenr = '10316-ESQU';
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
