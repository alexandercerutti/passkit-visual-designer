import * as React from "react";
import "./style.less";

export default <T extends Object>(props: React.PropsWithChildren<T>) => {
	return (
		<div className="footer">
			{
				/*
				 * This internal div, allows us to have an
				 * image field with a width equal to the
				 * barcode's.
				 */
			}
			<div>
				{props.children || null}
			</div>
		</div>
	);
}
