import * as React from "react";
import "./style.less";
import TextField, { TextFieldProps } from "../TextField";
import { onRegister } from "../withRegistration";
import ImageField, { ImageFieldProps } from "../ImageField";
import { Field } from "../Field";
import { InlineFieldsRow } from "../FieldRow";

type FieldsProps = ImageFieldProps & TextFieldProps;

interface HeaderProps extends Partial<FieldsProps> {
	register?: onRegister;
	headerFieldsData?: Omit<Parameters<typeof Field>[0], "id">[];
}

export function PassHeader(props: HeaderProps) {
	/**
	 * Taking only the first three headers
	 * as per Apple maximum number of header fields
	 */
	const headerFields = (
		<InlineFieldsRow
			elements={props.headerFieldsData}
			maximumElementsAmount={3}
			areaIdentifier="headerFields"
			register={props.register}
			onSelect={props.onSelect}
			onClick={props.onClick}
		/>
	);

	return (
		<div className="header-container">
			<ImageField
				id="header.logo"
				register={props.register}
				// src={props.src || "https://cdn.freebiesupply.com/logos/large/2x/trenitalia-logo-png-transparent.png"}
				src={props.src}
			// width={"30px"}
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
