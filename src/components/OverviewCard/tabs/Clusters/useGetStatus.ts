import { useMemo } from "react";
import type { ApiError } from "../../../../@types/sd/api";
import { useClusters } from "../../../../hooks/useClusters";
import { useLatestOperatorVersion } from "../../../../hooks/useOperatorVersion";
import { isObservedVersionLatest, parseOperatorVersion } from "../../../../internal/api/OperatorVersion";

type Status =
  | {
      isLoading: true;
      isError: false;
    }
  | {
      error: ApiError | string;
      isError: true;
      isLoading: false;
    }
  | {
      isError: false;
      totalClusters: number;
      unhealthy: number;
      pendingUpgrade: number;
      isLoading: false;
    };

const useGetStatus = (): Status => {
  const { loading: isLoading, error, clusterStatus, clusters } = useClusters();
  const latestOperatorVersionApi = useLatestOperatorVersion();
  const waitingOnData = !clusterStatus || isLoading || !clusters || !latestOperatorVersionApi.version;

  console.log("clusterStatus", clusterStatus, clusters);

  const unhealthy = useMemo(() => {
    if (waitingOnData || !clusterStatus) {
      return 0;
    }
    let total = 0;
    for (let i = 0; i < clusterStatus.Statuses.length; i++) {
      if (!clusterStatus.Statuses[i].status.healthy) {
        total++;
      }
    }
    return total;
  }, [clusterStatus, waitingOnData]);

  const pendingUpgrades = useMemo(() => {
    if (waitingOnData || !clusters || !latestOperatorVersionApi.version) {
      return 0;
    }
    let total = 0;
    const { version } = latestOperatorVersionApi;
    for (let i = 0; i < clusters.clusters?.length; i++) {
      const c = clusters.clusters[i];
      if (!c.operatorVersion) {
        continue;
      }
      const clusterVersion = parseOperatorVersion(c.operatorVersion);
      if (!isObservedVersionLatest(clusterVersion, version)) {
        total++;
      }
    }
    return total;
  }, [clusters, latestOperatorVersionApi, waitingOnData]);

  if (error) {
    return {
      isError: true,
      isLoading: false,
      error: error.message,
    };
  }

  if (waitingOnData) {
    return {
      isError: false,
      isLoading: true,
    };
  }

  const totalClusters = waitingOnData
    ? 0
    : clusterStatus!.Statuses.filter((clusterStatus) => clusterStatus.status.healthy).length;

  return {
    isError: false,
    isLoading: false,
    unhealthy: unhealthy,
    pendingUpgrade: pendingUpgrades,
    totalClusters: totalClusters,
  };
};

export default useGetStatus;
