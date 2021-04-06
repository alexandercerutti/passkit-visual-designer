import * as React from "react";
import "./style.less";
import FieldsRow from "../FieldRow";
import { PassFieldKeys } from "../../../constants";

interface Props {
	data: PassFieldKeys[];
}

export default function Backfields(props: Props) {
	return (
		<div className="back-fields">
			<FieldsRow id="backFields" maximumElementsAmount={-1} elements={props.data} />
		</div>
	);
}
