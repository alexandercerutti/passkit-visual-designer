export enum PassKind {
	BOARDING_PASS = "BoardingPass",
	STORE = "StoreCard",
	COUPON = "Coupon",
	GENERIC = "Generic",
	EVENT = "EventTicket"
}

export enum FieldKind {
	TEXT = "text",
	IMAGE = "image",
	COLOR = "color",
	FIELDS = "fields",
	SWITCH = "switch",
	JSON = "json"
}

export type StylingProps = Pick<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
