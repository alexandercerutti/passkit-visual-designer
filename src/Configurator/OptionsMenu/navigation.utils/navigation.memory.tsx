import { PassMixedProps } from "@pkvd/pass";

let pages: Page = null;
const updateListeners: Function[] = [];

interface Page {
	uuid: string;
	// Added automatically
	next: Page | null;
	index?: number; // added automatically
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

export function registerListener(listener: (amount: number) => void) {
	updateListeners.push(listener);
}

export function sendUpdates() {
	const pagesAmount = getPagesAmount();

	for (let listener of updateListeners) {
		listener(pagesAmount);
	}
}

export function getLastPage() {
	let lastElement = pages;

	if (!lastElement) {
		return null;
	}

	while (lastElement.next !== null) {
		lastElement = lastElement.next;
	}

	return lastElement;
}

export function addPage(uuid: string) {
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

export function removePageChain(uuid: string) {
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
