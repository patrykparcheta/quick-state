import {countSelector} from "./select-count";
import {store} from "../store";

describe("selectCount selector", () => {
	const initialState = {
		count: 0,
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
		});

		expect(countSelector(store.getState())).toBe(10);
	});
});
