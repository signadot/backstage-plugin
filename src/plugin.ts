import {
  createPlugin,
} from "@backstage/core-plugin-api";
import { rootRouteRef } from "./routes";

export const signadotPlugin = createPlugin({
  id: "signadot",
  routes: {
    root: rootRouteRef,
  },
});

