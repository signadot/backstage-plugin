import { createDevApp } from "@backstage/dev-utils";
import React from "react";
import { SignadotPage, signadotPlugin } from "../src/plugin";

createDevApp()
  .registerPlugin(signadotPlugin)
  .addPage({
    element: <SignadotPage />,
    title: "Root Page",
    path: "/signadot",
  })
  .render();
