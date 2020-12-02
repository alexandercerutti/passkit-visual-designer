import * as React from "react";
import "./style.less";
import { PanelProps } from "..";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";
import { ArrowIcon } from "./icons";

interface ImagePanelProps extends PanelProps {
	value?: Function;
}

export default function ImagePanel(props: ImagePanelProps) {
	return (
		<>
			<CapitalHeaderTitle name={props.name} />
			<div onClick={() => props.value(props.name)}>
				<span>Open media editor</span>
				<ArrowIcon className="go-editor-arrow" />
			</div>
		</>
	);
}
