import type {Store, TransformState} from "./types";
import type {StateChangeSetStateDetail} from "./dev-tools";

export const setStateImpl =
	<State extends object>(transformState: TransformState<State>): Store<State>["setState"] =>
	(newState, actionName) => {
		const setStateDetail: StateChangeSetStateDetail = {
			actionName,
			type: "setState",
		};

		return transformState(() => newState, setStateDetail);
	};
