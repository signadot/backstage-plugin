import { Link } from "@backstage/core-components";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import type { SandboxV2 } from "../../internal/types/sandboxes";
import { getDashboardUrl } from "../../utils/getDashboardUrl";

const useStyles = makeStyles((theme) => ({
  sandboxName: {
    display: "flex",
    alignItems: "center",
  },
  statusBadge: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    marginRight: theme.spacing(1),
  },
  statusReady: {
    backgroundColor: theme.palette.success.main,
  },
  statusNotReady: {
    backgroundColor: theme.palette.error.main,
  },
  sandboxLabels: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
}));

export const SandboxName = ({ name, status }: SandboxV2) => {
  const classes = useStyles();

  return (
    <div className={classes.sandboxName}>
      <div
        className={classNames(classes.statusBadge, {
          [classes.statusReady]: status?.ready,
          [classes.statusNotReady]: !status?.ready,
        })}
      />
      <Link rel="noopener noreferrer" target="_blank" to={getDashboardUrl(`/sandbox/name/${name}`)}>
        {name}
      </Link>
    </div>
  );
};

const isSignadotLabel = (label: [string, string]) => {
  return label[0].startsWith("signadot");
};

export const SandboxLabels = ({ spec }: SandboxV2) => {
  const classes = useStyles();

  let labels: Array<[string, string]> = [];
  if (spec?.labels) {
    labels = Object.entries(spec.labels);
  }

  return (
    <div className={classes.sandboxLabels}>
      {labels.map((label) => (
        <Chip
          color={isSignadotLabel(label) ? "primary" : "secondary"}
          key={label[0]}
          label={`${label[0]}: ${label[1]}`}
        />
      ))}
    </div>
  );
};
