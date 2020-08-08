/**
 * Tries to get data from the specified source
 * if it is available and the array has elements
 * in it. Otherwise creates an array of empty
 * objects to fallback.
 *
 * @param data
 * @param fallbackAmount
 */

import { PassFieldKeys } from "../../../constants";

export function getSafeFieldData(data: PassFieldKeys[] = [], amount: number = 1) {
	return (data.length && data.slice(0, amount)) || new Array<PassFieldKeys>(amount).fill({} as PassFieldKeys);
}
