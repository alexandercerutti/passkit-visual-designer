import * as React from "react";
import "./style.less";
import TextField from "../../components/TextField";
import { RegistrableComponent, useRegistrations } from "../useRegistrations";
import ImageField from "../../components/ImageField";
import FieldsRow from "../FieldRow";
import { createClassName } from "../../../../utils";
import { FieldKind } from "../../../../model";
import { PassFieldKeys } from "../../../constants";

interface HeaderProps extends Partial<RegistrableComponent> {
	headerFields?: PassFieldKeys[];
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
		[FieldKind.IMAGE, "logo"],
		[FieldKind.TEXT, "logoText"]
	]);

	const className = createClassName(["header-container"], {
		"separator": props.withSeparator
	});

	return (
		<div className={className}>
			<div className="inner">
				<ImageField
					src={props.logo}
					onClick={() => logoClickHandler(null)}
				/>
				<TextField
					className="logo-text"
					content={props.logoText || ""}
					onClick={() => logoTextClickHandler(null)}
				/>
				<FieldsRow
					elements={props.headerFields}
					maximumElementsAmount={3}
					id="headerFields"
					register={props.register}
				/>
			</div>
		</div>
	);
}
