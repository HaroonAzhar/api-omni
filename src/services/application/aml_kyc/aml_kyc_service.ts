import AmlKycValidation from "./interfaces/aml_kyc_validation.interface";
import AmlKycValidationRepository from "./repositories/aml_kyc_validation.repository";
import CaseRepository, {
  CaseIdentification,
} from "./repositories/case.repository";

export const updateAmlKycValidation = async (
  caseIdentification: CaseIdentification,
  amlKycValidation: AmlKycValidation
) => {
  const caseRepository = new CaseRepository();
  const { CaseId: FkCaseId } = await caseRepository.getByIdentification(
    caseIdentification
  );

  const amlKycRepository = new AmlKycValidationRepository();
  const exitingAmlKycValidation = await amlKycRepository.getByCaseId(FkCaseId);
  if (exitingAmlKycValidation) {
    await amlKycRepository.update(amlKycValidation, FkCaseId);
  } else {
    await amlKycRepository.create(amlKycValidation, FkCaseId);
  }
};

export const getAmlKycValidation = async (
  caseIdentification: CaseIdentification
) => {
  const caseRepository = new CaseRepository();
  const { CaseId: FkCaseId } = await caseRepository.getByIdentification(
    caseIdentification
  );

  const amlKycRepository = new AmlKycValidationRepository();
  const exitingAmlKycValidation = await amlKycRepository.getByCaseId(FkCaseId);
  return exitingAmlKycValidation;
};

export const clearAmlKycValidation = async (
  caseIdentification: CaseIdentification
) => {
  const caseRepository = new CaseRepository();
  const { CaseId: FkCaseId } = await caseRepository.getByIdentification(
    caseIdentification
  );

  const amlKycRepository = new AmlKycValidationRepository();
  await amlKycRepository.deleteByCaseId(FkCaseId);
};

export { AmlKycValidation, CaseIdentification };
