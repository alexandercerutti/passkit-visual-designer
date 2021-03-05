import * as React from "react";
import "./style.less";

interface Props {
	label: string;
	onClick(): void;
}

export default function LanguageSelectionButton(props: Props) {
	return (
		<button
			className="language-select-btn"
			onClick={props.onClick}
			title="Click here to switch language"
		>
			{props.label}
		</button>
	);
}
