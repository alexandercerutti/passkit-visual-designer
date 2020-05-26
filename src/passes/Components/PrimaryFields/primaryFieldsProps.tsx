import { RegistrableComponent } from "../useRegistration";
import { FieldProps } from "../Field";

export default interface PrimaryFieldsProps extends RegistrableComponent {
	className?: string;
	fields?: FieldProps[];
}
