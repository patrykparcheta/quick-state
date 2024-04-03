import {getStoreRandomId} from "./get-store-random-id";

describe("getStoreRandomId", () => {
	it("should return a string of 8 characters", () => {
		const id = getStoreRandomId();
		expect(id).toHaveLength(8);
	});

	it("should only contain alphanumeric characters", () => {
		const id = getStoreRandomId();
		expect(id).toMatch(/^[A-Za-z0-9]{8}$/);
	});

	it("should generate different IDs across multiple calls", () => {
		const ids = new Set(Array.from({length: 100}, () => getStoreRandomId()));
		expect(ids.size).toBeGreaterThan(1);
	});
});
