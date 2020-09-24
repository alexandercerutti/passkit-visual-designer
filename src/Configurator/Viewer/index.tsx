import * as React from "react";
import "./style.less";
import Pass, { PassProps } from "../../Pass";
import InteractionContext, { InteractionContextMethods } from "../../Pass/InteractionContext";
import { createClassName } from "../../utils";

export interface ViewerProps extends PassProps {
	showEmpty: boolean;
	onVoidClick(e: React.MouseEvent): void;
	projectTitle?: string;
	changeProjectTitle(title: string): void;
}

export default function Viewer(props: ViewerProps) {
	const { passProps, registrationProps } = organizeViewerProps(props);

	const viewerCN = createClassName(["viewer"], {
		"no-empty": !props.showEmpty
	});

	const projectTitleOnFocusHandler = React.useRef(({ currentTarget }: React.FocusEvent<HTMLInputElement>) => {
		// To select all the text in the input - figma style
		currentTarget.select();
	});

	const projectTitleOnKeyDownHandler = React.useRef(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		key === "Enter" && currentTarget.blur();
	});

	const projectTitleOnBlurHandler = React.useRef(({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = currentTarget;
		props.changeProjectTitle(value || undefined);
	});

	return (
		<div className={viewerCN} onClick={(e) => props.onVoidClick(e)}>
			<div className="project-title-box">
				<input
					type="text"
					defaultValue={props.projectTitle || ""}
					placeholder="Untitled Project"
					onFocus={projectTitleOnFocusHandler.current}
					onKeyDown={projectTitleOnKeyDownHandler.current}
					onBlur={projectTitleOnBlurHandler.current}
				/>
			</div>
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
