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

export function getSafeFieldData(data: FieldProps[], fallbackAmount: number) {
	return (data?.length && data) ?? new Array<FieldProps>(fallbackAmount).fill({} as FieldProps);
}
