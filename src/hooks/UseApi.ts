import { configApiRef, discoveryApiRef, fetchApiRef, useApi as useBackstageApi} from "@backstage/core-plugin-api";
import { useEffect, useState } from "react";
import { SignadotEnvironmentsApiImpl } from "../api";
import type { ApiError, ApiResult } from "../internal/types/api";

interface UseApiOptions {
  retry?: number;
}

type UseApiResponse<T> = ApiResult<T> & {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: ApiError | null;
  data: T | null;
};

function useApi<T>(key: string, endpoint: string, options: UseApiOptions = {}): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw {
            message: "Failed to fetch data",
            response: {
              status: response.status,
              data: { error: await response.text() },
            },
          };
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as ApiError);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return {
    isLoading,
    isSuccess: !isLoading && !error && data !== null,
    isError: error !== null,
    error: error?.message ?? null,
    data,
    loading: isLoading,
  };
}

export const useSignadotClient = () => {
  const configApi = useBackstageApi(configApiRef);
  const discoveryApi = useBackstageApi(discoveryApiRef);
  const fetchApi = useBackstageApi(fetchApiRef);

  const client = new SignadotEnvironmentsApiImpl({
    fetchApi,
    configApi,
    discoveryApi,
  });

  return client;
};

export default useApi;
