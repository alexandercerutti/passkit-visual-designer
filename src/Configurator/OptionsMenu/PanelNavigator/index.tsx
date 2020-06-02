import * as React from "react";
import "./style.less";
import { RegisteredFieldsMap } from "..";
import PanelGroup, { DataGroup } from "../PanelGroup";
import Panel, { FieldDetails } from "../Panel";

interface NavigatorState {
	pagePanelsHierarchy: React.ReactNode[];
	activePanel: string;
}

interface NavigatorProps {
	fields: RegisteredFieldsMap;
}

export default class PanelNavigator extends React.Component<NavigatorProps, NavigatorState> {
	constructor(props: NavigatorProps) {
		super(props);

		this.state = {
			pagePanelsHierarchy: [],
			activePanel: null,
		};

		this.requestPageCreation = this.requestPageCreation.bind(this);
		this.requestPageClosing = this.requestPageClosing.bind(this);
		this.selectOpenPanel = this.selectOpenPanel.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
	}

	requestPageCreation(children: React.ReactNode) {
		this.setState((previousState) => {
			const pagePanelsHierarchy = previousState.pagePanelsHierarchy;
			pagePanelsHierarchy.push(children);
			return { pagePanelsHierarchy };
		});
	}

	/**
	 * Removes the last page in the hierarchy
	 * with a MacOS-like fullscreen app closing
	 */

	requestPageClosing() {
		this.setState(previousState => {
			const pagePanelsHierarchy = previousState.pagePanelsHierarchy;
			pagePanelsHierarchy.pop();
			return { pagePanelsHierarchy };
		});
	}

	saveChanges<T>(name: string, data: T) {
		console.log("Panel with name", name, "tried to save", data);
	}

	selectOpenPanel(panelName: string) {
		this.setState(previous => ({
			activePanel: previous.activePanel !== panelName && panelName || null
		}));
	}

	render() {
		const pages = this.state.pagePanelsHierarchy.map((page, index) => {
			return (
				<div className="page" key={`panel-depth${index}`}>
					{page}
				</div>
			);
		});

		const groups = Array.from<[DataGroup, FieldDetails[]], JSX.Element>(this.props.fields.entries(), ([group, details]) => {
			return (
				<PanelGroup
					group={group}
					key={group}
					isActive={group === this.state.activePanel}
					setActive={this.selectOpenPanel}
				>
					{details.map((data => {
						const { kind, name, ...otherData } = data;
						return (
							<Panel
								name={name}
								kind={kind}
								data={otherData}
								key={name}
								requestPageCreation={this.requestPageCreation}
								requestPageClosing={this.requestPageClosing}
								onValueChange={this.saveChanges}
							/>
						);
					}))}
				</PanelGroup>
			);
		});

		return (
			<div className="panel-navigator" style={{ transform: `translate(-${this.state.pagePanelsHierarchy.length * 100}%)` }}>
				<div className="page" key="mainPanel">
					{groups}
				</div>
				{pages}
			</div>
		);
	}
}
