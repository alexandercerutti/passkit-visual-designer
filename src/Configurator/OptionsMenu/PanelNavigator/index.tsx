import * as React from "react";
import "./style.less";
import { RegisteredFieldsMap } from "..";
import PanelGroup from "../PanelGroup";
import Panel from "../Panel";

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
		this.selectOpenPanel = this.selectOpenPanel.bind(this);
	}

	requestPageCreation(children: React.ReactNode) {
		this.setState((previousState) => {
			const pagePanelsHierarchy = previousState.pagePanelsHierarchy;
			pagePanelsHierarchy.push(children);
			return { pagePanelsHierarchy };
		});
	}

	selectOpenPanel(panelName: string) {
		this.setState(previous => ({
			activePanel: previous.activePanel !== panelName && panelName || null
		}));
	}

	render() {
		const pages = this.state.pagePanelsHierarchy.map(page => {
			return (
				<div className="page">
					{page}
				</div>
			);
		});

		const groups = Array.from(this.props.fields.entries(), ([group, details]) => {
			return (
				<PanelGroup
					name={group}
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
							/>
						);
					}))}
				</PanelGroup>
			);
		});

		return (
			<div className="panel-navigator">
				<div className="page">
					{groups}
				</div>
				{pages}
			</div>
		);
	}
}
