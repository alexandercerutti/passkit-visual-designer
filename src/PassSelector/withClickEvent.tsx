import * as React from "react"
import Pass from "../passes/base"

interface ClickableProps {
	onClick(e: React.MouseEvent | Event): void;
	children: React.ReactNode;
}

/**
 * Adds a click event on the wrapped pass
 * with a safe wrapper
 *
 * @param WrappedPass
 * @param clickFunction
 */

export default function withClickEvent(WrappedPass: React.ComponentType<Pass["props"]>, clickFunction: ClickableProps["onClick"]) {
	return class extends React.Component<Pass["props"]> {
		onClickSafe(e: React.MouseEvent | Event) {
			e.stopPropagation();
			clickFunction(e);
		}

		render(): JSX.Element {
			return (
				<WrappedPass onClick={this.onClickSafe} {...this.props} />
			);
		}
	}
}
