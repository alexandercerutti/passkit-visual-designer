import * as React from "react";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import Field, { FieldKind, FieldLabel, FieldValue } from "../../components/Field";
import { useFieldRegistration } from "../useFieldRegistration";
import { createClassName } from "../../../utils";
import { getFilteredFieldData } from "../../components/Field/getFilteredFieldData";

interface RowProps {
	id: string;
	maximumElementsAmount: number;
	elements: Pass.PassFieldContent[];
	className?: string;
}

/**
 * Container for Apple Wallet Fields
 *
 * @param props
 */

export default function FieldsRow(props: RowProps) {
	const { maximumElementsAmount = 0, id, elements = [], className: externalClassName } = props;

	const fieldsClickHandler = useFieldRegistration(FieldKind.FIELDS, id);

	/** Forcing one or we'd get too much fields as fallback */
	const mappedElements = getFilteredFieldData(elements, 1, maximumElementsAmount).map(
		(data, index) => (
			<Field
				key={`${id}.${index}`}
				onClick={() => fieldsClickHandler(data.key ?? null)}
				fieldData={data}
			>
				<FieldLabel fieldData={data} />
				<FieldValue fieldData={data} />
			</Field>
		)
	);

	const className = createClassName(["fields-row", externalClassName]);

	return <div className={className}>{mappedElements}</div>;
}
