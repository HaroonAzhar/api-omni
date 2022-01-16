import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { OriginationChecklistIdentification } from './origination-checklist.identification';
import { OriginationChecklistAmlService } from './origination-checklist-aml/origination-checklist-aml.service';
import { OriginationChecklistCreditSafeService } from './origination-checklist-credit-safe/origination-checklist-credit-safe.service';
import { OriginationChecklistDocumentsService } from './origination-checklist-documents/origination-checklist-documents.service';
import { OriginationChecklistDrawDownRequestService } from './origination-checklist-draw-down-request/origination-checklist-draw-down-request.service';
import { OriginationChecklistExperianService } from './origination-checklist-experian/origination-checklist-experian.service';
import { OriginationChecklistInsuranceService } from './origination-checklist-insurance/origination-checklist-insurance.service';
import { OriginationChecklistLandChargesService } from './origination-checklist-land-charges/origination-checklist-land-charges.service';
import { OriginationChecklistLandRegistryService } from './origination-checklist-land-registry/origination-checklist-land-registry.service';
import { OriginationChecklistReinspectionValuationService } from './origination-checklist-reinspection-valuation/origination-checklist-reinspection-valuation.service';
import { OriginationChecklistSolicitorService } from './origination-checklist-solicitor/origination-checklist-solicitor.service';
import {
  OriginationChecklist,
  Actions,
  OriginationChecklistRepositoryInterface,
} from './origination-checklist.interface';
import {
  OriginationChecklistSectionFields,
  OriginationChecklistSectionComputedFields,
} from './section-shared/origination-checklist-section.interface';
import {
  CloseOriginationChecklist,
  FinalSignOfOriginationChecklist,
  InitialCheckOriginationChecklist,
  SubmitToUnderwriterOriginationChecklist,
} from './origination-checklist.commands';
import { SignatureWithComment, Signature } from '../signature/signature.interface';

@Injectable()
export class OriginationChecklistService {
  constructor(
    private readonly originationChecklistRepository: OriginationChecklistRepositoryInterface,
    private readonly originationChecklistSolicitorService: OriginationChecklistSolicitorService,
    private readonly originationChecklistDrawDownRequestService: OriginationChecklistDrawDownRequestService,
    private readonly creditSafeService: OriginationChecklistCreditSafeService,
    private readonly landChargesService: OriginationChecklistLandChargesService,
    private readonly landRegistryService: OriginationChecklistLandRegistryService,
    private readonly insuranceService: OriginationChecklistInsuranceService,
    private readonly documentsService: OriginationChecklistDocumentsService,
    private readonly experianService: OriginationChecklistExperianService,
    private readonly amlService: OriginationChecklistAmlService,
    private readonly reinspectionValuationService: OriginationChecklistReinspectionValuationService,
    private readonly identificationService: OriginationChecklistIdentification,
    private readonly commandBus: CommandBus
  ) {}

  async createOriginationChecklist(FkFurtherId: number, FurtherType: string): Promise<number> {
    const createdId = await this.originationChecklistRepository.create({ FkFurtherId, FurtherType });
    await this.originationChecklistSolicitorService.createSolicitor(createdId);
    await this.originationChecklistDrawDownRequestService.createDrawDownRequest(createdId);
    await this.creditSafeService.createCreditSafe(createdId);
    await this.landChargesService.createLandCharges(createdId);
    await this.landRegistryService.createLandRegistry(createdId);
    await this.insuranceService.createInsurance(createdId);
    await this.documentsService.createDocuments(createdId);
    await this.experianService.createExperian(createdId);
    await this.amlService.createAml(createdId);
    await this.reinspectionValuationService.createReinspectionValuation(createdId);
    return createdId;
  }

  async getOriginationChecklist(FkFurtherId: number, FurtherType: string): Promise<OriginationChecklist> {
    const entity = await this.originationChecklistRepository.get(FkFurtherId, FurtherType);

    const solicitor = await this.originationChecklistSolicitorService.getSolicitor(entity.OriginationChecklistId);
    const drawDownRequest = await this.originationChecklistDrawDownRequestService.getDrawDownRequest(
      entity.OriginationChecklistId
    );
    const creditSafe = await this.creditSafeService.getCreditSafe(entity.OriginationChecklistId);
    const landCharges = await this.landChargesService.getLandCharges(entity.OriginationChecklistId);
    const landRegistry = await this.landRegistryService.getLandRegistry(entity.OriginationChecklistId);
    const insurance = await this.insuranceService.getInsurance(entity.OriginationChecklistId);
    const documents = await this.documentsService.getDocuments(entity.OriginationChecklistId);
    const experian = await this.experianService.getExperian(entity.OriginationChecklistId);
    const aml = await this.amlService.getAml(entity.OriginationChecklistId);
    const reinspectionValuation = await this.reinspectionValuationService.getReinspectionValuation(
      entity.OriginationChecklistId
    );
    const computedFields = {
      solicitor,
      drawDownRequest,
      creditSafe,
      landCharges,
      landRegistry,
      aml,
      experian,
      insurance,
      documents,
      reinspectionValuation,
      finalSignOf: { Date: entity.FinalSignOfDate, User: entity.FinalSignOfUser },
      initialCheck: { Date: entity.InitialCheckDate, User: entity.InitialCheckUser },
      close: { Date: entity.CloseDate, User: entity.CloseUser, Comment: entity.CloseComment },
      submitToUnderwriter: {
        Date: entity.SubmitToUnderwriterDate,
        User: entity.SubmitToUnderwriterUser,
      },
    };
    const availableActions = OriginationChecklistService.getActions(computedFields);
    return {
      ...entity,
      ...computedFields,
      availableActions,
    };
  }

  async initialCheck(
    furtherDrawdownId: number,
    FurtherType: string,
    signature: Signature,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.identificationService.getId(furtherDrawdownId, FurtherType);
    await this.originationChecklistRepository.update(FkOriginationChecklistId, {
      InitialCheckDate: signature.Date,
      InitialCheckUser: signature.User,
    });
    await this.commandBus.execute(
      new InitialCheckOriginationChecklist({ FkOriginationChecklistId, content: signature }, context)
    );
  }

  async finalSignOf(
    furtherDrawdownId: number,
    FurtherType: string,

    signature: Signature,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.identificationService.getId(furtherDrawdownId, FurtherType);
    await this.originationChecklistRepository.update(FkOriginationChecklistId, {
      FinalSignOfDate: signature.Date,
      FinalSignOfUser: signature.User,
    });
    await this.commandBus.execute(
      new FinalSignOfOriginationChecklist({ FkOriginationChecklistId, content: signature }, context)
    );
  }

  async close(
    furtherDrawdownId: number,
    FurtherType: string,

    signature: SignatureWithComment,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.identificationService.getId(furtherDrawdownId, FurtherType);
    await this.originationChecklistRepository.update(FkOriginationChecklistId, {
      CloseDate: signature.Date,
      CloseUser: signature.User,
      CloseComment: signature.Comment,
    });
    await this.commandBus.execute(
      new CloseOriginationChecklist({ FkOriginationChecklistId, content: signature }, context)
    );
  }

  async submitToUnderwriter(
    furtherDrawdownId: number,
    FurtherType: string,

    signature: Signature,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.identificationService.getId(furtherDrawdownId, FurtherType);
    await this.originationChecklistRepository.update(FkOriginationChecklistId, {
      SubmitToUnderwriterDate: signature.Date,
      SubmitToUnderwriterUser: signature.User,
    });
    await this.commandBus.execute(
      new SubmitToUnderwriterOriginationChecklist({ FkOriginationChecklistId, content: signature }, context)
    );
  }

  static isSection(
    potentialSection: OriginationChecklistSectionFields | unknown
  ): potentialSection is OriginationChecklistSectionFields {
    return (potentialSection as OriginationChecklistSectionFields).FkOriginationChecklistId !== undefined;
  }
  static getActions(computedFields: Omit<OriginationChecklist, 'availableActions'>): Actions[] {
    if (computedFields.close.Date) {
      return [];
    }

    if (computedFields.submitToUnderwriter.Date) {
      return ['submitToUnderwriter'];
    }
    const sections = Object.values(computedFields).filter((computedField) =>
      OriginationChecklistService.isSection(computedField)
    ) as OriginationChecklistSectionComputedFields[];

    const signedSections = sections.filter(
      (section) => section.primarySignature !== undefined && section.secondarySignature !== undefined
    );
    if (signedSections.length !== sections.length) {
      return ['close'];
    }

    if (computedFields.finalSignOf.Date) {
      return ['close', 'submitToUnderwriter'];
    }

    if (computedFields.initialCheck.Date) {
      return ['close', 'finalSignOf'];
    }

    return ['close', 'initialCheck'];
  }
}
