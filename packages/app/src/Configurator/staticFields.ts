import { PKPassLayout } from "@pkvd/PKPass";
import { FieldDetails } from "./OptionsMenu/pages/PanelsPage/Panel";
import { DataGroup } from "./OptionsMenu/pages/PanelsPage";

const StaticFields: Array<[DataGroup, FieldDetails[]]> = [
	[
		DataGroup.METADATA,
		[
			{
				name: "description",
				kind: PKPassLayout.FieldKind.TEXT,
				group: DataGroup.METADATA,
				mockable: false,
				tooltipText: "",
				disabled: false,
				required: true,
			},
			/* {
		name: "formatVersion",
		kind: PKPassLayout.FieldKind.SWITCH,
		mockable: false,
		tooltipText: "",
		disabled: true,
		required: true
	},*/ {
				name: "organizationName",
				kind: PKPassLayout.FieldKind.TEXT,
				group: DataGroup.METADATA,
				required: true,
			},
			{
				name: "passTypeIdentifier",
				kind: PKPassLayout.FieldKind.TEXT,
				group: DataGroup.METADATA,
				required: true,
			},
			{
				name: "teamIdentifier",
				kind: PKPassLayout.FieldKind.TEXT,
				group: DataGroup.METADATA,
				required: true,
			},
			{
				name: "appLaunchURL",
				kind: PKPassLayout.FieldKind.TEXT,
				group: DataGroup.METADATA,
			},
			{
				name: "associatedStoreIdentifiers",
				kind: PKPassLayout.FieldKind.TEXT,
				group: DataGroup.METADATA,
			},
			{
				name: "authenticationToken",
				kind: PKPassLayout.FieldKind.TEXT,
				group: DataGroup.METADATA,
			},
			{
				name: "webServiceURL",
				kind: PKPassLayout.FieldKind.TEXT,
				group: DataGroup.METADATA,
			},
			{
				name: "groupingIdentifier",
				kind: PKPassLayout.FieldKind.TEXT,
				group: DataGroup.METADATA,
			} /*, {
			name: "becons",
			kind: PKPassLayout.FieldKind.JSON,
			jsonKeys: ["major", "minor", "proximityUUID", "relevantText"]
		}, {
			name: "locations",
			kind: PKPassLayout.FieldKind.JSON,
			jsonKeys: ["altitude", "latitude", "longitude", "relevantText"]
		}, */,
		],
	],
	[
		DataGroup.COLORS,
		[
			{
				name: "backgroundColor",
				kind: PKPassLayout.FieldKind.COLOR,
				group: DataGroup.COLORS,
			},
			{
				name: "foregroundColor",
				kind: PKPassLayout.FieldKind.COLOR,
				group: DataGroup.COLORS,
			},
			{
				name: "labelColor",
				kind: PKPassLayout.FieldKind.COLOR,
				group: DataGroup.COLORS,
			},
		],
	],
	[DataGroup.IMAGES, []],
	[DataGroup.DATA, []],
];

export default StaticFields;
