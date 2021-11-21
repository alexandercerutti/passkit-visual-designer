import * as React from "react";
import { SelectableComponent } from "../../sections/useRegistrations";
import { createClassName } from "../../../../utils";
import useFallbackField from "../useFallbackField";
import useClickEvent from "../useClickEvent";

export interface ImageFieldProps extends Partial<SelectableComponent> {
	className?: string;
	width?: string;
	height?: string;
	src?: string;
}

export default function ImageField(props: ImageFieldProps) {
	const { src, width, height, className: sourceClassName, onClick } = props;

	return useClickEvent(
		onClick,
		useFallbackField(() => {
			const className = createClassName(["image-field", sourceClassName]);

			return (
				<div className={className}>
					<img {...{ src, width, height }} />
				</div>
			);
		}, [src])
	);
}
