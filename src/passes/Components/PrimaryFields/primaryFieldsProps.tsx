import { RegistrableComponent } from "../withRegistration";
import { Field, FieldProps } from "../Field";

export default interface PrimaryFieldsProps extends RegistrableComponent {
	className?: string;
	fields?: FieldProps[];
}
