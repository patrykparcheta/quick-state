import {countSelector} from "./select-count";
import {store} from "../store";
import type {MyState} from "../types";

describe("selectCount selector", () => {
	const initialState: MyState = {
		count: 0,
		countLoading: false,
	};

	beforeEach(() => {
		store.setState(initialState);
	});

	it("should return the current count from state", () => {
		expect(countSelector(store.getState())).toBe(0);
	});

	it("should return the updated count when state changes", () => {
		store.setState({
			count: 10,
			countLoading: false,
		});

		expect(countSelector(store.getState())).toBe(10);
	});
});
