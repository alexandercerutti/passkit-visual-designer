import { DataGroup } from "./OptionsMenu/pages/PanelsPage";
import { FieldDetails } from "./OptionsMenu/pages/PanelsPage/Panel";

export default class RegistrationIndex {
	private dataGroupMap = new Map<DataGroup, FieldDetails[]>();
	private idMap = new Map<string, FieldDetails>();

	constructor(initialIndex: Map<DataGroup, FieldDetails[]> | [DataGroup, FieldDetails[]][]) {
		for (let [group, details] of initialIndex) {
			for (let detail of details) {
				this.setId(detail.name, detail);
				this.setDatagroup(group, detail);
			}
		}
	}

	setByDatagroup(group: DataGroup, value: FieldDetails) {
		this.setDatagroup(group, value);
		this.setId(value.name, value);
	}

	setById(value: FieldDetails) {
		this.setId(value.name, value);
		this.setDatagroup(value.group, value);
	}

	getById(id: string) {
		return this.idMap.get(id) || null;
	}

	getDatagroup(group: DataGroup) {
		return this.dataGroupMap.get(group);
	}

	findInDatagroup(group: DataGroup, id: string) {
		const dataGroup = this.dataGroupMap.get(group);

		return dataGroup?.find(details => details.name === id);
	}

	private setDatagroup(group: DataGroup, value: FieldDetails) {
		this.dataGroupMap.set(group, [
			...(this.dataGroupMap.get(group) || []),
			value
		]);
	}

	private setId(id: string, value: FieldDetails) {
		this.idMap.set(id, value);
	}
}
