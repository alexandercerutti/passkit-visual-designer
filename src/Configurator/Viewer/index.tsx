import * as React from "react";
import "./style.less";
import Pass, { PassProps } from "../../Pass";
import { PassKind } from "../../model";
import { PKTransitType } from "../../Pass/constants";
import InteractionContext, { InteractionContextMethods } from "../../Pass/InteractionContext";
import { createClassName } from "../../utils";

export interface ViewerProps extends PassProps {
	showEmpty: boolean;
	onVoidClick(e: React.MouseEvent): void;
}

// Webpack valorized
declare const isDevelopment: boolean;

export default function Viewer(props: ViewerProps) {
	const { passProps, registrationProps } = organizeViewerProps(props);

	const viewerCN = createClassName(["viewer"], {
		"no-empty": !props.showEmpty
	});

	/**
	 * @TODO add a redirect to pass selection if we are not in development.
	 */
	const passComponentProps = isDevelopment || !Object.keys(passProps).length
		? {
			...passProps,
			transitType: PKTransitType.Boat,
			kind: PassKind.BOARDING_PASS,
			showBack: props.showBack,
		} : {
			...passProps,
			showBack: props.showBack,
		}

	return (
		<div className={viewerCN} onClick={(e) => props.onVoidClick(e)}>
			<InteractionContext.Provider value={registrationProps}>
				<Pass {...passComponentProps} />
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
