import * as React from "react";
import { FieldKind } from "../../model";

export type onRegister = (kind: FieldKind, id: string) => boolean;
export type onSelect = (id: string) => void;

export interface RegistrableComponent {
	id: string;
	register?: onRegister;

	// This will be returned to the component
	// and will be a function that will call onSelect.
	// This can be used in the "pure functional components"
	onClick?: onSelect;
}

export default function useRegistration(registerFn: onRegister, kind: FieldKind, id: string) {
	const [registered, setRegistered] = React.useState(false);

	React.useEffect(() => {
		/**
		 * If no registration function is provided, we
		 * act like it was approved
		 */
		if (!registerFn || registerFn(kind, id)) {
			return setRegistered(true);
		}
	}, []);

	return registered;
}
