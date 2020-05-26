import * as React from "react";
import withRegistration, { RegistrableComponent } from "../withRegistration";
import { FieldKind } from "../../../model";
import { concatClassNames } from "../../utils";
import useFallback from "../EmptyField/useFallback";

export interface ImageFieldProps extends RegistrableComponent {
	className?: string;
	width?: string;
	height?: string;
	src?: string;
}

function PureImageField(props: ImageFieldProps) {
	const { src, width, height, className: sourceClassName } = props;

	return useFallback(() => {
		const className = concatClassNames("image-field", sourceClassName);

		return (
			<div className={className}>
				<img {...{ src, width, height }} />
			</div>
		);
	}, [src]);
}

export default withRegistration(PureImageField, FieldKind.IMAGE);
