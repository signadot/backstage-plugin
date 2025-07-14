import { useCallback } from "react";
import type { LatestOperatorVersionResponse } from "../api";
import { useDataFetching } from "./useDataFetching";
import { useSignadotClient } from "./useSignadotClient";

export interface OperatorVersionData {
  version: string | null;
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
    version: data?.version ?? null,
    releaseNotes: data?.releaseNotes ?? null,
    loading,
    error,
  };
}
