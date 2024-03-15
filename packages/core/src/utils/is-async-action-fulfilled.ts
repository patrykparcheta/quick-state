import type {AsyncActionCreator, AsyncActionMeta, AsyncActionFulfilledMeta} from "../types";

export const isAsyncActionFulfilled = <Creator extends AsyncActionCreator>(
	meta: AsyncActionMeta<Creator>
): meta is AsyncActionFulfilledMeta<Creator> =>
	meta !== null &&
	typeof meta === "object" &&
	"parameters" in meta &&
	"result" in meta &&
	Array.isArray(meta.parameters);
