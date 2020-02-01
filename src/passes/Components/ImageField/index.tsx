import * as React from "react";
import { FillableComponent } from "../FillableComponent";
import withRegistration from "../withRegistration";
import { FieldKind } from "../../../model";
import withFallback from "../EmptyField/withFallback";

interface ImageField extends FillableComponent {
	className?: string;
	width?: string;
	height?: string;
	src?: string;
}

function PureImageField(props: ImageField) {
	return (
		<div className={`${props.className} image-field`.trim()} >
			<img {...{ src: props.src, width: props.width, height: props.height }} />
		</div>
	);
}

export default withRegistration(withFallback(PureImageField, "src"), FieldKind.IMAGE);
