import * as React from "react";
import "./style.less";

export default (props: React.PropsWithChildren<any>) => {
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
