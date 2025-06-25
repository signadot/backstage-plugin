import { Link } from "@backstage/core-components";
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
}));

export const SandboxName = ({ name, status }: SandboxV2) => {
  const redirectUrl = getDashboardUrl(`/sandboxes/name/${name}`);
  const classes = useStyles();

  return (
    <div className={classes.sandboxName}>
      <div
        className={classNames(classes.statusBadge, {
          [classes.statusReady]: status?.ready,
          [classes.statusNotReady]: !status?.ready,
        })}
      ></div>
      <Link to={redirectUrl}>{name}</Link>
    </div>
  );
};
