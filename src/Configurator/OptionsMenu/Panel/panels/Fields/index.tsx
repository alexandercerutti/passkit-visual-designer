import * as React from "react";
import "./style.less";
import { PanelProps } from "../..";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../../../CapitalHeaderTitle";
import FieldsPreviewPage from "../../../pages/FieldsPreviewPage";

export interface FieldPanelProps extends PanelProps {
	value?: FieldProps[];
}

export default function FieldPanel(props: FieldPanelProps) {
	const { current: pageCreationClickHandler } = React.useRef(() => {
		const { requestPageClosing, requestPageCreation, ...otherProps } = props;

		requestPageCreation("fieldsPage",
			<FieldsPreviewPage
				{...otherProps}
				requestPageCreation={requestPageCreation}
				requestPageClosing={requestPageClosing}
			/>
		);
	});

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
