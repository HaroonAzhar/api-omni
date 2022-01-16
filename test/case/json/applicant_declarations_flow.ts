import declarationsSignaturesContent from "./declarations_signatures_content";

export const generateEndpoint = () => {
  return {
    data: {
      type: "applicant_form",
      id: "TO_BE_GENERATED_FROM_TEST",
      attributes: {
        declarations_signatures: declarationsSignaturesContent,
      },
    },
  };
};
