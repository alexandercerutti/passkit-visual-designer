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

interface NamedPassProps extends PassCoreProps {
	name: string;
}

export default function NamedPass(props: React.PropsWithChildren<NamedPassProps>): JSX.Element {
	const passProps = (({ name, ...otherProps }) => ({ ...otherProps }))(props);

	return (
		<>
			<Pass {...passProps} />
			<div className="name">
				{props.name}
			</div>
		</>
	);
}
