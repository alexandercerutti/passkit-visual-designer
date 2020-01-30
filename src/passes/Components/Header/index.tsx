import * as React from "react";
import "./header.less";
import TextField from "../TextField";

interface HeaderProps {
	logoText?: string;
}

export function PassHeader(props: HeaderProps) {
	return (
		<div className="header-container">
			<TextField
				id="header.test1"
			/>
			<TextField
				id="header.textField"
				className="logo-text"
				content={props.logoText || ""}
			/>
			<TextField
				id="header.test2"
			/>
		</div>
	);
}
