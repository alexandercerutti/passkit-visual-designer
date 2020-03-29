import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import { PassCoreProps } from "../passes/PassCore";
import { concatClassNames } from "../passes/utils";

interface PassListProps {
	onPassSelect: (kind: PassKind) => void;
	requiresAttention?: boolean;
	selectedKind?: PassKind;
}

type PassListPropsWithChildren = React.PropsWithChildren<PassListProps>;

export default function PassList(props: PassListPropsWithChildren): JSX.Element {
	const [selected, setSelected] = React.useState(false);
	const selectionTray = React.useRef<HTMLDivElement>(null);

	if (props.requiresAttention) {
		React.useEffect(() => {
			selectionTray.current &&
				selectionTray.current.scrollIntoView({ behavior: "smooth", block: "end" })
		});
	}

	const onNodeSelection = (kind: PassKind) => {
		setSelected(true);
		props.onPassSelect(kind);
	}

	const children = React.Children.map(props.children, (node: React.ReactElement<PassCoreProps>) => {
		const isHighlighted = node.props.kind === props.selectedKind;
		const className = concatClassNames("select", isHighlighted && "highlighted");

		return (
			<div className={className} onClick={(e) => { e.stopPropagation(); onNodeSelection(node.props.kind) }}>
				{node}
			</div>
		)
	});

	const className = concatClassNames(children.length > 2 ? "space-first" : "element-first", props.selectedKind && "selection-active");

	return (
		<div className="pass-list" ref={selectionTray}>
			<div id="slidable" className={className}>
				{children}
			</div>
		</div>
	);
}
