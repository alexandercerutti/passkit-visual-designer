import * as React from "react";
import "./style.less";
import TextField from "../../components/TextField";
import { useFieldRegistration } from "../useFieldRegistration";
import ImageField from "../../components/ImageField";
import FieldsRow from "../FieldRow";
import { FieldKind } from "../../../../../../src/model";
import { PassField } from "../../../constants";

interface HeaderProps {
	headerFields?: PassField[];
	logoText?: string;
	logo?: string;
}

export function PassHeader(props: HeaderProps) {
	/**
	 * The Field row will register itself
	 * with the ID we pass to it.
	 */
	const logoClickHandler = useFieldRegistration(FieldKind.IMAGE, "logo");
	const logoTextClickHandler = useFieldRegistration(FieldKind.TEXT, "logoText");

	/**
	 * This is to make fallback growing and be visible
	 * We need to have at least one element that have value or label
	 */
	const canGrowRowCN =
		(!(
			props.headerFields.length && props.headerFields.some((field) => field.value || field.label)
		) &&
			"can-grow") ||
		"";

	return (
		<div className="header-container">
			<div className="inner">
				<ImageField src={props.logo} onClick={() => logoClickHandler(null)} />
				<TextField
					className="logo-text"
					content={props.logoText || ""}
					onClick={() => logoTextClickHandler(null)}
				/>
				<FieldsRow
					elements={props.headerFields}
					maximumElementsAmount={3}
					id="headerFields"
					className={canGrowRowCN}
				/>
			</div>
		</div>
	);
}
