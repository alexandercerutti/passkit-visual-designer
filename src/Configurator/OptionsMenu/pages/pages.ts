export interface PageProps {
	name: string;
}

export type RequestPageCreationSignature = (
	identifier: string,
	PageElement: React.ComponentType<Partial<PageNavigation> & PageProps>,
	getContextProps?: () => { [key: string]: any }
) => void;

export interface PageNavigation {
	requestPageCreation: RequestPageCreationSignature;
	requestPageClosing(): void
}
