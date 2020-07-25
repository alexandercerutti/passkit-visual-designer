/** The keys are the same of WalletPassFormat */
export enum PassKind {
	BOARDING_PASS = "boardingPass",
	STORE = "storeCard",
	COUPON = "coupon",
	GENERIC = "generic",
	EVENT = "eventTicket"
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
