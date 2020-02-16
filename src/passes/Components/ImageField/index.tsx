import * as React from "react";
import withRegistration, { RegistrableComponent } from "../withRegistration";
import { FieldKind } from "../../../model";
import withFallback from "../EmptyField/withFallback";
import { concatClassNames } from "../../utils";

export interface ImageFieldProps extends RegistrableComponent {
	className?: string;
	width?: string;
	height?: string;
	src?: string;
}

function PureImageField(props: ImageFieldProps) {
	const className = concatClassNames("image-field", props.className);

	return (
		<div className={className}>
			<img {...{ src: props.src, width: props.width, height: props.height }} />
		</div>
	);
}

export default withRegistration(withFallback(PureImageField, ["src"]), FieldKind.IMAGE);
