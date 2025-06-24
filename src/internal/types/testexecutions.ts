export enum TestExecutionStatusPhases {
	Pending = "pending",
	InProgress = "in_progress",
	Failed = "failed",
	Succeeded = "succeeded",
	Canceled = "canceled",
}

export type TestExecutionPhase =
	| TestExecutionStatusPhases.Pending
	| TestExecutionStatusPhases.InProgress
	| TestExecutionStatusPhases.Failed
	| TestExecutionStatusPhases.Succeeded
	| TestExecutionStatusPhases.Canceled;
