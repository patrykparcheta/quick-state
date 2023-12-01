import {increaseCount} from "../actions";
import {store} from "../store";

describe("increaseCount action", () => {
	const initialState = {
		count: 0,
	};

	beforeEach(() => {
		store.setState(initialState);
	});

	test("should initialize with the correct state", () => {
		expect(store.getState()).toEqual(initialState);
	});

	test("should increase count by 1", () => {
		increaseCount();
		expect(store.getState().count).toBe(initialState.count + 1);
	});

	test("should handle multiple increaseCount actions", () => {
		increaseCount();
		increaseCount();
		expect(store.getState().count).toBe(initialState.count + 2);
	});
});
