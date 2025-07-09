import semver from "semver";

export const isObservedVersionLatest = (
  observed: string | null,
  latest: string
): boolean => {
  if (!observed) {
    return false;
  }

  const coarsedObserved = semver.clean(observed);
  const coarsedLatest = semver.clean(latest);

  if (!coarsedObserved || !coarsedLatest) {
    return false;
  }

  return semver.gte(coarsedObserved.toString(), coarsedLatest.toString());
};
