import * as React from "react";
import "./style.less";
import { PassMixedProps, PassKind } from "@pkvd/pkpass";
import { createClassName } from "../utils";
import { SelectablePassProps } from "./SelectablePass";

interface PassListProps {
	onPassSelect(passProps: PassMixedProps): void;
	requiresAttention?: boolean;
	selectedKind?: PassKind;
}

type PassListPropsWithChildren = React.PropsWithChildren<PassListProps>;

export default function PassList(props: PassListPropsWithChildren): JSX.Element {
	const selectionTray = React.useRef<HTMLDivElement>(null);

	const onPassClickHandler = React.useCallback(
		(event: React.MouseEvent, clickProps: PassMixedProps) => {
			event.stopPropagation();
			props.onPassSelect({ ...clickProps });
		},
		[]
	);

	React.useEffect(
		() =>
			void (
				props.requiresAttention &&
				selectionTray.current?.scrollIntoView({ behavior: "smooth", block: "end" })
			)
	);

	const children = React.Children.map(
		props.children,
		(node: React.ReactElement<SelectablePassProps>) => {
			const { kind, name, ...passProps } = node.props;
			const className = createClassName(["select"], {
				highlighted: kind === props.selectedKind,
			});

			return (
				<div
					className={className}
					data-pass-kind={kind}
					onClick={(e) => onPassClickHandler(e, { kind, ...passProps })}
				>
					{node}
				</div>
			);
		}
	);

	const className = createClassName([], {
		"space-first": children.length > 2,
		"element-first": children.length <= 2,
		"selection-active": props.selectedKind,
	});

	return (
		<div className="pass-list" ref={selectionTray}>
			<div id="slidable" className={className}>
				{children}
			</div>
		</div>
	);
}
