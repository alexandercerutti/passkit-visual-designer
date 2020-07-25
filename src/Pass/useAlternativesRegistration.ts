import { useEffect } from "react";
import { PassAlternative } from "../PassSelector";

export type RegisterAlternatives = (...alternatives: PassAlternative[]) => void;

export interface AlternativesRegistrationSignature {
	registerAlternatives?: RegisterAlternatives;
}

export default function useAlternativesRegistration(register: RegisterAlternatives, ...alternatives: PassAlternative[]) {
	useEffect(() => void (register && register(...alternatives)), []);
}
