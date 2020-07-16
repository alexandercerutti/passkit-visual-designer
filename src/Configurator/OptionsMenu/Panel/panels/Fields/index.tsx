import * as React from "react";
import "./style.less";
import { PanelProps } from "../..";
import { PassFieldKeys } from "../../../../../passes/constants";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../../../CapitalHeaderTitle";
import FieldsPreviewPage from "../../../pages/FieldsPreviewPage";
import usePageFactory from "../../../pages/usePageFactory";

export interface FieldPanelProps extends PanelProps {
	value?: PassFieldKeys[];
}

export default function FieldPanel(props: FieldPanelProps) {
	const [fields, setFields] = React.useState(props.value || []);
	// @TODO remove onValueChanged from otherProps
	const pageCreationHandler = usePageFactory(FieldsPreviewPage, { value: fields }, setFields);

	const pageCreationClickHandler = React.useCallback(() => {
		pageCreationHandler(props.name, props.requestPageCreation);
	}, [props]);

	return (
		<>
			<div className="cta-edit" onClick={pageCreationClickHandler}>
				<div className="col-left">
					<CapitalHeaderTitle name={props.name} />
					<em>{`${fields.length} fields for this area`}</em>
				</div>
				<FieldsArrowIcon />
			</div>
		</>
	);
}
