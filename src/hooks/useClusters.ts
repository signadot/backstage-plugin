import { useCallback } from "react";
import type { ClusterStatusResponse, ClustersResponse } from "../api";
import { useSignadotClient } from "./useSignadotClient";
import { useDataFetching } from "./useDataFetching";

interface ClusterData {
  clusterStatus: ClusterStatusResponse;
  clusters: ClustersResponse;
}

export function useClusters() {
  const api = useSignadotClient();

  const fetchClusters = useCallback(async () => {
    const [statusData, clustersData] = await Promise.all([
      api.clusters.getClusterStatus(),
      api.clusters.getClusters(),
    ]);
    return {
      clusterStatus: statusData,
      clusters: clustersData,
    };
  }, [api]);

  const { data, loading, error, refresh } = useDataFetching<ClusterData>(fetchClusters);

  return {
    loading,
    error,
    clusterStatus: data?.clusterStatus ?? null,
    clusters: data?.clusters ?? null,
    refresh,
  };
}
