import { PassMixedProps } from "@pkvd/pass";
import * as React from "react";
import PageNavigationContext, { PageNavigation } from "./PageNavigationContext";
import PagesList from "./PagesList";

export interface PageProps {
	name: string | keyof PassMixedProps;
	onBack: Function;
}

type PageNavigationDescriptor = [
	createPage: (
		name: string,
		element?: React.ComponentType<PageProps>,
		customInitData?: () => { [key: string]: any }
	) => void,
	closePage: () => void,
	pageElement?: React.ReactElement<PageProps> | null
];

export interface NextPageHandlers {
	createPage?: PageNavigationDescriptor[0];
	destroyPage?: PageNavigationDescriptor[1];
}

export default function navigable<P>(
	Element: React.ComponentType<
		Partial<P> &
			Partial<{
				createPage: PageNavigationDescriptor[0];
				destroyPage: PageNavigationDescriptor[1];
			}>
	>
) {
	return function <T>(props: T) {
		return (
			<PageNavigationContext.Consumer>
				{({ requestPageCreation, requestPageClosing }) => (
					<Navigable
						requestPageCreation={requestPageCreation}
						requestPageClosing={requestPageClosing}
					>
						<Element {...props} />
					</Navigable>
				)}
			</PageNavigationContext.Consumer>
		);
	};
}

class Navigable<T> extends React.Component<T & PageNavigation, { listIndex: number }> {
	constructor(props: T & PageNavigation) {
		super(props);

		this.state = {
			listIndex: null,
		};

		this.createPage = this.createPage.bind(this);
		this.destroyPage = this.destroyPage.bind(this);
	}

	createPage(
		name: string,
		Element: React.ComponentType<PageProps>,
		customInitData?: () => { [key: string]: any }
	) {
		const index = PagesList.open({
			name,
			Element,
			customInitData: customInitData,
		});

		this.props.requestPageCreation();
		this.setState({
			listIndex: index,
		});
	}

	destroyPage() {
		const {
			state: { listIndex },
		} = this;

		PagesList.close(listIndex, PagesList.isLast(PagesList[listIndex].Element));

		this.props.requestPageClosing();
		this.setState({
			listIndex: null,
		});
	}

	render() {
		const {
			props,
			state: { listIndex },
		} = this;
		const { Element: Child, name, customInitData } = PagesList[listIndex] ?? {};

		const children = React.Children.map(props.children, (node: React.ReactElement) =>
			React.cloneElement(node, {
				createPage: this.createPage,
				destroyPage: this.destroyPage,
			})
		);

		return (
			<>
				{children}
				{listIndex !== null ? (
					<Child {...(customInitData?.() ?? null)} name={name} onBack={this.destroyPage} />
				) : null}
			</>
		);
	}
}
