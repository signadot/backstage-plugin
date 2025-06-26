import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Warning from "@material-ui/icons/Warning";
import React from "react";

export type StatusProps = {
  type: "error" | "warning" | "success";
  message: string;
  onClick: () => void;
};

const iconMap = {
  error: ErrorOutline,
  warning: Warning,
  success: CheckCircleOutline,
} as const;

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    padding: theme.spacing(1.5, 2),
    justifyContent: "flex-start",
    gap: theme.spacing(1.25),
    borderRadius: theme.shape.borderRadius,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.875rem",
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
  },
  error: {
    color: theme.palette.error.main,
    backgroundColor: "none",
    borderColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.contrastText,
    },
  },
  warning: {
    color: theme.palette.warning.main,
    backgroundColor: "none",
    borderColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.warning.contrastText,
    },
  },
  success: {
    color: theme.palette.success.main,
    backgroundColor: "none",
    borderColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.contrastText,
    },
  },
}));

const Status = ({ type, message, onClick }: StatusProps) => {
  const classes = useStyles();
  const StatusIcon = iconMap[type];

  return (
    <Button
      className={`${classes.button} ${classes[type]}`}
      onClick={onClick}
      startIcon={<StatusIcon />}
      variant="outlined"
    >
      {message}
    </Button>
  );
};

export default Status;
