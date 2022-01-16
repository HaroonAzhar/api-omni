export interface Waypoint {
  WaypointId?: number;
  FkCompletedId?: number;
  CreatedDate?: string;
  Name: string;
  DueDate: string;
  DueTime?: string;
  IsCompleted: boolean;
  Category: string;
  Notes?: string;
  OtherWaypointDescription?: string;
}

export const recurringEventOptions = ['not_recurring', 'weekly', 'fortnightly', '4_weekly', 'monthly'] as const;
export type RecurringEvent = typeof recurringEventOptions[number];

export interface WaypointsFilterQuery {
  Category?: string;
  DueDateMin?: string;
  DueDateMax?: string;
  IsCompleted?: boolean;
}
