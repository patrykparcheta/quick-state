import {createAction} from "../store";

export const reduceCount = createAction((state) => {
	state.count = state.count - 1;
});
