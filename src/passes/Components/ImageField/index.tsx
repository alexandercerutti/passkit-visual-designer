import * as React from "react";
import useRegistration, { RegistrableComponent } from "../useRegistration";
import { FieldKind } from "../../../model";
import { concatClassNames } from "../../utils";
import useFallback from "../EmptyField/useFallback";

export interface ImageFieldProps extends RegistrableComponent {
	className?: string;
	width?: string;
	height?: string;
	src?: string;
}

export default function ImageField(props: ImageFieldProps) {
	const { src, width, height, className: sourceClassName, register, id } = props;

	useRegistration(register, FieldKind.IMAGE, id);

	return useFallback(() => {
		const className = concatClassNames("image-field", sourceClassName);

		return (
			<div className={className}>
				<img {...{ src, width, height }} />
			</div>
		);
	}, [src]);
}
