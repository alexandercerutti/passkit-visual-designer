import { useEffect } from "react";
import { PassAlternative } from "../../PassSelector";

export default function useAlternativesRegistration(register: (...alts: PassAlternative[]) => void, ...alternatives: PassAlternative[]) {
	useEffect(() => void (register && register(...alternatives)), []);
}
