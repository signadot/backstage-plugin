import {
  createPlugin,
  createRoutableExtension,
  createApiFactory,
  configApiRef,
  fetchApiRef,
  discoveryApiRef,
} from "@backstage/core-plugin-api";

import { rootRouteRef } from "./routes";
import { signadotEnvironmentsApiRef, SandboxClient } from "./api/SandboxApi";

export const signadotEnvironmentsPlugin = createPlugin({
  id: "signadot-environments",
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: signadotEnvironmentsApiRef,
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
});

/**
 * The main page component for the signadot-environments plugin
 */
export const SignadotEnvironmentsPage = signadotEnvironmentsPlugin.provide(
  createRoutableExtension({
    name: "SignadotEnvironmentsPage",
    component: () => import("./components/SandboxList/SandboxList").then((m) => m.SandboxList),
    mountPoint: rootRouteRef,
  }),
);
