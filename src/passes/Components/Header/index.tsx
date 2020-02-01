import * as React from "react";
import "./header.less";
import TextField from "../TextField";
import { onRegister } from "../withRegistration";
import ImageField from "../ImageField";

interface HeaderProps extends {
	logoText?: string;
	register?: onRegister
}

export function PassHeader(props: HeaderProps) {
	return (
		<div className="header-container">
			<ImageField
				id="header.logo"
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
