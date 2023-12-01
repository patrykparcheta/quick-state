import {createAction} from "../store";

export const increaseCount = createAction((state) => {
	state.count = state.count + 1;
});
