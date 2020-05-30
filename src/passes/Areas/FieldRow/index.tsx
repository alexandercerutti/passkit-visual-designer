import * as React from "react";
import { Field, FieldProps, FieldLabel, FieldValue } from "../components/Field";
import "./style.less";
import { RegistrableComponent, useRegistrations } from "../useRegistrations";
import { FieldKind } from "../../../model";

interface RowProps extends RegistrableComponent {
	id: string;
	maximumElementsAmount: number;
	elements: FieldProps[];
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
	const { maximumElementsAmount = 0, register, id, elements = [] } = props;
	const elementsClickHandlersIdentifiers = (
		elements.length &&
		elements.map<[FieldKind, string]>((_, index) => [FieldKind.FIELDS, `${id}.${index}`]) ||
		[[FieldKind.FIELDS, `${id}.0`]] // for empty field placeholder
	);

	const fieldsClickHandlers = useRegistrations(register, elementsClickHandlersIdentifiers);

	const mappableElements = (
		elements.length &&
		props.elements.slice(0, maximumElementsAmount || elements.length)
	) || [{}] as RowProps["elements"];

	const mappedElements = mappableElements.map((data, index) => {
		const fieldID = `${id}.${index}`;

		return (
			<Field
				key={fieldID}
				onClick={fieldsClickHandlers?.[index]}
				fieldKey={data.fieldKey}
			>
				<FieldLabel {...data} />
				<FieldValue {...data} />
			</Field>
		);
	});

	return (
		<>
			{mappedElements}
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
