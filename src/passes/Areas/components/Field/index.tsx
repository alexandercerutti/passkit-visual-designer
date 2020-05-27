import * as React from "react";
import useRegistration, { RegistrableComponent } from "../useRegistration";
import { concatClassNames } from "../../../utils";
import { ValueProps } from "./FieldValue";
import { LabelProps } from "./FieldLabel";
import useFallback from "../EmptyField/useFallback";
import useClickEvent from "../useRegistration/useClickEvent";
import { FieldKind } from "../../../../model";
import "./style.less";

export { default as FieldLabel } from "./FieldLabel";
export { default as FieldValue } from "./FieldValue";
export type FieldProps = ValueProps & LabelProps;

export function Field(props: React.PropsWithChildren<Partial<FieldProps> & RegistrableComponent>) {
	/**
	 * We don't want to pass the click event to children.
	 * They will still accept it but only if used separately.
	 */
	const { onClick, id, register, className: sourceClassName, fieldKey, label, value, style, children } = props;

	useRegistration(register, FieldKind.FIELDS, id);

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

export function GhostField(props: React.PropsWithChildren<Partial<FieldProps> & RegistrableComponent>) {
	const { onClick, id, register, fieldKey, label, value, children } = props;

	useRegistration(register, FieldKind.FIELDS, id);

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
