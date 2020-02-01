import * as React from "react";
import "./header.less";
import TextField from "../TextField";
import { onRegister } from "../withRegistration";

interface HeaderProps {
	logoText?: string;
	register?: onRegister
}

export function PassHeader(props: HeaderProps) {
	return (
		<div className="header-container">
			<TextField
				id="header.test1"
				register={props.register}
			/>
			<TextField
				id="header.textField"
				className="logo-text"
				content={props.logoText || ""}
				register={props.register}
			/>
			<TextField
				id="header.test2"
				register={props.register}
			/>
		</div>
	);
}
