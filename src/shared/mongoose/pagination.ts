import { IPagination } from '../shared.interface';

export const getPaginatedResponse = (
  docs: unknown[],
  total: number,
  pagination: IPagination,
) => {
  return {
    docs,
    total,
    limit: pagination.limit,
    page: pagination.page,
    hasNextPage: pagination.limit * pagination.page < total,
    hasPrevPage: pagination.page > 1,
    pagingCounter: pagination.limit * (pagination.page - 1) + 1,
    totalPages: Math.ceil(total / pagination.limit),
  };
};
