import * as React from "react";
import "./style.less";
import { PanelProps } from "../..";
import { PassFieldKeys } from "../../../../../../../passes/constants";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../../../../../CapitalHeaderTitle";
import FieldsPreviewPage from "../../../../FieldsPreviewPage";
import usePageFactory from "../../../../usePageFactory";

interface Props extends PanelProps {
	value?: PassFieldKeys[];
}

export default function FieldPanel(props: Props) {
	const [fields, setFields] = React.useState(props.value || []);
	const pageCreationHandler = usePageFactory(FieldsPreviewPage, { value: fields }, setFields);

	const pageCreationClickHandler = React.useCallback(() => {
		pageCreationHandler(props.name, props.requestPageCreation);
	}, [props]);

	return (
		<div className="cta-edit" onClick={pageCreationClickHandler}>
			<div className="col-left">
				<CapitalHeaderTitle name={props.name} />
				<span>{`${fields.length} fields for this area`}</span>
			</div>
			<FieldsArrowIcon />
		</div>
	);
}
