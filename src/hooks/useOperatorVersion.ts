import { useApi } from "@backstage/core-plugin-api";
import { useEffect, useMemo, useState } from "react";
import { type LatestOperatorVersionResponse, signadotApiRef } from "../api";
import { type OperatorVersion, parseOperatorVersion } from "../internal/api/OperatorVersion";

export type LatestOperatorVersionData = {
  version: OperatorVersion | null;
  releaseNotes: string | null;
  error: string | null;
};

export function useLatestOperatorVersion(): LatestOperatorVersionData {
  const api = useApi(signadotApiRef);
  const [data, setData] = useState<LatestOperatorVersionResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.operatorVersion.getLatestOperatorVersion();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      }
    };

    fetchData();
  }, [api]);

  const operatorVersion = useMemo(() => {
    if (!data) {
      return null;
    }
    return parseOperatorVersion(data.version);
  }, [data]);

  if (error) {
    return {
      version: null,
      releaseNotes: null,
      error: error.message,
    };
  }

  if (!data) {
    return {
      version: null,
      releaseNotes: null,
      error: null,
    };
  }

  return {
    version: operatorVersion,
    releaseNotes: data.releaseNotes,
    error: null,
  };
}
