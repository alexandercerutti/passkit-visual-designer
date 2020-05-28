import * as React from "react";
import "./style.less";

export default <T extends Object>(props: React.PropsWithChildren<T>) => {

	// @TODO: add useRegistration with props and highlight if
	// an image is being passed in children
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
