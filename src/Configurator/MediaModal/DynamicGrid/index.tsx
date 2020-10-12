import * as React from "react";
import "./style.less";

interface Props {
	elementsAmount: number;
	wrapLimit?: number;
	className?: string;
}

/**
 * A grid element that automatically increases
 * its size based on the elements it has to show.
 *
 * It accepts a wrapLimit prop to split the rows
 *
 * @param param0
 */

export default function DynamicGrid({ elementsAmount, wrapLimit = 1, className = "", children }: React.PropsWithChildren<Props>) {
	const amountOfRows = Math.ceil((elementsAmount + 1) / wrapLimit);

	const style: React.CSSProperties = {
		gridTemplateRows: `repeat(${amountOfRows}, 1fr)`,
		gridTemplateColumns: `repeat(${wrapLimit}, 1fr)`
	};

	return (
		<div id="grid" className={className} style={style}>
			{children}
		</div>
	);
}
