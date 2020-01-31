export interface FillableComponent<T = any> {
	id: string;
	content?: T;
	onSelect?(id: string): void;
}
