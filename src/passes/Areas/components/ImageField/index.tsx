import * as React from "react";
import { RegisteredComponent } from "../../useRegistrations";
import { concatClassNames } from "../../../utils";
import useFallback from "../useFallback";

export interface ImageFieldProps extends Partial<RegisteredComponent> {
	className?: string;
	width?: string;
	height?: string;
	src?: string;
}

export default function ImageField(props: ImageFieldProps) {
	const { src, width, height, className: sourceClassName, id, onClick } = props;

	// @TODO add useClickEvent with id

	return useFallback(() => {
		const className = concatClassNames("image-field", sourceClassName);

		return (
			<div className={className}>
				<img {...{ src, width, height }} />
			</div>
		);
	}, [src]);
}
