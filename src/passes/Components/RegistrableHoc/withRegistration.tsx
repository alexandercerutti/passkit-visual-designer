import * as React from "react";
import { RegisterPassEditableField, FieldKind } from "../../../model";
import { FillableComponent } from "../FillableComponent";

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
 * @param WrappedField
 * @param fieldKind
 * @param registerFunction
 */

export default function withRegistration<P extends FillableComponent>(WrappedField: React.ComponentType<P>, fieldKind: FieldKind, registerFunction: RegisterPassEditableField) {
	return (props: P) => {
		const [approved, setApproved] = React.useState(false);

		React.useEffect(() => {
			if (registerFunction(fieldKind, props.id)) {
				return setApproved(true);
			}
		}, []);

		if (!approved) {
			return null;
		}

		return <WrappedField {...props} />
	}
}
