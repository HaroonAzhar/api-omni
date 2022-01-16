import { Test, TestingModule } from "@nestjs/testing";
import { CasesService } from "@v2/modules/cases/cases.service";
import { Enquiry } from "@v2/modules/cases/enquiry/enquiry.interface";
import { CasesIdentificationService } from "@v2/modules/cases/cases-identification.service";

import {
  EnquiryRepositoryInterface,
  EnquiryService,
} from "../../../src/v2/modules/cases/enquiry/enquiry.service";
import { CreateEnquiry } from "../../../src/v2/modules/cases/enquiry/enquiry.interface";
import { getRandomEnquiry } from "./enquiry.test.helpers";

class InMemoryRepository extends EnquiryRepositoryInterface {
  enquiries: Enquiry[] = [];
  create(enquiry: Enquiry): Promise<number> {
    this.enquiries.push(enquiry);
    return new Promise((resolve) => resolve(this.enquiries.length));
  }
  getByCaseId(FkCaseId: number): Promise<Enquiry> {
    return new Promise((resolve) =>
      resolve(
        this.enquiries.filter((enquiry) => enquiry.FkCaseId === FkCaseId)[0]
      )
    );
  }
  update(enquiry: Enquiry): Promise<number> {
    this.enquiries = this.enquiries.map((existing) => {
      if (existing.FkCaseId === enquiry.FkCaseId) {
        return enquiry;
      }
      return existing;
    });
    return Promise.resolve(null);
  }
}

describe("EnquiryService", () => {
  let service: EnquiryService;

  const CaseId = 5;
  const changeStageMock = jest.fn();
  const changeStatusMock = jest.fn();
  const changeCaseReferenceMock = jest.fn();
  const changeApplicantsMock = jest.fn();

  const casesServiceStub = {
    getByCaseUuid: jest.fn(() => ({ CaseId })),
    changeStage: changeStageMock,
    changeStatus: changeStatusMock,
    changeCaseReference: changeCaseReferenceMock,
    changeApplicants: changeApplicantsMock,
  };
  class CasesIdentificationServiceMock {
    getByCaseUuid() {
      return { CaseId };
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnquiryService,
        {
          provide: EnquiryRepositoryInterface,
          useClass: InMemoryRepository,
        },
        { provide: CasesService, useValue: casesServiceStub },
        {
          provide: CasesIdentificationService,
          useClass: CasesIdentificationServiceMock,
        },
      ],
    }).compile();

    service = module.get<EnquiryService>(EnquiryService);
    changeStageMock.mockClear();
    changeStatusMock.mockClear();
    changeCaseReferenceMock.mockClear();
    changeApplicantsMock.mockClear();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Should create new enquiry and generate case reference", async () => {
    const enquiry: CreateEnquiry = getRandomEnquiry();
    const uuid = "uuid";
    await service.createEnquiry(uuid, enquiry);

    const addedEnquiry = await service.getEnquiry("uuid");

    expect(addedEnquiry).toEqual(expect.objectContaining(enquiry));

    expect(changeStageMock).toBeCalledWith(uuid, { Stage: "enquiry" });
    expect(changeStatusMock).toBeCalledWith(uuid, "received");
    expect(changeCaseReferenceMock).toBeCalledWith(uuid, "ENQ-000001");
  });

  it("Should update enquiry", async () => {
    const enquiry = getRandomEnquiry();
    const uuid = "uuid";
    await service.createEnquiry(uuid, enquiry);

    const addedEnquiry = await service.getEnquiry("uuid");

    expect(addedEnquiry).toEqual(expect.objectContaining(enquiry));

    expect(changeStageMock).toBeCalledWith(uuid, { Stage: "enquiry" });
    expect(changeStatusMock).toBeCalledWith(uuid, "received");
    expect(changeCaseReferenceMock).toBeCalledWith(uuid, "ENQ-000001");

    changeStageMock.mockClear();
    changeStatusMock.mockClear();
    changeCaseReferenceMock.mockClear();
    const updatedEnquiry = getRandomEnquiry();

    await service.createEnquiry(uuid, updatedEnquiry);
    const updatedNewEnquiry = await service.getEnquiry("uuid");

    expect(updatedNewEnquiry).toEqual(expect.objectContaining(updatedEnquiry));

    expect(changeStageMock).toBeCalledWith(uuid, { Stage: "enquiry" });
    expect(changeStatusMock).toBeCalledWith(uuid, "received");
    expect(changeCaseReferenceMock).toBeCalledTimes(0);
  });

  it("Should update applicants of case", async () => {
    const enquiry = getRandomEnquiry();
    const uuid = "uuid";
    await service.createEnquiry(uuid, enquiry);

    expect(changeApplicantsMock).toBeCalledWith(uuid, enquiry.EnquiryName);
  });
});
