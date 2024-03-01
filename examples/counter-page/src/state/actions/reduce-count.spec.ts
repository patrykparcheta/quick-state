import {reduceCount} from "../actions";
import {store} from "../store";
import type {MyState} from "../types";

describe("reduceCount action", () => {
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

	test("should reduce count by 1", () => {
		reduceCount();
		expect(store.getState().count).toBe(initialState.count - 1);
	});

	test("should handle multiple reduceCount actions", () => {
		reduceCount();
		reduceCount();
		expect(store.getState().count).toBe(initialState.count - 2);
	});
});
