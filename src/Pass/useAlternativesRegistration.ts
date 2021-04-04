import * as React from "react";
import { PassMixedProps } from ".";
import { PassKind } from "../model";

export interface PassAlternative {
	name: string;
	specificProps: Partial<PassMixedProps>;
}

type PassKindsAlternatives = {
	[key in PassKind]?: PassAlternative[]
};

/**
 * Can we put here a map or a structure along with an exported function to access to it
 * and the hook to save data without having to pass "register" function to useAlternativeRegistration?
 */

const alternativesList: PassKindsAlternatives = {};

export default function useAlternativesRegistration(
	kind: PassKind,
	...alternatives: PassAlternative[]
) {
	React.useEffect(() => {
		alternativesList[kind] = [ ...alternatives ];
	}, []);
}

export function getAlternativesByKind(kind: PassKind) {
	if (!kind) {
		return undefined;
	}

	return alternativesList[kind];
}
