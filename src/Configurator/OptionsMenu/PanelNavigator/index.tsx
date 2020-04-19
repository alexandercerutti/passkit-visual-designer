import * as React from "react";
import "./style.less";

interface NavigatorState {
	pagePanelsHierarchy: React.ReactNode[];
}

interface NavigatorProps {

}

export default class PanelNavigator extends React.Component<React.PropsWithChildren<NavigatorProps>, NavigatorState> {
	constructor(props: any) {
		super(props);

		this.state = {
			pagePanelsHierarchy: []
		};

		this.requestPageCreation = this.requestPageCreation.bind(this);
	}

	requestPageCreation(children: React.ReactNode) {
		this.setState((previousState) => {
			const pagePanelsHierarchy = previousState.pagePanelsHierarchy;
			pagePanelsHierarchy.push(children);
			return { pagePanelsHierarchy };
		});
	}

	render() {
		const pages = this.state.pagePanelsHierarchy.map(page => {
			return (
				<div className="page">
					{page}
				</div>
			);
		});

		return (
			<div className="panel-navigator">
				<div className="page">
					{this.props.children}
				</div>
				{pages}
			</div>
		);
	}
}
