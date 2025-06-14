export type ApiResponse<T> = {
  code: string;
  data: T;
};

export type ApiError = {
  error: string;
};

export type UninterceptedApiError = {
  error: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  data: T;
  meta: {
    current_page: number;
    per_page: number;
    total_data: number;
    total_pages: number;
  };
}
