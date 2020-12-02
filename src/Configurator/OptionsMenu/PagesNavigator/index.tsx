import * as React from "react";
import "./style.less";
import { RegisteredFieldsMap } from "..";
import PanelsPage from "../pages/PanelsPage";
import PageNavigationContext from "../pages/PageNavigationContext";
import { RequestPageCreationFunction, PageNavigation, ContextPropsGetter } from "../pages/usePageFactory";
import { MediaProps, PassMixedProps } from "../../../Pass";
import { ShareIcon } from "../pages/PanelsPage/PanelGroup/icons";
import { createClassName } from "../../../utils";

interface NavigatorState {
	pagesHierarchy: Parameters<RequestPageCreationFunction>[];
}

interface NavigatorProps {
	selectedFieldID?: keyof PassMixedProps;
	fields: RegisteredFieldsMap;
	data: PassMixedProps;
	cancelFieldSelection(): void;
	onValueChange(key: string, value: any): Promise<boolean>;
	requestExport(): void;
	onMediaEditRequest(mediaName: keyof MediaProps): void;
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

	componentDidUpdate(prevProps: NavigatorProps) {
		const isCurrentPageSelected = this.state.pagesHierarchy[this.state.pagesHierarchy.length - 1]?.[0] === this.props.selectedFieldID;
		if (prevProps.selectedFieldID !== this.props.selectedFieldID && !isCurrentPageSelected) {
			this.requestPageClosing();
			return;
		}
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

	requestPageClosing(cancelSelection: boolean = false) {
		if (cancelSelection) {
			this.props.cancelFieldSelection();
		}

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

		const exportButtonClassName = createClassName(["menu-group"], {
			disabled: !this.props.requestExport
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
							selectedFieldID={this.props.selectedFieldID}
							onValueChange={this.props.onValueChange}
							onMediaEditRequest={this.props.onMediaEditRequest}
							fields={this.props.fields}
							data={this.props.data}
						/>
						<div className={exportButtonClassName} style={{ marginTop: "auto" }}>
							<div className="intro" onClick={() => this.props.requestExport?.()}>
								<h3>Export</h3>
								<ShareIcon className="icon" width="25px" height="25px" />
							</div>
						</div>
					</div>
					{pages}
				</div>
			</PageNavigationContext.Provider>
		);
	}
}
