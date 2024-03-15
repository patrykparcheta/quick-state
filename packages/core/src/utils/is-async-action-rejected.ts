import type {AsyncActionCreator, AsyncActionMeta, AsyncActionRejectedMeta} from "../types";

export const isAsyncActionRejected = <Creator extends AsyncActionCreator>(
	meta: AsyncActionMeta<Creator>
): meta is AsyncActionRejectedMeta<Creator> =>
	meta !== null &&
	typeof meta === "object" &&
	"parameters" in meta &&
	"reason" in meta &&
	Array.isArray(meta.parameters);
