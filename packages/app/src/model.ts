export enum FieldKind {
	TEXT = "text",
	IMAGE = "image",
	COLOR = "color",
	FIELDS = "fields",
	SWITCH = "switch",
	JSON = "json"
}

export type StylingProps = Pick<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
