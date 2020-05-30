import * as React from "react";
import { SelectableComponent } from "../../useRegistrations";
import { concatClassNames } from "../../../utils";
import useFallback from "../useFallback";

export interface ImageFieldProps extends Partial<SelectableComponent> {
	className?: string;
	width?: string;
	height?: string;
	src?: string;
}

export default function ImageField(props: ImageFieldProps) {
	const { src, width, height, className: sourceClassName, onClick } = props;

	return useFallback(() => {
		const className = concatClassNames("image-field", sourceClassName);

		return (
			<div className={className}>
				<img {...{ src, width, height }} />
			</div>
		);
	}, [src]);
}
