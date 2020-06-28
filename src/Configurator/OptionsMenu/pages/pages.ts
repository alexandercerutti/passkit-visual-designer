export interface PageProps {
	name: string;
}

export interface PageNavigation {
	requestPageCreation?(identifier: string, children: React.ReactNode): void;
	requestPageClosing?(): void
}
