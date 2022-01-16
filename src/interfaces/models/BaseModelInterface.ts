import Knex, { QueryBuilder } from "knex";

import { JsonSchemaInterface } from "./JsonSchemaInterface";

export interface BaseModelInterface {
  jsonSchema(): JsonSchemaInterface<any>;
  tableName(): string;
  insert(): Promise<any>;
  setData(key: string, value: any): void;
  select(fields?: string | Record<string, unknown>): QueryBuilder;
  update(fields?: Record<string, unknown>): QueryBuilder<unknown, number>;
  enableTransaction(trx: Knex.Transaction): BaseModelInterface;
}
