import React from "react";
import {increaseCountUsingAsyncAction} from "./state";
import {LoadingButton} from "@mui/lab";
import {selectLoading} from "./state";

export const GetStarted = () => {
	const loading = selectLoading();

	const handleButtonClick = () => increaseCountUsingAsyncAction(50);

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
