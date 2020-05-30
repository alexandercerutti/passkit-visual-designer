import * as React from "react";
import "./style.less";
import { useRegistrations, RegistrableComponent } from "../useRegistrations";
import { FieldKind } from "../../../model";
import ImageField, { ImageFieldProps } from "../components/ImageField";

interface FooterProps extends Pick<RegistrableComponent, "register">, ImageFieldProps {
	allowFooterImage?: boolean;
}

export default function Footer(props: React.PropsWithChildren<FooterProps>) {
	const { children = null } = props;
	let footerImage: JSX.Element = null;

	if (props.allowFooterImage) {
		const [FooterClickHandler] = useRegistrations(props.register, [
			[FieldKind.IMAGE, "Footer Image"]
		]);

		footerImage = (
			<ImageField
				src={props.src}
				onClick={FooterClickHandler}
			/>
		);
	}

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
				{footerImage}
				{children}
			</div>
		</div>
	);
}
