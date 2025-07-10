export type MessageSeverity = 'warning' | 'critical' | 'info';

export type MessageKind = 'billing-usage' | 'billing-job-usage' | 'billing-sandbox-usage';

export type Message = {
  kind: MessageKind;
  actionLink?: string;
  title: string;
  description: string;
  severity: MessageSeverity;
}

export interface GetUserMessagesResponse {
  messages: Message[];
} 