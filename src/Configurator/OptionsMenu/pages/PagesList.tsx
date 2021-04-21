import { PassMixedProps } from "@pkvd/pass";
import type * as React from "react";
import { PageProps } from "./Navigable.hoc";

interface Page<E extends PageProps> {
	name: string | keyof PassMixedProps;
	Element: React.ComponentType<E>;
	customInitData(): { [key: string]: string };
}

class PagesList<E extends PageProps> extends Array<Page<E>> {
	open(page: Page<E>) {
		return super.push(page) - 1;
	}

	close(startIndex: number, followChain: boolean = false) {
		return super.splice(startIndex, followChain ? this.length - startIndex : startIndex);
	}

	update(index: number, element: Page<E>) {
		return super.splice(index, 1, element);
	}

	isLast(Element: React.ReactNode) {
		return this[this.length - 1]?.Element === Element;
	}
}

export default new PagesList();
