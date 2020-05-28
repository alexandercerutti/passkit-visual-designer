import * as React from "react";
import { FieldKind } from "../../model";

export type onRegister = (kind: FieldKind, id: string) => boolean;
export type onSelect = (id: string) => void;

export interface RegisteredComponent {
	id: string;
	onClick: onSelect;
}

export interface RegistrableComponent {
	id: string;
	register?: onRegister;

	// This will be returned to the component
	// and will be a function that will call onSelect.
	// This can be used in the "pure functional components"
	onClick?: onSelect;
}

export function useRegistrations(registerFn: onRegister, components: [FieldKind, string][]) {
	const [registered, setRegistered] = React.useState(false);
	const approvedComponents = [];

	React.useEffect(() => {
		/**
		 * If no registration function is provided, we
		 * act like it was approved
		 */

		if (!registerFn) {
			return setRegistered(true);
		}

		approvedComponents.push(...components.map(([kind, id]) => registerFn(kind, id)));

		if (approvedComponents.some(Boolean)) {
			return setRegistered(true);
		}
	}, []);

	return registered;
}
