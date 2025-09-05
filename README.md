# Signadot Backstage Plugin

## What is Signadot?

[Signadot](https://www.signadot.com/docs/overview) is a Kubernetes-native platform that accelerates microservices development by providing high-fidelity, ephemeral environments for development, testing, and validation. It enables teams to catch issues early by testing changes against real dependencies and data, directly in Kubernetes.

## Why Use the Signadot Plugin for Backstage?

The Signadot Backstage plugin seamlessly integrates ephemeral test environments into your developer portal, directly addressing Backstage's core mission of improving developer experience and accelerating feedback loops. By bringing sandbox management into your existing Backstage workflows, developers can:

- **View and manage ephemeral sandboxes** without leaving their familiar Backstage interface
- **Monitor sandbox status and health** across different clusters
- **Access notifications and alerts** related to their sandbox environments
- **Reduce context switching** by centralizing environment management alongside other developer tools

This integration transforms your Backstage portal into a comprehensive development hub where teams can not only discover services and APIs, but also monitor and manage their ephemeral test environments—all within a single, unified interface.

*Note: While Signadot supports advanced capabilities like Smart Tests (contract testing) and Jobs, the current Backstage plugin focuses on sandbox management and monitoring. Support for these additional features is planned for future releases.*

## Synergies with Kubernetes Backstage Plugin

The Signadot plugin works exceptionally well alongside the [Kubernetes Backstage plugin](https://backstage.io/docs/features/kubernetes/), creating a powerful combination for Kubernetes-native development:

- **Unified Kubernetes View**: While the Kubernetes plugin shows your production workloads and resources, the Signadot plugin displays ephemeral sandboxes and test environments, giving you complete visibility into your entire Kubernetes ecosystem
- **Seamless Environment Management**: Developers can view production services in the Kubernetes plugin and monitor their corresponding sandbox environments using the Signadot plugin
- **Resource Efficiency**: Both plugins promote efficient resource usage—the Kubernetes plugin for production optimization, and Signadot for shared, lightweight test environments
- **Consistent Developer Experience**: Both plugins follow Backstage's design patterns, providing a cohesive experience for managing both production and ephemeral Kubernetes resources

This combination enables teams to have complete visibility and control over their entire Kubernetes landscape, from production workloads to ephemeral test environments, all within the familiar Backstage interface.

## Installation

```bash
yarn add --cwd packages/app @signadot-dev/backstage-plugin
```

## Getting started

### Configuration

Add the following to your `app-config.yaml`:

```yaml
signadot:
  org: 'your-organization-name'
  apiKey: 'your-api-key'
```

And also add the following proxy in `app-config.yaml`:
```yaml
proxy:
  endpoints:
    '/signadot':
      target: https://api.signadot.com
      credentials: require
      changeOrigin: true
      headers:
        Signadot-Api-Key: ${SIGNADOT_API_KEY}
      allowedHeaders:
        - 'signadot-api-key'
```

## Components

### SandboxesCard

The recommended way to use this plugin is to add the `SandboxesCard` component to your existing pages. Here are some examples of how you can use it in your homepage:

#### Default View (All Sandboxes)
```tsx
import { SandboxesCard } from '@signadot/backstage-plugin';

export const HomePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <SandboxesCard />
    </Grid>
  </Grid>
);
```
![All Sandboxes](https://github.com/signadot/backstage-plugin/blob/main/docs/img/sandboxes-card.png)

#### Filtered by Cluster
```tsx
import { SandboxesCard } from '@signadot/backstage-plugin';

export const HomePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <SandboxesCard clusterName="dev" />
    </Grid>
  </Grid>
);
```
![Dev Cluster Sandboxes](https://github.com/signadot/backstage-plugin/blob/main/docs/img/sandboxes-card-dev.png)

#### Custom Columns
```tsx
import { SandboxesCard } from '@signadot/backstage-plugin';

export const HomePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <SandboxesCard columns={["name", "clusterName"]} />
    </Grid>
  </Grid>
);
```
![Filtered Cluster Sandboxes](https://github.com/signadot/backstage-plugin/blob/main/docs/img/sandboxes-card-filter-columns.png)

### OverviewCard

The overview component is inteded to show summaries, overviews and more information related to your usage and so on.

##### Default view
```tsx
import { OverviewCard } from '@signadot/backstage-plugin';

export const HomePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <OverviewCard />
    </Grid>
  </Grid>
);
```
![Dev Cluster Sandboxes](https://github.com/signadot/backstage-plugin/blob/main/docs/img/overview-all-tabs.png)

##### Clusters Tab Only
```tsx
import { OverviewCard } from '@signadot/backstage-plugin';

export const HomePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <OverviewCard defaultTab="clusters" />
    </Grid>
  </Grid>
);
```
![Clusters Tab](https://github.com/signadot/backstage-plugin/blob/main/docs/img/overview-clusters-tab.png)

##### Selected Tabs
```tsx
import { OverviewCard } from '@signadot/backstage-plugin';

export const HomePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <OverviewCard tabs={["sandboxes", "clusters"]} />
    </Grid>
  </Grid>
);
```
![Two Tabs](https://github.com/signadot/backstage-plugin/blob/main/docs/img/overview-two-tabs.png)

## Component Props

### SandboxesCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `Array<"name" \| "createdAt" \| "updatedAt" \| "routingKey" \| "clusterName" \| "labels">` | `undefined` | Customize which columns to display |
| `clusterName` | `string` | `undefined` | Filter sandboxes by cluster name |

### OverviewCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Signadot Overview"` | Custom title for the card |
| `sandboxes` | `{ maxRecentSandboxes?: number }` | `{ maxRecentSandboxes: 5 }` | Configuration for the sandboxes tab |
| `tabs` | `Array<"notifications" \| "sandboxes" \| "clusters">` | `["notifications", "sandboxes", "clusters"]` | Specify which tabs to show |

## Local Development

You can serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.
