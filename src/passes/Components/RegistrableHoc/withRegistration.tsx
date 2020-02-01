import * as React from "react";
import { FieldKind } from "../../../model";
import { FillableComponent } from "../FillableComponent";

export type RegisterPassEditableField = (kind: FieldKind, id: string) => boolean;

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

export default function withRegistration<P extends FillableComponent>(WrappedField: React.ComponentType<P>, fieldKind: FieldKind) {
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

		return <WrappedField {...props} />
	}
}
