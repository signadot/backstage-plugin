import { useCallback } from "react";
import type { LatestOperatorVersionResponse } from "../api";
import { type OperatorVersion, parseOperatorVersion } from "../internal/api/OperatorVersion";
import { useSignadotClient } from "./useSignadotClient";
import { useDataFetching } from "./useDataFetching";

export interface OperatorVersionData {
  version: OperatorVersion | null;
  releaseNotes: string | null;
  loading: boolean;
  error: Error | null;
}

export function useOperatorVersion(): OperatorVersionData {
  const api = useSignadotClient();

  const fetchOperatorVersion = useCallback(async () => {
    return api.operatorVersion.getLatestOperatorVersion();
  }, [api]);

  const { data, loading, error } = useDataFetching<LatestOperatorVersionResponse>(fetchOperatorVersion);

  return {
    version: data ? parseOperatorVersion(data.version) : null,
    releaseNotes: data?.releaseNotes ?? null,
    loading,
    error,
  };
}
