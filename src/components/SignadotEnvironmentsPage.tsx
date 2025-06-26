import { Grid } from "@material-ui/core";
import OverviewCard from "./OverviewCard";
import { SandboxesCard } from "./SandboxesCard";
import Sandboxes from "./ui/Sandboxes/Sandboxes";

export const SignadotEnvironmentsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* <SandboxesCard /> */}
        <OverviewCard />
      </Grid>
    </Grid>
  );
};
