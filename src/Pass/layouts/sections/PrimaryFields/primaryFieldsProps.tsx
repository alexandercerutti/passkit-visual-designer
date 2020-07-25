import { RegistrableComponent } from "../useRegistrations";
import { PassFieldKeys } from "../../../constants";

export default interface PrimaryFieldsProps extends RegistrableComponent {
	className?: string; // @TODO is this needed yet?
	fields?: PassFieldKeys[];
}
