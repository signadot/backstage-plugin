import { configApiRef, createApiFactory, createComponentExtension, createPlugin, createRoutableExtension, discoveryApiRef, fetchApiRef } from "@backstage/core-plugin-api";

import { SandboxClient, signadotEnvironmentsApiRef } from "./api/SandboxApi";

import { rootRouteRef } from "./routes";

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


export const SignadotEnvironmentsPage = signadotEnvironmentsPlugin.provide(
  createRoutableExtension({
    name: "SignadotEnvironmentsPage",
    component: () => import("./components/SignadotEnvironmentsPage").then((m) => m.SignadotEnvironmentsPage),
    mountPoint: rootRouteRef,
  }),
);

export const SandboxesCard = signadotEnvironmentsPlugin.provide(
  createComponentExtension({
    name: "SandboxesCard",
    component: {
      lazy: () => import("./components/SandboxesCard/SandboxesCard").then((m) => m.SandboxesCard),
    },
  }),
);
