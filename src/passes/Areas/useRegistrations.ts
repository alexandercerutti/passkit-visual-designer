import * as React from "react";
import { FieldKind } from "../../model";

export type FieldSelectHandler = (fieldIdentifier: string | null) => void;
export type onRegister = (kind: FieldKind, id: string) => FieldSelectHandler;
export type onComponentSelection = (id: string, key: string | null) => void;

export interface SelectableComponent {
	onClick: FieldSelectHandler;
}

export interface RegistrableComponent {
	register?: onRegister;

	// This will be returned to the component
	// and will be a function that will call onSelect.
	// This can be used in the "pure functional components"
	onClick?: onComponentSelection;
}

type RegistrationDescriptor = [FieldKind, string];

export function useRegistrations(registerFn: onRegister, components: RegistrationDescriptor[]): FieldSelectHandler[] {
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
