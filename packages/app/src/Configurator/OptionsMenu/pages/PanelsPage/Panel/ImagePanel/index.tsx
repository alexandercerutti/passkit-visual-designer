import * as React from "react";
import "./style.less";
import { PassMediaProps, PKPassLayout } from "@pkvd/PKPass";
import { SharedPanelProps } from "..";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";
import { ArrowIcon } from "./icons";

interface ImagePanelProps<T extends string = string> extends SharedPanelProps {
	name: T;
	onSelect(mediaName: T): void;
}

export default function ImagePanel(props: ImagePanelProps<keyof PassMediaProps>) {
	return (
		<div className={`panel ${PKPassLayout.FieldKind.IMAGE}`} data-name={props.name}>
			<CapitalHeaderTitle name={props.name} />
			<div onClick={() => props.onSelect(props.name)}>
				<span>Open media editor</span>
				<ArrowIcon className="go-editor-arrow" />
			</div>
		</div>
	);
}
