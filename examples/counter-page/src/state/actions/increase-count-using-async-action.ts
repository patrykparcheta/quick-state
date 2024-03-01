import {createAsyncAction} from "../store";

interface FakeCountFetchResult {
	count: number;
}

export const fakeCountFetch = async (increaseCountBy: number): Promise<FakeCountFetchResult> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve({count: increaseCountBy});
		}, 5000);
	});

export const increaseCountUsingAsyncAction = createAsyncAction({
	creator: fakeCountFetch,
	onPending: (state) => {
		state.countLoading = true;
	},
	onFulfilled: (state, payload) => {
		state.count += payload.result.count;
		state.countLoading = false;
	},
	onRejected: (state, payload) => {
		console.error(payload.reason);
		state.countLoading = false;
	},
});
