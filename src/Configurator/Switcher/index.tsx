import * as React from "react";
import "./style.less";

interface Props {
	labelPosition: "before" | "after";
	checked?: boolean;
	disabled?: boolean;
	onToggle(enabled: boolean): void;
	/** For multiple switches all together */
	index?: string;
}

/**
 * React implementation of iOS switch with improvements
 * from: https://www.cssscript.com/realistic-ios-switch-pure-css/
 *
 * @param props
 */

export function Switcher(props: React.PropsWithChildren<Props>) {
	const id = `ths-input${props.index || ""}`;

	const beforeLabel = (props.labelPosition === "before" && props.children) || "";

	const afterLabel = (props.labelPosition === "after" && props.children) || "";

	return (
		<label className="the-switcher" htmlFor={id}>
			{beforeLabel}
			<input
				hidden
				id={id}
				type="checkbox"
				checked={props.checked}
				disabled={props.disabled ?? false}
				onChange={(e) => props.onToggle(e.currentTarget.checked)}
			/>
			<i></i>
			{afterLabel}
		</label>
	);
}
