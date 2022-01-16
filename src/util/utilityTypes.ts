export type Dictionary<
  T extends Record<string, unknown>,
  S extends string = string
> = {
  [key in keyof T]?: S;
};

export type JsonProps<T> = {
  [P in keyof T]?: string;
};
