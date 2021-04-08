import * as React from "react";
import "./style.less";
import { PassMediaProps, PassMixedProps } from "@pkvd/pass";
import PanelsPage, { DataGroup } from "./pages/PanelsPage";
import PageNavigationContext from "./pages/PageNavigationContext";
import {
	RequestPageCreationFunction,
	PageNavigation,
	ContextPropsGetter,
} from "./pages/usePageFactory";
import { ShareIcon } from "./pages/PanelsPage/icons";
import { createClassName } from "../../utils";
import { FieldDetails } from "./pages/PanelsPage/Panel";
import type RegistrationIndex from "../RegistrationIndex";

interface NavigatorState {
	pagesHierarchy: Parameters<RequestPageCreationFunction>[];
}

interface NavigatorProps {
	selectedRegistrable?: FieldDetails;
	fields: RegistrationIndex;
	data: PassMixedProps;
	cancelFieldSelection(): void;
	onValueChange(key: string, value: any): Promise<boolean>;
	requestExport(): void;
	onMediaEditRequest(mediaName: keyof PassMediaProps): void;
}

export default class OptionsMenu
	extends React.Component<NavigatorProps, NavigatorState>
	implements PageNavigation {
	constructor(props: NavigatorProps) {
		super(props);

		this.state = {
			pagesHierarchy: [],
		};

		this.requestPageCreation = this.requestPageCreation.bind(this);
		this.requestPageClosing = this.requestPageClosing.bind(this);
	}

	componentDidUpdate(prevProps: NavigatorProps) {
		const isCurrentPageSelected =
			this.state.pagesHierarchy[this.state.pagesHierarchy.length - 1]?.[0] ===
			this.props.selectedRegistrable?.name;

		if (
			prevProps.selectedRegistrable !== this.props.selectedRegistrable &&
			!isCurrentPageSelected
		) {
			this.requestPageClosing();
			return;
		}
	}

	requestPageCreation(
		identifier: string,
		PageElement: Parameters<RequestPageCreationFunction>[1],
		getContextProps?: ContextPropsGetter<React.ComponentProps<typeof PageElement>>
	) {
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

		this.setState((previousState) => {
			const pagesHierarchy = previousState.pagesHierarchy;
			pagesHierarchy.pop();
			return { pagesHierarchy };
		});
	}

	render() {
		const pages = this.state.pagesHierarchy.map(([id, PageElement, getContextProps], index) => {
			return (
				<div className="page" key={`panel-depth${index + 1}`}>
					<PageElement name={id} {...getContextProps()} />
				</div>
			);
		});

		const exportButtonClassName = createClassName(["export-btn"], {
			disabled: !this.props.requestExport,
		});

		return (
			<div
				id="pages-navigator"
				style={{ transform: `translate(-${this.state.pagesHierarchy.length * 100}%)` }}
			>
				<PageNavigationContext.Provider
					value={{
						requestPageClosing: this.requestPageClosing,
						requestPageCreation: this.requestPageCreation,
					}}
				>
					<div className="page" key="panel-depth0">
						<PanelsPage
							selectedRegistrable={this.props.selectedRegistrable}
							onValueChange={this.props.onValueChange}
							onMediaEditRequest={this.props.onMediaEditRequest}
							fields={this.props.fields}
							data={this.props.data}
						/>
						<div className={exportButtonClassName} onClick={() => this.props.requestExport?.()}>
							<h3>Export</h3>
							<ShareIcon className="icon" width="25px" height="25px" />
						</div>
					</div>
					{pages}
				</PageNavigationContext.Provider>
			</div>
		);
	}
}
