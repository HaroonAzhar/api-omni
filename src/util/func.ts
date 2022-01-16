import * as Inflector from "inflected";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.underscore = function () {
  this.map((value: { [key: string]: string }) => {
    for (const v in value) {
      value[Inflector.underscore(v)] = value[v];
      delete value[v];
    }
  });

  return this;
};

export const underscoreKeys = (obj: Record<string, any>): Record<string, any> =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({ ...acc, [Inflector.underscore(key)]: value }),
    {}
  );
