import * as React from "react";
import { FieldKind } from "../../model";

export type FieldSelectHandler = () => void;
export type onRegister = (kind: FieldKind, id: string) => FieldSelectHandler;

export interface RegisteredComponent {
	id: string;
	onClick: onSelect;
}

export interface RegistrableComponent {
	register?: onRegister;

	// This will be returned to the component
	// and will be a function that will call onSelect.
	// This can be used in the "pure functional components"
	onClick?: onSelect;
}

export function useRegistrations(registerFn: onRegister, components: [FieldKind, string][]): FieldSelectHandler[] {
	const [handlers, setHandlers] = React.useState<FieldSelectHandler[]>([]);

	React.useEffect(() => {
		/**
		 * If no registration function is provided, we
		 * act like it was approved
		 */

		if (!registerFn) {
			return setHandlers([]);
		}

		return setHandlers(
			components.map(([kind, id]) => registerFn(kind, id))
		);
	}, []);

	return handlers;
}
