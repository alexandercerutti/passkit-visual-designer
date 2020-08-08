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

export function getFilteredFieldData(data: PassFieldKeys[] = [], minAmount: number = 0, maxAmount: number = 0) {
	if (!data.length) {
		return createFilledPassFieldKeysArray(minAmount);
	}

	/**
	 * Filtering data that really have something to show
	 * and, of those, the ones that can be really showed
	 * on the pass
	 */

	const showableFields = data
		.filter(({ value, label }) => value || label)
		.slice(0, maxAmount);

	if (!showableFields.length) {
		return createFilledPassFieldKeysArray(minAmount);
	}

	return showableFields;
}

function createFilledPassFieldKeysArray(slots: number) {
	return new Array<PassFieldKeys>(slots).fill({} as PassFieldKeys);
}
