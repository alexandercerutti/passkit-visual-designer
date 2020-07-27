import * as React from "react";
import "./style.less";
import TextField from "../../components/TextField";
import { RegistrableComponent, useRegistrations } from "../useRegistrations";
import ImageField from "../../components/ImageField";
import { InlineFieldsRow } from "../FieldRow";
import { createClassName } from "../../../../utils";
import { FieldKind } from "../../../../model";
import { PassFieldKeys } from "../../../constants";

interface HeaderProps extends Partial<RegistrableComponent> {
	headerFields?: PassFieldKeys[];
	logoText?: string;
	logo?: ArrayBuffer;
	withSeparator?: boolean;
}

export function PassHeader(props: HeaderProps) {
	const [logoURI, setLogoURI] = React.useState<string>(undefined);

	// @TODO refactor by using or configurator ObjectURL (if possible)
	// or perform url creation in parent(s)
	React.useEffect(() => {
		if (props.logo?.byteLength) {
			const url = URL.createObjectURL(new Blob([props.logo], { type: "image/*" }));
			setLogoURI(url);
		}

		URL.revokeObjectURL(logoURI);

		return () => URL.revokeObjectURL(logoURI);
	}, [props.logo]);

	/**
	 * The Field row will register itself
	 * with the ID we pass to it.
	 */
	const [logoClickHandler, logoTextClickHandler] = useRegistrations(props.register, [
		[FieldKind.IMAGE, "logo"],
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
		/>
	);

	const className = createClassName(["header-container"], {
		"separator": props.withSeparator
	});

	return (
		<div className={className}>
			<ImageField
				src={logoURI}
				// width={"30px"}
				onClick={() => logoClickHandler(null)}
			/>
			<TextField
				className="logo-text"
				content={props.logoText || ""}
				onClick={() => logoTextClickHandler(null)}
			/>
			{headerFields}
		</div>
	);
}
