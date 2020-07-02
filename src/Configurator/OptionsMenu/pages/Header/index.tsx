import * as React from "react";
import "./style.less";
import { FieldsArrowIcon } from "../icons";
import CapitalHeaderTitle from "../../CapitalHeaderTitle";
import { PageProps } from "../pages";
import PageNavigationContext from "../PageNavigationContext";

interface Props extends Partial<PageProps> { }

export default function PageHeader(props: React.PropsWithChildren<Props>) {
	return (
		<PageNavigationContext.Consumer>
			{({ requestPageClosing }) => (
				<header>
					<div className="back" onClick={requestPageClosing}>
						<FieldsArrowIcon />
						<span>Back</span>
					</div>
					{props.name && <CapitalHeaderTitle name={props.name} />}
					{props.children}
				</header>
			)}
		</PageNavigationContext.Consumer>
	);
}
