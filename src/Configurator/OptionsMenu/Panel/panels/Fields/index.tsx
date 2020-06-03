import * as React from "react";
import { PanelProps } from "../..";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import { FieldsArrowIcon, FieldsAddIcon } from "./icons";
import FieldTitle from "../FieldTitle";
import "./style.less";

interface FieldPanelProps extends PanelProps {
	value?: FieldProps[];
}

export default function FieldPanel(props: FieldPanelProps) {
	const { current: pageCreationClickHandler } = React.useRef(() => {
		const { requestPageClosing, requestPageCreation, ...otherProps } = props;

		requestPageCreation(
			<FieldInternalPanel
				{...otherProps}
				onBack={requestPageClosing}
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
				<FieldsArrowIcon />
			</div>
		</>
	);
}

interface FieldInternalPanel extends Omit<FieldPanelProps, "requestPageClosing" | "requestPageCreation"> {
	onBack: () => void;
}

function FieldInternalPanel(props: FieldInternalPanel) {
	const name = `${props.name.slice(0, 1).toUpperCase()}${props.name.slice(1)}`

	return (
		<div className="fields-page">
			<header>
				<div className="back" onClick={props.onBack}>
					<FieldsArrowIcon />
					<span>Back</span>
				</div>
				<FieldTitle name={name} />
				<FieldsAddIcon />
			</header>
			<div className="fields">
				<FieldsDrawer {...props} />
			</div>
		</div>
	);
}

function FieldsDrawer(props: FieldInternalPanel) {
	if (!props.value?.length) {
		return (
			<div className="placeholder">
				<svg className="icon" viewBox="0 0 200 50">
					<text y="35" x="20">¯\_(ツ)_/¯</text>
				</svg>
				<p>There are no fields here yet.</p>
				<p>What about starting adding some? 🤔</p>
			</div>
		);
	}

	return (
		<FieldsCustomizer {...props} />
	);
}

function FieldsCustomizer(props: FieldInternalPanel) {
	const panels = props.value.map(field => {
		return (
			<div className={`field-${field.fieldKey}`}></div>
		);
	});

	return (
		<>
			{panels}
		</>
	);
}
