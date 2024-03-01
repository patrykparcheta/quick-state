import {increaseCount} from "../actions";
import {store} from "../store";
import type {MyState} from "../types";

describe("increaseCount action", () => {
	const initialState: MyState = {
		count: 0,
		countLoading: false,
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
