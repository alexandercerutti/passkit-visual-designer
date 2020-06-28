export interface PageProps {
	name: string;
}

export interface PageNavigation {
	requestPageCreation<T extends Object>(identifier: string, PageElement: React.ReactNode, contextProps?: T): void;
	requestPageClosing(): void
}
