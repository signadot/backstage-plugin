import { useCallback } from "react";
import type { Message } from "../internal/types/messages";
import { useSignadotClient } from "./useSignadotClient";
import { useDataFetching } from "./useDataFetching";

interface UserMessagesData {
  messages: Message[] | null;
  error: string | null;
}

export const useUserMessages = (refreshInterval = 30000): UserMessagesData => {
  const signadotApi = useSignadotClient();
  
  const fetchMessages = useCallback(async () => {
    const response = await signadotApi.messages.getUserMessages();
    return response.messages;
  }, [signadotApi]);

  const { data: messages, error } = useDataFetching<Message[]>(
    fetchMessages,
    { refreshInterval }
  );

  return {
    messages,
    error: error?.message ?? null,
  };
};
