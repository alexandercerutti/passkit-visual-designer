import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import { PassProps } from "../Pass";
import { createClassName } from "../utils";
import { NamedPassProps } from "./NamedPass";

interface PassListProps {
	onPassSelect: (passProps: PassProps) => void;
	requiresAttention?: boolean;
	selectedKind?: PassKind;
}

type PassListPropsWithChildren = React.PropsWithChildren<PassListProps>;

export default function PassList(props: PassListPropsWithChildren): JSX.Element {
	const selectionTray = React.useRef<HTMLDivElement>(null);
	const { current: onPassClickHandlerRef } = React.useRef((event: React.MouseEvent, clickProps: PassProps) => {
		event.stopPropagation();
		props.onPassSelect({ ...clickProps });
	});

	React.useEffect(() => void (
		props.requiresAttention &&
		selectionTray.current?.scrollIntoView({ behavior: "smooth", block: "end" })
	));

	const children = React.Children.map(props.children, (node: React.ReactElement<NamedPassProps>) => {
		const { kind, name, ...passProps } = node.props;
		const className = createClassName(["select"], {
			"highlighted": kind === props.selectedKind
		});

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

	const className = createClassName([], {
		"space-first": children.length > 2,
		"element-first": children.length <= 2,
		"selection-active": props.selectedKind
	});

	return (
		<div className="pass-list" ref={selectionTray}>
			<div id="slidable" className={className}>
				{children}
			</div>
		</div>
	);
}
