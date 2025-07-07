import { useCallback, useEffect, useState } from "react";
import type { LatestOperatorVersionResponse } from "../api";
import { type OperatorVersion, parseOperatorVersion } from "../internal/api/OperatorVersion";
import { useSignadotClient } from "./useSignadotClient";

export interface OperatorVersionData {
  version: OperatorVersion | null;
  releaseNotes: string | null;
  loading: boolean;
  error: Error | null;
}

export function useOperatorVersion(): OperatorVersionData {
  const api = useSignadotClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<LatestOperatorVersionResponse | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.operatorVersion.getLatestOperatorVersion();
      setData(response);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    version: data ? parseOperatorVersion(data.version) : null,
    releaseNotes: data?.releaseNotes ?? null,
    loading,
    error,
  };
}
