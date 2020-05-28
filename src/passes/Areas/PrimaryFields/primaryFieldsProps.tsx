import { RegistrableComponent } from "../useRegistrations";
import { FieldProps } from "../components/Field";

export default interface PrimaryFieldsProps extends RegistrableComponent {
	className?: string;
	fields?: FieldProps[];
}
