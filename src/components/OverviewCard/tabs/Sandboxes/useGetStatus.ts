import { useMemo } from 'react';
import { useSandboxStatuses } from '../../../../hooks/useSandbox';

type Status =
  | {
      isLoading: true;
      isError: false;
    }
  | {
      error: string;
      isError: true;
      isLoading: false;
    }
  | {
      isError: false;
      totalSandboxes: number;
      notReady: number;
      isLoading: false;
    };

const useGetStatus = (): Status => {
  const { statuses, error, loading } = useSandboxStatuses();
  
  const notReady = useMemo(() => {
    let total = 0;
    if (loading || !statuses) {
      return total;
    }
    for (let i = 0; i < statuses.length; i++) {
      if (!statuses[i].ready) {
        total++;
      }
    }
    return total;
  }, [statuses, loading]);

  if (error) {
    return {
      isError: true,
      error: error,
      isLoading: false,
    };
  }

  if (loading) {
    return {
      isError: false,
      isLoading: true,
    };
  }

  const totalSandboxes = loading || !statuses
    ? 0
    : statuses.filter((sandboxStatus) => sandboxStatus.ready).length;

  return {
    isError: false,
    notReady,
    totalSandboxes,
    isLoading: false,
  };
};

export default useGetStatus; 