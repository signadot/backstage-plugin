import { Link, Progress, Table, type TableColumn } from "@backstage/core-components";
import { makeStyles } from "@material-ui/core/styles";
import { useSandboxes } from "../../hooks/useSandbox";
import type { SandboxV2 } from "../../internal/types/sandboxes";
import { SandboxLabels, SandboxName } from "./columns";

const useStyles = makeStyles((theme) => ({
  emptyContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing(2),
  },
}));

type AllowedColumns = "name" | "createdAt" | "updatedAt" | "routingKey" | "clusterName" | "labels";

export type SandboxCardProps = {
  columns?: Array<AllowedColumns>;

  // If clusterName is provided, only show sandboxes in that cluster
  clusterName?: string;
};

const showColumn = (column: AllowedColumns, filterColumns?: AllowedColumns[]): boolean => {
  if (!filterColumns || filterColumns.length === 0) {
    return true;
  }

  return filterColumns.includes(column);
};

const filterSandboxes = (sandboxes: SandboxV2[], clusterName?: string): SandboxV2[] => {
  if (!clusterName) {
    return sandboxes;
  }

  return sandboxes.filter((sandbox) => sandbox.spec.cluster === clusterName);
};

export const SandboxesCard = ({ columns: filterColumns, clusterName }: SandboxCardProps) => {
  const classes = useStyles();
  const { sandboxesList, error: sandboxError, loading: sandboxLoading } = useSandboxes();

  if (sandboxLoading) {
    return <Progress />;
  }

  if (sandboxError) {
    return <div>Error loading sandboxes: {sandboxError}</div>;
  }

  if (!sandboxesList) {
    return <div>No sandboxes found</div>;
  }

  const columns: TableColumn<SandboxV2>[] = [
    {
      title: "Name",
      field: "name",
      hidden: !showColumn("name", filterColumns),
      render: (rowData) => <SandboxName {...rowData} />,
    },
    { title: "Created At", field: "createdAt", hidden: !showColumn("createdAt", filterColumns) },
    { title: "Updated At", field: "updatedAt", hidden: !showColumn("updatedAt", filterColumns) },
    { title: "Labels", field: "labels", hidden: !showColumn("labels", filterColumns), render: (rowData) => <SandboxLabels {...rowData} /> },
    { title: "Routing Key", field: "routingKey", hidden: !showColumn("routingKey", filterColumns) },
    {
      title: "Cluster Name",
      field: "clusterName",
      hidden: !showColumn("clusterName", filterColumns),
      render: (rowData) => rowData.spec.cluster,
    },
  ];

  return (
    <Table
      columns={columns}
      data={filterSandboxes(sandboxesList, clusterName)}
      emptyContent={
        <div className={classes.emptyContent}>
          No sandboxes found. You can create new sandboxes at{" "}
          <Link externalLinkIcon={true} rel="noopener noreferrer" target="_blank" to="https://app.signadot.com">
            app.signadot.com
          </Link>
        </div>
      }
      isLoading={sandboxLoading}
      title={clusterName ? `Sandboxes in ${clusterName}` : "Sandboxes"}
    />
  );
};
