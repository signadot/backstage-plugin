import {
  configApiRef,
  createApiFactory,
  createPlugin,
  discoveryApiRef,
  fetchApiRef,
} from "@backstage/core-plugin-api";
import { SignadotEnvironmentsApiImpl, signadotApiRef } from "./api";
import { rootRouteRef } from "./routes";

export const signadotPlugin = createPlugin({
  id: "signadot",
  apis: [
    createApiFactory({
      api: signadotApiRef,
      deps: {
        fetchApi: fetchApiRef,
        configApi: configApiRef,
        discoveryApi: discoveryApiRef,
      },
      factory: ({ fetchApi, configApi, discoveryApi }) => {
        return new SignadotEnvironmentsApiImpl({
          fetchApi,
          configApi,
          discoveryApi,
        });
      },
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

