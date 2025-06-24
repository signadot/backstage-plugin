import { createDevApp } from "@backstage/dev-utils";
import {
	signadotEnvironmentsPlugin,
	SignadotEnvironmentsPage,
} from "../src/plugin";

createDevApp()
	.registerPlugin(signadotEnvironmentsPlugin)
	.addPage({
		element: <SignadotEnvironmentsPage />,
		title: "Root Page",
		path: "/signadot-environments",
	})
	.render();
