import * as React from "react";
import { PassMixedProps } from "../..";
import { FieldKind } from "../../../model";

// I actually not really understood how does conditional distributed types work...
// But what I wanted to achieve is to obtain a "forced" no-parameter function
// If a SelectableComponent does not return
export type FieldSelectHandler<P = any> = [P] extends [never]
	? () => void
	: (fieldIdentifier: string | null) => void;
export type onRegister = (kind: FieldKind, id: keyof PassMixedProps | string) => FieldSelectHandler;
export type onComponentSelection = (id: keyof PassMixedProps, key: string | null) => void;

export interface SelectableComponent<P = any> {
	onClick: FieldSelectHandler<P>;
}

export interface RegistrableComponent {
	register?: onRegister;

	// This will be returned to the component
	// and will be a function that will call onSelect.
	// This can be used in the "pure functional components"
	onClick?: onComponentSelection;
}

type RegistrationDescriptor = [kind: FieldKind, fieldName: string];

const noop = () => {};

export function useRegistrations(
	registerFn: onRegister,
	components: RegistrationDescriptor[]
): FieldSelectHandler[] {
	return React.useMemo(() => {
		if (!registerFn) {
			return components.map(() => noop);
		}

		return components.map(([kind, id]) => registerFn(kind, id));
	}, [registerFn]);
}
