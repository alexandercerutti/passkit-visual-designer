import { FieldDetails } from ".";
import { FieldKind } from "../model";

const StaticFields: Array<[string, FieldDetails]> = [
	["description", {
		"kind": FieldKind.TEXT,
		"mockable": false,
		"tooltipText": "",
		"disabled": false,
		"required": true
	}],
	["formatVersion", {
		"kind": FieldKind.SWITCH,
		"mockable": false,
		"tooltipText": "",
		"disabled": true,
		"required": true
	}],
	["organizationName", {
		"kind": FieldKind.TEXT,
		"required": true
	}],
	["passTypeIdentifier", {
		"kind": FieldKind.TEXT,
		"required": true
	}],
	["serialNumber", {
		"kind": FieldKind.TEXT,
		"required": true
	}],
	["teamIdentifier", {
		"kind": FieldKind.TEXT,
		"required": true
	}],
	["appLaunchURL", {
		"kind": FieldKind.TEXT
	}],
	["associatedStoreIdentifiers", {
		"kind": FieldKind.TEXT
	}],
	["userInfo", {
		"kind": FieldKind.TEXT
	}],
	["authenticationToken", {
		"kind": FieldKind.TEXT
	}],
	["webServiceURL", {
		"kind": FieldKind.TEXT
	}],
	["nfc", {
		"kind": FieldKind.JSON
	}]
];

export default StaticFields;
