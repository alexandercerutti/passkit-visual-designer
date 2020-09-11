import * as React from "react";
import "./style.less";
import Pass, { PassProps } from "../../Pass";
import InteractionContext, { InteractionContextMethods } from "../../Pass/InteractionContext";
import { createClassName } from "../../utils";

export interface ViewerProps extends PassProps {
	showEmpty: boolean;
	onVoidClick(e: React.MouseEvent): void;
}

export default function Viewer(props: ViewerProps) {
	const { passProps, registrationProps } = organizeViewerProps(props);

	const viewerCN = createClassName(["viewer"], {
		"no-empty": !props.showEmpty
	});

	return (
		<div className={viewerCN} onClick={(e) => props.onVoidClick(e)}>
			<InteractionContext.Provider value={registrationProps}>
				<Pass
					{...passProps}
					showBack={props.showBack}
				/>
			</InteractionContext.Provider>
		</div>
	);
}

/**
 * Splits Viewer Props in props for registering pass components
 * and props for the pass itself
 * @param param0
 */

function organizeViewerProps({ registerField, onFieldSelect, ...passProps }: ViewerProps): {
	passProps: PassProps,
	registrationProps: InteractionContextMethods
} {
	return {
		passProps,
		registrationProps: {
			registerField,
			onFieldSelect
		}
	}
}
