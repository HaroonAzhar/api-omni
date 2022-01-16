export const defaultEventTypes = ['Start', 'End'] as const;
export type DefaultEventType = typeof defaultEventTypes[number];

export interface DefaultEvent {
  DefaultEventId?: number;
  FkCompletedId?: number;
  CreatedDate?: string;
  Type: DefaultEventType;
  Date: string;
  IsDeleted?: boolean;
}

export interface DefaultEventsFilterQuery {
  Type?: string;
  DateMin?: string;
  DateMax?: string;
}

export type DeleteCommandContent = {
  DefaultEventId: number;
};

export abstract class DefaultEventsRepositoryInterface {
  abstract create(defaultEvent: DefaultEvent): Promise<number>;
  abstract findAll(FkCompletedId: number, query: DefaultEventsFilterQuery): Promise<DefaultEvent[]>;
  abstract update(FkCompletedId: number, defaultEventId: number, defaultEvent: Partial<DefaultEvent>): Promise<number>;
}

export const moduleName = 'default-events';

export type DefaultEventPeriod = {
  start_from: string;
  to?: string;
};
