import { InfoCard } from "@backstage/core-components";
import { Box, Tab, Tabs } from "@material-ui/core";
import { type ChangeEvent, type ReactNode, useState } from "react";
import Clusters from "./tabs/Clusters/Clusters";
import { Notifications } from "./tabs/Notifications/Notifications";
import Sandboxes from "./tabs/Sandboxes/Sandboxes";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export type OverviewCardProps = {
  title?: string;
  sandboxes?: {
    maxRecentSandboxes?: number;
  };
  tabs?: Array<"notifications" | "sandboxes" | "clusters">;
};

const DEFAULT_PROPS: OverviewCardProps = {
  title: "Signadot Overview",
  sandboxes: {
    maxRecentSandboxes: 5,
  },
  tabs: ["notifications", "sandboxes", "clusters"],
};

export const OverviewCard = (props: OverviewCardProps) => {
  const { title, sandboxes, tabs } = { ...DEFAULT_PROPS, ...props };

  const [value, setValue] = useState(0);

  const handleChange = (_event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const tabComponents = {
    notifications: {
      label: "Notifications",
      component: <Notifications />,
    },
    sandboxes: {
      label: "Sandboxes",
      component: <Sandboxes maxRecentSandboxes={sandboxes?.maxRecentSandboxes} />,
    },
    clusters: { label: "Clusters", component: <Clusters /> },
  } as const;

  return (
    <InfoCard
      subheader={
        <Tabs aria-label="overview tabs" onChange={handleChange} value={value}>
          {tabs?.map((tab) => (
            <Tab key={tab} label={tabComponents[tab].label} />
          ))}
        </Tabs>
      }
      title={title}
      variant="flex"
    >
      {tabs?.map((tab, index) => (
        <TabPanel index={index} key={tab} value={value}>
          {tabComponents[tab].component}
        </TabPanel>
      ))}
    </InfoCard>
  );
};

