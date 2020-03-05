import * as React from "react";
import "./style.less";
import TextField, { TextFieldProps } from "../TextField";
import { onRegister } from "../withRegistration";
import ImageField, { ImageFieldProps } from "../ImageField";
import { FieldProps } from "../Field";
import { InlineFieldsRow } from "../FieldRow";
import { concatClassNames } from "../../utils";

type HeaderFieldsProps = ImageFieldProps & TextFieldProps;

interface HeaderProps extends Partial<HeaderFieldsProps> {
	register?: onRegister;
	headerFieldsData?: Omit<FieldProps, "id">[];
	withSeparator?: boolean;
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
			onClick={props.onClick}
		/>
	);

	const className = concatClassNames("header-container", props.withSeparator && "separator" || "");

	return (
		<div className={className}>
			<ImageField
				id="header.logo"
				register={props.register}
				// src={props.src || "https://cdn.freebiesupply.com/logos/large/2x/trenitalia-logo-png-transparent.png"}
				src={props.src}
				// width={"30px"}
				onClick={props.onClick}
			/>
			<TextField
				id="header.logoText"
				className="logo-text"
				content={props.content || ""}
				register={props.register}
				onClick={props.onClick}
			/>
			{headerFields}
		</div>
	);
}
