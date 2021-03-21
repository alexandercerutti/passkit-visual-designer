import * as React from "react";
import "./style.less";
import FieldsArrowIcon from "../../icons";
import CapitalHeaderTitle from "../CapitalHeaderTitle";
import { PageProps } from "../../usePageFactory";
import PageNavigationContext from "../../PageNavigationContext";

interface Props extends Partial<PageProps> {}

export default function PageHeader(props: React.PropsWithChildren<Props>) {
	const { requestPageClosing } = React.useContext(PageNavigationContext);

	return (
		<header>
			<div className="back" onClick={() => requestPageClosing(true)}>
				<FieldsArrowIcon />
				<span>Back</span>
			</div>
			{props.name && <CapitalHeaderTitle name={props.name} />}
			{props.children}
		</header>
	);
}
