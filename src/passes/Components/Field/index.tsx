import * as React from "react";
import "./style.less";
import withRegistration from "../withRegistration";
import withFallback from "../EmptyField/withFallback";
import { FieldKind } from "../../../model";
import { concatClassNames } from "../../utils";
import { PureFieldValue, ValueProps } from "./FieldValue";
import { PureFieldLabel, LabelProps } from "./FieldLabel";

export type FieldProps = ValueProps & LabelProps;

export function PureField(props: FieldProps) {
	/**
	 * We don't want to pass the click event to children.
	 * They will still accept it but only if used separately.
	 */
	const { onClick, ...propsWithoutClickEvent } = props;

	const className = concatClassNames("field", props.className, props.fieldKey && `field-${props.fieldKey}`);

	return (
		<div
			style={props.style || {}}
			className={className}
			onClick={() => onClick?.(props.id)}
		>
			<PureFieldLabel {...propsWithoutClickEvent} />
			<PureFieldValue {...propsWithoutClickEvent} />
		</div>
	);
}

export const Field = withRegistration(withFallback(PureField, ["value", "fieldKey"]), FieldKind.FIELDS);
