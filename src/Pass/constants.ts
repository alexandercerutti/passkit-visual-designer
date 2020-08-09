export const DEFAULT_BACKGROUND_COLOR = "#e6e6e6";
export const DEFAULT_FOREGROUND_COLOR = "#000";
export const DEFAULT_LABEL_COLOR = "#cecece";

export enum PKDateStyle {
	None = "PKDateStyleNone", /** ??? */
	Short = "PKDateStyleShort", /** “11/23/37” or “3:30 PM”. */
	Medium = "PKDateStyleMedium", /** “Nov 23, 1937” or “3:30:32 PM” */
	Long = "PKDateStyleLong", /** “November 23, 1937” or “3:30:32 PM PST” */
	Full = "PKDateStyleFull" 	/** “Tuesday, April 12, 1952 AD” or “3:30:42 PM Pacific Standard Time” */
}

export enum PKTransitType {
	Air = "PKTransitTypeAir",
	Boat = "PKTransitTypeBoat",
	Bus = "PKTransitTypeBus",
	Generic = "PKTransitTypeGeneric",
	Train = "PKTransitTypeTrain"
}

export enum PKTextAlignment {
	Left = "PKTextAlignmentLeft",
	Center = "PKTextAlignmentCenter",
	Right = "PKTextAlignmentRight",
	Natural = "PKTextAlignmentNatural",
}

export enum PKBarcodeFormat {
	/** Apple-specific properties */
	Code128 = "PKBarcodeFormatCode128",
	PDF417 = "PKBarcodeFormatPDF417",
	QR = "PKBarcodeFormatQR",
	Aztec = "PKBarcodeFormatAztec",

	/**
	 * @TODO these should be removed or moved somewhere else
	 * @TODO fix also styles for none and shapes
	 */
	/** Custom */
	None = "PKBarcodeFormatNone",

	/** Generic descriptors */
	Square = "PKBarcodeFormatSquare",
	Rectangle = "PKBarcodeFormatRectangle"
}

export enum PKDataDetectorType {
	PhoneNumber = "PKDataDetectorTypePhoneNumber",
	Link = "PKDataDetectorTypeLink",
	Address = "PKDataDetectorTypeAddress",
	CalendarEvent = "PKDataDetectorTypeCalendarEvent"
}

export enum PKNumberStyle {
	Decimal = "PKNumberStyleDecimal",
	Percent = "PKNumberStylePercent",
	Scientific = "PKNumberStyleScientific",
	SpellOut = "PKNumberStyleSpellOut"
}

export enum PKEventType {
	Generic = "PKEventTypeGeneric",
	LivePerformance = "PKEventTypeLivePerformance",
	Movie = "PKEventTypeMovie",
	Sports = "PKEventTypeSports",
	Conference = "PKEventTypeConference",
	Convention = "PKEventTypeConvention",
	Workshop = "PKEventTypeWorkshop",
	SocialGathering = "PKEventTypeSocialGathering"
}

export namespace WalletPassFormat {
	/**
	 * @see https://apple.co/305eJih
	 */
	export interface Barcodes {
		altText?: string;
		format: PKBarcodeFormat;
		message: string;
		messageEncoding: string;
	}

	export interface BoardingPass extends PassFields {
		transitType: PKTransitType;
	}

	export interface Coupon extends PassFields { }
	export interface EventTicket extends PassFields { }
	export interface Generic extends PassFields { }
	export interface StoreCard extends PassFields { }

	export interface NFC {
		encryptionPublicKey: string;
		message: string;
		requiresAuthentication?: boolean;
	}
}

export interface WalletPassFormat {
	appLaunchURL?: string;
	associacedStoreIdentifiers?: (number | string)[];
	authenticationToken?: string;
	backgroundColor?: string;
	barcodes?: WalletPassFormat.Barcodes[];
	// beacons?: WalletPassFormat.Beacons[]
	boardingPass?: WalletPassFormat.BoardingPass;
	coupon?: WalletPassFormat.Coupon;
	description: string;
	eventTicket?: WalletPassFormat.EventTicket;
	expirationDate?: string;
	foregroundColor?: string;
	formatVersion: 1; // number, but it is v1 now
	generic?: WalletPassFormat.Generic;
	groupingIdentifier?: string;
	labelColor?: string;
	// locations?: WalletPassFormat.Locations[];
	logoText?: string;
	maxDistance?: number;
	nfc?: WalletPassFormat.NFC;
	organizationName: string;
	passTypeIdentifier: string;
	relevantDate?: string;
	semantics?: SemanticTags;
	serialNumber: string;
	sharingProhibited?: boolean;
	storeCard: WalletPassFormat.StoreCard;
	suppressStripShine?: boolean;
	teamIdentifier: string;
	userInfo?: any;
	voided?: boolean;
	webServiceURL?: string;
}

export namespace PassFields {
	/**
	 * @see https://apple.co/3j0D0i5
	 */

	export interface AuxiliaryFields extends PassFieldKeys {
		row?: 0 | 1;
	}

	export interface BackFields extends PassFieldKeys { }
	export interface HeaderFields extends PassFieldKeys { }
	export interface PrimaryFields extends PassFieldKeys { }
	export interface SecondaryFields extends PassFieldKeys { }
}

export interface PassFields {
	auxiliaryFields: PassFields.AuxiliaryFields;
	backFields: PassFields.BackFields;
	headerFields: PassFields.HeaderFields;
	primaryFields: PassFields.PrimaryFields;
	secondaryFields: PassFields.SecondaryFields;
}

/**
 * @see https://apple.co/2ZqOVy8
 */
export interface PassFieldKeys {
	key: string;
	value: string | number;
	attributedValue?: string;
	changeMessage?: string;
	currencyCode?: string;
	dataDetectorTypes?: PKDataDetectorType;
	dateStyle?: PKDateStyle;
	ignoresTimeZone?: boolean;
	isRelative?: boolean;
	label?: string;
	numberStyle?: PKNumberStyle;
	textAlignment?: PKTextAlignment;
	timeStyle?: PKDateStyle;
}

export namespace SemanticTagTypes {
	export interface CurrencyAmount {
		amount?: string;
		currencyCode?: string;
	}

	export interface Seat {
		seatDescription?: string
		seatIdentifier?: string;
		seatNumber?: string;
		seatRow?: string;
		seatSection?: string;
		seatType?: string;
	}

	export interface PersonNameComponents {
		familyName?: string;
		givenName?: string;
		middleName?: string;
		namePrefix?: string;
		nameSuffix?: string;
		nickname?: string;
		phoneticRepresentation?: string;
	}

	export interface Location {
		latitude: number; // as double
		longitude: number; // as double
	}
}

export namespace SemanticTags {
	export interface WifiAccess {
		password?: string;
		ssid?: string;
	}
}

export interface SemanticTags {
	airlineCode?: string;
	artistIDs?: string[];
	awayTeamAbbreviation?: string;
	awayTeamLocation?: string;
	awayTeamName?: string;
	balance?: SemanticTagTypes.CurrencyAmount;
	boardingGroup?: string;
	boardingSequenceNumber?: string;
	carNumber?: string;
	confirmationNumber?: string;
	currentArrivalDate?: string;
	currentBoardingDate?: string;
	currentDepartureDate?: string;
	departureAirportCode?: string;
	departureAirportName?: string;
	departureGate?: string;
	departureLocation?: SemanticTagTypes.Location;
	departureLocationDescription?: string;
	departurePlatform?: string;
	departureStationName?: string;
	departureTerminal?: string;
	destinationAirportCode?: string;
	destinationAirportName?: string;
	destinationGate?: string;
	destinationLocation?: SemanticTagTypes.Location;
	destinationLocationDescription?: string;
	destinationPlatform?: string;
	destinationStationName?: string;
	destinationTerminal?: string;
	duration?: number;
	eventEndDate?: string;
	eventName?: string;
	eventStartDate?: string;
	eventType?: PKEventType;
	flightCode?: string;
	flightNumber?: number;
	genre?: string;
	homeTeamAbbreviation?: string;
	homeTeamLocation?: string;
	homeTeamName?: string;
	leagueAbbreviation?: string;
	leagueName?: string;
	membershipProgramName?: string;
	membershipProgramNumber?: string;
	originalArrivalDate?: string;
	originalBoardingDate?: string;
	originalDepartureDate?: string;
	passengerName?: SemanticTagTypes.PersonNameComponents;
	performerNames?: string[];
	priorityStatus?: string;
	seats?: SemanticTagTypes.Seat[];
	securityScreening?: string;
	silenceRequested?: boolean;
	sportName?: string;
	totalPrice?: SemanticTagTypes.CurrencyAmount;
	transitProvider?: string;
	transitStatus?: string;
	transitStatusReason?: string;
	vehicleName?: string;
	vehicleNumber?: string;
	vehicleType?: string;
	venueEntrance?: string;
	venueLocation?: SemanticTagTypes.Location;
	venueName?: string;
	venuePhoneNumber?: string;
	venueRoom?: string;
	wifiAccess?: SemanticTags.WifiAccess;
}
