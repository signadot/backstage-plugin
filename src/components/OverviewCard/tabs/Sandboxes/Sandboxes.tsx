import { Link, LinkButton } from "@backstage/core-components";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useSandboxes } from "../../../../hooks/useSandbox";
import type { SandboxV2 } from "../../../../internal/types/sandboxes";
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
  footer: {
    marginTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(2),
  },
  recentList: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  recentItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  sandboxName: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  timeAgo: {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
  },
}));

const Sandboxes = () => {
  const classes = useStyles();
  const sandboxesStatus = useGetStatus();
  const { sandboxesList, loading } = useSandboxes();

  const recentSandboxes = React.useMemo(() => {
    if (!sandboxesList) return [];
    return [...sandboxesList]
      .sort((a: SandboxV2, b: SandboxV2) => {
        if (!a.updatedAt || !b.updatedAt) return 0;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      })
      .slice(0, 5);
  }, [sandboxesList]);

  const handleReadyClick = () => {
    window.open(getDashboardUrl("/sandboxes", "q=status%3Aready"), "_blank");
  };

  const handleNotReadyClick = () => {
    window.open(getDashboardUrl("/sandboxes", "q=status%3Anot%2520ready"), "_blank");
  };

  const renderStatus = () => {
    if (sandboxesStatus.isLoading || sandboxesStatus.isError) {
      return (
        <>
          <BaseWidget.Status message="0 ready" onClick={handleReadyClick} type="success" />
          <BaseWidget.Status message="0 not ready" onClick={handleNotReadyClick} type="error" />
        </>
      );
    }
    return (
      <>
        <BaseWidget.Status
          message={`${(sandboxesStatus as { totalSandboxes: number }).totalSandboxes} ready`}
          onClick={handleReadyClick}
          type="success"
        />
        <BaseWidget.Status
          message={`${(sandboxesStatus as { notReady: number }).notReady} not ready`}
          onClick={handleNotReadyClick}
          type="error"
        />
      </>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5">Sandboxes</Typography>
        <LinkButton endIcon={<AddIcon />} to={getDashboardUrl("/sandboxes/create")} variant="outlined">
          Create Sandbox
        </LinkButton>
      </div>
      <div className={classes.content}>{renderStatus()}</div>
      <div className={classes.footer}>
        <Typography variant="h6">Recent Sandboxes</Typography>
        {loading ? (
          <Typography variant="body2">Loading...</Typography>
        ) : recentSandboxes.length > 0 ? (
          <div className={classes.recentList}>
            {recentSandboxes.map((sandbox) => (
              <div className={classes.recentItem} key={sandbox.name}>
                <Link className={classes.sandboxName} to={getDashboardUrl(`/sandboxes/name/${sandbox.name}`)}>
                  {sandbox.name}
                </Link>
                <span className={classes.timeAgo}>
                  {sandbox.updatedAt && formatDistanceToNow(new Date(sandbox.updatedAt), { addSuffix: true })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Typography variant="body2">No sandboxes found</Typography>
        )}
      </div>
    </div>
  );
};

export default Sandboxes;
