import * as React from "react";
import { Field, FieldProps } from "../Field";
import "./style.less";
import { RegistrableComponent } from "../useRegistration";
import useBoundField from "../Field/useBoundField";

interface RowProps extends RegistrableComponent {
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
	const { maximumElementsAmount = 0, onClick, register, id, elements = [] } = props;
	const [FieldLabel, FieldValue] = useBoundField({ id, register });

	const mappableElements = (
		elements.length &&
		props.elements.slice(0, maximumElementsAmount || elements.length)
	) || [{}] as RowProps["elements"];

	const mappedElements = mappableElements.map((data, index) => {
		const fieldID = `${id}.${index}`;

		return (
			<Field
				key={fieldID}
				id={fieldID}
				onClick={onClick}
				register={register}
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
