import * as React from "react";
import { InteractionContext, PassMixedProps } from "../..";
import { FieldKind } from "../components/Field";

// I actually not really understood how does conditional distributed types work...
// But what I wanted to achieve is to obtain a "forced" no-parameter function
// If a SelectableComponent does not return
export type FieldSelectHandler<P = any> = [P] extends [never]
	? () => void
	: (fieldIdentifier: string | null) => void;
export type onRegistration = (kind: FieldKind, id: keyof PassMixedProps | string) => FieldSelectHandler;

export interface SelectableComponent<P = any> {
	onClick: FieldSelectHandler<P>;
}

type RegistrationDescriptor = [kind: FieldKind, fieldName: string];

/**
 * Registration principle regards having a way to click on
 * an element and trigger something in a parent, which uses
 * the InteractionContext provided by the Pass component.
 *
 * So, the context defines the registration function and
 * the registration function, once invoked, returns a
 * click handler.
 *
 * @param kind field kind
 * @param id id of the field
 * @returns
 */

export function useFieldRegistration(...component: RegistrationDescriptor) {
	const registerField = React.useContext(InteractionContext);
	const [kind, id] = component;

	return React.useMemo(() => registerField?.(kind, id), [registerField]);
}
