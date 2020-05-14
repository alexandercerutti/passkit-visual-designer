import * as React from "react";
import "./style.less";
import { RegisteredFieldsMap, DataGroup } from "..";
import PanelGroup from "../PanelGroup";
import Panel, { FieldDetails } from "../Panel";
import { TagIcon, ColorIcon, ImagesIcon, DataIcon } from "../PanelGroup/icons";

interface NavigatorState {
	pagePanelsHierarchy: React.ReactNode[];
	activePanel: string;
}

interface NavigatorProps {
	fields: RegisteredFieldsMap;
}

export default class PanelNavigator extends React.Component<NavigatorProps, NavigatorState> {
	icons = new Map([
		[DataGroup.METADATA, <TagIcon />],
		[DataGroup.COLORS, <ColorIcon />],
		[DataGroup.IMAGES, <ImagesIcon />],
		[DataGroup.DATA, <DataIcon />]
	]);

	constructor(props: NavigatorProps) {
		super(props);

		this.state = {
			pagePanelsHierarchy: [],
			activePanel: null,
		};

		this.requestPageCreation = this.requestPageCreation.bind(this);
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

	saveChanges<T>(name: string, data: T) {
		console.log("Panel with name", name, "tried to save", data);
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

		const groups = Array.from<[DataGroup, FieldDetails[]], JSX.Element>(this.props.fields.entries(), ([group, details]) => {
			return (
				<PanelGroup
					name={group}
					key={group}
					isActive={group === this.state.activePanel}
					setActive={this.selectOpenPanel}
					icon={this.icons.get(group)}
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
								onValueChange={this.saveChanges}
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
