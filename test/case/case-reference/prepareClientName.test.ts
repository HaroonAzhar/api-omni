import prepareClientName from "../../../src/v2/modules/cases/case-reference/prepareClientName";

describe("prepareClientName", () => {
  describe("company", () => {
    it("Should not break with empty string", () => {
      const givenClientName = "";
      const givenIsCompany = true;
      const expectedPreparedName = "";

      const returnedPreparedName = prepareClientName(
        givenClientName,
        givenIsCompany
      );

      expect(returnedPreparedName).toBe(expectedPreparedName);
    });

    it("Should capitalize the company name", () => {
      const givenClientName = "ucreate";
      const givenIsCompany = true;
      const expectedPreparedName = "UCREATE";

      const returnedPreparedName = prepareClientName(
        givenClientName,
        givenIsCompany
      );

      expect(returnedPreparedName).toBe(expectedPreparedName);
    });

    it("Should remove white spaces and non numeric values", () => {
      const givenClientName = "R.E.D inc";
      const givenIsCompany = true;
      const expectedPreparedName = "REDINC";

      const returnedPreparedName = prepareClientName(
        givenClientName,
        givenIsCompany
      );

      expect(returnedPreparedName).toBe(expectedPreparedName);
    });
  });
  describe("Individual", () => {
    it("Should not break with empty string", () => {
      const givenClientName = "";
      const givenIsCompany = false;
      const expectedPreparedName = "";

      const returnedPreparedName = prepareClientName(
        givenClientName,
        givenIsCompany
      );

      expect(returnedPreparedName).toBe(expectedPreparedName);
    });
    it("Should remove white spaces and non numeric values", () => {
      const givenClientName = "R.E.Dinc";
      const givenIsCompany = false;
      const expectedPreparedName = "REDINC";

      const returnedPreparedName = prepareClientName(
        givenClientName,
        givenIsCompany
      );

      expect(returnedPreparedName).toBe(expectedPreparedName);
    });
    it("Should take surname as the name", () => {
      const givenClientName = "James Dwyer";
      const givenIsCompany = false;
      const expectedPreparedName = "DWYER";

      const returnedPreparedName = prepareClientName(
        givenClientName,
        givenIsCompany
      );

      expect(returnedPreparedName).toBe(expectedPreparedName);
    });
    it("Should take surname as the name, ignoring salutaions and middle names", () => {
      const givenClientName = "Mr. James Maria Dwyer";
      const givenIsCompany = false;
      const expectedPreparedName = "DWYER";

      const returnedPreparedName = prepareClientName(
        givenClientName,
        givenIsCompany
      );

      expect(returnedPreparedName).toBe(expectedPreparedName);
    });
    it("Should take only surname without non alpha numbers", () => {
      const givenClientName = "Elissa von Broembsen-Kluever";
      const givenIsCompany = false;
      const expectedPreparedName = "BROEMBSENKLUEVER";

      const returnedPreparedName = prepareClientName(
        givenClientName,
        givenIsCompany
      );

      expect(returnedPreparedName).toBe(expectedPreparedName);
    });
    it("Should take first letters firstname is lastname is less than 4 characters", () => {
      expect(prepareClientName("John Doe", false)).toBe("DOEJ");
      expect(prepareClientName("John D", false)).toBe("DJOH");
    });
  });
});
