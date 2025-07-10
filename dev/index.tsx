import { createDevApp } from "@backstage/dev-utils";
import { OverviewCard } from "../src/components/OverviewCard";
import { signadotPlugin } from "../src/plugin";

createDevApp()
  .registerPlugin(signadotPlugin)
  .addPage({
    element: <OverviewCard />,
    title: "Root Page",
    path: "/signadot",
  })
  .render();
