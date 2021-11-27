import { Pass } from "@pkvd/passkit-types";

/**
 * Tries to get data from the specified source
 * if it is available and the array has elements
 * in it. Otherwise creates an array of empty
 * objects to fallback.
 *
 * @param data
 * @param fallbackAmount
 */

export function getFilteredFieldData(
	data: Pass.PassFieldContent[] = [],
	minAmount: number = 0,
	maxAmount: number = 0
) {
	if (!data.length) {
		return createFilledPassFieldArray(minAmount);
	}

	/**
	 * Filtering data that really have something to show
	 * and, of those, the ones that can be really showed
	 * on the pass
	 */

	const showableFields = data
		.filter(({ value, label }) => value || label)
		.slice(0, (maxAmount > 0 && maxAmount) || undefined);

	if (!showableFields.length) {
		return createFilledPassFieldArray(minAmount);
	}

	return showableFields;
}

function createFilledPassFieldArray(slots: number) {
	return new Array<Pass.PassFieldContent>(slots).fill({} as Pass.PassFieldContent);
}
