import * as React from "react";
import { RegisteredComponent } from "../../useRegistrations";
import { concatClassNames } from "../../../utils";
import { ValueProps } from "./FieldValue";
import { LabelProps } from "./FieldLabel";
import useFallback from "../useFallback";
import useClickEvent from "../useClickEvent";
import "./style.less";

export { default as FieldLabel } from "./FieldLabel";
export { default as FieldValue } from "./FieldValue";
export type FieldProps = ValueProps & LabelProps;

export function Field(props: React.PropsWithChildren<Partial<FieldProps & RegisteredComponent>>) {
	/**
	 * We don't want to pass the click event to children.
	 * They will still accept it but only if used separately.
	 */
	const { onClick, id, className: sourceClassName, fieldKey, label, value, style, children } = props;

	return useClickEvent(id, onClick,
		useFallback(() => {
			const className = concatClassNames("field", sourceClassName, fieldKey && `field-${fieldKey}`);

			return (
				<div
					style={style ?? {}}
					className={className}
				>
					{children}
				</div>
			);
		}, [label, value, fieldKey])
	);
}

/**
 * This components is needed to fallback in case of
 * self-handled FieldLabel and FieldValue.
 *
 * Used in Travel Primary Fields to make elements
 * fit in the grid.
 */

export function GhostField(props: React.PropsWithChildren<Partial<FieldProps & RegisteredComponent>>) {
	const { onClick, id, fieldKey, label, value, children } = props;

	return useClickEvent(id, onClick,
		useFallback(() => {
			return (
				<>
					{children}
				</>
			);
		}, [label, value, fieldKey])
	);
}
