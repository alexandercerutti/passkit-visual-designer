import * as React from "react";
import "./style.less";
import FieldsRow from "../FieldRow";
import InteractionContext from "../../../InteractionContext";
import { PassFieldKeys } from "../../../constants";

interface Props {
	data: PassFieldKeys[];
}

export default function Backfields(props: Props) {
	const context = React.useContext(InteractionContext);
	const validFieldsAmount = props.data && props.data.filter(({ value, label }) => value || label) || [];

	return (
		<div className="back-fields">
			<FieldsRow
				id="backFields"
				maximumElementsAmount={0}
				elements={validFieldsAmount}
				register={context.registerField}
				onClick={context.onFieldSelect}
				className={!validFieldsAmount.length && "expand" || ""}
			/>
		</div>
	);
}
