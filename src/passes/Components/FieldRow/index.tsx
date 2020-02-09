import * as React from "react";
import { Field } from "../Field";
import "./style.less";
import { RegistrableComponent } from "../withRegistration";

interface RowProps extends Omit<RegistrableComponent, "id"> {
	areaIdentifier: string;
	maximumElementsAmounts: number;
	elements: Omit<Parameters<typeof Field>[0], "id">[];
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
		props.elements &&
		props.elements.length &&
		(
			props.maximumElementsAmounts &&
				props.maximumElementsAmounts > 0
				? props.elements.slice(0, props.maximumElementsAmounts)
				: props.elements
		).map((data, index) => (
			<Field
				key={`${props.areaIdentifier}.${index}`}
				id={`${props.areaIdentifier}.${index}`}
				{...data}
			/>
		))
	) || null;

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
