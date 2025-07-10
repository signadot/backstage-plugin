import { Box, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getDashboardUrl } from "../../../../utils/getDashboardUrl";
import BaseWidget from "../../../ui/BaseWidget/BaseWidget";
import useGetStatus from "./useGetStatus";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: theme.typography.fontWeightMedium as number,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    gap: theme.spacing(2),
  },
}));

const Clusters = () => {
  const classes = useStyles();
  const clustersStatus = useGetStatus();

  const handleConnectedClick = () => {
    window.open(getDashboardUrl("/settings/clusters", "q=status:connected"), "_blank");
  };

  const handleNotConnectedClick = () => {
    window.open(getDashboardUrl("/settings/clusters", "q=status:not%20connected"), "_blank");
  };

  const handlePendingUpgradeClick = () => {
    window.open(getDashboardUrl("/settings/clusters", "q=operator-version%3Aupgrade-available"), "_blank");
  };

  const renderStatus = () => {
    if (clustersStatus.isLoading || clustersStatus.isError) {
      return (
        <>
          <BaseWidget.Status message="0 connected" onClick={handleConnectedClick} type="success" />
          <BaseWidget.Status message="0 not connected" onClick={handleNotConnectedClick} type="error" />
          <BaseWidget.Status message="0 pending upgrade" onClick={handlePendingUpgradeClick} type="warning" />
        </>
      );
    }
    return (
      <>
        <BaseWidget.Status
          message={`${(clustersStatus as { totalClusters: number }).totalClusters} connected`}
          onClick={handleConnectedClick}
          type="success"
        />
        <BaseWidget.Status
          message={`${(clustersStatus as { unhealthy: number }).unhealthy} not connected`}
          onClick={handleNotConnectedClick}
          type="error"
        />
        <BaseWidget.Status
          message={`${(clustersStatus as { pendingUpgrade: number }).pendingUpgrade} pending upgrade`}
          onClick={handlePendingUpgradeClick}
          type="warning"
        />
      </>
    );
  };

  if (clustersStatus.isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5">Clusters</Typography>
      </div>
      <div className={classes.content}>{renderStatus()}</div>
    </div>
  );
};

export default Clusters;
