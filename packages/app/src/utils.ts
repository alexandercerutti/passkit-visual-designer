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
	].join(" ").trim();
}

/**
 * Converts a blob object to arrayBuffer.
 * Includes support to a workaround for Safari and all the
 * other browsers that do not support Blob.prototype.arrayBuffer
 */

export async function getArrayBuffer(blob: Blob) {
	if (Blob.prototype.arrayBuffer instanceof Function) {
		return await blob.arrayBuffer();
	} else {
		return await (new Response(blob)).arrayBuffer();
	}
}
