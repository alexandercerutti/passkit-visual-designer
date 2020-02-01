import * as React from "react";
import { FillableComponent } from "../FillableComponent";
import EmptyField from ".";

export default function withFallback<P extends FillableComponent>(WrappedComponent: React.ComponentType<P>, requiredValues: (keyof P)[]) {
	return (props: P) => {
		if (!requiredValues.every(value => props[value])) {
			return <EmptyField {...props} />;
		}

		return <WrappedComponent {...props} />;
	}
}
