import * as React from "react";
import { PanelProps } from "../..";
import "./style.less";

interface TextPanelProps extends PanelProps {
	value?: string;
}

export default function TextPanel(props: TextPanelProps) {
	const [content, setContent] = React.useState<string>(props.value || null);

	const onKeyDownEventRef = React.useRef(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		key === "Enter" && currentTarget.blur();
	});

	const onBlurEventRef = React.useRef((event: React.FocusEvent<HTMLInputElement>) => {
		// Should check if new value equals to old value or not?
		setContent(event.target.value);
		props.onValueChange(props.name, event.target.value);
	});

	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	const required = (
		props.data.required &&
		<span className="required" />
	) || null;

	return (
		<div className="panel text" data-name={props.name}>
			<label htmlFor={props.name}><h4>{showTitle}</h4>{required}</label>
			<input
				id={props.name}
				placeholder={props.name}
				onBlur={onBlurEventRef.current}
				onKeyDown={onKeyDownEventRef.current}
				defaultValue={content}
			/>
		</div>
	);
}
