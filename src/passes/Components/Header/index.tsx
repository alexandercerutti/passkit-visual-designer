import * as React from "react";
import "./header.less";
import TextField, { TextFieldProps } from "../TextField";
import { onRegister } from "../withRegistration";
import ImageField, { ImageFieldProps } from "../ImageField";
import Field, { FieldSetProps } from "../Field";

type FieldsProps = ImageFieldProps & TextFieldProps;

interface HeaderProps extends Partial<FieldsProps> {
	register?: onRegister;
	headerFieldsData?: FieldSetProps[];
}

export function PassHeader(props: HeaderProps) {
	const headerFields = (
		props.headerFieldsData &&
		props.headerFieldsData.length &&
		props.headerFieldsData.map((fieldProps, index) => (
			<Field
				{...fieldProps}
				id={`header.headerFields.${index}`}
				register={props.register}
			/>
		))
	) || null;

	return (
		<div className="header-container">
			<ImageField
				id="header.logo"
				register={props.register}
				src={props.src}
			/>
			<TextField
				id="header.logoText"
				className="logo-text"
				content={props.content || ""}
				register={props.register}
			/>
			{headerFields}
		</div>
	);
}
