/**
 * Creates a list of classNames only if they are
 * truthy if converted to boolean, along with some
 * default ones.
 *
 * @param staticClassNames
 * @param candidates
 */

type CandidateClassNameList = {
	[key: string]: any;
}

export function createClassName(staticClassNames: string[], candidates: CandidateClassNameList = {}) {
	const keys = Object.keys(candidates);
	return [
		...staticClassNames,
		...keys.filter(key => Boolean(candidates[key]))
	].join(" ");
}
