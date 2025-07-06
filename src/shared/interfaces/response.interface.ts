export interface IErrorResponse {
  errors: string | object | object[];
  code: string;
  message: string;
  status: number;
  path: string;
  timestamp: string;
  success: boolean;
}

export interface IPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface IResponse<T> {
  data: T;
  success: boolean;
  pagination?: IPagination;
}
