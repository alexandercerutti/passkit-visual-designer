import * as React from "react";
import "./style.less";
import { Constants } from "@pkvd/pass";
import { PanelProps } from "..";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";
import FieldsPreviewPage from "../../../FieldsPreviewPage";
import usePageFactory from "../../../usePageFactory";
import useContentSavingHandler from "../useContentSavingHandler";
import PageNavigationContext from "../../../PageNavigationContext";

type PassFieldKeys = Constants.PassFieldKeys;

interface Props extends PanelProps {
	value?: PassFieldKeys[];
}

export default function FieldPanel(props: Props) {
	const [fields, onFieldsChanged] = useContentSavingHandler(
		props.onValueChange,
		props.name,
		props.value || []
	);

	const { requestPageCreation } = React.useContext(PageNavigationContext);
	const pageCreationHandler = usePageFactory(FieldsPreviewPage, { value: fields }, onFieldsChanged);

	const pageCreationClickHandler = React.useCallback(() => {
		pageCreationHandler(props.name, requestPageCreation);
	}, [props]);

	if (props.isSelected) {
		setTimeout(() => {
			pageCreationHandler(props.name, requestPageCreation);
		}, 500);
	}

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
