import {makeStore} from "./make-store";
import type {MakeStoreConfig} from "./types";

describe("makeStore", () => {
	interface TestState {
		count: number;
		text: string;
	}

	interface SetCountActionPayload {
		count: number;
	}

	let storeConfig: MakeStoreConfig<TestState>;
	let store: ReturnType<typeof makeStore<TestState>>;

	beforeEach(() => {
		storeConfig = {
			initialState: {
				count: 0,
				text: "initial",
			},
		};

		store = makeStore<TestState>(storeConfig);
	});

	test("should initialize with the correct state", () => {
		expect(store.getState()).toEqual(storeConfig.initialState);
	});

	test("should allow state to be updated and notify subscribers", () => {
		const listener = jest.fn();
		store.subscribe(listener);

		const setCountAction = store.createAction<SetCountActionPayload>((state, {count}) => {
			state.count = count;
		});

		setCountAction({count: 1});

		expect(store.getState().count).toBe(1);
		expect(listener).toHaveBeenCalledTimes(1);

		setCountAction({count: store.getState().count + 1});
		expect(store.getState().count).toBe(2);
		expect(listener).toHaveBeenCalledTimes(2);
	});

	test("should unsubscribe listeners correctly", () => {
		const listener = jest.fn();
		const unsubscribe = store.subscribe(listener);

		const setCountAction = store.createAction<SetCountActionPayload>((state, {count}) => {
			state.count = count;
		});

		setCountAction({count: 1});

		expect(listener).toHaveBeenCalledTimes(1);

		unsubscribe();
		setCountAction({count: 2});
		expect(listener).toHaveBeenCalledTimes(1);
	});

	test("should create and use an action correctly", () => {
		const increment = store.createAction((state, payload: number) => ({
			...state,
			count: state.count + payload,
		}));

		increment(1);
		expect(store.getState().count).toBe(1);
	});
});
