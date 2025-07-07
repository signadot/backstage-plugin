import { useCallback, useEffect, useRef, useState } from 'react';

export interface DataFetchingState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  isRefetching: boolean;
  refresh: () => Promise<void>;
}

export interface UseDataFetchingOptions {
  refreshInterval?: number;
  initialData?: any;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useDataFetching<T>(
  fetchOperation: () => Promise<T>,
  options: UseDataFetchingOptions = {}
): DataFetchingState<T> {
  const {
    refreshInterval = 0,
    initialData = null,
    onSuccess,
    onError,
  } = options;

  const hasInitialFetch = useRef(false);

  const [state, setState] = useState<DataFetchingState<T>>({
    data: initialData,
    error: null,
    loading: true,
    isRefetching: false,
    refresh: async () => {}, // Will be replaced in useCallback
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({
        ...prev,
        loading: !hasInitialFetch.current,
        isRefetching: hasInitialFetch.current,
      }));

      const result = await fetchOperation();
      
      setState(prev => ({
        ...prev,
        data: result,
        error: null,
        loading: false,
        isRefetching: false,
      }));
      
      hasInitialFetch.current = true;
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setState(prev => ({
        ...prev,
        error,
        loading: false,
        isRefetching: false,
      }));
      onError?.(error);
    }
  }, [fetchOperation, onSuccess, onError]);

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [refreshInterval]);

  return state;
} 