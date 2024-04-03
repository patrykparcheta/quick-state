import type {
	AsyncActionCreator,
	AsyncActionFulfilledMeta,
	AsyncActionPendingMeta,
	AsyncActionRejectedMeta,
	AsyncActionWithPayload,
	Store,
	TransformState,
} from "./types";
import type {StateChangeAsyncActionDetail} from "./dev-tools";

export const createAsyncActionImpl =
	<State extends object, Transform extends TransformState<State>>(
		transformState: Transform
	): Store<State>["createAsyncAction"] =>
	<Creator extends AsyncActionCreator>(action: AsyncActionWithPayload<State, Creator>, actionName) => {
		return async function (this: any, ...args: Parameters<Creator>) {
			const {creator, onRejected, onFulfilled, onPending} = action;

			const pendingMeta: AsyncActionPendingMeta<Creator> = {
				parameters: args,
			};

			const stateChangeAsyncActionPendingDetail: StateChangeAsyncActionDetail = {
				actionName,
				meta: pendingMeta,
				stage: "pending",
				type: "asyncAction",
			};

			transformState((draft) => onPending(draft, pendingMeta), stateChangeAsyncActionPendingDetail);

			try {
				const resolvedValue = await creator(...args);

				const fulfilledMeta: AsyncActionFulfilledMeta<Creator> = {
					parameters: args,
					result: resolvedValue as Awaited<ReturnType<Creator>>,
				};

				const stateChangeAsyncActionFullfilledDetail: StateChangeAsyncActionDetail = {
					actionName,
					meta: pendingMeta,
					stage: "fulfilled",
					type: "asyncAction",
				};

				transformState((draft) => onFulfilled(draft, fulfilledMeta), stateChangeAsyncActionFullfilledDetail);

				return fulfilledMeta;
			} catch (e) {
				const rejectedMeta: AsyncActionRejectedMeta<Creator> = {
					parameters: args,
					reason: e,
				};

				const stateChangeAsyncActionRejectedDetail: StateChangeAsyncActionDetail = {
					actionName,
					meta: pendingMeta,
					stage: "rejected",
					type: "asyncAction",
				};

				transformState((draft) => onRejected(draft, rejectedMeta), stateChangeAsyncActionRejectedDetail);

				return rejectedMeta;
			}
		};
	};
