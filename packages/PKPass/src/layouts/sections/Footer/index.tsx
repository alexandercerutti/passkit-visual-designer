import * as React from "react";
import "./style.less";
import { useFieldRegistration } from "../useFieldRegistration";
import { FieldKind } from "../../../../../../src/model";
import ImageField, { ImageFieldProps } from "../../components/ImageField";
import { AppIconEmpty } from "./icons";

interface FooterProps extends ImageFieldProps {
	allowFooterImage?: boolean;
	icon?: string;
}

export default function Footer(props: React.PropsWithChildren<FooterProps>) {
	const { children = null } = props;

	const iconClickHandler = useFieldRegistration(FieldKind.IMAGE, "icon");
	const footerImageClickHandler = props.allowFooterImage
		? useFieldRegistration(FieldKind.IMAGE, "footerImage")
		: undefined;

	return (
		<div className="footer">
			<div className="grid">
				<div className="icon" onClick={() => iconClickHandler("icon")}>
					{props.icon ? <img alt="icon" src={props.icon} /> : <AppIconEmpty />}
				</div>
				{(footerImageClickHandler && (
					<ImageField src={props.src} onClick={() => footerImageClickHandler(null)} />
				)) ||
					null}
				{children}
			</div>
		</div>
	);
}
