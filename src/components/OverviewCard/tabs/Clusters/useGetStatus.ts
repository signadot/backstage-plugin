import { useClusters } from "../../../../hooks/useClusters";
import { useOperatorVersion } from "../../../../hooks/useOperatorVersion";
import type { OperatorVersion } from "../../../../internal/api/OperatorVersion";
import { isObservedVersionLatest, parseOperatorVersion } from "../../../../internal/api/OperatorVersion";

interface ErrorStatus {
  isError: true;
  isLoading: false;
  error: Error | null;
}

interface SuccessStatus {
  isError: false;
  isLoading: false;
  totalClusters: number;
  unhealthy: number;
  pendingUpgrade: number;
  operatorVersion: OperatorVersion | null;
}

interface LoadingStatus {
  isError: false;
  isLoading: true;
}

type Status = ErrorStatus | SuccessStatus | LoadingStatus;

export const useGetStatus = (): Status => {
  const { loading: clustersLoading, error: clustersError, clusterStatus, clusters } = useClusters();
  const { loading: operatorLoading, error: operatorError, version } = useOperatorVersion();
  const waitingOnData = !clusterStatus || clustersLoading || !clusters || !version;

  if (clustersLoading || operatorLoading) {
    return {
      isError: false,
      isLoading: true,
    };
  }

  if (clustersError || operatorError) {
    return {
      isError: true,
      isLoading: false,
      error: clustersError || operatorError,
    };
  }

  if (waitingOnData) {
    return {
      isError: false,
      isLoading: true,
    };
  }

  let totalClusters = 0;
  let unhealthy = 0;
  let pendingUpgrades = 0;

  if (clusters && clusters.clusters && clusterStatus) {
    totalClusters = clusters.clusters.length;

    // Count unhealthy clusters
    for (const status of clusterStatus.Statuses) {
      if (!status.status.healthy) {
        unhealthy++;
      }
    }

    // Count clusters needing operator upgrades
    for (const cluster of clusters.clusters) {
      if (version && cluster.operatorVersion) {
        const clusterVersion = parseOperatorVersion(cluster.operatorVersion);
        if (!isObservedVersionLatest(clusterVersion, version)) {
          pendingUpgrades++;
        }
      }
    }
  }

  return {
    isError: false,
    isLoading: false,
    totalClusters,
    unhealthy,
    pendingUpgrade: pendingUpgrades,
    operatorVersion: version,
  };
};

export default useGetStatus;
