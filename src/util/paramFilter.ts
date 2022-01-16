type Data<T> = {
  [key: string]: T;
};

export default class ParamFilter {
  private _data: Data<Record<string, unknown>>;

  constructor() {
    this._data = {};
  }

  public loadData(key: string, values: Record<string, unknown>) {
    if (this.checkIsExists(key)) {
      throw new Error(`You cannot redefine ${key} please use remove()`);
    }
    this._data[key] = values;
  }

  public getData(key: string, fields?: string[]) {
    if (this.checkIsExists(key)) {
      if (fields) {
        const filteredFields: any = {};
        for (const k of fields) {
          if (!this._data[key].hasOwnProperty(k))
            throw new Error(`Cannot find field ${k}`);
          filteredFields[k] = this.getData(key)[k];
        }

        return filteredFields;
      }
      return this._data[key];
    }

    throw new Error(`Cannot Find ${key} Key`);
  }

  public remove(key: string) {
    if (!this.checkIsExists(key)) {
      throw new Error(`Cannot Find ${key} Key`);
    }

    delete this._data[key];
  }

  private checkIsExists(key: string) {
    return this._data.hasOwnProperty(key);
  }
}
