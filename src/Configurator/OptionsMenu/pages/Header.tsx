import * as React from "react";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../CapitalHeaderTitle";

interface Props {
	name: string;
	onBack(): void;
}

export default function PageHeader(props: React.PropsWithChildren<Props>) {
	return (
		<header>
			<div className="back" onClick={props.onBack}>
				<FieldsArrowIcon />
				<span>Back</span>
			</div>
			<CapitalHeaderTitle name={props.name} />
			{props.children}
		</header>
	);
}
