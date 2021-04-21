import * as React from "react";
import "./style.less";
import { PassMediaProps, PassMixedProps } from "@pkvd/pass";
import PanelsPage from "./pages/PanelsPage";
import PageNavigationContext, { PageNavigation } from "./pages/PageNavigationContext";
import { FieldDetails } from "./pages/PanelsPage/Panel";
import type RegistrationIndex from "../RegistrationIndex";
import PagesList from "./pages/PagesList";

interface NavigatorState {
	pagesAmount: number;
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

export default class OptionsMenu extends React.Component<NavigatorProps, NavigatorState> {
	// implements PageNavigation {
	constructor(props: NavigatorProps) {
		super(props);

		this.state = {
			pagesAmount: 0,
		};

		/* 		this.requestPageCreation = this.requestPageCreation.bind(this);
		this.requestPageClosing = this.requestPageClosing.bind(this);
 */
		this.recalculatePagesAmount = this.recalculatePagesAmount.bind(this);
	}

	componentDidUpdate(prevProps: NavigatorProps) {
		/* 		const isCurrentPageSelected =
			this.state.pagesHierarchy[this.state.pagesHierarchy.length - 1]?.[0] ===
			this.props.selectedRegistrable?.name; */

		if (
			prevProps.selectedRegistrable !== this.props.selectedRegistrable //&&
			// !isCurrentPageSelected
		) {
			// this.requestPageClosing();
			return;
		}
	}

	recalculatePagesAmount() {
		this.setState({
			pagesAmount: PagesList.length,
		});
	}

	/* 	requestPageCreation(identifier: string,
		PageElement: Parameters<RequestPageCreationFunction>[1],
		getContextProps?: ContextPropsGetter<React.ComponentProps<typeof PageElement>>) {
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
	} */

	/**
	 * Removes the last page in the hierarchy
	 * with a MacOS-like fullscreen app closing
	 */

	/* 	requestPageClosing(cancelSelection: boolean = false) {
		if (cancelSelection) {
			this.props.cancelFieldSelection();
		}

		this.setState((previousState) => {
			const pagesHierarchy = previousState.pagesHierarchy;
			pagesHierarchy.pop();
			return { pagesHierarchy };
		});
	} */

	render() {
		/* 		const pages = this.state.pagesHierarchy.map(([id, PageElement, getContextProps], index) => {
			return <PageElement name={id} {...getContextProps?.()} key={`panel-depth${index + 1}`} />;
		});*/

		return (
			<div
				id="pages-navigator"
				style={{ transform: `translate(-${this.state.pagesAmount * 100}%)` }}
			>
				<PageNavigationContext.Provider
					value={{
						requestPageClosing: this.recalculatePagesAmount,
						requestPageCreation: this.recalculatePagesAmount,
					}}
				>
					<PanelsPage
						selectedRegistrable={this.props.selectedRegistrable}
						onValueChange={this.props.onValueChange}
						onMediaEditRequest={this.props.onMediaEditRequest}
						fields={this.props.fields}
						data={this.props.data}
						requestExport={this.props.requestExport}
					/>
				</PageNavigationContext.Provider>
			</div>
		);
	}
}
