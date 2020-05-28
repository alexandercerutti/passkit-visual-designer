import * as React from "react";
import { onSelect, onRegister } from "../Areas/useRegistrations";

/**
 * Base pass context. This is used to pass to all the
 * passes the registration and interaction functions
 */

export interface InteractionContext {
	onFieldSelect?: onSelect;
	registerField?: onRegister;
}

export const { Provider, Consumer } = React.createContext<InteractionContext>({});
