import * as React from "react";
import { InteractionContext, PassMixedProps } from "../..";
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

type RegistrationDescriptor = [kind: FieldKind, fieldName: string];

const noop = () => {};

export function useRegistrations(
	components: RegistrationDescriptor[]
): FieldSelectHandler[] {
	const { registerField } = React.useContext(InteractionContext);

	return React.useMemo(() => {
		if (!registerField) {
			return components.map(() => noop);
		}

		return components.map(([kind, id]) => registerField(kind, id));
	}, [registerField]);
}
