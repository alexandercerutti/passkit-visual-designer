import * as React from "react";
import { SelectableComponent } from "../../useRegistrations";
import { createClassName } from "../../../utils";
import useFallback from "../useFallback";
import useClickEvent from "../useClickEvent";
import "./style.less";
import { FieldProperties } from "./fieldCommons";

export { default as FieldLabel } from "./FieldLabel";
export { default as FieldValue } from "./FieldValue";

// Omitting onClick because we need it only if we are using FieldLabel and FieldValue without a container
export type FieldProps = Omit<FieldProperties, "onClick">;

export function Field(props: React.PropsWithChildren<Partial<FieldProps & SelectableComponent>>) {
	/**
	 * We don't want to pass the click event to children.
	 * They will still accept it but only if used separately.
	 */
	const { onClick, className: sourceClassName, fieldKey, label, value, style = {}, children } = props;

	return useClickEvent(onClick,
		useFallback(() => {
			const className = createClassName(["field", sourceClassName], {
				[`field-${fieldKey ?? ""}`]: fieldKey
			});

			return (
				<div
					style={style}
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

export function GhostField(props: React.PropsWithChildren<Partial<FieldProps & SelectableComponent>>) {
	const { onClick, fieldKey, label, value, children } = props;

	return useClickEvent(onClick,
		useFallback(() => {
			return (
				<>
					{children}
				</>
			);
		}, [label, value, fieldKey])
	);
}
