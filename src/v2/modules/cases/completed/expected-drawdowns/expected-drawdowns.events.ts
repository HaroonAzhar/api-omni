import { BaseEvent, EventContext } from '@v2/utils/events';

import {
  moduleName,
  ExpectedDrawdown,
  UpdateExpectedDrawdown,
  DeleteExpectedDrawdown,
} from './expected-drawdown.interface';

export class CreatedExpectedDrawdownEvent extends BaseEvent {
  content: ExpectedDrawdown;
  constructor(expectedDrawdown: ExpectedDrawdown, context: EventContext) {
    super(expectedDrawdown, { ...context, Module: moduleName, Name: CreatedExpectedDrawdownEvent.name });
  }
}

export class UpdatedExpectedDrawdownEvent extends BaseEvent {
  content: UpdateExpectedDrawdown;
  constructor(expectedDrawdown: UpdateExpectedDrawdown, context: EventContext) {
    super(expectedDrawdown, { ...context, Module: moduleName, Name: UpdatedExpectedDrawdownEvent.name });
  }
}

export class DeletedExpectedDrawdownEvent extends BaseEvent {
  content: DeleteExpectedDrawdown;
  constructor(expectedDrawdown: DeleteExpectedDrawdown, context: EventContext) {
    super(expectedDrawdown, { ...context, Module: moduleName, Name: DeletedExpectedDrawdownEvent.name });
  }
}
