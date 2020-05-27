import * as React from "react";
import Pass, { PassCoreProps } from "../passes/PassCore";

/**
 * This is pretty stupid component.
 * It only has the role to keep a name associated to the Pass
 * Component we are going to render without getting it dirty
 * and keeping it reusable.
 *
 * @param props
 */

export interface NamedPassProps extends PassCoreProps {
	name: string;
}

export default function NamedPass(props: NamedPassProps): JSX.Element {
	const { name, ...passProps } = props;

	return (
		<>
			<Pass {...passProps} />
			<div className="name">
				{name}
			</div>
		</>
	);
}
