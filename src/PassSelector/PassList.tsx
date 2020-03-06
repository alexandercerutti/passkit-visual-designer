import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import { PassProps } from "../passes/PassCore";

interface PassListProps {
	onPassSelect: (kind: PassKind) => void;
}

type PassListPropsWithChildren = React.PropsWithChildren<PassListProps>;

export default function PassList(props: PassListPropsWithChildren): JSX.Element {
	const children = React.Children.map(props.children, (node: React.ReactElement<PassProps>) => {
		return (
			<div className="select" onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				props.onPassSelect(node.props.kind)
			}}>
				{node}
			</div>
		)
	})

	return (
		<div id="pass-selection" className="first-step">
			{children}
		</div>
	);
}
