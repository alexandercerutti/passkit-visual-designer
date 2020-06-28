import * as React from "react";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../CapitalHeaderTitle";
import { PageProps, PageNavigation } from "./pages";

interface Props extends PageProps, Pick<PageNavigation, "requestPageClosing"> { }

export default function PageHeader(props: React.PropsWithChildren<Props>) {
	return (
		<header>
			<div className="back" onClick={props.requestPageClosing}>
				<FieldsArrowIcon />
				<span>Back</span>
			</div>
			<CapitalHeaderTitle name={props.name} />
			{props.children}
		</header>
	);
}
