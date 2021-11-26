import * as React from "react";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import { SelectableComponent } from "../../sections/useFieldRegistration";
import { createClassName } from "../../../utils";
import useFallbackField from "../useFallbackField";
import useClickEvent from "../useClickEvent";
import { StylingProps } from "../../../../../app/src/model";

export { default as FieldLabel } from "./FieldLabel";
export { default as FieldValue } from "./FieldValue";
export { FieldKind } from "./FieldKind";

type Props = StylingProps &
	Partial<SelectableComponent> & {
		fieldData: Pass.PassFieldContent;
		ghost?: boolean;
	};

export default function Field(props: React.PropsWithChildren<Props>) {
	/**
	 * We don't want to pass the click event to children.
	 * They will still accept it but only if used separately.
	 */
	const {
		onClick,
		className: sourceClassName,
		fieldData: { key, label, value },
		style = {},
		children,
		ghost,
	} = props;

	return useClickEvent(
		onClick,
		useFallbackField(() => {
			const className = createClassName(["field", sourceClassName], {
				[`field-${key ?? ""}`]: key,
			});

			if (ghost) {
				return <>{children}</>;
			}

			return (
				<div style={style} className={className}>
					{children}
				</div>
			);
		}, [label, value, key])
	);
}
