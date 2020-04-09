import * as React from "react";
import "./style.less";
import Pass, { PassCoreProps, InteractionProvider } from "../../passes/PassCore";
import { PassKind } from "../../model";
import { PKTransitType } from "../../passes/constants";
import { InteractionContext } from "../../passes/PassCore/interactionContext";

export interface ViewerProps extends PassCoreProps { }

export default function Viewer(props: ViewerProps) {
	const propsWithoutRegistration: PassCoreProps = (({ registerField, onFieldSelect, ...otherProps }) => ({ ...otherProps }))(props);
	const registrationProps: InteractionContext = (({ registerField, onFieldSelect }) => ({ registerField, onFieldSelect }))(props);

	return (
		<div className="viewer">
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
					{...propsWithoutRegistration} />
			</InteractionProvider>
		</div>
	);
}
