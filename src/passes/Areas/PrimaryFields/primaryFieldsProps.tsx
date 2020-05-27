import { RegistrableComponent } from "../components/useRegistration";
import { FieldProps } from "../components/Field";

export default interface PrimaryFieldsProps extends RegistrableComponent {
	className?: string;
	fields?: FieldProps[];
}
