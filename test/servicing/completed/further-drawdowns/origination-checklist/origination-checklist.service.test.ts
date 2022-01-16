import { OriginationChecklistService } from "../../../../../src/v2/modules/cases/completed/further/origination-checklist/origination-checklist.service";
import { OriginationChecklistSections } from "../../../../../src/v2/modules/cases/completed/further/origination-checklist/origination-checklist.interface";

const getSections = (): OriginationChecklistSections => {
  return {} as OriginationChecklistSections;
};
describe("FurtherDrawdownsService", () => {
  it("getActions - empty", () => {
    const sections = getSections();
    sections.aml = {
      FkOriginationChecklistId: 1,
    } as any;
    const actions = OriginationChecklistService.getActions({
      ...sections,
      finalSignOf: {},
      initialCheck: {},
      close: {},
      submitToUnderwriter: {},
    } as any);
    expect(actions.length).toBe(1);
    expect(actions).toEqual(expect.arrayContaining(["close"]));
  });

  it("getActions - filled sections", () => {
    const sections = getSections();
    sections.aml = {
      FkOriginationChecklistId: 1,
      primarySignature: {},
      secondarySignature: {},
    } as any;
    const actions = OriginationChecklistService.getActions({
      ...sections,
      finalSignOf: {},
      initialCheck: {},
      close: {},
      submitToUnderwriter: {},
    } as any);
    expect(actions.length).toBe(2);
    expect(actions).toEqual(expect.arrayContaining(["close", "initialCheck"]));
  });

  it("getActions - filled initial check", () => {
    const sections = getSections();
    sections.aml = {
      FkOriginationChecklistId: 1,
      primarySignature: {},
      secondarySignature: {},
    } as any;
    const actions = OriginationChecklistService.getActions({
      ...sections,
      finalSignOf: {},
      initialCheck: { Date: "2020.03.20" },
      close: {},
      submitToUnderwriter: {},
    } as any);
    expect(actions.length).toBe(2);
    expect(actions).toEqual(expect.arrayContaining(["close", "finalSignOf"]));
  });

  it("getActions - filled initial check and final", () => {
    const sections = getSections();
    sections.aml = {
      FkOriginationChecklistId: 1,
      primarySignature: {},
      secondarySignature: {},
    } as any;
    const actions = OriginationChecklistService.getActions({
      ...sections,
      finalSignOf: { Date: "2020.03.22" },
      initialCheck: { Date: "2020.03.20" },
      close: {},
      submitToUnderwriter: {},
    } as any);
    expect(actions.length).toBe(2);
    expect(actions).toEqual(
      expect.arrayContaining(["close", "submitToUnderwriter"])
    );
  });

  it("getActions - closed", () => {
    const sections = getSections();
    sections.aml = {
      FkOriginationChecklistId: 1,
      primarySignature: {},
      secondarySignature: {},
    } as any;
    const actions = OriginationChecklistService.getActions({
      ...sections,
      finalSignOf: { Date: "2020.03.22" },
      initialCheck: { Date: "2020.03.20" },
      close: { Date: "2020.03.23" },
      submitToUnderwriter: {},
    } as any);
    expect(actions.length).toBe(0);
  });

  it("getActions - submitted, can resubmit", () => {
    const sections = getSections();
    sections.aml = {
      FkOriginationChecklistId: 1,
      primarySignature: {},
      secondarySignature: {},
    } as any;
    const actions = OriginationChecklistService.getActions({
      ...sections,
      finalSignOf: { Date: "2020.03.22" },
      initialCheck: { Date: "2020.03.20" },
      close: {},
      submitToUnderwriter: { Date: "2020.03.23" },
    } as any);
    expect(actions.length).toBe(1);
  });
});
