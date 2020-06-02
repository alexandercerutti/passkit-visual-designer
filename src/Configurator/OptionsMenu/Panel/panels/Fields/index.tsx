import * as React from "react";
import { PanelProps } from "../..";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import { FieldsArrow } from "./icons";
import FieldTitle from "../FieldTitle";
import "./style.less";

interface FieldPanelProps extends PanelProps {
	value?: FieldProps[];
}

export default function FieldPanel(props: FieldPanelProps) {
	const { current: pageCreationClickHandler } = React.useRef(() => {
		props.requestPageCreation(
			<FieldInternalPanel

			/>
		);
	});

	return (
		<>
			<div className="cta-edit" onClick={pageCreationClickHandler}>
				<div className="col-left">
					<FieldTitle name={props.name} />
					<em>{`${props.value?.length ?? 0} fields for this area`}</em>
				</div>
				<FieldsArrow />
			</div>
		</>
	);
}

function FieldInternalPanel() {
	return (
		<div></div>
	);
}
