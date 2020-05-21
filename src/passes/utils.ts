/**
 * Tries to get data from the specified source
 * if it is available and the array has elements
 * in it. Otherwise creates an array of empty
 * objects to fallback.
 *
 * @param data
 * @param fallbackAmount
 */

export function getSafeFieldData<T>(data: T[], fallbackAmount: number) {
	const fallbackData = new Array(fallbackAmount).fill({}) as T[];
	return (data?.length && data) ?? fallbackData;
}

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
