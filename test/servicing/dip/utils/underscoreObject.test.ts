import underscoreObject from "@v2/modules/cases/dip/utils/underscoreObject";

describe("underscoreObject", () => {
  it("underscorizes simple object", () => {
    const simpleObject = {
      FooBar: "value",
      AnotherProperty: 5,
    };

    const expectedObject = {
      ...simpleObject,
      foo_bar: simpleObject.FooBar,
      another_property: simpleObject.AnotherProperty,
    };

    const underscoredObject = underscoreObject(simpleObject);

    expect(underscoredObject).toEqual(expectedObject);
  });
  it("underscorizes object recursively", () => {
    const simpleObject = {
      FooBar: "value",
      AnotherProperty: "sampleValue",
      InsideObject: {
        InsideProperty: "insideValue",
      },
    };

    const expectedObject = {
      ...simpleObject,
      foo_bar: simpleObject.FooBar,
      another_property: simpleObject.AnotherProperty,
      inside_object: {
        ...simpleObject.InsideObject,
        inside_property: simpleObject.InsideObject.InsideProperty,
      },
    };

    const underscoredObject = underscoreObject(simpleObject);

    expect(underscoredObject).toEqual(expectedObject);
  });

  it("underscorizes array elements", () => {
    const simpleObject = {
      FooBar: "value",
      AnotherProperty: "sampleValue",
      InsideArray: [
        {
          ArrayProperty: "insideValue",
        },
      ],
    };

    const expectedObject = {
      ...simpleObject,
      foo_bar: simpleObject.FooBar,
      another_property: simpleObject.AnotherProperty,
      inside_array: [
        {
          ...simpleObject.InsideArray[0],
          array_property: simpleObject.InsideArray[0].ArrayProperty,
        },
      ],
    };

    const underscoredObject = underscoreObject(simpleObject);

    expect(underscoredObject).toEqual(expectedObject);
  });

  it("Can handle null values", () => {
    const simpleObject: Record<string, string> = {
      FooBar: null,
    };

    const expectedObject = {
      ...simpleObject,
      foo_bar: simpleObject.FooBar,
    };

    const underscoredObject = underscoreObject(simpleObject);

    expect(underscoredObject).toEqual(expectedObject);
  });
});
