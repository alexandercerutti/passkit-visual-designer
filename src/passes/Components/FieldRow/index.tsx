import * as React from "react";
import { Field, FieldProps } from "../Field";
import "./style.less";
import { RegistrableComponent } from "../withRegistration";

interface RowProps extends Omit<RegistrableComponent, "id"> {
	areaIdentifier: string;
	maximumElementsAmount: number;
	elements: Omit<FieldProps, "id">[];
}

/**
 * Sparse TextField set, without
 * any wrapper. Made for parent
 * elements that are already
 * flex.
 *
 * Well, actually you are not a
 * row but who am I to judge you?
 * ¯\_(ツ)_/¯
 *
 * @param props
 */

export function InlineFieldsRow(props: RowProps) {
	const elements = (
		(
			(props.elements?.length ?? 0) && (
				(props.maximumElementsAmount || 0) > 0
					? props.elements.slice(0, props.maximumElementsAmount)
					: props.elements
			) || [{}] as RowProps["elements"]
		).map((data, index) => (
			<Field
				key={`${props.areaIdentifier}.${index}`}
				id={`${props.areaIdentifier}.${index}`}
				onClick={props.onClick}
				register={props.register}
				{...data}
			/>
		))
	);

	return (
		<>
			{elements}
		</>
	);
}

/**
 * TextFields-only row, wrapped in a
 * flex element.
 *
 * @param props
 */

export default function FieldsRow(props: RowProps) {
	return (
		<div className="text-fields-row">
			<InlineFieldsRow {...props} />
		</div>
	);
}
