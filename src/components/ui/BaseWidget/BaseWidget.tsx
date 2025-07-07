import { InfoCard, Progress } from "@backstage/core-components";
import type { IconComponent } from "@backstage/core-plugin-api";
import { makeStyles } from "@material-ui/core/styles";
import type { JSX, ReactNode } from "react";
import Status from "./Status";

type BaseWidgetProps = {
  title: string;
  icon?: IconComponent;
  isLoading?: boolean;
  children?: ReactNode;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    transition: theme.transitions.create(["transform", "box-shadow"], {
      duration: theme.transitions.duration.shorter,
    }),
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[4],
    },
  },
  loadingContainer: {
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface BaseWidgetComponent {
  (props: BaseWidgetProps): JSX.Element;
  Status: typeof Status;
}

const BaseWidget: BaseWidgetComponent = ({ title, icon: Icon, children, isLoading }: BaseWidgetProps) => {
  const classes = useStyles();

  return (
    <InfoCard className={classes.root} icon={Icon ? <Icon /> : undefined} title={title} variant="flex">
      {isLoading ? (
        <div className={classes.loadingContainer}>
          <Progress />
        </div>
      ) : (
        children
      )}
    </InfoCard>
  );
};

BaseWidget.Status = Status;

export default BaseWidget;
