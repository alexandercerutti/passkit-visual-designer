import * as React from "react";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import FieldsRow from "../FieldRow";

interface Props {
	data: Pass.PassFieldContent[];
}

export default function Backfields(props: Props) {
	return (
		<div className="back-fields">
			<FieldsRow id="backFields" maximumElementsAmount={-1} elements={props.data} />
		</div>
	);
}
