export interface IPaginationAndSortOptions {
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: string;
}

interface IPaginationAndSortHelperResult {
  page: number;
  limit:  number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

const paginationAndSortHelper = (
  paginationAndSortOptions: IPaginationAndSortOptions,
): IPaginationAndSortHelperResult => {
  const page = Number(paginationAndSortOptions.page) || 1;
  const limit = Number(paginationAndSortOptions.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = paginationAndSortOptions.sortBy || "createdAt";
  const sortOrder = paginationAndSortOptions.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default paginationAndSortHelper;
