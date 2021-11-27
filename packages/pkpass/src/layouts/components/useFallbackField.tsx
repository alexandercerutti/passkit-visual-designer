import * as React from "react";
import EmptyField from "./EmptyField";

/**
 * Hook that uses the same form of useMemo
 * to replace the element with a fallback one
 * if all dependencies are not "truthy".
 *
 * @param create
 * @param deps
 * @returns
 */

export default function useFallbackField<T>(create: () => T, deps: any[]) {
	if (deps.every((dep) => !Boolean(dep))) {
		return <EmptyField />;
	}

	return create();
}
