import * as React from "react";
import "./style.less";
import { RegisteredFieldsMap } from "..";
import PanelGroup, { DataGroup } from "../PanelGroup";
import Panel, { FieldDetails } from "../Panel";
import { PageNavigation, PageProps, RequestPageCreationSignature } from "../pages/pages";
import PageNavigationContext from "../pages/PageNavigationContext";

interface NavigatorState {
	pagesHierarchy: [
		string,
		Parameters<RequestPageCreationSignature>[1],
		() => { [key: string]: any }
	][];
	activePanel: string;
}

interface NavigatorProps {
	fields: RegisteredFieldsMap;
}

export default class PanelNavigator extends React.Component<NavigatorProps, NavigatorState> implements PageNavigation {
	constructor(props: NavigatorProps) {
		super(props);

		this.state = {
			pagesHierarchy: [],
			activePanel: null,
		};

		this.requestPageCreation = this.requestPageCreation.bind(this);
		this.requestPageClosing = this.requestPageClosing.bind(this);
		this.selectOpenPanel = this.selectOpenPanel.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
	}

	requestPageCreation(identifier: string, PageElement: Parameters<RequestPageCreationSignature>[1], getContextProps?: () => { [key: string]: any }) {
		const page = this.state.pagesHierarchy.find(([id]) => id === identifier);

		if (page) {
			page[2] = getContextProps;
			return;
		}

		const PageComponent = (
			<PageElement
				name={identifier}
				requestPageCreation={this.requestPageCreation}
				requestPageClosing={this.requestPageClosing}
				{...(contextProps || {})}
			/>
		);

		this.setState((previousState) => {
			const pagesHierarchy = previousState.pagesHierarchy;
			pagesHierarchy.push([identifier, PageComponent, getContextProps]);
			return { pagesHierarchy };
		});
	}

	/**
	 * Removes the last page in the hierarchy
	 * with a MacOS-like fullscreen app closing
	 */

	requestPageClosing() {
		this.setState(previousState => {
			const pagesHierarchy = previousState.pagesHierarchy;
			pagesHierarchy.pop();
			return { pagesHierarchy };
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
		const pages = this.state.pagePanelsHierarchy.map(([_, page], index) => {
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
			<PageNavigationContext.Provider
				value={{
					requestPageClosing: this.requestPageClosing,
					requestPageCreation: this.requestPageCreation
				}}
			>
				<div className="panel-navigator" style={{ transform: `translate(-${this.state.pagesHierarchy.length * 100}%)` }}>
					<div className="page" key="mainPanel">
						{groups}
					</div>
					{pages}
				</div>
			</PageNavigationContext.Provider>
		);
	}
}
