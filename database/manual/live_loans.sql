DECLARE @1 nvarchar(36), @2 nvarchar(36), @3 nvarchar(36), @4 nvarchar(36), @5 nvarchar(36), @6 nvarchar(36), @7 nvarchar(36);
SET @1 = LOWER(NEWID());
SET @2 = LOWER(NEWID());
SET @3 = LOWER(NEWID());
SET @4 = LOWER(NEWID());
SET @5 = LOWER(NEWID());
SET @6 = LOWER(NEWID());
SET @7 = LOWER(NEWID());

INSERT INTO Dawn_Data.Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@1, '10002-PROG', 'application', null, null, GETDATE());
INSERT INTO Dawn_Data.Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@2, '10003-PROG', 'application', null, null, GETDATE());
INSERT INTO Dawn_Data.Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@3, '10004-PROG', 'application', null, null, GETDATE());
INSERT INTO Dawn_Data.Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@4, '10005-LAVE', 'application', null, null, GETDATE());
INSERT INTO Dawn_Data.Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@5, '10006-INVE', 'application', null, null, GETDATE());
INSERT INTO Dawn_Data.Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@6, '10007-JSFO', 'application', null, null, GETDATE());
INSERT INTO Dawn_Data.Origination.[Case] (Id, CaseNr, Stage, AdditionalInformation, FkCaseStatusId, CreatedAt) VALUES (@7, '10008-LOWE', 'application', null, null, GETDATE());

INSERT INTO Dawn_Data.Origination.Dip (CreatedBy, FkCaseId) VALUES (GETDATE(), (SELECT CaseId From Origination.[Case] WHERE Id=@1));
INSERT INTO Dawn_Data.Origination.Dip (CreatedBy, FkCaseId) VALUES (GETDATE(), (SELECT CaseId From Origination.[Case] WHERE Id=@2));
INSERT INTO Dawn_Data.Origination.Dip (CreatedBy, FkCaseId) VALUES (GETDATE(), (SELECT CaseId From Origination.[Case] WHERE Id=@3));
INSERT INTO Dawn_Data.Origination.Dip (CreatedBy, FkCaseId) VALUES (GETDATE(), (SELECT CaseId From Origination.[Case] WHERE Id=@4));
INSERT INTO Dawn_Data.Origination.Dip (CreatedBy, FkCaseId) VALUES (GETDATE(), (SELECT CaseId From Origination.[Case] WHERE Id=@5));
INSERT INTO Dawn_Data.Origination.Dip (CreatedBy, FkCaseId) VALUES (GETDATE(), (SELECT CaseId From Origination.[Case] WHERE Id=@6));
INSERT INTO Dawn_Data.Origination.Dip (CreatedBy, FkCaseId) VALUES (GETDATE(), (SELECT CaseId From Origination.[Case] WHERE Id=@7));

INSERT INTO Dawn_Data.Origination.ApplicantCompany (ApplicantName, CompanyNumber,  FkCaseId) VALUES ('Progressive Developers Kent Limited', '12160496', (SELECT CaseId From Origination.[Case] WHERE Id=@1));
INSERT INTO Dawn_Data.Origination.ApplicantCompany (ApplicantName, CompanyNumber,  FkCaseId) VALUES ('Progressive Developers Land Limited', '10441462', (SELECT CaseId From Origination.[Case] WHERE Id=@2));
INSERT INTO Dawn_Data.Origination.ApplicantCompany (ApplicantName, CompanyNumber,  FkCaseId) VALUES ('Progressive Developers London Limited', '12160569', (SELECT CaseId From Origination.[Case] WHERE Id=@3));
INSERT INTO Dawn_Data.Origination.ApplicantCompany (ApplicantName, CompanyNumber,  FkCaseId) VALUES ('Lavender Estates Limited', '7540591', (SELECT CaseId From Origination.[Case] WHERE Id=@4));
INSERT INTO Dawn_Data.Origination.ApplicantCompany (ApplicantName, CompanyNumber,  FkCaseId) VALUES ('Investment DAR (U.K.) Limited', '631666', (SELECT CaseId From Origination.[Case] WHERE Id=@5));
INSERT INTO Dawn_Data.Origination.ApplicantCompany (ApplicantName, CompanyNumber,  FkCaseId) VALUES ('JS Focus Properties Limited', '10868554', (SELECT CaseId From Origination.[Case] WHERE Id=@6));
INSERT INTO Dawn_Data.Origination.ApplicantCompany (ApplicantName, CompanyNumber,  FkCaseId) VALUES ('Lowestoft Court Apartments Limited', '12036072', (SELECT CaseId From Origination.[Case] WHERE Id=@7));

INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Mr', 'David', 'Anthony', 'McLaughlin', '1958-07-04', (SELECT CaseId From Origination.[Case] WHERE Id=@1));
INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Mr', 'David', 'Anthony', 'McLaughlin', '1958-07-04', (SELECT CaseId From Origination.[Case] WHERE Id=@2));
INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Mr', 'Meltem', null, 'McLaughlin', '1970-06-28', (SELECT CaseId From Origination.[Case] WHERE Id=@2));
INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Mr', 'David', 'Anthony', 'McLaughlin', '1958-07-04', (SELECT CaseId From Origination.[Case] WHERE Id=@3));
INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Mr', 'Matthew', 'James', 'Ralph', '1978-04-26', (SELECT CaseId From Origination.[Case] WHERE Id=@4));
INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Mr', 'Stjohn', 'Witherington', 'Standley', '1966-08-10', (SELECT CaseId From Origination.[Case] WHERE Id=@5));
INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Mr', 'Amr', 'Ali', 'Abdallah Abouelseoud', '1968-11-06', (SELECT CaseId From Origination.[Case] WHERE Id=@5));
INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Mr', 'Josiah', 'Nathaniel', 'Woodfinch', '1983-07-10', (SELECT CaseId From Origination.[Case] WHERE Id=@6));
INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Miss', 'Sertrina', 'Deborah', 'McBridge', '1984-02-13', (SELECT CaseId From Origination.[Case] WHERE Id=@6));
INSERT INTO Dawn_Data.Origination.Applicant (Title, Forename, MiddleName, Surname, DateOfBirth, FkCaseId) VALUES ('Mr', 'Safdar', 'Raza', 'Khan', '1972-06-25', (SELECT CaseId From Origination.[Case] WHERE Id=@7));