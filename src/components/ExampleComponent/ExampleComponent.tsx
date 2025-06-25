import { Content, ContentHeader, Header, HeaderLabel, InfoCard, Page, SupportButton } from "@backstage/core-components";
import { useApi } from "@backstage/core-plugin-api";
import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { signadotApiRef } from "../../api";
import { ExampleFetchComponent } from "../ExampleFetchComponent";

export const ExampleComponent = () => {
  const api = useApi(signadotApiRef);
  const apiBaseUrl = api.getApiBaseUrl();
  const organization = api.getOrganization();

  return (
    <Page themeId="tool">
      <Header subtitle="Optional subtitle" title="Welcome to signadot-environments!">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Plugin title">
          <SupportButton>A description of your plugin goes here.</SupportButton>
        </ContentHeader>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            {/* <SandboxList /> */}
            <InfoCard title="Signadot Configuration">
              <Typography variant="body1">
                <strong>API URL:</strong> {apiBaseUrl}
              </Typography>
              <Typography variant="body1">
                <strong>Organization:</strong> {organization || "Not configured"}
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <ExampleFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
