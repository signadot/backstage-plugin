import { type ConfigApi, createApiRef } from "@backstage/core-plugin-api";

export interface SignadotEnvironmentsApi {
  getApiBaseUrl(): string;
  getOrganization(): string | undefined;
}

export const signadotApiRef = createApiRef<SignadotEnvironmentsApi>({
  id: "plugin.signadot.service",
});

export class SignadotEnvironmentsApiImpl implements SignadotEnvironmentsApi {
  private apiUrl: string;
  private org: string;

  constructor(config: ConfigApi) {
    const apiUrl = config.getOptionalString("signadot.apiUrl") ?? "https://api.signadot.com";
    const org = config.getString("signadot.org");

    this.apiUrl = apiUrl;
    this.org = org;
  }

  getApiBaseUrl(): string {
    return this.apiUrl;
  }

  getOrganization(): string {
    return this.org;
  }
}
