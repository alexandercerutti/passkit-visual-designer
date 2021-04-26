import { PassMixedProps } from "@pkvd/pass";
import { v1 as uuid } from "uuid";
import * as React from "react";

let pages: Page = null;
const updateListeners: Function[] = [];

interface Page {
	uuid: string;
	// Added automatically
	next: Page | null;
	index?: number; // added automatically
}
export interface PageProps {
	name: string | keyof PassMixedProps;
	onBack: Function;
}

export interface NextPageHandlers {
	createPage?: (
		name: string,
		Element?: React.ComponentType<Partial<PageProps & NextPageHandlers>>, // Which is, a Navigable itself
		customInitData?: () => { [key: string]: any }
	) => void;
	destroyPage?: () => void;
}

export function usePageRelation<T extends Object>(): [boolean, Function, Function, T] {
	const [isOpen, setPageOpenness] = React.useState(false);
	const pageID = React.useRef(uuid());
	const contextualProps = React.useRef<T>();

	const openPage = React.useCallback((pageProps: T) => {
		setPageOpenness(true);
		contextualProps.current = pageProps;
		addPage(pageID.current);
		sendUpdates();
	}, []);

	const closePage = React.useCallback(() => {
		setPageOpenness(false);
		contextualProps.current = undefined;
		removePageChain(pageID.current);
		sendUpdates();
	}, []);

	return [isOpen, openPage, closePage, contextualProps.current];
}

export function getPagesAmount(): number {
	if (!pages) {
		return 0;
	}

	let lastElement = pages;
	let count = 0;

	while (lastElement.next !== null) {
		count++;
		lastElement = lastElement.next;
	}

	return count;
}

export function usePagesAmount() {
	const [amount, updateAmount] = React.useState(0);

	const onUpdate = React.useCallback((amount: number) => {
		updateAmount(amount);
	}, []);

	React.useEffect(() => {
		updateListeners.push(onUpdate);
	}, []);

	return amount;
}

function sendUpdates() {
	const pagesAmount = getPagesAmount();

	for (let listener of updateListeners) {
		listener(pagesAmount);
	}
}

function getLastPage() {
	let lastElement = pages;

	if (!lastElement) {
		return null;
	}

	while (lastElement.next !== null) {
		lastElement = lastElement.next;
	}

	return lastElement;
}

function addPage(uuid: string) {
	let lastElement = pages;

	if (!lastElement) {
		pages = {
			uuid,
			next: null,
			index: 0,
		};

		return pages;
	}

	lastElement = getLastPage();
	lastElement.next = {
		uuid,
		next: null,
		index: lastElement.index + 1,
	};

	return lastElement.next;
}

function removePageChain(uuid: string) {
	let lastElement = pages;

	if (!lastElement) {
		return;
	}

	while (lastElement.next !== null) {
		if (lastElement.next && lastElement.next.uuid === uuid) {
			break;
		}

		lastElement = lastElement.next;
	}

	lastElement.next = null;
	return;
}

export interface NavigableProps {
	pagesStatuses: boolean[];
	openPage(index: number): void;
	closePage(index: number): void;
}

/**
 * An HOC to create relations between pages
 *
 * @param Element Main element
 * @param args elements linked. Just for reference when reading the code. We could have had used also an array of strings, potentially.
 */

export default function navigable<T extends Partial<NavigableProps>>(
	Element: React.ComponentType<T>,
	...args: React.ComponentType<any>[]
) {
	return function (props: T) {
		const controllers = args.map(usePageRelation);

		const openPage = React.useCallback((index: number) => {
			const [, open] = controllers[index];
			open();
		}, []);

		const closePage = React.useCallback((index: number) => {
			const [, , close] = controllers[index];
			close();
		}, []);

		return (
			<>
				<Element
					{...props}
					pagesStatuses={controllers.map((controller) => controller[0])}
					openPage={openPage}
					closePage={closePage}
				/>
			</>
		);
	};
}

/* class Navigable<T> extends React.Component<T extends Partial<PageProps & NextPageHandlers> & {
	element: React.ComponentType<Partial<PageProps & NextPageHandlers>> }> implements NextPageHandlers {
		constructor(props: T) {
			super(props);
		}

		static get source() {
			return Element;
		}

		createPage(
			name: string,
			Element: typeof Navigable,
			customInitData?: () => { [key: string]: any }
		) {
			addToList(name, Element.source || Element, customInitData);
		}

		destroyPage() {
			removeFromList(Element);
		}

		render() {
			const { next: NextChild, customInitData, name } = getPage(Element.source) ?? {};

			return (
				<>
					<Element createPage={this.createPage} destroyPage={this.destroyPage} {...this.props} />
					{(NextChild && (
						<NextChild.Element {...customInitData?.()} name={name} onBack={this.destroyPage} />
					)) ||
						null}
				</>
			);
		}
	}; */
