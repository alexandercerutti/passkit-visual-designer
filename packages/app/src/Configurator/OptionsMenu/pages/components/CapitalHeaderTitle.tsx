import * as React from "react";

export default function CapitalHeaderTitle({ name }: { name: string }) {
	const showTitle = name.replace(/([a-z])([A-Z])/g, "$1 $2");

	return <h4>{showTitle}</h4>;
}
