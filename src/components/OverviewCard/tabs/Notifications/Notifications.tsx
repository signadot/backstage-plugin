/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line @typescript-eslint/no-unused-vars1

import { Box, CircularProgress, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useUserMessages } from "../../../../hooks/useUserMessages";
import type { Message, MessageSeverity } from "../../../../internal/types/messages";

const useStyles = makeStyles((theme) => ({
  warning: {
    color: theme.palette.warning.main,
  },
  critical: {
    color: theme.palette.error.main,
  },
  info: {
    color: theme.palette.info.main,
  },
}));

const getSeverityColor = (severity: MessageSeverity) => {
  switch (severity) {
    case "warning":
      return "warning";
    case "critical":
      return "critical";
    case "info":
      return "info";
    default:
      return "info";
  }
};

export const Notifications = () => {
  const classes = useStyles();
  const { messages, error } = useUserMessages();

  if (error) {
    return (
      <Box>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!messages) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (messages.length === 0) {
    return (
      <Box>
        <Typography variant="h5">Notifications</Typography>
        <Typography variant="body1">No notifications</Typography>
      </Box>
    );
  }

  return (
    <>
    <Typography variant="h5">Notifications</Typography>

    <List>
      {messages.map((message: Message) => {
        const severityColorClass = classes[getSeverityColor(message.severity)];
        return (
          <ListItem
            ContainerProps={{ style: { padding: 0 } }}
            divider
            key={`${message.kind}-${message.title}-${message.description}`}
            style={{ padding: 0 }}
          >
            <ListItemText
              primary={
                <Typography className={severityColorClass} variant="subtitle1">
                  {message.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography color="textSecondary" component="span" variant="body2">
                    {message.description}
                  </Typography>
                  {message.actionLink && (
                    <Typography
                      color="primary"
                      component="a"
                      display="block"
                      href={message.actionLink}
                      variant="caption"
                    >
                      View Details
                    </Typography>
                  )}
                  <Typography className={severityColorClass} component="span" display="block" variant="caption">
                    Severity: {message.severity}
                  </Typography>
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
    </>
  );
};
