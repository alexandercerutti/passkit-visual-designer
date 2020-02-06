import * as React from "react";
import "./header.less";
import TextField, { TextFieldProps } from "../TextField";
import { onRegister } from "../withRegistration";
import ImageField, { ImageFieldProps } from "../ImageField";
import { FieldSet } from "../ColumnField";

type FieldsProps = ImageFieldProps & TextFieldProps;

interface HeaderProps extends Partial<FieldsProps> {
	register?: onRegister;
	headerFieldsData?: Omit<Parameters<typeof FieldSet>[0], "id">[];
}

export function PassHeader(props: HeaderProps) {
	/**
	 * Taking only the first three headers
	 * as per Apple maximum number of header fields
	 */
	const headerFields = (
		props.headerFieldsData &&
		props.headerFieldsData.length &&
		props.headerFieldsData.slice(0, 3).map((fieldProps, index) => {
			const id = `headerFields.${index}`;
			return (
				<FieldSet
					key={id}
					id={id}
					{...fieldProps}
					register={props.register}
				/>
			)
		})
	) || null;

	return (
		<div className="header-container">
			<ImageField
				id="header.logo"
				register={props.register}
				src={props.src || "https://cdn.freebiesupply.com/logos/large/2x/trenitalia-logo-png-transparent.png"}
				width={"30px"}
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
