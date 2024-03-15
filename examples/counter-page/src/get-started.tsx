import React from "react";
import {increaseCountUsingAsyncAction} from "./state";
import {LoadingButton} from "@mui/lab";
import {selectLoading} from "./state";
import {isAsyncActionRejected, isAsyncActionFulfilled} from "@quickstate/core";

export const GetStarted = () => {
	const loading = selectLoading();

	const handleButtonClick = async () => {
		const meta = await increaseCountUsingAsyncAction(50);

		if (isAsyncActionRejected(meta)) {
			console.error("❌ Unable to complete the asynchronous operation:", meta.reason);
		}

		if (isAsyncActionFulfilled(meta)) {
			console.info("✅ Asynchronous operation completed successfully:", meta.result);
		}
	};

	return (
		<div>
			<LoadingButton
				loading={loading}
				variant={"outlined"}
				color={"success"}
				size={"large"}
				onClick={handleButtonClick}
			>
				🚀
			</LoadingButton>
		</div>
	);
};
