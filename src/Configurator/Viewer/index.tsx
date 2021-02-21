import * as React from "react";
import "./style.less";
import Pass, { PassProps } from "../../Pass";
import InteractionContext, { InteractionContextMethods } from "../../Pass/InteractionContext";
import { createClassName } from "../../utils";

export interface ViewerProps extends Pick<PassProps, "registerField" | "onFieldSelect" | "showBack"> {
	passProps: PassProps;
	showEmpty: boolean;
	onVoidClick(e: React.MouseEvent): void;
	projectTitle?: string;
	changeProjectTitle(title: string): void;
}

export default function Viewer(props: ViewerProps) {
	const { changeProjectTitle, onVoidClick, projectTitle = "", showBack, registerField, onFieldSelect, passProps } = props;
	const registrationProps = { registerField, onFieldSelect };

	const viewerCN = createClassName(["viewer"], {
		"no-empty": !props.showEmpty
	});

	const projectTitleOnFocusHandler = React.useCallback(({ currentTarget }: React.FocusEvent<HTMLInputElement>) => {
		// To select all the text in the input - figma style
		currentTarget.select();
	}, []);

	const projectTitleOnKeyDownHandler = React.useCallback(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		key === "Enter" && currentTarget.blur();
	}, []);

	const projectTitleOnBlurHandler = React.useCallback(({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = currentTarget;
		changeProjectTitle(value || undefined);
	}, []);

	return (
		<div className={viewerCN} onClick={onVoidClick}>
			<div className="project-title-box">
				<input
					type="text"
					defaultValue={projectTitle}
					placeholder="Untitled Project"
					onFocus={projectTitleOnFocusHandler}
					onKeyDown={projectTitleOnKeyDownHandler}
					onBlur={projectTitleOnBlurHandler}
				/>
			</div>
			<InteractionContext.Provider value={registrationProps}>
				<Pass
					{...passProps}
					showBack={showBack}
				/>
			</InteractionContext.Provider>
		</div>
	);
}
