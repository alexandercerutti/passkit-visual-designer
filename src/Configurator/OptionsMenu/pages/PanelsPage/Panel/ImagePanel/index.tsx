import * as React from "react";
import "./style.less";
import { SharedPanelProps } from "..";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";
import { ArrowIcon } from "./icons";
import { FieldKind } from "../../../../../../model";

interface ImagePanelProps extends SharedPanelProps {
	value?: Function;
}

export default function ImagePanel(props: ImagePanelProps) {
	return (
		<div className={`panel ${FieldKind.IMAGE}`} data-name={props.name}>
			<CapitalHeaderTitle name={props.name} />
			<div onClick={() => props.value(props.name)}>
				<span>Open media editor</span>
				<ArrowIcon className="go-editor-arrow" />
			</div>
		</div>
	);
}
