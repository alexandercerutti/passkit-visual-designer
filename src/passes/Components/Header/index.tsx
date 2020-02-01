import * as React from "react";
import "./header.less";
import TextField, { TextFieldProps } from "../TextField";
import { onRegister } from "../withRegistration";
import ImageField, { ImageFieldProps } from "../ImageField";

type FieldsProps = ImageFieldProps & TextFieldProps;

interface HeaderProps extends Partial<FieldsProps> {
	register?: onRegister
}

export function PassHeader(props: HeaderProps) {
	return (
		<div className="header-container">
			<ImageField
				id="header.logo"
				register={props.register}
				src={props.src}
			/>
			<TextField
				id="header.textField"
				className="logo-text"
				content={props.content || ""}
				register={props.register}
			/>
			<TextField
				id="header.test2"
				register={props.register}
			/>
		</div>
	);
}
