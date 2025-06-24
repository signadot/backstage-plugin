import { Progress, Table } from "@backstage/core-components";
import { useSandboxes, useSandboxStatuses } from "../../hooks/useSandbox";

export const SandboxList = () => {
	const {
		sandboxesList,
		error: sandboxError,
		loading: sandboxLoading,
	} = useSandboxes();
	const {
		statuses,
		error: statusError,
		loading: statusLoading,
	} = useSandboxStatuses();

	if (sandboxLoading || statusLoading) {
		return <Progress />;
	}

	if (sandboxError) {
		return <div>Error loading sandboxes: {sandboxError}</div>;
	}

	if (statusError) {
		return <div>Error loading statuses: {statusError}</div>;
	}

	if (!sandboxesList) {
		return <div>No sandboxes found</div>;
	}

	return (
		<Table
			columns={[
				{ title: "Name", field: "name" },
				{ title: "Status", field: "status.ready" },
				{ title: "Created At", field: "createdAt" },
				{ title: "Updated At", field: "updatedAt" },
				{ title: "Routing Key", field: "routingKey" },
				// { title: 'Spec', field: 'spec' },
				// { title: 'Status', field: 'status' },
				// { title: 'Test Executions', field: 'testExecutions' },
			]}
			data={sandboxesList}
			title="Sandboxes"
		/>
	);
};
