import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { EditedCommentOriginationChecklistSolicitor } from '../origination-checklist-solicitor.events';

@EventsHandler(EditedCommentOriginationChecklistSolicitor)
export class EditedCommentOriginationChecklistSolicitorHandler
  implements IEventHandler<EditedCommentOriginationChecklistSolicitor> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: EditedCommentOriginationChecklistSolicitor): Promise<void> {
    await this.eventStorage.insert(event);
  }
}
