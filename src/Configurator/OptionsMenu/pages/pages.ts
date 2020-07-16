export interface PageProps {
	name: string;
	onChange: Function;
}

export type RequestPageCreationSignature = (
	identifier: string,
	PageElement: React.ComponentType<Partial<PageNavigation> & PageProps>,
	getContextProps?: () => Partial<React.ComponentProps<typeof PageElement>>
) => void;

export interface PageNavigation {
	requestPageCreation: RequestPageCreationSignature;
	requestPageClosing(): void
}
