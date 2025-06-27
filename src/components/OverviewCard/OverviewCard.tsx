import { InfoCard } from "@backstage/core-components";
import { Box, Tab, Tabs } from "@material-ui/core";
import { makeStyles, type Theme } from "@material-ui/core/styles";
import * as React from "react";
import Clusters from "./tabs/Clusters/Clusters";
import { Notifications } from "./tabs/Notifications/Notifications";
import Sandboxes from "./tabs/Sandboxes/Sandboxes";

interface TabPanelProps {
  children?: React.ReactNode;
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(1, 0, 2, 0),
    fontWeight: theme.typography.fontWeightMedium as number,
    fontSize: "1.2rem",
  },
}));

export type OverviewCardProps = {
  title?: string;
  sandboxes?: {
    maxRecentSandboxes?: number;
  };
};

const DEFAULT_PROPS: OverviewCardProps = {
  title: "Signadot Overview",
  sandboxes: {
    maxRecentSandboxes: 5,
  },
};

const OverviewCard = (props: OverviewCardProps) => {
  const { title, sandboxes } = { ...DEFAULT_PROPS, ...props };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <InfoCard
      subheader={
        <Tabs aria-label="overview tabs" onChange={handleChange} value={value}>
          <Tab label="Notifications" />
          <Tab label="Sandboxes" />
          <Tab label="Clusters" />
        </Tabs>
      }
      title={title}
      variant="flex"
    >
      <TabPanel index={0} value={value}>
        <Notifications />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Sandboxes maxRecentSandboxes={sandboxes?.maxRecentSandboxes} />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Clusters />
      </TabPanel>
    </InfoCard>
  );
};

export default OverviewCard;
