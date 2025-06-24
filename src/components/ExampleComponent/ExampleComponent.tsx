import { Typography, Grid } from "@material-ui/core";
import {
	InfoCard,
	Header,
	Page,
	Content,
	ContentHeader,
	HeaderLabel,
	SupportButton,
} from "@backstage/core-components";
import { useApi } from "@backstage/core-plugin-api";
import { signadotEnvironmentsApiRef } from "../../api";
import { ExampleFetchComponent } from "../ExampleFetchComponent";

export const ExampleComponent = () => {
	const signadotApi = useApi(signadotEnvironmentsApiRef);
	const apiBaseUrl = signadotApi.getApiBaseUrl();
	const organization = signadotApi.getOrganization();

	return (
		<Page themeId="tool">
			<Header
				title="Welcome to signadot-environments!"
				subtitle="Optional subtitle"
			>
				<HeaderLabel label="Owner" value="Team X" />
				<HeaderLabel label="Lifecycle" value="Alpha" />
			</Header>
			<Content>
				<ContentHeader title="Plugin title">
					<SupportButton>A description of your plugin goes here.</SupportButton>
				</ContentHeader>
				<Grid container spacing={3} direction="column">
					<Grid item>
						{/* <SandboxList /> */}
						<InfoCard title="Signadot Configuration">
							<Typography variant="body1">
								<strong>API URL:</strong> {apiBaseUrl}
							</Typography>
							<Typography variant="body1">
								<strong>Organization:</strong>{" "}
								{organization || "Not configured"}
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
