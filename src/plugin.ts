import {
  configApiRef,
  createApiFactory,
  createPlugin,
  discoveryApiRef,
} from "@backstage/core-plugin-api";
import { SignadotEnvironmentsApiImpl, signadotApiRef } from "./api";
import { rootRouteRef } from "./routes";

export const signadotPlugin = createPlugin({
  id: "signadot",
  apis: [
    createApiFactory({
      api: signadotApiRef,
      deps: {
        configApi: configApiRef,
        discoveryApi: discoveryApiRef,
      },
      factory: ({ configApi, discoveryApi }) => {
        return new SignadotEnvironmentsApiImpl({
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

