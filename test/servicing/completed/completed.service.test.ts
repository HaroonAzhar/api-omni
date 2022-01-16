import { Test, TestingModule } from "@nestjs/testing";
import moment from "moment";

import { ApplicationService } from "../../../src/v2/modules/cases/application/application.service";
import { AdjustmentsService } from "../../../src/v2/modules/cases/completed/adjustments/adjustments.service";
import { CompletedIdentificationService } from "../../../src/v2/modules/cases/completed/completed-identification.service";
import {
  Completed,
  CreateCompleted,
} from "../../../src/v2/modules/cases/completed/completed.interface";
import {
  CompletedRepositoryInterface,
  CompletedService,
} from "../../../src/v2/modules/cases/completed/completed.service";
import { DefaultEventsService } from "../../../src/v2/modules/cases/completed/default-events/default-events.service";
import { ExtensionsService } from "../../../src/v2/modules/cases/completed/extensions/extensions.service";
import { FurtherDrawdownsService } from "../../../src/v2/modules/cases/completed/further-drawdowns/further-drawdowns.service";
import { ManualStatus } from "../../../src/v2/modules/cases/completed/manual-statuses/manual-status.interface";
import { ManualStatusesService } from "../../../src/v2/modules/cases/completed/manual-statuses/manual-statuses.service";
import { CashflowsService } from "../../../src/v2/modules/cases/completed/cashflows/cashflows.service";
import { SecuritiesService } from "../../../src/v2/modules/cases/completed/securities/securities.service";
import { WaypointsService } from "../../../src/v2/modules/cases/completed/waypoints/waypoints.service";
import { DipService } from "../../../src/v2/modules/cases/dip/dip.service";
import { EstimatedRedemptionsService } from "../../../src/v2/modules/cases/completed/estimated-redemptions/estimated-redemptions.service";
import { ExpectedDrawdownsService } from "../../../src/v2/modules/cases/completed/expected-drawdowns/expected-drawdowns.service";
import { ExpectedDrawdown } from "../../../src/v2/modules/cases/completed/expected-drawdowns/expected-drawdown.interface";

class InMemoryRepository extends CompletedRepositoryInterface {
  completedData: Completed[] = [];
  async create(completed: Completed): Promise<number> {
    completed.CompletedId = this.completedData.length;
    this.completedData.push(completed);
    return new Promise((resolve) => {
      resolve(this.completedData.length - 1);
    });
  }
  async getByCaseId(FkCaseId: number): Promise<Completed> {
    const matchingCompleted = this.completedData.filter(
      (completed) => completed.FkCaseId === FkCaseId
    );
    return new Promise((resolve) => {
      resolve(matchingCompleted[0]);
    });
  }
  async update(updateData: Completed): Promise<void> {
    let found = false;
    this.completedData = this.completedData.map((completed) => {
      if (completed.FkCaseId === updateData.FkCaseId) {
        found = true;
        return updateData;
      } else {
        return completed;
      }
    });
    return new Promise((resolve, reject) => {
      if (found) resolve(null);
      else reject();
    });
  }
}

const LoanTerm = 5;
const drawdowns = [
  { Advance: 100, Date: "03/07/2021" },
  { Advance: 10, Date: "03/08/2021" },
  { Advance: 0, Date: "03/09/2021" },
];
let AdvanceType = "single";
let expectedDrawdowns: ExpectedDrawdown[] = [];

class StubDipService {
  async getByCaseId() {
    return { LoanTerm, AdvanceType, drawdowns };
  }
}

const properties = [
  {
    CasePropertyId: 1,
    valuationReport: {
      Gdv: 32,
      MarketValue: 23,
      ReportDate: "2021-03-30",
      InspectionDate: "2021-03-25",
      Surveyor: "surveyor",
      NameOfTheIndividualSurveyor: "individual",
      PropertyValuationReportId: 23,
    },
  },
];
class StubApplicationService {
  async getByCaseId() {
    return { properties };
  }
}
describe("CompletedService", () => {
  let service: CompletedService;

  const repository = new InMemoryRepository();

  const waypointServiceMock = {
    createWaypoint: jest.fn(),
  };
  const extensionsServiceMock = {};
  const defaultEventsService = {};

  const securitiesServiceMock = {
    createSecurity: jest.fn(),
  };

  const estimatedRedemptionsMock = {
    create: jest.fn(),
  };
  const expectedDrawdownsServiceMock = {
    getForCompletedId: async () => expectedDrawdowns,
    create: jest.fn().mockResolvedValue(1),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompletedService,
        { provide: CompletedRepositoryInterface, useValue: repository },
        { provide: DipService, useClass: StubDipService },
        {
          provide: CompletedIdentificationService,
          useValue: repository,
        },
        { provide: WaypointsService, useValue: waypointServiceMock },
        { provide: ExtensionsService, useValue: extensionsServiceMock },
        { provide: DefaultEventsService, useValue: defaultEventsService },
        { provide: ManualStatusesService, useValue: {} },
        { provide: SecuritiesService, useValue: securitiesServiceMock },
        { provide: ApplicationService, useClass: StubApplicationService },
        { provide: FurtherDrawdownsService, useValue: {} },
        { provide: AdjustmentsService, useValue: {} },
        { provide: CashflowsService, useValue: {} },
        {
          provide: EstimatedRedemptionsService,
          useValue: estimatedRedemptionsMock,
        },
        {
          provide: ExpectedDrawdownsService,
          useValue: expectedDrawdownsServiceMock,
        },
      ],
    }).compile();

    service = module.get<CompletedService>(CompletedService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Create Completed", () => {
    it("inserts new entry when no existing", async () => {
      const FkCaseId = 1;
      const DateOfCompletion = "2020-10-26";
      const newCompleted = {
        DateOfCompletion,
        FkCaseId,
      };

      await service.createCompleted(newCompleted);

      const returned = await repository.getByCaseId(FkCaseId);

      expect(returned).toEqual(
        expect.objectContaining({
          ...newCompleted,
          DateOfMaturity: "2021-03-25",
        })
      );
    });

    it("Updates if exists existing", async () => {
      const FkCaseId = 1;
      const DateOfCompletion = "2020-10-26";
      const newDate = "2020-10-30";
      const newCompleted = {
        DateOfCompletion,
        FkCaseId,
      };

      await service.createCompleted(newCompleted);

      await service.createCompleted({ FkCaseId, DateOfCompletion: newDate });

      const returned = await repository.getByCaseId(FkCaseId);

      expect(returned).toEqual({
        FkCaseId,
        DateOfCompletion: newDate,
        DateOfMaturity: "2021-03-29",
      });
    });

    it("Creates securities from application properties", async () => {
      const FkCaseId = 1232;
      const DateOfCompletion = "2020-10-26";
      const created = await service.createCompleted({
        FkCaseId,
        DateOfCompletion,
      });

      expect(securitiesServiceMock.createSecurity).toBeCalledWith(
        {
          FkCompletedId: created,
          FkCasePropertyId: properties[0].CasePropertyId,
        },
        {
          CreatedBy: "",
          FkPropertyValuationReportId:
            properties[0].valuationReport.PropertyValuationReportId,
          GDV: properties[0].valuationReport.Gdv,
          RecipientName: "",
          ReportDate: properties[0].valuationReport.ReportDate,
          Valuation: properties[0].valuationReport.MarketValue,
          ValuationDate: properties[0].valuationReport.InspectionDate,
          ValuationType: "Full Valuation",
          Valuer: "surveyor individual",
        },
        { Trigger: "", User: "" }
      );
      securitiesServiceMock;
    });

    it("Creates estimated redemption", async () => {
      const FkCaseId = 1232;
      const DateOfCompletion = "2020-10-26";
      await service.createCompleted({
        FkCaseId,
        DateOfCompletion,
      });

      expect(estimatedRedemptionsMock.create).toBeCalledWith(
        undefined,
        {
          CreatedBy: "",
          Date: "2021-03-25",
        },
        { Trigger: "", User: "" }
      );
    });

    describe("Expected drawdowns", () => {
      it("are skipped for single advance", async () => {
        const FkCaseId = 1232;
        const DateOfCompletion = "2020-10-26";
        await service.createCompleted({
          FkCaseId,
          DateOfCompletion,
        });

        expect(expectedDrawdownsServiceMock.create).toBeCalledTimes(0);
      });

      it("are executed for multiple advance", async () => {
        const FkCaseId = 1232;
        const DateOfCompletion = "2020-10-26";
        AdvanceType = "multiple";

        await service.createCompleted({
          FkCaseId,
          DateOfCompletion,
        });
        AdvanceType = "single";

        expect(expectedDrawdownsServiceMock.create).toBeCalledTimes(1);
        expect(expectedDrawdownsServiceMock.create).toBeCalledWith(
          undefined,
          {
            Amount: drawdowns[1].Advance,
            Date: "2021-08-03",
            CreatedBy: "",
          },
          { Trigger: "", User: "" }
        );
      });

      it("are not executed if some already exist", async () => {
        const FkCaseId = 1232;
        const DateOfCompletion = "2020-10-26";
        AdvanceType = "multiple";

        expectedDrawdowns = [
          {
            Amount: 100,
            CreatedDate: "2021-06-21",
            CreatedBy: "Foo",
            Date: "2021-09-21",
            ExpectedDrawdownId: 1,
            FkCompletedId: 5,
          },
        ];
        await service.createCompleted({
          FkCaseId,
          DateOfCompletion,
        });
        AdvanceType = "single";

        expect(expectedDrawdownsServiceMock.create).toBeCalledTimes(0);
      });
    });

    describe("Waypoints", () => {
      it("Adds redemption due date waypoint", async () => {
        const FkCaseId = 2;
        const DateOfCompletion = "2020-10-26";
        const DateOfMaturity = "2021-03-25";
        const newCompleted: CreateCompleted = {
          DateOfCompletion,
          FkCaseId,
          AddWaypointForRedemptionDueDate: true,
        };

        await service.createCompleted(newCompleted);

        const returned = await repository.getByCaseId(FkCaseId);

        expect(returned).toEqual(
          expect.objectContaining({
            FkCaseId,
            DateOfCompletion: DateOfCompletion,
            DateOfMaturity,
          })
        );
        expect(waypointServiceMock.createWaypoint).toBeCalledWith(
          returned.CompletedId,
          {
            Name: "Redemption Due Date",
            DueDate: DateOfMaturity,
            Category: "",
            IsCompleted: false,
          },
          "not_recurring"
        );
        waypointServiceMock.createWaypoint.mockClear();
      });

      it("Adds redemption due date waypoint with custom date", async () => {
        const FkCaseId = 2;
        const DateOfCompletion = "2020-10-26";
        const AddWaypointForRedemptionDueDateDate = "2021-2-26";
        const newCompleted: CreateCompleted = {
          DateOfCompletion,
          FkCaseId,
          AddWaypointForRedemptionDueDate: true,
          AddWaypointForRedemptionDueDateDate,
        };

        await service.createCompleted(newCompleted);

        const returned = await repository.getByCaseId(FkCaseId);

        expect(returned).toEqual(
          expect.objectContaining({
            FkCaseId,
            DateOfCompletion: DateOfCompletion,
            DateOfMaturity: "2021-03-25",
          })
        );
        expect(waypointServiceMock.createWaypoint).toBeCalledWith(
          returned.CompletedId,
          {
            Name: "Redemption Due Date",
            DueDate: AddWaypointForRedemptionDueDateDate,
            Category: "",
            IsCompleted: false,
          },
          "not_recurring"
        );
        waypointServiceMock.createWaypoint.mockClear();
      });

      it("Adds review exit strategy waypoint", async () => {
        const FkCaseId = 2;
        const DateOfCompletion = "2020-10-26";
        const newCompleted: CreateCompleted = {
          DateOfCompletion,
          FkCaseId,
          AddWaypointForReviewExitStrategy: true,
        };

        await service.createCompleted(newCompleted);

        const returned = await repository.getByCaseId(FkCaseId);

        expect(returned).toEqual(
          expect.objectContaining({
            FkCaseId,
            DateOfCompletion: DateOfCompletion,
            DateOfMaturity: "2021-03-25",
          })
        );
        expect(waypointServiceMock.createWaypoint).toBeCalledWith(
          returned.CompletedId,
          {
            Name: "Review Exit Strategy",
            DueDate: "2021-02-25",
            Category: "",
            IsCompleted: false,
          },
          "not_recurring"
        );
        waypointServiceMock.createWaypoint.mockClear();
      });

      it("Adds review exit strategy waypoint custom date", async () => {
        const FkCaseId = 2;
        const DateOfCompletion = "2020-10-26";
        const AddWaypointForReviewExitStrategyDate = "2021-2-15";

        const newCompleted: CreateCompleted = {
          DateOfCompletion,
          FkCaseId,
          AddWaypointForReviewExitStrategy: true,
          AddWaypointForReviewExitStrategyDate,
        };

        await service.createCompleted(newCompleted);

        const returned = await repository.getByCaseId(FkCaseId);

        expect(returned).toEqual(
          expect.objectContaining({
            FkCaseId,
            DateOfCompletion: DateOfCompletion,
            DateOfMaturity: "2021-03-25",
          })
        );
        expect(waypointServiceMock.createWaypoint).toBeCalledWith(
          returned.CompletedId,
          {
            Name: "Review Exit Strategy",
            DueDate: AddWaypointForReviewExitStrategyDate,
            Category: "",
            IsCompleted: false,
          },
          "not_recurring"
        );
        waypointServiceMock.createWaypoint.mockClear();
      });

      it("Adds send standing order instructions waypoint", async () => {
        const FkCaseId = 2;
        const DateOfCompletion = "2020-10-26";
        const newCompleted: CreateCompleted = {
          DateOfCompletion,
          FkCaseId,
          AddWaypointForSendStandingOrderInstruction: true,
        };

        await service.createCompleted(newCompleted);

        const returned = await repository.getByCaseId(FkCaseId);

        expect(returned).toEqual(
          expect.objectContaining({
            FkCaseId,
            DateOfCompletion: DateOfCompletion,
            DateOfMaturity: "2021-03-25",
          })
        );
        expect(waypointServiceMock.createWaypoint).toBeCalledWith(
          returned.CompletedId,
          {
            Name: "Send Standing Order Instruction",
            DueDate: "2020-11-02",
            Category: "",
            IsCompleted: false,
          },
          "not_recurring"
        );
        waypointServiceMock.createWaypoint.mockClear();
      });

      it("Adds serviced interest payment due waypoint", async () => {
        const FkCaseId = 2;
        const DateOfCompletion = "2020-10-26";
        const newCompleted: CreateCompleted = {
          DateOfCompletion,
          FkCaseId,
          AddWaypointForServicedInterestPaymentDue: true,
        };

        await service.createCompleted(newCompleted);

        const returned = await repository.getByCaseId(FkCaseId);

        expect(returned).toEqual(
          expect.objectContaining({
            FkCaseId,
            DateOfCompletion: DateOfCompletion,
            DateOfMaturity: "2021-03-25",
          })
        );
        expect(waypointServiceMock.createWaypoint).toBeCalledWith(
          returned.CompletedId,
          {
            Name: "Serviced Interest Payment Due",
            DueDate: "2020-11-26",
            Category: "",
            IsCompleted: false,
          },
          "monthly",
          LoanTerm
        );
        waypointServiceMock.createWaypoint.mockClear();
      });

      it("Combination of multiple waypoints", async () => {
        const FkCaseId = 2;
        const DateOfCompletion = "2020-10-26";
        const AddWaypointForServicedInterestPaymentDueDate = "2020-11-15";
        const AddWaypointForSendStandingOrderInstructionDate = "2020-10-26";
        const newCompleted: CreateCompleted = {
          DateOfCompletion,
          FkCaseId,
          AddWaypointForServicedInterestPaymentDue: true,
          AddWaypointForServicedInterestPaymentDueDate,
          AddWaypointForSendStandingOrderInstruction: true,
          AddWaypointForSendStandingOrderInstructionDate,
          AddWaypointForRedemptionDueDate: true,
          AddWaypointForReviewExitStrategy: true,
        };

        await service.createCompleted(newCompleted);

        const returned = await repository.getByCaseId(FkCaseId);

        expect(waypointServiceMock.createWaypoint.mock.calls).toEqual(
          expect.arrayContaining([
            [
              returned.CompletedId,
              {
                Name: "Serviced Interest Payment Due",
                DueDate: AddWaypointForServicedInterestPaymentDueDate,
                Category: "",
                IsCompleted: false,
              },
              "monthly",
              LoanTerm,
            ],
            [
              returned.CompletedId,
              {
                Name: "Serviced Interest Payment Due",
                DueDate: AddWaypointForServicedInterestPaymentDueDate,
                Category: "",
                IsCompleted: false,
              },
              "monthly",
              LoanTerm,
            ],
            [
              returned.CompletedId,
              {
                Name: "Review Exit Strategy",
                DueDate: "2021-02-25",
                Category: "",
                IsCompleted: false,
              },
              "not_recurring",
            ],
            [
              returned.CompletedId,
              {
                Name: "Redemption Due Date",
                DueDate: "2021-03-25",
                Category: "",
                IsCompleted: false,
              },
              "not_recurring",
            ],
          ])
        );
        waypointServiceMock.createWaypoint.mockClear();
      });
    });
  });

  describe("Computed fields", () => {
    describe("Maturity date is term months - 1 day", () => {
      describe("When run during daylight saving time", () => {
        const now = "2020-04-13T12:33:37.000Z";
        it("For completion date during daylight saving", async () => {
          Date.now = (jest.fn(() => new Date(now)) as unknown) as () => number;
          const expectedMaturityDate = "2021-05-07";
          const maturityDate = await service.getMaturityDate({
            FkCaseId: 1,
            DateOfCompletion: "2020-12-08",
          });

          expect(maturityDate).toBe(expectedMaturityDate);
        });

        it("For completion date outside daylight saving", async () => {
          Date.now = (jest.fn(() => new Date(now)) as unknown) as () => number;
          const expectedMaturityDate = "2020-09-07";
          const maturityDate = await service.getMaturityDate({
            FkCaseId: 1,
            DateOfCompletion: "2020-04-08",
          });

          expect(maturityDate).toBe(expectedMaturityDate);
        });
      });

      describe("When run outside daylight saving time", () => {
        const now = "2020-12-13T12:33:37.000Z";
        it("For completion date during daylight saving", async () => {
          Date.now = (jest.fn(() => new Date(now)) as unknown) as () => number;
          const expectedMaturityDate = "2021-05-07";
          const maturityDate = await service.getMaturityDate({
            FkCaseId: 1,
            DateOfCompletion: "2020-12-08",
          });

          expect(maturityDate).toBe(expectedMaturityDate);
        });

        it("For completion date outside daylight saving", async () => {
          Date.now = (jest.fn(() => new Date(now)) as unknown) as () => number;
          const expectedMaturityDate = "2020-09-07";
          const maturityDate = await service.getMaturityDate({
            FkCaseId: 1,
            DateOfCompletion: "2020-04-08",
          });

          expect(maturityDate).toBe(expectedMaturityDate);
        });
      });
    });
    const DateOfCompletion = "2020-12-08";
    const FkCaseId = 3;
    const DateOfMaturity = "2021-12-07";
    const InterestRate = 1.1;

    describe("Status", () => {
      it("Current status and interest rate when Non-Performing – Delinquent", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-08")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Non-Performing – Delinquent",
          automaticStatus: "Non-Performing – Delinquent",
          currentDateOfMaturity: DateOfMaturity,
          currentInterestRate: 3.0,
        });
      });

      it("Current status and interest rate when Performing", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-07")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Performing",
          automaticStatus: "Performing",
          currentDateOfMaturity: DateOfMaturity,
          currentInterestRate: InterestRate,
        });
      });

      it("Current status and interest rate when in Non-Performing – Default", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        completed.defaultEvents = [
          { Date: "2021-11-07", Type: "Start" },
          { Date: "2021-11-08", Type: "End" },
        ];
        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-11-07")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Non-Performing – Default",
          automaticStatus: "Non-Performing – Default",
          currentDateOfMaturity: DateOfMaturity,
          currentInterestRate: 3.0,
        });
      });

      it("Current status Overdue in Non-Performing – Default", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        completed.defaultEvents = [
          { Date: "2021-12-08", Type: "Start" },
          { Date: "2021-12-09", Type: "End" },
        ];
        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-08")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Non-Performing – Delinquent",
          automaticStatus: "Non-Performing – Delinquent",
          currentDateOfMaturity: DateOfMaturity,
          currentInterestRate: 3.0,
        });
      });

      it("Current status in extension", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        const extension = { Date: "2021-12-08", InterestRate: 2.0 };
        completed.extensions = [extension];
        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-08")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Performing",
          automaticStatus: "Performing",
          currentDateOfMaturity: extension.Date,
          currentInterestRate: extension.InterestRate,
        });
      });

      it("Current status in double extensions", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        const extension = { Date: "2021-12-08", InterestRate: 2.0 };
        const secondExtension = {
          Date: "2021-12-10",
          InterestRate: 2.5,
        };
        completed.extensions = [extension, secondExtension];
        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-08")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Performing",
          automaticStatus: "Performing",
          currentDateOfMaturity: secondExtension.Date,
          currentInterestRate: extension.InterestRate,
        });

        expect(
          CompletedService.fillComputedFields(
            completed,
            {
              InterestRate,
              FkCaseId,
            },
            moment("2021-12-09")
          ).currentInterestRate
        ).toEqual(secondExtension.InterestRate);
      });

      it("Default during extension", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        const extension = { Date: "2021-12-09", InterestRate: 2.0 };
        completed.extensions = [extension];
        completed.defaultEvents = [
          { Date: "2021-12-08", Type: "Start" },
          { Date: "2021-12-09", Type: "End" },
        ];
        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-08")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Non-Performing – Default",
          automaticStatus: "Non-Performing – Default",
          currentDateOfMaturity: extension.Date,
          currentInterestRate: 3.0,
        });
      });

      it("Effective Manual status, current interest rate is not changed", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        const manualStatus: ManualStatus = {
          EffectiveFrom: "2021-12-05",
          Status: "Non-Performing – Called In",
        };
        completed.manualStatuses = [manualStatus];

        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-05")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Non-Performing – Called In",
          automaticStatus: "Performing",
          currentInterestRate: InterestRate,
        });
      });

      it("Before Effective Manual status", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        const manualStatus: ManualStatus = {
          EffectiveFrom: "2021-12-05",
          Status: "Non-Performing – Called In",
        };
        completed.manualStatuses = [manualStatus];

        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-04")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Performing",
          automaticStatus: "Performing",
          currentInterestRate: InterestRate,
        });
      });

      it("2 Effective Manual statuses", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        const manualStatus: ManualStatus = {
          EffectiveFrom: "2021-11-05",
          Status: "Non-Performing – Delinquent",
        };
        const secondManualStatus: ManualStatus = {
          EffectiveFrom: "2021-12-01",
          Status: "Non-Performing – Called In",
        };
        completed.manualStatuses = [manualStatus, secondManualStatus];

        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-05")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Non-Performing – Called In",
          automaticStatus: "Performing",
          currentInterestRate: InterestRate,
        });
      });

      it("Revert manual status", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        const manualStatus: ManualStatus = {
          EffectiveFrom: "2021-11-05",
          Status: "Non-Performing – Delinquent",
        };
        const secondManualStatus: ManualStatus = {
          EffectiveFrom: "2021-12-02",
          Status: "Revert to Automatic Status",
        };
        completed.manualStatuses = [manualStatus, secondManualStatus];

        const beforeRevertCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-01")
        );

        expect(beforeRevertCompleted).toEqual({
          ...completed,
          status: "Non-Performing – Delinquent",
          automaticStatus: "Performing",
          currentInterestRate: InterestRate,
        });

        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-12-05")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Performing",
          automaticStatus: "Performing",
          currentInterestRate: InterestRate,
        });
      });

      it("Current status when only start event", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        completed.defaultEvents = [{ Date: "2021-11-07", Type: "Start" }];
        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-11-08")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Non-Performing – Default",
          automaticStatus: "Non-Performing – Default",
          currentDateOfMaturity: DateOfMaturity,
          currentInterestRate: 3.0,
        });
      });

      it("Current status and interest rate before start", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        completed.defaultEvents = [
          { Date: "2021-11-07", Type: "Start" },
          { Date: "2021-11-08", Type: "End" },
        ];
        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-11-06")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Performing",
          automaticStatus: "Performing",
          currentDateOfMaturity: DateOfMaturity,
          currentInterestRate: InterestRate,
        });
      });

      it("Current status and interest rate at the end", () => {
        const completed: Completed = {
          DateOfCompletion,
          FkCaseId,
          DateOfMaturity,
        };

        completed.defaultEvents = [
          { Date: "2021-11-07", Type: "Start" },
          { Date: "2021-11-08", Type: "End" },
        ];
        const calculatedCompleted = CompletedService.fillComputedFields(
          completed,
          {
            InterestRate,
            FkCaseId,
          },
          moment("2021-11-08")
        );

        expect(calculatedCompleted).toEqual({
          ...completed,
          status: "Performing",
          automaticStatus: "Performing",
          currentDateOfMaturity: DateOfMaturity,
          currentInterestRate: InterestRate,
        });
      });
    });
  });
});
