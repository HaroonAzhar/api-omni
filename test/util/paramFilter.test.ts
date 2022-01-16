import ParamFilter from "../../src/util/paramFilter";

describe("ParamFilter Test Case", () => {
  const instance = new ParamFilter();

  beforeEach(() => {
    instance.loadData("sample_fake_key", {
      key1: "test",
      key2: "test3",
      key5: "test5",
      key6: "test444",
    });
  });

  afterEach(() => {
    instance.remove("sample_fake_key");
  });

  it("should load params", () => {
    expect(instance.getData("sample_fake_key")).toEqual({
      key1: "test",
      key2: "test3",
      key5: "test5",
      key6: "test444",
    });
  });

  it("should get data by keys", () => {
    expect(instance.getData("sample_fake_key", ["key1", "key6"])).toEqual({
      key1: "test",
      key6: "test444",
    });
  });

  it("should throw error if key doesnt exists", () => {
    expect(() => {
      instance.remove("sa");
    }).toThrowError("Cannot Find sa Key");
    expect(() => {
      instance.getData("sample_fake_key", ["key1", "fafafa"]);
    }).toThrowError("Cannot find field fafafa");
    expect(() => {
      instance.loadData("sample_fake_key", { key1: "test" });
    }).toThrowError("You cannot redefine sample_fake_key please use remove()");
  });
});
