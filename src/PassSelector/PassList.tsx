import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import { PassCoreProps } from "../passes/PassCore";
import { concatClassNames } from "../passes/utils";
import { NamedPassProps } from "./NamedPass";

interface PassListProps {
	onPassSelect: (passProps: PassCoreProps) => void;
	requiresAttention?: boolean;
	selectedKind?: PassKind;
}

type PassListPropsWithChildren = React.PropsWithChildren<PassListProps>;

export default function PassList(props: PassListPropsWithChildren): JSX.Element {
	const selectionTray = React.useRef<HTMLDivElement>(null);
	const { current: onPassClickHandlerRef } = React.useRef((event: React.MouseEvent, clickProps: PassCoreProps) => {
		event.stopPropagation();
		props.onPassSelect({ ...clickProps });
	});

	React.useEffect(() => void (
		props.requiresAttention &&
		selectionTray.current?.scrollIntoView({ behavior: "smooth", block: "end" })
	));

	const children = React.Children.map(props.children, (node: React.ReactElement<NamedPassProps>) => {
		const { kind, name, ...passProps } = node.props;
		const isHighlighted = kind === props.selectedKind;
		const className = concatClassNames("select", isHighlighted && "highlighted");

		return (
			<div
				className={className}
				data-pass={kind}
				onClick={(e) => onPassClickHandlerRef(e, { kind, ...passProps })}
			>
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
