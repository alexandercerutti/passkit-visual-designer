import * as React from "react";
import "./style.less";
import { FieldProperties } from "../../components/Field/fieldCommons";
import FieldsRow from "../FieldRow";
import InteractionContext from "../../../InteractionContext";

interface Props {
	data: FieldProperties[];
}

export default function Backfields(props: Props) {
	const context = React.useContext(InteractionContext);

	return (
		<div className="back-fields">
			<FieldsRow
				id="backFields"
				maximumElementsAmount={-1}
				elements={props.data}
				register={context.registerField}
				onClick={context.onFieldSelect}
			/>
		</div>
	);
}
