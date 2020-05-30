import * as React from "react";
import "./style.less";
import TextField from "../components/TextField";
import { onRegister, RegistrableComponent, useRegistrations } from "../useRegistrations";
import ImageField from "../components/ImageField";
import { FieldProps } from "../components/Field";
import { InlineFieldsRow } from "../FieldRow";
import { concatClassNames } from "../../utils";
import { FieldKind } from "../../../model";

interface HeaderProps extends Partial<RegistrableComponent> {
	register?: onRegister;
	headerFields?: FieldProps[];
	logoText?: string;
	logo?: string;
	withSeparator?: boolean;
}

export function PassHeader(props: HeaderProps) {
	/**
	 * The Field row will register itself
	 * with the ID we pass to it.
	 */
	const [logoClickHandler, logoTextClickHandler] = useRegistrations(props.register, [
		[FieldKind.IMAGE, "Logo"],
		[FieldKind.TEXT, "logoText"]
	]);

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
				// src={props.logo || "https://cdn.freebiesupply.com/logos/large/2x/trenitalia-logo-png-transparent.png"}
				src={props.logo}
				// width={"30px"}
				onClick={logoClickHandler}
			/>
			<TextField
				className="logo-text"
				content={props.logoText || ""}
				onClick={logoTextClickHandler}
			/>
			{headerFields}
		</div>
	);
}
