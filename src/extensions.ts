import { createComponentExtension, createRoutableExtension } from "@backstage/core-plugin-api";
import { signadotEnvironmentsPlugin } from "./plugin";
import { rootRouteRef } from "./routes";

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
