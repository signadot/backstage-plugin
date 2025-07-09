import { createComponentExtension } from '@backstage/core-plugin-api';
import { signadotPlugin } from './plugin';

export const OverviewCard = signadotPlugin.provide(
  createComponentExtension({
    name: 'OverviewCard',
    component: {
      lazy: () =>
        import('./components/OverviewCard').then(
          m => m.OverviewCard,
        ),
    },
  }),
);

export const SandboxesCard = signadotPlugin.provide(
  createComponentExtension({
    name: 'SandboxesCard',
    component: {
      lazy: () =>
        import('./components/SandboxesCard').then(m => m.SandboxesCard),
    },
  }),
);
