import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import { PassCoreProps } from "../passes/PassCore";

interface PassListProps {
	onPassSelect: (kind: PassKind) => void;
}

type PassListPropsWithChildren = React.PropsWithChildren<PassListProps>;

export default function PassList(props: PassListPropsWithChildren): JSX.Element {
	const [selected, setSelected] = React.useState(false);

	const onNodeSelection = (kind: PassKind) => {
		setSelected(true);
		props.onPassSelect(kind);
	}

	const children = React.Children.map(props.children, (node: React.ReactElement<PassCoreProps>) => {
		return (
			<div className="select" onClick={(e) => { e.stopPropagation(); onNodeSelection(node.props.kind) }}>
				{node}
			</div>
		)
	});

	return (
		<div id="pass-selection" className={selected && "selected" || ""}>
			{children}
		</div>
	);
}
