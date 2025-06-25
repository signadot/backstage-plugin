import { createComponentExtension } from '@backstage/core-plugin-api';
import { signadotPlugin } from './plugin';

export const SignadotEnvironmentsPage = signadotPlugin.provide(
  createComponentExtension({
    name: 'SignadotEnvironmentsPage',
    component: {
      lazy: () =>
        import('./components/SignadotEnvironmentsPage').then(
          m => m.SignadotEnvironmentsPage,
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
