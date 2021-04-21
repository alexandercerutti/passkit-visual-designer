import * as React from "react";
import "./style.less";
import { Constants } from "@pkvd/pass";
import { SharedPanelProps } from "..";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";
import useContentSavingHandler from "../useContentSavingHandler";
import { FieldKind } from "../../../../../../model";

type PassField = Constants.PassField;

interface Props extends SharedPanelProps {
	onSelect(name: string): void;
	value?: PassField[];
}

export default function FieldPanel(props: Props) {
	return (
		<div className={`panel ${FieldKind.FIELDS}`} data-name={props.name}>
			<div className="cta-edit" onClick={() => props.onSelect(props.name)}>
				<div className="col-left">
					<CapitalHeaderTitle name={props.name} />
					<span>{`${props.value?.length ?? 0} fields for this area`}</span>
				</div>
				<FieldsArrowIcon />
			</div>
		</div>
	);
}
