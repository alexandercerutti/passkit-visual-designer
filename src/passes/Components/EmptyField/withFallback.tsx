import * as React from "react";
import EmptyField from ".";
import { RegistrableComponent, onSelect } from "../withRegistration";

export default function withFallback<P extends RegistrableComponent>(WrappedComponent: React.ComponentType<P>, requiredValues: (keyof P)[]) {
	return (props: P) => {
		if (shouldFallbackRender(props, requiredValues)) {
			const select = props.onClick || (() => { }) as onSelect;
			return <EmptyField onClick={select} />;
		}

		return <WrappedComponent {...props} />;
	}
}

function shouldFallbackRender<P>(allProps: P, requiredProps: (keyof P)[]) {
	for (let i = requiredProps.length, prop: keyof P; prop = requiredProps[--i];) {
		if (!allProps[prop]) {
			return true;
		}

		if (allProps[prop] instanceof Array && !(allProps[prop] as unknown as Array<any>).length) {
			return true;
		}

		if (typeof allProps[prop] === "object" && !Object.keys(allProps[prop]).length) {
			return true;
		}
	}

	return false;
}
