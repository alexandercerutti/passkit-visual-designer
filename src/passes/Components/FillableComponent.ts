import { onRegister, onSelect } from "./withRegistration";

export interface FillableComponent<T = any> {
	id: string;
	content?: T;
	shouldRegister?: boolean;
	onSelect?: onSelect;
	register?: onRegister;
}
