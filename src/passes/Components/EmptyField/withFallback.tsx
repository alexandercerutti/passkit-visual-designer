import * as React from "react";
import EmptyField from ".";
import { RegistrableComponent } from "../withRegistration";

export default function withFallback<P extends RegistrableComponent>(WrappedComponent: React.ComponentType<P>, requiredValues: (keyof P)[]) {
	return (props: P) => {
		if (!requiredValues.every(value => props[value])) {
			return <EmptyField {...props} />;
		}

		return <WrappedComponent {...props} />;
	}
}
