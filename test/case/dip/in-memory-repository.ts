import { Dip } from "@v2/modules/cases/dip/dip.interface";

import { AdvanceType } from "../../../src/v2/modules/cases/types/advance-type/advance-type.interface";
import { BuildingType } from "../../../src/v2/modules/cases/types/building-type/building-type.interface";
import { ContactType } from "../../../src/v2/modules/cases/types/contact-type/contact-type.interface";
import {
  ChangeDipStepStatus,
  ChangeFinancialCalculatorDetailsCommandContent,
  ChangeFinancialDetailsCommandContent,
  ChangeIntroducerDetailsCommandContent,
  ChangeLoanDetailsCommandContent,
  ChangeSecuritiesCommandContent,
  DipStep,
} from "../../../src/v2/modules/cases/dip/dip.interface";
import {
  ChangeContactCompanyContent,
  ChangeContactIndividualContent,
} from "../../../src/v2/modules/cases/dip/dip.contact.interface";
import { DipRepositoryInterface } from "../../../src/v2/modules/cases/dip/dip.service";
import { IntroducerType } from "../../../src/v2/modules/cases/types/introducer-type/introducer-type.interface";

export const CaseId = 5;

export class InMemoryRepository extends DipRepositoryInterface {
  dips: Dip[] = [];
  create(dip: Dip): Promise<number> {
    dip.FkCaseId = CaseId;
    this.dips.push(dip);
    return new Promise((resolve) => resolve(this.dips.length));
  }
  getByCaseId(FkCaseId: number): Promise<Dip> {
    return new Promise((resolve) =>
      resolve(this.dips.filter((dip) => dip.FkCaseId === FkCaseId)[0])
    );
  }
  update(FkCaseId: number, dip: Dip): Promise<void> {
    const newDip = { ...dip, FkCaseId };
    this.dips = this.dips.map((existing) => {
      if (existing.FkCaseId === newDip.FkCaseId) {
        return { ...existing, ...newDip };
      }
      return existing;
    });
    return Promise.resolve(null);
  }
  updateIntroducerType(FkCaseId: number, introducerType: IntroducerType) {
    return this.update(FkCaseId, { FkCaseId, IntroducerType: introducerType });
  }
  updateBrokerDetails(
    FkCaseId: number,
    details: ChangeIntroducerDetailsCommandContent
  ) {
    return this.update(FkCaseId, { FkCaseId, ...details });
  }
  updateAdvanceType(FkCaseId: number, advanceType: AdvanceType) {
    return this.update(FkCaseId, { FkCaseId, AdvanceType: advanceType });
  }

  updateContactType(FkCaseId: number, contactType: ContactType) {
    return this.update(FkCaseId, { FkCaseId, ContactType: contactType });
  }

  updateCompanyContact(FkCaseId: number, details: ChangeContactCompanyContent) {
    return this.update(FkCaseId, { FkCaseId, ...details });
  }

  updateIndividualContact(
    FkCaseId: number,
    details: ChangeContactIndividualContent
  ) {
    return this.update(FkCaseId, { FkCaseId, ...details });
  }

  updateBuildingType(FkCaseId: number, buildingType: BuildingType) {
    return this.update(FkCaseId, { FkCaseId, BuildingType: buildingType });
  }

  updateSecurities(FkCaseId: number, details: ChangeSecuritiesCommandContent) {
    return this.update(FkCaseId, { FkCaseId, ...details });
  }

  updateLoanDetails(
    FkCaseId: number,
    details: ChangeLoanDetailsCommandContent
  ) {
    return this.update(FkCaseId, { FkCaseId, ...details });
  }

  updateFinancialDetails(
    FkCaseId: number,
    details: ChangeFinancialDetailsCommandContent
  ) {
    return this.update(FkCaseId, { FkCaseId, ...details });
  }

  updateFinancialCalculatorDetails(
    FkCaseId: number,
    details: ChangeFinancialCalculatorDetailsCommandContent
  ) {
    return this.update(FkCaseId, { FkCaseId, ...details });
  }

  async updateDipStep(
    FkCaseId: number,
    step: ChangeDipStepStatus
  ): Promise<void> {
    const existing = await this.getByCaseId(FkCaseId);
    const steps = ([...(existing.steps ?? []), step] as unknown) as DipStep[];
    return this.update(FkCaseId, { FkCaseId, steps });
  }
}
