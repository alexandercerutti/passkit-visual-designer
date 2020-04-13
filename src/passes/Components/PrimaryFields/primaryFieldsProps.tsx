import { RegistrableComponent } from "../withRegistration";
import { Field } from "../Field";

export default interface PrimaryFieldsProps extends Omit<RegistrableComponent, "id"> {
	className?: string;
	fields: Omit<Parameters<typeof Field>[0], keyof RegistrableComponent>[];
}
