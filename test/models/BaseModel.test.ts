import * as Knex from "knex";

import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../src/interfaces/models/JsonSchemaInterface";
import { BaseModel } from "../../src/models/BaseModel";

class SampleModel extends BaseModel {
  tableName(): string {
    return "";
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        sample_pk: "number|pk",
        sample: "string",
        sample_fake: "string",
        sample_fake3: "string",
      },
    };
  }

  getJsonMapping(): PropertiesInterface<any> {
    return {
      sampleNonRelatedField: "sample",
      nextField: "sample_fake",
      otherFakeField: (db: Knex, propertyValue) => {
        db.select().from("faketable");
        return {
          key: "sample_fake3",
          value: propertyValue,
        };
      },
    };
  }
}

describe("BaseModel TestCase", () => {
  it("should initialize knex instance", () => {
    BaseModel.registerKnex({
      sample: true,
    } as any);

    expect(BaseModel.getKnex()).toMatchObject({
      sample: true,
    });
  });

  it("should throw error if table not set", () => {
    expect(() => {
      const model = new SampleModel();
      model.isValid();
    }).toThrowErrorMatchingSnapshot();
  });

  it("should find primary key", () => {
    const model = new SampleModel();
    const primaryKey = (model as any).primaryKey;
    expect(primaryKey).toBe("sample_pk");
  });

  it("primary key should not be visible for insert data", () => {
    const insertMock: any = jest.fn(() => {
      return {
        into: () => {
          return {
            returning: () => {
              return 1;
            },
          };
        },
      };
    });
    BaseModel.registerKnex({
      sample: true,
      insert: insertMock,
    } as any);
    const model = new SampleModel();
    model.tableName = () => "sample";
    model.setData("sample", "test");
    model.insert();

    expect(insertMock.mock.calls[0][0]).toEqual({
      Sample: "test",
    });
  });

  it("should map fields from json and update", () => {
    const updateMock = jest.fn(() => {
      {
        return {
          into: () => {
            return {
              returning: () => {
                return 1;
              },
            };
          },
        };
      }
    });

    BaseModel.registerKnex({
      update: updateMock,
    } as any);

    const model = new SampleModel();
    const json = {
      sampleNonRelatedField: "somefakevalue",
      nextField: "nextfake",
    };

    model.setJsonObject(json);
    model.update();
    expect(model.data().sample).toBe("somefakevalue");
    expect(model.data().sample_fake).toBe("nextfake");
  });

  it("should update data", () => {
    const updateMock = jest.fn(() => {
      {
        return {
          into: () => {
            return {
              returning: () => {
                return 1;
              },
            };
          },
        };
      }
    });

    BaseModel.registerKnex({
      update: updateMock,
    } as any);

    const model = new SampleModel();
    model.setData("sample", "test");
    model.update();
    const calls: any = updateMock.mock.calls;
    expect(calls[0][0]).toMatchObject({
      Sample: "test",
    });
  });

  it("should update if null value", () => {
    const updateMock = jest.fn(() => {
      {
        return {
          into: () => {
            return {
              returning: () => {
                return 1;
              },
            };
          },
        };
      }
    });

    BaseModel.registerKnex({
      update: updateMock,
    } as any);

    const model = new SampleModel();
    model.setData("sample", "test");
    model.setData("sample", null);
    model.update();
    const calls: any = updateMock.mock.calls;
    expect(calls[0][0]).toMatchObject({
      Sample: null,
    });
  });

  it("should mapper recognize function with db", async () => {
    const updateMock = jest.fn(() => {
      {
        return {
          into: () => {
            return {
              returning: () => {
                return 1;
              },
            };
          },
        };
      }
    });

    const model = new SampleModel();
    const fromMock = jest.fn();
    const selectMock = jest.fn(() => {
      return {
        from: fromMock,
      };
    });
    BaseModel.registerKnex({
      select: selectMock,
      update: updateMock,
    } as any);

    await model.setJsonObject({
      otherFakeField: "samplefake222",
    });

    model.update();

    expect(selectMock.mock.calls.length).toBe(1);
    expect(fromMock.mock.calls[0][0]).toBe("faketable");
    expect(model.data().sample_fake3).toBe("samplefake222");
  });

  /*    it("should insert data", () => {
        const insertMock = jest.fn();
        BaseModel.registerKnex({
            sample: true,
            table: () => {
                return {
                    insert: insertMock
                };
            }
        } as any);
        const model = new SampleModel();
        model.tableName = () => "sample";
        model.setData("sample", "test");
        model.insert();

        expect(insertMock.mock.calls[0][0]).toMatchObject({
            sample: "test",
            sampleFake: null
        });
    });*/
});
