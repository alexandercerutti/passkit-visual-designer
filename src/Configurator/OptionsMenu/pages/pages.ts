export interface PageProps {
	name: string;
}

export interface PageNavigation {
	requestPageCreation<T extends PageProps & PageNavigation>(identifier: string, PageElement: React.ComponentType<Partial<PageNavigation> & PageProps>, contextProps?: Partial<T> & { [key: string]: any }): void;
	requestPageClosing(): void
}
