SELECT * 
FROM   [Origination].[case] 

SELECT DISTINCT loan.cbfl_id 
FROM   [Dawn_Data].[Loan].[loan] AS loan 

SELECT DISTINCT loan.cbfl_id 
FROM   [Dawn_Data].[Loan].[loan] AS loan 
WHERE  NOT EXISTS (SELECT NULL 
                   FROM   [Origination].[case] caseLoan 
                   WHERE  caseLoan.casenr = loan.cbfl_id) 

SELECT DISTINCT loan.cbfl_id, 
                'completed' 
FROM   [Dawn_Data].[Loan].[loan] AS loan 
WHERE  NOT EXISTS (SELECT NULL 
                   FROM   [Origination].[case] caseLoan 
                   WHERE  caseLoan.casenr = loan.cbfl_id) 

SELECT DISTINCT loan.cbfl_id, 
                'completed' 
FROM   [Dawn_Data].[Planner].[event] AS event 
       LEFT JOIN [Dawn_Data].[Loan].[loan] AS loan 
              ON loan.loan_id = event.fkloanid 
WHERE  NOT EXISTS (SELECT NULL 
                   FROM   [Origination].[case] caseLoan 
                   WHERE  caseLoan.casenr = loan.cbfl_id) 

INSERT INTO [Origination].[case] 
            (casenr, 
             stage) 
SELECT DISTINCT loan.cbfl_id, 
                'completed' 
FROM   [Dawn_Data].[Planner].[event] AS event 
       LEFT JOIN [Dawn_Data].[Loan].[loan] AS loan 
              ON loan.loan_id = event.fkloanid 
WHERE  NOT EXISTS (SELECT NULL 
                   FROM   [Origination].[case] caseLoan 
                   WHERE  caseLoan.casenr = loan.cbfl_id) 

SELECT * 
FROM   [Servicing].[completed] AS completed 

SELECT DISTINCT caseLoan.caseid 
FROM   [Dawn_Data].[Planner].[event] AS event 
       LEFT JOIN [Dawn_Data].[Loan].[loan] AS loan 
              ON loan.loan_id = event.fkloanid 
       LEFT JOIN [Origination].[case] AS caseLoan 
              ON caseLoan.casenr = loan.cbfl_id 
WHERE  NOT EXISTS (SELECT NULL 
                   FROM   [Servicing].[completed] AS completed 
                   WHERE  caseLoan.caseid = completed.fkcaseid) 

INSERT INTO [Servicing].[completed] 
            (fkcaseid) 
SELECT DISTINCT caseLoan.caseid 
FROM   [Dawn_Data].[Planner].[event] AS event 
       LEFT JOIN [Dawn_Data].[Loan].[loan] AS loan 
              ON loan.loan_id = event.fkloanid 
       LEFT JOIN [Origination].[case] AS caseLoan 
              ON caseLoan.casenr = loan.cbfl_id 
WHERE  NOT EXISTS (SELECT NULL 
                   FROM   [Servicing].[completed] AS completed 
                   WHERE  caseLoan.caseid = completed.fkcaseid) 

SELECT DISTINCT loan.cbfl_id 
FROM   [Dawn_Data].[Planner].[event] AS event 
       LEFT JOIN [Dawn_Data].[Loan].[loan] AS loan 
              ON loan.loan_id = event.fkloanid 

SELECT DISTINCT loan.cbfl_id 
FROM   [Dawn_Data].[Planner].[event] AS event 
       LEFT JOIN [Dawn_Data].[Loan].[loan] AS loan 
              ON loan.loan_id = event.fkloanid 
WHERE  loan.cbfl_id IN (SELECT casenr 
                        FROM   [Origination].[case]) 

SELECT DISTINCT loan.cbfl_id 
FROM   [Dawn_Data].[Planner].[event] AS event 
       LEFT JOIN [Dawn_Data].[Loan].[loan] AS loan 
              ON loan.loan_id = event.fkloanid 
WHERE  loan.cbfl_id NOT IN (SELECT casenr 
                            FROM   [Origination].[case]) 

SELECT * 
FROM   [Servicing].[waypoints] 

SELECT completed.completedid, 
       [created], 
       [subject], 
       [eventdate], 
       [eventactioned], 
       [eventnotes] 
FROM   [Dawn_Data].[Planner].[event] AS event 
       LEFT JOIN [Dawn_Data].[Loan].[loan] AS loan 
              ON loan.loan_id = event.fkloanid 
       LEFT JOIN [Origination].[case] AS loanCase 
              ON loan.cbfl_id = loanCase.casenr 
       LEFT JOIN [Servicing].[completed] AS completed 
              ON loanCase.caseid = completed.fkcaseid 
WHERE  NOT EXISTS (SELECT NULL 
                   FROM   [Servicing].[waypoints] AS waypoint 
                   WHERE  waypoint.createddate = event.created 
                          AND waypoint.NAME = event.subject 
                          AND waypoint.fkcompletedid = completed.completedid 
                          AND Cast(waypoint.duedate AS DATE) = 
                              Cast(event.eventdate AS DATE) 
                          AND waypoint.iscompleted = event.eventactioned 
                          AND waypoint.notes = event.eventnotes) 

INSERT INTO [Servicing].[waypoints] 
            (fkcompletedid, 
             createddate, 
             NAME, 
             duedate, 
             iscompleted, 
             notes) 
SELECT completed.completedid, 
       [created], 
       [subject], 
       [eventdate], 
       [eventactioned], 
       [eventnotes] 
FROM   [Dawn_Data].[Planner].[event] AS event 
       LEFT JOIN [Dawn_Data].[Loan].[loan] AS loan 
              ON loan.loan_id = event.fkloanid 
       LEFT JOIN [Origination].[case] AS loanCase 
              ON loan.cbfl_id = loanCase.casenr 
       LEFT JOIN [Servicing].[completed] AS completed 
              ON loanCase.caseid = completed.fkcaseid 
WHERE  NOT EXISTS (SELECT NULL 
                   FROM   [Servicing].[waypoints] AS waypoint 
                   WHERE  waypoint.createddate = event.created 
                          AND waypoint.NAME = event.subject 
                          AND waypoint.fkcompletedid = completed.completedid 
                          AND Cast(waypoint.duedate AS DATE) = 
                              Cast(event.eventdate AS DATE) 
                          AND waypoint.iscompleted = event.eventactioned 
                          AND waypoint.notes = event.eventnotes) 