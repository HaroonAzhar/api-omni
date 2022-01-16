
-- Insert the waypoints

  INSERT INTO [Servicing].[Waypoints] (FkCompletedId, CreatedDate, Name, DueDate, IsCompleted, Notes)
SELECT completed.CompletedId,
       [Created],
       [Subject],
       [EventDate],
       [EventActioned],
       [EventNotes]
FROM [Dawn_Data].[Planner].[Event] AS event
LEFT JOIN [Dawn_Data].[Loan].[Loan] AS loan ON loan.loan_id = event.FkLoanId
LEFT JOIN [Origination].[Case] AS loanCase ON loan.CBFL_id = loanCase.CaseNr
LEFT JOIN [Servicing].[Completed] AS completed ON loanCase.CaseId = completed.FkCaseId
WHERE NOT EXISTS
    (SELECT NULL
     FROM [Servicing].[Waypoints] AS waypoint
     WHERE waypoint.CreatedDate = event.Created
       AND waypoint.Name = event.Subject
       AND waypoint.FkCompletedId = completed.CompletedId
       AND CAST(waypoint.DueDate AS date) = CAST(event.EventDate AS date)
       AND waypoint.IsCompleted = event.EventActioned
       AND waypoint.Notes = event.EventNotes )