import * as React from "react";
import { FieldKind } from "../../../model";

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

function onSafeSelect(id: string, onSelectFn?: onSelect) {
	return onSelectFn?.(id);
}

/**
 * Provides a HOC that waits until fields
 * registration handler approves for registration.
 *
 * This could be rejected. If so, the component
 * won't be rendered.
 *
 * In our case registration is needed to create a
 * new field in the configurator.
 *
 * Also adds to a component a common logic of selection
 * that is activated only if the register function
 * and selection function are passed.
 *
 * @param WrappedField
 * @param fieldKind
 * @param registerFunction
 */

export default function withRegistration<P extends RegistrableComponent>(WrappedField: React.ComponentType<P>, fieldKind: FieldKind) {
	return (props: P) => {
		const [approved, setApproved] = React.useState(false);

		React.useEffect(() => {
			/**
			 * If no registration function is provided, we
			 * act like it was approved
			 */
			if (!props.register || props.register(fieldKind, props.id)) {
				return setApproved(true);
			}
		}, []);

		if (!approved) {
			return null;
		}

		const withoutOnSelect = Object.assign({}, props);
		delete withoutOnSelect["onSelect"];

		return <WrappedField {...withoutOnSelect} onClick={() => props.register && onSafeSelect(props.id, props.onClick)} />
	}
}
