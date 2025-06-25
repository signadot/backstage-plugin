import { type ConfigApi, createApiRef, type DiscoveryApi, type FetchApi } from "@backstage/core-plugin-api";
import type { SandboxV2 } from "../internal/types/sandboxes";
import type { SandboxStatus } from "../internal/types/sandboxLegacy";

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

export const sandboxApiRef = createApiRef<SandboxApi>({
  id: "plugin.signadot.sandbox",
});

export class SandboxClient implements SandboxApi {
  private readonly fetchApi: FetchApi;
  private readonly discoveryApi: DiscoveryApi;
  private readonly orgName: string;
  private readonly headers: HeadersInit;

  constructor(options: {
    fetchApi: FetchApi;
    configApi: ConfigApi;
    discoveryApi: DiscoveryApi;
    orgName: string;
  }) {
    this.fetchApi = options.fetchApi;
    this.discoveryApi = options.discoveryApi;
    this.orgName = options.orgName;

    const apiKey = options.configApi.getString("signadot.apiKey");

    this.headers = {
      "signadot-api-key": apiKey,
      "Content-Type": "application/json",
    };
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

  async getSandboxes(): Promise<SandboxesResponse> {
    const data = await this.fetch<SandboxV2[]>(`/api/v2/orgs/${this.orgName}/sandboxes`);

    return {
      sandboxesList: data ?? [],
    };
  }

  async getSandboxStatuses(): Promise<SandboxStatusesResponse> {
    return this.fetch<SandboxStatusesResponse>(`/api/v1/orgs/${this.orgName}/sandboxes/status`);
  }
}
