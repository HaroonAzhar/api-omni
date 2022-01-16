export interface JsonSchemaInterface<TValue> {
  type: string;
  required: [string?];
  properties: TValue;
}

export interface JsonMapperFunction {
  [index: string]: string | number | any;
}

export interface PropertiesInterface<T> {
  [index: string]:
    | ((
        dbProvider: any,
        propertyValue: string | number | [] | PropertiesInterface<T>
      ) => T | JsonMapperFunction | Promise<JsonMapperFunction>)
    | string
    | number;
}
