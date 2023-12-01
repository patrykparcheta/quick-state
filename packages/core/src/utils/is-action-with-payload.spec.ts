import type {Action, ActionWithPayload} from "../types";
import {isActionWithPayload} from "./is-action-with-payload";

describe("isActionWithPayload", () => {
	it("should return true for actions with payload", () => {
		const actionWithPayload: ActionWithPayload<{test: number}, {value: number}> = (state, payload) => {
			state.test = payload.value;
		};
		expect(isActionWithPayload(actionWithPayload)).toBe(true);
	});

	it("should return false for actions without payload", () => {
		const action: Action<{test: number}> = (state) => {
			state.test = 1;
		};
		expect(isActionWithPayload(action)).toBe(false);
	});

	it("should return false for actions with more than two parameters", () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const actionWithExtraParams: any = (state: any, payload: any, extra: any) => {};
		expect(isActionWithPayload(actionWithExtraParams)).toBe(false);
	});
});
