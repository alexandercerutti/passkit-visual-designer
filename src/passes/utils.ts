import { Field } from "./Components/Field";
import { RegistrableComponent } from "./Components/withRegistration";

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
	return (data && data.length && data) || fallbackData;
}
