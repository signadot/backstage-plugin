import type { WorkloadKind } from "./workload";

export type ForkOf = {
  kind: WorkloadKind;
  namespace: string;
  name: string;
};

type ForkEndpoint = {
  name: string;
  port: number;
  protocol: string;
};

export type HostEndpoint = {
  name: string;
  host: string;
  port: number;
  protocol: string;
};

type Image = {
  image: string;
  container?: string;
};

type ForkCustomizationEnv = {
  operation: string;
  container: string;
  name: string;
  value?: string;
};

type ForkCustomization = {
  images: Image[];
  env?: ForkCustomizationEnv[];
};

export type SandboxFork = {
  forkOf: ForkOf;
  customizations: ForkCustomization;
  endpoints?: ForkEndpoint[];
};

export type SandboxStatus = {
  id: string;
  publicId: string;
  healthy?: boolean;
  ready: boolean;
  reason: string;
  message: string;
  progressing: boolean;
  lastUpdated: string;
  error?: {
    code: string;
    detail: string;
  };
};

export type SandboxBranch = {
  pullRequest: number;
  headCommit: string;
  vcsType: string;
  vcsRepo: string;
  vcsName: string;
};

export type Sandbox = {
  id: string;
  name: string;
  namespace: string;
  description: string;
  clusterName: string;
  previewURL: string;
  defaultService: string;
  defaultServicePort: string;
  createdAt: string;
  updatedAt: string;
  managedBy: string;
  branches?: SandboxBranch[];
  labels?: Record<string, string>;
};

export type PreviewEndpoint = {
  id: string;
  name: string;
  cluster: string;
  clusterID: string;
  routeType: string;
  protocol: string;
  port: number;
  host: string;
  forkOf: ForkOf;
  previewURL: string;
};

export type CreateSandboxResponse = {
  sandboxID: string;
  previewEndpoints: PreviewEndpoint[];
};
