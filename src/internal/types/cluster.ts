export type Cluster = {
	id: string;
	name: string;
	operatorVersion?: string;
	operator?: {
		version?: string;
	};
	createdAt?: string;
	isPlayground?: boolean;
	clusterConfig?: {
		routing?: {
			customHeaders?: string[];
		};
	};
};

export type ClusterStatus = {
	id: string;
	status: {
		healthy: boolean;
		reason: string;
		message: string;
	};
};

export type ClusterDefault = {
	resourceKind: string;
	class: string;
	value: {
		duration: string;
		offsetFrom: string;
	};
};

export type ClusterDefaults = {
	cluster: string;
	defaults: ClusterDefault[];
};

export type ClusterEndpoint = {
	name: string;
	namespace: string;
	port: number;
};
