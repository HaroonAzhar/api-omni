import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventsModule } from '@v2/utils/events';
import { CommandsModule } from '@v2/utils/commands';

import { OriginationChecklistRepository } from './origination-checklist.repository';
import { OriginationChecklistService } from './origination-checklist.service';
import { OriginationChecklistController } from './origination-checklist.controller';
import { OriginationChecklistSolicitorModule } from './origination-checklist-solicitor/origination-checklist-solicitor.module';
import { OriginationChecklistRepositoryInterface } from './origination-checklist.interface';
import { OriginationChecklistIdentification } from './origination-checklist.identification';
import { OriginationChecklistDrawDownRequestModule } from './origination-checklist-draw-down-request/origination-checklist-draw-down-request.module';
import { AddPrimarySignatureOriginationChecklistCommandHandler } from './handlers/add-primary-signature-origination-checklist.handler';
import { AddSecondarySignatureOriginationChecklistCommandHandler } from './handlers/add-secondary-signature-origination-checklist.handler';
import { AddedPrimarySignatureOriginationChecklistHandler } from './handlers/added-primary-signature-origination-checklist.handler';
import { AddedSecondarySignatureOriginationChecklistHandler } from './handlers/added-secondary-signature-origination-checklist.handler';
import { OriginationChecklistCreditSafeModule } from './origination-checklist-credit-safe/origination-checklist-credits-safe.module';
import { OriginationChecklistLandChargesModule } from './origination-checklist-land-charges/origination-checklist-land-charges.module';
import { OriginationChecklistLandRegistryModule } from './origination-checklist-land-registry/origination-checklist-land-registry.module';
import { OriginationChecklistInsuranceModule } from './origination-checklist-insurance/origination-checklist-insurance.module';
import { OriginationChecklistDocumentsModule } from './origination-checklist-documents/origination-checklist-documents.module';
import { OriginationChecklistExperianModule } from './origination-checklist-experian/origination-checklist-experian.module';
import { OriginationChecklistAmlModule } from './origination-checklist-aml/origination-checklist-aml.module';
import { OriginationChecklistReinspectionValuationModule } from './origination-checklist-reinspection-valuation/origination-checklist-credits-safe.module';
import { InitialCheckOriginationChecklistHandler } from './handlers/initial-check-origination-checklist.handler';
import { CloseOriginationChecklistHandler } from './handlers/close-origination-checklist.handler';
import { FinalSignOfOriginationChecklistHandler } from './handlers/final-sign-of-origination-checklist.handler';
import { SubmitToUnderwriterOriginationChecklistHandler } from './handlers/submit-to-underwiter-origination-checklist.handler';
import { InitialCheckedOriginationChecklistHandler } from './handlers/initial-checked-origination-checklist.handler';
import { FinalSignedOfOriginationChecklistHandler } from './handlers/final-signed-off-origination-checklist.handler';
import { ClosedOriginationChecklistHandler } from './handlers/closed-origination-checklist.handler';
import { SubmitedToUnderwriterOriginationChecklistHandler } from './handlers/submitted-to-underwrtier-origination-checklist.handler';

const CommandHandlers = [
  AddPrimarySignatureOriginationChecklistCommandHandler,
  AddSecondarySignatureOriginationChecklistCommandHandler,
  InitialCheckOriginationChecklistHandler,
  FinalSignOfOriginationChecklistHandler,
  CloseOriginationChecklistHandler,
  SubmitToUnderwriterOriginationChecklistHandler,
];
const EventHandlers = [
  AddedPrimarySignatureOriginationChecklistHandler,
  AddedSecondarySignatureOriginationChecklistHandler,
  InitialCheckedOriginationChecklistHandler,
  FinalSignedOfOriginationChecklistHandler,
  ClosedOriginationChecklistHandler,
  SubmitedToUnderwriterOriginationChecklistHandler,
];
@Module({
  controllers: [OriginationChecklistController],
  providers: [
    OriginationChecklistIdentification,
    OriginationChecklistService,
    { provide: OriginationChecklistRepositoryInterface, useClass: OriginationChecklistRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [OriginationChecklistIdentification, OriginationChecklistService],
  imports: [
    forwardRef(() => OriginationChecklistSolicitorModule),
    forwardRef(() => OriginationChecklistDrawDownRequestModule),
    forwardRef(() => OriginationChecklistCreditSafeModule),
    forwardRef(() => OriginationChecklistLandChargesModule),
    forwardRef(() => OriginationChecklistLandRegistryModule),
    forwardRef(() => OriginationChecklistInsuranceModule),
    forwardRef(() => OriginationChecklistDocumentsModule),
    forwardRef(() => OriginationChecklistExperianModule),
    forwardRef(() => OriginationChecklistAmlModule),
    forwardRef(() => OriginationChecklistReinspectionValuationModule),
    CqrsModule,
    EventsModule,
    CommandsModule,
  ],
})
export class OriginationChecklistModule {}
