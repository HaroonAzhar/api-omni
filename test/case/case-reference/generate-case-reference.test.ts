import generateCaseReference from "../../../src/v2/modules/cases/case-reference/generate-case-reference";

describe("generateCaseReference", () => {
  it("Can handle no cases", () => {
    const caseRef = generateCaseReference("FOODRO", [], {
      ContactType: "individual",
    });

    expect(caseRef).toBe("10001-FOOD");
  });

  it("Is always bigger than existing ones", () => {
    const caseRef = generateCaseReference(
      "FOODRO",
      [
        { CaseNr: "10002-ASDF" },
        { CaseNr: "10022-ASDF" },
        { CaseNr: "10012-ASDF" },
      ],
      {
        ContactType: "individual",
      }
    );

    expect(caseRef).toBe("10023-FOOD");
  });

  it("Is always bigger than existing ones", () => {
    const caseRef = generateCaseReference(
      "FOODRO",
      [
        { CaseNr: "10002-ASDF" },
        { CaseNr: "10022-ASDF" },
        { CaseNr: "10012-ASDF" },
      ],
      {
        ContactType: "individual",
      }
    );

    expect(caseRef).toBe("10023-FOOD");
  });

  it("Skips cases without case reference", () => {
    const caseRef = generateCaseReference(
      "FOODRO",
      [{ CaseNr: "10002-ASDF" }, {}, { CaseNr: "10011-ASDF" }],
      {
        ContactType: "individual",
      }
    );

    expect(caseRef).toBe("10012-FOOD");
  });

  it("Filters out enquiry", () => {
    const caseRef = generateCaseReference(
      "FOODRO",
      [
        { CaseNr: "10002-ASDF" },
        { CaseNr: "ENQ-2344" },
        { CaseNr: "10101-ASDF" },
      ],
      {
        ContactType: "individual",
      }
    );

    expect(caseRef).toBe("10102-FOOD");
  });
});
