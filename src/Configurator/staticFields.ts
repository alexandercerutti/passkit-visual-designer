import { FieldDetails } from "./OptionsMenu/Panel";
import { FieldKind } from "../model";
import { DataGroup } from "./OptionsMenu";

const StaticFields: Array<[DataGroup, FieldDetails[]]> = [
	[DataGroup.METADATA, [{
		name: "description",
		kind: FieldKind.TEXT,
		mockable: false,
		tooltipText: "",
		disabled: false,
		required: true
	}, {
		name: "formatVersion",
		kind: FieldKind.SWITCH,
		mockable: false,
		tooltipText: "",
		disabled: true,
		required: true
	}, {
		name: "organizationName",
		kind: FieldKind.TEXT,
		required: true
	}, {
		name: "passTypeIdentifier",
		kind: FieldKind.TEXT,
		required: true,
	}, {
		name: "teamIdentifier",
		kind: FieldKind.TEXT,
		required: true
	}, {
		name: "appLaunchURL",
		kind: FieldKind.TEXT,
	}, {
		name: "associatedStoreIdentifiers",
		kind: FieldKind.TEXT,
	}, {
		name: "authenticationToken",
		kind: FieldKind.TEXT,
	}, {
		name: "webServiceURL",
		kind: FieldKind.TEXT,
	}, {
		name: "groupingIdentifier",
		kind: FieldKind.TEXT,
	}/*, {
			name: "becons",
			kind: FieldKind.JSON,
			jsonKeys: ["major", "minor", "proximityUUID", "relevantText"]
		}, {
			name: "locations",
			kind: FieldKind.JSON,
			jsonKeys: ["altitude", "latitude", "longitude", "relevantText"]
		}, */
	]],
	[DataGroup.IMAGES, [{
		name: "backgroundImage",
		kind: FieldKind.IMAGE,
	}, {
		name: "thumbnail",
		kind: FieldKind.IMAGE,
	}, {
		name: "strip",
		kind: FieldKind.IMAGE,
	}, {
		name: "appIcon",
		kind: FieldKind.IMAGE,
	}]],
	[DataGroup.COLORS, [{
		name: "backgroundColor",
		kind: FieldKind.COLOR,
	}, {
		name: "foregroundColor",
		kind: FieldKind.COLOR,
	}, {
		name: "labelColor",
		kind: FieldKind.COLOR,
	}]],
	[DataGroup.DATA, []]
];

export default StaticFields;
