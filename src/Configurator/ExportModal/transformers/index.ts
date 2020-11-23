import { PassMixedProps } from "../../../Pass";

export const FEATURE_BLOCK_START_REGEX = /<!PKVD:block\s+(?<propName>.+)\s+!>/;
export const FEATURE_BLOCK_END_REGEX = /<\/PKVD:block\s+(?<propName>.+)>/;
export const FEATURE_INLINE_REGEX = /<!PKVD:inline\s+(?<propName>[^!\s]+)\s+!>/g;
export const ORPHAN_TRAILING_COMMAS = /,$/gm;

export function replaceAllBlock(partnerTemplate: string, propsDictionary: PassMixedProps): string {
	let partnerReplaced = partnerTemplate;

	function replacer(match: string, _: string, offset: number, __: string, groups: RegExpExecArray["groups"]) {
		const propName = groups.propName as keyof PassMixedProps;

		if (propsDictionary[propName] === undefined) {
			return match;
		}

		if (typeof propName === "string") {
			return `"${propsDictionary[propName]}"`;
		}

		if (typeof propName === "object" && propsDictionary[propName]) {
			return JSON.stringify(propsDictionary[propName]);
		}

		return propsDictionary[propName];
	}

	partnerReplaced = partnerReplaced
		.replace(FEATURE_INLINE_REGEX, replacer)
	partnerReplaced = partnerReplaced
		.replace(new RegExp(`\n*.+${FEATURE_INLINE_REGEX.source},?`, FEATURE_INLINE_REGEX.flags), "");

	partnerReplaced = partnerReplaced
		.replace(ORPHAN_TRAILING_COMMAS, "");

	return partnerReplaced;
}
