import { Request, Response } from "express";
import { injectable } from "tsyringe";

import validate from "../../../decorator/validate";
import BaseController from "../base.controller";
import * as AmlKycService from "../../../services/application/aml_kyc/aml_kyc_service";
import UpdateAmlKycValidationDto from "./dtos/update_aml_kyc.dto";
import patchAmlKycValidation from "./validators/patch_aml_kyc_validation";

const mapAmlKycDtoToDomain = (
  updateAmlKycValidationDto: UpdateAmlKycValidationDto
): AmlKycService.AmlKycValidation => ({
  ValidationUserName: updateAmlKycValidationDto.validation_user_name,
  ValidationUserDate: updateAmlKycValidationDto.validation_user_date,
  ValidationMlroDate: updateAmlKycValidationDto.validation_mlro_date,
  ValidationMlroName: updateAmlKycValidationDto.validation_mlro_name,
});

@injectable()
export default class AmlKycController extends BaseController {
  constructor() {
    super();
  }

  @validate(patchAmlKycValidation)
  public async updateAmlKycValidation(req: Request, res: Response) {
    const updateAmlKycValidationDto = req.body.data.attributes;
    const caseNumber = req.params.id;
    const amlKycValidation = mapAmlKycDtoToDomain(updateAmlKycValidationDto);

    AmlKycService.updateAmlKycValidation({ caseNumber }, amlKycValidation);

    super.ApiJsonResponse({
      res: res,
      collectionName: "application_form",
      attributes: ["result"],
      data: {
        result: true,
      },
    });
  }
}
