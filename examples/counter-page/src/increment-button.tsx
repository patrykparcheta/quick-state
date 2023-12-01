import {Button} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {increaseCount} from "./state";

export const IncrementButton = () => {
	return (
		<Button
			size={"large"}
			color={"info"}
			variant={"contained"}
			endIcon={<AddIcon />}
			onClick={() => increaseCount()}
		>
			Increment
		</Button>
	);
};
