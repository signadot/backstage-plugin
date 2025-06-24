import { ClusterDefault } from "./cluster";
import { ForkOf, HostEndpoint, SandboxFork } from "./sandboxLegacy";
import { TestExecutionPhase } from "./testexecutions";

export interface EndpointV2 {
	routType: string;
	name: string;
	protocol: string;
	host?: string;
	port?: number;
	url: string;
	baselineUrl?: string;
	target: string;
}

export interface ResourceInfo {
	name: string;
	plugin: string;
	params?: Record<string, string>;
}

export interface TTLV2 {
	duration: string;
	offsetFrom: string;
}

type From = ForkOf;

export interface PortMapping {
	port: string;
	toLocal: string;
}

export interface LocalWorkload {
	name: string;
	from: From;
	mappings?: PortMapping[];
}

export interface LocalWorkloadStatus {
	name: string;
	tunnel: {
		health: {
			connected: boolean;
			lastCheckTime?: string;
			lastConnectedTime?: string;
		};
		info?: {
			labels?: Map<string, string>;
		};
	};
}

export interface LocalWorkloadWithStatus {
	localWorkload: LocalWorkload;
	status?: LocalWorkloadStatus;
}

export interface SandboxSpecV2 {
	description: string;
	resources?: ResourceInfo[];
	cluster: string;
	forks?: SandboxFork[];
	local?: LocalWorkload[];
	endpoints?: HostEndpoint[];
	labels?: Record<string, string>;
	ttl?: TTLV2;
}

export type SandboxTestExecutions = {
	phaseCounts?: {
		phase: TestExecutionPhase;
		count: number;
	}[];
	checks?: {
		passed?: number;
		failed?: number;
	};
	trafficDiffs?: {
		red?: number;
		yellow?: number;
		green?: number;
	};
};

export interface SandboxStatusV2 {
	ready: boolean;
	reason: string;
	message: string;
	progressing: boolean;
	matchingRouteGroups?: {
		name: string;
	}[];
	local?: LocalWorkloadStatus[];
	scheduledDeleteTime: string;
	testExecutions?: SandboxTestExecutions;
}

export interface SandboxV2 {
	name: string;
	createdAt: string;
	updatedAt?: string;
	routingKey: string;
	endpoints?: EndpointV2[];
	spec: SandboxSpecV2;
	status?: SandboxStatusV2;
	defaults: {
		cluster: ClusterDefault[];
	};
}

export type SandboxInputSpec = Omit<SandboxV2, "createdAt" | "routingKey">;
