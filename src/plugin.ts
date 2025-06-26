import {
  configApiRef,
  createApiFactory,
  createPlugin,
  discoveryApiRef,
  fetchApiRef,
} from "@backstage/core-plugin-api";
import { SandboxClient, sandboxApiRef } from "./api/SandboxApi";
import { rootRouteRef } from "./routes";

export const signadotPlugin = createPlugin({
  id: "signadot",
  apis: [
    createApiFactory({
      api: sandboxApiRef,
      deps: {
        fetchApi: fetchApiRef,
        configApi: configApiRef,
        discoveryApi: discoveryApiRef,
      },
      factory: ({ fetchApi, configApi, discoveryApi }) => {
        const orgName = configApi.getString("signadot.org");
        return new SandboxClient({
          fetchApi,
          configApi,
          discoveryApi,
          orgName,
        });
      },
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

