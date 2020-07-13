import * as React from "react";
import "./style.less";
import { SelectableComponent } from "../../useRegistrations";
import { createClassName } from "../../../../utils";
import useFallback from "../useFallback";
import useClickEvent from "../useClickEvent";
import { StylingProps } from "../../../../model";
import { PassFieldKeys } from "../../../constants";

export { default as FieldLabel } from "./FieldLabel";
export { default as FieldValue } from "./FieldValue";

type Props = StylingProps & Partial<SelectableComponent> & {
	fieldData: PassFieldKeys;
};

export function Field(props: React.PropsWithChildren<Props>) {
	/**
	 * We don't want to pass the click event to children.
	 * They will still accept it but only if used separately.
	 */
	const { onClick, className: sourceClassName, fieldData: { key, label, value }, style = {}, children } = props;

	return useClickEvent(onClick,
		useFallback(() => {
			const className = createClassName(["field", sourceClassName], {
				[`field-${key ?? ""}`]: key
			});

			return (
				<div
					style={style}
					className={className}
				>
					{children}
				</div>
			);
		}, [label, value, key])
	);
}

/**
 * This components is needed to fallback in case of
 * self-handled FieldLabel and FieldValue.
 *
 * Used in Travel Primary Fields to make elements
 * fit in the grid.
 */

export function GhostField(props: React.PropsWithChildren<Props>) {
	const { onClick, fieldData: { key, label, value }, children } = props;

	return useClickEvent(onClick,
		useFallback(() => {
			return (
				<>
					{children}
				</>
			);
		}, [label, value, key])
	);
}
