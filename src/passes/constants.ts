export type PKDataDetectorType = "PKDataDetectorTypePhoneNumber" | "PKDataDetectorTypeLink" | "PKDataDetectorTypeAddress" | "PKDataDetectorTypeCalendarEvent";

export enum PKDateStyle {
	"None", /** ??? */
	"Short", /** “11/23/37” or “3:30 PM”. */
	"Medium", /** “Nov 23, 1937” or “3:30:32 PM” */
	"Long", /** “November 23, 1937” or “3:30:32 PM PST” */
	"Full" 	/** “Tuesday, April 12, 1952 AD” or “3:30:42 PM Pacific Standard Time” */
}

export enum PKTransitType {
	Air = "PKTransitTypeAir",
	Boat = "PKTransitTypeBoat",
	Bus = "PKTransitTypeBus",
	Generic = "PKTransitTypeGeneric",
	Train = "PKTransitTypeTrain"
}

export enum PKTextAlignment {
	"Left" = "left",
	"Center" = "center",
	"Right" = "right",
	"Natural" = "start",
}

export enum PKBarcodeFormat {
	/** Apple-specific properties */
	Code128 = "code128",
	PDF417 = "pdf417",
	QR = "qrcode",
	Aztec = "actec",
	None = "none",

	/** Generic descriptors */
	Square = "squared",
	Rectangle = "rectangle"
}
