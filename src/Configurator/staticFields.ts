import { FieldDetails } from "./OptionsMenu/pages/PanelsPage/Panel";
import { FieldKind } from "../model";
import { DataGroup } from "./OptionsMenu/pages/PanelsPage";

const StaticFields: Array<[DataGroup, FieldDetails[]]> = [
	[
		DataGroup.METADATA,
		[
			{
				name: "description",
				kind: FieldKind.TEXT,
				group: DataGroup.METADATA,
				mockable: false,
				tooltipText: "",
				disabled: false,
				required: true,
			},
			/* {
		name: "formatVersion",
		kind: FieldKind.SWITCH,
		mockable: false,
		tooltipText: "",
		disabled: true,
		required: true
	},*/ {
				name: "organizationName",
				kind: FieldKind.TEXT,
				group: DataGroup.METADATA,
				required: true,
			},
			{
				name: "passTypeIdentifier",
				kind: FieldKind.TEXT,
				group: DataGroup.METADATA,
				required: true,
			},
			{
				name: "teamIdentifier",
				kind: FieldKind.TEXT,
				group: DataGroup.METADATA,
				required: true,
			},
			{
				name: "appLaunchURL",
				kind: FieldKind.TEXT,
				group: DataGroup.METADATA,
			},
			{
				name: "associatedStoreIdentifiers",
				kind: FieldKind.TEXT,
				group: DataGroup.METADATA,
			},
			{
				name: "authenticationToken",
				kind: FieldKind.TEXT,
				group: DataGroup.METADATA,
			},
			{
				name: "webServiceURL",
				kind: FieldKind.TEXT,
				group: DataGroup.METADATA,
			},
			{
				name: "groupingIdentifier",
				kind: FieldKind.TEXT,
				group: DataGroup.METADATA,
			} /*, {
			name: "becons",
			kind: FieldKind.JSON,
			jsonKeys: ["major", "minor", "proximityUUID", "relevantText"]
		}, {
			name: "locations",
			kind: FieldKind.JSON,
			jsonKeys: ["altitude", "latitude", "longitude", "relevantText"]
		}, */,
		],
	],
	[
		DataGroup.COLORS,
		[
			{
				name: "backgroundColor",
				kind: FieldKind.COLOR,
				group: DataGroup.COLORS,
			},
			{
				name: "foregroundColor",
				kind: FieldKind.COLOR,
				group: DataGroup.COLORS,
			},
			{
				name: "labelColor",
				kind: FieldKind.COLOR,
				group: DataGroup.COLORS,
			},
		],
	],
	[DataGroup.IMAGES, []],
	[DataGroup.DATA, []],
];

export default StaticFields;
