import { Grid } from "@material-ui/core";
import { SandboxesCard } from "./SandboxesCard";

export const SignadotEnvironmentsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SandboxesCard />
      </Grid>
    </Grid>
  );
};
