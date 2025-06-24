/**
 * Common API types used across the application
 */

export type ApiError = {
  message: string;
  response?: {
    status: number;
    data: {
      error: string;
    };
  };
};

export type ApiResult<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};
