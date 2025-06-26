import { useApi } from "@backstage/core-plugin-api";
import { useCallback, useEffect, useState } from "react";
import { signadotApiRef } from "../api";
import type { SandboxV2 } from "../internal/types/sandboxes";
import type { SandboxStatus } from "../internal/types/sandboxLegacy";
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

export const useSandboxes = (refreshInterval = 5000): SandboxesData => {
  const signadotApi = useApi(signadotApiRef);
  const [data, setData] = useState<SandboxesData>({
    sandboxesList: null,
    error: null,
    loading: true,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await signadotApi.sandboxes.getSandboxes();
      setData({
        sandboxesList: response.sandboxesList,
        error: null,
        loading: false,
      });
    } catch (error) {
      setData({
        sandboxesList: null,
        error: error instanceof Error ? error.message : "An error occurred",
        loading: false,
      });
    }
  }, [signadotApi]);

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [fetchData, refreshInterval]);

  return data;
};

export const useSandboxStatuses = (refreshInterval = 30000): SandboxStatusesData => {
  const signadotApi = useApi(signadotApiRef);
  const [data, setData] = useState<SandboxStatusesData>({
    statuses: null,
    error: null,
    loading: true,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await signadotApi.sandboxes.getSandboxStatuses();
      setData({
        statuses: response.statuses,
        error: null,
        loading: false,
      });
    } catch (error) {
      setData({
        statuses: null,
        error: error instanceof Error ? error.message : "An error occurred",
        loading: false,
      });
    }
  }, [signadotApi]);

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [fetchData, refreshInterval]);

  return data;
};
