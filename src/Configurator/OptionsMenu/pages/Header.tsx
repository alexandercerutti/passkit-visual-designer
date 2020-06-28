import * as React from "react";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../CapitalHeaderTitle";
import { PageProps } from "./pages";
import PageNavigationContext from "./PageNavigationContext";

interface Props extends PageProps { }

export default function PageHeader(props: React.PropsWithChildren<Props>) {
	return (
		<PageNavigationContext.Consumer>
			{({ requestPageClosing }) => (
				<header>
					<div className="back" onClick={requestPageClosing}>
						<FieldsArrowIcon />
						<span>Back</span>
					</div>
					<CapitalHeaderTitle name={props.name} />
					{props.children}
				</header>
			)}
		</PageNavigationContext.Consumer>
	);
}
