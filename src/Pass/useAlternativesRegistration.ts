import { useEffect } from "react";
import { PassMixedProps } from ".";

export interface PassAlternative {
	name: string;
	specificProps: Partial<PassMixedProps>;
}

export type RegisterAlternatives = (...alternatives: PassAlternative[]) => void;

export interface AlternativesRegistrationSignature {
	registerAlternatives?: RegisterAlternatives;
}

export default function useAlternativesRegistration(
	register: RegisterAlternatives,
	...alternatives: PassAlternative[]
) {
	useEffect(() => void (register && register(...alternatives)), []);
}
