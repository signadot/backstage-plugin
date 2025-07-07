import { useCallback, useEffect, useState } from "react";
import type { Message } from "../internal/types/messages";
import { useSignadotClient } from "./useSignadotClient";

interface UserMessagesData {
  messages: Message[] | null;
  error: string | null;
}

export const useUserMessages = (refreshInterval = 30000): UserMessagesData => {
  const signadotApi = useSignadotClient();
  const [data, setData] = useState<UserMessagesData>({
    messages: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await signadotApi.messages.getUserMessages();
      setData({
        messages: response.messages,
        error: null,
      });
    } catch (error) {
      setData({
        messages: null,
        error: error instanceof Error ? error.message : "An error occurred",
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
