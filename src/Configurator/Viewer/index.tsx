import * as React from "react";
import "./style.less";
import Pass, { PassProps } from "../../Pass";
import InteractionContext from "../../Pass/InteractionContext";
import { createClassName } from "../../utils";
import CommittableTextInput from "../CommittableTextInput";

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

	return (
		<div className={viewerCN} onClick={onVoidClick}>
			<div className="project-title-box">
				<CommittableTextInput
					selectOnFocus
					defaultValue={projectTitle}
					placeholder="Untitled Project"
					commit={changeProjectTitle}
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
