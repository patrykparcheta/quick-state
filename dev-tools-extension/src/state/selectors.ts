import {createSelector} from "./store";
import {AllStatesOption, UnnamedStatesId} from "../constants";

export const selectStatesList = createSelector(({messageDetails}) => {
	const storeNames = messageDetails.map((record) => record.data?.storeName || UnnamedStatesId);
	const uniqueStoreNames = new Set(storeNames);
	return Array.from(uniqueStoreNames);
});

export const selectSelectedStateChangesList = createSelector(({selectedState, messageDetails}) => {
	if (!selectedState || selectedState === AllStatesOption) {
		return messageDetails;
	}

	return messageDetails.filter((record) => record.data.storeName === selectedState);
});
