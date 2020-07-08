import * as React from "react";
import "./style.less";
import { PanelProps } from "../..";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../../../CapitalHeaderTitle";
import FieldsPreviewPage from "../../../pages/FieldsPreviewPage";
import usePageFactory from "../../../pages/usePageFactory";

export interface FieldPanelProps extends PanelProps {
	value?: FieldProps[];
}

export default function FieldPanel(props: FieldPanelProps) {
	const { requestPageClosing, requestPageCreation, ...otherProps } = props;
	const pageCreationHandler = usePageFactory(FieldsPreviewPage, otherProps, undefined);

	const pageCreationClickHandler = React.useCallback(() => {
		pageCreationHandler(props.name, props.requestPageCreation);
	}, [props]);

	return (
		<>
			<div className="cta-edit" onClick={pageCreationClickHandler}>
				<div className="col-left">
					<CapitalHeaderTitle name={props.name} />
					<em>{`${props.value?.length ?? 0} fields for this area`}</em>
				</div>
				<FieldsArrowIcon />
			</div>
		</>
	);
}
