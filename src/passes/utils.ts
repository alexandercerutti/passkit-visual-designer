/**
 * Appends some classNames only if they are
 * truthy if converted to boolean
 *
 * @param defaultCN
 * @param classNames
 */

export function concatClassNames(defaultCN: string, ...classNames: string[]) {
	const finalClassNames = [...classNames.filter(Boolean), defaultCN];
	return finalClassNames.join(" ");
}
