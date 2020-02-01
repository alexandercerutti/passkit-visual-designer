import { RegisterPassEditableField } from "./RegistrableHoc/withRegistration";

export interface FillableComponent<T = any> {
	id: string;
	content?: T;
	shouldRegister?: boolean;
	onSelect?(id: string): void;
	register?: RegisterPassEditableField;
}
