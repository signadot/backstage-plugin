import { useCallback, useEffect, useState } from "react";
import type { ClusterStatusResponse, ClustersResponse } from "../api";
import { useSignadotClient } from "./useSignadotClient";

export function useClusters() {
  const api = useSignadotClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [clusterStatus, setClusterStatus] = useState<ClusterStatusResponse | null>(null);
  const [clusters, setClusters] = useState<ClustersResponse | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [statusData, clustersData] = await Promise.all([
        api.clusters.getClusterStatus(),
        api.clusters.getClusters(),
      ]);
      setClusterStatus(statusData);
      setClusters(clustersData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    error,
    clusterStatus,
    clusters,
    refresh: fetchData,
  };
}
