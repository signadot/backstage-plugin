import {
  type ConfigApi,
  configApiRef,
  createApiRef,
  type DiscoveryApi,
  type FetchApi,
} from "@backstage/core-plugin-api";
import type { GetUserMessagesResponse } from "./internal/types/messages";
import type { SandboxV2 } from "./internal/types/sandboxes";
import type { SandboxStatus } from "./internal/types/sandboxLegacy";

export interface SandboxesResponse {
  sandboxesList: SandboxV2[];
}

export interface SandboxStatusesResponse {
  statuses: SandboxStatus[];
}

export interface SandboxApi {
  getSandboxes(): Promise<SandboxesResponse>;
  getSandboxStatuses(): Promise<SandboxStatusesResponse>;
}

export interface MessagesApi {
  getUserMessages(): Promise<GetUserMessagesResponse>;
}

export interface SignadotEnvironmentsApi {
  getApiBaseUrl(): string;
  getOrganization(): string;
  sandboxes: SandboxApi;
  messages: MessagesApi;
}

export const signadotApiRef = createApiRef<SignadotEnvironmentsApi>({
  id: "plugin.signadot.service",
});

export class SignadotEnvironmentsApiImpl implements SignadotEnvironmentsApi {
  private apiUrl: string;
  private org: string;
  private readonly fetchApi: FetchApi;
  private readonly discoveryApi: DiscoveryApi;
  private readonly headers: HeadersInit;

  constructor(options: {
    fetchApi: FetchApi;
    configApi: ConfigApi;
    discoveryApi: DiscoveryApi;
  }) {
    const apiUrl = options.configApi.getOptionalString("signadot.apiUrl") ?? "https://api.signadot.com";
    const org = options.configApi.getString("signadot.org");
    const apiKey = options.configApi.getString("signadot.apiKey");

    this.apiUrl = apiUrl;
    this.org = org;
    this.fetchApi = options.fetchApi;
    this.discoveryApi = options.discoveryApi;
    this.headers = {
      "signadot-api-key": apiKey,
      "Content-Type": "application/json",
    };
  }

  getApiBaseUrl(): string {
    return this.apiUrl;
  }

  getOrganization(): string {
    return this.org;
  }

  private async getBaseUrl(): Promise<string> {
    const proxyUrl = await this.discoveryApi.getBaseUrl("proxy");
    return `${proxyUrl}/signadot`;
  }

  private async fetch<T>(path: string): Promise<T> {
    const baseUrl = await this.getBaseUrl();
    const response = await this.fetchApi.fetch(`${baseUrl}${path}`, {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${path}: ${response.statusText}`);
    }

    return response.json();
  }

  sandboxes: SandboxApi = {
    getSandboxes: async (): Promise<SandboxesResponse> => {
      const data = await this.fetch<SandboxV2[]>(`/api/v2/orgs/${this.org}/sandboxes`);
      return {
        sandboxesList: data ?? [],
      };
    },

    getSandboxStatuses: async (): Promise<SandboxStatusesResponse> => {
      return this.fetch<SandboxStatusesResponse>(`/api/v1/orgs/${this.org}/sandboxes/status`);
    },
  };

  messages: MessagesApi = {
    getUserMessages: async (): Promise<GetUserMessagesResponse> => {
      return this.fetch<GetUserMessagesResponse>(`/api/v2/orgs/${this.org}/users/self/messages`);
    },
  };
}
