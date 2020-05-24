import * as React from "react";
import withRegistration, { RegistrableComponent } from "../withRegistration";
import withFallback from "../EmptyField/withFallback";
import useBoundField from "./useBoundField";
import { FieldKind } from "../../../model";
import { concatClassNames } from "../../utils";
import { ValueProps } from "./FieldValue";
import { LabelProps } from "./FieldLabel";
import "./style.less";

export { default as FieldLabel } from "./FieldLabel";
export { default as FieldValue } from "./FieldValue";
export type FieldProps = ValueProps & LabelProps;

export function PureField(props: React.PropsWithChildren<Partial<FieldProps> & RegistrableComponent>) {
	/**
	 * We don't want to pass the click event to children.
	 * They will still accept it but only if used separately.
	 */
	const { onClick, id, register, ...propsWithoutClickEvent } = props;
	const className = concatClassNames("field", props.className, props.fieldKey && `field-${props.fieldKey}`);

	return (
		<div
			style={props.style || {}}
			className={className}
			onClick={() => onClick?.(id)}
		>
			{props.children}
		</div>
	);
}

/**
 * This components is needed to fallback in case of
 * self-handled FieldLabel and FieldValue.
 *
 * Used in Travel Primary Fields to make elements
 * fit in the grid.
 */

export const GhostField = withFallback(function (props: React.PropsWithChildren<Partial<FieldProps>>) {
	return (
		<>
			{props.children}
		</>
	);
}, ["label", "value", "fieldKey"]);

export const Field = withRegistration(withFallback(PureField, ["label", "value", "fieldKey"]), FieldKind.FIELDS);
