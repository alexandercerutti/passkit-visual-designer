import * as React from "react";
import "./style.less";

export default function EmptyField<P>(props: P) {
	return (
		<div className="empty-field" {...props} />
	);
}
