import moment from "moment";

import {
  CreateEstimatedRedemption,
  EstimatedRedemption,
  UpdateEstimatedRedemption,
} from "../../../../src/v2/modules/cases/completed/estimated-redemptions/estimated-redemption.interface";
import { EstimatedRedemptionsService } from "../../../../src/v2/modules/cases/completed/estimated-redemptions/estimated-redemptions.service";

describe("EstimatedRedemptionsService", () => {
  describe("Create", () => {
    it("Can not create new before today", () => {
      const estimatedRedemption: CreateEstimatedRedemption = {
        Date: moment().subtract(1, "day").format(moment.HTML5_FMT.DATE),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canCreateEstimatedRedemption(
        estimatedRedemption,
        []
      );

      expect(result).toBeFalsy();
    });

    it("Can not create new after last one", () => {
      const existingEstimatedRedemptions: EstimatedRedemption[] = [
        {
          Date: moment().add(1, "year").format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId: 1,
          FkCompletedId: 2,
        },
      ];
      const estimatedRedemption: CreateEstimatedRedemption = {
        Date: moment()
          .add(1, "year")
          .add(1, "day")
          .format(moment.HTML5_FMT.DATE),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canCreateEstimatedRedemption(
        estimatedRedemption,
        existingEstimatedRedemptions
      );

      expect(result).toBeFalsy();
    });

    it("Can create new today", () => {
      const estimatedRedemption: CreateEstimatedRedemption = {
        Date: moment().add(1, "year").format(moment.HTML5_FMT.DATE),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canCreateEstimatedRedemption(
        estimatedRedemption,
        []
      );

      expect(result).toBeTruthy();
    });

    it("Can create at last date", () => {
      const existingEstimatedRedemptions: EstimatedRedemption[] = [
        {
          Date: moment().add(1, "year").format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId: 1,
          FkCompletedId: 2,
        },
      ];
      const estimatedRedemption: CreateEstimatedRedemption = {
        Date: moment().add(1, "year").format(moment.HTML5_FMT.DATE),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canCreateEstimatedRedemption(
        estimatedRedemption,
        existingEstimatedRedemptions
      );

      expect(result).toBeTruthy();
    });
  });

  describe("Update", () => {
    it("Always can change the amount", () => {
      const EstimatedRedemptionId = 1;
      const existingEstimatedRedemptions: EstimatedRedemption[] = [
        {
          Date: moment().format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId,
          FkCompletedId: 2,
        },
      ];
      const estimatedRedemption: UpdateEstimatedRedemption = {
        Amount: 100,
        Date: moment().format(moment.HTML5_FMT.DATE),
      };
      const result = EstimatedRedemptionsService.canUpdateEstimatedRedemption(
        estimatedRedemption,
        EstimatedRedemptionId,
        existingEstimatedRedemptions
      );

      expect(result).toBeTruthy();
    });
    it("Can not change the date to before today", () => {
      const EstimatedRedemptionId = 1;
      const existingEstimatedRedemptions: EstimatedRedemption[] = [
        {
          Date: moment().format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId,
          FkCompletedId: 2,
        },
      ];
      const estimatedRedemption: UpdateEstimatedRedemption = {
        Date: moment().subtract(1, "day").format(moment.HTML5_FMT.DATE),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canUpdateEstimatedRedemption(
        estimatedRedemption,
        EstimatedRedemptionId,
        existingEstimatedRedemptions
      );

      expect(result).toBeFalsy();
    });

    it("Can not change the date to be after the last one", () => {
      const EstimatedRedemptionId = 1;
      const existingEstimatedRedemptions: EstimatedRedemption[] = [
        {
          Date: moment().format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId,
          FkCompletedId: 2,
        },
        {
          Date: moment().add(1, "year").format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId: 3,
          FkCompletedId: 2,
        },
      ];
      const estimatedRedemption: UpdateEstimatedRedemption = {
        Date: moment(existingEstimatedRedemptions[1].Date)
          .add(1, "day")
          .format(moment.HTML5_FMT.DATE),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canUpdateEstimatedRedemption(
        estimatedRedemption,
        EstimatedRedemptionId,
        existingEstimatedRedemptions
      );

      expect(result).toBeFalsy();
    });

    it("Can not change the date of last one before any existing", () => {
      const EstimatedRedemptionId = 1;
      const existingEstimatedRedemptions: EstimatedRedemption[] = [
        {
          Date: moment()
            .add(1, "year")
            .subtract(1, "day")
            .format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId: 3,
          FkCompletedId: 2,
        },
        {
          Date: moment().add(1, "year").format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId,
          FkCompletedId: 2,
        },
      ];
      const estimatedRedemption: UpdateEstimatedRedemption = {
        Date: moment()
          .add(1, "year")
          .subtract(2, "day")
          .format(moment.HTML5_FMT.DATE),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canUpdateEstimatedRedemption(
        estimatedRedemption,
        EstimatedRedemptionId,
        existingEstimatedRedemptions
      );

      expect(result).toBeFalsy();
    });

    it("Can change the date to be the remainder date", () => {
      const EstimatedRedemptionId = 1;
      const existingEstimatedRedemptions: EstimatedRedemption[] = [
        {
          Date: moment().format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId,
          FkCompletedId: 2,
        },
        {
          Date: moment().add(1, "year").format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId: 3,
          FkCompletedId: 2,
        },
      ];
      const estimatedRedemption: UpdateEstimatedRedemption = {
        Date: moment(existingEstimatedRedemptions[1].Date).format(
          moment.HTML5_FMT.DATE
        ),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canUpdateEstimatedRedemption(
        estimatedRedemption,
        EstimatedRedemptionId,
        existingEstimatedRedemptions
      );

      expect(result).toBeTruthy();
    });

    it("Can change the date of last one ot be the at existing", () => {
      const EstimatedRedemptionId = 1;
      const existingEstimatedRedemptions: EstimatedRedemption[] = [
        {
          Date: moment()
            .add(1, "year")
            .subtract(1, "day")
            .format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId: 3,
          FkCompletedId: 2,
        },
        {
          Date: moment().add(1, "year").format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId,
          FkCompletedId: 2,
        },
      ];
      const estimatedRedemption: UpdateEstimatedRedemption = {
        Date: moment()
          .add(1, "year")
          .subtract(1, "day")
          .format(moment.HTML5_FMT.DATE),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canUpdateEstimatedRedemption(
        estimatedRedemption,
        EstimatedRedemptionId,
        existingEstimatedRedemptions
      );

      expect(result).toBeTruthy();
    });

    it("Can change the date of last one further in the past", () => {
      const EstimatedRedemptionId = 1;
      const existingEstimatedRedemptions: EstimatedRedemption[] = [
        {
          Date: moment()
            .add(1, "year")
            .subtract(1, "day")
            .format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId: 3,
          FkCompletedId: 2,
        },
        {
          Date: moment().add(1, "year").format(moment.HTML5_FMT.DATE),
          CreatedBy: "",
          CreatedDate: "",
          EstimatedRedemptionId,
          FkCompletedId: 2,
        },
      ];
      const estimatedRedemption: UpdateEstimatedRedemption = {
        Date: moment()
          .add(1, "year")
          .add(2, "day")
          .format(moment.HTML5_FMT.DATE),
        CreatedBy: "",
      };
      const result = EstimatedRedemptionsService.canUpdateEstimatedRedemption(
        estimatedRedemption,
        EstimatedRedemptionId,
        existingEstimatedRedemptions
      );

      expect(result).toBeTruthy();
    });
  });
});
