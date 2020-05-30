/**
 * Tries to get data from the specified source
 * if it is available and the array has elements
 * in it. Otherwise creates an array of empty
 * objects to fallback.
 *
 * @param data
 * @param fallbackAmount
 */

import { FieldProps } from ".";

export function getSafeFieldData(data: FieldProps[], amount: number) {
	return (data?.length && data.slice(0, amount)) ?? new Array<FieldProps>(amount).fill({} as FieldProps);
}
