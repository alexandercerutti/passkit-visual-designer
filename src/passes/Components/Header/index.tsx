import * as React from "react";
import "./style.less";
import TextField from "../TextField";
import { onRegister, RegistrableComponent } from "../useRegistration";
import ImageField from "../ImageField";
import { FieldProps } from "../Field";
import { InlineFieldsRow } from "../FieldRow";
import { concatClassNames } from "../../utils";

interface HeaderProps extends Partial<RegistrableComponent> {
	register?: onRegister;
	headerFields?: FieldProps[];
	logoText?: string;
	logo?: string;
	withSeparator?: boolean;
}

export function PassHeader(props: HeaderProps) {
	/**
	 * Taking only the first three headers
	 * as per Apple maximum number of header fields
	 */
	const headerFields = (
		<InlineFieldsRow
			elements={props.headerFields}
			maximumElementsAmount={3}
			id="headerFields"
			register={props.register}
			onClick={props.onClick}
		/>
	);

	const className = concatClassNames("header-container", props.withSeparator && "separator" || "");

	return (
		<div className={className}>
			<ImageField
				id="logo"
				register={props.register}
				// src={props.logo || "https://cdn.freebiesupply.com/logos/large/2x/trenitalia-logo-png-transparent.png"}
				src={props.logo}
				// width={"30px"}
				onClick={props.onClick}
			/>
			<TextField
				id="logoText"
				className="logo-text"
				content={props.logoText || ""}
				register={props.register}
				onClick={props.onClick}
			/>
			{headerFields}
		</div>
	);
}
