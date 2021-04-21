import * as React from "react";
import "./style.less";
import FieldsArrowIcon from "../../icons";
import CapitalHeaderTitle from "../CapitalHeaderTitle";
import { PageProps } from "../../Navigable.hoc";

interface Props extends Partial<Omit<PageProps, "name">> {
	name?: string;
}

export default function PageHeader(props: React.PropsWithChildren<Props>) {
	return (
		<header>
			<div className="back" onClick={() => props.onBack()}>
				<FieldsArrowIcon />
				<span>Back</span>
			</div>
			{props.name && <CapitalHeaderTitle name={props.name} />}
			{props.children}
		</header>
	);
}
