export default function hasContents(value, options) {
	if (!value) {
		return false;
	}

	if (value instanceof Array) {
		return Boolean(value.length);
	}

	if (value && typeof value === "object") {
		return Boolean(Object.keys(value).length);
	}

	return false;
}
