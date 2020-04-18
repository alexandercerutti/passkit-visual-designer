import * as React from "react";
import "./style.less";
import Pass, { PassCoreProps, InteractionProvider } from "../../passes/PassCore";
import { PassKind } from "../../model";
import { PKTransitType } from "../../passes/constants";
import { InteractionContext } from "../../passes/PassCore/interactionContext";

export interface ViewerProps extends PassCoreProps {
	onVoidClick(e: React.MouseEvent): void;
}

export default function Viewer(props: ViewerProps) {
	const { passProps, registrationProps } = organizeViewerProps(props);

	return (
		<div className="viewer" onClick={(e) => props.onVoidClick(e)}>
			<InteractionProvider value={registrationProps}>
				{
					/**
					 * @TODO Replace with pass props once the redirect with
					 * no props will be ready or this will crash
					 */
				}
				<Pass
					kind={PassKind.BOARDING_PASS}
					transitType={PKTransitType.Boat}
					{...passProps} />
			</InteractionProvider>
		</div>
	);
}

/**
 * Splits Viewer Props in props for registering pass components
 * and props for the pass itself
 * @param param0
 */

function organizeViewerProps({ registerField, onFieldSelect, ...passProps }: ViewerProps): {
	passProps: PassCoreProps,
	registrationProps: InteractionContext
} {
	return {
		passProps,
		registrationProps: {
			registerField,
			onFieldSelect
		}
	}
}
