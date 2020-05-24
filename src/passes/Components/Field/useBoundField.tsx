import * as React from "react";
import { RegistrableComponent } from "../withRegistration";
import { FieldKind } from "../../../model";
import FieldLabel from "./FieldLabel";
import FieldValue from "./FieldValue";
import { FieldProps } from ".";

/**
 * The purpose of this hook, is to return a couple
 * composed by FieldLabel and FieldValue that, when
 * get both rendered, send only one registration, to
 * avoid to show multiple configuration row (one for
 * the label and one for the value) in the configurator.
 *
 * @param props
 */

export default function useBoundField(props: RegistrableComponent): [typeof FieldLabel, typeof FieldValue] {
	const increaseMountedAmount = React.useRef(0);
	const [isRegistered, setRegistered] = React.useState(false);

	const boundRegistration = React.useRef(() => {
		increaseMountedAmount.current += 1;

		if (increaseMountedAmount.current === 2 && !isRegistered) {
			setRegistered(props.register && props.register(FieldKind.FIELDS, props.id));
		}
	});

	return [
		withBinding(FieldLabel, boundRegistration.current),
		withBinding(FieldValue, boundRegistration.current)
	];
}

/**
 * A HOC that notifies through a passed parameter
 * when it has been mounted.
 *
 * @param FieldComponent
 * @param setMounted
 */

function withBinding<P extends FieldProps>(FieldComponent: React.FunctionComponent<P>, setMounted: () => void) {
	React.useEffect(() => {
		setMounted()
	}, []);

	return (props: P & RegistrableComponent) => {
		return <FieldComponent {...props} />
	};
}
