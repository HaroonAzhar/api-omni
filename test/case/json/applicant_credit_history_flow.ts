import creditHistoryContent from "./credit_history_content";

export const generateEndpoint = () => {
  return {
    data: {
      type: "applicant_form",
      id: "TO_BE_GENERATED_FROM_TEST",
      attributes: {
        credit_history: creditHistoryContent,
      },
    },
  };
};
