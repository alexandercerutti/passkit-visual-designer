import { FieldDetails } from ".";
import { FieldKind } from "../model";
import { DataGroup } from "./OptionsMenu/MenuGroup";

const StaticFields: Array<[string, FieldDetails]> = [
	["description", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT,
		mockable: false,
		tooltipText: "",
		disabled: false,
		required: true
	}],
	["formatVersion", {
		area: DataGroup.METADATA,
		kind: FieldKind.SWITCH,
		mockable: false,
		tooltipText: "",
		disabled: true,
		required: true
	}],
	["organizationName", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT,
		required: true
	}],
	["passTypeIdentifier", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT,
		required: true
	}],
	["serialNumber", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT,
		required: true
	}],
	["teamIdentifier", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT,
		required: true
	}],
	["appLaunchURL", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT
	}],
	["associatedStoreIdentifiers", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT
	}],
	["userInfo", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT
	}],
	["authenticationToken", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT
	}],
	["webServiceURL", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT
	}],
	["nfc", {
		area: DataGroup.METADATA,
		kind: FieldKind.JSON
	}],
	["backgroundColor", {
		area: DataGroup.COLORS,
		kind: FieldKind.COLOR,
	}],
	["backgroundImage", {
		area: DataGroup.IMAGES,
		kind: FieldKind.IMAGE,
	}],
	["foregroundColor", {
		area: DataGroup.COLORS,
		kind: FieldKind.COLOR
	}],
	["labelColor", {
		area: DataGroup.COLORS,
		kind: FieldKind.COLOR
	}],
	["groupingIdentifier", {
		area: DataGroup.METADATA,
		kind: FieldKind.TEXT
	}],
	["beacons", {
		area: DataGroup.METADATA,
		kind: FieldKind.JSON,
		jsonKeys: ["major", "minor", "proximityUUID", "relevantText"]
	}],
	["locations", {
		area: DataGroup.METADATA,
		kind: FieldKind.JSON,
		jsonKeys: ["altitude", "latitude", "longitude", "relevantText"]
	}],
];

export default StaticFields;
