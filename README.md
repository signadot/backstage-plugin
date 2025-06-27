# signadot

Welcome to the signadot plugin!

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
      changeOrigin: true
      allowedHeaders:
        - 'signadot-api-key'
```

### Usage

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
![All Sandboxes](docs/img/sandboxes-card.png)

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
![Dev Cluster Sandboxes](docs/img/sandboxes-card-dev.png)

#### Custom Columns
```tsx
import { SandboxesCard } from '@signadot/backstage-plugin';

export const HomePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <SandboxesCard columns={["name", "routingKey"]} />
    </Grid>
  </Grid>
);
```
![Filtered Cluster Sandboxes](docs/img/sandboxes-card-filter-columns.png)

### Optional: Standalone Page

If you want a dedicated page for Signadot environments, you can add the following route to your `App.tsx`:

```tsx
import { SignadotEnvironmentsPage } from '@signadot/backstage-plugin';

// In your FlatRoutes:
<Route path="/signadot-environments" element={<SignadotEnvironmentsPage />} />
```
## Local Development

You can serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.
