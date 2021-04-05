import * as React from "react";
import { PassMixedProps } from "@pkvd/pass";
import { PassKind } from "../../model";

interface PassAlternative {
	name: string;
	specificProps: Partial<PassMixedProps>;
}

type PassKindsAlternatives = {
	[key in PassKind]?: PassAlternative[];
};

const alternativesList: PassKindsAlternatives = {};

/**
 * Hook to save a list of possible alternatives of a
 * pass kind, only on the first rendering
 *
 * @param kind
 * @param alternatives
 */

export default function useAlternativesRegistration(
	kind: PassKind,
	...alternatives: PassAlternative[]
) {
	React.useEffect(() => {
		alternativesList[kind] = [ ...alternatives ];
	}, []);
}

/**
 * Retrieves the alternatives list for a specified kind
 *
 * @param kind
 * @returns
 */

export function getAlternativesByKind(kind: PassKind) {
	if (!kind) {
		return undefined;
	}

	return alternativesList[kind];
}
