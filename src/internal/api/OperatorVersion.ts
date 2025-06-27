export type OperatorVersion = {
  major: number;
  minor: number;
  bugfix: number;
};

export const parseOperatorVersion = (operatorVersion: string): OperatorVersion => {
  // eslint-disable-next-line prefer-const
  let [major, minor, bugfix] = operatorVersion.split(".", 3);
  const hashStart = bugfix.indexOf("-");
  // We have no way to determine if any given hash is for an earlier or later operator.
  // So we ignore it and only consider the major, minor, and bugfix numbers.
  if (hashStart > -1) {
    bugfix = bugfix.substring(0, hashStart);
  }
  return {
    major: parseInt(major, 10),
    minor: parseInt(minor, 10),
    bugfix: parseInt(bugfix, 10),
  };
};

export const isObservedVersionLatest = (
  observed: OperatorVersion,
  latest: OperatorVersion
): boolean => {
  if (observed.major < latest.major) {
    return false;
  }
  if (observed.minor < latest.minor) {
    return false;
  }
  return observed.bugfix >= latest.bugfix;
}; 