import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import config from '@v2/config';

export interface PaginationQueryParams {
  limit: number;
  page: number;
}

export interface PaginationResponseProperties {
  count: number;
  limit: number;
  page: number;
  pages: number;
}

export const PaginationQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationQueryParams => {
    const request = ctx.switchToHttp().getRequest();

    let { page = 1, limit = config.pagination.defaultLimit }: PaginationQueryParams = request.query || {};

    limit = Math.max(1, Math.min(limit, config.pagination.maxLimit));

    page = parseInt(String(page), 10);
    if (isNaN(page)) {
      page = 1;
    }

    return {
      limit,
      page,
    };
  }
);

export const createResponseProperties = (
  offset: number,
  limit: number,
  count: number
): PaginationResponseProperties => {
  return {
    page: Math.floor(offset / limit) + 1,
    limit,
    count,
    pages: Math.ceil(count / limit),
  };
};

export class Pagination<T = unknown> {
  constructor(public data: T, public pagination: PaginationResponseProperties) {}
}
