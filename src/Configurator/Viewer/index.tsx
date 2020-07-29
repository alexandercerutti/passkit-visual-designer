import * as React from "react";
import "./style.less";
import Pass, { PassProps, InteractionProvider } from "../../Pass";
import { PassKind } from "../../model";
import { PKTransitType } from "../../Pass/constants";
import { InteractionContext } from "../../Pass/interactionContext";

export interface ViewerProps extends PassProps {
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
					transitType={PKTransitType.Boat}
					{...passProps}
					kind={PassKind.BOARDING_PASS}
				/>
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
	passProps: PassProps,
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
