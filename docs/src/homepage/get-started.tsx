import React from "react";
import {Button} from "@mui/material";
import {increaseCount} from "./state";

export const GetStarted = () => {
	const handleButtonClick = () => {
		[...Array(10)].forEach(() => {
			increaseCount();
		});
	};

	return (
		<div>
			<Button variant={"outlined"} color={"success"} size={"large"} onClick={handleButtonClick}>
				🚀
			</Button>
		</div>
	);
};
