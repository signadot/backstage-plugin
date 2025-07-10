import { useCallback } from "react";
import type { SandboxV2 } from "../internal/types/sandboxes";
import type { SandboxStatus } from "../internal/types/sandboxLegacy";
import { useSignadotClient } from "./useSignadotClient";
import { useDataFetching } from "./useDataFetching";

export interface SandboxesData {
  sandboxesList: SandboxV2[] | null;
  error: string | null;
  loading: boolean;
}

export interface SandboxStatusesData {
  statuses: SandboxStatus[] | null;
  error: string | null;
  loading: boolean;
}

export const useSandboxes = (refreshInterval = 5000) => {
  const signadotApi = useSignadotClient();
  
  const fetchSandboxes = useCallback(async () => {
    const response = await signadotApi.sandboxes.getSandboxes();
    return response.sandboxesList;
  }, [signadotApi]);

  const { data: sandboxesList, error, loading } = useDataFetching<SandboxV2[]>(
    fetchSandboxes,
    { refreshInterval }
  );

  return {
    sandboxesList,
    error: error?.message ?? null,
    loading,
  };
};

export const useSandboxStatuses = (refreshInterval = 30000) => {
  const signadotApi = useSignadotClient();
  
  const fetchStatuses = useCallback(async () => {
    const response = await signadotApi.sandboxes.getSandboxStatuses();
    return response.statuses;
  }, [signadotApi]);

  const { data: statuses, error, loading } = useDataFetching<SandboxStatus[]>(
    fetchStatuses,
    { refreshInterval }
  );

  return {
    statuses,
    error: error?.message ?? null,
    loading,
  };
};
