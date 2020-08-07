import * as React from "react";
import "./style.less";
import { RegisteredFieldsMap } from "..";
import PanelsPage from "../pages/PanelsPage";
import PageNavigationContext from "../pages/PageNavigationContext";
import { RequestPageCreationFunction, PageNavigation, ContextPropsGetter } from "../pages/usePageFactory";
import { PassMixedProps } from "../../../Pass";

interface NavigatorState {
	pagesHierarchy: Parameters<RequestPageCreationFunction>[];
}

interface NavigatorProps {
	fields: RegisteredFieldsMap;
	data: PassMixedProps;
	onValueChange(key: string, value: any): Promise<boolean>;
}

export default class PagesNavigator extends React.Component<NavigatorProps, NavigatorState> implements PageNavigation {
	constructor(props: NavigatorProps) {
		super(props);

		this.state = {
			pagesHierarchy: [],
		};

		this.requestPageCreation = this.requestPageCreation.bind(this);
		this.requestPageClosing = this.requestPageClosing.bind(this);
	}

	requestPageCreation(identifier: string, PageElement: Parameters<RequestPageCreationFunction>[1], getContextProps?: ContextPropsGetter<React.ComponentProps<typeof PageElement>>) {
		const page = this.state.pagesHierarchy.find(([id]) => id === identifier);

		if (page) {
			page[2] = getContextProps;
			return;
		}

		this.setState((previousState) => {
			const pagesHierarchy = previousState.pagesHierarchy;
			pagesHierarchy.push([identifier, PageElement, getContextProps]);
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

	render() {
		const pages = this.state.pagesHierarchy.map(([id, PageElement, getContextProps], index) => {
			return (
				<div className="page" key={`panel-depth${index + 1}`}>
					<PageElement
						name={id}
						requestPageCreation={this.requestPageCreation}
						requestPageClosing={this.requestPageClosing}
						{...getContextProps()}
					/>
				</div>
			);
		});

		return (
			<PageNavigationContext.Provider
				value={{
					requestPageClosing: this.requestPageClosing,
					requestPageCreation: this.requestPageCreation
				}}
			>
				<div className="pages-navigator" style={{ transform: `translate(-${this.state.pagesHierarchy.length * 100}%)` }}>
					<div className="page" key="panel-depth0">
						<PanelsPage
							onValueChange={this.props.onValueChange}
							fields={this.props.fields}
							data={this.props.data}
						/>
					</div>
					{pages}
				</div>
			</PageNavigationContext.Provider>
		);
	}
}
