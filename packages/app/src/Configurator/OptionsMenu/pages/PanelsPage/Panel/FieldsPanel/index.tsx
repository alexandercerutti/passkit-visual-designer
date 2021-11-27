import * as React from "react";
import "./style.less";
import { PKPassLayout } from "@pkvd/pkpass";
import { Pass } from "@pkvd/passkit-types";
import { SharedPanelProps } from "..";
import { FieldsArrowIcon } from "./icons";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";

interface Props extends SharedPanelProps {
	onSelect(name: string): void;
	value?: Pass.PassFieldContent[];
}

export default function FieldPanel(props: Props) {
	return (
		<div className={`panel ${PKPassLayout.FieldKind.FIELDS}`} data-name={props.name}>
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
